# filepath: /c:/Users/artus/OneDrive/Desktop/studieprojekt 2/Studienprojekt2/storeitems/views.py
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

class ProductDetailAPI(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'storeitems/product_detail.html', {'product': product})

@api_view(['GET'])
def get_product(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)