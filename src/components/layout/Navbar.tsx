'use client';

import Link from 'next/link'
import { navigation } from '@/constants/navigation'
import Container from '../ui/Container'

export default function Navbar() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (sectionId === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => scrollToSection(e, item.path.replace('/', '#'))}
                  className="hover:text-gray-600 transition cursor-pointer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
} 