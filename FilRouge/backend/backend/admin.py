# admin.py
from django.contrib import admin
from .models.Workspace import Workspace
from .models.Users import Users
from .models.Subscription import Subscription
from .models.Admin import Admin
from .models.Reservation import Reservation
from .models.Pricing import Pricing
from .models.Transaction import Transaction
from .models.Visitor import Visitor
from .models.ResourceManager import ResourceManager


# Enregistrement des modèles dans l'admin
admin.site.register(Workspace)
admin.site.register(Users)
admin.site.register(Subscription)
admin.site.register(Admin)
admin.site.register(Reservation)
admin.site.register(Pricing)
admin.site.register(Transaction)
admin.site.register(Visitor)
admin.site.register(ResourceManager)