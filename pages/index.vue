<script setup>
import { useSpring, useMotionProperties } from '@vueuse/motion'
import { useGesture } from '@vueuse/gesture'
import { ref } from '#imports'
import { setCanvasScale, canvasScale } from '~/stores/canvas'

const canvas = ref()
const box = ref()

const { motionProperties: canvasProperties } = useMotionProperties(canvas, {
  scale: 1,
  x: 0,
  y: 0,
  'transform-origin': '50% 50%'
})

const { motionProperties: boxProperties } = useMotionProperties(box, {
  x: 0,
  y: 0
})

const { set: setCanvas } = useSpring(canvasProperties, {
  stiffness: 250,
  damping: 70
})
const { set: setBox } = useSpring(boxProperties, {
  stiffness: 200,
  damping: 50
})

watch(canvasScale, (scale) => {
  setCanvas({
    scale
  })
})

const mouse = ref({ x: 0, y: 0 })

useGesture({
  onMove ({ moving, offset: [x, y] }) {
    if (moving) {
      mouse.value = { x, y }
    }
  },
  onWheel ({ wheeling, movement: [_x, y] }) {
    if (wheeling) {
      let scale = canvasProperties.scale + (y * -0.01)
      scale = Math.min(Math.max(0.2, scale), 3)
      setCanvasScale(scale)
    }
  },
  onDrag ({ dragging, offset: [x, y] }) {
    if (dragging) {
      setCanvas({
        x,
        y
      })
    }
  },
  onDblclick () {
    setCanvas({
      scale: 1,
      x: 0,
      y: 0
    })
  }
}, {
  domTarget: typeof window === 'object' ? window.document.documentElement : null,
  eventOptions: { passive: true }
})

useGesture({
  onDrag ({ dragging, offset: [x, y], event }) {
    event.stopPropagation()

    if (dragging) {
      setBox({
        x,
        y
      })
    }
  }
}, {
  wheel: {
    bounds: {
      top: 1,
      bottom: 1,
      left: 1,
      right: 1
    }
  },
  domTarget: box
})

</script>
<template>
  <div
    ref="canvas"
    class="relative w-[100vw] h-[100vh] top-0 left-0 bg-rose-200"
  >
    <div
      ref="box"
      class="w-20 h-20 select-none rounded-md bg-rose-500 text-rose-100 flex justify-center items-center"
    >
      <span>Drag Me</span>
    </div>
  </div>
</template>

<style>
html, body, #__nuxt {
  overflow: hidden;
}
</style>
