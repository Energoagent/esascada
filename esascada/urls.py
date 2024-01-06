
from django.contrib import admin
from django.urls import path

from server import views

urlpatterns = [
    path('', views.main),
    path('main/', views.main),
    path('switchgear_10/', views.switchgear_10),
    path('switchgear_10/parameters/', views.Parameters.as_view()),
    path('switchgear_10/control/', views.Control.as_view()),
#    path('switchgear_110/', views.switchgear_110),
#    path('about/', views.about),
#    path('admin/', admin.site.urls),
#    path('accounts/', include('django.contrib.auth.urls')),
]
