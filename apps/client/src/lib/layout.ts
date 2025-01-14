import dagre from 'dagre'
import { Node, Edge } from 'reactflow'

// Conditionally import d3-force and elkjs only on the client side
const d3Force = typeof window !== 'undefined' 
  ? require('d3-force') 
  : {
      forceSimulation: () => ({
        force: () => ({ strength: () => ({}) }),
        tick: () => {},
        stop: () => {}
      })
    }

const elk = typeof window !== 'undefined' 
  ? require('elkjs').default 
  : null

export type LayoutType = 'TB' | 'LR' | 'BT' | 'RL' | 'radial' | 'force'
export type LayoutAlgorithm = 'dagre' | 'elk' | 'force' | 'radial'

export type LayoutOptions = {
  type: LayoutType
  algorithm?: LayoutAlgorithm
  nodeSpacing?: number
  rankSpacing?: number
  animate?: boolean
}

const applyForceLayout = (nodes: Node[], edges: Edge[], options: LayoutOptions) => {
  const simulationNodes = nodes.map(node => ({
    ...node,
    x: node.position.x,
    y: node.position.y,
  } as any))

  const simulation = d3Force.forceSimulation(simulationNodes)
    .force('link', d3Force.forceLink(edges).id((d: any) => d.id))
    .force('charge', d3Force.forceManyBody().strength(-500))
    .force('center', d3Force.forceCenter(0, 0))

  // Run simulation synchronously
  for (let i = 0; i < 300; ++i) simulation.tick()
  simulation.stop()

  return nodes.map(node => ({
    ...node,
    position: { 
      x: (node as any).x || node.position.x || 0, 
      y: (node as any).y || node.position.y || 0 
    },
    style: {
      ...node.style,
      opacity: 0,
      animation: options.animate ? 'fadeIn 0.3s ease-in forwards' : undefined,
    },
  }))
}

const applyRadialLayout = (nodes: Node[], edges: Edge[], options: LayoutOptions) => {
  const radius = Math.max(nodes.length * 50, 200)
  const angleStep = (2 * Math.PI) / nodes.length

  return nodes.map((node, i) => ({
    ...node,
    position: {
      x: radius * Math.cos(i * angleStep),
      y: radius * Math.sin(i * angleStep),
    },
    style: {
      ...node.style,
      opacity: 0,
      animation: options.animate ? 'fadeIn 0.3s ease-in forwards' : undefined,
    },
  }))
}

export const getLayoutedElements = async (
  nodes: Node[], 
  edges: Edge[], 
  options: LayoutOptions
) => {
  let { 
    type = 'TB',
    algorithm = 'dagre',
    nodeSpacing = 50,
    rankSpacing = 200,
  } = options

  if (algorithm === 'elk') {
    if (!elk) {
      console.warn('ELK layout not supported on server-side, falling back to Dagre')
      algorithm = 'dagre'
    } else {
      const elkGraph = {
        id: 'root',
        layoutOptions: {
          'elk.algorithm': 'layered',
          'elk.direction': type === 'LR' ? 'RIGHT' : 'DOWN',
          'elk.spacing.nodeNode': `${nodeSpacing}`,
          'elk.layered.spacing': `${rankSpacing}`,
        },
        children: nodes.map(node => ({
          id: node.id,
          width: node.type === 'group' ? 300 : 200,
          height: node.type === 'group' ? 200 : 100,
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      }

      const layout = await elk.layout(elkGraph)
      
      const layoutedNodes = nodes.map(node => {
        const elkNode = layout.children?.find((n: { id: string }) => n.id === node.id)
        return {
          ...node,
          position: {
            x: elkNode?.x || node.position.x || 0,
            y: elkNode?.y || node.position.y || 0,
          },
          style: {
            ...node.style,
            opacity: 0,
            animation: options.animate ? 'fadeIn 0.3s ease-in forwards' : undefined,
          },
        }
      })

      return { nodes: layoutedNodes, edges }
    }
  }

  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ 
    rankdir: type,
    nodesep: nodeSpacing,
    ranksep: rankSpacing,
  })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { 
      width: node.type === 'group' ? 300 : 200,
      height: node.type === 'group' ? 200 : 100,
    })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - (node.type === 'group' ? 150 : 100),
        y: nodeWithPosition.y - (node.type === 'group' ? 100 : 50),
      },
      style: {
        ...node.style,
        opacity: 0,
        animation: options.animate ? 'fadeIn 0.3s ease-in forwards' : undefined,
      },
    }
  })

  return { nodes: layoutedNodes, edges }
} 