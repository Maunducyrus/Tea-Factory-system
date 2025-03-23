from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    tea_type = models.CharField(max_length=255, default="Black Tea")
    description = models.TextField()
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField(default=0)
    # quantity_kg = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    # suppliers models
class Farmer(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    location = models.CharField(max_length=200)
    total_supplied_kg = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='farmers/', null=True, blank=True)

    def __str__(self):
        return self.name

# customer orders models
class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity_kg = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    order_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Calculate total price before saving
        self.total_price = self.quantity_kg * self.product.price_per_kg
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order by {self.customer_name} - {self.product.name}"

# Reports Model (Analytics & Records)
class Report(models.Model):
    report_type = models.CharField(max_length=100)  # e.g., Sales, Farmer Supply
    total_orders = models.PositiveIntegerField(default=0)
    total_kg_sold = models.PositiveIntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.report_type} Report - {self.generated_at.strftime('%Y-%m-%d')}"
    
class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('farmer', 'Farmer'),
        ('customer', 'Customer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
    
# Signal to create a user profile when a new user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
