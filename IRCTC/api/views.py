# api/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from django.contrib.auth import get_user_model
from .models import Train, Booking
from .serializers import UserSerializer, TrainSerializer, BookingSerializer
from rest_framework.permissions import AllowAny


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = User.objects.filter(username=username).first()
#         if user and user.check_password(password):
#             refresh = RefreshToken.for_user(user)
#             return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
#         return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class TrainCreateView(generics.CreateAPIView):
    queryset = Train.objects.all()
    serializer_class = TrainSerializer
    permission_classes = [permissions.IsAuthenticated]

class TrainListView(generics.ListAPIView):
    queryset = Train.objects.all()
    serializer_class = TrainSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        source = self.request.query_params.get('source')
        destination = self.request.query_params.get('destination')
        return Train.objects.filter(source=source, destination=destination)

class BookingCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        train_id = request.data.get('train_id')
        train = Train.objects.select_for_update().get(id=train_id)
        if train.available_seats > 0:
            train.available_seats -= 1
            train.save()
            booking = Booking.objects.create(user=request.user, train=train)
            return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)
        return Response({'error': 'No seats available'}, status=status.HTTP_400_BAD_REQUEST)

class BookingDetailView(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
