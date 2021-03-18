mkcert mkcert -key-file key.pem -cert-file cert.pem localhost 192.168.15.169

Created a new certificate valid for the following names 📜
- localhost
- 192.168.15.169

Reminder X.509 wildcards only go one level deep, so this won't match a.b.example.com ℹ️

The certificate is at cert.pem and the key at key.pem ✅

It will expire on 17 June 2023 🗓

rename the files accordingly
used in react environment variables and peerjs server