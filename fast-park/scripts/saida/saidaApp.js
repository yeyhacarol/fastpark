'use strict'

import { readOpenEntry, updateEntry } from "./saida.js"

const createRow = (entry) => {
    const row = document.createElement('div')
    row.classList.add('label')
    row.innerHTML =
        ` <span data-id="${entry.veiculo.id_veiculo}" class="veiculo">${entry.veiculo.placa}</span>
          <span data-id="${entry.vaga.id_vaga}">${entry.vaga.sigla}</span>
          <span>${entry.data_entrada}</span>
          <input type="datetime-local" class="hora-saida">
          <div class="label actions">
                <img src="img/edit.png" class="edit" data-id="${entry.id}" alt="editar" title="editar vaga">
          </div>`

    return row
}

const updateTable = async () => {
    const tableContainer = document.getElementById('values')

    const vacancies = await readOpenEntry()

    const rows = vacancies.map(createRow)
    tableContainer.replaceChildren(...rows)

    document.querySelectorAll('.edit')
        .forEach(edit => edit.addEventListener('click', async (event) => {
            let dateValue = event.target.parentElement.previousElementSibling.value
            let data = event.target.parentElement.parentElement.children

            /* console.log(data[2].innerText)
            console.log(dateValue) */
            console.log(data[1].dataset.id)

            const entry = {
                "data_entrada": data[2].innerText,
                "data_saida": dateValue,
                "id_veiculo": data[1].dataset.id,
                "id_vaga": data[0].dataset.id
            }

            if (!dateValue) {
                alert('Insira uma data.')
            } else {
                await updateEntry(entry, event.target.dataset.id)

                /* alert('Alterado com sucesso.') */
            }
        }))
}

updateTable()

