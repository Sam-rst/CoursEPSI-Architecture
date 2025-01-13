const express = require('express');
const app = express();

app.get('/api/hello', (request, response) => {
    response.send("Bonjour Epsi");
});

app.listen("3010", () => {
    console.log("App started");
});
