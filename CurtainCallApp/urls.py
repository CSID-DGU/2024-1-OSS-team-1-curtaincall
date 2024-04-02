from django.urls import path
from CurtainCallApp.views import TestView, FileUploadView
from . import views

app_name = 'CurtainCallApp'
# Create a router and register our viewsets with it.
# router = DefaultRouter()

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('POSTMAN/', FileUploadView.as_view(), name='POSTMAN'),
    path('', views.index, name='index'),
    path('<int:file_id>/', views.detail)
]