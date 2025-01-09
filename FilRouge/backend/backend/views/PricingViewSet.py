from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404 
from ..models.Pricing import Pricing
from ..serializers import PricingSerializer

class PricingViewSet(viewsets.ModelViewSet):
    queryset = Pricing.objects.all()
    serializer_class = PricingSerializer

    @action(detail=False, methods=['GET'])
    def get(self):
            pricing = Pricing.objects.all()
            serializer = PricingSerializer( pricing, many=True)
            return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getone(self, ws ):
            pricing = get_object_or_404(Pricing, id=ws)
            serializer = PricingSerializer( pricing)
            return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def add(self, request):
            serializer = PricingSerializer( data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

    @action(detail=False, methods=['PUT'])
    def updatep(self, request, ws):
            pricing = get_object_or_404(Pricing, id=ws)
            serializer = PricingSerializer(instance=pricing, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.data)


    @action(detail=False, methods=['DELETE'])
    def delete(self, ps):
            user = get_object_or_404(Pricing, id=ps)
            user.delete()
        
            return Response("Item succefully deleted! ")
        

        