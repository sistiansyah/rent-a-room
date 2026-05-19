# Workspace Builder – monis.rent Coding Challenge

This project is an interactive workspace configurator built with Next.js, React, TypeScript, and React-Konva. The goal of the application is to provide users with a more engaging experience when renting office equipment by allowing them to visually design their own workspace setup instead of browsing through a traditional product catalog.

## Approach

I approached this challenge by focusing on user interaction and simplicity. Instead of building a static e-commerce page, I wanted the experience to feel more visual and playful. Users can select furniture and accessories, place them into a workspace canvas, drag items around freely, and customize their setup before checkout.

To keep the project maintainable, I separated the application into:
- Product & cart business logic
- Workspace rendering logic
- Reusable UI components

I also implemented product rules such as:
- Single-instance items (Desk / Chair)
- Multi-instance items (Accessories / Monitor)

This helped simulate more realistic workspace behavior.

---

## Tech Stack & Choices

### Frontend
- Next.js
- React
- TypeScript

I chose Next.js because it provides a modern React architecture with a clean project structure and scalable routing system.

### Canvas Rendering
- React-Konva / Konva

I used React-Konva to create the interactive workspace canvas because it provides:
- Drag-and-drop support
- Canvas-based rendering
- Smooth object manipulation
- Easy export to image

This made it much easier to build an interactive configurator experience.

### Styling
- Tailwind CSS
- Plain CSS

I used Tailwind CSS for layouting and utility styling, while still using plain CSS in several areas where custom component styling felt faster and more maintainable during development.

---

## What I Would Improve With More Time

If given more time, I would improve the project by adding:

- Better object snapping & alignment guides
- Zoom and pan functionality
- Layer ordering (bring forward / send backward)
- Rotation support
- Persistent storage / backend integration
- Real product APIs
- Mobile optimization for drag interactions
- Improved export quality and workspace templates
- Better workspace scaling with realistic proportions

I would also refactor several state management areas to further separate business logic from visual workspace state as the project grows.

---