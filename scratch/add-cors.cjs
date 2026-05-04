const https = require('https');

const projectId = '7fwra7kt';
const token = 'sksftTYRzY8Qpdp1zmohuc95DFyAB3VPiQztgGMv7sRGK8D92XJ2nb13pTNxml5rtrvpIb6FTxkMJUlGcWYbAC4eONJ7QjAtLsn1LxcqrAeMdj9y3McO5Jpf21nThhoY0VqbiTNzzWn4vuF5PCcF3Dwo1qrFOtyRMjZu0HK7CCPrU8z6RpYm';
const origin = 'https://counsellorprenuer.github.io';

const data = JSON.stringify({
    origin: origin,
    allowCredentials: true
});

const options = {
    hostname: 'api.sanity.io',
    port: 443,
    path: `/v1/projects/${projectId}/cors`,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
        responseBody += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', responseBody);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
