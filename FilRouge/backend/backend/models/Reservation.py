from django.db import models
from .Workspace import Workspace
from .Users import Users
from .Subscription import Subscription, SUBSCRIPTION_TYPE_CHOICES, SUBSCRIPTION_TYPE_PRICES
from .Pricing import Pricing




class Reservation(models.Model):
    idReservation=models.AutoField(primary_key=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=False, blank=False)
    subscription = models.ForeignKey(Subscription, on_delete=models.SET_NULL, null=True, blank=True)
    pricing = models.ForeignKey(Pricing, on_delete=models.SET_NULL, null=True, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=[('pending', 'En attente'), ('confirmed', 'Confirmer'), ('cancelled', 'Annuler')], default='pending')

    class Meta:
        db_table = 'Reservation'
        verbose_name = "Reservation"
        verbose_name_plural = "Reservations"


    def calculate_total_price(self):
         
        if not self.subscription or self.subscription.status != 'active':
            raise ValueError("Souscription invalide ou inactive")
        
        if not self.pricing:
            raise ValueError("Aucune tarification associée à la réservation")

        subscription_type = self.subscription.suscription_type

        if subscription_type not in dict(SUBSCRIPTION_TYPE_CHOICES):
            raise ValueError(f"Type d'abonnement non valide : {self.suscription_type}")
        
        # Calculer la durée de la réservation en heures
        duration = (self.end_time - self.start_time).total_seconds() / 3600  

        # Prix normal dans Pricing
        # Vérification de la durée
        if self.pricing.duration_choices == "hour":
            self.total_price = self.pricing.price_per_hour * duration
        elif self.pricing.duration_choices == "half_day":
            self.total_price = self.pricing.price_per_day
        elif self.pricing.duration_choices == "full_day":
            self.total_price = self.pricing.price_per_day
        else:
            raise ValueError(f"Durée de réservation invalide : {self.pricing.duration_choices}")


        # Si Abonnement ( Susbcription)
        if self.subscription:
            subscription_type = self.subscription.suscription_type
            if subscription_type == 'year':
                # 10% de reduction
                self.total_price *= 0.9
                return self.total_price
        self.save()
        return self.total_price 


    def __str__(self):
        return f"Reservation de {self.user.first_name} {self.user.last_name} pour {self.workspace.workspace_type}"



""" def __str__(self):
        return f"{self.name} - Réservation de {self.user.name} pour {self.workspace.workspace_type}"
    """

"""
def calculate_total_price(self):

    if self.subscription and self.subscription.status == 'active':
        # Récupérer le type d'abonnement et le prix associé
        subscription_type = self.subscription.suscription_type
        if subscription_type in SUSCRIPTION_TYPE_PRICES:
            price_per_unit = SUSCRIPTION_TYPE_PRICES[subscription_type]  # Récupérer le prix associé
            # Calculer la durée de la réservation en heures
            duration = (self.end_time - self.start_time).total_seconds() / 3600  # Durée en heures
            return price_per_unit * duration  # Calcul du prix total
        else:
            return 0  # Aucun coût si le type d'abonnement n'est pas reconnu
    else:
        return 0  # Aucun coût si l'abonnement n'est pas actif

"""