
from django.contrib import admin
from .models import SoldDetail, ShippingDetail, InventoryObject, Message, Customer, CustomerShippingAddress, \
    Media, Name, Size, InventoryItem, CustomerHold

admin.site.register(CustomerHold)

admin.site.register(SoldDetail)
admin.site.register(ShippingDetail)
admin.site.register(CustomerShippingAddress)
admin.site.register(Customer)



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


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'size', 'serial_number', 'in_stock')
    ordering = ('-id',)
    search_fields = ('id', 'name', 'serial_number', 'in_stock')
    actions = [change_to_out_of_stock, change_to_in_stock]
    list_filter = ('type', 'in_stock','size')


@admin.register(Name)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('type', 'name')
    search_fields = ('name', 'type', 'description_info')
    actions = []
    list_filter = ('type',)


@admin.register(Size)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('type', 'size')
    search_fields = ('size', 'type')
    actions = []
    list_filter = ('type',)


@admin.register(Media)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'mediatype')
    search_fields = ('id', 'name', 'mediatype', 'filetype')
    actions = []
    list_filter = ('mediatype', 'filetype')


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'confirmation_number', 'subject', 'read', 'email')
    readonly_fields = ('email', 'comment', 'confirmation_number', 'time')
    search_fields = ('email', 'time', 'confirmation_number', 'subject', 'read')