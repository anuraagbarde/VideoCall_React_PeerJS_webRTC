## To run the project you need the following
 - npx create-react-app
 - <strike>choco mkcert (then mkcert -install) read the .localCert readme</strike> // No need now. legacy for this project
 - <strike>peerjs server</strike> // Shifted to node express on backend

yarn is used in this project

<strike>mkcert is for local development server https</strike>

## To start the project
<strike>Once you have your certificates configured (It is better to have https environment because navigator.mediaDevices.getUserMedia(constraints) requires a secure environment though it works fine on localhost)</strike>
I decided to trash the local https environment

```powershell
cd ./frontend
yarn install
yarn start
```

// No need now. legacy for this project
<strike>The peer-server and react-server is run in parallel using npm-run-all, config can be changed in package.json scripts</strike>