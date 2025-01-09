# backend/factories.py
import factory
from faker import Faker
from backend.models.Users import Users
from backend.models.Users  import ROLE_CHOICES
from backend.models.Workspace import Workspace
from backend.models.Workspace import  WORKSPACE_TYPE_CHOICES, DURATIONS_CHOICES, WEEKDAY_CHOICES

FAKE = Faker()


@factory.Faker.override_default_locale('en_US')
class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Users

    username = factory.LazyAttribute(lambda o: f"user{factory.Faker('random_number').evaluate(None)}")  # Génère un username unique
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
    role = factory.Iterator([choice[0] for choice in ROLE_CHOICES])
    is_staff = factory.LazyAttribute(lambda obj: obj.role == 'admin')
    is_active = factory.Faker('boolean')
    date_joined = factory.Faker('date_time_this_year')
    activeSubscription = factory.Faker('boolean')


@factory.Faker.override_default_locale('en_US')
class WorkspaceFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Workspace

    workspace_type = factory.Iterator([choice[0] for choice in WORKSPACE_TYPE_CHOICES])
    description = factory.Faker('paragraph', nb_sentences=3)
    img = None  # Vous pouvez générer des chemins d'image ici si nécessaire
    duration = factory.Iterator([choice[0] for choice in DURATIONS_CHOICES])
    day = factory.Iterator([choice[0] for choice in WEEKDAY_CHOICES])
    capacity = factory.Faker('random_int', min=1, max=50)
    availability = factory.Faker('boolean')
    id_user = factory.LazyAttribute(lambda _: Users.objects.order_by('?').first()) 
    id_admin = None
    is_active = factory.Faker('boolean')
    location = factory.Faker('address')

