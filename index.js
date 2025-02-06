const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

function randomNumber() {
    return Math.floor(Math.random() * 5) + 1;
}

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);
});


app.get('/sendrandom', (req, res) => {
    const randomNum = randomNumber();
    console.log("inside send random");
    
    // Emit the random number to all connected clients
    io.emit('randomNumber', randomNum);

    console.log(`Sent random number: ${randomNum}`);
    
    res.json({ message: 'Random number sent', number: randomNum });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
