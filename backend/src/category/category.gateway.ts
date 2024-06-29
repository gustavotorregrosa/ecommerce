import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'category',
  cors: {
    origin: '*',
  },
})
export class CategoryGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  handleDisconnect(client: any) {
    console.log('disconnected', {client: client.id})
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('connected', {client: client.id})
  }

  afterInit(server: any) {}

  @SubscribeMessage('refresh-categories')
  greeting(client: any, payload: any){
    this.server.emit('refresh-categories')
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
