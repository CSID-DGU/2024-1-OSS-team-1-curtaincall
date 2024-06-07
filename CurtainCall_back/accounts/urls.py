# accounts/urls.py

from django.urls import path, include
from accounts.views import replaceUsername, userInformation

urlpatterns = [
    # JWT 토큰 인증 페이지 제작을 위해 urls.py 로 이동
    # path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('replaceUsername/', replaceUsername.as_view(), name='replaceUsername'),
    path('userInformation/', userInformation.as_view(), name='userInformation')
]