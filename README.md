# User App  

### Setup

#### Node Setup
- Install nvm

- Install node 18 `nvm install 18`

- Make sure that you are using node version 18 before starting by running command `nvm use 18`


#### SSL Certificate Generation (In Mac M1)

- `openssl genrsa -out key.pem`
- `openssl req -new -key key.pem -out csr.pem`
- `openssl x509 -req -days 5 -in csr.pem -signkey key.pem -out certificate.crt`

    - Note: After generating the key.pem and centificate.crt put these files in security folder

#### Code setup

- Install `nodemon` globally `npm install nodemon -g`

- Install all the packages `npm install`
    
#### Starting server

- `npm start` should start the servers and should be available on

    - `http://localhost:8080` 
    - `https://localhost:8081`

- And that should get you started!