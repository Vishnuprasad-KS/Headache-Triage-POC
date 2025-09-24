import { QuestionnaireData, AIResponse } from '../types';

const SYSTEM_PROMPT = `You are a medical AI assistant specialized in headache triage using the SNNOOP10 criteria for identifying red flags in headache patients.

SNNOOP10 Red Flags:
- S: Systemic symptoms (fever, weight loss, etc.)
- N: Neurological symptoms or signs
- N: Neoplasm in history
- O: Onset sudden or split-second
- O: Older age (>50 years) with new headache
- P: Pattern change or recent onset of new headache
- P: Papilledema, pulsatile tinnitus, or visual changes
- 1: Immunocompromised
- 0: Other concerning features

Based on the patient questionnaire data, analyze the headache presentation and:
1. Identify which SNNOOP10 category best fits (if any)
2. Determine risk level (high/medium/low)
3. Provide clear explanation
4. Give specific recommendations
5. Assign urgency level

Respond in JSON format with the following structure:
{
  "analysis": {
    "category": "systemic|neurological|neoplasm|onset|older|pattern|papilledema|low",
    "riskLevel": "high|medium|low",
    "explanation": "Clear explanation of findings",
    "recommendations": ["recommendation1", "recommendation2"],
    "urgency": "immediate|urgent|routine"
  },
  "reasoning": "Detailed medical reasoning"
}`;

export async function analyzeHeadache(data: QuestionnaireData): Promise<AIResponse> {
  try {
    const userPrompt = `
Patient Information:
- Age: ${data.age}
- Gender: ${data.gender}
- Headache Onset: ${data.headacheOnset}
- Location: ${data.headacheLocation}
- Severity (1-10): ${data.headacheSeverity}
- Associated Symptoms: ${data.associatedSymptoms.join(', ') || 'None'}
- Neurological Symptoms: ${data.neurologicalSymptoms.join(', ') || 'None'}
- Systemic Symptoms: ${data.systemicSymptoms.join(', ') || 'None'}
- Previous Headaches: ${data.previousHeadaches}
- Current Medications: ${data.medications || 'None'}
- Recent Trauma: ${data.recentTrauma}
- Vision Changes: ${data.visionChanges}
- Fever Present: ${data.feverPresent}

Please analyze this headache presentation using SNNOOP10 criteria.
    `;

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
    const response = await fetch(`${baseUrl}api/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch response`);
    }

    const responseData: any = await response.json();

    const content = responseData.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI model');
    }

    return JSON.parse(content) as AIResponse;
  } catch (error) {
    console.error('Error calling Corti LLM:', error);
    
    // Fallback response for demo purposes
    return {
      analysis: {
        category: 'low',
        riskLevel: 'low',
        explanation: 'Unable to connect to Corti LLM service. This is a demo response showing how the system would work.',
        recommendations: [
          'Please configure Corti API credentials in your .env file',
          'Consult with a healthcare provider for proper medical evaluation',
          'Monitor symptoms and seek immediate care if they worsen'
        ],
        urgency: 'routine'
      },
      reasoning: 'Corti LLM service unavailable - demo mode active. Please check your API configuration and network connection.'
    };
  }
}