"""
Django settings for CurtainCall project.

Generated by 'django-admin startproject' using Django 5.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os
# from CurtainCall.donotcommit.aws_s3 import s3_config as s3
from CurtainCall.donotcommit import postgre as pg
from CurtainCall.donotcommit import aws_s3 as s3

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-0d(z=n2&n22ha7#a_)z2i^n0t1o5t1=5z%kmps7rh##%cd7la9'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'CurtainCallApp.apps.CurtaincallappConfig',
    'rest_framework',
    'drf_yasg',
    'storages',
    # "chat",
    "channels",
]

#set below setting value to False if you want to store images at s3 Server
USE_LOCAL_IMAGES = True

if(not USE_LOCAL_IMAGES):
    AWS_ACCESS_KEY_ID = s3.AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY = s3.AWS_SECRET_ACCESS_KEY
    AWS_REGION = s3.AWS_REGION

    AWS_STORAGE_BUCKET_NAME = s3.AWS_STORAGE_BUCKET_NAME
    AWS_S3_CUSTOM_DOMAIN = s3.AWS_S3_CUSTOM_DOMAIN
    AWS_S3_OBJECT_PARAMETERS = s3.AWS_S3_OBJECT_PARAMETERS
    DEFAULT_FILE_STORAGE = s3.DEFAULT_FILE_STORAGE
    MEDIA_ROOT = os.path.join(BASE_DIR, 'path/to/store/my/files/')


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'CurtainCall.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'CurtainCall.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': pg.database_name,
        'USER': pg.database_user,
        'PASSWORD': pg.PASSWORD,
        'HOST': pg.HOST,
        'PORT': pg.PORT,
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Media filesx
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# WebSocket 관련 설정
ASGI_APPLICATION = 'your_project_name.asgi.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',  # 채널 레이어 설정 (실제 환경에서는 다른 백엔드를 사용할 수 있음)
    },
}