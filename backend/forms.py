from django import forms
from .models import Message, InventoryObject, SoldDetail, Customer, InventoryItem, ShippingDetail, CustomerShippingAddress
from django.forms import TextInput, Textarea


class ContactForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['email', 'subject', 'comment']
        widgets = {
            'email': TextInput(attrs={
                'placeholder': 'E-mail'
            }),
            'subject': TextInput(attrs={
                'placeholder': 'Subject or Title'
            }),
            'comment': Textarea(attrs={
                'placeholder': 'Write comment or question here'
            })
        }

    def new_cleaned_data(self):
        data = self.cleaned_data['email', 'subject', 'comment', 'confirmation_number']
        return data


y = InventoryItem.objects.all()
NAME_CHOICES = [tuple([x.id, x]) for x in y]


class IdForm(forms.Form):
    id = forms.ChoiceField(choices=NAME_CHOICES, help_text='Select An Item to display!')



class BuildForm(forms.ModelForm):
    class Meta:
        model = InventoryItem
        fields = ['id',
                  'type',
                  'name',
                  'serial_number',
                  'due_date',
                  'size',
                  'description',
                  'in_stock',
                  'on_hold',
                  'po_number',
                  'confirmation_r',
                  'price',
                  'picture'
                  ]
        widgets = {

        }


class SoldDataForm(forms.ModelForm):
    class Meta:
        model = SoldDetail
        fields = [
            'inventory_item',
            'purchased_by',
            'date_sold',
            'info',
            'other',
        ]


class NewCustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = [
            'first_name',
            'last_name',
            'company_name',
            'email',
            'phone_number',
            'original_contact',

        ]


class NewShippingDataForm(forms.ModelForm):
    class Meta:
        model = ShippingDetail
        fields = [
            'inventory_item',
            'sold_detail',
            'shipping_address',
            'date_shipped',
            'tracking_number',
            'Shipper_info1',
            'Shipper_info2',
        ]


class NewShippingAddressForm(forms.ModelForm):
    class Meta:
        model = CustomerShippingAddress
        fields = [
            'customer',
            'address',
            'city',
            'state',
            'country',
            'zip_code',
            'other',
        ]
