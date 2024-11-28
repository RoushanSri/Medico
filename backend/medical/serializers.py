from rest_framework import serializers
from .models import Medication, Report, ReportValue, Appointment

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'

class ReportValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportValue
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    values = ReportValueSerializer(many=True, read_only=True)
    
    class Meta:
        model = Report
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'