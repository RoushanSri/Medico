from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Patient, Doctor
from .serializers import UserSerializer, PatientSerializer, DoctorSerializer

@api_view(['POST'])
def login(request):
    user_id = request.data.get('userId')
    password = request.data.get('password')
    
    user = authenticate(username=user_id, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
    return Response({'error': 'Invalid credentials'}, status=400)



class PatientViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PatientSerializer
    
    def get_queryset(self):
        if self.request.user.user_type == 'doctor':
            return Patient.objects.all()
        return Patient.objects.filter(user=self.request.user)

class DoctorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()