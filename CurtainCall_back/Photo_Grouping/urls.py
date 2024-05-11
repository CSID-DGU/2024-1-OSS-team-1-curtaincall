# example 앱에 대한 url 설정
from django.urls import path, include
import Photo_Grouping.views as views

urlpatterns = [
    path("sleep/", views.get_sleep.as_view(), name="sleep"),
    ]
