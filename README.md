# How to start?

## Install Requirements

You can run the 'bat' file, which has three 'pip install' sentence

```bash
pip install djangorestframework // rest-api
pip install pymysql             // connect database
pip install django-cors-headers // connect frontend and backend
```

## Running

You should run the backend and frontend at the same time.

### Run backend

```bash
cd backend
python manage.py runserver
```

### Run frontend

```bash
cd frontend
```

If run for the first time, run `npm install`

And then you can run `npm start` to run the frontend.

## For Development

### Use Pycharm to develop backend

Create a new project in the folder ".\backend\" just pulled/cloned, in order to create a venv for development: File-New project-Pure python, and then 'create'.

Now you can install the requirements(run the 'bat') in the venv(virtual environments for python).
