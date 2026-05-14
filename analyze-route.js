const express = require('express');
const { analyzeJobMatch } = require('../claude-service');

const router = express.Router();

router.post('/', async (req, res) => {
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

module.exports = router;
