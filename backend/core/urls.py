from django.contrib import admin
from django.urls import path, include
from inventory.views import home  # optional home view

# Optional: root endpoint to check if API is running
def home(request):
    from django.http import JsonResponse
    return JsonResponse({"message": "Inventory Management API is running!"})

urlpatterns = [
    path("", home),  # root URL
    path("admin/", admin.site.urls),
    path("api/", include("inventory.urls")),  # include inventory app URLs
]
