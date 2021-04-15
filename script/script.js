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
}

function insiraOutroNome(resposta){
    const statusErro = resposta.data.status;
    //console.log(resposta.data.status)
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

    console.log(resposta.data);
    console.log(resposta.data[9].from);


    for(let i=0; i < resposta.data.length; i++){
        ulMensagens.innerHTML +=`
            <li class="message"> 
            ${resposta.data[i].time} ${resposta.data[i].from} para ${resposta.data[i].to} ${resposta.data[i].text}
            </li>
        `;
    }

    console.log(ulMensagens)

}