from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from stockvectorrigs.aws.connect import s3
from backend.forms import IdForm, BuildForm
from backend.models import InventoryObject, InventoryItem, PageVisitData, Media, Customer, Name, Size, CustomerHold


@login_required
def media_view(request):

    buckets = s3.Bucket(name='stockvectorrigs')  # or just the variable AWS_BUCKET_NAME
    bucket_object_name = []
    bucket_object2 = []

    all_obj = buckets.objects.all()
    for obj in all_obj:
        x = obj.key
        if '/images/' in x:
            bucket_object_name.append(obj.key)

    for obj in all_obj:
        x = obj.key
        if '/confirmation_reports/' in x:
            bucket_object2.append(obj.key)

    context = {
        'bucket_object_name': bucket_object_name,
        'bucket_object2': bucket_object2
    }
    return render(request, 'media.html', context=context)


@login_required
def inventory_view(request):
    items = InventoryObject.objects.all().filter(sold_data__isnull=True)
    customers = Customer.objects.all()
    summary_title = "ALL (Click to Expand)"
    x = InventoryObject.objects.all()

    context = {
        'summary_title': summary_title,
        'all': x,
        'items': items,
        'customers': customers,
    }
    return render(request, 'inventory.html', context=context)


@login_required
def inventory_view_instock(request):
    summary_title = "In Stock"
    x = InventoryObject.objects.all()
    instock_true = []
    for z in x:
        if z.inventory_item.in_stock:
            if not z.sold_data:
                if not z.shipping_data:
                    if not z.completed_order:
                        instock_true.append(z)

    context = {
        'all': instock_true,
        'summary_title': summary_title,
    }
    return render(request, 'inventory-instock.html', context=context)


@login_required
def inventory_view_comingsoon(request):
    items = InventoryItem.objects.all()
    customers = Customer.objects.all()
    summary_title = "Coming Soon"
    x = InventoryObject.objects.all()
    instock_false = []
    for z in x:
        if not z.inventory_item.in_stock:
            if not z.sold_data:
                if not z.shipping_data:
                    if not z.completed_order:
                        instock_false.append(z)

    context = {
        'all': instock_false,
        'summary_title': summary_title,
        'items': items,
        'customers': customers,
    }
    return render(request, 'inventory-comingsoon.html', context=context)


@login_required
def inventory_view_sold(request):
    summary_title = "Sold"
    x = InventoryObject.objects.all()
    sold_true = []
    for z in x:
        if z.sold_data:
            if not z.shipping_data and not z.completed_order:
                sold_true.append(z)

    context = {
        'all': sold_true,
        'summary_title': summary_title,
    }
    return render(request, 'inventory-sold.html', context=context)


@login_required
def inventory_view_shipping(request):
    summary_title = "Shipping"
    x = InventoryObject.objects.all()
    shipping = []
    for z in x:
        if z.shipping_data:
            if not z.completed_order:
                shipping.append(z)

    context = {
        'all': shipping,
        'summary_title': summary_title,
    }
    return render(request, 'inventory-shipping.html', context=context)


@login_required
def inventory_view_completed(request):
    summary_title = "Completed Orders"
    x = InventoryObject.objects.all()
    completed = []
    for z in x:
        if z.completed_order:
            completed.append(z)

    context = {
        'all': completed,
        'summary_title': summary_title,
    }
    return render(request, 'inventory-completed.html', context=context)


@login_required
def shipped_view(request):
    return render(request, 'shipped.html')


@login_required
def build_it(request):
    dropdown = InventoryItem.objects.all()
    total_visits = len(PageVisitData.objects.all())
    form = IdForm()

    pict = Media.objects.all().filter(key__contains="images/")
    confirm = Media.objects.all().filter(key__contains="confirmation_reports/")
    form2 = BuildForm()
    all_items = InventoryItem.objects.all()
    names = Name.objects.all()
    sizes = Size.objects.all()
    holds = CustomerHold.objects.all()

    context = {
        'total_visits': total_visits,
        'dropdown': dropdown,
        'form': form,
        'pict': pict,
        'confirm': confirm,
        'form2': form2,
        'all_items': all_items,
        'name_options': names,
        'size_options': sizes,
        'hold_options': holds,
    }
    return render(request, "build.html", context=context)