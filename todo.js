const mobx = require('mobx')
const { el, mount, list, text } = require('redom')
const connect = require('./')

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

function remove (e) {
  console.log('removing', e.target._todo,
    todos.indexOf(e.target._todo))
  todos.splice(todos.indexOf(e.target._todo), 1)
}

function onchange (e) {
  e.target._todo.done = e.target.checked
}

class TodoItem {
  constructor (initData, item) {
    this.input = el('input', { type: 'checkbox', onchange })
    this.text = text(item.text)
    this.button = el('button', {onclick: remove}, 'X')
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
    console.log('ii update', i, mobx.toJS(todo))
    this.input._todo = todo
    this.button._todo = todo
    this.input.checked = todo.done
    this.text.textContent = todo.text
  }

  mounted () {
    console.log('mounted', this.input._todo)
  }

  remounted () {
    console.log('remounted', this.input._todo)
  }
}

const TodoItemMobx = connect(TodoItem)

const ti = list('ul', TodoItemMobx, 'text')

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

mobx.autorun(() => ti.update(todos))

window.ti = ti
window.mobx = mobx
window.todos = todos

