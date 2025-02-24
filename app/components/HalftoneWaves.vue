<script lang="ts" setup>
const canvasRef = ref<HTMLCanvasElement | null>(null)
const animationFrameId = ref<number | null>(null)
const time = ref(0)

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d')
  if (!ctx)
    return

  const canvas = canvasRef.value!
  canvas.width = 2400
  canvas.height = 1200

  const drawHalftoneWave = () => {
    const gridSize = 20
    const rows = Math.ceil(canvas.height / gridSize)
    const cols = Math.ceil(canvas.width / gridSize)

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const centerX = x * gridSize
        const centerY = y * gridSize
        const distanceFromCenter = Math.sqrt(
          (centerX - canvas.width / 2) ** 2
          + (centerY - canvas.height / 2) ** 2,
        )
        const maxDistance = Math.sqrt(
          (canvas.width / 2) ** 2
          + (canvas.height / 2) ** 2,
        )
        const normalizedDistance = distanceFromCenter / maxDistance

        const waveOffset = Math.sin(normalizedDistance * 10 - time.value) * 0.5 + 0.5
        const size = gridSize * waveOffset * 0.8

        ctx.beginPath()
        ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${waveOffset * 0.5})`
        ctx.fill()
      }
    }
  }

  const animate = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawHalftoneWave()

    time.value += 0.05
    animationFrameId.value = requestAnimationFrame(animate)
  }

  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>

<template>
  <canvas ref="canvasRef" class="w-full h-full bg-black" />
</template>
