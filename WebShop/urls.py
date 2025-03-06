# filepath: /c:/Users/artus/OneDrive/Desktop/studieprojekt 2/Studienprojekt2/WebShop/urls.py
from django.contrib import admin
from django.urls import path, include
from store.views import frontpage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('storeitems.urls')),
    path('', frontpage, name='frontpage'),
]