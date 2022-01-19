import { makeObservable, observable, action } from "mobx";
import axios from "axios";
class RoomStore {
  rooms = [];
  loading = true;
  constructor() {
    makeObservable(this, {
      rooms: observable,
      loading: observable,
      fetchRooms: action,
      createRoom: action,
      deleteRoom: action,
      updateRoom: action,
      createMsg: action,
    });
  }
  fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.rooms = response.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };
  createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      this.rooms.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      let tempRooms = this.rooms.filter((room) => room.id !== id);
      this.rooms = tempRooms;
    } catch (error) {
      console.log(error);
    }
  };

  updateRoom = async (updatedRoom) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      let tempRooms = this.rooms.map((room) =>
        room.id === updatedRoom.id ? response.data : room
      );
      this.rooms = tempRooms;
    } catch (error) {
      console.log(error);
    }
  };

  createMsg = async (room, msg) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${room.id}`,
        msg
      );
      room.messages.push(msg);

      // for using id this.rooms.map((e) =>
      //   e.id === room.id ? e.messages.push(response.data) : e
      // );
    } catch (error) {
      console.log(error);
    }
  };
}
let roomStore = new RoomStore();
roomStore.fetchRooms();
export default roomStore;
