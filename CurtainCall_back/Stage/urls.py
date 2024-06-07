# example 앱에 대한 url 설정
from django.urls import path, include
import Stage.views as views

urlpatterns = [
    path("createStage/", views.createStage.as_view(), name="createStage"),
    path("joinStage/", views.joinStage.as_view(), name="joinStage"),
    path("sendImage/", views.sendImage.as_view(), name="sendImage"),
    path("checkStageUsers/", views.checkStageUsers.as_view(), name="checkStage"),
    path("checkStage/", views.checkStage.as_view(), name="checkStage"),
    ]
