'use client'

import { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import { useNodeStore } from './NodeStore'
import { defaultStyles } from './styles/cytoscapeStyles'
import { Card } from '@/components/ui/card'

export function SynapticMap() {
  const cyRef = useRef<cytoscape.Core | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { nodes, edges } = useNodeStore()

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Cytoscape
    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: {
        nodes: nodes.map(node => ({
          data: {
            id: node.id,
            label: node.data.title,
            type: node.type,
            ...node.data
          }
        })),
        edges: edges.map(edge => ({
          data: {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type,
            ...edge.data
          }
        }))
      },
      style: defaultStyles,
      layout: {
        name: 'cose',
        animate: true,
        nodeDimensionsIncludeLabels: true,
        idealEdgeLength: () => 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: () => 400000,
        edgeElasticity: () => 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      wheelSensitivity: 0.2,
    })

    // Add event listeners
    cyRef.current.on('tap', 'node', (evt) => {
      const node = evt.target
      console.log('Selected node:', node.data())
    })

    return () => {
      cyRef.current?.destroy()
    }
  }, [])

  // Update elements when store changes
  useEffect(() => {
    if (!cyRef.current) return

    cyRef.current.elements().remove()
    cyRef.current.add({
      nodes: nodes.map(node => ({
        data: {
          id: node.id,
          label: node.data.title,
          type: node.type,
          ...node.data
        }
      })),
      edges: edges.map(edge => ({
        data: {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type,
          ...edge.data
        }
      }))
    })
    cyRef.current.layout({ name: 'cose' }).run()
  }, [nodes, edges])

  return (
    <Card className="w-full h-[calc(100vh-10rem)] relative">
      <div ref={containerRef} className="w-full h-full" />
    </Card>
  )
} 