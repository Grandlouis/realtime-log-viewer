import io from 'socket.io-client';
let SOCKET;

export const connect = () => {
    SOCKET = io('http://localhost:3000/');
    console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (SOCKET) SOCKET.disconnect();
}

export const subscribeContent = (handler) => {
    if (!SOCKET) return (true);
    SOCKET.on('content', data => {
        console.log('Websocket event received!');
        return handler(data);
    });
}

export const loadFile = (filename) => {
    if (SOCKET) SOCKET.emit('load-file', filename);
}

export const closeFile = (filename) => {
    if (SOCKET) SOCKET.emit('close-file', filename);
}