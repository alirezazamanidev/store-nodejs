const socket=io('http://localhost:3000');
let namespaceSocket;
function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body.firstChild
}

function initNamespaceConnection(endpoint){
     namespaceSocket=io(`http://localhost:3000/${endpoint}`);
    namespaceSocket.on('connect',()=>{
        namespaceSocket.on('roomList',rooms=>{
            const roomsElement= document.querySelector('#contacts ul');
            roomsElement.innerHTML=''
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
                </li>`)
                roomsElement.appendChild(html)  
            }
            const roomNodes=document.querySelectorAll("ul li.contact");
            for (const room of roomNodes) {
                room.addEventListener('click',()=>{
                    const roomName=room.getAttribute('roomName');
                    getRoomInfo(roomName);
                })
            }
        })
    })
}
function getRoomInfo(roomName){
    namespaceSocket.emit('joinRoom',roomName);
    namespaceSocket.on('roomInfo',roomInfo=>{
     
        document.querySelector('#roomName h3').innerHTML=roomInfo.description;
    })
}
socket.on('connect',()=>{
    socket.on('namespacesList',(namespacesList)=>{
       const namespacesElemet=document.getElementById('namespaces');
        namespacesElemet.innerHTML="";
        initNamespaceConnection(namespacesList[0].endpoint);
       for (const namespace of namespacesList) {
        const Li=document.createElement('li');

        const p=document.createElement('p');
        p.setAttribute('class','namespaceTitle');
        p.setAttribute('endpoint',namespace.endpoint);
        p.innerText=namespace.title;
        Li.appendChild(p);
        namespacesElemet.appendChild(Li);
       }
       const namespaceNodes=document.querySelectorAll('#namespaces li p.namespaceTitle');
       for (const namespace of namespaceNodes) {
           namespace.addEventListener('click',()=>{
               const endpoint=namespace.getAttribute('endpoint');
               initNamespaceConnection(endpoint)
           })
           
       }
        
    })
  
})
