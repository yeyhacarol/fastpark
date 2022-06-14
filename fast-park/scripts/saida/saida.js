'use strict'

const readOpenEntry = async () => {
    const url = 'http://localhost/FastPark/BackEndFastPark/api/controle/abertos'
    
    const response = await fetch(url)

    const data = await response.json()

    return data
}

const updateEntry = async (entry, id) => {
    const url = 'http://localhost/FastPark/BackEndFastPark/api/controle'

    const options = {
        'method': 'PUT',
        'body': JSON.stringify(entry),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(`${url}/${id}`, options)
    
}

export { readOpenEntry, updateEntry }