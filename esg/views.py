from rest_framework import viewsets
from esg.models import Company, BusinessUnit, Metric
from esg.serializers import CompanySerializer, BusinessUnitSerializer, MetricSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('-reporting_period')
    serializer_class = CompanySerializer

class BusinessUnitViewSet(viewsets.ModelViewSet):
    queryset = BusinessUnit.objects.all().select_related('company')
    serializer_class = BusinessUnitSerializer

class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metric.objects.all().select_related('business_unit')
    serializer_class = MetricSerializer

