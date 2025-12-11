# Unravel - Docker Development Environment

This is the common docker setup for enabling local development on multiple Unravel roomlisting projects and multiple operating systems (Linux and OSX; Windows untested).

## Dependencies

The only dependency for this project is [docker](https://docker.io).
On Linux: `snap install docker`
On OSX: go to [here](https://docs.docker.com/docker-for-mac/install/) and follow the instructions.

## Setup

After cloning this repository, simply run:
```
$ docker-compose up -d
```

At this point, project can be cloned and started with `docker-compose up`, which will automatically make
them accessible via local browser with their respective domains under `.dev.livemys.com`.

## Known issues and workarounds

### <a name="osx_non_http"></a> OSX: Accessing non-HTTP services

If you intend on accessing services that do not run over HTTP (e.g.: PostgreSQL databases - I planned to add a small backend for this, but at the time of writing I’m not sure I’ll have enough time :) ), you must currently add a
local `docker-compose.override.yml` file to export the service port.

In the PostgreSQL case:
```yaml
services:
  db:
    ports:
      - "15432:5432"
```

This would make the PostgreSQL `db` service accessible on `localhost:15432`

Note the `1` in front of the exported port. This could be changed for each separate project, so that multiple
PostgreSQL containers would remain simultaneously accessible.

## Adding new services

To make use of this common infrastructure and make development on multiple platforms as similar as currently possible,
the individual services must have some common settings. The project's `docker-compose.yaml` file should include:

```yaml
services:
  SOMESERVICE:
    ...
    networks:
      unravel:
        aliases:
          - SOMEALIAS
    labels:
      - "traefik.frontend.rule=Host:SOMEALIAS.dev.livemys.com"
      - "traefik.port=8000"  # only needed if service exposes multiple ports
    ...
```

In this case, `SOMEALIAS` will be the service's subdomain under `dev.livemys.com`.


## Behind the scenes

_This section is only for the curious._

All individual services are accessed through a central proxy.

This central proxy is the only service which exports ports to `localhost`. All other projects are then automatically
detected and virtual hosts rules are created to redirect each request to the appropriate service. Redirects happen only
on the HTTP level, so services using other protocols have to be handled separately (see [Accessing non-HTTP services](#osx_non_http) above)

Virtual hosts are created for each started service following the format `SERVICE_NAME.PROJECT_NAME.dev.livemys.com`.
Additional names can be added via the `traefik.frontend.rule` service label. E.g.:
```yaml
...
services:
  someservice:
    labels:
      - "traefik.frontend.rule=Host:some.url.com"
...
```

All domains under `dev.livemys.com` resolve to localhost, so this works for these subdomains automatically. If you want to
use any other TLD, it's necessary to either add it to `/etc/hosts` and map it to localhost, or have its real DNS entry
point to localhost.
