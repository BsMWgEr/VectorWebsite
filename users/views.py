from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from backend.models import SearchQuery, Item

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