FROM python:3.12.2

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt --upgrade

COPY . .
COPY django.sh /app/django.sh
RUN chmod +x django.sh


EXPOSE 8000

ENTRYPOINT ["/app/django.sh"]