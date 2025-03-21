from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Product, Farmer, Order, Report, UserProfile
from .serializers import ProductSerializer, FarmerSerializer, OrderSerializer, ReportSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import login
from rest_framework.generics import CreateAPIView

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    total_orders = Order.objects.count()
    pending_orders = Order.objects.filter(status="Pending").count()
    completed_orders = Order.objects.filter(status="Delivered").count()
    total_revenue = sum(order.total_price for order in Order.objects.filter(status="Delivered"))

    return Response({
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "completed_orders": completed_orders,
        "total_revenue": total_revenue
    })

# Public Order Creation View
class PublicOrderCreateView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    
    # Allow any user to create an order
    def create(self, request, *args, **kwargs):
        # Get the data from the request
        data = request.data.copy()
        
        # If product is provided as a string (name), look up the product ID
        if 'product' in data and isinstance(data['product'], str):
            try:
                product = Product.objects.get(name=data['product'])
                data['product'] = product.id
            except Product.DoesNotExist:
                return Response(
                    {"product": [f"Product with name '{data['product']}' does not exist."]},
                    status=400
                )
        
        # Create a serializer with the modified data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=201, headers=headers)
# Product ViewSet (CRUD for Products)
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Farmer ViewSet (CRUD for Farmers)
class FarmerViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    permission_classes = [permissions.IsAuthenticated]

# Order ViewSet (CRUD for Orders)
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    # allowing all people place orders
    def get_permission(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

# Report ViewSet (CRUD for Reports)
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]    

# UserProfile ViewSet (CRUD for Users)
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]    

# Register API
@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")    

    if not username or not password:
        return Response({"error": "Username and Password are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)
    token, created = Token.objects.get_or_create(user=user)

    login(request, user)
    
    return Response({"message": "User registered successfully", "token": token.key})

# Login API
@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    # password = request.data.get("password")

    # user = authenticate(username=username, password=password)
    # if user:
    #     token, created = Token.objects.get_or_create(user=user)
    #     return Response({"message": "Login successful", "token": token.key})
    # else:
    #     return Response({"error": "Invalid credentials"}, status=400)
    try:
        user = User.objects.get(username=username)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful (without password)", "token": token.key})
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=400)


# Logout API
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.auth.delete()
    return Response({"message": "Logout successful"})    

    

