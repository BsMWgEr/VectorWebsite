
from django.contrib import admin
from .models import SoldDetail, ShippingDetail, InventoryObject, Message, Customer, CustomerShippingAddress, Image, Item


#admin.site.register(Item)

admin.site.register(Image)
admin.site.register(SoldDetail)
admin.site.register(ShippingDetail)
admin.site.register(CustomerShippingAddress)
admin.site.register(Customer)







@admin.action(description='Change to sold')
def change_to_sold(modeladmin, request, queryset):
    queryset.update(sold=True)


@admin.action(description='Change to NOT sold')
def change_to_not_sold(modeladmin, request, queryset):
    queryset.update(sold=False)


@admin.action(description='Change to in-stock')
def change_to_in_stock(modeladmin, request, queryset):
    queryset.update(in_stock=True)


@admin.action(description='Change to out of stock')
def change_to_out_of_stock(modeladmin, request, queryset):
    queryset.update(sold=False)


@admin.register(InventoryObject)
class InventoryObjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'inventory_item', 'sold_data', 'shipping_data')
    ordering = ('-id',)


@admin.register(Item)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'size', 'serial_number', 'in_stock', 'sold')
    ordering = ('-id',)
    search_fields = ('id', 'name', 'serial_number', 'in_stock', 'sold')
    actions = [change_to_sold, change_to_not_sold, change_to_out_of_stock, change_to_in_stock]
    list_filter = ('type', 'in_stock', 'sold', 'size')


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'confirmation_number', 'subject', 'read', 'email')
    readonly_fields = ('email', 'comment', 'confirmation_number', 'time')
    search_fields = ('email', 'time', 'confirmation_number', 'subject', 'read')