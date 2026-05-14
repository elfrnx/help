const axios = require('axios');

const HF_API_KEY = process.env.HF_API_KEY || 'hf_dummy'; // Free tier doesn't require key but we allow one
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1/v1/chat/completions';

async function analyzeJobMatch(userProfile, jobDescription) {
    const userSkillsList = userProfile.skills.join(', ');

    const prompt = `You are an expert career advisor. Analyze the job match between a user's profile and a job opening.

USER'S SKILLS: ${userSkillsList}

JOB DESCRIPTION: ${jobDescription}

Respond ONLY with valid JSON, no other text:
{
  "matchPercentage": <0-100>,
  "fitLevel": "<Perfect Match|Strong Match|Good Match|Moderate Match|Poor Match>",
  "matchedSkills": [<skills from user that match>],
  "missingSkills": [<skills needed for job>],
  "recommendations": "<2-3 sentences of advice>"
}`;

    try {
        const response = await axios.post(
            HF_API_URL,
            {
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${HF_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const content = response.data.choices[0].message.content;
        
        // Extract JSON from response (in case there's extra text)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Could not parse JSON from response');
        }
        
        const analysis = JSON.parse(jsonMatch[0]);
        return analysis;
    } catch (error) {
        console.error('Hugging Face API error:', error.response?.data || error.message);
        throw new Error(`Failed to analyze job match: ${error.message}`);
    }
}

module.exports = { analyzeJobMatch };
