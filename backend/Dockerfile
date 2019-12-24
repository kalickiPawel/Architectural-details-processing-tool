FROM python:3.6.8-alpine3.9

LABEL Author="Pawel Kalicki"
LABEL E-mail="kalicki.paul@icloud.com"
LABEL version="0.0.1a"

ENV PYTHONDONTWRITEBYTECODE 1
ENV FLASK_APP "main.py"
ENV FLASK_ENV "development"
ENV FLASK_DEBUG True

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD flask run