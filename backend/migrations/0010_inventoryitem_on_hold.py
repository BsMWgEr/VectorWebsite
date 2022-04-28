# Generated by Django 4.0.4 on 2022-04-28 18:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_alter_inventoryitem_serial_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventoryitem',
            name='on_hold',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.customer'),
        ),
    ]
