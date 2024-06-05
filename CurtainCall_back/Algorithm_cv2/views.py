from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
import Algorithm_cv2.sim_print as sp
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from threading import Thread


class AlgoView(APIView):
    """
    이미지 그룹화 알고리즘을 실행하는 API / 비동기 처리
    """
    @swagger_auto_schema(
        # manual_parameters=[
        #     openapi.Parameter('Authorization', openapi.IN_HEADER, description='JWT token', type=openapi.TYPE_STRING)
        # ],
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'result': openapi.Schema(type=openapi.TYPE_STRING, description='result')
        })},
        security=[{'Bearer': []}]
    )
    def get(self, request):
        # return Response(sp.getsim(stage_id=request.user.stage_uuid_id), status=status.HTTP_200_OK)

        stageId = request.user.stage_uuid
        Thread(target=sp.getsim, args=stageId).start()
        return Response({'result': 'success'})
# Create your views here.
