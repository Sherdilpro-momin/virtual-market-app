import { Injectable } from '@angular/core';
import { getDocs, collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  db = getFirestore();

  async getRooms() {
    const roomsSnap = await getDocs(collection(this.db, 'rooms'));
    return roomsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async createRoom(roomName: string, address: string, creator: string) {
    await addDoc(collection(this.db, 'rooms'), {
      name: roomName,
      address: address,
      users: [creator],
      joinRequests: []
    });
  }

  async sendJoinRequest(roomId: string, userId: string) {
    const roomRef = doc(this.db, 'rooms', roomId);
    await updateDoc(roomRef, {
      joinRequests: arrayUnion(userId)
    });
  }

  async acceptJoinRequest(roomId: string, userId: string) {
    const roomRef = doc(this.db, 'rooms', roomId);
    await updateDoc(roomRef, {
      users: arrayUnion(userId),
      joinRequests: arrayRemove(userId)
    });
  }

  async getMessages(room: string) {
    const messagesSnap = await getDocs(collection(this.db, 'rooms', room, 'messages'));
    return messagesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async sendMessage(room: string, message: string, userId: string) {
    debugger
    await addDoc(collection(this.db, 'rooms', room, 'messages'), { message, userId });
  }
}
