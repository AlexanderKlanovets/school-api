<h1 align="center">School API</h1>
<p align="center">
    A simple API built with (almost) pure Node.js and TypeScript.
</p>

## Description

School API is a small educational project with the goal of implementing an application having a more or less decent architecture without any kind of web-frameworks and ORMs.

Basically, it is an HTTP-server, which has an API for managing the information about some abstract teachers and lessons (didn't bother to implement the whole API because it wasn't my initial goal). It utilizes PostgreSQL for data persistence.

## Features

- Declarative request routing;
- Parsing requests' parameters and query part;
- Layered architecture;
- Custom logging;
- A simple implementation of graceful shutdown.

## Dependencies

- [pg](https://node-postgres.com/) for interacting with the database;
- [dotenv](https://www.npmjs.com/package/dotenv) to read the environment variables from the .env file;
- [joi](https://joi.dev/) to perform data parsing and validation.

## Installation

1. Clone the repository in the desired folder:

```bash
$ git clone https://github.com/AlexanderKlanovets/school-api
```

2. Install the dependencies:

```bash
$ npm i
```

3. For this step you need to have PostgreSQL installed and configured on your machine. Create the database for the app and run the script to create all the tables:

```bash
$ sudo psql -U <your_db_user> -d <your_db_name> -a -f db_init/init.sql
```

4. *Optional step.* You can also run the script for seeding your database:

```bash
$ sudo psql -U <your_db_user> -d <your_db_name> -a -f db_init/seed.sql
```

5. Create an ``.env`` file, define and initialize the environment variables according to the ``.env.example`` file. After that you're all set up to run the application:

```bash
$ npm run start
```