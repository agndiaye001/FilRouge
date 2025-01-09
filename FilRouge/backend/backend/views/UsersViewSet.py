# workspace/views/user_views.py
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404 
from rest_framework import viewsets
from ..models.Users import Users  # Assurez-vous que le modèle est bien importé
from ..serializers import UsersSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

    @action(detail=False, methods=['GET'])
    def getall(self, request):
        users = Users.objects.all()
        serializer = UsersSerializer( users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getone(self, request, pk ):
        user = get_object_or_404(Users, id=pk)
        serializer = UsersSerializer( user)
        return Response(serializer.data)


    @action(detail=False, methods=['POST'], url_path='add')
    def add(self, request):
        serializer = UsersSerializer( data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['GET'])
    def add(self, request):
        # Handle GET request to show some information (optional)
        return Response({"message": "Use POST to add a user"}, status=200)


    @action(detail=False, methods=['PUT'])
    def updateUsers(self, request, pk):
        user = get_object_or_404(Users, id=pk)
        serializer = UsersSerializer(instance=user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.data)


    @action(detail=False, methods=['DELETE'])
    def delete(self, pk):
        user = get_object_or_404(Users, id=pk)
        user.delete()
    
        return Response("Item succefully deleted! ")