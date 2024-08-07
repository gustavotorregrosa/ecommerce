import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
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

  constructor(private eventEmitter: EventEmitter2) {}

  handleDisconnect(client: any) {
    console.log('disconnected', {client: client.id})
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('connected', {client: client.id})
  }

  afterInit(server: any) {}

  @SubscribeMessage('refresh-categories')
  refreshCategoriesEM(client: any, payload: any){
    this.eventEmitter.emit('refresh-categories')
    this.eventEmitter.emit('refresh-products')
  }

  @OnEvent('refresh-categories')
  refreshCategoriesGW(){
    this.server.emit('refresh-categories')
  }

  



}
