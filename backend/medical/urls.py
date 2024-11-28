from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'medications', views.MedicationViewSet, basename='medication')
router.register(r'reports', views.ReportViewSet, basename='report')
router.register(r'appointments', views.AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('', include(router.urls)),
]