from .models import Company, BusinessUnit, Metric

def get_company_metrics_summary(company_id):
    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist:
        return None

    units = BusinessUnit.objects.filter(company_id=company_id)
    metrics = Metric.objects.filter(business_unit__in=units)

    summary = {
        "company_id": company_id,
        "company_name": company.name,
        "metric_count": metrics.count(),
        "metric_total_value": sum([m.value for m in metrics]),
        "metrics": [
            {
                "id": m.id,
                "name": m.name,
                "value": m.value,
                "year": m.year,
                "unit": m.unit
            } for m in metrics
        ]
    }
    return summary