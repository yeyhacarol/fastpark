'use strict'

const url = 'http://localhost/FastPark/BackEndFastPark/api/valor'

const readValues = async () => {
    const response = await fetch(url)

    const data = await response.json()

    return data
}

const readValue = async (id) => {
    const response = await fetch(`${url}/${id}`)

    return await response.json()
}

const updateValue = async (value, id) => {
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(value),
        'headers': {
            'content-type': 'application/json'
        }
    }

    const data = await fetch(`${url}/${id}`, options)

    if (data.status === 201) {
        alert('Registro atualizado.')

        return data
    } else {
        return;
    }
 
}


export {
    readValues,
    readValue,
    updateValue
}