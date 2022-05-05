from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
import requests
from backend.forms import BuildForm, SoldDataForm, NewCustomerForm
from backend.models import InventoryItem, InventoryObject, Media, SoldDetail, Customer, Name, Size
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
            InventoryItem.objects.filter(id=dict_id).delete()
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
                name_description = i.inventory_item.size.description_info
                q = i.inventory_item_id

        description_info = name_description + size_description

        print(description_info)
        InventoryItem.objects.filter(id=q).update(description=description_info)

    return JsonResponse(data)


def sold_data_api(request):
    form = SoldDataForm(request.POST or None)
    print(form.data)
    print(request.POST.get('inventory_item'))
    x = request.POST.get('inventory_item')
    objs = InventoryObject.objects.all().filter(inventory_item_id=x)

    print(form.data)
    if form.is_valid():
        form.save()
        form = SoldDataForm()
        print(objs)
        last_sold = SoldDetail.objects.last()
        objs.update(sold_data_id=last_sold.id)
        print(last_sold)

    context = {
        'form': form,
    }

    return render(request, 'sold_data_api.html', context=context)


def customer_data_api(request):
    form = NewCustomerForm(request.POST or None)
    x = 1
    print(request.POST.get('inventory_item'))
    if form.is_valid():
        #x = request.POST.get('inventory_item')
        print(form.data)

        form.save()
        form = NewCustomerForm()
        # after creating new sold data --> link to object via id
    #objs = InventoryObject.objects.all().filter(inventory_item_id=x)
    #last_sold = SoldDetail.objects.last()
    #objs.update(sold_data_id=last_sold.id)
    #print(objs)
    #print(last_sold)

    context = {
        'form': form,

    }

    return render(request, 'customer_data_api.html', context=context)

def endpoint3(request):


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


def build_sold_data(request):
    print(request.POST)
    form = SoldDataForm(request.POST or None)
    if form.is_valid():
        item_id = form.data.get('inventory_item')
        print(form.data)
        form.save()
        item_obj = InventoryObject.objects.filter(inventory_item_id=item_id)
        last_sold = SoldDetail.objects.last()
        item_obj.update(sold_data_id=last_sold.id)

    context = {
        'form': form
    }

    return render(request, 'build-data-sold.html', context=context)
