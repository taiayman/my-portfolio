import Container from '../ui/Container'

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <Container>
        <div className="py-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
} 