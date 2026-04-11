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

# show project tree structure
tree:
	@echo "show project tree..."
	tree . -L 4 -I node_modules -I build -I cdk.out -I __pycache__

# cleanup dist and aws/build
clean:
	@echo 'cleanup ui'
	cd ui && rm -rf build
	cd ui && rm -rf node_modules
	@echo 'cleanup aws'
	cd aws && rm -rf node_modules
	cd aws && rm -rf cdk.out
	cd aws && rm -rf build
	cd aws && mkdir build
	@echo 'cleanup api'
	cd api && rm -rf venv
	@echo 'cleanup ui and api cache!'

# cleanup ui/build and aws/build
cleanui:
	@echo 'cleanup ui and aws/build'
	@echo 'clean ui...'
	cd ui && rm -rf build
	@echo 'cleanup aws...'
	cd aws && rm -rf build

# start server
server:
	@echo 'Starting backend server...'
	cd api && uv run fastapi dev
			
# spin up ui in dev mode
client:
	@echo 'Starting develop instance..'
	cd ui && bun run dev
	open http://localhost:5173

shadcn:
	@echo 'Add Shadcn component'
	cd ui && bunx shadcn@latest add

test:
	@echo 'Test CDK resources..'
	cd aws && bun run test

# build application
build:
	cd ui && bun run build

# build application and test the build locally on 8080	
verify:
	cd ui && bun run build
	cd ui && npx http-server dist & sleep 2 && open http://localhost:8080

# deploy to aws
deploy:
	@echo 'cleanup..'
	cd ui && rm -rf build
	cd aws && rm -rf build
	cd aws && mkdir build
	@echo 'build ui bundle..'
	cd ui && bun run build
	@echo 'deploy..'
	cd ui && mv build ../aws/
	@echo 'deploy complete!'

runBuild:
	@echo 'run AWS build..'
	cd aws/build && npx http-server . -p 5173

docker:
	cd api && rm dockerfile
	@echo 'creating dockerfile'
	cd api && cp dockerfile_bkp dockerfile
	cd api && docker build -t manna_image . && docker run -d --name manna_container -p 8000:8000 manna_image
