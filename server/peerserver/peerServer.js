const fs = require('fs');
const { PeerServer } = require('peer');

var cors = require('cors')
 
// app.use(cors())
 
PORT = 9001
const peerServer = PeerServer({ 
    port: PORT,
    path: '/',
    ssl: {
        key: fs.readFileSync('../../.localCert/keyClientLocal_192_168_15_169.pem'),
        cert: fs.readFileSync('../../.localCert/certClientLocal_192_168_15_169.pem')
    }    
});
console.log('PeerJS server running on port ' + PORT)