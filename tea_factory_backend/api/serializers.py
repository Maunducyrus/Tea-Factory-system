from rest_framework import serializers
from .models import Product, Farmer, Order, Report, UserProfile

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'