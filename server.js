require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Analyze route inline
const { analyzeJobMatch } = require('./hf-service');

app.post('/api/analyze', async (req, res) => {
    try {
        const { userProfile, jobDescription } = req.body;

        if (!userProfile || !jobDescription) {
            return res.status(400).json({
                error: 'Missing userProfile or jobDescription'
            });
        }

        console.log('Analyzing job match...');
        const analysis = await analyzeJobMatch(userProfile, jobDescription);

        res.json(analysis);
    } catch (error) {
        console.error('Route error:', error);
        res.status(500).json({
            error: error.message || 'Analysis failed'
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Using Hugging Face AI (Free Tier) - No API key needed!`);
});
