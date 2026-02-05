from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
import requests

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@api_view(['GET'])
def inventory_dashboard(request):
    return Response({
        "total_products": Product.objects.count(),
        "low_stock": Product.objects.filter(quantity__lt=10).count(),
        "category_counts": Product.objects.values('category').annotate(count=Count('id'))
    })


@api_view(['GET'])
def currency_api(request):
    res = requests.get("https://api.exchangerate-api.com/v4/latest/USD")
    return Response(res.json())
