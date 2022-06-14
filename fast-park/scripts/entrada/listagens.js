'use strict'

const readVehiculeColors = async () => {
    const url = 'http://localhost/FastPark/BackEndFastPark/api/cor'

    const response = await fetch(url)

    const data = response.json()

    return data
}

const readShortVacancies = async () => {
    const url = 'http://localhost/FastPark/BackEndFastPark/api/vagas/ocupacao/0'

    const response = await fetch(url)

    const data = response.json()

    return data
}

export { readVehiculeColors,
         readShortVacancies }