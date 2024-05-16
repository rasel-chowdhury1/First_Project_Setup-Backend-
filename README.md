###Project Initialization: Setting up Backend with Express, Mongoose, TypeScript, CORS, dotenv, ESLint, and Prettier
This guide walks you through setting up a backend project with essential tools and technologies for building robust web applications.

Steps:
Initialize npm:


1-> npm init -y 
2-> npm install express 
3-> npm install mongoose --save 
4-> npm install typescript --save-dev 
5-> npm install cors 
6-> npm intall dotenv 
7-> tsc --init then go to tsconfig.json file -> then commment out and set "rootDir":"./src", "outDir": "./dist" 
{
  "compilerOptions": {
    /* other options */
    "rootDir": "./src",
    "outDir": "./dist"
  }
}

###Notes:
Express: A minimal and flexible Node.js web application framework.
Mongoose: Elegant MongoDB object modeling for Node.js.
TypeScript: Adds static typing to JavaScript to improve code quality and maintainability.
CORS: Middleware to enable Cross-Origin Resource Sharing in Express.
dotenv: Loads environment variables from a .env file into process.env.
ESLint: A pluggable and configurable linter tool for identifying and fixing problems in JavaScript code.
Prettier: Opinionated code formatter to enforce a consistent code style.
Getting Started:
Clone this repository.
Install dependencies using npm install.
Start the server with npm start.
Explore and modify the code according to your project requirements.

