const mobx = require('mobx')

function connect (klass) {
  return class extends klass {
    dispose () {}
    unmounted () {
      this.dispose()
    }

    update (item) {
      if (this.item === item) return

      this.item = item
      this.dispose()
      mobx.untracked(() => {
        this.dispose = mobx.autorun(() => super.update.apply(this, arguments))
      })
    }
  }
}

module.exports = connect
