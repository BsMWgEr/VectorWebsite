from django.urls import path
from api.views import cookie_list_view, build_api_new_view, api_view, endpoint_view, build_api_view, UploadAPI, \
    create_image_api, sold_data_api, customer_data_api, endpoint3, upload_helper_view, build_update_sold_data, \
    build_create_new_shipping_data, get_shipping_data, create_new_shipping_address, get_shipping_address


urlpatterns = [
    path('cookie', cookie_list_view, name="cookie_view"),
    path('build_api_new', build_api_new_view, name="api_build_new"),
    path('builder/', build_api_view, name="builder_api"),
    path('api', api_view, name="api"),
    path('createimageapi', create_image_api),
    path('endpoint', endpoint_view, name="endpoint"),
    path('endpoint3', endpoint3, name="endpoint3"),
    path('upload-api/', UploadAPI),
    path('sold-data-api/', sold_data_api),
    path('customer-data-api/', customer_data_api),
    path('shipping-address-api/', create_new_shipping_address),
    path('shipping-data-api/', build_create_new_shipping_data),
    path('get-shipping-address/', get_shipping_address),
    path('get-shipping-data-api', get_shipping_data),
    path('upload-helper', upload_helper_view, name="up-helper"),
    path('build-update-sold-data-api/', build_update_sold_data, name="build-update-sold-data"),
]