'use strict'

const modal = document.querySelector('.modal')

const openModal = () => {
    modal.classList.add('active')
    document.getElementById('html').style.overflowY = "hidden"
}

const closeModal = () => {
    modal.classList.remove('active')
    document.getElementById('html').style.overflowY = "auto"
}

export { 
    openModal,
    closeModal
}