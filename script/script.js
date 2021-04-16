function entrarNaSala(){
    const nome = document.querySelector(".participant-name").value;
    const nomeObj = {name:nome}

    const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeObj);
    promessa.then(entradaDoParticipante);
    promessa.catch(insiraOutroNome);
}

function entradaDoParticipante(){
    
    const entrar = document.querySelector(".name-request");
    entrar.classList.add("hide");

    const salaDoChat = document.querySelector(".index");
    salaDoChat.classList.remove("hide");

    carregarMensagens();
    setInterval(carregarMensagens, 3000);
    atualizar();

}

function insiraOutroNome(resposta){
    const statusErro = resposta.response.status;
    
    if (statusErro === 400){
        const msgDeErro = document.querySelector(".name-request span");
        msgDeErro.classList.remove("hide");
    }
}

function carregarMensagens (){
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promessa.then(renderizarMensagens);
}

function renderizarMensagens (resposta){
    let ulMensagens = document.querySelector(".all-messages");
    ulMensagens.innerHTML = "";

    for(let i=0; i < resposta.data.length; i++){
    
        if (resposta.data[i].type === "status"){
            ulMensagens.innerHTML +=`
            <li class="message msgEntrouNaSala"> 
            <span class="gray">(${resposta.data[i].time})</span> 
            <span class="bold">${resposta.data[i].from}</span> 
            para 
            <span class="bold">${resposta.data[i].to}: </span> 
            ${resposta.data[i].text}
            </li>
        `;
            
        } else if (resposta.data[i].type === "private_message"){
                const nome = document.querySelector(".participant-name").value;
                if(resposta.data[i].to === nome || resposta.data[i].to === "Todos"){
                    ulMensagens.innerHTML +=`
                    <li class="message msgReservada"> 
                    <span class="gray">(${resposta.data[i].time})</span> 
                    <span class="bold">${resposta.data[i].from}</span> 
                    para 
                    <span class="bold">${resposta.data[i].to}: </span> 
                    ${resposta.data[i].text}
                    </li>
                `;}
        } else {

            ulMensagens.innerHTML +=`
            <li class="message msgPublica"> 
            <span class="gray">(${resposta.data[i].time})</span> 
            <span class="bold">${resposta.data[i].from}</span> 
            para 
            <span class="bold">${resposta.data[i].to}: </span> 
            ${resposta.data[i].text}
            </li>
        `;
        }
    }
    scrollAutomatico();
}

function scrollAutomatico(){
    const ultimaMsg = document.querySelector(".all-messages .message:last-child");
    ultimaMsg.scrollIntoView();
}

function manterConexao(){
    const nome = document.querySelector(".participant-name").value;
    const nomeObj = {name:nome}
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", nomeObj);
}

function atualizar(){
    setInterval(manterConexao, 5000);
}

function enviarMensagem(){
    let texto = document.querySelector(".new-messages").value;
    const nome = document.querySelector(".participant-name").value;
    const novaMsg = {from: nome, to:"Todos", text: texto, type:"message"}
        
    const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", novaMsg);
    promessa.catch(erroLogarNovamente);

    carregarMensagens ();

    document.querySelector(".new-messages").value = null; //apaga o campo input de mensagem depois de enviar a msg
}

function erroLogarNovamente(){
    window.location.reload();
    alert("Sua sessão expirou!! :(")
}

//SIDE BAR DO BONUS ... tentando...

function abrirSideBar(){
    const fundoPreto = document.querySelector(".container");
    const sideBar = document.querySelector(".options-bar");
    const iconePublicoCheck = document.querySelector(".public-msg");

    fundoPreto.classList.remove("hide");
    sideBar.classList.remove("hide");
    iconePublicoCheck.classList.remove("hide");

    mostrarUsuarios();
    setInterval(mostrarUsuarios, 10000);
}

function mostrarUsuarios(){
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");
    promessa.then(exibirListadeUsuarios);
}

function exibirListadeUsuarios(resposta){

    let listaDeContatos = document.querySelector(".all-contacts");
    listaDeContatos.innerHTML = `<div class="contact">
                                    <div class="name">
                                        <ion-icon name="people"></ion-icon>
                                        <span>Público</span>
                                    </div>  
                                    <ion-icon class="para-todos hide" name="checkmark"></ion-icon>
                                </div>`;

    for(let i=0; i < resposta.data.length; i++){
       
        listaDeContatos.innerHTML += `<div class="contact" onclick="contatoMsgPrivada(this)">
                                <div class="name">
                                    <ion-icon name="people"></ion-icon>
                                    <span>${resposta.data[i].name}</span>
                                </div>  
                                <ion-icon class="hide" name="checkmark"></ion-icon>
                            </div>
    `}
}

function voltarParaChat() {
    const fundoPreto = document.querySelector(".container");
    const sideBar = document.querySelector(".options-bar");

    fundoPreto.classList.add("hide");
    sideBar.classList.add("hide");
}

function atualizarContatosSideBar(){
    const nome = document.querySelector(".participant-name").value;
    const nomeObj = {name:nome}
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", nomeObj);
}

/*function contatoMsgPrivada(elemento){
    const selecionado = elemento.querySelector(".contact > ion-icon");
    selecionado.classList.remove("hide");
}*/