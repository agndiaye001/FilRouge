from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404 
from ..models.Workspace import Workspace
from ..serializers import WorkspaceSerializer
from rest_framework.permissions import IsAuthenticated


class WorkspaceViewSet(viewsets.ModelViewSet):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated] 


    @action(detail=False, methods=['GET'])
    def get(self):
        workspace = Workspace.objects.all()
        serializer = WorkspaceSerializer( workspace, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getone(self, ws ):
        workspace = get_object_or_404(Workspace, id=ws)
        serializer = WorkspaceSerializer( workspace)
        return Response(serializer.data)


    @action(detail=False, methods=['POST'])
    def add(self, request):
        serializer = WorkspaceSerializer( data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['PUT'])
    def updatew(self, request, ws):
        workspace = get_object_or_404(Workspace, id=ws)
        serializer = WorkspaceSerializer(instance=workspace, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.data)

    @action(detail=False, methods=['DELETE'])
    def delete(self, ws):
        user = get_object_or_404(Workspace, id=ws)
        user.delete()
    
        return Response("Item succefully deleted! ")
    

    