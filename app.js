import http from 'http';
import { readFileSync} from 'fs';
import path from 'path';
import { fileURLToPath} from 'url';



const __filename = fileURLToPath(import.meta.url);
// C:\Users\techs\git-repos\nodejs_intro\app.js
const __dirname = path.dirname(__filename);
// /c/Users/techs/git-repos/nodejs_intro
const configPath = path.join(__dirname, 'config.json');

const config = JSON.parse(readFileSync(configPath, 'utf8'));
const { port, hostname } = config;

let posts = [
    {
     id: 1,
     title: "Mein erster Blogbeitrag",
     content: "Das sind die Inhalte von meinem ersten Blogbeitrag",
     author: "Bob",
     date: "2025-07-29"
    },
    {
     id: 2,
     title: "Node.js Grundlagen",
     content: "In diesem Beitrag beschreibe ich die Node.js Grundlagen",
     author: "Bob",
     date: "2025-07-30"
    }

]
let nextId = 3;

// das ist eine call-back-Funktion  #########  // () => {} anonyme Funktion, () F.Parameter

//HTTP Serverobjekt erstellen                             
const server = http.createServer((req, res) => {                     
    console.log(`Anfrage erhalten: ${req.method} ${req.url}`);


    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET','POST','OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/posts' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(posts));
    } else if (req.url.match(/^\/posts\/(\d+)$/) && req.method === 'GET') {
        const id = parseInt(req.url.split('/')[2]);
        const post = posts.find(p => p.id === id);

        if (post) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(post));
        } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Blogbeitrag nicht gefunden' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Endpunkt nicht gefunden' }));
    }
});

// Server starten

server.listen(port, hostname, () => {
    console.log(`Server gestartet unter http://${hostname}:${port}/`);
    console.log(`Teste den GET /posts Endpunkt unter http://${hostname}:${port}/posts`);
    console.log(`Testen Sie: GET http://${hostname}:${port}/posts/1`);
    console.log(`Testen Sie: GET http://${hostname}:${port}/posts/2`);
    console.log(`Testen Sie: GET http://${hostname}:${port}/posts/99 (für 404 Fehler)`);
});

