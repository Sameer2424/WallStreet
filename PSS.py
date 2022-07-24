#Web Scraping using BeautifulSoup and Panda

#Use Cricinfo player profile url

#Requests can be install using the following command: C:\Python38\Scripts\easy_install.exe requests

import requests
from bs4 import BeautifulSoup
import pandas as pd
import psycopg2
from collections import OrderedDict

#Extracting Cricinfo squad ids of teams from the IPL tournament page
# r = requests.get('https://www.espncricinfo.com/ci/content/squad/index.html?object=1210595')
r = requests.get('https://www.espncricinfo.com/series/ipl-2021-1249214/squads')
soup = BeautifulSoup(r.text, 'html.parser')

parsed_html = soup.find('div', class_="series-squads-container")

squadlist = parsed_html.find_all('div', class_="squad-row d-flex justify-content-md-between py-2 align-content-center flex-wrap")

squadids = []
squadnames = []
squadlinkids = []

playernames = []
playerids = []

# PlayerDict = {}

for i in range(len(squadlist)):
    squadnames.append(squadlist[i].find('a').contents[0])
    offset = 26 + len(squadnames[i])
    # /series/ipl-2021-1249214/chennai-super-kings-squad-1252150/series-squads
    squadids.append(int(squadlist[i].find('a')['href'][offset:-14]))
    squadlinkids.append(squadlist[i].find('a')['href'][25:-14])
    

Squad={}
for i in range(len(squadids)):
    Squad[squadids[i]] = squadnames[i][:-6]

# print('Squad ids extracted successfully: ')
# print(squadnames)
# print(squadids)
# print(squadlinkids)

# https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-squad-1252150/series-squads

def load_batting_data():
    # Pass the parsed_html table data to this function and have this function append it to the tablerow.
    return

for i in range(len(squadlinkids)):
    #Extracting Cricinfo ids of players from the squad page
    url = 'https://www.espncricinfo.com/series/ipl-2021-1249214/'
    url = url + squadlinkids[i] + '/series-squads'
    # print(url)
    
    r = requests.get(url)
    
    soup = BeautifulSoup(r.text, 'html.parser')
    players = []

    Dict = [] #Attempting to make a player dictionary with tuples of the form (playerid, playername, playerlink)
    
    players = soup.find_all("div", class_="squad-player-content")
    playerlinks = []
    for j in range(len(players)):
        playerlink = players[j].find('a')['href']
        playerlinks.append(playerlink)

        playername = players[j].find('a').contents[0]
        playernames.append(playername)

        offset = len(playername) + 8 + 1
        playerid = players[j].find('a')['href'][offset:]
        playerids.append(playerid)
        
        Dict.append((playerid, playername, playerlink))
    
    for playerrow in Dict:
        url = "https://www.espncricinfo.com" + playerrow[2]
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')

        name = playerrow[1]

        parsed_html = soup.find("div", class_="player_overview-grid")

        #Extracting player info
        # info = parsed_html.find_all('p', class_="text-uppercase gray-700 mb-0 pb-0-5 player-card-heading")

        details = parsed_html.find_all("p", class_= "text-uppercase gray-700 mb-0 pb-0-5 player-card-heading")
        data = parsed_html.find_all("h5", class_= "player-card-description gray-900")
        
        Dict = {} # Dictionary to map details to their data

        for k in range(len(details)):
            Dict[details[k].contents[0]] = data[k].contents[0]
        
        if 'Full Name' in Dict.keys():
            full_name = Dict['Full Name']
        else:
            full_name = 'NA'

        if 'Born' in Dict.keys():
            dobpob = Dict['Born']
        else:
            dobpob = 'NA'

        if 'Playing Role' in Dict.keys():
            playing_role = Dict['Playing Role']
        else:
            playing_role = 'NA'

        if 'Batting Style' in Dict.keys():
            batting_style = Dict['Batting Style']
        else:
            batting_style = 'NA'

        if 'Bowling Style' in Dict.keys():
            bowling_style = Dict['Bowling Style']
        else:
            bowling_style = 'NA'
                    
        #Separating date of birth and place of birth
        if dobpob != 'NA':
            counter = 0
            dob = ''
            pob = ''
            for l in range(len(dobpob)):
                if counter < 2:
                    if dobpob[l] == ',':
                        counter = counter + 1
                        if counter == 1:
                            dob = dob + dobpob[l]
                    else:
                        dob = dob + dobpob[l]
                elif counter == 2:
                    pob = (pob + dobpob[l]).lstrip()
        
        tablerow = [Squad[squadids[i]]]
        tablerow.extend([playerrow[0], name, full_name, dob, pob, playing_role, batting_style, bowling_style])

        # print(tablerow)
        parsed_html = ''
        # parsed_html = soup.find("table", class_="table standings-widget-table text-center mb-0 border-bottom")

        # This parsed_html will store both tables, battingfielding and bowling.  We don't know the order in which the tables occur.
        parsed_html = soup.findAll("table", class_="table standings-widget-table text-center mb-0 border-bottom")

        bat_field = []
        bowling = []
        if parsed_html:
            t1headers = [th.text.strip() for th in parsed_html[0].findAll('th')]
            # print(t1headers)
            t2headers = [th.text.strip() for th in parsed_html[1].findAll('th')]
            # print(t2headers)

            #Logic : Irrespective of which table comes first, store the data in 2 lists : batting and bowling, then at the end of the if condition, do tablerow = tablerow + batting + bowling
            t20batfield = []
            t20bowling = []
            datafound = 0
            if t1headers[3] == 'NO': # 4th column in batting and fielding table is NO (Not outs)
                bat_field = [td.text.strip() for td in parsed_html[0].findAll('td')]
                for datapoint in range(len(bat_field)):
                    if bat_field[datapoint] == 'T20':
                        datafound = 1
                        start = datapoint
                        break
                if datafound:
                    for datapoint in range(start+1,start+15):
                        t20batfield.append(bat_field[datapoint])
                        tablerow.append(bat_field[datapoint])
                else:
                    for m in range(14):
                        tablerow.append('0')
            else:
                bat_field = [td.text.strip() for td in parsed_html[1].findAll('td')]
                for datapoint in range(len(bat_field)):
                    if bat_field[datapoint] == 'T20':
                        datafound = 1
                        start = datapoint
                        break
                if datafound:
                    for datapoint in range(start+1,start+15):
                        t20batfield.append(bat_field[datapoint])
                        tablerow.append(bat_field[datapoint])
                else:
                    for m in range(14):
                        tablerow.append('0')
            
            # print(tablerow)
            
            if t1headers[3] == 'Balls': # $th column in bowling table is Balls
                bowling = [td.text.strip() for td in parsed_html[0].findAll('td')]
                for datapoint in range(len(bowling)):
                    if bowling[datapoint] == 'T20':
                        datafound = 1
                        start = datapoint
                        break
                if datafound:
                    for datapoint in range(start+2,start+14):
                        t20bowling.append(bowling[datapoint])
                        tablerow.append(bowling[datapoint])
                else:
                    for m in range(12):
                        tablerow.append('0')
            else:
                bowling = [td.text.strip() for td in parsed_html[1].findAll('td')]
                for datapoint in range(len(bowling)):
                    if bowling[datapoint] == 'T20':
                        datafound = 1
                        start = datapoint
                        break
                if datafound:
                    for datapoint in range(start+2,start+14):
                        t20bowling.append(bowling[datapoint])
                        tablerow.append(bowling[datapoint])
                else:
                    for m in range(12):
                        tablerow.append('0')
            
            print(tablerow)
        else:
            for m in range(26):
                tablerow.append('0')
            print("Ye naya player hai")
        
        # There might be cases where the scraper picks up '-' for player stats because that is what 
        # has been given on Cricinfo.  This code replaces all '-'s with '0's
        
        tablerow = ['0' if x == '-' else x for x in tablerow]

        #Converting the stat fields to appropriate data types
        #matches
        tablerow[9] = int(tablerow[9])
        #batting_innings
        tablerow[10] = int(tablerow[10])
        #notouts
        tablerow[11] = int(tablerow[11])
        #runs
        tablerow[12] = int(tablerow[12])
        #batting_average
        tablerow[14] = float(tablerow[14])
        #balls_faced
        tablerow[15] = int(tablerow[15])
        #batting_sr
        tablerow[16] = float(tablerow[16])
        #hundreds
        tablerow[17] = int(tablerow[17])
        #fifties
        tablerow[18] = int(tablerow[18])
        #fours
        tablerow[19] = int(tablerow[19])
        #sixes
        tablerow[20] = int(tablerow[20])
        #catches
        tablerow[21] = int(tablerow[21])
        #stumpings
        tablerow[22] = int(tablerow[22])
        #bowling_innings
        tablerow[23] = int(tablerow[23])
        #balls_bowled
        tablerow[24] = int(tablerow[24])
        #runs_conceded
        tablerow[25] = int(tablerow[25])
        #wickets
        tablerow[26] = int(tablerow[26])
        #bowling_average
        tablerow[29] = float(tablerow[29])
        #economy
        tablerow[30] = float(tablerow[30])
        #bowling_sr
        tablerow[31] = float(tablerow[31])
        #fourfers
        tablerow[32] = int(tablerow[32])
        #fifers
        tablerow[33] = int(tablerow[33])
        #tenfers
        tablerow[34] = int(tablerow[34])

        # Inserting row into the playerstats table
        sql = "INSERT INTO market_playerstats (ipl_team, id, name, full_name, dob, pob, playing_role, batting_style, bowling_style, matches, batting_innings, notouts, runs, highest, batting_average, balls_faced, batting_sr, hundreds, fifties, fours, sixes, catches, stumpings, bowling_innings, balls_bowled, runs_conceded, wickets, bbi, bbm, bowling_average, economy, bowling_sr, fourfers, fifers, tenfers) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"

        # conn = psycopg2.connect(database="wallstreet", user="postgres", password="admin", host="localhost", port="5432")
        conn = psycopg2.connect(database="wallstreet", user="postgres", password="Champ2424", host="wallstreet.ciqodeqxwwle.us-west-1.rds.amazonaws.com", port="5432")
        cursor = conn.cursor()
        cursor.execute(sql, tablerow)
        conn.commit()
        cursor.close()
        conn.close()

