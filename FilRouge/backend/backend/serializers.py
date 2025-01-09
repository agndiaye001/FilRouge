# workspace/serializers.py
from rest_framework import serializers
from .models import Users, Workspace, Subscription, Reservation, Pricing, Transaction, Visitor, ResourceManager


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['userId', 'username','role', 'email','password', 'activeSubscription']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['idWorkspace', 'workspace_type', 'description', 'capacity', 'availability', 'day']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['idSubscription', 'users', 'workspace', 'subscription_type', 'amount', 'susbcription_type', 'status', 'start_date', 'end_date']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['idReservation', 'user', 'workspace', 'start_time', 'end_time', 'total_price', 'status']
        
class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pricing
        fields = ['idPricing', 'workspace', 'price_per_hour', 'price_per_day', 'price_per_week', 'morning_start', 'morning_end', 'afternoon_start',  'afternoon_end']
        
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['idTransaction', 'reservation', 'transaction_date', 'amount', 'payment_method', 'status']


class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields ='__all__'


class ResourceManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceManager
        fields = ['id', 'name', 'idWorkspace', 'idAdmin']

        