from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
                  path('', views.index, name="home"),

                  path('search/', views.search_view, name="search"),
                  #path('admin-instock/', views.admin_in_stock_view, name="admin_in_stock"),
                  path('cs-sportrigs/', views.sportrigs_view, name="sportrigs-cs"),
                  path('instock-sportrigs/', views.sportrigs_instock_view, name="sportrigs-instock"),
                  path('cs-tandem/', views.tandem, name="tandem-cs"),
                  path('instock-tandem/', views.tandem_instock_view, name="tandem-instock"),
                  path('cs-student/', views.student, name="student-cs"),
                  path('instock-student/', views.student_instock_view, name="student-instock"),
                  path('cs-canopies/', views.canopies, name="canopies"),
                  path('instock-canopies/', views.canopies_instock_view, name="canopies-instock"),
                  path('cs-javelin/', views.javelin, name="javelin-cs"),
                  path('instock-javelin/', views.javelin_instock_view, name="javelin-instock"),

              ]
"""+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)"""