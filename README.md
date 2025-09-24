# Headache Triage POC

A React 19 application for headache assessment using the SNNOOP10 criteria and Corti LLM integration.

## Features

- **Comprehensive Questionnaire**: Detailed form covering all aspects of headache presentation
- **SNNOOP10 Analysis**: AI-powered assessment using established red flag criteria
- **Color-Coded Results**: Visual representation of risk levels and categories
- **Corti LLM Integration**: Leverages Corti's medical AI for specialized headache analysis
- **Responsive Design**: Works seamlessly across all devices
- **Node.js Backend**: Express server handling API requests
- **Medical Disclaimers**: Appropriate warnings about the tool's limitations

## SNNOOP10 Red Flags

The application assesses headaches based on the SNNOOP10 criteria:

- **S**: Systemic symptoms (fever, weight loss, etc.)
- **N**: Neurological symptoms or signs
- **N**: Neoplasm in history
- **O**: Onset sudden or split-second
- **O**: Older age (>50 years) with new headache
- **P**: Pattern change or recent onset of new headache
- **P**: Papilledema, pulsatile tinnitus, or visual changes
- **1**: Immunocompromised
- **0**: Other concerning features

## Setup

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Configure Corti LLM**:
   - Copy `.env.example` to `.env`
   - Fill in your Corti API credentials:
     ```
     CORTI_API_KEY=your_corti_api_key_here
     CORTI_API_URL=https://api.corti.ai/v1/chat/completions
     CORTI_MODEL=corti-chat
     ```

3. **Run the Full Application**:
   ```bash
   npm run dev:full
   ```
   
   Or run frontend and backend separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run dev
   ```

## Corti LLM Setup

1. Sign up for a Corti account at [corti.ai](https://corti.ai)
2. Get your API key from the Corti dashboard
3. Configure the model and endpoint in your `.env` file
4. Update the `.env` file with your credentials

## Usage

1. **Fill out the questionnaire** with detailed headache information
2. **Submit the form** to trigger AI analysis
3. **Review the results** showing:
   - SNNOOP10 category classification
   - Risk level assessment
   - Detailed recommendations
   - Medical reasoning
   - Urgency level

## Color Coding

Each SNNOOP10 category has a distinct color:
- **Systemic**: Red (#dc2626)
- **Neurological**: Orange (#ea580c)
- **Neoplasm**: Dark amber (#7c2d12)
- **Onset**: Dark red (#991b1b)
- **Older**: Amber (#b45309)
- **Pattern**: Orange (#c2410c)
- **Papilledema**: Amber (#92400e)
- **Low Risk**: Green (#16a34a)

## Medical Disclaimer

This application is for educational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment of headaches.

## Technology Stack

- **React 19**: Latest React with modern features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Node.js & Express**: Backend API server
- **Corti LLM**: Specialized medical AI for headache analysis
- **Vite**: Fast development and build tool
- **Lucide React**: Modern icon library

## Development

The application follows modern React patterns with:
- Functional components with hooks
- TypeScript for type safety
- Modular component architecture
- Responsive design principles
- Accessibility considerations

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/ask` - Headache analysis using Corti LLM

## Environment Variables

### Frontend (.env)
- `VITE_BASE_URL` - Backend server URL (default: http://localhost:8000/)

### Backend (.env)
- `CORTI_API_KEY` - Your Corti API key
- `CORTI_API_URL` - Corti API endpoint
- `CORTI_MODEL` - Corti model to use
- `PORT` - Server port (default: 8000)