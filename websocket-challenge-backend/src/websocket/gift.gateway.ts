import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {AppService} from '../app.service'

@WebSocketGateway()
export class GiftGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly appService: AppService){}

  connected: number = 0;

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('click_gift')
  listenForMessages(@MessageBody() data: number) {
    let response = this.appService.getGift(data);
    this.server.sockets.emit('gift', "Късметче " + data + ": " + response);
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.connected--;
    this.server.sockets.emit('connected', this.connected);
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.connected++;
    this.server.sockets.emit('connected', this.connected);
    console.log(`Client connected: ${client.id}`);
  }

}