const mobx = require('mobx')
const { el, mount, list, text } = require('redom')

const todos = mobx.observable([
  {text: 'make a todo list', done: false},
  {text: 'make a martini', done: true},
  {text: 'have a siesta', done: true},
  {text: 'call mom', done: false},
  {text: 'watch tv', done: true}
])

function add (e) {
  e.preventDefault()
  todos.push({text: this.todo.value, done: false})
}

function remove (i) {
  todos.splice(i, 1)
}

function onchange (e) {
  todos[e.target.dataset.idx].done = e.target.checked
}

class TodoItem {
  constructor () {
    this.input = el('input', { type: 'checkbox', onchange })
    this.text = text()
    this.button = el('button', 'X')
    this.el =
      el('li',
        el('label',
          this.input,
          this.text,
          this.button
        )
      )
  }

  update (todo, i) {
    this.input.dataset.idx = i
    this.input.checked = todo.done
    this.text.textContent = todo.text
    this.button.onclick = () => remove(i)
  }
}

const ti = list('ul', TodoItem)

const todoApp =
  el('div',
    el('h3', 'TODO'),
    ti,
    el('form', {onsubmit: add},
      el('input', {name: 'todo'}),
      el('button', 'Add')
    )
  )

mount(document.body, todoApp)

ti.update(todos)

window.ti = ti
window.mobx = mobx
window.todos = todos
