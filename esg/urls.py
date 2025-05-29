from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, BusinessUnitViewSet  # Import your viewsets

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'units', BusinessUnitViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Includes all DRF-generated URLs
]