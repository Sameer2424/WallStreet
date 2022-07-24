from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.views.generic import RedirectView
from django.urls import path
from .views import HomeView, instruction_view


urlpatterns = [
    url(r"^$", HomeView.as_view(), name="home"),
    url(r"^instructions/$", instruction_view, name="instructions"),
    url(r"^api/v0/", include("rest_api.urls", namespace="rest_apis")),
    url(r"^market/", include("market.urls", namespace="market")),
    url(r"^accounts/", include("accounts.urls", namespace="accounts")),
    url(r"^chat/", include("chat_messages.urls", namespace="chat_messages")),
    url(r"^accounts/passwords/", include("accounts.passwords.urls")),
    url(r"^admin/", admin.site.urls),
    url(r"^redeem/", include("virtualcoins.urls", namespace="virtualcoins")),
    url(r"^payment/", include("payments.urls", namespace="payments")),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include("rest_auth.urls")),
    url("auth/registration/", include("rest_auth.registration.urls")),
    url(r"^rest-auth/", include("rest_auth.urls")),
    url(r"^rest-auth/registration/", include("rest_auth.registration.urls")),
    path("", include("pwa.urls")),
]

admin.site.site_header = "Cricket Trading Game"
admin.site.site_title = "Cricket Trading Game"

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
