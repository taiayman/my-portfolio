import Image from 'next/image'
import Container from '../ui/Container'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="pt-24 pb-16">
      <Container>
        <div className="flex flex-col items-center text-center gap-8">
          <Image
            src="/images/hero-bg.png"
            alt="Hero background"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Hi, I&apos;m <span className="text-blue-600">Your Name</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A passionate full-stack developer specializing in building exceptional digital experiences.
          </p>
          <div className="flex gap-4">
            <Button size="lg">View Projects</Button>
            <Button variant="secondary" size="lg">Contact Me</Button>
          </div>
        </div>
      </Container>
    </section>
  )
} 