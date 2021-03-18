## To run the project you need the following
 - npx create-react-app
 - choco mkcert (then mkcert -install) read the .localCert readme
 - peerjs and peerjs server

yarn is used in this project

mkcert is for local development server https

## To start the project
Once you have your certificates configured (It is better to have https environment because navigator.mediaDevices.getUserMedia(constraints) requires a secure environment though it works fine on localhost)

```powershell
cd ./frontend
yarn install
yarn start
```
The peer-server and react-server is run in parallel using npm-run-all, config can be changed in package.json scripts