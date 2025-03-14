
Gatundu Tea Factory, where tea tastes honey 😂😂😂😂

Setting up the Back-end for this project
mkdir tea_factory_backend && cd tea_factory_backend
python -m venv venv  # Create a virtual environment
source venv/bin/activate  # Activate the virtual environment (Windows: venv\Scripts\activate)
pip install django djangorestframework django-cors-headers psycopg2  # Install dependencies
django-admin startproject backend .  # Create the Django project
django-admin startapp api  # Create an app for API
