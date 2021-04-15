function entrarNaSala(){
    const nome = document.querySelector(".participant-name").value;
    const nomeObj = {name:nome}

    const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeObj);
    promessa.then(entradaParticipante);
    promessa.catch(insiraOutroNome);
}

function entradaParticipante(resposta){
    console.log(resposta)
    const entrar = document.querySelector(".name-request");
    entrar.classList.add("hide");

    const salaDoChat = document.querySelector(".index");
    salaDoChat.classList.remove("hide");

}

function insiraOutroNome(resposta){
    const statusErro = resposta.data.status;
    //console.log(resposta.data.status)
    if (statusErro === 400){
        const msgDeErro = document.querySelector(".name-request span");
        msgDeErro.classList.remove("hide");
    }
}