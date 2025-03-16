from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Product, Farmer, Order, Report, UserProfile
from .serializers import ProductSerializer, FarmerSerializer, OrderSerializer, ReportSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# Product ViewSet (CRUD for Products)
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
