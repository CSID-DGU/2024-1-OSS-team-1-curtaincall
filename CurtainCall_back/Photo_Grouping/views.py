from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from django.shortcuts import render
from threading import Thread

import Photo_Grouping.algorithms as sleep


class get_sleep(APIView):
    """
    sleep API
    """

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('stageId', openapi.IN_QUERY, type=openapi.TYPE_INTEGER, description='stageId',
                              required=True),
            openapi.Parameter('time', openapi.IN_QUERY, type=openapi.TYPE_INTEGER, description='sleep time',
                              required=True)
        ],
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'result': openapi.Schema(type=openapi.TYPE_STRING, description='result')
        })})
    def get(self, request):
        request = request.GET
        time = request.get('time')
        stageId = request.get('stageId')

        Thread(target=sleep.sleep2, args=(time, stageId)).start()
        return Response({'result': 'success'})

# Create your views here.
