import React, { useState } from 'react';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeHeadache } from './services/azureOpenAI';
import { QuestionnaireData, AIResponse } from './types';
import { Brain } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState<'questionnaire' | 'results'>('questionnaire');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);

  const handleQuestionnaireSubmit = async (data: QuestionnaireData) => {
    setIsLoading(true);
    try {
      const analysis = await analyzeHeadache(data);
      setResult(analysis);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error analyzing headache:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep('questionnaire');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Headache Triage</h1>
                <p className="text-sm text-gray-500">SNNOOP10 Assessment Tool</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Powered by Azure OpenAI
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {currentStep === 'questionnaire' && (
          <QuestionnaireForm 
            onSubmit={handleQuestionnaireSubmit} 
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 'results' && result && (
          <ResultsDisplay 
            result={result} 
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              This tool is for educational purposes only and should not replace professional medical advice.
            </p>
            <p>
              Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;