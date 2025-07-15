import React from 'react';
import { AIResponse } from '../types';
import { AlertTriangle, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '../utils/cn';

interface ResultsDisplayProps {
  result: AIResponse;
  onReset: () => void;
}

const categoryColors = {
  systemic: 'bg-red-flag-systemic',
  neurological: 'bg-red-flag-neurological',
  neoplasm: 'bg-red-flag-neoplasm',
  onset: 'bg-red-flag-onset',
  older: 'bg-red-flag-older',
  pattern: 'bg-red-flag-pattern',
  papilledema: 'bg-red-flag-papilledema',
  low: 'bg-red-flag-low',
};

const categoryLabels = {
  systemic: 'Systemic Symptoms',
  neurological: 'Neurological Signs',
  neoplasm: 'Neoplasm History',
  onset: 'Sudden Onset',
  older: 'Older Age New Headache',
  pattern: 'Pattern Change',
  papilledema: 'Papilledema/Visual Changes',
  low: 'Low Risk',
};

const riskIcons = {
  high: <AlertTriangle className="w-6 h-6" />,
  medium: <Clock className="w-6 h-6" />,
  low: <CheckCircle className="w-6 h-6" />,
};

const urgencyColors = {
  immediate: 'bg-red-600 text-white',
  urgent: 'bg-orange-500 text-white',
  routine: 'bg-green-600 text-white',
};

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const { analysis, reasoning } = result;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onReset}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Assessment</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Main Result Card */}
        <div className="card p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Results</h1>
              <p className="text-gray-600">SNNOOP10 Red Flag Analysis</p>
            </div>
            <div className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold",
              urgencyColors[analysis.urgency]
            )}>
              {analysis.urgency.toUpperCase()}
            </div>
          </div>

          {/* SNNOOP10 Category */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center text-white",
                categoryColors[analysis.category]
              )}>
                {riskIcons[analysis.riskLevel]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {categoryLabels[analysis.category]}
                </h2>
                <p className="text-lg text-gray-600 capitalize">
                  {analysis.riskLevel} Risk Level
                </p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analysis</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-800 leading-relaxed">{analysis.explanation}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-gray-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Reasoning */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Reasoning</h3>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-800 leading-relaxed">{reasoning}</p>
            </div>
          </div>
        </div>

        {/* SNNOOP10 Reference Card */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SNNOOP10 Red Flags Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-systemic rounded"></div>
                <span><strong>S:</strong> Systemic symptoms</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-neurological rounded"></div>
                <span><strong>N:</strong> Neurological symptoms</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-neoplasm rounded"></div>
                <span><strong>N:</strong> Neoplasm history</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-onset rounded"></div>
                <span><strong>O:</strong> Onset sudden</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-older rounded"></div>
                <span><strong>O:</strong> Older age (>50)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-pattern rounded"></div>
                <span><strong>P:</strong> Pattern change</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-papilledema rounded"></div>
                <span><strong>P:</strong> Papilledema</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-flag-low rounded"></div>
                <span><strong>Low Risk:</strong> No red flags</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Medical Disclaimer</h4>
              <p className="text-yellow-700 text-sm">
                This assessment is for educational purposes only and should not replace professional medical advice. 
                Always consult with a qualified healthcare provider for proper diagnosis and treatment of headaches, 
                especially if you have concerning symptoms or red flags.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}