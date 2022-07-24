"""
Django settings for WallStreet project.
Generated by 'django-admin startproject' using Django 3.0.1.
For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""
from decimal import Decimal
from datetime import datetime, timedelta

# from decouple import config
import os

from payments.constants import *

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "ce4juzp8!d@lgthqc^ip$t@@!!p#8^etlltd=pb^gqs=rh3=&a"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    "www.cricktrade.com",
    "demo.cricktrade.com",
    "market.cricktrade.com",
    "wallstreet-env.eba-ie3ndxmm.us-west-1.elasticbeanstalk.com",
    "wallstreet-env-1.us-west-1.elasticbeanstalk.com",
    "champhunt-env.eba-zezpix24.us-west-1.elasticbeanstalk.com",
    "champhuntsm-env.eba-zezpix24.us-west-1.elasticbeanstalk.com",
    "awseb-awseb-4i3kkc8q4e1i-531477933.us-west-1.elb.amazonaws.com",
    "172.31.24.176",
    "172.31.0.101",
    "172.31.19.41",
    "172.31.21.117",
    "172.31.7.234",
    "172.31.11.60",
    "172.31.17.36",
    "awseb-awseb-1mgsyw9ud4389-1027235852.us-west-1.elb.amazonaws.com",
    "54.183.10.17",
    "54.183.92.44",
    "54.241.175.75",
    "api.dev"
]

DEFAULT_LOAN_AMOUNT = Decimal(1000.00)
BOTTOMLINE_CASH = Decimal(1000.00)
MAX_LOAN_ISSUE = 1
RATE_OF_INTEREST = Decimal(0.15)  # 15%
START_TIME = datetime(2019, 4, 12, 4, 00, 0)
STOP_TIME = datetime(2022, 5, 5, 2, 00, 0)


# Application definition

INSTALLED_APPS = [
    "corsheaders",
    "channels",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "session.apps.SessionConfig",
    "django.contrib.humanize",
    "djoser",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt.token_blacklist",
    "djangochannelsrestframework",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "crispy_forms",
    # added apps
    "accounts",
    "market",
    "stocks",
    "real_time_cmp",
    "pwa",
    "chat_messages",
    "virtualcoins",
    "payments",
    "rest_api",
    "push_notifications",
]

SITE_ID = 3


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated",],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '10000/day'
    }
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=300),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}

# Replace the built-in values
AUTH_USER_MODEL = "accounts.User"
LOGIN_URL = "/accounts/login/"
LOGIN_REDIRECT_URL = "market/overview/"
LOGIN_REDIRECT_URL = "market:overview"
# LOGIN_URL_REDIRECT = "market/overview/"
LOGOUT_REDIRECT_URL = "/accounts/login/"
LOGOUT_URL = "/logout/"

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "https://champhunt-test.herokuapp.com",
    "https://91ee-2401-4900-313f-225-5307-ac6c-f497-67f0.ngrok.io",
    "http://champhuntsm-env.eba-zezpix24.us-west-1.elasticbeanstalk.com",
    "http://champhunt.com",
    "http://champhunt.com.s3-website-us-west-1.amazonaws.com"
]
ROOT_URLCONF = "WallStreet.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

CHANNEL_LAYERS = {
    "default": {
        "CONFIG": {
            # "hosts": [("localhost", "6379")],
            "hosts": [('champhunt-redis.ejj9tf.ng.0001.usw1.cache.amazonaws.com','6379')],
        },
        "BACKEND": "channels_redis.core.RedisChannelLayer",
    },
}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": "/var/tmp/django_cache",
    }
}

WSGI_APPLICATION = "WallStreet.wsgi.application"
ASGI_APPLICATION = "WallStreet.routing.application"


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "cricktrade",
        "USER": "postgres",
        "PASSWORD": "pwd",
        "HOST": "localhost",
    }
}

DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "NAME": "postgres",
            "USER": "champhuntdb",
            "PASSWORD": "Champ2424",
            "HOST": "champhuntsm.cd3hbgh8jrzz.us-west-1.rds.amazonaws.com",
            "PORT": "5432"
        }
    }

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Calcutta"

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = "/static/"

if DEBUG:
        STATICFILES_DIRS = [
            os.path.join(BASE_DIR, 'static')
       ]
else:
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
#Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

# STATIC_ROOT = os.path.join(BASE_DIR, "static_cdn", "static_root")
# STATIC_ROOT = os.path.join(BASE_DIR, "..", "www", "static")

STATIC_ROOT = 'static'

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "static_cdn", "media_root")

LOGIN_REDIRECT_URL = "/market/overview/"

TIME_ZONE =  'Asia/Kolkata'

#Email Settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = "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"
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = "no-reply@champhunt.com"

SENDGRID_API_KEY = "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"

SENDGRID_SANDBOX_MODE_IN_DEBUG=True

# echo to stdout or any other file-like object that is passed to the backend via the stream kwarg.
SENDGRID_ECHO_TO_STDOUT=True

DATA_UPLOAD_MAX_MEMORY_SIZE = 50*1024*1024  # your size limit in bytes