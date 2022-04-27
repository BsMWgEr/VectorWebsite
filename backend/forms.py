from django import forms
from .models import Message, Item, InventoryObject, SoldDetail
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


y = Item.objects.all()
NAME_CHOICES = [tuple([x.id, x]) for x in y]


class IdForm(forms.Form):
    id = forms.ChoiceField(choices=NAME_CHOICES, help_text='Select An Item to display!')



class BuildForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['id',
                  'type',
                  'name',
                  'serial_number',
                  'due_date',
                  'size',
                  'description',
                  'in_stock',

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
