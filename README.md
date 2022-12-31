# Backend Application (SAAS) with Clean Architecture

## Stack usado
- NestJS
- TypeScript
- MongoDB
- Docker Compose (DEV Mode)

Para correr localmente este proyecto, se necesita una base de datos mongoDB
```
docker-compose up -d
```

* El -d, significa __detached__

* La URL de MongoDB Local: 
```
mongodb://localhost:27017/projects_management
```

* Para reconstruir los modulos de node es necesario ejecutar este comando:
```
npm i 
```

Para levantar el servidor de node con nestjs es necesario ejecutar este comando:
```
npm run start:dev 
```
