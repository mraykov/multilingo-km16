# MultiLingo-MK-16

## About
----
MultiLingo is a single page application for creating articles. The articles are auto-translated in all supported languages by MultiLingo. Every translation can be rated and show an average rating from all rates. Translations could be edited by the every user with Editor role, which is assigned by the Administrator.

### Running the server
---
Navigate to `/server`

Before running the project you should create two files - `.env` and `ormconfig.ts` as shown below <br>
  * In the server root folder create `.env` file<br>
    * For `mySQL` database, copy the code below and paste it in the `.env` file:<br>
    ```.env
    PORT=3000
    DB_TYPE=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=yourUserName
    DB_PASSWORD=yourPasswordForDataBase
    DB_DATABASE_NAME=yourDatabaseName
    JWT_SECRET=yourSecretKey
    JWT_EXPIRE_TIME=3600
    GOOGLE_APPLICATION_CREDENTIALS=src/config/google-service-account.json
    ```
  * In the server root folder create `ormconfig.ts` file<br>
    * For `mySQL` database, copy the code below and paste it in the `ormconfig.ts` file:<br>
    ```import {ConnectionOptions} from 'typeorm';
    // Check typeORM documentation for more information.
    const config: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'yourUserName',
    password: 'yourPasswordForDataBase',
    database: 'yourDatabaseName',
    entities: ['src/database/entities/**/*.ts'],

    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,

    // allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev
    migrations: ['src/database/migration/**/*.ts'],
    cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migration',
    },
    };

    export = config;
    ```
    
```bash
# When setting the mySQL database, create a schema choosing  utf-8 as Default Charset
```

```bash
# Install all dependencies
$ npm install
```

```bash
# Run database migrations
$ npm run typeorm:migrate <migrationName>
$ npm run typeorm:run
```

```bash
# Run database seed
$ npm run seed
```

```bash
# Start the server in development mode
$ npm run start

# Start the server in watch mode
$ npm run start:dev

# Start the server in production mode
$ npm run start:prod
```

```bash
# For tests run one of the following commands
$ npm test
# If you have jest installed global
$ jest test
```


### Rinning the client
---
Navigate to `/client`


```bash
# Install all dependencies 
$ npm install
```

```bash
# Start the client in watch mode
$ ng serve --open
```

```bash
# For tests run one of the following commands
$ npm test
$ ng test
# if you have jest installed globally
$ jest test
```

### Seeded User Profiles

```md
# User profile Admin
username: Stoyan,
password: wel1234

```
```md
# User profile Editor
username: Martin,
password: martin1234

```
```md
# User profile Contributor
username: Kristian,
password: kris1234

```


## Technologies
---
`JavaScript`, `TypeScript`, `NestJS`, `Angular 8`, `TypeORM`, `mySQL`, `Jest`, `HTML`, `CSS`, `Bootstrap 4`
## Authors and acknowledgment
---
`Kristian Hadzheiv` - https://gitlab.com/Hadzhiev <br>
`Martin Pavlov` - https://gitlab.com/pavlov_gb

The project was assigned by [Bright](https://www.bright.consulting/) and [Telerik Academy](https://www.telerikacademy.com/) as a part of the final project for the `Alpha JavaScript Track 07/2019`

### License
---
Code released under [MIT](https://choosealicense.com/licenses/mit/) License