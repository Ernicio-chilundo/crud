'use strict'

const openModal = () => document.getElementById("modal")
    .classList.add(active)

const closeModal = () => {
    clearFields()
    document.getElementById("modal").classList.remove("active")
}


const getLocalStorege = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("dbclient", JSON.stringify(dbClient))

// CRUD CREATE READ UPDATE DELETE
const apagar = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorege()

const createClient = (client) => {
    const dbClient = getLocalStorege()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// Interacao com layout 

const clearFields = () => {
    const fields = document.querySelectorAll(".modal_field")
    fields.forEach(field => field.value = '')
}
const saveClient = (evento) => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value
        }
        createClient(client)
        closeModal()
    }

}

const createRow = (client) => {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
                     <td>${client.nome}</td>
                    <td>${client.email}</td>
                    <td>${client.celular}</td>
                    <td>${client.cidade}</td>
                    <td>
                        <button type="button" class="button green">editar</button>
                        <button type="button" class="button red">excluir</button>
                    </td>

    `
}
const updateTable = () => {
    const dbClient = readClient()
    dbClient.forEach(createRow)
}
updateTable()

// eventos
document.getElementById("cadastrarCliente").addEventListener("click", openModal)

document.getElementById("modalClose").addEventListener("click", closeModal)

document.getElementById("salvar").addEventListener("click", salvarClient)