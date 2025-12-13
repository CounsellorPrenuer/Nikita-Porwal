# EduVista Design Guidelines

## Design Approach: Reference-Based (Premium Educational Platform)
Drawing inspiration from modern SaaS platforms with educational elegance - think Notion's clarity + Stripe's sophistication + Apple's refinement for the education sector.

## Visual Style: Hypermodern & Premium

**Core Aesthetic:**
- Glassmorphism effects for cards, containers, and overlay elements
- Neumorphism for tactile interactive components
- Smooth vibrant gradients (mesh gradients, animated color transitions)
- 3D transform effects on hover states
- Animated SVG illustrations throughout

**Color System:**
- Extract primary palette from EduVista logo (provided assets)
- Create gradient variations for both light and dark themes
- Implement animated gradient backgrounds for hero sections
- Ensure WCAG AAA compliance across both themes

## Typography

**Font Strategy:**
- Variable fonts for modern, flexible typography
- Hero headlines: Bold, large-scale (4xl to 6xl)
- Body text: Clean, readable sans-serif
- Accent text: Sophisticated font pairing for quotes/testimonials

**Hierarchy:**
- H1: Hero statements, page titles
- H2: Section headers
- H3: Card titles, subsection headers
- Body: 16-18px base with 1.6-1.8 line height

## Layout System

**Spacing Scale:** Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Card spacing: p-6 to p-8
- Element gaps: gap-4, gap-6, gap-8

**Grid Patterns:**
- Services: 3-column grid (lg), 2-column (md), 1-column (mobile)
- Testimonials: Carousel with 3 visible cards (desktop)
- Statistics: 4-column counter display
- About timeline: Vertical interactive timeline

## Animation Strategy

**Page Load:**
- Animated logo reveal on initial load
- Staggered fade-in for hero content
- Floating particle effects in hero background

**Scroll Interactions:**
- Parallax scrolling on hero and feature sections
- Scroll-triggered fade/slide-in animations for content blocks
- Counter animations when statistics enter viewport
- Progress indicators for scrolling

**Micro-interactions:**
- Custom cursor with glowing trail effect
- Button ripple animations on click
- Card lift and glow on hover (translate + shadow)
- Text reveal animations for headings
- Morphing blob animations in backgrounds
- Smooth theme toggle with sun/moon rotation

**Navigation:**
- Smooth page transitions between routes
- Back-to-top button with fade-in at scroll threshold

## Component Library

**Navigation:**
- Sticky header with glassmorphism backdrop blur
- Animated hamburger menu (mobile)
- Theme toggle with animated icon transition

**Hero Section:**
- Full-height animated gradient background
- Floating geometric shapes with subtle animation
- Primary and secondary CTA buttons with hover effects
- Particle effect overlay

**Cards (Services/Features):**
- Glassmorphic background with backdrop blur
- Neumorphic shadow on hover
- Icon with gradient fill at top
- Modal expansion on click with smooth transition

**Forms:**
- Floating label animation
- Real-time validation with smooth error states
- Progress indicators for multi-step flows
- Toast notifications for submissions
- Skeleton loaders during processing

**Testimonials:**
- Auto-playing carousel with manual controls
- Card design with customer photo, quote, name, role
- Smooth slide transitions with fade

**Statistics Counter:**
- Animated number counting on scroll-in
- Large display numbers with gradient text
- Label underneath each stat

**Footer:**
- Multi-column layout with brand, links, contact
- Social icons with hover color transitions
- Newsletter signup with inline validation
- WhatsApp click-to-chat floating button

## Admin Panel Design

**Layout:**
- Sidebar navigation (collapsible on mobile)
- Dashboard cards with statistics and graphs
- Data tables with search, filter, pagination
- Modal forms for content editing

**Dashboard Elements:**
- Analytics charts (line, bar, pie using Recharts)
- Quick action cards
- Recent activity feed
- Export functionality buttons

## Theme System

**Light Theme:**
- White/light gray backgrounds
- Subtle gradients
- Dark text with high contrast
- Soft shadows

**Dark Theme:**
- Deep navy/charcoal backgrounds
- Vibrant gradient accents
- Light text with proper contrast
- Glowing effects for emphasis

**Transition:**
- Smooth 300ms transition between themes
- Animated toggle switch (sun/moon icon with rotation)
- Theme persists via localStorage

## Images

**Hero Section:** Large background image or animated gradient (no image needed if gradient is stunning enough)

**About Page:** Professional photo of Nikita Porwal with subtle border/shadow treatment

**Services Cards:** Icon-based (no images needed, use animated SVG icons)

**Testimonials:** Small circular customer photos (100x100px)

**Admin Login:** Animated gradient background (no image)

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators with animated outlines
- Skip to main content link
- Alt text for all images

## Performance Considerations

- Lazy load images below fold
- Intersection Observer for scroll animations
- Optimize animation performance (transform/opacity only)
- Reduce motion option for users with preferences

## Unique Distinguishing Features

- Custom animated cursor trail
- Interactive floating background shapes
- Morphing gradient backgrounds
- Glassmorphic overlay effects throughout
- Premium micro-interactions on every element
- Cohesive animation language across all pages