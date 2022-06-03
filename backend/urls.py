from django.urls import path

from . import views

urlpatterns = [
    path('inventory-instock/', views.inventory_view_instock, name="other-instock"),
    path('inventory-comingsoon/', views.inventory_view_comingsoon, name="other-comingsoon"),
    path('inventory-sold/', views.inventory_view_sold, name="other-sold"),
    path('inventory-shipping/', views.inventory_view_shipping, name="other-shipping"),
    path('inventory-completed/', views.inventory_view_completed, name="other-completed"),
    path('builder/', views.build_it, name="builder"),
    path('media/', views.media_view, name="media"),
    path('inventory/', views.inventory_view, name="inventory"),
    path('contact-requests/', views.contact_requests_view, name="messages"),
    path('search/', views.inventory_search_view, name="search"),
    path('shipped/', views.shipped_view, name="shipped"),

]