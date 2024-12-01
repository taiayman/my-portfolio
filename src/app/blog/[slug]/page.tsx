'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const blogPosts = {
  "building-scalable-applications-nextjs-14": {
    title: "Building Scalable Applications with Next.js 14",
    date: "Nov 28, 2023",
    readTime: "12 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    content: `Next.js 14 has revolutionized the way we build web applications, introducing groundbreaking features that enhance both developer experience and application performance. In this comprehensive guide, we'll dive deep into the latest innovations and explore best practices for creating scalable, performant applications.

## Server Components in Action

Server Components represent one of the most significant innovations in React development. Here's a practical example:

\`\`\`jsx
// app/products/page.tsx
async function ProductList() {
  // This runs on the server
  const products = await fetchProducts();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

// Direct database queries in Server Components
async function fetchProducts() {
  const products = await db.query(\`
    SELECT * FROM products 
    WHERE status = 'active'
    ORDER BY created_at DESC
    LIMIT 10
  \`);
  
  return products;
}
\`\`\`

## Parallel Data Fetching

Next.js 14 enables efficient parallel data fetching:

\`\`\`typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

async function DashboardPage() {
  // These requests run in parallel
  const [userData, analytics, notifications] = await Promise.all([
    fetchUserData(),
    fetchAnalytics(),
    fetchNotifications()
  ]);

  return (
    <div className="dashboard-layout">
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile data={userData} />
      </Suspense>
      
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsChart data={analytics} />
      </Suspense>
      
      <Suspense fallback={<NotificationsSkeleton />}>
        <NotificationPanel notifications={notifications} />
      </Suspense>
    </div>
  );
}
\`\`\`

## Route Handlers

Modern API routes in Next.js 14:

\`\`\`typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const products = await db.products.findMany({
      where: {
        category: category || undefined,
        status: 'active'
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
\`\`\`

## Image Optimization

Implement optimized images with Next.js:

\`\`\`jsx
import Image from 'next/image';

function ProductImage({ product }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={product.featured}
        placeholder="blur"
        blurDataURL={product.blurUrl}
      />
    </div>
  );
}
\`\`\`

## Metadata API

Implement dynamic metadata for better SEO:

\`\`\`typescript
// app/products/[id]/page.tsx
import { Metadata } from 'next';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.image }],
    },
  };
}
\`\`\`

These examples demonstrate the power and flexibility of Next.js 14's features. By following these patterns, you can build scalable, performant applications that provide excellent user experiences.`,
    excerpt: "Next.js 14 has revolutionized the way we build web applications, introducing groundbreaking features that enhance both developer experience and application performance."
  },
  "future-mobile-development-flutter": {
    title: "The Future of Mobile Development with Flutter",
    date: "Nov 25, 2023",
    readTime: "4 min read",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    content: `Flutter has emerged as a game-changing framework in the mobile development landscape. Let's explore why it's becoming the preferred choice for developers worldwide.

## Why Flutter?

### Cross-Platform Excellence
Flutter's ability to maintain consistent performance across platforms while sharing a single codebase makes it an attractive choice for businesses and developers.

### Rich Widget Library
The extensive collection of customizable widgets enables developers to create beautiful, native-like interfaces with minimal effort.

## Key Advantages

1. **Hot Reload**
- Instant view of changes
- Faster development cycle
- Better experimentation

2. **Performance**
- Native compilation
- Smooth animations
- Excellent rendering engine

3. **Single Codebase**
- Reduced development time
- Easier maintenance
- Consistent experience

## Future Prospects

Flutter's future looks promising with:
- Web and desktop support
- Growing community
- Improved tooling
- Enhanced performance`
  },
  "mastering-tailwind-css": {
    title: "Mastering Tailwind CSS: From Basics to Advanced",
    date: "Nov 24, 2023",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    content: `Tailwind CSS has revolutionized the way we approach web styling. Let's dive deep into mastering this utility-first framework.

## Why Tailwind CSS?

### Utility-First Approach
Tailwind's utility-first methodology provides unprecedented flexibility and speed in styling web applications.

### Performance Benefits
- Automatic purging of unused styles
- Minimal production CSS
- Optimized build process

## Advanced Techniques

### 1. Custom Configuration
Learn how to extend and customize Tailwind:
- Custom color palettes
- Custom breakpoints
- Plugin development

### 2. Component Patterns
Best practices for component design:
- Extracting component classes
- Building responsive layouts
- Dark mode implementation

### 3. Animation and Transitions
Creating smooth user experiences:
- Hover effects
- Page transitions
- Loading states

## Best Practices

1. **Organization**
- Consistent class ordering
- Component extraction
- Theme configuration

2. **Responsive Design**
- Mobile-first approach
- Breakpoint strategies
- Container queries

## Real-World Applications

Practical examples of Tailwind in action:
- Dashboard layouts
- Card components
- Navigation menus
- Form styling`
  },
  "ai-in-modern-development": {
    title: "AI in Modern Development: A Practical Guide",
    date: "Nov 23, 2023",
    readTime: "8 min read",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    content: `Artificial Intelligence is transforming software development. Let's explore practical ways to integrate AI into your development workflow.

## AI Tools for Developers

### 1. Code Assistance
Modern AI-powered coding tools offer:
- Intelligent code completion
- Bug detection and fixes
- Code refactoring suggestions

### 2. Testing and QA
AI enhances testing through:
- Automated test generation
- Bug prediction
- Performance optimization

### 3. Project Management
AI tools help in:
- Sprint planning
- Resource allocation
- Risk assessment

## Implementation Strategies

### Getting Started
Key steps to integrate AI in your workflow:
- Tool selection
- Team training
- Process adaptation

### Best Practices
1. **Data Security**
- API key management
- Code privacy
- Data handling

2. **Quality Control**
- Code review processes
- Testing protocols
- Performance monitoring

## Future Trends

The future of AI in development:
- More sophisticated code generation
- Enhanced debugging capabilities
- Automated documentation
- Predictive maintenance

## Practical Applications

Real-world scenarios where AI excels:
- Code optimization
- Security vulnerability detection
- Performance profiling
- Documentation generation`
  },
  "modern-authentication": {
    title: "Modern Authentication: Best Practices and Implementation",
    date: "Nov 22, 2023",
    readTime: "7 min read",
    category: "Security",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    content: `Secure authentication is crucial for modern applications. Let's explore current best practices and implementation strategies.

## Authentication Fundamentals

### Core Concepts
Understanding the basics:
- Token-based authentication
- OAuth 2.0 and OpenID Connect
- JWT implementation

### Security Considerations
Critical security aspects:
- Password hashing
- Salt and pepper
- Rate limiting

## Implementation Strategies

### 1. JWT Authentication
Best practices for JWT:
- Token structure
- Expiration handling
- Refresh token rotation

### 2. OAuth Implementation
Setting up OAuth:
- Provider selection
- Flow configuration
- Callback handling

### 3. Social Authentication
Integrating social login:
- Multiple provider support
- Profile mapping
- Error handling

## Advanced Topics

1. **Multi-Factor Authentication**
- TOTP implementation
- Recovery codes
- Backup methods

2. **Session Management**
- Session storage
- Timeout handling
- Concurrent sessions

## Security Best Practices

Essential security measures:
- HTTPS enforcement
- CORS configuration
- XSS prevention
- CSRF protection

## Future Considerations

Emerging authentication trends:
- Passwordless authentication
- Biometric integration
- Blockchain-based auth
- Zero-trust architecture`
  }
};

const renderContent = (content: string) => {
  const blocks = content.split('```');
  
  return blocks.map((block, index) => {
    // If it's a code block (odd indexes after split)
    if (index % 2 === 1) {
      const [language, ...codeLines] = block.split('\n');
      const code = codeLines.join('\n').trim();
      
      return (
        <div key={index} className="my-6 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              background: '#1E1E1E'
            }}
            className="text-sm"
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    }

    // Regular content
    return block.split('\n').map((paragraph, pIndex) => {
      if (!paragraph.trim()) return null;

      // Handle headings
      if (paragraph.trim().startsWith('#')) {
        const matches = paragraph.match(/^(#+)\s(.+)/);
        if (matches) {
          const level = matches[1].length;
          const text = matches[2];
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          return (
            <Tag 
              key={`${index}-${pIndex}`}
              className={`font-bold ${
                level === 1 ? 'text-3xl mb-6' : 
                level === 2 ? 'text-2xl mb-4' : 
                'text-xl mb-3'
              }`}
            >
              {text}
            </Tag>
          );
        }
      }

      // Handle list items
      if (paragraph.trim().startsWith('-')) {
        return (
          <ul key={`${index}-${pIndex}`} className="list-disc list-inside mb-4">
            <li className="text-[#faf5f0]/80">
              {paragraph.replace('-', '').trim()}
            </li>
          </ul>
        );
      }

      // Regular paragraphs
      return (
        <p key={`${index}-${pIndex}`} className="text-[#faf5f0]/80 mb-4">
          {paragraph}
        </p>
      );
    });
  });
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-[#faf5f0] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-[#faf5f0]/80 hover:text-[#faf5f0]">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#1a1a1a] text-[#faf5f0] py-20">
      <div className="container mx-auto px-4">
        <Link 
          href="/blog"
          className="inline-flex items-center text-[#faf5f0]/80 hover:text-[#faf5f0] mb-8"
        >
          ← Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-[21/9] w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
              quality={100}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#faf5f0]/10 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-[#faf5f0]/60 text-sm">{post.readTime}</span>
              <span className="text-[#faf5f0]/60 text-sm">{post.date}</span>
            </div>

            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

            <div className="prose prose-invert prose-lg max-w-none">
              {renderContent(post.content)}
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
} 