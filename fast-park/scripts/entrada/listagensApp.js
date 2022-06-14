'use strict'

import { readShortVacancies, readVehiculeColors } from "./listagens.js"

const createColorOption = (color) => {
    const option = document.createElement('option')
    option.innerHTML =
        `<option value="${color.id}">${color.cor}</option>`

    return option
}

const createPlaqueOption = (plaque) => {
    const option = document.createElement('option')
    option.innerHTML = 
        `<option value="${plaque.id}">${plaque.localizacao.sigla}${plaque.preferencial ? plaque.preferencial == '1' ? '/Preferencial' : '' : ''}</option>`

    return option
}

const loadColorOption = async () => {
    const colorSelect = document.getElementById('cores')

    const colors = await readVehiculeColors()

    const options = colors.map(createColorOption)
    colorSelect.replaceChildren(...options)
}

const loadPlaqueOption = async () => {
    const plaqueSelect = document.getElementById('vagas-livres')

    const plates = await readShortVacancies()

    const options = plates.map(createPlaqueOption)
    plaqueSelect.replaceChildren(...options)
}

loadColorOption()
loadPlaqueOption()