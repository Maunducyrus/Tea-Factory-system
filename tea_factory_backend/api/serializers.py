from rest_framework import serializers
from .models import Product, Farmer, Order, Report, UserProfile

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# Farmer Serializer
class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    # changes made - changed product_name to tea_type_name
    tea_type_name = serializers.ReadOnlyField(source='tea_type.name')            
    class Meta:
        model = Order
        fields = '__all__'

# Report Serializer
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

# UserProfile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserProfile
        fields = '__all__'                