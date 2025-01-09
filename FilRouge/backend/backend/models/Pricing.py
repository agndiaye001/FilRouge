from django.db import models
from .Workspace import Workspace

class Pricing(models.Model):
    idPricing=models.AutoField(primary_key=True)
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_week = models.DecimalField(max_digits=10, decimal_places=2)
    # Hour
    morning_start = models.TimeField(default="08:00")
    morning_end = models.TimeField(default="13:30")
    afternoon_start = models.TimeField(default="13:30")
    afternoon_end = models.TimeField(default="19:00")

    workspace = models.ForeignKey(Workspace, on_delete=models.SET_NULL, null=True, blank=True)


    def assign_type_workspace_pricing_non_subscription(self):

        if self.workspace.duration not in ['hour', 'half_day', 'full_day']:
            raise ValueError(f"Durée non valide : {self.workspace.duration}")
        
        if self.workspace.workspace_type == 'individual_office':
            self.price_per_hour = 3 if self.workspace.duration == "hour" else None
            self.price_per_day = 8 if self.workspace.duration == "half_day" else 16 if self.workspace.duration == "full_day" else None
        elif self.workspace.workspace_type == 'shared_office':
            capacity  = Workspace.get_capacity(self.workspace.workspace_type)
            if self.workspace.duration == "hour":
                    self.price_per_hour = 1.5 * capacity
            elif self.workspace.duration == "half_day":
                    if (self.morning_start and self.morning_end) or (self.afternoon_start and self.afternoon_end):
                        self.price_per_day = 4 * capacity
            elif self.workspace.duration == "full_day":
                    self.price_per_day = 40 * capacity

        elif self.workspace.workspace_type == 'meeting_room':
            if self.workspace.duration == "hour":
                    self.price_per_hour = 8 
            elif self.workspace.duration == "half_day":
                    if (self.morning_start and self.morning_end) or (self.afternoon_start and self.afternoon_end):
                        self.price_per_day =  40
            elif self.workspace.duration == "full_day":
                    self.price_per_day = 60 

        elif self.workspace.workspace_type == 'open_space':
            if self.workspace.duration == "hour":
                    self.price_per_hour = 2 
            elif self.workspace.duration == "half_day":
                    if (self.morning_start and self.morning_end) or (self.afternoon_start and self.afternoon_end):
                        self.price_per_day = 7
            elif self.workspace.duration == "full_day":
                    self.price_per_day = 15 
        else:
            raise ValueError(f"Type d'espace non valide : {self.workspace.workspace_type}")
    

    def __str__(self):
        return f"Tarification pour {self.workspace.workspace_type} - {self.workspace.duration}"

    class Meta:
        db_table = 'Pricing'
        verbose_name = "Pricing"
        verbose_name_plural = "Pricings"