from django.urls import path
from .views import RegisterView, LoginView, TrainCreateView, TrainListView, BookingCreateView, BookingDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('trains/', TrainListView.as_view(), name='train-list'),
    path('trains/add/', TrainCreateView.as_view(), name='train-add'),
    path('bookings/', BookingCreateView.as_view(), name='booking-create'),
    path('bookings/<int:pk>/', BookingDetailView.as_view(), name='booking-detail'),
]
