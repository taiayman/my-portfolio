'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import the blog posts data
const blogPosts = {
  "building-scalable-applications-nextjs-14": {
    title: "Building Scalable Applications with Next.js 14",
    date: "Nov 28, 2023",
    readTime: "12 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Next.js 14 has revolutionized the way we build web applications, introducing groundbreaking features that enhance both developer experience and application performance."
  },
  "future-mobile-development-flutter": {
    title: "The Future of Mobile Development with Flutter",
    date: "Nov 25, 2023",
    readTime: "4 min read",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Flutter has emerged as a game-changing framework in the mobile development landscape. Let's explore why it's becoming the preferred choice for developers worldwide."
  },
  "mastering-tailwind-css": {
    title: "Mastering Tailwind CSS: From Basics to Advanced",
    date: "Nov 24, 2023",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    excerpt: "Tailwind CSS has revolutionized the way we approach web styling. Let's dive deep into mastering this utility-first framework."
  },
  "ai-in-modern-development": {
    title: "AI in Modern Development: A Practical Guide",
    date: "Nov 23, 2023",
    readTime: "8 min read",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Artificial Intelligence is transforming software development. Let's explore practical ways to integrate AI into your development workflow."
  },
  "modern-authentication": {
    title: "Modern Authentication: Best Practices and Implementation",
    date: "Nov 22, 2023",
    readTime: "7 min read",
    category: "Security",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Secure authentication is crucial for modern applications. Let's explore current best practices and implementation strategies."
  }
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-[#faf5f0]">
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-bold mb-6 text-[#1a1a1a]">
              Blog & Insights
            </h1>
            <p className="text-lg text-[#1a1a1a]/80 max-w-2xl mx-auto">
              Exploring the latest in web development, design patterns, and emerging technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(blogPosts).map(([slug, post], index) => (
              <motion.article
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#faf5f0] rounded-md overflow-hidden border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 transition-colors duration-300"
              >
                <Link href={`/blog/${slug}`}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[#1a1a1a] text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-[#1a1a1a]/60 text-sm">{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a] group-hover:text-[#1a1a1a]/80 transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-[#1a1a1a]/70">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-[#1a1a1a]/60">{post.date}</span>
                      <span className="inline-flex items-center text-[#1a1a1a] font-medium group-hover:translate-x-1 transition-transform duration-300">
                        Read More <span className="ml-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 