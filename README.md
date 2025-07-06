# BlogNest - Professional Blog Platform

A modern, full-featured blog platform built with React, Redux, and Appwrite backend.

## Features

- ✨ Modern React with Vite
- 🔐 User authentication with Appwrite
- 📝 Rich text editor for blog posts
- 🖼️ Image upload and management
- 📱 Responsive design
- 🎨 Professional UI/UX
- 🔍 Search and filter posts
- 👤 User profiles and post management

## Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router
- **Backend**: Appwrite (Database, Storage, Authentication)
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design patterns

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Appwrite account and project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blogproject
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

4. Run the development server:
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. **Push your code to GitHub**

2. **Set up Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables:**
   In Vercel dashboard, go to your project settings and add these environment variables:
   - `VITE_APPWRITE_URL`
   - `VITE_APPWRITE_PROJECT_ID`
   - `VITE_APPWRITE_DATABASE_ID`
   - `VITE_APPWRITE_COLLECTION_ID`
   - `VITE_APPWRITE_BUCKET_ID`

4. **Deploy:**
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"
   - Your site will be live in minutes!

### Appwrite Setup

1. Create an Appwrite project
2. Set up a database with a collection for posts
3. Create a storage bucket for images
4. Configure authentication
5. Set proper permissions for your collection and bucket

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── appwrite/          # Appwrite configuration and services
├── components/        # Reusable React components
├── pages/            # Page components
├── store/            # Redux store and slices
├── conf/             # Configuration files
└── API/              # Static data and API utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
