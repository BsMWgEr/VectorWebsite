from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
import requests
from backend.forms import BuildForm
from backend.models import Item, InventoryObject, Media
from stockvectorrigs.aws.utils import AWS

S3File = Media



def build_api_new_view(request):
    q = Item.objects.all()
    y = Item()
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
    q = Item.objects.all().filter(id=y.id + 1)
    all_ids = q

    container_list = [{"id": x.id,
                       "type": x.type,
                       "name": x.name,
                       "size": x.size,
                       "due_date": x.due_date,
                       "description": x.description,
                       "po_number": x.po_number,
                       "in_stock": x.in_stock,
                       "sold": x.sold,
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
    y = Item.objects.first()
    y_plus = y.id
    inventory_object = InventoryObject()
    inventory_object.inventory_item_id = y_plus
    inventory_object.save()
    # print(y.id)
    u = InventoryObject.objects.last()
    u = u.id
    g = Item.objects.all().filter(id=y_plus)
    all_ids = g
    picture = None
    confirm = None
    for x in all_ids:
        if x.confirmation_r:
            confirm = x.confirmation_r.key
        else:
            confirm = 'null'

        if x.picture:
            picture = x.picture.key
        else:
            picture = 'null'

    container_list = [{"id": x.id,
                       "type": x.type,
                       "name": x.name,
                       "size": x.size,
                       "due_date": x.due_date,
                       "po_number": x.po_number,
                       "description": x.description,
                       "in_stock": x.in_stock,
                       "sold": x.sold,
                       "confirmation_r": confirm,
                       'price': x.price,
                       "picture": picture,
                       "object_id": u
                       } for x in all_ids]
    data = {
        "response": container_list
    }
    return JsonResponse(data)


def endpoint_view(request):
    qs_l = Item.objects.all().count()
    q_dict = request.POST
    dict_id = q_dict.get('id')
    y = Item.objects.all().filter(id=dict_id)
    s = InventoryObject.objects.all().filter(inventory_item_id=dict_id)
    g = InventoryObject()
    for ii in s:
        g = ii

    picture = None
    confirm = None
    for x in y:
        if x.confirmation_r:
            confirm = x.confirmation_r.key
        else:
            confirm = 'null'

        if x.picture:
            picture = x.picture.key
        else:
            picture = 'null'


    container_list = [{"id": x.id,
                       "type": x.type,
                       "name": x.name,
                       "size": x.size,
                       "serial_number": x.serial_number,
                       "due_date": x.due_date,
                       "po_number": x.po_number,
                       "description": x.description,
                       "in_stock": x.in_stock,
                       "object_id": g.id,
                       "sold": x.sold,
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
    next_url = request.POST.get('next') or None

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
        dict_sold = q_dict.get('sold')
        dict_serial_number = q_dict.get('serial_number')
        dict_duedate = q_dict.get('due_date')
        dict_description = q_dict.get('description')
        dict_picture = q_dict.get('picture')
        dict_delete = q_dict.get('delete')
        if dict_name:
            Item.objects.filter(id=dict_id).update(name=dict_name)
        if dict_price:
            Item.objects.filter(id=dict_id).update(price=int(dict_price))
        if dict_size:
            Item.objects.filter(id=dict_id).update(size=dict_size)
        if dict_duedate:
            Item.objects.filter(id=dict_id).update(due_date=dict_duedate)
        if dict_description:
            Item.objects.filter(id=dict_id).update(description=dict_description)
        if dict_sold:
            Item.objects.filter(id=dict_id).update(sold=dict_sold)
        if dict_instock:
            Item.objects.filter(id=dict_id).update(in_stock=dict_instock)
        if dict_serial_number:
            Item.objects.filter(id=dict_id).update(serial_number=dict_serial_number)
        if dict_po_number:
            Item.objects.filter(id=dict_id).update(po_number=dict_po_number)
        if dict_picture:
            Item.objects.filter(id=dict_id).update(picture=dict_picture)
        if dict_delete:
            Item.objects.filter(id=dict_id).delete()
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
        y = request.GET.get('')
        if ".jpg" in y:
            new = Media()
            new.key = "images/" + y
            new.name = y
            new.media_type = 'image'
            new.filetype = 'image/jpeg'
            new.save()
        else:
            new = Media()
            new.key = "confirmation_reports/" + y
            new.name = y
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
    if request.GET:
        print(request.GET)
        new = Media()
        new.name = request.GET.get('key')
        print(new.name)
        new.key = request.GET.get('key')
        new.save()

    return JsonResponse('Success')