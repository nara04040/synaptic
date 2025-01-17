declare module 'react-cytoscapejs' {
  import { Component } from 'react'
  import { Core, CytoscapeOptions, Stylesheet } from 'cytoscape'

  export interface CytoscapeComponentProps extends Partial<CytoscapeOptions> {
    id?: string
    cy?: (cy: Core) => void
    style?: React.CSSProperties
    elements: any
    stylesheet?: Stylesheet[]
    className?: string
    wheelSensitivity?: number
    minZoom?: number
    maxZoom?: number
  }

  export default class CytoscapeComponent extends Component<CytoscapeComponentProps> {}
} 