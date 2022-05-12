from django.core.mail import send_mail
import random
from datetime import datetime
from django.shortcuts import render
from pytz import timezone
from backend.forms import ContactForm
from backend.models import PageVisitData, SearchQuery, Message, InventoryItem, InventoryObject


def search_view(request):
    tz = timezone('America/New_York')
    search_query = SearchQuery()
    date = datetime.now(tz)  # .strftime('%Y-%m-%d %H:%M:%S')
    search_query.moment = date

    containers_all = InventoryItem.objects.all()
    containers_search = InventoryItem.objects.all()
    containers_search2 = InventoryItem.objects.all()
    containers_search3 = InventoryItem.objects.all()
    containers = []
    w = []
    query_dict = request.GET
    search_count = 0
    no_return = False
    try:
        query = (query_dict.get("q"))
    except:
        query = None

    if query is not None and query != "":
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')  # ip address retrieval method

        if x_forwarded_for:
            ipaddress = x_forwarded_for.split(',')[-1].strip()
        else:
            ipaddress = request.META.get('REMOTE_ADDR')

        search_query.ip_address = ipaddress
        search_query.search = query
        search_query.save()
        for x in containers_search2:
            if query == "in stock":
                if x.in_stock:
                    w.append(x)
            elif query == "sold":
                if x.sold:
                    w.append(x)
        if not w:
            containers_search2 = InventoryItem.objects.filter(name__name__icontains=query)
            if containers_search2:
                w = containers_search2
            else:
                containers_search = InventoryItem.objects.filter(description__icontains=query)
                if containers_search:
                    w = containers_search
        if not w:
            for x in containers_search3:
                if query == str(x.serial_number):
                    w = [x]
        if not w:
            no_return = True

    search_count = len(w)

    context = {
        'containers': containers_all,
        'container': containers,
        'w': w,
        'search_term': query,
        'search_count': search_count,
        'no_return': no_return,
    }

    return render(request, 'search.html', context=context)


def index(request):
    tz = timezone('America/New_York')
    ip_address = PageVisitData()
    date = datetime.now(tz)  # .strftime("%Y-%m-%d %H:%M:%S")
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')  # ip address retrieval method

    if x_forwarded_for:
        ipaddress = x_forwarded_for.split(',')[-1].strip()
    else:
        ipaddress = request.META.get('REMOTE_ADDR')

    ip_address.ip_address = ipaddress
    ip_address.moment = date
    ip_address.save()
    form = ContactForm()

    context = {'form': form}
    if request.POST:
        new_contact = Message()
        random_number = (((random.randint(2, 20) + random.randint(2, 20)) * random.randint(10, 20)) * random.randint(2, 20) + random.randint(
            100000, 999999) + random.randint(100000, 999999))
        if random_number < 1000000:
            random_number = random_number + 1000000
        form = ContactForm(request.POST)
        if form.is_valid():
            print(form.data)
            x = form.data.get('comment')
            y = form.data.get('subject')
            q = form.data.get('email')
            date2 = datetime.now(tz)  # .strftime("%Y-%m-%d %H:%M:%S")
            random_string = ''
            for j in range(2):
                # Considering only upper and lowercase letters
                random_integer = random.randint(97, 97 + 26 - 1)
                flip_bit = 1  # or to allow for lowercase --> random.randint(0, 1)
                # Convert to lowercase if the flip bit is on
                random_integer = random_integer - 32 if flip_bit == 1 else random_integer
                # Keep appending random characters using chr(x)
                random_string += (chr(random_integer))
            confirm_number = "P" + random_string + str(random_number)
            new_contact.email = q
            new_contact.subject = y
            new_contact.comment = x
            new_contact.confirmation_number = confirm_number
            new_contact.time = date2
            new_contact.save()
            send_mail(
                subject=y,
                from_email='jsquad.dev@gmail.com',
                message=x + "\n\n\nContact Request Email: " + q + "\nConfirmation Number : " + confirm_number,
                recipient_list=[
                    'jsquad.dev@gmail.com',
                    'jqm95328@protonmail.ch',
                ])
            send_mail(
                subject="Greetings from Full Flight Sports!",
                from_email='jsquad.dev@gmail.com',
                message="Thanks for contacting us! Your message has been recieved (yay!!).\n"
                        "Your Contact Request Confirmation Number is:  " + confirm_number + "\n" +
                        "We will respond to you within 48 hours.",
                recipient_list=[q]
            )

    return render(request, "home.html", context=context)


def sportrigs_view(request):
    containers_all = InventoryObject.objects.filter(sold_data_id__isnull=True)
    container_list = []
    for x in containers_all:
        container = InventoryItem.objects.filter(id=x.inventory_item_id, type='sport_rigs', in_stock=False)
        container_list.append(container)

    context = {
        'containers': container_list,
    }

    return render(request, "sportrigs.html", context=context)


def sportrigs_instock_view(request):
    containers_all = InventoryItem.objects.filter(type='sport_rigs', in_stock=True)
    context = {
        'containers': containers_all,
    }

    return render(request, 'instock-sportrigs.html', context=context)


def tandem(request):
    containers_all = InventoryItem.objects.filter(type='tandem', in_stock=False)
    context = {
        'containers': containers_all
    }
    return render(request, "tandem.html", context=context)


def tandem_instock_view(request):
    containers_all = InventoryItem.objects.filter(type='tandem', in_stock=True)
    context = {
        'containers': containers_all
    }
    return render(request, "instock-tandem.html", context=context)


def student(request):
    containers_all = InventoryItem.objects.filter(type='student', in_stock=False)
    context = {
        'containers': containers_all
    }
    return render(request, "student.html", context=context)


def student_instock_view(request):
    containers_all = InventoryItem.objects.filter(type='student', in_stock=True)
    context = {
        'containers': containers_all
    }
    return render(request, "instock-student.html", context=context)


def canopies(request):
    stuff = False
    if request.user.is_authenticated:
        stuff = True
    containers_all = InventoryItem.objects.all()
    containers_120 = InventoryItem.objects.all().filter(name__name__icontains='120').order_by('po_number')
    containers_135 = InventoryItem.objects.all().filter(name__name__icontains='135').order_by('po_number')
    containers_150 = InventoryItem.objects.all().filter(name__name__icontains='150').order_by('po_number')
    containers_170 = InventoryItem.objects.all().filter(name__name__icontains='170').order_by('po_number')
    containers_190 = InventoryItem.objects.all().filter(name__name__icontains='190').order_by('po_number')
    containers_210 = InventoryItem.objects.all().filter(name__name__icontains='210').order_by('po_number')
    containers_230 = InventoryItem.objects.all().filter(name__name__icontains='230').order_by('po_number')

    context = {
        'containers': containers_all,
        'containers_120': containers_120,
        'containers_135': containers_135,
        'containers_150': containers_150,
        'containers_170': containers_170,
        'containers_190': containers_190,
        'containers_210': containers_210,
        'containers_230': containers_230,
        'stuff': stuff,
    }
    return render(request, "canopies.html", context=context)


def javelin(request):
    containers_all = InventoryItem.objects.filter(type='javelin_odyssey', in_stock=False)
    context = {
        'containers': containers_all,
    }
    return render(request, "javelin.html", context=context)


def javelin_instock_view(request):
    containers_all = InventoryItem.objects.filter(type='javelin_odyssey', in_stock=True)
    context = {
        'containers': containers_all,
    }
    return render(request, "instock-javelin.html", context=context)


def canopies_instock_view(request):
    return render(request, 'instock-canopies.html')