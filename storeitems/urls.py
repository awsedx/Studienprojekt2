from django.urls import path
from .views import ProductDetailAPI, get_product, add_to_cart, get_cart, create_order

urlpatterns = [
    path('products/', get_product, name='get_product'),
    path('product/<slug:slug>/', ProductDetailAPI.as_view(), name='product_detail_api'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('cart/', get_cart, name='get_cart'),
    path('order/create/', create_order, name='create_order'),
]