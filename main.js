

/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.





La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/


const filters = {
  ALL: 'all-tab',
  ACTIVES: 'active-tab',
  COMPLETES: 'completed-tab',
}
const state = {
  tasks: [],
  itemsXPage: 10,
  currentPage: 1,
  currentFilter: filters.ALL
}
const myTab = document.querySelectorAll('#myTab .nav-link')
const listTask = document.querySelector('#listTask')
const paginationBefore = document.querySelector('.pagination .before')
const paginationNext = document.querySelector('.pagination .next')
myTab.forEach(nav => nav.addEventListener('click', onClickTabas))

console.log(paginationNext)
paginationNext.addEventListener('click', onClickChangePage(1))
paginationBefore.addEventListener('click', onClickChangePage(-1))

function onClickTabas(e) {
  state.currentFilter = e.target.id
  drawList()

}

function onClickChangePage(value) {
  return e => {
    e.preventDefault()
    state.currentPage = state.currentPage + value
    drawList()
  }
}
// Función para añadir una nueva tarea
function addTask() {

}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask() {

}

// Función para borrar una tarea
function deleteTask(e) {
  state.tasks = state.tasks.filter(item => +item.id !== +e.currentTarget.value)
  drawList()

}

// Funcion para borrar todas las tareas
function deleteAll() {
  state.tasks = []
  drawList()
}

// Función para filtrar tareas completadas
function filterCompleted() {

}

// Función para filtrar tareas incompletas
function filterUncompleted() {

}


{/* <li class="list-group-item">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        Default checkbox
      </label>
  </div>
</li> */}
function setTasks(data) {
  state.tasks = data
  drawList()
}
async function getApi() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  // then(res => res.json()).then(data=> setTasks(data))
  setTasks(await res.json())
}

function onChangeCompleteToggle(e) {

  state.tasks.map(item => {
    if (+item.id === +e.target.value)
      item.completed = e.target.checked
    return item
  })
  drawList()
}

function createItemList(tareaItem) {
  let li = document.createElement('li')

  let div = document.createElement('div')
  let button = document.createElement('button')
  let input = document.createElement('input')
  let label = document.createElement('label')

  li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
  div.classList.add('form-check')
  button.addEventListener('click', deleteTask)
  button.classList.add('eliminar')
  button.value = tareaItem.id
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>`

  input.classList.add('form-check-input')
  input.type = 'checkbox'
  input.checked = tareaItem.completed
  input.value = tareaItem.id
  input.addEventListener('change', onChangeCompleteToggle)
  let nameId = `item-${tareaItem.id}`
  input.id = nameId
  label.classList.add('form-check-label')
  label.setAttribute('for', nameId)
  label.textContent = tareaItem.title
  // input.appendChild(label)
  div.appendChild(label)
  div.appendChild(input)
  li.appendChild(div)
  li.appendChild(button)
  return li
}

function drawList() {

  const startIndex = (state.currentPage - 1) * state.itemsXPage;
  const endIndex = startIndex + state.itemsXPage;

  listTask.innerHTML = ''
  state.tasks.filter(item => {
    return state.currentFilter === filters.ALL ? true : (state.currentFilter === filters.ACTIVES ? !item.completed : item.completed)
  }).slice(startIndex, endIndex).forEach(item => {
    listTask.append(createItemList(item))
  })
  // listTask.childNodes = g
}
getApi()
