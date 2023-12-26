const socket=io('http://localhost:3000');
function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body.firstChild
}
;function initNamespaceConnection(endpoint){
    const namespaceSocket=io(`http://localhost:3000/${endpoint}`);
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
        })
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
