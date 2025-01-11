"use client"

import { useEffect, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

const data = {
  nodes: [
    { id: 'HTML', group: 1 },
    { id: 'CSS', group: 1 },
    { id: 'JavaScript', group: 2 },
    { id: 'React', group: 2 },
    { id: 'Node.js', group: 3 },
    { id: 'Express', group: 3 },
    { id: 'MongoDB', group: 4 },
    { id: 'SQL', group: 4 },
  ],
  links: [
    { source: 'HTML', target: 'CSS' },
    { source: 'HTML', target: 'JavaScript' },
    { source: 'CSS', target: 'JavaScript' },
    { source: 'JavaScript', target: 'React' },
    { source: 'JavaScript', target: 'Node.js' },
    { source: 'Node.js', target: 'Express' },
    { source: 'Express', target: 'MongoDB' },
    { source: 'Express', target: 'SQL' },
  ]
}

export default function NetworkVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isMounted) return null

  return (
    <div ref={containerRef} className="w-full h-full">
      <ForceGraph2D
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id as string
          const fontSize = 12/globalScale
          ctx.font = `${fontSize}px Sans-Serif`
          const textWidth = ctx.measureText(label).width
          const bckgDimensions = [textWidth, fontSize]
          const [width, height] = bckgDimensions.map(n => n + fontSize * 0.2)

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.fillRect(
            node.x! - width / 2,
            node.y! - height / 2,
            width,
            height
          )

          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = node.color as string
          ctx.fillText(label, node.x!, node.y!)
        }}
        linkColor={() => 'rgba(255,255,255,0.2)'}
      />
    </div>
  )
}

