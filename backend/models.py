from django.db import models
import os
import datetime
from django.conf import settings
from django.db import models
# from stockvectorrigs.aws.utils import AWS
from django.utils.text import slugify

# Create your models here.


class Message(models.Model):
    read = models.BooleanField(default=False)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    comment = models.TextField()
    time = models.DateTimeField()
    confirmation_number = models.CharField(max_length=50)
    """
    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"Subject: {self.subject} ----- Read Yet: {self.read} ----- {self.time}"
    """


class PageVisitData(models.Model):
    moment = models.DateTimeField()
    ip_address = models.GenericIPAddressField()
    """
    class Meta:
        ordering = ['-id']
    """


class SearchQuery(models.Model):
    moment = models.DateTimeField(blank=True, null=True)
    search = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)

    """

    class Meta:
        ordering = ['-id']
    """

# User = settings.AUTH_USER_MODEL


class Image(models.Model):
    # user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=220, blank=True, null=True)
    key = models.TextField()
    filetype = models.CharField(max_length=120, default='img/jpg')
    active = models.BooleanField(default=True)
    date_added = models.DateTimeField(auto_now_add=True)
    """
    def __str__(self):
        return f"{self.id} -- {self.name}"

    def get_file_ext(self):
        return os.path.splitext(self.key)[1]  # path/to/file/upload.png - > path/to/file/upload, .png

    def get_filename(self):
        custom = self.name
        if custom:
            ext = self.get_file_ext()  # .png
            if custom.endswith(ext):
                custom, ext = os.path.splitext(custom)  # this is-my-file.png
            custom = slugify(custom)
            custom = f'{custom}{ext}'  # this-is-my-file.png
            return custom
        return os.path.basename(self.key)

    def get_download_url(self):
        key = self.key
        aws_instance = AWS()
        return aws_instance.get_download_url(key=key)
        
    """


class Item(models.Model):
    JAVELIN = 'javelin'
    VECTOR = 'vector'
    TANDEM = 'tandem'
    VECTOR_SE_STUDENT = 'student'
    SPORT_RIGS = 'sport_rigs'
    CANOPIES = 'canopies'
    JAVELIN_ODYSSEY = 'javelin_odyssey'

    LOCATION_OPTIONS = [
        (SPORT_RIGS, 'Sport Rigs'),
        (TANDEM, 'Tandem'),
        (VECTOR_SE_STUDENT, 'Vector SE Student'),
        (CANOPIES, 'Canopies'),
        (JAVELIN_ODYSSEY, 'Javelin-Odyssey'),

    ]
    type = models.CharField(max_length=25, choices=LOCATION_OPTIONS, default=SPORT_RIGS)
    name = models.CharField(max_length=200)
    serial_number = models.IntegerField(blank=True, null=True)
    due_date = models.CharField(max_length=100, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    in_stock = models.BooleanField(default=False)
    sold = models.BooleanField(default=False)
    po_number = models.CharField(max_length=50, blank=True, null=True)
    #confirmation_r = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, blank=True, related_name='confirmation_r')
    price = models.IntegerField()
    #picture = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, blank=True, related_name='picture')
    created_date = models.DateField(auto_now_add=True)
    """
    class Meta:
        ordering = ['-id']  # orders by descending remove the dash to make ascending

    def __str__(self):
        return f"ID: {self.id} Type: {self.type} Name: {self.name} - Serial #: {self.serial_number} -----  " \
               f"In Stock: {self.in_stock} - Sold: {self.sold}"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'serial_number': self.serial_number,
            'due_date': self.due_date,
            'size': self.size,
            'description': self.description,
            'in_stock': self.in_stock,
            'sold': self.sold,
            'po_number': self.po_number,
            'confirmation_r': self.confirmation_r,
            'price': self.price,
            'picture': self.picture,
        }
        """


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company_name = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField()
    phone_number = models.IntegerField()
    #original_contact = models.OneToOneField(Message, on_delete=models.SET_NULL, blank=True, null=True)
    #purchased_item = models.ManyToManyField(Item, blank=True)
    created_date = models.DateField(auto_now_add=True)
    """
    def __str__(self):
        return f"ID: {self.id} - Name: {self.last_name}, {self.first_name} - Phone #: {self.phone_number} - {self.email}"
    """


class CustomerShippingAddress(models.Model):
    #customer = models.OneToOneField(Customer, on_delete=models.SET_NULL)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    country = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=10)
    other = models.TextField(blank=True, null=True)
    """
    def __str__(self):
        return f"ID: {self.id} Customer ID: {self.customer.id} - {self.customer.last_name} - {self.city}, {self.state}"
    """


class SoldDetail(models.Model):
    #inventory_item = models.OneToOneField(Item, on_delete=models.SET_NULL)
    #purchased_by = models.ForeignKey(Customer, on_delete=models.SET_NULL)
    date_sold = models.DateField(null=True, blank=True)
    info = models.TextField(blank=True, null=True)
    other = models.TextField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    """
    def __str__(self):
        return f"ID: {self.id} - Customer: {self.purchased_by} - Date Sold: {self.date_sold}"
    """


class ShippingDetail(models.Model):
    #inventory_item = models.OneToOneField(Item, on_delete=models.SET_NULL)
    #sold_detail = models.OneToOneField(SoldDetail, on_delete=models.SET_NULL)
    #shipping_address = models.ForeignKey(CustomerShippingAddress, on_delete=models.SET_NULL)
    date_shipped = models.DateField(null=True, blank=True)
    tracking_number = models.CharField(max_length=200, blank=True, null=True)
    Shipper_info1 = models.CharField(max_length=200, null=True, blank=True)
    Shipper_info2 = models.TextField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    """
    def __str__(self):
        return f"ID: {self.id} - Ship Date: {self.date_shipped} Tracking #: {self.tracking_number}"
    """


