# Web Development Compiler

A full-stack web development project that provides a user-friendly code editor website for writing, compiling, and previewing HTML, CSS, and JavaScript code.

## Features

* 💻 Code Editor with syntax highlighting and auto-completion
* 🚀 Real-time Preview of web pages
* 🔒 User Authentication with signup, login, logout, and secure code saving using JWT (JSON Web Token)
* 📁 Code Saving and Sharing with unique links
* 📝 Edit and Download code features
* 👀 Anonymous user mode for writing and saving code without an account
* 📊 User dashboard for managing saved codes

## Technologies

* Frontend: React, Redux, TypeScript, Tailwind CSS, Shadcn
* Backend: Node.js, Express.js, MongoDB
* Database: MongoDB
* Authentication: JWT (JSON Web Token)

## Setup and Installation

To set up the project locally:

1. Clone the repository
2. Run `npm install` in both the `client` and `server` folders
3. Create a `.env` file in the root directory with the following variables:
	* `MONGO_URI=<your_mongo_db_uri>`
	* `JWT_SECRET=<your_jwt_secret_key>`
4. Start the server with `npm run start:dev` in the `server` folder
5. Start the client with `npm run start:dev` in the `client` folder

## Usage

1. Open the website in a web browser
2. Write and compile code in the editor
3. Preview the web page on the right side
4. Signup or login to save and share code

## .env File

Create a `.env` file in the root directory with the following variables:

* `MONGO_URI=<your_mongo_db_uri>`
* `JWT_SECRET=<your_jwt_secret_key>`

Replace `<your_mongo_db_uri>` and `<your_jwt_secret_key>` with your actual MongoDB URI and JWT secret key, respectively.

## License

This project is licensed under the MIT License.



