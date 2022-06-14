'use strict'

import { createVacancy, filterVacancy, readVacancies, readVacancy, updateVacancy } from "./vagas.js"

const createRow = (vacancy) => {
    const row = document.createElement('div')
    row.classList.add('label')
    row.innerHTML =
        ` <span>${vacancy.localizacao.piso}</span>
          <span>${vacancy.localizacao.corredor}</span>
          <span class="sigla">${vacancy.localizacao.sigla}</span>
          <span>
                <img src="${vacancy.preferencial == '1' ? './img/preferencial.png' : './img/livre.png'}">
                <img src="${vacancy.tbl_tipo.tipo == 'Carro' ? './img/free-car.png' : './img/motorcycle.png'}">
          </span>
          <div class="label actions">
                <img src="img/edit.png" id="edit-${vacancy.id}" alt="editar" title="editar vaga">
          </div>`

    return row
}

const updateTable = async () => {
    const tableContainer = document.getElementById('localization')

    const vacancies = await readVacancies()

    const rows = vacancies.map(createRow)
    tableContainer.replaceChildren(...rows)

    document.getElementById('localization').addEventListener('click', editVacancy)

}

const saveVacancy = async () => {

    let preferencial = document.getElementById('preferencial')

    if (preferencial.checked) {
        preferencial = '1'
    } else {
        preferencial = '0'
    }

    const vacancy = {
        "id": "",
        "ocupacao": "0",
        "preferencial": preferencial,
        "id_tipo": document.getElementById('type').value,
        "id_estacionamento": "1",
        "piso": document.getElementById('floor').value,
        "corredor": document.getElementById('hall').value,
        "sigla": document.getElementById('initials').value.toUpperCase()
    }

    const form = document.getElementById('parking-vacancy-form')

    if (form.dataset.id) {
        await updateVacancy(vacancy, form.dataset.id)

        alert('Alterações feitas.')

        location.reload()

    } else {
        const filtered = await filterVacancy(vacancy.sigla)

        if (filtered.length > 0) {
            alert('Vaga já existe.')
        } else {
            await createVacancy(vacancy)
        }
    }

    
    updateTable()

}

const editVacancy = async (event) => {
    if (event.target.tagName === 'IMG') {

        const [action, id] = event.target.id.split('-')

        if (action == 'edit') {
            let vacancy = await readVacancy(id)

            window.scrollTo({ top: 150, behavior: 'smooth' })

            let preferencial = document.getElementById('preferencial')

            if (vacancy.preferencial == 1) {
                preferencial.checked = true
            } else {
                preferencial.checked = false
            }

            document.getElementById('floor').value = vacancy.localizacao.piso
            document.getElementById('hall').value = vacancy.localizacao.corredor
            vacancy.preferencial 
            document.getElementById('initials').value = vacancy.localizacao.sigla
            document.getElementById('type').value = vacancy.tbl_tipo.id_tipo

            document.getElementById('parking-vacancy-form').dataset.id = vacancy.id
        }
    }
}

updateTable()

document.getElementById('save-vacancy').addEventListener('click', saveVacancy)
document.getElementById('parking-vacancy-form').addEventListener('click', editVacancy)