# Hello Docker App

This is a simple Node.js app built with Express. It has two routes:

- `/` → returns a "Hello, World!" message
- `/health` → returns a health status, used to check if the app is running correctly

The app is packaged using Docker, run using Docker Compose, and automatically tested using GitHub Actions every time code is pushed.

## Files in this project

- `server.js` — the main app code
- `test.js` — a simple test that checks the app's routes are working
- `Dockerfile` — instructions to build a Docker image of the app
- `docker-compose.yml` — makes it easy to build and run the app with one command
- `.github/workflows/docker-build.yml` — automatically builds the Docker image and checks its health on every push to GitHub

## How to run this app

### Option 1: Run it directly with Node.js

```bash
npm install
node server.js
```

Then open `http://localhost:3000` in your browser.

### Option 2: Run it with Docker

```bash
docker build -t hello-docker-app .
docker run -d -p 3000:3000 --name hello-app hello-docker-app
```

### Option 3: Run it with Docker Compose (easiest)

```bash
docker compose up --build -d
```

Then visit:
- `http://localhost:3000` — hello world message
- `http://localhost:3000/health` — health check

To stop it:
```bash
docker compose down
```

## Running the test

```bash
node test.js
```

This starts the app and checks that both routes respond correctly. If everything works, it prints "All tests passed!".

## What happens on GitHub

Every time code is pushed to this repository, GitHub Actions automatically:
1. Downloads the code
2. Builds the Docker image
3. Runs the app inside a container
4. Checks the `/health` route to confirm the app started correctly
5. Shows logs and cleans up the container

You can see the results in the "Actions" tab of this repository.

## Assumptions made

- This is a simple demo app, so it does not use a database or any external service.
- The app runs on port 3000 by default.
- This project was built as a learning exercise to practice Docker, Docker Compose, and GitHub Actions.
