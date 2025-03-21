from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import ProductViewSet, FarmerViewSet, OrderViewSet, ReportViewSet, UserProfileViewSet, register_user, login_user, logout_user, PublicOrderCreateView


router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'farmers', FarmerViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'users', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Register all API routes without the 'api/' prefix
    path('register/', register_user, name="register"),
    path('login/', login_user, name="login"),
    path('logout/', logout_user, name="logout"),
    path("api/token/", obtain_auth_token, name="api_token_auth"), # Obtain token for authenticated user
    path('public-order-create/', PublicOrderCreateView.as_view(), name='public-order-create'),
    path('dashboard/', dashboard, name='dashboard'),
]