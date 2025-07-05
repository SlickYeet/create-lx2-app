"use client"

import { useEffect, useRef } from "react"

export function NotFoundImage({
  size,
}: {
  size: {
    width: number
    height: number
  }
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = (canvas.width = size.width || 300)
    const height = (canvas.height = size.height || 300)

    // Draw TNT text
    function drawTNT() {
      ctx!.save()
      ctx!.fillStyle = "#6366f1"
      ctx!.font = 'bold 60px "Space Grotesk", sans-serif'
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      ctx!.fillText("TNT", width / 2, height / 2)

      ctx!.strokeStyle = "#4f46e5"
      ctx!.lineWidth = 2
      ctx!.strokeText("TNT", width / 2, height / 2)
      ctx!.restore()
    }

    // Draw 404 text
    function draw404() {
      ctx!.save()
      ctx!.fillStyle = "#d946ef"
      ctx!.font = 'bold 30px "Space Grotesk", sans-serif'
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      ctx!.fillText("404", width / 2, height / 2 + 50)
      ctx!.restore()
    }

    // Animation loop
    function animate() {
      ctx!.clearRect(0, 0, width, height)

      // Draw text
      drawTNT()
      draw404()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      ctx.clearRect(0, 0, width, height)
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
      className="mx-auto"
    />
  )
}
