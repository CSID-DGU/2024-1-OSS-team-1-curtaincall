from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .models import UserManager, User

class userInformation(APIView):
    """
    유저 정보 조회
    """
    @swagger_auto_schema(
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'id': openapi.Schema(type=openapi.TYPE_STRING, description='유저 uuid'),
            'stage_uuid': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 uuid'),
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='유저 이름'),
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='이메일'),
            'user_ready': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='유저 준비 여부')
        })})
    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        return Response({
            'id': user.id,
            'stage_uuid': user.stage_uuid,
            'username': user.username,
            'email': user.email,
            'user_ready': user.user_ready
        })


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
        username = request.data.get('username')
        try:
            user = User.objects.get(pk=request.user.id)
        except User.DoesNotExist:
            return Response({'result': 'not found user'}, status=status.HTTP_400_BAD_REQUEST)

        if not username:
            return Response({'result': 'username not provided'}, status=status.HTTP_400_BAD_REQUEST)

        if user.replace_username(username):
            return Response({'result': 'success'}, status=status.HTTP_200_OK)
        else:
            return Response({'result': 'duplicate username'}, status=status.HTTP_400_BAD_REQUEST)