const mobx = require('mobx')
const { el, mount, setChildren } = require('redom')

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

const todoItem = (todo, i) =>
  el('li', {id: i},
    el('label',
      el('input', {
        type: 'checkbox',
        'data-idx': i,
        checked: todo.done,
        onchange
      }),
      todo.text,
      el('button', {onclick: () => remove(i)}, 'X')
    )
  )

class TodoApp {
  constructor () {
    this.el = el('div')
  }

  update (todos) {
    setChildren(this.el, [
      el('h3', 'TODO'),
      el('ul', ...todos.map(todoItem)),
      el('form', {onsubmit: add},
        el('input', {name: 'todo'}),
        el('button', 'Add')
      )
    ])
  }
}

const todoApp = new TodoApp
mount(document.body, todoApp)

todoApp.update(todos)

window.todoApp = todoApp
window.mobx = mobx
window.todos = todos
