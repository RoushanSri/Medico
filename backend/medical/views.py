from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Medication, Report, Appointment
from .serializers import MedicationSerializer, ReportSerializer, AppointmentSerializer

class MedicationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MedicationSerializer
    
    def get_queryset(self):
        if self.request.user.user_type == 'doctor':
            return Medication.objects.filter(prescribed_by__user=self.request.user)
        return Medication.objects.filter(patient__user=self.request.user)

class ReportViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ReportSerializer
    
    def get_queryset(self):
        if self.request.user.user_type == 'doctor':
            return Report.objects.filter(doctor__user=self.request.user)
        return Report.objects.filter(patient__user=self.request.user)

class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        if self.request.user.user_type == 'doctor':
            return Appointment.objects.filter(doctor__user=self.request.user)
        return Appointment.objects.filter(patient__user=self.request.user)