import consumer from "./consumer"
import { beep } from "../utilities/utilities.js";

document.addEventListener("turbolinks:load", function() {
  const room = document.getElementById('room');
  if (room) {
    const roomId = Number(room.getAttribute('data-room-id'));
    const userId = document.getElementById("user-display").getAttribute('data-id');
    consumer.subscriptions.subscriptions = [];
    consumer.subscriptions.create({channel: "RoomChannel", room_id: roomId }, {
      connected() {
        // Called when the subscription is ready for use on the server
        console.log('connected to '+ roomId);
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        if (data.type == 'message') {
          const messageContainer = document.getElementById("messages");
          var template = document.createElement('template');
          template.innerHTML = data.response.trim();
          template.content.firstChild.classList.remove('mine','theirs');
          if ( userId == data.source ) {
            template.content.firstChild.classList.add('mine');
          } else {
            template.content.firstChild.classList.add('theirs');
            beep();
          }
          messageContainer.appendChild(template.content.firstChild);

          const chatRoom = document.getElementById("chat-room");
          chatRoom.scrollTop = chatRoom.scrollHeight;
        }
        if (data.type == 'user') {
          const userContainer = document.getElementById("available-users");
          userContainer.innerHTML = userContainer.innerHTML + data.response;
        }
      }
    });
  }
});


// const roomId = document.getElementById("room").getAttribute('data-room-id');
// const userId = document.getElementById("user-display").getAttribute('data-id');
// const message = {
//   type: 'message',
//   source: userId,
//   room_id: roomId,
//   message: gif.url
// }
// fetch('/messages', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(message)
// })