declare module 'cytoscape-cose-bilkent' {
  import { Core, LayoutOptions } from 'cytoscape'

  interface CoseBilkentLayoutOptions extends LayoutOptions {
    name: 'cose-bilkent'
    // Layout specific options
    idealEdgeLength?: number
    nodeOverlap?: number
    refresh?: number
    fit?: boolean
    padding?: number
    randomize?: boolean
    componentSpacing?: number
    nodeRepulsion?: number
    edgeElasticity?: number
    nestingFactor?: number
    gravity?: number
    numIter?: number
    initialTemp?: number
    coolingFactor?: number
    minTemp?: number
  }

  function register(cytoscape: Core | typeof import('cytoscape')): void
  export = register
} 