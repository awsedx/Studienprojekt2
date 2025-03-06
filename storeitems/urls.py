# filepath: /c:/Users/artus/OneDrive/Desktop/studieprojekt 2/Studienprojekt2/storeitems/urls.py
from django.urls import path
from .views import ProductDetailAPI, get_product

urlpatterns = [
    path('products/', get_product, name='get_product'),
    path('product/<slug:slug>/', ProductDetailAPI.as_view(), name='product_detail_api'),
]