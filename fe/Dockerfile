ARG FROM="node:lts-bookworm-slim"
FROM ${FROM}

ARG DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=x
ENV LC_ALL=C.UTF-8

USER root

WORKDIR /app

RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
    ca-certificates gettext git locales curl wget && \
    locale-gen en_US.UTF-8 && \
    # Dependencies for playwright
    npx playwright install-deps && \
    apt clean && \
    find /usr/share/man /usr/share/locale /usr/share/doc -type f -delete && \
    rm -rf /var/lib/apt/lists/*


# ensure that `node` user exists
# guarantee the uid and gid is set to 1000
RUN grep -q -w 1000 /etc/group || groupadd --gid 1000 node && \
    id -u node >/dev/null 2>&1 || useradd --gid 1000 --uid 1000 -m node && \
    chown node:node /app

USER node

ENV PATH=/home/node/.local/bin:$PATH

RUN npx playwright install

COPY --chown=node package.json package-lock.json /app/
RUN npm install --loglevel=error

COPY --chown=node . /app/
EXPOSE 5173
