import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  namespace: 'product',
  cors: {
    origin: '*',
  },
})
export class ProductGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {

  @WebSocketServer() server: Server;

  constructor(private eventEmitter: EventEmitter2) {}

  handleDisconnect(client: any) {
    console.log('disconnected', {client: client.id})
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('connected', {client: client.id})
  }

  afterInit(server: any) {}

  // @SubscribeMessage('refresh-categories')
  // refreshCategories(client: any, payload: any){
  //   this.server.emit('refresh-categories')
  // }

  // @SubscribeMessage('refresh-products')
  // refrshProducts(client: any, payload: any){
  //   this.server.emit('refresh-products')
  // }

  @SubscribeMessage('refresh-categories')
  refreshCategoriesEM(client: any, payload: any){
    this.eventEmitter.emit('refresh-categories')
    
  }

  @OnEvent('refresh-categories')
  refreshCategoriesGW(){
    this.server.emit('refresh-categories')
  }

  @SubscribeMessage('refresh-products')
  refreshProductsEM(client: any, payload: any){
    this.eventEmitter.emit('refresh-products')
  }

  @OnEvent('refresh-products')
  refreshProductsGW(){
    this.server.emit('refresh-products')
  }

}
