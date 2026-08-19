.PHONY: start stop restart logs

start:
	docker compose up

stop:
	docker compose down

restart:
	docker compose down
	docker compose up

logs:
	docker compose logs -f
