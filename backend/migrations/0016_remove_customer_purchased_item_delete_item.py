# Generated by Django 4.0.4 on 2022-04-30 01:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_alter_inventoryitem_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='purchased_item',
        ),
        migrations.DeleteModel(
            name='Item',
        ),
    ]
