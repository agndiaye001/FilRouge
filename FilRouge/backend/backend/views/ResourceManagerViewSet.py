from rest_framework import viewsets
from ..models.ResourceManager import ResourceManager
from ..serializers import ResourceManagerSerializer

class ResourceManagerViewSet(viewsets.ModelViewSet):
    queryset = ResourceManager.objects.all()
    serializer_class = ResourceManagerSerializer
    
