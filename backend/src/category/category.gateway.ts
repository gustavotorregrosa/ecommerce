import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'category',
  cors: {
    origin: '*',
  },
})
export class CategoryGateway implements OnGatewayInit, OnGatewayConnection {

  handleConnection(client: any, ...args: any[]) {
   console.log('conectou...')
   console.log(client.id)
  }

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    setInterval(() => {
      console.log(Object.keys(this.server.sockets))
      
      // console.log(t≥s.server.sockets)
    }, 4000)
    // console.log('test 123 after init')
    // throw new Error('Method not implemented.');
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
