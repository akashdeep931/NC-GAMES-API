# Northcoders House of Games API

## About

This is an API built for the purpose of accessing application data programmatically.
Here you can access the api server: https://nc-games-api-39ip.onrender.com/api
You can see then endpoints you can access utilising different HTTP methods and what you will get as a response.

## Instructions for running the program locally:

### Clone the repository

If you want to see what has been created and try it yourself on your local machine you can clone the repository (fork if you want to as well) using the next command on your terminal inside the directory where you want to save it.

```
git clone https://github.com/akashdeep931/NC-GAMES-API.git
```

Note: if you fork it, you will have to get the link from the forked repo.

### Install dependencies

This project use various dependencies to achieve its goal, you will have to install them as well, otherwise, it is not going to work as itended and you will poll all kind of errors. So, to not get into this issue and avoid it, install all the dependencies used in this project running the following command in the vsCode integrated terminal once you open the repo.

```
npm i
```

Note: If you get vulnerabilitites, try following the instruction given on the terminal and use:

```
npm audit fix
```

You will have then a new directory named node_modules which will be git ignored.

### Set up databases and seed

As you can see inside the _package.json_, we have a list of scripts that you are going to run:

1. Set up the databases

```
npm run setup-dbs
```

2. Create dotenv files

You will need to create two .env files at the root level: .env.test and .env.development. Into each, add PGDATABASE=`database_name_here` with the correct database name for that environment (see /db/setup.sql for the database names). This will allow you to connect at the correct database when testing or developing.

3. Run the tests

Run the utils.test.js with the next command to see if they are passing and get ready to seed the database.

```
npm t utils
```

Note: if any test is failing, I am afraid you will have to check the utils functions and search for the bug. However, it should be clean and working.

3. Seed the database

Now it is time to seed the database, run the following script to achieve that:

```
npm run seed
```

This will seed you database and create tables with their records.

### Test endpoints

Once seeded, it is all ready to test the endpoints, to do it, run the next command:

```
npm t integration
```

If they all pass, the API is ready to be deployed, otherwise, you are going to start debugging :D, but, as I said before, all should be fine.

### Node & PSQL versions

- The version of Node used to run this project is 19.4.0

- The version of PSQL used to manage the data is 14.6
