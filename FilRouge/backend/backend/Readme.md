# Install Docker Windows destop / Linux commande Line
# Dockerfile
docker compose up --build backend

# Docker Compose 
 docker compose up backend

enrironement:  
python -m venv venv    
venv\Scripts\activate 

python manage.py makemigrations
python manage.py migrate
 
# python manage.py showmigrations
 
 
 python manage.py makemigrations 

 python manage.py runserver 


# Super User 
python manage.py createsuperuser

# Installation
 pip install django 
 pip install -r requirements.txt
 pip show django 
 pip install Pillow
 pip install djangorestframework  
 pip install psycopg2
 python -m pip install django-cors-headers


-- Sur Windows 
 # microsoft MCT
pip install --upgrade setuptools
 https://visualstudio.microsoft.com/visual-cpp-build-tools/
# After install desktop dev c++ 
# Restart system 
pip install web3


# Installer Python 3.12
    # Quitter le mode env pour mettre à jour la version de python
    python --version
    # Suprrimer l'envirronement et le réinstaller 
        python -m venv venv    
        venv\Scripts\activate 

# Procedure init le prjet 
    - tu es sur quel OS ( Linux, Windows )
    - verifier la version python
    - Mettre l'environnement en place 
    - Installer les dependance + Pillow + django-cors-headers
    - Installer ProgresSql ( Sans l'installer physiquement )
    - Install Django
    - Les migrations
