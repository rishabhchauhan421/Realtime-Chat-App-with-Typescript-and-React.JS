import { FormEvent, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './typings';
// import './App.css';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000/'
);
socket.on('connect', () => {
  console.log(`${socket.id}: connected`);
});

function App() {
  const [room, setRoom] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('serverMsg', (data) => {
      console.log(`servermsg: ${data.msg}`);
      setMessages([...messages, data.msg]);
    });
  }, [socket, messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('clientMsg', { msg, room });
    setMsg('');
    setRoom('');
  };
  return (
    <>
      <div>
        <h1>Messages</h1>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Room Key"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Msg"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button>Send Message</button>
      </form>
    </>
  );
}

export default App;
