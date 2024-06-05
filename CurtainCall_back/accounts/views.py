from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .models import UserManager, User


class replaceUsername(APIView):
    """
    유저 이름 변경
    """

    @swagger_auto_schema(
        request_body=(openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='변경할 유저 이름')
        })),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'result': openapi.Schema(type=openapi.TYPE_STRING, description='result')
        })},
        security=[{'Bearer': []}]
    )
    def post(self, request):
        # 1 input data
        username = request.data['username']
        user = User.objects.get(pk=request.user.id)
        user.username = username
        user.save()
        return Response({'result': 'success'})