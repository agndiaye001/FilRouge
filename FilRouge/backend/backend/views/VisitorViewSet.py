from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404 
from ..models.Visitor import Visitor
from ..serializers import VisitorSerializer

class VisitorViewSet(viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer


    @action(detail=False, methods=['GET'])
    def get(self):
        visitor = Visitor.objects.all()
        serializer = VisitorSerializer( visitor, many=True)
        return Response(serializer.data)

