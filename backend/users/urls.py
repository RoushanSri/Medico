from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'patients', views.PatientViewSet, basename='patient')
router.register(r'doctors', views.DoctorViewSet, basename='doctor')

urlpatterns = [
    path('login/', views.login),
    path('', include(router.urls)),
]