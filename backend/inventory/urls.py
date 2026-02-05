from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, inventory_dashboard, currency_api

router = DefaultRouter()
router.register('products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', inventory_dashboard),
    path('currency/', currency_api),
]
