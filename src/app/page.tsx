import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <div id="home">
        <Hero />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <Footer />
    </main>
  )
}
