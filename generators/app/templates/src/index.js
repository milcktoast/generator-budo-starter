import { createTaskManager } from './utils/task'
import { createLoop } from './utils/loop'
import { debounce } from './utils/function'

const container = createContainer()
const tasks = createTaskManager(
  'inject', 'syncState',
  'update', 'render', 'resize')
const loop = createAnimationLoop()

function createContainer () {
  const element = document.createElement('div')
  Object.assign(element.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  })
  return element
}

function createAnimationLoop () {
  const loop = createLoop(null, update, render)
  let animationFrame = 0
  function update () {
    tasks.run('update', animationFrame++)
  }
  function render () {
    tasks.run('render')
  }
  return loop
}

// Events

window.addEventListener('resize', debounce(50, (event) => {
  tasks.run('resize', event)
}), false)

// Start

function inject () {
  document.body.appendChild(container)
  tasks.flush('inject', container).then(() => {
    tasks.run('resize')
  })
}

function start () {
  tasks.run('syncState')
  loop.start()
}

inject()
start()

// #ifdef DEVELOPMENT
// require('./index-debug').createDebug({
//   loop,
//   state: index.state,
//   updateState: index.updateState.bind(index)
// })
// #endif
