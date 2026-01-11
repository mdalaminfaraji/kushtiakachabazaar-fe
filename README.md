# daily-market (কুষ্টিয়াকাছাবাজার)

<div align="center">
  <img src="public/images/logo.png" alt="Kushtiaka Chabazaar Logo" width="200" />
  <p>A comprehensive e-commerce platform for grocery and daily necessities</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-4.0+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
</div>

## 📋 Overview

daily-market is a modern, bilingual (Bengali/English) e-commerce platform designed to provide a seamless shopping experience for groceries and daily necessities. The platform features a comprehensive product categorization system, user-friendly navigation, and a robust checkout process.

## ✨ Features

### 🛒 E-commerce

- **Multi-level Category Navigation**: Three-level hierarchical category structure
- **Product Display**: Rich product cards with pricing, images, and add-to-cart functionality
- **Flash Sales**: Highlighted discounted products
- **Popular Products**: Featured trending items
- **Filtering & Sorting**: Advanced product filtering by category, price, and other attributes
- **Search**: Powerful search functionality across products
- **Cart & Checkout**: Streamlined shopping cart and checkout process

### ✍️ Blog System

- **Featured Posts**: Showcase important articles
- **Category Filtering**: Filter blog posts by topics
- **Search Functionality**: Search across all blog content
- **Tagging System**: Organize content with relevant tags
- **Related Posts**: Show related content to users
- **Social Sharing**: Easy sharing to social platforms

### 👥 User Experience

- **Responsive Design**: Optimized for all device sizes
- **Bilingual Support**: Complete Bengali and English language support
- **Breadcrumb Navigation**: Clear indication of user location
- **Grid & List Views**: Multiple product display options
- **Accessibility**: Designed with accessibility in mind

## 🔧 Technologies

- **Frontend**:

  - Next.js 13+ (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Lucide Icons
  - React Hook Form

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - JWT for authentication
  - SMS integration for order notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/mdalaminfaraji/daily-market-fe.git
cd daily-market-fe
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
daily-market-fe/
├── public/               # Static assets
├── src/
│   ├── app/              # App router pages
│   │   ├── (mainlayout)/ # Pages with main layout
│   │   └── admin/        # Admin dashboard pages
│   ├── components/       # Reusable components
│   │   ├── home/         # Homepage specific components
│   │   ├── shared/       # Shared components used across the app
│   │   └── ui/           # UI library components
│   ├── data/             # Static data (categories, products, blogs)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and libraries
│   ├── providers/        # Context providers
│   ├── services/         # API service functions
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions
└── next.config.js        # Next.js configuration
```

## 🔄 API Integration

The frontend connects to a separate backend service. For API documentation and setup instructions, please refer to the [Backend Repository](https://github.com/mdalaminfaraji/daily-market).

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🛠️ Development

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Run linter
npm run lint

# Format code
npm run format
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🚢 Deployment

This project can be deployed to various platforms:

### Vercel (Recommended)

```bash
npm run deploy:vercel
```

### Netlify

```bash
npm run deploy:netlify
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Md. Alamin Farajee** - _Lead Developer_ - [GitHub](https://github.com/mdalaminfaraji)

## 🙏 Acknowledgments

- Images and product data are for demonstration purposes only
- Special thanks to all contributors and supporters
