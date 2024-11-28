from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
    )
    
    user_id = models.CharField(max_length=10, unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    
    def save(self, *args, **kwargs):
        if not self.user_id:
            prefix = 'P-' if self.user_type == 'patient' else 'D-'
            self.user_id = f"{prefix}{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True)
    blood_type = models.CharField(max_length=5, null=True)
    allergies = models.TextField(blank=True)
    emergency_contact_name = models.CharField(max_length=100, null=True)
    emergency_contact_phone = models.CharField(max_length=20, null=True)

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    patients = models.ManyToManyField(Patient, related_name='doctors')