export interface ServerToClientEvents {
  serverMsg: (data: { msg: string; room: string }) => void;
}

export interface ClientToServerEvents {
  clientMsg: (data: { msg: string; room: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
