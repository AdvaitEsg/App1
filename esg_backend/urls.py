"""
URL configuration for esg_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from esg.views import CompanyViewSet, BusinessUnitViewSet, MetricViewSet,CompanyMetricsSummaryView
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView, TokenVerifyView,)


router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'business-units', BusinessUnitViewSet)
router.register(r'metrics', MetricViewSet)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify',  TokenVerifyView.as_view(), name='token_verify'),  # <-- Add this line
    path('api/company-metrics-summary/<int:company_id>/', CompanyMetricsSummaryView.as_view(), name='company_metrics_summary'),
    path('admin/', admin.site.urls),
    path('api/', include('esg.urls')), 
    re_path(r'^(?!api/|admin/).*$', TemplateView.as_view(template_name="index.html")),
]

