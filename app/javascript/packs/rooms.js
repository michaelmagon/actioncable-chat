import { throttle } from 'throttle-debounce'
import { GiphyFetch } from "@giphy/js-fetch-api";
import { renderGrid } from "@giphy/js-components";


document.addEventListener("turbolinks:load", function() {
  const gf = new GiphyFetch('lL9joAKAKnlOf72kvxO7MLD7RbfBTOQn');
  const messageContainer = document.querySelector("#messages");

  const scrollToBottom = () => {
    // setTimeout(() => {
    //   const chatRoom = document.getElementById("chat-room");
    //   chatRoom.scrollTop = chatRoom.scrollHeight;
    // }, 2000);
  }

  scrollToBottom(); 

  const fetchGifs = (offset) => {
    return gf.trending({ offset, limit: 25 })
  }

  const makeGrid = (targetEl) => {
    const render = () => {
        // here is the @giphy/js-components import
        return renderGrid(
          {
            width: document.getElementById("chat-room").offsetWidth,
            fetchGifs,
            columns: document.getElementById("chat-room").offsetWidth < 500 ? 2 : 3,
            gutter: 6,
            noLink: true,
            hideAttribution: true,
            onGifClick: (gif) => {
              const token = document.querySelector('meta[name="csrf-token"]').content;
              const roomId = document.getElementById("room").getAttribute('data-room-id');
              const userId = document.getElementById("user-display").getAttribute('data-id');
              const message = {
                user_id: userId,
                room_id: roomId,
                message_type: 'gif',
                content: gif.images.downsized.url
              }
              fetch('/messages', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'include',
                headers: {
                  "X-CSRF-Token": token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
              });

              const gifsContainer = document.getElementById("gifs-container");
              gifsContainer.classList.add("hidden");
            }
          },
          targetEl
        )
    }
    const resizeRender = throttle(500, render)
    window.addEventListener('resize', resizeRender, false)
    const remove = render()
    return {
        remove: () => {
            remove()
            window.removeEventListener('resize', resizeRender, false)
        },
    }
  }

  const grid = makeGrid(document.getElementById('gif-container'));

  //detect if new element is added to the message container
  messageContainer.addEventListener('DOMNodeInserted', function(e) {
    if (e.target.classList.contains('message')) {
      scrollToBottom();
    }
  } , false);

});