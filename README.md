# Headache Triage POC

A React 19 application for headache assessment using the SNNOOP10 criteria and Azure OpenAI integration.

## Features

- **Comprehensive Questionnaire**: Detailed form covering all aspects of headache presentation
- **SNNOOP10 Analysis**: AI-powered assessment using established red flag criteria
- **Color-Coded Results**: Visual representation of risk levels and categories
- **Azure OpenAI Integration**: Leverages GPT-4 for medical analysis
- **Responsive Design**: Works seamlessly across all devices
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

2. **Configure Azure OpenAI**:
   - Copy `.env.example` to `.env`
   - Fill in your Azure OpenAI credentials:
     ```
     VITE_AZURE_OPENAI_API_KEY=your_api_key_here
     VITE_AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com
     VITE_AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
     ```

3. **Run the Application**:
   ```bash
   npm run dev
   ```

## Azure OpenAI Setup

1. Create an Azure OpenAI resource in the Azure portal
2. Deploy a GPT-4 model
3. Get your API key and endpoint from the Azure portal
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
- **Azure OpenAI**: AI-powered medical analysis
- **Vite**: Fast development and build tool
- **Lucide React**: Modern icon library

## Development

The application follows modern React patterns with:
- Functional components with hooks
- TypeScript for type safety
- Modular component architecture
- Responsive design principles
- Accessibility considerations