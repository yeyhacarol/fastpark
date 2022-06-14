'use strict'

const url = 'http://localhost/FastPark/BackEndFastPark/api/vagas'
/* document.getElementById('parking-vacancy-form').addEventListener('submit', (event) => {
    event.preventDefault()
}) */

const createVacancy = (vacancy) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(vacancy),
        'headers': {
            'content-type': 'application/json'
        }
    }

    const response = fetch(url, options).then(resp => {
        if (resp.status == 201) {
            alert('Registro inserido.')
            location.reload()
        } else {
            alert('Não foi possível inserir.')
        }
    })

    return response
}

const readVacancies = async () => {
    const response = await fetch(url)

    const data = await response.json()

    return data
}

const readVacancy = async (id) => {
    const response = await fetch(`${url}/${id}`)

    const data = await response.json()

    return data
}

const updateVacancy = async (vacancy, id) => {
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(vacancy),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(`${url}/${id}`, options)
}

const updateOccupation = async (ocupation, id) => {
    const urlOcupar = 'http://localhost/FastPark/BackEndFastPark/api/vagas/ocupar'

    const options = {
        'method': 'PUT',
        'body': JSON.stringify(ocupation),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(`${urlOcupar}/${id}`, options)
}

const filterVacancy = async (sigla) => {
    const response = await fetch(url)

    const data = await response.json()

    let filtered = data.filter((item) => {
        if (sigla == item.localizacao.sigla)
            return true;
    })

    return filtered
}


export { createVacancy, 
         readVacancies, 
         readVacancy,
         updateVacancy,
         updateOccupation,
         filterVacancy}