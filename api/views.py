from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
import requests
from backend.forms import BuildForm, SoldDataForm, NewCustomerForm, NewShippingDataForm, NewShippingAddressForm
from backend.models import InventoryItem, InventoryObject, Media, SoldDetail, Customer, \
    Name, Size, ShippingDetail, CustomerShippingAddress
from stockvectorrigs.aws.utils import AWS

S3File = Media



def build_api_new_view(request):
    q = InventoryItem.objects.all()
    y = InventoryItem()
    y.id = 1
    for x in q:
        if x.id > y.id:
            y = x

    h = InventoryObject.objects.all()
    t = InventoryObject()
    t.id = 1
    for g in h:
        if g.id:
            if g.id > t.id:
                t = g

    obj_id = t.id
    q = InventoryItem.objects.all().filter(id=y.id + 1)
    all_ids = q

    container_list = [{"id": x.id,
                       "type": x.type,
                       "name": x.name,
                       "size": x.size,
                       "due_date": x.due_date,
                       "description": x.description,
                       "po_number": x.po_number,
                       "in_stock": x.in_stock,

                       "object_id": obj_id,
                       "confirmation_r": x.confirmation_r.key,
                       'price': x.price,
                       "picture": x.picture.key,
                       } for x in all_ids]
    data = {
        "response": container_list
    }
    return JsonResponse(data)


def cookie_list_view(request):
    y = InventoryItem.objects.first()
    inventory_object = InventoryObject()
    inventory_object.inventory_item_id = y.id
    inventory_object.save()
    # print(y.id)
    u = InventoryObject.objects.last()
    u = u.id
    g = InventoryItem.objects.all().filter(id=y.id)

    all_ids = g
    picture = None
    confirm = None
    size = None
    for x in all_ids:
        if x.confirmation_r:
            confirm = x.confirmation_r.key
        else:
            confirm = 'null'
        if x.picture:
            picture = x.picture.key
        else:
            picture = 'null'

        if x.size:
            size = x.size.size

    container_list = [{"id": x.id,
                       "type": x.type,
                       "name": x.name.name,
                       "size": size,
                       "due_date": x.due_date,
                       "po_number": x.po_number,
                       "description": x.description,
                       "in_stock": x.in_stock,
                       "serial_number": x.serial_number,
                       "confirmation_r": confirm,
                       'price': x.price,
                       "picture": picture,
                       "object_id": u
                       } for x in all_ids]
    data = {
        "response": container_list
    }
    print(data)
    return JsonResponse(data)


def endpoint_view(request):

    q_dict = request.POST
    dict_id = q_dict.get('id')
    y = InventoryItem.objects.all().filter(id=dict_id)
    s = InventoryObject.objects.all().filter(inventory_item_id=dict_id)
    g = InventoryObject()
    for ii in s:
        g = ii

    picture = None
    confirm = None
    l_size = None
    for x in y:
        if x.confirmation_r:
            confirm = x.confirmation_r.key
        else:
            confirm = 'null'

        if x.picture:
            picture = x.picture.key
        else:
            picture = 'null'
        if x.size:
            l_size = x.size.size

    container_list = [{"id": x.id,
                       "type": x.type,
                       "name": x.name.name,
                       "size": l_size,
                       "serial_number": x.serial_number,
                       "due_date": x.due_date,
                       "po_number": x.po_number,
                       "description": x.description,
                       "in_stock": x.in_stock,
                       "object_id": g.id,
                       "confirmation_r": confirm,
                       'price': x.price,
                       "picture": picture
                       } for x in y]
    data = {
        "response": container_list
    }
    return JsonResponse(data)


@login_required
def build_api_view(request):
    form = BuildForm(request.POST or None)
    print(request.POST)
    print(form.data)
    if form.is_valid():
        form.save()
        # do other logic here

        #if next_url is not None:
        #    return redirect(next_url)
        form = BuildForm()

    context = {
        'form': form
    }

    return render(request, "builder.html", context=context)


@login_required
def api_view(request):
    q_dict = request.POST
    next_url = request.POST.get('next')
    print(q_dict)
    if request.POST:
        dict_price = q_dict.get('price')
        dict_name = q_dict.get('name')
        dict_id = q_dict.get('id')
        dict_size = q_dict.get('size')
        dict_po_number = q_dict.get('po_number')
        dict_instock = q_dict.get('in_stock')

        dict_serial_number = q_dict.get('serial_number')
        dict_duedate = q_dict.get('due_date')
        dict_description = q_dict.get('description')
        dict_picture = q_dict.get('picture')
        dict_confirm = q_dict.get('confirmation_r')
        dict_delete = q_dict.get('delete')
        if dict_name:
            InventoryItem.objects.filter(id=dict_id).update(name_id=dict_name)
        if dict_price:
            InventoryItem.objects.filter(id=dict_id).update(price=int(dict_price))
        if dict_size:
            InventoryItem.objects.filter(id=dict_id).update(size_id=dict_size)
        if dict_duedate:
            InventoryItem.objects.filter(id=dict_id).update(due_date=dict_duedate)
        if dict_description:
            InventoryItem.objects.filter(id=dict_id).update(description=dict_description)
        if dict_instock:
            InventoryItem.objects.filter(id=dict_id).update(in_stock=dict_instock)
        if dict_serial_number:
            InventoryItem.objects.filter(id=dict_id).update(serial_number=dict_serial_number)
        if dict_po_number:
            InventoryItem.objects.filter(id=dict_id).update(po_number=dict_po_number)
        if dict_picture:
            InventoryItem.objects.filter(id=dict_id).update(picture_id=dict_picture)
        if dict_confirm:
            InventoryItem.objects.filter(id=dict_id).update(confirmation_r_id=dict_confirm)
        if dict_delete:
            object_delete = InventoryObject.objects.filter(inventory_item_id=dict_id)
            sold_id_number = ''
            shipping_id_number = ''

            for x in object_delete:
                if x.sold_data_id:
                    sold_id_number = x.sold_data_id
                if x.shipping_data_id:
                    shipping_id_number = x.shipping_data_id

            object_delete.delete()
            print('object delete')
            InventoryItem.objects.filter(id=dict_id).delete()
            print('item delete')
            if sold_id_number is not '':
                SoldDetail.objects.filter(id=sold_id_number).delete()
                print('sold delete')
            if shipping_id_number is not '':
                ShippingDetail.objects.filter(id=shipping_id_number).delete()
                print('shipping delete')
        if next_url is not None:
            return redirect(next_url)
    return render(request, "api.html")


def DownloadView(request, id, *args, **kwargs):
    file_obj = get_object_or_404(S3File, id=id)
    url = file_obj.get_download_url()
    return HttpResponseRedirect(url)


def UploadAPI(request):
    if request.GET:
        print(request.GET.get(''))
        y1 = request.GET.get('').split('.')[1]
        y2 = request.GET.get('').split('.')[0]
        if 'jpg' == y1 or 'JPG' == y1 or 'png' == y1:
            new = Media()
            new.key = "images/" + y2 + '.' + y1
            new.name = y2 + '.' + y1
            new.media_type = 'image'
            new.filetype = 'image/jpeg'
            if "png" in y1:
                new.filetype = 'image/png'
            new.save()
        else:
            new = Media()
            new.key = "confirmation_reports/" + y2 + '.' + y1
            new.name = y2 + '.' + y1
            new.media_type = 'confirmation_r'
            new.filetype = 'application/pdf'
            new.save()

    aws_instance = AWS()
    x = Media.objects.last()
    q = "static/" + x.key
    print(q)

    presigned_data = aws_instance.presign_post_url(key=q)

    return JsonResponse(presigned_data)


# RETRIEVES NAME/SIZE/DESCRIPTION INFO FOR BUILD PAGE FORMS
def create_image_api(request):
    data = {}
    if request.GET.get('type'):
        name_type = request.GET.get('type')
        names = Name.objects.all().filter(type=name_type)
        container_list = [{
            'id': x.id,
            'type': x.type,
            'name': x.name,
            'description_info': x.description_info
        } for x in names]

        data = {
            'response': container_list
        }
        print(data)

    if request.GET.get('size_type'):
        size_type = request.GET.get('size_type')
        names = Size.objects.all().filter(type=size_type)
        container_list = [{
            'id': x.id,
            'type': x.type,
            'size': x.size,
            'description_info': x.description_info
        } for x in names]

        data = {
            'response': container_list
        }
        print(data)

    if request.GET.get('sold_data'):

        all_objs = SoldDetail.objects.all()
        all_customers = Customer.objects.all().order_by('-id')
        available_customers = []

        container_list = [{
            'id': x.id,
            'first_name': x.first_name,
            'last_name': x.last_name,
            'company_name': x.company_name,
            'email': x.email,
            'phone_number': x.phone_number,
            'created_date': x.created_date


        } for x in all_customers]

        data = {
            'response': container_list
        }
        print(data)

    elif request.GET.get('description_id'):
        description_id = request.GET.get('description_id')
        print(description_id)
        description_info = Name.objects.all().filter(id=description_id)
        container_list = [{
            'id': x.id,
            'type': x.type,
            'name': x.name,
            'description_info': x.description_info
        } for x in description_info]

        data = {
            'response': container_list
        }
        print(data)

    elif request.GET.get('size_description_id'):
        description_id = request.GET.get('size_description_id')
        print(description_id)
        description_info = Size.objects.all().filter(id=description_id)
        container_list = [{
            'id': x.id,
            'type': x.type,
            'size': x.size,
            'description_info': x.description_info
        } for x in description_info]

        data = {
            'response': container_list
        }
        print(data)

    else:
        print(request.GET)
        obj = request.GET.get('obj_id')
        print(obj)
        name = request.GET.get('name_update_id')
        print(name)
        size = request.GET.get('size_update_id')
        print(size)
        name_description = ""
        size_description = ""
        q = 0
        if name:
            name_info = Name.objects.all().filter(id=name)

            for x in name_info:
                name_description = x.description_info
            all_obs = InventoryObject.objects.filter(id=obj)
            for i in all_obs:
                size_description = i.inventory_item.size.description_info
                q = i.inventory_item_id
        elif size:
            size_info = Size.objects.all().filter(id=size)

            for t in size_info:
                size_description = t.description_info
            all_obs = InventoryObject.objects.filter(id=obj)
            for i in all_obs:
                name_description = i.inventory_item.name.description_info
                q = i.inventory_item_id

        description_info = name_description + size_description

        print(description_info)
        InventoryItem.objects.filter(id=q).update(description=description_info)

    return JsonResponse(data)


# CREATE NEW SOLD DATA
def sold_data_api(request):
    form = SoldDataForm(request.POST or None)
    x = request.POST.get('inventory_item')
    objs = InventoryObject.objects.all().filter(inventory_item_id=x)

    print(form.data)
    if form.is_valid():
        form.save()
        form = SoldDataForm()
        last_sold = SoldDetail.objects.last()
        objs.update(sold_data_id=last_sold.id)

    context = {
        'form': form,
    }

    return render(request, 'sold_data_api.html', context=context)


# CREATE NEW CUSTOMER
def customer_data_api(request):
    form = NewCustomerForm(request.POST or None)
    x = 1
    print(request.POST.get('inventory_item'))
    if form.is_valid():
        #x = request.POST.get('inventory_item')
        print(form.data)

        form.save()
        form = NewCustomerForm()

    context = {
        'form': form,
    }

    return render(request, 'customer_data_api.html', context=context)


# SOLD AND CUSTOMER DATA RETRIEVAL

def endpoint3(request):
    if request.GET.get('all_sold_data'):
        data_id = request.GET.get('all_sold_data')
        item = InventoryObject.objects.filter(inventory_item_id=data_id)
        sold_data_id = ''
        for x in item:
            sold_data_id = x.sold_data_id

        sold_obj = SoldDetail.objects.filter(id=sold_data_id)

        container_list = [{
            'id': x.id,
            'purchased_by_id': x.purchased_by_id,
            'date_sold': x.date_sold,
            'info': x.info,
            'other': x.other,
            'created_date': x.created_date
        } for x in sold_obj]

    elif request.GET.get('all_customer_data'):
        customer_id = request.GET.get('all_customer_data')
        customers = Customer.objects.filter(id=customer_id)
        container_list = [{
            "id": x.id,
            "first_name": x.first_name,
            "last_name": x.last_name,
            "company_name": x.company_name,
            "email": x.email,
            "phone_number": x.phone_number,
        } for x in customers]

    else:
        customers = Customer.objects.all()
        container_list = [{"id": x.id,
                           "first_name": x.first_name,
                           "last_name": x.last_name,
                           "company_name": x.company_name,
                           "email": x.email,
                           "phone_number": x.phone_number,
                           } for x in customers]

    data = {
        "response": container_list
    }

    print(data)

    return JsonResponse(data)


# CONFIRMATION REPORTS RETRIEVAL FOR BUILD PAGE FORMS
def upload_helper_view(request):
    print('success')
    print(request.GET.get(''))
    q = request.GET.get('')

    report = []
    reports = Media.objects.all().filter(key__contains=q).order_by('-id')
    all_items = InventoryItem.objects.all()

    if q == 'confirmation_reports/':
        for x in all_items:
            if x.confirmation_r_id:
                reports.exclude(id=x.confirmation_r_id)

    container_list = [{"id": x.id,
                       "media_type": x.media_type,
                       "name": x.name,
                       "key": x.key,
                       "filetype": x.filetype,
                       } for x in reports]
    data = {
        "response": container_list
    }

    print(data)

    return JsonResponse(data)


"""
    API For Build Sold Data
"""


# CREATES NEW SOLD DATA
def build_update_sold_data(request):
    q_dict = request.POST
    print(q_dict)
    if request.POST:
        dict_id = q_dict.get('id')
        dict_info = q_dict.get('info')
        dict_other = q_dict.get('other')
        dict_date = q_dict.get('date_sold')

        if dict_info:
            SoldDetail.objects.filter(id=dict_id).update(info=dict_info)
        if dict_other:
            SoldDetail.objects.filter(id=dict_id).update(other=dict_other)
        if dict_date:
            SoldDetail.objects.filter(id=dict_id).update(date_sold=dict_date)

    return render(request, 'build-update-sold.html')


def build_create_new_shipping_data(request):
    form = NewShippingDataForm(request.POST or None)
    if form.is_valid():
        form.save()
        data = form.data.get('inventory_object_id')
        print(data)
        form.save()
        shipping = ShippingDetail.objects.last()
        new_id = 0
        for x in shipping:
            new_id = x.id
        InventoryObject.objects.filter(id=data).update(sold_data_id=new_id)
        form = NewShippingDataForm()
    context = {
        'form': form
    }
    return render(request, 'shipping_data_api.html', context=context)


def get_shipping_data(request):
    if request.GET.get('obj_id'):
        obj_id = request.GET.get('obj_id')
        print(obj_id)
        i_obj = InventoryObject.objects.filter(id=obj_id)
        x = 0
        for i in i_obj:
            x = i.shipping_data_id
        s_obj = ShippingDetail.objects.filter(id=x)
        container_list = [{
            'inventory_item': x.inventory_item.id,
            'sold_detail': x.sold_detail.id,
            'shipping_address': x.shipping_address.id,
            'date_shipped': x.date_shipped,
            'tracking_number': x.tracking_number,
            'shipper_info1': x.Shipper_info1,
            'shipper_info2': x.Shipper_info1,
            'created_date': x.created_date,
                           } for x in s_obj]
        data = {
            "response": container_list,
        }

    else:
        objs_id = request.GET.get('other_id')
        i_obj = InventoryObject.objects.filter(id=objs_id)
        y = 0
        z = 0
        customer_id = 0
        name = ''
        serial_number = ''
        item_name = ''
        for i in i_obj:
            y = i.sold_data_id
            print(y)
            z = i.inventory_item_id
            print(z)
        sold_data = SoldDetail.objects.filter(id=y)
        print(sold_data)
        items = InventoryItem.objects.filter(id=z)
        for x in items:
            item_name = x.name.name
            if x.serial_number != 'TBD':
                serial_number = x.serial_number
        for x in sold_data:
            customer_id = x.purchased_by.id
            print(customer_id)
        if customer_id:
            customer = Customer.objects.filter(id=customer_id)
            print(customer)
            for xx in customer:
                name = xx.first_name + ' ' + xx.last_name
        shipping = CustomerShippingAddress.objects.all()
        container_list = [{
            'sold_data_id': y,
            'sold_data': name,
        }]
        container_list2 = [{
            'shipping_id': u.id,
            'customer_id': customer_id,
            'city': u.city,
            'state': u.state,
            'zipcode': u.zip_code,

        } for u in shipping]
        container_list3 = [{
            'inventory_item_id': z,
            'name': item_name,
            'serial_number': serial_number,
        }]

        data = {
            "response": container_list,
            "shipping": container_list2,
            "inventory_item": container_list3,
        }
    print(data)
    return JsonResponse(data)


def create_new_shipping_address(request):
    form = NewShippingAddressForm(request.POST or None)
    if form.is_valid():
        data = form.data.get('inventory_object_id')
        print(data)
        form.save()
        shipping = CustomerShippingAddress.objects.last()
        new_id = 0
        for x in shipping:
            new_id = x.id
        InventoryObject.objects.filter(id=data).update(shipping_data_id=new_id)
        form = NewShippingAddressForm()

    context = {
        'form': form,
    }
    return render(request, 'shipping_address_api.html', context=context)
