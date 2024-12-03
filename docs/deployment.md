# Deployment Guide

## Building for Production

1. Create production build:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

## Deployment Options

### Netlify

1. Connect your repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

### Environment Variables

Set these in your deployment platform:
```
VITE_API_URL=production_api_url
```

## Post-Deployment Checklist

- Verify all routes work correctly
- Check admin login functionality
- Confirm booking flow works
- Test responsive design
- Validate form submissions