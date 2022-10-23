import { Controller } from 'stimulus'; 
import { throttle } from 'throttle-debounce'
import { GiphyFetch } from "@giphy/js-fetch-api";
import { renderGrid } from "@giphy/js-components";

export default class extends Controller {
  static targets = ["gifContainer"]
  connect() {
    scrollToBottom();
    const gf = new GiphyFetch('lL9joAKAKnlOf72kvxO7MLD7RbfBTOQn');
    const messageContainer = document.querySelector("#messages");
  

  toggleGifs() {
    this.sourceTarget
  }
}

const scrollToBottom = () => {
  setTimeout(() => {
    const chatRoom = document.getElementById("chat-room");
    chatRoom.scrollTop = chatRoom.scrollHeight;
  }, 2000);
}