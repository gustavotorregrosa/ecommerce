import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'message',
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {

  @WebSocketServer() server: Server;

  handleDisconnect(client: any) {
    console.log('disconnected', {client: client.id})
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('connected', {client: client.id})
  }

  afterInit(server: any) {}

  @SubscribeMessage('send-message')
  refreshCategoriesEM(client: Socket, payload: any){
    console.log({payload})

    client.broadcast.emit('show-message', payload.message)
  }
}
