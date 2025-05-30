from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated  # or AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from esg.models import Company, BusinessUnit, Metric
from esg.serializers import CompanySerializer, BusinessUnitSerializer, MetricSerializer
from esg.services import get_company_metrics_summary

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('-reporting_period')
    serializer_class = CompanySerializer

class BusinessUnitViewSet(viewsets.ModelViewSet):
    queryset = BusinessUnit.objects.all().select_related('company')
    serializer_class = BusinessUnitSerializer

class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metric.objects.all().select_related('business_unit')
    serializer_class = MetricSerializer

class CompanyMetricsSummaryView(APIView):
    permission_classes = [IsAuthenticated]  # Or [AllowAny]

    def get(self, request, company_id):
        summary = get_company_metrics_summary(company_id)
        if summary is None:
            return Response({"detail": "Company not found."}, status=404)
        return Response(summary)

    

