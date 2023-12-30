const socket = io("http://localhost:3000");
let namespaceSocket;
function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}

function initNamespaceConnection(endpoint) {
  if (namespaceSocket) namespaceSocket.close();
  namespaceSocket = io(`http://localhost:3000/${endpoint}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      getRoomInfo(endpoint, rooms[0]?.name);
      const roomsElement = document.querySelector("#contacts ul");
      roomsElement.innerHTML = "";
      for (const room of rooms) {
        const html = stringToHTML(`
                <li class="contact" roomName="${room.name}">
                    <div class="wrap mt-10">
                        <img src="${room.image}" height="40"/>
                        <div class="meta">
                            <p class="name">${room.name}</p>
                            <p class="preview" >${room.description}</p>
                        </div>
                    </div>
                </li>`);
        roomsElement.appendChild(html);
      }
      const roomNodes = document.querySelectorAll("ul li.contact");
      for (const room of roomNodes) {
        room.addEventListener("click", () => {
          const roomName = room.getAttribute("roomName");
          getRoomInfo(endpoint, roomName);
        });
      }
    });
  });
}
function getRoomInfo(endpoint, roomName) {
  document.querySelector("#roomName h3").setAttribute("roomName", roomName);
  document.querySelector("#roomName h3").setAttribute("endpoint", endpoint);
  namespaceSocket.emit("joinRoom", roomName);
  namespaceSocket.off("roomInfo");
  namespaceSocket.on("roomInfo", (roomInfo) => {
    document.querySelector("#roomName h3").innerHTML = roomInfo?.description;
  });
  namespaceSocket.on("countOfOnlineUsers", (count) => {
    document.getElementById("onlineCount").innerText = count;
  });
}
function sendMessage() {
  const roomName= document.querySelector("#roomName h3").getAttribute("roomName");
  const endpoint= document.querySelector("#roomName h3").getAttribute("endpoint");
  let message = document.getElementById("messageInput").value;
  if (message.trim() === "") {
    return alert("Input massege can not Empty");
  }
  namespaceSocket.emit("newMessage", {
    message,
    roomName,
    endpoint
  });
  namespaceSocket.on("confrimMessage", (data) => {
    console.log(data);
  });
  const li = stringToHTML(
    `<li class="sent">
          <img src="https://avatars.githubusercontent.com/u/101404857?v=4"
              alt="" />
          <p>${message}</p>
      </li>`
  );
  document.querySelector(".messages ul").appendChild(li);
  document.getElementById("messageInput").value = "";
  const messagesElemet = document.querySelector("div.messages");
  messagesElemet.scrollTo(0, messagesElemet.scrollHeight);
}

socket.on("connect", () => {
  socket.on("namespacesList", (namespacesList) => {
    const namespacesElemet = document.getElementById("namespaces");
    namespacesElemet.innerHTML = "";
    initNamespaceConnection(namespacesList[0].endpoint);
    for (const namespace of namespacesList) {
      const Li = document.createElement("li");

      const p = document.createElement("p");
      p.setAttribute("class", "namespaceTitle");
      p.setAttribute("endpoint", namespace.endpoint);
      p.innerText = namespace.title;
      Li.appendChild(p);
      namespacesElemet.appendChild(Li);
    }
    const namespaceNodes = document.querySelectorAll(
      "#namespaces li p.namespaceTitle"
    );
    for (const namespace of namespaceNodes) {
      namespace.addEventListener("click", () => {
        const endpoint = namespace.getAttribute("endpoint");
        initNamespaceConnection(endpoint);
      });
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      sendMessage();
    }
  });
  document
    .querySelector("button.submit")
    .addEventListener("click", () => {
        sendMessage();
    });
});
