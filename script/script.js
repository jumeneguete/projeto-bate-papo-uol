function entrarNaSala(){
    const nome = document.querySelector(".participant-name").value;
    const nomeObj = {name:nome}

    const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeObj);
    promessa.then(entradaDoParticipante);
    promessa.catch(insiraOutroNome);
}

function entradaDoParticipante(resposta){
    //console.log(resposta)
    const entrar = document.querySelector(".name-request");
    entrar.classList.add("hide");

    const salaDoChat = document.querySelector(".index");
    salaDoChat.classList.remove("hide");

    carregarMensagens();
    setInterval(carregarMensagens, 3000);
    atualizar();

}

function insiraOutroNome(resposta){
    console.log("oi");
    console.log(resposta);
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
        ulMensagens.innerHTML +=`
            <li class="message"> 
            <span class="gray">(${resposta.data[i].time})</span> 
            <span class="bold">${resposta.data[i].from}</span> 
            para 
            <span class="bold">${resposta.data[i].to}: </span> 
            ${resposta.data[i].text}
            </li>
        `;
    }
    scrollAutomatico();
}

function scrollAutomatico(){
    const ultimaMsg = document.querySelector(".all-messages .message:last-child");
    ultimaMsg.scrollIntoView();
    console.log(ultimaMsg)
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
        
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", novaMsg);
    carregarMensagens ();

    document.querySelector(".new-messages").value = null
}

