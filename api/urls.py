from django.urls import path
from api.views import cookie_list_view, build_api_new_view, api_view, endpoint_view, build_api_view, UploadAPI, create_image_api


urlpatterns = [
    path('cookie', cookie_list_view, name="cookie_view"),
    path('build_api_new', build_api_new_view, name="api_build_new"),
    path('builder/', build_api_view, name="builder_api"),
    path('api', api_view, name="api"),
    path('createimageapi', create_image_api),
    path('endpoint', endpoint_view, name="endpoint"),
    path('upload-api/', UploadAPI),
]