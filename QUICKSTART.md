# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Setup Backend (No API Keys Needed!)
```bash
# Navigate to project folder
cd c:\Users\elfrn\Desktop\linkedin-kaydedici1

# Create .env file (just copy the example)
copy .env.example .env

# Install dependencies
npm install

# Start the server
npm start
```

**That's it!** Uses free Hugging Face AI - no payment needed!

You should see: ✓ Server running on http://localhost:3000

### Step 2: Load Extension in Chrome
1. Open Chrome
2. Go to `chrome://extensions/`
3. Turn ON "Developer mode" (top right corner)
4. Click "Load unpacked"
5. Select the folder: `c:\Users\elfrn\Desktop\linkedin-kaydedici1`
6. The extension will appear in your toolbar!

### Step 3: Use It!
1. Go to your **LinkedIn profile** (linkedin.com/in/yourprofile)
2. Click the **extension icon** in the toolbar
3. **Paste a job description** from any job posting
4. Click **"Analyze Match"**
5. See your results! 🎉

## ⚠️ Common Issues

**"Could not extract your LinkedIn profile"**
- You need to be on your LinkedIn profile page (linkedin.com/in/...)
- Your skills section must be visible
- Try refreshing the page

**"Analysis failed - Backend server error"**
- Make sure you ran `npm start` and it's still running
- Free tier may have rate limits (~1 request/min) - wait and retry
- Try restarting the server

**Extension doesn't appear**
- Refresh the extensions page (chrome://extensions/)
- Make sure developer mode is ON
- Reload the extension by clicking the refresh icon

## 📝 File Locations

Backend: `c:\Users\elfrn\Desktop\linkedin-kaydedici1\`
- `server.js` - Backend server
- `claude-service.js` - Hugging Face AI integration (FREE!)
- `.env` - Optional settings (no keys required)

Extension: Same folder
- `manifest.json` - Extension config
- `popup.html / popup.js` - UI
- `content-script.js` - LinkedIn scraper
- `style.css` - Styling

## 🔧 Development Tips

**To reload extension after changes:**
1. Edit a file
2. Go to `chrome://extensions/`
3. Click refresh icon on the extension

**To restart backend after code changes:**
1. Press Ctrl+C in terminal
2. Run `npm start` again

**To debug:**
- Open Chrome DevTools in the extension popup: Right-click popup → Inspect
- Check backend console for errors (where you ran `npm start`)

---

**You're all set! Start analyzing jobs! 🎯**
