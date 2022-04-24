from django.contrib import admin
from .models import Item, Image, SoldDetail, ShippingDetail, CustomerShippingAddress, Customer, Message, InventoryObject
# Register your models here.


admin.site.register(Item)
admin.site.register(Image)
admin.site.register(SoldDetail)
admin.site.register(ShippingDetail)
admin.site.register(CustomerShippingAddress)
admin.site.register(Customer)
admin.site.register(Message)
admin.site.register(InventoryObject)


