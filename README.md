# LinkedIn Job Matcher - Chrome Extension

An AI-powered Chrome extension that helps job seekers on LinkedIn by analyzing job postings and comparing them with your profile skills.

## Features

✨ **Skill Matching** - Compare your LinkedIn skills against job requirements  
🤖 **AI Insights** - Get detailed fit analysis and personalized recommendations  
💼 **Profile Integration** - Automatically extracts your skills from LinkedIn  
🎯 **Match Score** - See your compatibility percentage for each job  
⚡ **Real-time Analysis** - Quick results with Claude AI

## Setup

### Prerequisites
- Node.js (v14+)
- Chrome browser
- **No API keys required!** Uses free Hugging Face AI
- (Optional) Hugging Face token for higher rate limits

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd linkedin-job-matcher
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Setup environment (optional)**
   ```bash
   cp .env.example .env
   # No API keys required! Leave as is, or add HF_API_KEY for higher limits
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3000`

### Load Extension in Chrome

1. Go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the project folder
5. The extension will appear in your Chrome toolbar

## Usage

1. **Go to your LinkedIn profile** and make sure your skills section is visible
2. **Visit a job posting** on LinkedIn or any website
3. **Click the extension icon** in the toolbar
4. **Paste the job description** in the popup
5. **Click "Analyze Match"**
6. **View your results** - Match score, skills breakdown, and AI recommendations

## Project Structure

```
linkedin-job-matcher/
├── manifest.json           # Extension configuration
├── popup.html              # UI popup template
├── popup.js                # UI logic
├── style.css               # Styling
├── content-script.js       # LinkedIn profile scraper
├── background.js           # Service worker
├── server.js               # Express backend
├── claude-service.js       # Claude AI integration
└── package.json            # Node dependencies
```

## How It Works

1. **Profile Extraction**: Content script extracts your skills from your LinkedIn profile
2. **Job Analysis**: User pastes or provides a job description
3. **AI Matching**: Claude API analyzes both and provides:
   - Match percentage
   - Matched skills
   - Missing skills to develop
   - Personalized recommendations
4. **Results Display**: Beautiful UI shows all insights

## Technologies

- **Frontend**: Chrome Extension (Manifest V3)
- **Backend**: Node.js + Express
- **AI**: Hugging Face Free Tier (Mistral 7B)
- **Communication**: Chrome messaging API + HTTP
- **Cost**: Completely free! No credit card required

## Troubleshooting

### "Could not extract your LinkedIn profile"
- Make sure you're on your LinkedIn profile page (`linkedin.com/in/...`)
- Ensure your skills section is visible on the page
- Try refreshing the page

### "Analysis failed - Backend server error"
- Verify the backend is running: `npm start`
- Check your Claude API key is set in `.env`
- Server should be accessible at `http://localhost:3000`

### "API error: 429 (Too Many Requests)"
- Free tier has rate limits (~1 request/min)
- Wait a minute and try again
- Optional: Add your free Hugging Face token in `.env` for higher limits

## Development

To modify the extension:
1. Edit files as needed
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension
4. Changes will take effect immediately

For backend changes, restart the server: `npm start`

## API Reference

### POST /api/analyze
Analyzes job match between user profile and job description.

**Request:**
```json
{
  "userProfile": {
    "skills": ["JavaScript", "React", "Node.js"]
  },
  "jobDescription": "We're looking for a JavaScript developer..."
}
```

**Response:**
```json
{
  "matchPercentage": 85,
  "fitLevel": "Strong Match",
  "matchedSkills": ["JavaScript", "React"],
  "missingSkills": ["TypeScript", "Docker"],
  "recommendations": "You're a great fit! Consider learning TypeScript to stand out even more."
}
```

## License

MIT

## Contributing

Feel free to open issues and submit pull requests!
