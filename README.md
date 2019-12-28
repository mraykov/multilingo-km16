# MultiLingo-MK-16

## About

---

MultiLingo is a single-page application for content publishing. The articles are auto-translated in all MultiLingo supported languages. Every translation can be rated. It also shows an average rating of all rates. Translations could be edited by the every user with Editor role, which is assigned by the Administrator.

<br>

### Set up Google Cloud Translate API

To be able to use the appication locally, you must set up a Google Cloud Translate API. For this purpose, please follow this steps: <br>
1) [Set up Google Cloud Translate API](https://cloud.google.com/translate/docs/basic/setup-basic) (*Ignore step 2*)
2) Download the private key as JSON.
3) Rename the downloaded file as `google-credentials.json`
4) Save the `google-credentials.json` file in the `server/config` folder

<br>

### Running the server

---

Navigate to `/server`

Before running the project you should create an `.env` file as shown below <br>

- In the server root folder create `.env` file<br>
  ```.env
  PORT = 3000
  DATABASE_TYPE = mysql
  DATABASE_HOST = localhost
  DATABASE_PORT = 3306
  DATABASE_USER = <your-database-username>
  DATABASE_PASSWORD = <your-database-password>
  DATABASE_NAME = <your-database-name>
  SSL_STATUS = false
  JWT_SECRET = <somesecret>
  JWT_EXPIRE_TIME = 3600000
  GOOGLE_APPLICATION_CREDENTIALS = src/config/google-credentials.json
  ```


> Database settings

```
When setting the mySQL database, create a schema choosing  utf-8 as Default Charset
```
> Installing dependencies and running the server

```bash
# Install all dependencies
$ npm install
```

```bash
# Run database migrations
$ npm run typeorm:migrate
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
```

> Tests

```bash
# Run the following command
$ npm test

# If you have jest installed globally:
$ jest test
```
<br>

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
# Run the following command
$ npm test

# If you have jest installed globally:
$ jest test
```
<br>

> ### Seeded User Profiles

```md
# User profile Admin

username: administrator,
password: admin007
```

```md
# User profile Editor

username: martin,
password: martin02
```

```md
# User profile Contributor

username: kristian,
password: kristian03
```
<br>

## Technologies

---

`JavaScript`, `TypeScript`, `NestJS`, `Angular 8`, `TypeORM`, `mySQL`, `Jest`, `HTML`, `CSS`, `Bootstrap 4`

<br>

## Authors and acknowledgment

---
`Martin Pavlov` - https://github.com/mraykov <br>
`Kristian Hadzheiv` - https://gitlab.com/Hadzhiev

The project was initially assigned by [Bright](https://www.bright.consulting/) and [Telerik Academy](https://www.telerikacademy.com/) as a part of the final project of the `Telerik Academy Alpha JavaScript Track 07/2019`

<br>

## License

---

Code released under [MIT](https://choosealicense.com/licenses/mit/) License
