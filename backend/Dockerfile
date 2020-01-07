FROM python:3.7-alpine3.10

LABEL Author="Pawel Kalicki"
LABEL E-mail="kalicki.paul@icloud.com"
LABEL version="0.0.2a"

ENV PYTHONDONTWRITEBYTECODE 1

RUN apk add --no-cache python3-dev libstdc++ && \
    apk add --no-cache g++ && \
    ln -s /usr/include/locale.h /usr/include/xlocale.h && \
    pip3 install numpy

RUN apk add --no-cache freetype-dev
RUN apk add --no-cache git

RUN pip3 install pybind11==2.4.3 Cython

RUN apk add --no-cache \
    --virtual=.build-dependencies \
    g++ gfortran file binutils \
    musl-dev python3-dev cython openblas-dev && \
    apk add libstdc++ openblas && \
    ln -s locale.h /usr/include/ylocale.h && \
    git clone https://github.com/scipy/scipy.git && \
    cd scipy && git clean -xdf && \
    python3 setup.py install --user && \
    rm -r /root/.cache && \
    find /usr/lib/python3.*/ -name 'tests' -exec rm -r '{}' + && \
    find /usr/lib/python3.*/site-packages/ -name '*.so' -print -exec sh -c 'file "{}" | grep -q "not stripped" && strip -s "{}"' \; && \
    rm /usr/include/ylocale.h && \
    apk del .build-dependencies

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

CMD ["python", "main.py"]