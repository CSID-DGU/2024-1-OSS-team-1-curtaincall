# example 앱에 대한 url 설정
from django.urls import path, include
import stage_admin.views as views

urlpatterns = [
    path("hello/", views.helloAPI.as_view(), name="hello"),
]