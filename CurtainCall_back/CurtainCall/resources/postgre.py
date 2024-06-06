import os

database_name = 'curtaincall'
database_user = 'postgres'
PASSWORD = os.getenv('POSTGRE_PASSWORD')
HOST = os.getenv('POSTGRE_HOST')
PORT = os.getenv('POSTGRE_PORT')