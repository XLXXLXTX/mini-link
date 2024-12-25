# 🔗 mini-link! - URL Shortener App
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Implementation of a URL shortener.

## Table of Contents
- [🔗 mini-link! - URL Shortener App](#-mini-link---url-shortener-app)
  - [Table of Contents](#table-of-contents)
  - [Description:](#description)
  - [Functionalities:](#functionalities)
  - [Technology Stack:](#technology-stack)
  - [How to run:](#how-to-run)
    - [Database in local environment:](#database-in-local-environment)
    - [Modifying default ports:](#modifying-default-ports)
    - [Run in local environment:](#run-in-local-environment)
  - [License:](#license)

---

## Description:
Simple URL shortener app that takes a long URL and returns a shortened version of it, which can be used to redirect to the original URL.

## Functionalities:
- **Shorten URL:** Given a long URL, the app returns a shortened version of it.
- **Redirect:** When accessing a shortened URL, the app redirects to the original URL.
- **QR Code:** The app generates a QR code for the shortened URL that can be scanned/saved.
- **Light/Dark Mode:** The app supports light/dark mode.
- **Responsive Design:** The app is responsive and works on mobile devices.
- **Copy to Clipboard:** The user can copy the shortened URL to the clipboard.
- **Error Handling:** The app handles errors and displays them to the user.
- **Login/Logout:** The user can log in and log out of the app.
- **Admin Dashboard:** Dashboard to manage links and api keys as an admin, being able to generate new api keys and delte keys and links.


## Technology Stack:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite with TursoDB
- **Deployment**: Vercel

## How to run:
This project uses two different `.env` files, one for the frontend and another for the backend. Both files must be created in the respective directories, and can be based on the `.env.template` files provided.

### Database in local environment:
To run the project locally, you need to configure environment variables in the backend `.env` file.
- `LOCAL_DB_PATH`: sets the path to the SQLite database file that will be used in the local environment.
When the project is executed locally, an SQLite database file name by default `mini-link-local.db` will be created in the root of the project.

```bash
mini-link/
├── client
│   └── ...
├── scripts
│   └── ...
├── server
│   └── ...
├── ...
├── mini-link-local.db
└── ...
```

 This can be changed by editing the `LOCAL_DB_PATH` variable in the backend `.env` file.

Additionally, the environment variables `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` must be removed or commented out, as they are only used in the production environment.

### Modifying default ports:

- <u>Backend:</u> ***the backend server runs by default in the port `3000`***, you can modify it by changing the value of the `PORT` variable in the backend `.env` file. **Remember to also change the value of the `VITE_BACKEND_URL` variable in the frontend `.env` file to match the url and port where the backend project is running.**
- <u>Frontend:</u> ***the frontend server runs by default in the port `5173`***, you can modify it by changing the value in the `vite.config.js` file in the `client` directory.

### Run in local environment:
After configuring the project, you can run it by following these steps:

1. Generate the SQLite database file by running the SQL script called `mini-link.sql` in the `scripts` folder, or by running the script called `generate-db` in the same folder:

```bash
chmod +x /scripts/generate-db.sh
./scripts/generate-db.sh
```

2. Install dependencies for both the frontend and backend projects from the root directory of the project:
```bash
npm run install:all
```

3. Run the backend project:
```bash
npm run start:backend
```

4. Run the frontend project:
```bash
npm run start:frontend
```

5. Access the frontend project at `http://localhost:5173` by default.

---

## License:
Distributed under the MIT License. See `LICENSE.txt` for more information.
