'use strict'

import { readValue, readValues, updateValue } from "./valores.js"
import { closeModal, openModal } from "../modal.js"

const createRow = (value) => {
    const row = document.createElement('div')
    row.classList.add('label')
    row.innerHTML =
        ` <span id="tipo-vaga">${value.tipo}</span>
          <span onclick="edit-value(this)">${'R$ ' + value.hora_inicial}</span>
          <span>${'+ ' + 'R$ ' + value.demais_horas}</span>
          <div class="label actions" id="editar">
                <img src="img/edit.png" id="edit-${value.id_tipo}" alt="editar" title="editar valor">
          </div>`

    return row
}

const saveValue = async () => {
    let vehiculeType = document.getElementById('tipo').value

    if (vehiculeType === 'Carro') {
        vehiculeType = '1'
    } else if (vehiculeType === 'Moto') {
        vehiculeType = '2'
    }

    const value = {
        "id": vehiculeType,
        "id_tipo": vehiculeType,
        "tipo": document.getElementById('tipo').value,
        "id_valor": vehiculeType,
        "hora_inicial": document.getElementById('hora-inicial').value,
        "demais_horas": document.getElementById('demais-horas').value
    }

    await updateValue(value, value['id'])

    if (value[0]) {
        alert('Registro atualizado.')
    }

    closeModal()

    updateTable()
}

const editValue = async (event) => {
    if (event.target.tagName === 'IMG') {

        const [action, id] = event.target.id.split('-')

        if (action == 'edit') {
            
            openModal()

            const value = await readValue(id)

            document.getElementById('tipo').value = value.tipo
            document.getElementById('hora-inicial').value = value.hora_inicial
            document.getElementById('demais-horas').value = value.demais_horas
            
        }

    }
}

const updateTable = async () => {
    const tableContainer = document.getElementById('values')

    const values = await readValues()

    const rows = values.map(createRow)
    tableContainer.replaceChildren(...rows)

    document.getElementById('editar').addEventListener('click', editValue)
}

updateTable()

document.getElementById('values').addEventListener('click', editValue)
document.getElementById('save-value').addEventListener('click', saveValue)
document.getElementById('out').addEventListener('click', closeModal)