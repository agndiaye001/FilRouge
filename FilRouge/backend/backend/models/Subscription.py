# models/subscription_model.py
from django.db import models
from .Users import Users
from .Workspace import Workspace, DURATIONS_CHOICES

SUBSCRIPTION_TYPE_CHOICES = [
    ('year', 'Année'),
    ('week', 'Semaine'),
    ('day', 'Jour'),
    ('hour', 'Houre'),
]

SUBSCRIPTION_TYPE_PRICES = {
    'year': 38,  
    'week': 15, 
    'day': 7,    
    'hour': 5    
}


class Subscription(models.Model):
    idSubscription=models.AutoField(primary_key=True)
    users = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, blank=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.SET_NULL, null=True, blank=True)
    subscription_type = models.CharField(max_length=50, choices=SUBSCRIPTION_TYPE_CHOICES)
    amount = models.FloatField()
    status = models.CharField(max_length=20, choices=[('active', 'Actif'), ('inactive', 'Inactif')])
    start_date = models.DateField()
    end_date = models.DateField()


    def save(self, *args, **kwargs):
        # Vérification : si type d'abonnement est 'year' et montant est 38
        if self.subscription_type == 'year' and self.amount == SUBSCRIPTION_TYPE_PRICES['year']:
            self.status = 'active'
        super().save(*args, **kwargs)


    def assign_type_workspace_pricing_subscription(self):
        if self.subscription_type not in dict(SUBSCRIPTION_TYPE_CHOICES):
            raise ValueError(f"Type d'abonnement non valide : {self.subscription_type}")

        if self.workspace.duration not in dict(DURATIONS_CHOICES):
            raise ValueError(f"Durée non valide : {self.workspace.duration}")

        if ( self.amount == SUBSCRIPTION_TYPE_PRICES['year'] and self.subscription_type == "year" ): 
            if self.workspace.duration not in ['hour', 'half_day', 'full_day']:
                raise ValueError(f"Durée non valide : {self.workspace.duration}")
        
            if self.workspace.workspace_type == 'individual_office':
                if self.workspace.duration == "hour":
                    self.price_per_hour = 1.5
                elif self.workspace.duration == "half_day":
                    if (self.morning_start and self.morning_end) or (self.afternoon_start and self.afternoon_end):
                        self.price_per_day = 4
                elif self.workspace.duration == "full_day":
                    self.price_per_day = 8

            elif self.workspace.workspace_type == 'shared_office':
                capacity  = Workspace.get_capacity(self.workspace.workspace_type)
                if self.workspace.duration == "hour":
                        self.price_per_hour = 0.5 * capacity
                elif self.workspace.duration == "half_day":
                        if (self.morning_start and self.morning_end) or (self.afternoon_start and self.afternoon_end):
                            self.price_per_day = 2 * capacity
                elif self.workspace.duration == "full_day":
                        self.price_per_day = 20 * capacity

            elif self.workspace.workspace_type == 'meeting_room':
                if self.workspace.duration == "hour":
                        self.price_per_hour = 4
                elif self.workspace.duration == "half_day":
                        if (self.morning_start and self.morning_end) or (self.afternoon_start and self.afternoon_end):
                            self.price_per_day =  20
                elif self.workspace.duration == "full_day":
                        self.price_per_day = 30 

            elif self.workspace.workspace_type == 'open_space':
                if self.workspace.duration == "hour":
                        self.price_per_hour = 1
                elif self.workspace.duration == "half_day":
                        if (self.morning_start and self.morning_end) or (self.afternoon_start and self.afternoon_end):
                            self.price_per_day = 3
                elif self.workspace.duration == "full_day":
                        self.price_per_day = 7

    class Meta:
        db_table = 'Subscription'
        verbose_name = "Subscription"
        verbose_name_plural = "Subscriptions"
    
    
    def __str__(self):
         return (
            f"Abonnement {self.subscription_type} - "
            f"Utilisateur: {self.users} - "
            f"Montant: {self.amount}€ - "
            f"Statut: {self.status}"
    )
