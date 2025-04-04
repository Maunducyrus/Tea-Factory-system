from rest_framework import serializers
from .models import Product, Farmer, Order, Report, UserProfile

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'tea_type', 'quantity_kg']
        # fields = '__all__'

# Farmer Serializer
class FarmerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        model = Farmer
        # fields = '__all__'
        fields = ['id', 'name', 'phone_number', 'email', 'location', 'total_supplied_kg', 'image']

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    # changes made - changed product_name to tea_type_name
    product_name = serializers.ReadOnlyField(source='product.name', read_only='True')           
    tea_type = serializers.CharField(source='product.tea_type', read_only=True)  # ✅ Get the actual name
    class Meta:
        model = Order
        fields = ['customer_name', 'phone_number', 'product', 'product_name', 'tea_type', 'quantity_kg', 'total_price', 'status', 'order_date']
        # fields = '__all__'

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