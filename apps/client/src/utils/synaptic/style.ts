import { NodeType } from '@/types/synaptic/node'
import { EdgeType } from '@/types/synaptic/edge'
import { Stylesheet } from 'cytoscape'

export const getNodeColor = (type: NodeType) => {
  switch (type) {
    case 'concept':
      return 'rgb(148 163 184 / 0.1)'
    case 'note':
      return 'rgb(148 163 184 / 0.15)'
    case 'resource':
      return 'rgb(148 163 184 / 0.2)'
    default:
      return 'rgb(148 163 184 / 0.1)'
  }
}

export const getEdgeStyle = (type: EdgeType) => {
  switch (type) {
    case 'prerequisite':
      return {
        'line-color': 'rgb(234 179 8)',
        'target-arrow-color': 'rgb(234 179 8)'
      }
    case 'related':
      return {
        'line-color': 'rgb(148 163 184)',
        'target-arrow-color': 'rgb(148 163 184)'
      }
    case 'leads_to':
      return {
        'line-color': 'rgb(59 130 246)',
        'target-arrow-color': 'rgb(59 130 246)'
      }
    case 'explains':
      return {
        'line-color': 'rgb(34 197 94)',
        'target-arrow-color': 'rgb(34 197 94)'
      }
    default:
      return {
        'line-color': 'rgb(148 163 184)',
        'target-arrow-color': 'rgb(148 163 184)'
      }
  }
}

export const cytoscapeStylesheet: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'background-color': 'rgb(148 163 184 / 0.1)',
      'border-color': 'rgb(148 163 184 / 0.2)',
      'border-width': '2px',
      'width': '160px',
      'height': '60px',
      'font-size': '13px',
      'color': 'rgb(148 163 184)',
      'text-wrap': 'wrap',
      'text-max-width': '100px',
      'text-valign': 'center',
      'text-halign': 'center',
      'label': 'data(label)',
      'shape': 'round-rectangle',
      'transition-property': 'background-color border-color border-width opacity',
      'transition-duration': 0.3,
      'transition-timing-function': 'ease-in-out',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': 'rgb(148 163 184 / 0.3)',
      'target-arrow-color': 'rgb(148 163 184 / 0.3)',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'arrow-scale': 0.8,
      'line-style': 'dashed',
      'line-dash-pattern': [12, 5],
      'line-dash-offset': 0,
      'transition-property': 'line-color target-arrow-color width line-dash-offset opacity',
      'transition-duration': 0.3,
      'transition-timing-function': 'ease-in-out',
    }
  },
  {
    selector: '.selected',
    style: {
      'background-color': 'rgb(148 163 184 / 0.3)',
      'border-color': 'rgb(148 163 184 / 0.5)',
      'border-width': '3px',
      'z-index': 999,
      'transition-property': 'background-color border-color border-width',
      'transition-duration': 0.2,
      'transition-timing-function': 'ease-out',
    }
  },
  {
    selector: '.highlighted',
    style: {
      'background-color': 'rgb(148 163 184 / 0.2)',
      'border-color': 'rgb(148 163 184 / 0.4)',
      'border-width': '2.5px',
      'z-index': 99,
      'transition-property': 'background-color border-color border-width',
      'transition-duration': 0.2,
      'transition-timing-function': 'ease-out',
    }
  },
  {
    selector: '.faded',
    style: {
      'opacity': 0.3,
      'transition-property': 'opacity',
      'transition-duration': 0.2,
      'transition-timing-function': 'ease-out',
    }
  },
  {
    selector: '.animated',
    style: {
      'line-dash-offset': 24,
      'transition-property': 'line-dash-offset',
      'transition-duration': 2,
      'transition-timing-function': 'linear',
    }
  },
  {
    selector: '.dragging',
    style: {
      'opacity': 0.8,
      'background-color': 'rgb(148 163 184 / 0.25)',
      'border-color': 'rgb(148 163 184 / 0.6)',
      'border-width': '2.5px',
      'z-index': 9999,
      'transition-property': 'none',
    }
  }
] 