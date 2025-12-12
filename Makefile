# Define microservice directories
SERVICES = fe

# Docker
build:
	@echo "Building all services..."
	@docker compose build

up:
	@echo "Starting all services..."
	@docker compose up -d

down:
	@echo "Stopping all services..."
	@docker compose down

logs:
	@docker compose logs -f

ps:
	@docker compose ps

# Testing
test:
	@echo "Running tests for all services..."
	@for service in $(SERVICES); do \
		docker compose run --rm $$service npm run test:run; \
	done

test-e2e:
	@echo "Running tests for all services..."
	$(MAKE) start
	@for service in $(SERVICES); do \
		docker compose run --rm $$service npm run test:e2e; \
	done

# Helper
start:
	@echo "Starting the services..."
	$(MAKE) build
	$(MAKE) up

# Usage Information
help:
	@echo "Available commands:"
	@echo "  make start            - Starting the services"
	@echo "  make build            - Build all Docker services"
	@echo "  make up               - Start all Docker services"
	@echo "  make down             - Stop all Docker services"
	@echo "  make logs             - Show logs for all Docker services"
	@echo "  make test             - Run all unit/component tests for all services"
	@echo "  make test-e2e         - Run e2e tests for all services"
