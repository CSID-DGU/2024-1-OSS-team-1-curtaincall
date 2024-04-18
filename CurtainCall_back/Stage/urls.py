# example 앱에 대한 url 설정
from django.urls import path, include
import Stage.views as views

urlpatterns = [
    path("creatStage/", views.creatStage.as_view(), name="createStage"),
    path("joinStage/", views.joinStage.as_view(), name="joinStage"),
    path("seandImge/", views.seandImge.as_view(), name="seandImge"),
    path("checkStage/", views.checkStage.as_view(), name="checkStage"),
    ]
