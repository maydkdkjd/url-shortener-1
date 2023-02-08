# Short URL - A url shortener

## Usage

### Setting up the environment

#### Server

```sh
cd server     # cd into the server directory
npm i         # install packages
touch .env    # create .env file inside server dir
cd ..         # cd back into the root of project
```

Open the `.env` file and set it as follows. The values are for demo purpose only. Enter your own values accordinglly

```.env
PORT=5000                                   # Server port
DB_URI="mongodb://user:password@127.0.0.1"  # MongoDB URI
DB_NAME='mydb'                              # Database name
JWT_SECRET='secret'                         # JWT public key
```

#### Client

```sh
cd client    # cd into the client directory
npm i        # install packages
```

### Running the application

```sh
cd server         # cd into server
npm start         # run the server
cd ../client      # cd into client 
npm start         # run the ReactJs application
```

The server will run at `http://localhost:PORT` and client at `http://localhost:3000` if the `3000` port is available or on the subsequent one it not.
