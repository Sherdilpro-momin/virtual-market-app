import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  rooms: any[] = [];
  selectedRoom: any = null;
  messages: any[] = [];
  newMessage: string = '';
  currentUserId=''
  newRoomName: string='';
  newRoomAddress: string='';

  constructor(private chatService: ChatService, private authService: AuthService) { }

  async ngOnInit() {
    console.log("chat loaded")
    debugger
    this.rooms = await this.chatService.getRooms();
    this.currentUserId = this.authService.auth.currentUser?.uid??'';
  }
  async getRooms() {
    this.rooms = await this.chatService.getRooms();
  }

  async createRoom() {
    if (this.authService.auth.currentUser && this.newRoomName.trim() !== '' && this.newRoomAddress.trim() !== '') {
      await this.chatService.createRoom(this.newRoomName, this.newRoomAddress, this.authService.auth.currentUser.uid);
      this.newRoomName = '';
      this.newRoomAddress = '';
      this.rooms = await this.chatService.getRooms();
    }
  }

  selectRoom(room:any) {
    if (this.authService.auth.currentUser && (room.users.includes(this.authService.auth.currentUser.uid) ? true:false)) {
      this.selectedRoom = room;
      console.log("selected Room:",this.selectedRoom);
      
      this.getMessages();
    } else {
      alert('You are not a member of this room!');
    }
  }

  async sendJoinRequest(room: any) {
    if(!this.authService.auth.currentUser)
      return;
    await this.chatService.sendJoinRequest(room.id, this.authService.auth.currentUser.uid);
    this.rooms = await this.chatService.getRooms();
  }

  async acceptJoinRequest(room: any) {
    if(!this.authService.auth.currentUser)
      return;
    await this.chatService.acceptJoinRequest(room.id, this.authService.auth.currentUser.uid);
    this.rooms = await this.chatService.getRooms();
  }

  async getMessages() {
    this.messages = await this.chatService.getMessages(this.selectedRoom.id);
    console.log("messages: ",this.messages);
    
  }

  async sendMessage() {
    debugger
    
    console.log("current Room:",this.selectedRoom);
    if (this.newMessage.trim() !== '' && this.authService.auth.currentUser) {
      await this.chatService.sendMessage(this.selectedRoom.id, this.newMessage, this.authService.auth.currentUser.uid);
      this.newMessage = '';
      this.getMessages();
    }
  }
  isCreator(room:any)
  {
    let isCreator = room.users.includes(this.currentUserId);
    console.log("creator:",isCreator);
    
    return isCreator?true:false;
  }
  hasRoomRequest(room:any)
  {
    let hasRoomRequest = room.joinRequests.includes(this.currentUserId);
    console.log("has request:",hasRoomRequest);
    
    return hasRoomRequest? true : false;
  }
}
