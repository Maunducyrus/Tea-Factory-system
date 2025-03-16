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

# Register Order Model
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'product', 'quantity_kg', 'total_price', 'status', 'order_date')
    list_filter = ('status',)
    search_fields = ('customer_name', 'product__name')

# Register Report Model
@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('report_type', 'total_orders', 'total_kg_sold', 'total_revenue', 'generated_at')        