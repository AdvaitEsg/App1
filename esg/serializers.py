from rest_framework import serializers
from .models import Company, BusinessUnit, Metric

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class BusinessUnitSerializer(serializers.ModelSerializer):
    operational_location = serializers.CharField(source='company.operational_location', read_only=True)
    primary_activity = serializers.CharField(source='company.primary_activity', read_only=True)
    
    class Meta:
        model = BusinessUnit
        fields = ['id', 'company', 'name', 'operational_location', 'primary_activity']

class MetricSerializer(serializers.ModelSerializer):
    business_unit = serializers.PrimaryKeyRelatedField(queryset=BusinessUnit.objects.all())

    class Meta:
        model = Metric
        fields = '__all__'
