# Continental Hotel Booking System - Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by **Airbnb + Booking.com** aesthetics
- Hospitality industry requires visual appeal with professional credibility
- Balance between elegant presentation and functional efficiency
- Warm, inviting atmosphere while maintaining utility

## Typography System
**Font Stack:**
- Primary: 'Inter' (Google Fonts) - Clean, modern readability
- Headings: Font weights 600-700
- Body: Font weight 400-500
- Buttons/Labels: Font weight 500-600

**Hierarchy:**
- Page Titles: text-4xl to text-5xl, font-semibold
- Section Headers: text-2xl to text-3xl, font-semibold
- Card Titles: text-xl, font-semibold
- Body Text: text-base, font-normal
- Labels/Meta: text-sm, font-medium

## Layout & Spacing System
**Tailwind Spacing Units:** 4, 6, 8, 12, 16, 24
- Component padding: p-6 or p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 or gap-8
- Container max-width: max-w-7xl

**Grid Patterns:**
- Post Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Promotion Banners: grid-cols-1 lg:grid-cols-2
- Single column forms with max-w-md centering

## Core Components

### Navigation
- Fixed top navigation bar with logo left, menu items center, user profile/login right
- Sticky on scroll for easy access
- Mobile: Hamburger menu pattern
- Include: Home, Posts, Promotions, Account/Login

### Authentication Pages (Login/Register)
- Centered card layout (max-w-md) on clean background
- Hotel image as subtle background with overlay
- Form inputs with clear labels above fields
- Primary CTA button prominent and full-width
- Toggle between Login/Register seamlessly

### Posts Listing Page
- Hero section with hotel showcase image (h-96)
- Search bar prominently placed in hero with tag filter
- Card grid displaying room posts
- Each card: Large image (aspect-ratio-4/3), title, brief description, "View Details" CTA
- Hover: Subtle lift effect (transform scale)

### Post Detail Page
- Large image gallery/carousel at top
- Two-column layout: Left (images, description), Right (booking sidebar with sticky positioning)
- Tags displayed as pills/badges
- Clear information hierarchy

### Promotions Page
- Banner-style promotion cards with promotional imagery
- Each promotion: Image left, details right (or stacked on mobile)
- Search by promotion code feature prominently placed
- Highlight discount percentages/special offers boldly

### Promotion Detail Page
- Full-width hero with promotion visual
- Terms and conditions clearly displayed
- "Apply Promotion" or "Book Now" CTA prominent
- Related promotions section at bottom

### User Account/Profile
- Tab navigation: Profile Info, My Bookings, Settings
- Edit profile form with avatar upload placeholder
- Delete account option with confirmation modal

## Component Library

**Buttons:**
- Primary: Rounded-lg, px-6, py-3, font-medium
- Secondary: Outlined version with border
- Hover: Slight scale (hover:scale-105) and shadow increase

**Cards:**
- Rounded-xl borders
- Shadow-md with hover:shadow-lg transition
- Overflow-hidden for image containment

**Forms:**
- Inputs: Rounded-lg, border with focus ring
- Labels: Above inputs, text-sm font-medium
- Validation: Inline error messages in red

**Search Bars:**
- Rounded-full or rounded-lg
- Icon (search/magnifying glass) from Heroicons
- Prominent sizing in hero sections

**Modals/Overlays:**
- Confirmation dialogs for delete actions
- Image lightbox for galleries
- Backdrop blur effect

## Images
**Hero Images:**
- Homepage: Large hero (h-screen or h-96) showcasing Continental Hotel exterior/lobby
- Posts Page: Hotel room showcase hero (h-80)
- Promotions: Promotional campaign visuals

**Content Images:**
- Post Cards: High-quality room photos (aspect-ratio-4/3)
- Post Detail: Multiple room angles, amenities
- Promotions: Discount/offer themed graphics

**Placement:**
- Use images liberally to create hospitality ambiance
- All buttons on images: Backdrop blur (backdrop-blur-sm) background

## Animations
**Minimal & Purposeful:**
- Card hover: Subtle lift (translate-y-1) and shadow
- Page transitions: Smooth fade-in
- No distracting scroll animations

## Icons
**Heroicons (outline style)** via CDN
- Navigation: HomeIcon, TagIcon, TicketIcon, UserIcon
- Search: MagnifyingGlassIcon
- Actions: PencilIcon, TrashIcon, ArrowRightIcon

## Accessibility
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states clearly visible (ring-2 ring-offset-2)
- Alt text for all images

## Page-Specific Layouts

**Homepage:**
- Hero with hotel image + search overlay
- Featured rooms section (3-column grid)
- Active promotions highlight (2-column)
- Footer with contact info

**Posts/Rooms Listing:**
- Search/filter bar sticky below nav
- 3-column responsive grid
- Pagination or infinite scroll

**Account Dashboard:**
- Sidebar navigation (desktop) or tabs (mobile)
- Content area with forms/information

This design creates a professional, visually appealing hotel booking experience that balances Continental's brand prestige with functional user needs.