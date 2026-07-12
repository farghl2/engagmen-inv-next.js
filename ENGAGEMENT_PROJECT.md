# 💍 Ahmed & Nada Engagement Invitation Website

A premium, immersive digital engagement invitation featuring interactive elements, theatrical animations, and a luxury aesthetic.

## 🎨 Visual Identity

### Color Palette
- **Cream Background**: `#FDFBF7` - Premium ivory base
- **Luxury Gold**: `#C5A059` - Primary accent and text
- **Dusty Rose**: `#E8C5C8` - Romance accent
- **Classic Burgundy**: `#800020` - CTA and key elements

### Typography
- **Serif (Headings)**: Playfair Display - Editorial luxury
- **Sans-serif (Body)**: Inter - Clean, modern
- **Arabic**: Tajawal - Elegant Arabic typography

## 🎭 User Flow Architecture

### Phase 1: The Entrance (Envelope)
**Component**: `src/components/Envelope.tsx`

- Elegant closed envelope with 3D depth
- Burgundy wax seal with pulsing heart icon
- Click trigger unlocks audio context (browser autoplay workaround)
- **Animation**: 3D `rotateX` flap opening (1.2s)
- Card slides out and scales to viewport (0.8s)
- Transitions to Maze phase

### Phase 2: The Gamification (Maze)
**Component**: `src/components/MazeGame.tsx`

- Minimalist 2D maze with gold paths
- Groom (Ahmed) navigates to bride (Nada)
- **Controls**: 
  - Keyboard: Arrow keys / WASD
  - Mobile: Swipe gestures or tap adjacent cells
  - Touch-friendly direction buttons
- Collision detection with walls
- **Victory**: Dramatic hearts-merging animation
- Smooth transition to Landing Page (0.6s)

### Phase 3: The Main Experience (Landing)
**Component**: `src/app/[locale]/page.tsx`

Orchestrates all landing sections with `AnimatePresence`:

#### 3.1 Hero Section
**Component**: `src/components/sections/Hero.tsx`

- Theatrical text-masking animations
- Names rise from `overflow: hidden` containers
- Staggered reveals (English → Arabic)
- Animated heart icon between names
- Floating particle effects
- Pulsing decorative circles

#### 3.2 Countdown
**Component**: `src/components/sections/Countdown.tsx`

- Real-time countdown to July 16, 2026
- Animated number ticker (vertical slide)
- Days / Hours / Minutes / Seconds
- Glassmorphism cards with hover effects
- Gradient accent bars
- Bilingual labels

#### 3.3 Venue Details
**Component**: `src/components/sections/Venue.tsx`

- Split asymmetric layout
- **Left**: Venue card + Time + Google Maps CTA
- **Right**: Embedded interactive map
- Magnetic hover effect on CTA button
- Sliding gradient background animation
- Animated location pin overlay

#### 3.4 RSVP Form
**Component**: `src/components/sections/RSVPForm.tsx`

- Glassmorphism design with backdrop blur
- Smooth focus border transitions
- Fields: Name*, Phone*, Email, Guests, Message
- **Submit States**:
  - Idle: Burgundy with Send icon
  - Loading: Spinner animation
  - Success: Celebratory with floating hearts confetti
- Form validation with error messages

## 🎵 Audio System
**Component**: `src/components/MusicPlayer.tsx`

- Floating bottom-right controller
- Equalizer bars animation when playing
- Browser autoplay handling via user interaction
- Unlocked on envelope click (legal audio context init)
- Toggle play/pause at any time
- Tooltip on hover

## 📦 Key Files Structure

```
src/
├── types/
│   └── invitation.ts           # TypeScript definitions
├── constants/
│   └── event.ts                # Event details, colors, durations
├── components/
│   ├── Envelope.tsx            # Interactive envelope
│   ├── MazeGame.tsx            # Maze gamification
│   ├── MusicPlayer.tsx         # Audio controller
│   └── sections/
│       ├── Hero.tsx            # Names reveal
│       ├── Countdown.tsx       # Timer with ticker
│       ├── Venue.tsx           # Location + map
│       └── RSVPForm.tsx        # Registration form
├── app/
│   ├── globals.css             # Tailwind theme + utilities
│   └── [locale]/
│       └── page.tsx            # Main orchestration
```

## 🎬 Animation Details

### Envelope Opening Sequence
1. **Flap rotation**: 3D `rotateX(-180deg)` over 1.2s
2. **Card emergence**: Scale from 0.3 to 1, Y-translate
3. **Envelope fade**: Opacity 1 → 0
4. **Delay**: 600ms before card, 1800ms before maze

### Maze Victory Animation
1. **Hearts merge**: Groom heart + Bride heart overlay
2. **Scale pulse**: `[1, 1.5, 1]` over 1s
3. **Rotation**: 0° → 360°
4. **Background blur**: Fade in overlay
5. **Transition delay**: 1500ms to landing

### Hero Text Reveal
- **Container**: `overflow: hidden`
- **Text**: `translateY(100px)` → `translateY(0)`
- **Stagger**: 0.3s delay between children
- **Duration**: 0.8s per element
- **Easing**: `cubic-bezier(0.43, 0.13, 0.23, 0.96)`

### Countdown Number Ticker
- **Mode**: `AnimatePresence` with `popLayout`
- **Entry**: `translateY(20px), opacity: 0`
- **Exit**: `translateY(-20px), opacity: 0`
- **Duration**: 0.5s
- **Updates**: Every second

## 🎯 Framer Motion Variants

All components use declarative animation variants for consistency:

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};
```

## 🌐 Internationalization

- English primary language
- Arabic translations for all sections
- `dir="rtl"` on Arabic text
- Font family switches: `font-arabic` utility class

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
- Touch-optimized controls (maze, music player)
- Mobile direction buttons for maze

## 🎨 Glassmorphism Utilities

Custom Tailwind utilities in `globals.css`:

```css
.bg-glassmorphism {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Visit `http://localhost:3000`

### Build
```bash
npm run build
npm start
```

## 📝 Event Details

- **Couple**: Ahmed & Nada (أحمد & ندى)
- **Event**: Engagement Party (خطوبة)
- **Date**: Thursday, July 16, 2026 at 6:00 PM
- **Venue**: Cove, Mansoura, Egypt
- **Location**: Overlooking the Nile River
- **Coordinates**: 31.0409°N, 31.3785°E

## 🎨 Design Philosophy

**Editorial Minimalism**: Spacious layouts with intentional negative space  
**Premium Luxury**: Gold accents, serif typography, refined interactions  
**Fluid Motion**: Smooth 60fps animations with GPU acceleration  
**Micro-interactions**: Delightful hover effects and state changes  
**Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## 🧪 Component Features

### Envelope
- ✅ 3D CSS transforms
- ✅ Audio context unlock
- ✅ Pulsing CTA animation
- ✅ Gradient depth overlays

### Maze
- ✅ Keyboard controls (arrows/WASD)
- ✅ Touch/swipe gestures
- ✅ Tap-to-move adjacent cells
- ✅ Collision detection
- ✅ Victory celebration
- ✅ Mobile direction buttons

### Music Player
- ✅ Browser autoplay workaround
- ✅ Animated equalizer bars
- ✅ Play/pause toggle
- ✅ Floating UI with tooltip
- ✅ Audio loop

### Hero
- ✅ Theatrical text reveals
- ✅ Staggered animations
- ✅ Bilingual names
- ✅ Animated heart icon
- ✅ Floating particles

### Countdown
- ✅ Real-time calculation
- ✅ Number ticker animation
- ✅ Glassmorphism cards
- ✅ Hover effects
- ✅ Gradient accents

### Venue
- ✅ Google Maps embed
- ✅ Magnetic CTA button
- ✅ Sliding gradient
- ✅ Map hover effects
- ✅ Animated pin overlay

### RSVP Form
- ✅ Smooth focus transitions
- ✅ Input validation
- ✅ Loading states
- ✅ Success celebration
- ✅ Floating hearts confetti
- ✅ Error handling

## 💡 Pro Tips

1. **Audio**: Background music requires user interaction. The envelope click unlocks it.
2. **Performance**: All animations use `transform` and `opacity` (GPU-accelerated).
3. **Testing**: Test on multiple browsers for audio context compatibility.
4. **Mobile**: Use touch gestures for the best maze experience.
5. **Customization**: All colors and event details are in `src/constants/event.ts`.

## 🎉 Special Thanks

This invitation celebrates the love story of Ahmed & Nada with technology and artistry.

**Built with**:
- Next.js 16
- React 19
- Framer Motion 12
- Tailwind CSS 4
- TypeScript 5

---

*Made with ❤️ for a special celebration*
