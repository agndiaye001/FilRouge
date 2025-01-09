#!/bin/bash

set -e 

echo "Install corsheaders & Pillow"
python -m pip install django-cors-headers Pillow factory_boy djangorestframework-simplejwt django-allauth requests cryptography

echo "=================================="

echo "Create migrations"
python manage.py makemigrations backend
python manage.py showmigrations
echo "=================================="

echo "Migrate"
python manage.py migrate
echo "=================================="

echo "Create Super User"
# python manage.py createsuperuser --noinput --username admin --email admin@admin.com
# python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); user = User.objects.get(username='admin'); user.set_password('admin'); user.role = 'admin'; user.save()"
echo "=================================="


echo "Test"
locale -a
python manage.py test backend.tests
echo "=================================="

echo "Start server"
python manage.py runserver 0.0.0.0:8000