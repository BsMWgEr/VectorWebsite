# Generated by Django 4.0.4 on 2022-05-31 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_remove_customer_purchased_item_delete_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(max_length=25),
        ),
    ]
