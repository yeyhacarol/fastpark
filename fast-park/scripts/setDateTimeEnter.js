const today = new Date()
const hour = today.getHours
const day = today.getDay
const minute = today.getMinutes
const year = today.getFullYear
const month = today.getMonth

const div = document.createElement('div')
div.innerHTML = `
<span class="info">Data/hora entrada:</span>
<input type="datetime-local" class="inputs " id="meeting-time"
name="meeting-time" value="${year.toString}-${month.toString}-${day.toString}T${hour.toString}:${minute.toString}"
min="${year.toString}-${month.toString}-${day.toString}T00:00" max="${year.toString}-${month.toString}-${day.toString}T23:00" required>`

const container = document.getElementById('hour')
container.replaceChildren(div)

function getDateNow() {
    let today = new Date();
    let date = today.getFullYear() + '-' +
        (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
        today.getDate().toString().padStart(2, '0');
    let time = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0');
    return date + 'T' + time;
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('meeting-time').value = getDateNow();
});
