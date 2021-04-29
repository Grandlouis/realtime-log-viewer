const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const watchDirectory = path.join(__dirname, 'watch-files');
const INTERVALS = {};
const CLIENTS = {};

const closeFile = (fileName) => {
    console.log('closing file watch: ', fileName);
    clearInterval(INTERVALS[fileName].interval);
    INTERVALS[fileName].watcher.close();
    delete INTERVALS[fileName];
}

const randomMessages = [
    'Something happened\n',
    'Importing data\n',
    'Rendering page\n',
    'Unhandled Error\n',
    'Rebooting system\n',
    'Event Handler\n',
    'Sending payload\n',
    'Building Query\n',
    'Imported Successfully\n',
    'Importing Failed\n'
];

io.on('connection', socket => {
    CLIENTS[socket.id] = socket;
    socket.on("disconnect", (reason) => {
        console.log('Client disconnected', socket.id, reason);
        delete CLIENTS[socket.id];
        !CLIENTS.length && Object.keys(INTERVALS).forEach(closeFile);
    });

    socket.on('load-file', (fileName) => {
        const file = path.join(watchDirectory, fileName);

        INTERVALS[fileName] = {
            interval: setInterval(() => {
                const randomIndex = Math.floor(Math.random() * randomMessages.length);
                const randomIntervals = Math.floor(Math.random() * 900) + 100;
                setTimeout(() => fs.writeFileSync(file, `[${new Date().toISOString()}] ${randomMessages[randomIndex]}`, { flag: 'a' }), randomIntervals);
            }, 1000),
            watcher: fs.watch(
                file,
                {
                    bigint: false,
                    persistent: true,
                    interval: 300,
                },
                (info) => {
                    console.log(`Modified: ${fileName}`, info);
                    const data = fs.readFileSync(file, "utf8");
                    socket.emit('content', data);
                }
            )
        }
    })

    socket.on('close-file', closeFile);
})

nextApp.prepare().then(() => {

    app.get('/files', (req, res) => {
        res.json(fs.readdirSync(watchDirectory));
    })

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(3000, (err) => {
        if (err) process.exit(0)
        console.log('SERVER UP ON -> http://localhost:3000')
    })
})