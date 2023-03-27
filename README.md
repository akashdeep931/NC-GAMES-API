# Northcoders House of Games API

## What is this?

This is an API built for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

## Instructions:

As we are using PSQL to interact with the data, you will need to follow the next steps to run the project locally in your machine:

### Install dotenv library

Use the next command on your terminal to do it

```
npm i dotenv
```
### Create the .env files

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=`database_name_here`, with the correct database name for that environment (see /db/setup.sql for the database names).
