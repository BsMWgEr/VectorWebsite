# Generated by Django 4.0.4 on 2022-04-28 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_remove_item_sold'),
    ]

    operations = [
        migrations.CreateModel(
            name='Name',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('sport_rigs', 'Sport Rigs'), ('tandem', 'Tandem'), ('student', 'Vector SE Student'), ('canopies', 'Canopies'), ('javelin_odyssey', 'Javelin-Odyssey')], default='sport_rigs', max_length=25)),
                ('name', models.CharField(max_length=200)),
                ('description_info', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=200)),
                ('description_info', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
