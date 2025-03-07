from django.contrib import admin
from django.urls import path, include
from store.views import frontpage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('storeitems.urls')),
    path('api/auth/', include('storeitems.urls_auth')),  # Ändere dies zu 'api/auth/'
    path('', frontpage, name='frontpage'),
]