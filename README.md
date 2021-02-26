1. run "docker-compose up"
2. npm run pretypeorm
3. npm run start:dev
4. npm run typeorm migration:run


2. npm run start:dev
3. npx typeorm migration:create -n UserTable -d src/migrations
4. npx typeorm migration:generate -n UserTable -d src/migrations
5. npx typeorm migration:run


