const STATE = {
  scale: 1
}

export const { getter, mutation, action, onMutationSuccess } = createStore('canvas', STATE)

export const canvasScale = getter('scale', state => state.scale)
export const setCanvasScale = mutation<number>('setScale', (state, payload) => {
  state.scale = payload
})

onMutationSuccess('*', (payload) => {
  console.log('catchall mutations', payload)
})
