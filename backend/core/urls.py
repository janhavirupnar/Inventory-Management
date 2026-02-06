from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Root endpoint to check if API is running
def home(request):
    return JsonResponse({"message": "Inventory Management API is running!"})

urlpatterns = [
    path("", home),  # root URL
    path("admin/", admin.site.urls),
    path("api/", include("inventory.urls")),  # include inventory app URLs
]