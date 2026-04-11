# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working on code in this repository.

## IMPORTANT

## Project Overview

The E-commerce web-app "Manna Group International" can be categorized into - UI / client, API / server, IaC / Infrastructure.

### 1. UI / client

The Client application or UI web-app is built using React with Tailwind + DaisyUI. The UI / Client code is located under `ui` folder.
Use `fetch` API to make calls to the API. Use `zustand` for state / store management. Prefer `Bun` runtime enginer over `Node` for install, add, remove dependencies
and for building the project.

The website uses `Zustand` for state management. all redux related source code under `src/common/state` folder under the suffix `*.slice.*`.

- [DaisyUI - Design Documentation](https://daisyui.com/)
- [Bun - runtime](https://bun.com/)
- [Zustand - State management Library](https://zustand.docs.pmnd.rs/learn/getting-started/introduction)

### 2. API / server

The API server is a Python project, built using FastAPI framework. The FastAPI framework is locatd under `api` folder.
- To interact with the underlying SQLite DB, use `sqlalchemy` with `libsql` driver to connect to Turso remote SQL database.
- Prefer `uv` tool over `pip` for install, add, remove dependencies and for building project.
- Use `fly.toml` and `flyctl` CLI command to deploy container to `fly.io` platform. 

### 3. IaC / Infrastructure

The infrastructure code is located under `aws` folder. It uses `aws-cdk v2` framework for deploying Cloudformation templates.


## DOCUMENTATION

Document every change / feature introducd, as a markdown file `.md` and save it under `docs` folder.

## VERSIONING

- To update the version of the UI, update the `VITE_APP_VERSION` field, in the env variable `.env` file, and the `version` field under `package.json`, both files located under `ui` folder.
- To update the version of the API, update `version` field under the `GlobalConfig` under `app/about.py`
- To update the vrsion of the AWS, update `version` field under `package.json`, located under `aws` folder
- Kepp all three modules - API, UI & Infrastructure versions in sync.
- Using semantic versioning, For eg: `1.3.1` gets updated as `1.3.2`. similarly `1.3.9` gets updated as `1.4.0` unless a specific version is specified.
- Update the file `CHANGELOG.md` with the version number, date stamp & provide a brief, one liner point changes.
