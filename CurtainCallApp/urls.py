from django.urls import path
#from rest_framework.routers import DefaultRouter
from CurtainCallApp.views import TestView, FileUploadView

# Create a router and register our viewsets with it.
# router = DefaultRouter()

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('POSTMAN/', FileUploadView.as_view(), name='POSTMAN'),
]