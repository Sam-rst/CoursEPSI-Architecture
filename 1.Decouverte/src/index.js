const express = require('express');
const app = express();
const PORT = 3010;

app.get('/', (request, response) => {
    response.send("Hello world !");
});

app.listen(PORT, () => {
    console.log("App started");
    console.log(`Lien du serveur (en local) : http://localhost:${PORT}`);
});
