from datetime import datetime
from decimal import Decimal

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.views import View
from django.views.generic import ListView
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.utils import timezone
from django.utils.timezone import localtime
from django.conf import settings
from django.urls import reverse

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Company, InvestmentRecord, Transaction, CompanyCMPRecord, News, UserNews, TransactionScheduler, Buybook, Sellbook, CompletedOrders
from .forms import CompanyChangeForm, ScoreCardForm, MatchCreationForm
from WallStreet.mixins import LoginRequiredMixin, AdminRequiredMixin, CountNewsMixin
from stocks.models import StocksDatabasePointer

import psycopg2

#For Player Data parsing
import requests
from bs4 import BeautifulSoup
import dateparser

User = get_user_model()

START_TIME = timezone.make_aware(getattr(settings, 'START_TIME'))
STOP_TIME = timezone.make_aware(getattr(settings, 'STOP_TIME'))


@login_required
def deduct_tax(request):
    if request.user.is_superuser:
        for user in User.objects.all():
            tax = user.cash * Decimal(0.4)
            user.cash -= tax
            user.save()
        return HttpResponse('success')
    return redirect('/')

class UpdateMarketView(LoginRequiredMixin, AdminRequiredMixin, View):

    def get(self, request, *args, **kwargs):
        # update cmp
        StocksDatabasePointer.objects.get_pointer().increment_pointer()

        # scheduler
        schedule_qs = TransactionScheduler.objects.all()
        for query in schedule_qs:
            if query.perform_transaction(query.company.cmp):
                TransactionScheduler.objects.get(pk=query.pk).delete()

        return HttpResponse('cmp updated')

# What happens if we define a market overview model?
class MarketOverview(LoginRequiredMixin, CountNewsMixin, ListView):
    template_name = 'market/overview.html'
    queryset = Company.objects.all()
    #queryset = Company.objects.order_by('updated').get() #This is for displaying the list of players on the grey bar above the title MARKET OVERVIEW

    def get_context_data(self, *args, **kwargs):
        context = super(MarketOverview, self).get_context_data(*args, **kwargs)
        context['investments'] = InvestmentRecord.objects.filter(user=self.request.user)
        return context
    
    '''def get_context_data(self, *args, **kwargs):
        user = self.request.user
        context = super(MarketOverview, self).get_context_data(*args, **kwargs)
        #userorders = CompletedOrders.objects.filter(user=self.request.user)
        
        sql = 'select get_portfolio(' + str(user.id) + ');' #This gives us the user's portfolio table
        conn = psycopg2.connect(database="wallstreet", user="postgres", password="admin", host="localhost", port="5432")
        cursor = conn.cursor()
        result = cursor.execute(sql)
        context['investments'] = result #Context needs to be assigned a result set.  Not clear how to assign it a result set that does come from <table>.objects.filter(<condition>)
        cursor.close()
        conn.close()
        return context'''


class CompanyAdminCompanyUpdateView(AdminRequiredMixin, CountNewsMixin, View):
    def get(self, request, *args, **kwargs):
        company = Company.objects.get(code=kwargs.get('code'))
        return render(request, 'market/admin_company_change.html', {
            'object': company,
            'company_list': Company.objects.all(),
            'form': CompanyChangeForm()
        })

    def post(self, request, *args, **kwargs):
        company = Company.objects.get(code=kwargs.get('code'))
        price = request.POST.get('price')
        old_price = company.cmp
        company.cmp = Decimal(int(price))
        company.save()
        company.calculate_change(old_price)
        print('price', int(price))
        url = reverse('market:admin', kwargs={'code': company.code})
        return HttpResponseRedirect(url)


class CompanyTransactionView(LoginRequiredMixin, CountNewsMixin, View):  #This is what is causing Investment Record entry to be created every time the user visits a stock's profile page
    def get(self, request, *args, **kwargs):
        company_code = kwargs.get('code')
        company = Company.objects.get(code=company_code)
        # I tried turning this method to InvestmentRecord.objects.get instead of get_or_create, but apparently, the players' profile pages are getting created based on the InvestmentRecordObject being created here.
        obj, _ = InvestmentRecord.objects.get_or_create(user=request.user, company=company)
        stocks_owned = obj.stocks
        context = {
            'object': company,
            'company_list': Company.objects.all(),
            'stocks_owned': stocks_owned,
            'purchase_modes': ['buy', 'sell']
        }
        return render(request, 'market/transaction_market.html', context)

    def post(self, request, *args, **kwargs):
        """This method handles any post data at this page (primarily for transaction)"""
        company = Company.objects.get(code=kwargs.get('code'))
        current_time = timezone.make_aware(datetime.now())

        if START_TIME <= current_time <= STOP_TIME:
            user = request.user
            quantity = request.POST.get('quantity')

            if quantity != '' and int(quantity) > 0:
                quantity = int(quantity)
                mode = request.POST.get('mode')
                purchase_mode = request.POST.get('p-mode')
                price = company.cmp
                # Investment object is being used only to check if the user has sufficient stock balance before trying to sell
                # When I try to use get, it shows the following error: TypeError: cannot unpack non-iterable InvestmentRecord object
                investment_obj, _ = InvestmentRecord.objects.get_or_create(user=user, company=company)
                holding = investment_obj.stocks
                # If num_stocks for sell orders are stored as negative integers, we could aggregate num_stocks and come to the holding for a particular company - WORKS!
                '''sql = "SELECT stocks as holding FROM MARKET_COMPLETEDORDERS WHERE user_id = " + str(user.id) + " AND COMPANY_ID = " + str(company.id) + " GROUP BY COMPANY_ID;"
                holding = 0
                conn = psycopg2.connect(database="wallstreet", user="postgres", password="admin", host="localhost", port="5432")
                cursor = conn.cursor()
                cursor.execute(sql)
                holdings = [row for row in cursor]
                for entry in holdings:
                    holding = entry[0]'''


                # This code is for when the num_stocks for sell orders are stored as positive integers - WORKS!
                '''holding = 0
                sql = "SELECT num_stocks, mode FROM MARKET_COMPLETEDORDERS WHERE user_id = " + str(user.id) + " AND COMPANY_ID = " + str(company.id) + ";"

                conn = psycopg2.connect(database="wallstreet", user="postgres", password="admin", host="localhost", port="5432")
                cursor = conn.cursor()
                cursor.execute(sql)
                mode_and_qty = [row for row in cursor]
                for entry in mode_and_qty:
                    if entry[1] == 'BUY':
                        holding = holding + entry[0]
                    elif entry[1] == 'SELL':
                        holding = holding - entry[0]'''

                if mode == 'transact':
                    if purchase_mode == 'buy':
                        purchase_amount = Decimal(quantity)*price
                        if user.cash >= purchase_amount:
                            # Creating a buybook object instead of a Transaction object
                            #_ = Buybook.objects.create( 
                            _ = Transaction.objects.create(
                                user=user,
                                company=company,
                                num_stocks=quantity,
                                orderprice=price,
                                mode=purchase_mode.upper()
                                #user_net_worth=InvestmentRecord.objects.calculate_net_worth(user)
                            )
                            # Along with recording the transaction in the order book, we also need to indicate the order qty in the Investment Record table
                            # This was happening in pre_save_transaction_receiver, but stocks are getting added to escrow even if there is an error
                            obj, _ = InvestmentRecord.objects.get_or_create(user=request.user, company=company)
                            obj.buy_escrow = obj.buy_escrow + quantity
                            obj.save()
                            print("buy escrow = " + str(obj.buy_escrow))
                            

                            user.escrow = user.escrow + purchase_amount
                            user.cash = user.cash - purchase_amount
                            user.save()
                            messages.success(request, 'Your buy order for ' + str(quantity) + ' shares of ' + company.name + ' has been placed.')
                        else:
                            messages.error(request, 'You do not have sufficient credits for this transaction.')
                    elif purchase_mode == 'sell':
                        if quantity <= holding:
                            #_ = Sellbook.objects.create( 
                            _ = Transaction.objects.create(
                                user=user,
                                company=company,
                                num_stocks=quantity,
                                orderprice=price,
                                mode=purchase_mode.upper()
                                #user_net_worth=InvestmentRecord.objects.calculate_net_worth(user)
                            )
                            # Along with recording the transaction in the order book, we also need to indicate the order qty in the Investment Record table
                            # This was happening in pre_save_transaction_receiver, but stocks are getting added to escrow even if there is an error
                            obj, _ = InvestmentRecord.objects.get_or_create(user=request.user, company=company)
                            obj.sell_escrow = obj.sell_escrow + quantity
                            obj.stocks = obj.stocks - quantity
                            obj.save()
                            print("sell escrow = " + str(obj.sell_escrow))

                            messages.success(request, 'Your sell order for ' + str(quantity) + ' shares of ' + company.name + ' has been placed.')
                        else:
                            messages.error(request, 'You do not have these many stocks to sell for ' + company.name + '.')
                    else:
                        messages.error(request, 'Please select a valid purchase mode.')
                elif mode == 'schedule':
                    schedule_price = request.POST.get('price')
                    if purchase_mode == 'buy':
                        _ = TransactionScheduler.objects.create(
                            user=user,
                            company=company,
                            num_stocks=quantity,
                            price=schedule_price,
                            mode=purchase_mode
                        )
                        messages.success(request, 'Request Submitted!')
                    elif purchase_mode == 'sell':
                        _ = TransactionScheduler.objects.create(
                            user=user,
                            company=company,
                            num_stocks=quantity,
                            price=schedule_price,
                            mode=purchase_mode
                        )
                        messages.success(request, 'Request Submitted.')
                    else:
                        messages.error(request, 'Please select a valid purchase mode.')
                else:
                    messages.error(request, 'Please select a valid transaction mode.')
            else:
                messages.error(request, 'Please enter a valid quantity.')
        else:
            msg = 'The market is closed!'
            messages.info(request, msg)
        url = reverse('market:transaction', kwargs={'code': company.code})
        if request.is_ajax():
            return JsonResponse({'next_path': url})
        return HttpResponseRedirect(url)


# For Chart
class CompanyCMPChartData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None, *args, **kwargs):
        '''qs = CompanyCMPRecord.objects.filter(company__code=kwargs.get('code'))
        if qs.count() > 15:
            qs = qs[:15]
        qs = reversed(qs)'''
        labels = []
        cmp_data = []
        '''for cmp_record in qs:
            labels.append(localtime(cmp_record.timestamp).strftime('%H:%M'))
            cmp_data.append(cmp_record.cmp)
        current_cmp = Company.objects.get(code=kwargs.get('code')).cmp
        if cmp_data[-1] != current_cmp: # ???
            labels.append(timezone.make_aware(datetime.now()).strftime('%H:%M'))
            cmp_data.append(current_cmp)
        '''
        data = {
            "labels": labels,
            "cmp_data": cmp_data,
        }
        return Response(data)


class NewsView(LoginRequiredMixin, CountNewsMixin, View):
    template_name = 'market/news.html'
    url = 'news'

    def get(self, request, *args, **kwargs):
        UserNews.objects.get_by_user(request.user).update(read=True)
        queryset = News.objects.filter(is_active=True)
        return render(request, 'market/news.html', {'object_list': queryset})

def executetrades(request):
    sql = 'call execute_trades();'
    conn = psycopg2.connect(database="wallstreet", user="postgres", password="admin", host="localhost", port="5432")
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()
    print("Check if this is getting printed")
    return HttpResponse(status=200)

'''def dashboard(request):
    form = ScoreCardForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        submitbutton = "Submit"
        form = ScoreCardForm(request.POST or None)
        batsman = ''
        bowler = ''
        nonstriker = ''
        if form.is_valid():
            batsman = form.cleaned_data.get("batsman")
            bowler = form.cleaned_data.get("bowler")
            nonstriker = form.cleaned_data.get("nonstriker")
            print('Batsman is ' + batsman)
            print('Bowler is ' + bowler)
            print('Non-striker is ' + nonstriker)
        context = {'form': form, 'batsman': batsman, 'nonstriker': nonstriker, 'bowler':bowler, 'submitbutton':submitbutton}
        return render(request, 'market/trial.html', context)
    else:
        context = {'form':form}
        return render(request, 'market/dashboard.html')'''

class MatchCreationView(LoginRequiredMixin, CountNewsMixin, View):
    template_name = 'market/match_details.html'
    url = 'match'

    def get(self, request, *args, **kwargs):
        form = MatchCreationForm(request.POST or None, request.FILES or None)
        #UserNews.objects.get_by_user(request.user).update(read=True)
        #queryset = News.objects.filter(is_active=True)
        context = {'form':form}
        return render(request, 'market/match_details.html', context)
    
    def post(self, request, *args, **kwargs):
        # This code will run whenever the submit button is pressed on the Match Creation form.
        # Before displaying the score card dashboard, we need to create 22 entries in the 'Match' table with the players that have been selected in the Match form.
        #submitbutton = request.POST.get("submit")
        matchform = MatchCreationForm(request.POST or None)
        form = ScoreCardForm(None) # We need a blank form to start
        match_id = 0
        if matchform.is_valid():
            match_id = matchform.cleaned_data.get("match_id")
            #bowler = matchform.cleaned_data.get("bowler")
            #nonstriker = matchform.cleaned_data.get("nonstriker")
        context = {'form':form}
        return render(request, 'market/dashboard.html', context)


class DashboardView(LoginRequiredMixin, CountNewsMixin, View):
    template_name = 'market/dashboard.html'
    url = 'dashboard'

    def get(self, request, *args, **kwargs):
        form = ScoreCardForm(request.POST or None, request.FILES or None)
        context = {'form':form}
        return render(request, 'market/dashboard.html', context)
    
    def post(self, request, *args, **kwargs):
        form = ScoreCardForm(request.POST or None)
        if form.is_valid():
            batsman = form.cleaned_data.get("batsman")
            bowler = form.cleaned_data.get("bowler")
            nonstriker = form.cleaned_data.get("nonstriker")
            
        context = {'form': form}
        #, 'batsman': batsman, 'nonstriker': nonstriker, 'bowler':bowler, 'submitbutton':submitbutton}
        return render(request, 'market/dashboard.html', context)


# Open a connection pool and keep them open.  Whenever the db needs to be hit, you fetch a connection, do whatever you need to, and put it back in the pool.

#Dashboard views
""" def score_card_create_view(request):

    form = ScoreCardForm(request.POST or None, request.FILES or None)
    if request.method == "POST":
        if form.is_valid():
            form.save()
    context = {
        'form':form,
    }

    return render(request, "dashboard/score_card_create_view.html",context)


def score_card_list_view(request):
    allmatches = ScoreCard.objects.all()

    context = {'allmatches' : allmatches,}

    return render(request, "dashboard/score_card_list_view.html", context)


def score_card_detail_view(request,id):
    matches = ScoreCard.objects.get(id = id)
    obj = get_object_or_404(ScoreCard, id=id)
    form = ScoreCardForm(request.POST or None, instance= obj)
    if form.is_valid():
        form.save()
        # return HttpResponseRedirect("list/"+id)
    
    context = {
        'matches' : matches,
        'form' : form,
    }
    batsman = match.objects.get(player_id =batsmanid, match_id = matchid)
    batsman = match.objects.get(player_id =batsmanid, match_id = matchid)

    
    

    nonstriker = match.objects.get(player_id = nonstrikerid, match_id = matchid)
    bolwer = 
    fielder = 
    batsman.runs = batsman.runs + <runs waali field ki entry>
    batsman.save()

    return render(request,'dashboard/score_card_detail_view.html', context)


def score_card_update_view(request,id):

    obj = get_object_or_404(ScoreCard, id=id)

    form = ScoreCardForm(request.POST or None, instance= obj)

    if form.is_valid():
        form.save()
        return HttpResponseRedirect("/"+id)

    context = {'form' : form,}

    return render (request,'score_card_update_view.html', context) """
