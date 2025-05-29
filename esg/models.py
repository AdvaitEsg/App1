from django.db import models

class Company(models.Model):
    SECTOR_CHOICES = [
        ('ENERGY', 'Energy'),
        ('TECH', 'Technology'),
        ('FIN', 'Financial'),
        ('MANU', 'Manufacturing'),
    ]
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    sector = models.CharField(max_length=50, choices=SECTOR_CHOICES)
    reporting_period = models.DateField()
    operational_location = models.CharField(max_length=100)
    primary_activity = models.TextField()

    def __str__(self):
        return self.name

class BusinessUnit(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='business_units')
    name = models.CharField(max_length=200)

    @property
    def operational_location(self):
        return self.company.operational_location

    @property
    def primary_activity(self):
        return self.company.primary_activity

    def __str__(self):
        return f"{self.company.name} - {self.name}"

class Metric(models.Model):
    business_unit = models.ForeignKey(BusinessUnit, on_delete=models.CASCADE, related_name='metrics')
    name = models.CharField(max_length=200)
    value = models.FloatField()
    year = models.PositiveIntegerField()
    unit = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('business_unit', 'name', 'year')

    def __str__(self):
        return f"{self.business_unit} - {self.name} ({self.year})"
