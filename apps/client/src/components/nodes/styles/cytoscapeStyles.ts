import type { Stylesheet } from 'cytoscape'

export const defaultStyles: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#f3f4f6',
      'border-color': '#d1d5db',
      'border-width': 2,
      'label': 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      'text-wrap': 'wrap',
      'text-max-width': '100px',
      'font-size': '12px',
      'width': '120px',
      'height': '40px',
      'shape': 'roundrectangle',
    }
  },
  {
    selector: 'node[type = "concept"]',
    style: {
      'background-color': 'rgba(147, 197, 253, 0.5)',
      'border-color': 'rgb(59, 130, 246)',
    }
  },
  {
    selector: 'node[type = "implementation"]',
    style: {
      'background-color': 'rgba(167, 243, 208, 0.5)',
      'border-color': 'rgb(34, 197, 94)',
    }
  },
  {
    selector: 'node[type = "question"]',
    style: {
      'background-color': 'rgba(253, 164, 175, 0.5)',
      'border-color': 'rgb(244, 63, 94)',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#9ca3af',
      'target-arrow-color': '#9ca3af',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'opacity': 0.7,
    }
  },
  {
    selector: 'edge[type = "reference"]',
    style: {
      'line-color': '#3b82f6',
      'target-arrow-color': '#3b82f6',
      'width': 'data(strength)',
      'opacity': 1,
    }
  },
  {
    selector: 'edge[type = "tag"]',
    style: {
      'line-color': '#10b981',
      'target-arrow-color': '#10b981',
      'width': 'data(strength)',
      'line-style': 'dashed',
    }
  },
  {
    selector: ':selected',
    style: {
      'background-color': '#93c5fd',
      'border-color': '#3b82f6',
      'border-width': 3,
      'line-color': '#3b82f6',
      'target-arrow-color': '#3b82f6',
      'opacity': 1,
    }
  },
  {
    selector: ':active',
    style: {
      'overlay-opacity': 0.1,
    }
  },
] 