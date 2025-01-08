export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface RoadmapNode {
  id: string
  type: string
  position: {x: number, y: number}
  data: {
    label: string,
    content?: string
  }
}

export interface Edge {
  id: string
  source: string
  target: string
}