# this tells Make to run 'make help' if the user runs 'make'
# without this, Make would use the first target as the default
.DEFAULT_GOAL := help

# here we have a simple way of outputting documentation
# the @-sign tells Make to not output the command before running it
help:
	@echo 'Available UI commands:'
	@echo '- clean: cleanup dist and build'
	@echo '- dev: spin up application in dev mode'
	@echo '- build: build application'
	@echo '- verify: build application and run it locally'
	@echo '- deploy: deploy to aws'

# cleanup dist and aws/build
clean:
	cd ui && rm -rf dist
	cd ui && rm -rf node_modules
	cd aws && rm -rf build
	cd aws && mkdir build
	cd api && rm -rf venv
	@echo 'cleanup ui and api cache!'

# start server
server:
	@echo 'Starting backend server...'
	cd api && zsh run.sh
		
# spin up ui in dev mode
client:
	@echo 'Starting develop instance..'
	cd ui && npm run dev
	open http://localhost:5173

shadcn:
	@echo 'Add Shadcn component'
	cd ui && npx shadcn@latest add

test:
	@echo 'Test CDK resources..'
	cd aws && npm run test

# build application
build:
	cd ui && npm run build

# build application and test the build locally on 8080	
verify:
	cd ui && npm run build
	cd ui && npx http-server dist & sleep 2 && open http://localhost:8080

# deploy to aws
deploy:
	cd ui && npm run build
	cd ui && mv build ../aws/
	@echo 'deploy complete!'

docker:
	cd api && rm dockerfile
	@echo 'creating dockerfile'
	cd api && cp dockerfile_bkp dockerfile
	cd api && docker build -t manna_image . && docker run -d --name manna_container -p 8000:8000 manna_image
