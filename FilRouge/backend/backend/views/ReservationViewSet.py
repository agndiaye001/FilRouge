from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404 
from ..models.Reservation import Reservation
from django.shortcuts import get_object_or_404 
from ..models.Reservation import Reservation
from ..serializers import ReservationSerializer
from rest_framework.permissions import IsAuthenticated



class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated] 

    @action(detail=False, methods=['GET'])
    def get(self):
            reservation = Reservation.objects.all()
            serializer = ReservationSerializer( reservation, many=True)
            return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getone(self, ws ):
            reservation = get_object_or_404(Reservation, id=ws)
            serializer = ReservationSerializer( reservation)
            return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def add(self, request):
            serializer = ReservationSerializer( data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=400)

    @action(detail=False, methods=['PUT'])
    def updatep(self, request, ws):
            reservation = get_object_or_404(Reservation, id=ws)
            serializer = ReservationSerializer(instance=reservation, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.data)


    @action(detail=False, methods=['DELETE'])
    def delete(self, rst):
            user = get_object_or_404( id=rst)
            user.delete()
        
            return Response("Item succefully deleted! ")















"""
    @action(detail=False, methods=['GET'])
    def get(self):
        reservation = reservation.objects.all()
        serializer = ReservationSerializer( reservation, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getone(self, ws ):
        reservation = get_object_or_404(reservation, id=ws)
        serializer = ReservationSerializer( reservation)
        return Response(serializer.data)


    @action(detail=False, methods=['POST'])
    def add(self, request):
        serializer = ReservationSerializer( data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


    @action(detail=False, methods=['PUT'])
    def updatew(self, request, ws):
        reservation = get_object_or_404(reservation, id=ws)
        serializer = ReservationSerializer(instance=reservation, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.data)


    @action(detail=False, methods=['DELETE'])
    def delete(self, ws):
        user = get_object_or_404( id=ws)
        user.delete()
    
        return Response("Item succefully deleted! ")
    

    
    def calculate_total_price(self):
        pricing = Pricing.objects.get(worksapce_type=self.workspace.workspace_type)
        if self.duration == 'hour':
            return pricing.price_per_hour
        elif self.duration == 'half_day':
            return pricing.price_per_day / 2
        elif self.duration == 'full_day':
            return pricing.price_per_day
        else:
            return 0 
    

"""
