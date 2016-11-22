import {
  annotateState,
  createStateControls
} from './utils/oui'

export function createDebug ({
  loop,
  state,
  updateState
}) {
  if (window.innerWidth < 768) return
  const oui = createStateControls({label: 'Settings'})
  annotateState(state)
  oui(state, updateState)
  document.addEventListener('keyup', (event) => {
    switch (event.which) {
      case 32:
        loop.toggle()
        event.preventDefault()
        break
    }
  })
  return oui
}
