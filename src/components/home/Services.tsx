import Container from '../ui/Container'
import ServiceCard from '../shared/ServiceCard'

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive and modern web applications using the latest technologies.',
    icon: '💻'
  },
  {
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile applications for iOS and Android.',
    icon: '📱'
  },
  {
    title: 'UI/UX Design',
    description: 'Designing beautiful and intuitive user interfaces and experiences.',
    icon: '🎨'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <Container>
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">My Services</h2>
            <p className="mt-4 text-gray-600">Here&apos;s what I can do for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 