import http from 'http';


const hostname = "127.0.0.1"; // local host
const port = 3000; // portnummer bei 3000


// das ist eine call-back-Funktion  #########  // () => {} anonyme Funktion, () F.Parameter

//HTTP Serverobjekt erstellen                             
const server = http.createServer((req, res) => {                     
    console.log(`Anfrage erhalten: ${req.method} ${req.url}`);

    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end('Hallo Welt vom Node.js Server.');
});

// Server starten

server.listen(port, hostname, () => {
    console.log(`Server gestartet unter http://${hostname}:${port}/`);
})

