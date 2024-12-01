export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

export interface Service {
  title: string
  description: string
  icon: React.ReactNode
}

export interface NavItem {
  name: string
  path: string
} 