# Ecoyaan Checkout Flow

This is a Next.js (App Router) application that implements a streamlined, responsive, and aesthetically pleasing checkout flow for Ecoyaan. 

## Features
- **Server-Side Rendering (SSR)**: The initial cart data is fetched dynamically using Next.js Server Components.
- **State Management**: Uses React Context (`CheckoutContext`) to seamlessly pass cart, summary, and address details across steps without prop drilling.
- **Form Validation**: Comprehensive client-side validation for emails, 10-digit phone numbers, and 6-digit PIN codes.
- **Responsive Design**: Built entirely with Tailwind CSS, ensuring a mobile-first, fluid layout across all screen sizes.
- **Modern UI/UX**: Incorporates clean visuals, micro-animations, green eco-themed accents, and Lucide icons to look highly premium.

## Tech Stack
- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- **Lucide React** (Icons)

## Setup & Running Locally

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd ecoyaan-checkout
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *(Required dependencies include Next.js, React, Tailwind, and `lucide-react`)*

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Architectural Choices
- **Context API for State**: Given this is a 3-step checkout form flow, `Context` allows us to cleanly keep cart data, address form values, and computed subtotals in a unified store available across all pages (`/`, `/checkout/address`, `/checkout/payment`). This guarantees the data persists without needing external state libraries like Redux.
- **Next.js App Router layout mapping**: The top-level `layout.tsx` is an async component that fetches initial data and wraps the `<CheckoutProvider>`. This guarantees the SSR happens efficiently once, setting up the context with real data on first load.
- **Client Components mapping**: Since Context and interactivity (buttons, forms) need browser APIs, inner screens are `'use client'`. 
- **Mock API Pattern**: Instead of a full `route.ts`, an async delay function `fetchCheckoutData` mimics network fetching during SSR.

## Developer
Developed for Ecoyaan Frontend Engineering Interview.
