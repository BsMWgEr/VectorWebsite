# Generated by Django 4.0.4 on 2022-04-28 18:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_inventoryitem_on_hold'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerHold',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('on_hold', models.BooleanField(default=True)),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('new_customer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.customer')),
            ],
        ),
        migrations.AlterField(
            model_name='inventoryitem',
            name='on_hold',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.customerhold'),
        ),
    ]
