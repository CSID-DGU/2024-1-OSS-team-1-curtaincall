from django.urls import path, include
from .views import AlgoView

urlpatterns = [
    path('test/', AlgoView.as_view(), name='test'),
]