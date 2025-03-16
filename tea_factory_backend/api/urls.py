from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, FarmerViewSet, OrderViewSet, ReportViewSet, UserProfileViewSet, register_user, login_user, logout_user

