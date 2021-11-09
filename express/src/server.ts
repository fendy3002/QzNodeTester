import app from './app';

import path = require('path');
import fs = require('fs');
import http = require('http');
import https = require('https');

app().then(({ app }) => {
    if ((process.env.HTTPS || "").toLowerCase() == "true") {
        let privateKeyPath = process.env.HTTPS_PRIVATE_KEY;
        let credentialPath = process.env.HTTPS_CERTIFICATE;

        let privateKey = fs.readFileSync(privateKeyPath, 'utf8');
        let certificate = fs.readFileSync(credentialPath, 'utf8');

        const credentials = { key: privateKey, cert: certificate };
        const httpsServer = https.createServer(credentials, app);

        httpsServer.listen(process.env.PORT);
        console.log("App start on " + process.env.PORT);
    }
    else {
        let httpServer = http.createServer(app);
        httpServer.listen(process.env.PORT);
        console.log("App start on " + process.env.PORT);
    }
})