from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from backend.models import SearchQuery
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from backend.models import Customer
# Create your views here.


def index(request):

    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, "user.html")


def login_view(request):
    if request.user.is_authenticated:
        return redirect('/users/')
    x = False
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("users")
        else:
            x = True
            if x:
                return render(request, "login.html", {
                    "message": "LOGIN FAILED", "x": x
                })

    return render(request, "login.html")


def logout_view(request):
    logout(request)
    return render(request, "logout.html")


def registration_view(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    phone_number = request.POST.get('phone_number')

    # new_user = User.objects.create_user(username=name, email=email, password=password)
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        new_customer = Customer()
        new_customer.first_name = first_name
        new_customer.last_name = last_name
        new_customer.email = email
        new_customer.phone_number = phone_number
        new_customer.save()
        info = form.data
        print(info)
        u1 = info.get('username')
        p1 = info.get('password1')
        obj = User.objects.create_user(
            username=u1,
            password=p1,
            first_name=first_name,
            last_name=last_name,
            email=email)
        obj.save()
        login(request, obj)
        return redirect('/users/home/')
    context = {"form": form}
    return render(request, 'register.html', context=context)


def customer_home_view(request):
    user = request.user
    print(user)
    context = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'username': user.username,
    }

    return render(request, 'customer-home.html', context=context)
