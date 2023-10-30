FROM python:3.12.0-bullseye

RUN apt-get -y update
RUN apt-get install -y software-properties-common
RUN apt-add-repository -y ppa:swi-prolog/stable
RUN apt-get install -y swi-prolog

COPY . /app/
WORKDIR /app

RUN pip install fastapi
RUN pip install "uvicorn[standard]"

EXPOSE 8000
CMD ["uvicorn","main:app","--host", "0.0.0.0"]