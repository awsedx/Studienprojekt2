from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Product, Cart, Order, OrderItem
from .serializers import ProductSerializer, CartSerializer, OrderSerializer, OrderItemSerializer
from django.shortcuts import render, get_object_or_404

class ProductDetailAPI(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'storeitems/product_detail.html', {'product': product})

@api_view(['GET'])
def get_product(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    product = Product.objects.get(id=product_id)
    cart_item, created = Cart.objects.get_or_create(user=user, product=product)
    if not created:
        cart_item.quantity += quantity
    cart_item.save()
    return Response({'status': 'success'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_cart(request):
    user = request.user
    cart_items = Cart.objects.filter(user=user)
    serializer = CartSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_order(request):
    user = request.user
    cart_items = Cart.objects.filter(user=user)
    if not cart_items.exists():
        return Response({'status': 'error', 'message': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
    order = Order.objects.create(user=user)
    for item in cart_items:
        OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
        item.delete()
    return Response({'status': 'success', 'order_id': order.id}, status=status.HTTP_201_CREATED)