import { projects } from '@/constants/projects'
import Container from '../ui/Container'
import ProjectCard from '../shared/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <Container>
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">My Projects</h2>
            <p className="mt-4 text-gray-600">Here are some of my recent works</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 