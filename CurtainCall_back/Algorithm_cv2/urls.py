from django.urls import path, include
from .views import AlgoView

urlpatterns = [
    path('sort/', AlgoView.as_view(), name='sort'),
]