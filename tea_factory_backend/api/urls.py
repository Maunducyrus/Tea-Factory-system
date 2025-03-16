# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProductViewSet, FarmerViewSet, OrderViewSet, ReportViewSet, UserProfileViewSet, register_user, login_user, logout_user

# router = DefaultRouter()
# router.register(r'products', ProductViewSet)
# router.register(r'farmers', FarmerViewSet)
# router.register(r'orders', OrderViewSet)
# router.register(r'reports', ReportViewSet)
# router.register(r'users', UserProfileViewSet)

# urlpatterns = [
#     path('api/', include(router.urls)),  # Register all API routes
#     path('api/register/', register_user, name="register"),
#     path('api/login/', login_user, name="login"),
#     path('api/logout/', logout_user, name="logout"),
# ]