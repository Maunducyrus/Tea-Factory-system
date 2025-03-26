
Gatundu Tea Factory, where tea tastes honey 😂😂😂😂

Setting up the Back-end for this project

mkdir tea_factory_backend 
cd tea_factory_backend
python -m venv venv   
source venv/bin/activate    
pip install django djangorestframework django-cors-headers psycopg2    
django-admin startproject backend .   
django-admin startapp api  

python manage.py migrate

python manage.py createsuperuser 

python manage.py runserver

pip install mysqlclient

pip install pillow

