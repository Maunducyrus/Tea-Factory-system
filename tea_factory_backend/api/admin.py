from django.contrib import admin
from .models import Product, Farmer, Order, Report, UserProfile

# Register your models here.
# Register Product Model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_per_kg', 'stock_quantity', 'created_at')
    search_fields = ('name',)

# Register Farmer Model
@admin.register(Farmer)
class FarmerAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'email', 'location', 'total_supplied_kg')
    search_fields = ('name', 'phone_number')