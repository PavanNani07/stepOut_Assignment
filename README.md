# IRCTC Railway Management System

## Technologies
- Backend: Python, Django
- Frontend: ReactJS
- Database: PostgreSQL

## Problem Statement
Design a railway management system like IRCTC where users can check train availability between two stations, view seat availability, and book seats. The system should handle real-time booking with race condition handling. There are two types of users: Admin and Logged-in users. Admins can manage trains and seats, while logged-in users can view and book seats.

## Tech Stack
- Backend: Python Django
- Database: PostgreSQL
- Frontend: React JS

## Requirements

### Backend (Django)
1. **Register a User**
    - Endpoint: `/api/register/`
    - Method: `POST`
    - Payload: `{ "username": "example", "password": "password", "is_admin": false }`

2. **Login User**
    - Endpoint: `/api/login/`
    - Method: `POST`
    - Payload: `{ "username": "example", "password": "password" }`

3. **Add a New Train**
    - Endpoint: `/api/trains/`
    - Method: `POST`
    - Headers: `{ "API-Key": "your_api_key" }`
    - Payload: `{ "train_name": "Express", "source": "A", "destination": "B", "total_seats": 100 }`

4. **Get Seat Availability**
    - Endpoint: `/api/trains/availability/`
    - Method: `GET`
    - Params: `?source=A&destination=B`

5. **Book a Seat**
    - Endpoint: `/api/book/`
    - Method: `POST`
    - Headers: `{ "Authorization": "Token <token>" }`
    - Payload: `{ "train_id": "1234567890" }`

6. **Get Specific Booking Details**
    - Endpoint: `/api/booking/<booking_id>/`
    - Method: `GET`
    - Headers: `{ "Authorization": "Token <token>" }`

## Instructions to Run

### Backend (Django)
1. Install dependencies:
    ```sh
    pip install django djangorestframework psycopg2-binary
    ```

2. Create a new Django project and app:
    ```sh
    django-admin startproject irctc
    cd irctc
    django-admin startapp api
    ```

3. Configure PostgreSQL in `settings.py`:
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'your_db_name',
            'USER': 'your_db_user',
            'PASSWORD': 'your_db_password',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```

4. Create models for User, Train, Booking in `api/models.py`.

5. Create serializers for the models in `api/serializers.py`.

6. Create views and endpoints in `api/views.py`.

7. Add URL routing in `irctc/urls.py` and `api/urls.py`.

8. Run migrations:
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

9. Create a superuser for admin:
    ```sh
    python manage.py createsuperuser
    ```

10. Start the server:
    ```sh
    python manage.py runserver
    ```

### Frontend (React)
1. Create a new React project:
    ```sh
    npx create-react-app railway-management-frontend
    cd railway-management-frontend
    ```

2. Install dependencies:
    ```sh
    npm install axios react-router-dom
    ```

3. Create components for Register, Login, AddTrain, TrainList, Booking, and Home.

4. Configure routes in `App.js` using `react-router-dom`.

5. Implement API calls using Axios in the respective components.

6. Start the React development server:
    ```sh
    npm start
    ```

## Sample Code

### Backend (Django)
#### Models (api/models.py)
```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

class Train(models.Model):
    train_name = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    total_seats = models.IntegerField()
    available_seats = models.IntegerField()

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)
