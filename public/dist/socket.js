const socket=io('http://localhost:3000');

socket.on('connect',()=>{
    socket.on('namespacesList',(namespacesList)=>{
       const namespacesElemet=document.getElementById('namespaces');
       for (const namespace of namespacesList) {
        const Li=document.createElement('li');
        const p=document.createElement('p');
        p.innerText=namespace.title;
        Li.appendChild(p);
        namespacesElemet.appendChild(Li);
       }
    })
})