// ============================================================
// == Buscar CEP ==============================================
function buscarCEP() {
    //console.log("teste do evento blur")
    //armazenar o cep digitado na variável
    let cep = document.getElementById('inputCEPClient').value
    //console.log(cep) //teste de recebimento do CEP
    //"consumir" a API do ViaCEP
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    //acessando o web service par abter os dados
    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            //extração dos dados
            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighborhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value = dados.localidade
            document.getElementById('inputUFClient').value = dados.uf
        })
        .catch(error => console.log(error))
}
// == Fim - buscar CEP ========================================
// ============================================================

// ============================================================
// == Validar CPF =============================================
function validarCPF() {
   
}
// == Fim - validar CPF =======================================
// ============================================================


// Vetor global que será usado na manipulação dos dados
let arrayClient = []


// capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificado como 'searchClient'
const foco = document.getElementById('searchClient')

// Iniciar a janela de clientes alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded', () => {
    // Desativar os botões
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Foco na busca do cliente
    foco.focus()
})

//captura dos dados dos inputs do formulário (Passo 1: Fluxo)
let frmClient = document.getElementById('frmClient')
let nameClient = document.getElementById('inputNameClient')
let cpfClient = document.getElementById('inputCPFClient')
let emailClient = document.getElementById('inputEmailClient')
let phoneClient = document.getElementById('inputPhoneClient')
let cepClient = document.getElementById('inputCEPClient')
let addressClient = document.getElementById('inputAddressClient')
let numberClient = document.getElementById('inputNumberClient')
let complementClient = document.getElementById('inputComplementClient')
let neighborhoodClient = document.getElementById('inputNeighborhoodClient')
let cityClient = document.getElementById('inputCityClient')
let ufClient = document.getElementById('inputUFClient')

// ============================================================
// == CRUD Create/Update ======================================

//Evento associado ao botão submit (uso das validações do html)
frmClient.addEventListener('submit', async (event) => {
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
    console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, complementClient.value, neighborhoodClient.value, cityClient.value, ufClient.value)
    //Criar um objeto para armazenar os dados do cliente antes de enviar ao main
    const client = {
        nameCli: nameClient.value,
        cpfCli: cpfClient.value,
        emailCli: emailClient.value,
        phoneCli: phoneClient.value,
        cepCli: cepClient.value,
        addressCli: addressClient.value,
        numberCli: numberClient.value,
        complementCli: complementClient.value,
        neighborhoodCli: neighborhoodClient.value,
        cityCli: cityClient.value,
        ufCli: ufClient.value
    }
    // Enviar ao main o objeto client - (Passo 2: fluxo)
    // uso do preload.js
    api.newClient(client)
})

// == Fim CRUD Create/Update ==================================
// ============================================================



// ============================================================
// == CRUD Read ===============================================

function buscarCliente() {
    // Passo 1: captar o nome do cliente
    let name = document.getElementById('searchClient').value
    console.log(name) // teste do passo 1
    api.searchName(name)
    // recebimento dos dados do cliente
    api.renderClient((event, dataClient) =>{
        console.log(dataClient)
        // criar um vetor global para manipulação dos dados
        const dadosCliente = JSON.parse(dataClient)
        // atribuir ao vetor os dados do cliente
        arrayClient = dadosCliente
        // extrair os dados no vetor
        arrayClient.forEach((c) => {
            nameClient.value = c.nomeCliente,
            cpfClient.value = c.cpfCliente,
            emailClient.value = c.emailCliente,
            phoneClient.value = c.foneCliente,
            cepClient.value = c.cepCliente,
            addressClient.value = c.logradouroCliente,
            numberClient.value = c.numeroCliente,
            complementClient.value = c.complementoCliente,
            neighborhoodClient.value = c.bairroCliente,
            cityClient.value = c.cidadeCliente,
            ufClient.value = c.ufCliente

        })
            
    })
}



// ============================================================
// == Fim CRUD Read ===========================================


// ============================================================
// == Reset form ==============================================
function resetForm() {
    // Limpar os campos e resetar o formulário com as configurações pré definidas
    location.reload()
}

// Recebimento do pedido do main para resetar o form
api.resetForm((args) => {
    resetForm()
})

// == Fim - reset form ========================================
// ============================================================