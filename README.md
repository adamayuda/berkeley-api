# 🚀 Simple Instagram API 🚀

This project's purpose is to show the code to Berkeley Assets technical team. It's a simple API built with node.js(express) and mongoDB.

## What is inside?
* DTO
* Authentication with JSON Web token
* MongoDB
* CRUD
    * Post(create, getOne, getAll, updateOne, deleteOne)
* Config environment

```
    .
    ├── config              # Environment variable check
    ├── controllers         # Instructions
    ├── dto                 # Data transfer object
    ├── middlewares         # Actions before controllers           
    ├── models              # Mongoose Schema
    ├── routes              # Routing(post, get, patch, delete)
    ├── services            # All the logics
    ├── app.js              # Entry of the application
  ```

## How it work?
* Create env file variables with `touch .env`
```
PORT=3000
JWT_KEY=12345
MONGO_URI=localhost:27017/berkeley
```
* Run
    * `yarn`
    * `yarn dev`
* Test
    * `yarn test:cov`
* Lint
    * `yarn eslint:check` or `yarn prettier:check`
    * `yarn eslint:fix` or `yarn prettier:fix`
    * `yarn lint:check` or `yarn lint:fix`
