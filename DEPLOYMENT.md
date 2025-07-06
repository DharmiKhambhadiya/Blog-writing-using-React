# Deployment Guide - BlogNest

## 🚀 Deploy to Vercel

### Step 1: Prepare Your Code

1. **Ensure your code is ready:**
   - ✅ Build passes (`npm run build`)
   - ✅ All environment variables are configured
   - ✅ Code is pushed to GitHub

2. **Environment Variables Template:**
   Create a `.env` file in your project root:
   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id_here
   VITE_APPWRITE_DATABASE_ID=your_database_id_here
   VITE_APPWRITE_COLLECTION_ID=your_collection_id_here
   VITE_APPWRITE_BUCKET_ID=your_bucket_id_here
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project:**
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Set Environment Variables:**
   In the Vercel dashboard, go to:
   - Project Settings → Environment Variables
   - Add each variable from your `.env` file:
     - `VITE_APPWRITE_URL`
     - `VITE_APPWRITE_PROJECT_ID`
     - `VITE_APPWRITE_DATABASE_ID`
     - `VITE_APPWRITE_COLLECTION_ID`
     - `VITE_APPWRITE_BUCKET_ID`

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. **Add Custom Domain:**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **SSL Certificate:**
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check if all dependencies are in `package.json`
   - Ensure environment variables are set correctly
   - Check Vercel build logs for specific errors

2. **Environment Variables Not Working:**
   - Make sure all variables start with `VITE_`
   - Redeploy after adding new environment variables
   - Check variable names match exactly

3. **Routing Issues:**
   - The `vercel.json` file handles React Router routing
   - All routes should redirect to `index.html`

4. **Appwrite Connection Issues:**
   - Verify your Appwrite project is active
   - Check API keys and permissions
   - Ensure CORS is configured in Appwrite

### Performance Optimization:

1. **Enable Caching:**
   - Vercel automatically caches static assets
   - No additional configuration needed

2. **CDN:**
   - Vercel provides global CDN automatically
   - Images and assets are served from edge locations

## 📊 Monitoring

1. **Analytics:**
   - Vercel provides built-in analytics
   - View performance metrics in dashboard

2. **Logs:**
   - Check function logs in Vercel dashboard
   - Monitor build logs for issues

## 🔄 Continuous Deployment

- Every push to your main branch triggers a new deployment
- Pull requests get preview deployments automatically
- Rollback to previous versions from dashboard

## 🆘 Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Appwrite Docs:** [appwrite.io/docs](https://appwrite.io/docs)
- **Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions) 