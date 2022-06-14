'use strict'
document.getElementById('submit').addEventListener('submit', (event) => {
    event.preventDefault()
})

const createEntry = async (customer, vehicule, entry) => {
    const urls = [
        {
            'url': 'http://localhost/FastPark/BackEndFastPark/api/clientes',
            'options': {
                'method': 'POST',
                'body': JSON.stringify(customer),
                'headers': {
                    'content-type': 'application/json'
                }
            }
        },
        {
            'url': 'http://localhost/FastPark/BackEndFastPark/api/veiculos',
            'options': {
                'method': 'POST',
                'body': JSON.stringify(vehicule),
                'headers': {
                    'content-type': 'application/json'
                }
            }
        }

    ]

    let promises = urls.map(url => fetch(url.url, url.options)
        .then(message => message.json()))

    await Promise.all(promises).then(erro => {
        console.log(erro)
        if (erro[0]['Erro'] || erro[1]['Erro']) {
            alert('Campos obrigatórios não preenchidos.')

        } else {
            alert('Enviado.')
        }
    })

    const idVeiculo = await getVeiculo(vehicule.placa)
    entry.id_veiculo = idVeiculo.id
    createControl(entry)
}

const createControl = async (entry) => {
    const url = 'http://localhost/FastPark/BackEndFastPark/api/controle'
    const options = {
        'method': 'POST',
        'body': JSON.stringify(entry),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(url, options)
}

const getVeiculo = async (placa) => {
    const url = `http://localhost/FastPark/BackEndFastPark/api/veiculos/placa/${placa}`

    const response = await fetch(url)

    const data = response.json()

    return data
}

export { createEntry }