from django.db import models
from users.models import Patient, Doctor

class Medication(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    prescribed_by = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50)
    frequency = models.CharField(max_length=50)
    time = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    active = models.BooleanField(default=True)

class Report(models.Model):
    STATUS_CHOICES = (
        ('normal', 'Normal'),
        ('high', 'High'),
        ('low', 'Low'),
    )
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    date = models.DateField()
    diagnosis = models.TextField()
    notes = models.TextField(blank=True)

class ReportValue(models.Model):
    report = models.ForeignKey(Report, related_name='values', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    unit = models.CharField(max_length=20)
    normal_range = models.CharField(max_length=50)
    status = models.CharField(max_length=10, choices=Report.STATUS_CHOICES)

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    type = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='scheduled')