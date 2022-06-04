from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from datetime import datetime
from pytz import timezone
from stockvectorrigs.aws.connect import s3
from backend.forms import IdForm, BuildForm
from backend.models import InventoryObject, InventoryItem, PageVisitData, Media, Customer, Name, \
    Size, CustomerHold, Message, CustomerShippingAddress, SearchQuery


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
    total_active = InventoryObject.objects.all().filter(completed_order=False).count()
    total_coming_soon = InventoryObject.objects.all().filter(completed_order=False).filter(inventory_item__in_stock=False).count()
    total_in_stock = InventoryObject.objects.all().filter(completed_order=False).filter(inventory_item__in_stock=True).count()
    total_sold = InventoryObject.objects.all().filter(completed_order=False).filter(sold_data_id__isnull=False).count()
    total_shipped = InventoryObject.objects.all().filter(completed_order=False).filter(shipping_data__isnull=False).count()
    total_completed = InventoryObject.objects.all().filter(completed_order=True).count()
    items = InventoryObject.objects.all().filter(sold_data__isnull=True)
    customers = Customer.objects.all().order_by('-id')
    summary_title = "ALL (Click to Expand)"
    filter_info = ''
    names = Name.objects.all()
    sizes = Size.objects.all()
    x = []
    filter_name = None
    filter_size = None

    if request.GET.get('display') == 'all':
        x = InventoryObject.objects.all()

    if request.GET.get('filter_by_type'):
        filter_key = request.GET.get('filter_by_type')
        print(filter_key)
        x = InventoryObject.objects.all().filter(inventory_item__type=filter_key)
        filter_info += filter_key
        names = Name.objects.all().filter(type=filter_key)
        sizes = Size.objects.all().filter(type=filter_key)
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_name'):
        filter_key = request.GET.get('filter_by_name')
        filter_str = ''
        for y in filter_key:
            if y == '_':
                filter_str += ' '
            else:
                filter_str += y
        print(filter_str)
        print(filter_key)
        x = InventoryObject.objects.filter(inventory_item__type=request.GET.get('filter_by_type')).filter(
            inventory_item__name__name=filter_str)
        filter_info += filter_str
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_size'):
        filter_key = request.GET.get('filter_by_size')
        print(request.GET.get('filter_by_size'))
        filter_type = request.GET.get('filter_by_type')
        x = InventoryObject.objects.filter(inventory_item__type=filter_type).filter(
            inventory_item__size_id__exact=filter_key)
        filter_info = filter_key
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    context = {
        'summary_title': summary_title,
        'all': x,
        'items': items,
        'customers': customers,
        'filter': filter_info,
        'name': names,
        'filter_name': filter_name,
        'filter_size': filter_size,
        'size': sizes,
        'total_completed': total_completed,
        'total_sold': total_sold,
        'total_shipped': total_shipped,
        'total_active': total_active,
        'total_in_stock': total_in_stock,
        'total_coming_soon': total_coming_soon
    }
    return render(request, 'inventory.html', context=context)


@login_required
def inventory_view_instock(request):
    summary_title = "In Stock"
    filter_info = ''
    names = Name.objects.all()
    sizes = Size.objects.all()
    x = []
    filter_name = None
    filter_size = None

    if request.GET.get('display') == 'all':
        x = InventoryObject.objects.all()

    if request.GET.get('filter_by_type'):
        filter_key = request.GET.get('filter_by_type')
        print(filter_key)
        x = InventoryObject.objects.all().filter(inventory_item__type=filter_key)
        filter_info += filter_key
        names = Name.objects.all().filter(type=filter_key)
        sizes = Size.objects.all().filter(type=filter_key)
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_name'):
        filter_key = request.GET.get('filter_by_name')
        filter_str = ''
        for y in filter_key:
            if y == '_':
                filter_str += ' '
            else:
                filter_str += y
        print(filter_str)
        print(filter_key)
        x = InventoryObject.objects.filter(inventory_item__type=request.GET.get('filter_by_type')).filter(
            inventory_item__name__name=filter_str)
        filter_info += filter_str
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_size'):
        filter_key = request.GET.get('filter_by_size')
        print(request.GET.get('filter_by_size'))
        filter_type = request.GET.get('filter_by_type')
        x = InventoryObject.objects.filter(inventory_item__type=filter_type).filter(
            inventory_item__size_id__exact=filter_key)
        filter_info = filter_key
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    customers = Customer.objects.filter(solddetail__isnull=True).order_by('-id')

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
        'customers': customers,
        'filter': filter_info,
        'name': names,
        'filter_name': filter_name,
        'filter_size': filter_size,
        'size': sizes
    }
    return render(request, 'inventory-instock.html', context=context)


@login_required
def inventory_view_comingsoon(request):
    items = InventoryItem.objects.all()
    customers = Customer.objects.all().order_by('-id')
    summary_title = "Coming Soon"
    filter_info = ''
    names = Name.objects.all()
    sizes = Size.objects.all()
    x = []
    filter_name = None
    filter_size = None

    if request.GET.get('display') == 'all':
        x = InventoryObject.objects.all()

    if request.GET.get('filter_by_type'):
        filter_key = request.GET.get('filter_by_type')
        print(filter_key)
        x = InventoryObject.objects.all().filter(inventory_item__type=filter_key)
        filter_info += filter_key
        names = Name.objects.all().filter(type=filter_key)
        sizes = Size.objects.all().filter(type=filter_key)
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_name'):
        filter_key = request.GET.get('filter_by_name')
        filter_str = ''
        for y in filter_key:
            if y == '_':
                filter_str += ' '
            else:
                filter_str += y
        print(filter_str)
        print(filter_key)
        x = InventoryObject.objects.filter(inventory_item__type=request.GET.get('filter_by_type')).filter(inventory_item__name__name=filter_str)
        filter_info += filter_str
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_size'):
        filter_key = request.GET.get('filter_by_size')
        print(request.GET.get('filter_by_size'))
        filter_type = request.GET.get('filter_by_type')
        x = InventoryObject.objects.filter(inventory_item__type=filter_type).filter(inventory_item__size_id__exact=filter_key)
        filter_info = filter_key
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

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
        'filter': filter_info,
        'name': names,
        'filter_name': filter_name,
        'filter_size': filter_size,
        'size': sizes
    }

    return render(request, 'inventory-comingsoon.html', context=context)


@login_required
def inventory_view_sold(request):
    summary_title = "Sold"
    filter_info = ''
    names = Name.objects.all()
    sizes = Size.objects.all()
    x = []
    filter_name = None
    filter_size = None

    if request.GET.get('display') == 'all':
        x = InventoryObject.objects.all()

    if request.GET.get('filter_by_type'):
        filter_key = request.GET.get('filter_by_type')
        print(filter_key)
        x = InventoryObject.objects.all().filter(inventory_item__type=filter_key)
        filter_info += filter_key
        names = Name.objects.all().filter(type=filter_key)
        sizes = Size.objects.all().filter(type=filter_key)
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_name'):
        filter_key = request.GET.get('filter_by_name')
        filter_str = ''
        for y in filter_key:
            if y == '_':
                filter_str += ' '
            else:
                filter_str += y
        print(filter_str)
        print(filter_key)
        x = InventoryObject.objects.filter(inventory_item__type=request.GET.get('filter_by_type')).filter(
            inventory_item__name__name=filter_str)
        filter_info += filter_str
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_size'):
        filter_key = request.GET.get('filter_by_size')
        print(request.GET.get('filter_by_size'))
        filter_type = request.GET.get('filter_by_type')
        x = InventoryObject.objects.filter(inventory_item__type=filter_type).filter(
            inventory_item__size_id__exact=filter_key)
        filter_info = filter_key
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    customers = Customer.objects.all().order_by('-id')
    sold_true = []
    for z in x:
        if z.sold_data:
            if not z.shipping_data and not z.completed_order:
                sold_true.append(z)

    customer_info = CustomerShippingAddress.objects.all()
    context = {
        'all': sold_true,
        'summary_title': summary_title,
        'customers': customers,
        'shipping': customer_info,
        'filter': filter_info,
        'name': names,
        'filter_name': filter_name,
        'filter_size': filter_size,
        'size': sizes
    }
    return render(request, 'inventory-sold.html', context=context)


@login_required
def inventory_view_shipping(request):
    summary_title = "Shipping"
    filter_info = ''
    names = Name.objects.all()
    sizes = Size.objects.all()
    x = []
    filter_name = None
    filter_size = None

    if request.GET.get('display') == 'all':
        x = InventoryObject.objects.all()

    if request.GET.get('filter_by_type'):
        filter_key = request.GET.get('filter_by_type')
        print(filter_key)
        x = InventoryObject.objects.all().filter(inventory_item__type=filter_key)
        filter_info += filter_key
        names = Name.objects.all().filter(type=filter_key)
        sizes = Size.objects.all().filter(type=filter_key)
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_name'):
        filter_key = request.GET.get('filter_by_name')
        filter_str = ''
        for y in filter_key:
            if y == '_':
                filter_str += ' '
            else:
                filter_str += y
        print(filter_str)
        print(filter_key)
        x = InventoryObject.objects.filter(inventory_item__type=request.GET.get('filter_by_type')).filter(
            inventory_item__name__name=filter_str)
        filter_info += filter_str
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_size'):
        filter_key = request.GET.get('filter_by_size')
        print(request.GET.get('filter_by_size'))
        filter_type = request.GET.get('filter_by_type')
        x = InventoryObject.objects.filter(inventory_item__type=filter_type).filter(
            inventory_item__size_id__exact=filter_key)
        filter_info = filter_key
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    customers = Customer.objects.all().order_by('-id')
    shipping = []
    for z in x:
        if z.shipping_data:
            if not z.completed_order:
                shipping.append(z)

    context = {
        'all': shipping,
        'summary_title': summary_title,
        'customers': customers,
        'filter': filter_info,
        'name': names,
        'filter_name': filter_name,
        'filter_size': filter_size,
        'size': sizes
    }
    return render(request, 'inventory-shipping.html', context=context)


@login_required
def inventory_view_completed(request):
    summary_title = "Completed Orders"
    filter_info = ''
    names = Name.objects.all()
    sizes = Size.objects.all()
    x = []
    filter_name = None
    filter_size = None

    if request.GET.get('display') == 'all':
        x = InventoryObject.objects.all()

    if request.GET.get('filter_by_type'):
        filter_key = request.GET.get('filter_by_type')
        print(filter_key)
        x = InventoryObject.objects.all().filter(inventory_item__type=filter_key)
        filter_info += filter_key
        names = Name.objects.all().filter(type=filter_key)
        sizes = Size.objects.all().filter(type=filter_key)
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_name'):
        filter_key = request.GET.get('filter_by_name')
        filter_str = ''
        for y in filter_key:
            if y == '_':
                filter_str += ' '
            else:
                filter_str += y
        print(filter_str)
        print(filter_key)
        x = InventoryObject.objects.filter(inventory_item__type=request.GET.get('filter_by_type')).filter(
            inventory_item__name__name=filter_str)
        filter_info += filter_str
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    if request.GET.get('filter_by_size'):
        filter_key = request.GET.get('filter_by_size')
        print(request.GET.get('filter_by_size'))
        filter_type = request.GET.get('filter_by_type')
        x = InventoryObject.objects.filter(inventory_item__type=filter_type).filter(
            inventory_item__size_id__exact=filter_key)
        filter_info = filter_key
        names = Name.objects.all().filter(type=request.GET.get('filter_by_type'))
        filter_name = True
        filter_size = True

    customers = Customer.objects.all()
    completed = []
    for z in x:
        if z.completed_order:
            completed.append(z)

    context = {
        'all': completed,
        'summary_title': summary_title,
        'customers': customers,
        'filter': filter_info,
        'name': names,
        'filter_name': filter_name,
        'filter_size': filter_size,
        'size': sizes
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


def contact_requests_view(request):
    contacts = Message.objects.all().order_by('-id')

    context = {
        'messages': contacts,
    }
    return render(request, 'contact-requests.html', context=context)


def inventory_search_view(request):
    customers = Customer.objects.all().order_by('-id')
    summary_title = 'Search'

    names = []
    filter_info = []

    query = []
    w = []
    search_count = 0
    no_return = False
    if request.GET.get('search_key'):
        tz = timezone('America/New_York')
        search_query = SearchQuery()
        date = datetime.now(tz)  # .strftime('%Y-%m-%d %H:%M:%S')
        search_query.moment = date

        containers_search = InventoryObject.objects.all()
        containers_search2 = InventoryObject.objects.all()
        containers_search3 = InventoryObject.objects.all()
        containers_search4 = InventoryObject.objects.all()

        query = request.GET.get('search_key') or None

        if query is not None and query != "":
            query = query.lower()
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')  # ip address retrieval method

            if x_forwarded_for:
                ipaddress = x_forwarded_for.split(',')[-1].strip()
            else:
                ipaddress = request.META.get('REMOTE_ADDR')

            search_query.ip_address = ipaddress
            search_query.search = query
            search_query.save()

            if query == "in stock":
                for x in containers_search2:
                    if x.inventory_item.in_stock:
                        print('in stock:  ')
                        print(x.id)
                        w.append(x)

            else:
                containers_search2.filter(inventory_item__name__name__icontains=query)
                if containers_search2:
                    for y in containers_search2:
                        print('name: ')
                        print(y)
                        w.append(y)

                containers_search.filter(inventory_item__description__icontains=query)
                if containers_search:
                    for y in containers_search:
                        print('description:  ')
                        print(y)
                        w.append(y)

                containers_search4.filter(inventory_item__size__size__iexact=query)
                if containers_search4:
                    for y in containers_search4:
                        print('size:   ')
                        print(y)
                        w.append(y)

            if not w:
                for x in containers_search3:
                    if query == x.inventory_item.serial_number:
                        w = [x]
            if not w:
                no_return = True

        search_count = len(w)
        print('ALL   ')
        print(w)

    context = {
        'all': w,
        'summary_title': summary_title,
        'customers': customers,
        'filter': filter_info,
        'name': names,
        'w': w,
        'search_term': query,
        'search_count': search_count,
        'no_return': no_return,
    }

    return render(request, 'inventory-search.html', context=context)
