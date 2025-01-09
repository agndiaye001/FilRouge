from django.contrib.auth.models import User
from django.urls import include, path
from rest_framework import routers, serializers, viewsets
from django.contrib import admin
from . import views
from .views import WorkspaceViewSet
from .views.UsersViewSet import UsersViewSet
from .views.WorkspaceViewSet import WorkspaceViewSet
from .views.SubscriptionViewSet import SubscriptionViewSet
from .views.ReservationViewSet import ReservationViewSet
from .views.PricingViewSet import PricingViewSet
from .views.TransactionViewSet import TransactionViewSet
from .views.VisitorViewSet import VisitorViewSet
from .views.Login import Login
from .views.Logout import Logout
from rest_framework_simplejwt import views as jwt_views


# Créer un routeur pour les vues
router = routers.DefaultRouter()

# Users
router.register(r'users', UsersViewSet, basename='Users')
router.register(r'workspace', WorkspaceViewSet)
router.register(r'subscription', SubscriptionViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'pricing', PricingViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'visitor', VisitorViewSet)

# Définir les URL pour l'API
urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/', include('allauth.urls')),
    path('api/auth/login/', Login, name='account_login'),
    path('api/auth/logout/', Logout, name='account_logout'),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/', include('allauth.urls')),  
    path('admin/', admin.site.urls)
]


"""path('visitor/', views.get, name='get'),"""
