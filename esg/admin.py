from django.contrib import admin
from .models import Company, BusinessUnit, Metric

admin.site.register(Company)
admin.site.register(BusinessUnit)
admin.site.register(Metric)

# Register your models here.
