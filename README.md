# statuscake-exporter

This service collects statistics from the Statuscake Monitoring service and translates them into Prometheus metrics.
These metrics are published on the /metrics endpoint, which can then be scraped by Prometheus.

## Build
```bash
docker build -t statuscake-exporter .
```

## Develop with Docker
```bash
docker-compose up --build
```
Don't forget to set the STATUSCAKE_USERNAME and STATUSCAKE_API_KEY env variables, which can be found in your Statuscake user profile.

### Debug in VS Code
It's possible to debug the Typescript code from your running dev docker container with VS Code. You need the below configuration in your launch.json (debug tab -> settings wheel).
An example is visible in .vscode/launch.json in this repository.
```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach to Docker",
  "port": 9000,
  "restart": true,
  "localRoot": "${workspaceFolder}",
  "remoteRoot": "/app",
  "outFiles": [
    "${workspaceFolder}/dist/**/*.js"
  ]
}
```

## Develop without Docker
```bash
yarn run watch & yarn run debug
```