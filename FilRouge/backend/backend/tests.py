from backend.factories import WorkspaceFactory
from backend.models.Workspace import Workspace
from backend.models import Users
from backend.models.Workspace import  WORKSPACE_TYPE_CHOICES, DURATIONS_CHOICES, WEEKDAY_CHOICES
from backend.factories import UserFactory

from faker import Faker
import random
from django.db import IntegrityError

fake = Faker()

# users = UserFactory.create_batch(100)
# print(f"{len(users)} utilisateurs ont été créés avec succès.")


# Users
def generate_unique_username(used_usernames):
    while True:
        username = f"user{random.randint(1, 1000)}"  
        if username not in used_usernames:
            used_usernames.add(username)
            return username

used_usernames = set()
for _ in range(20):  
    username = generate_unique_username(used_usernames)
    email = fake.email()
    password = fake.password()
    try:
        Users.objects.create_user(username=username, email=email, password=password)
    except IntegrityError:
        continue

# Workspace
"""
for _ in range(20):
    WorkspaceFactory.create()
"""