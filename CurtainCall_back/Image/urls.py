# example 앱에 대한 url 설정
from django.urls import path, include
import Image.views as views

urlpatterns = [
    path("findFolderList/", views.findFolderList.as_view(), name="findFolderList"),
    path("findImageList/", views.findImageList.as_view(), name="findImageList"),
    path("uploadImage/", views.uploadImage.as_view(), name="uploadImage"),
    path("bestImage/", views.bestImage.as_view(), name="bestImage"),
    path("presigned-url/", views.PresignedURLView.as_view(), name="presigned-url"),
    ]
