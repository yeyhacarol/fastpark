'use strict'

import { createEntry } from "./cliente.js"
import { updateOccupation } from "../vagas/vagas.js"

const saveCustomer = async () => {
    let selectCor = document.getElementById('cores');
    let idCor = selectCor.options[selectCor.selectedIndex].innerHTML.split('"')[1]
    let selectVaga = document.getElementById('vagas-livres')
    let idVaga = selectVaga.options[selectVaga.selectedIndex].innerHTML.split('"')[1]

    const customer = {
        "nome": document.getElementById('nome').value,
        "telefone": document.getElementById('telefone').value ? document.getElementById('telefone').value : ''
    }
    const vehicule = {
        "placa": document.getElementById('placa').value,
        "id_cor": idCor,
        "id_categoria": document.getElementById('categoria').value,
        "id_modelo": "1"
    }
    const vacancy = {
        "data_entrada": document.getElementById('meeting-time').value,
        "data_saida": "0000-00-00 00:00:00",
        "id_vaga": idVaga
    }
    const occupation = {
        "id": idVaga,
        "ocupacao": "1"
    }

    const form = document.getElementById('entry-form')

    if (form.reportValidity() == false) {
        alert('Campos obrigatórios não preenchidos.')
    } else {
        await createEntry(customer, vehicule, vacancy)
        await updateOccupation(occupation, idVaga)
        location.reload()
    }

}

const maskTel = ({ target }) => {
    let number = target.value

    number = number.replace(/[^0-9]/g, '')
    number = number.replace(/(.{2})(.{5})(.{4})/, '($1) $2-$3')
    number = number.replace(/(.{15})(.*)/, '$1')

    target.value = number
}

document.getElementById('submit').addEventListener('click', saveCustomer)
document.getElementById('telefone').addEventListener('keyup', maskTel)