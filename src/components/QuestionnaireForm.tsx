import React, { useState } from 'react';
import { QuestionnaireData } from '../types';
import { cn } from '../utils/cn';

interface QuestionnaireFormProps {
  onSubmit: (data: QuestionnaireData) => void;
  isLoading: boolean;
}

const associatedSymptomsOptions = [
  'Nausea', 'Vomiting', 'Light sensitivity', 'Sound sensitivity', 
  'Dizziness', 'Fatigue', 'Neck stiffness', 'Confusion'
];

const neurologicalSymptomsOptions = [
  'Weakness', 'Numbness', 'Speech difficulties', 'Memory problems',
  'Coordination issues', 'Seizures', 'Loss of consciousness', 'Tremor'
];

const systemicSymptomsOptions = [
  'Fever', 'Weight loss', 'Night sweats', 'Fatigue',
  'Joint pain', 'Rash', 'Jaw claudication', 'Scalp tenderness'
];

export function QuestionnaireForm({ onSubmit, isLoading }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<QuestionnaireData>({
    age: 0,
    gender: 'male',
    headacheOnset: 'gradual',
    headacheLocation: 'bilateral',
    headacheSeverity: 5,
    associatedSymptoms: [],
    neurologicalSymptoms: [],
    systemicSymptoms: [],
    previousHeadaches: 'no',
    medications: '',
    recentTrauma: 'no',
    visionChanges: 'no',
    feverPresent: 'no',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCheckboxChange = (
    field: 'associatedSymptoms' | 'neurologicalSymptoms' | 'systemicSymptoms',
    value: string,
    checked: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Headache Assessment</h1>
          <p className="text-gray-600">Please answer all questions to help us assess your headache symptoms.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-input"
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                required
                min="1"
                max="120"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-input"
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Headache Characteristics */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Headache Characteristics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Headache Onset</label>
                <select
                  className="form-input"
                  value={formData.headacheOnset}
                  onChange={(e) => setFormData(prev => ({ ...prev, headacheOnset: e.target.value as any }))}
                  required
                >
                  <option value="sudden">Sudden (seconds to minutes)</option>
                  <option value="gradual">Gradual (hours to days)</option>
                  <option value="chronic">Chronic (weeks to months)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Headache Location</label>
                <select
                  className="form-input"
                  value={formData.headacheLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, headacheLocation: e.target.value as any }))}
                  required
                >
                  <option value="unilateral">One side of head</option>
                  <option value="bilateral">Both sides of head</option>
                  <option value="frontal">Forehead area</option>
                  <option value="occipital">Back of head</option>
                  <option value="temporal">Temple area</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pain Severity (1-10 scale)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="flex-1"
                  value={formData.headacheSeverity}
                  onChange={(e) => setFormData(prev => ({ ...prev, headacheSeverity: parseInt(e.target.value) }))}
                />
                <span className="text-lg font-semibold w-8">{formData.headacheSeverity}</span>
              </div>
            </div>
          </div>

          {/* Associated Symptoms */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Associated Symptoms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {associatedSymptomsOptions.map((symptom) => (
                <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.associatedSymptoms.includes(symptom)}
                    onChange={(e) => handleCheckboxChange('associatedSymptoms', symptom, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Neurological Symptoms */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Neurological Symptoms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {neurologicalSymptomsOptions.map((symptom) => (
                <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.neurologicalSymptoms.includes(symptom)}
                    onChange={(e) => handleCheckboxChange('neurologicalSymptoms', symptom, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Systemic Symptoms */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Systemic Symptoms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {systemicSymptomsOptions.map((symptom) => (
                <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.systemicSymptoms.includes(symptom)}
                    onChange={(e) => handleCheckboxChange('systemicSymptoms', symptom, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Questions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Previous similar headaches?</label>
                <select
                  className="form-input"
                  value={formData.previousHeadaches}
                  onChange={(e) => setFormData(prev => ({ ...prev, previousHeadaches: e.target.value as any }))}
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Recent head trauma?</label>
                <select
                  className="form-input"
                  value={formData.recentTrauma}
                  onChange={(e) => setFormData(prev => ({ ...prev, recentTrauma: e.target.value as any }))}
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Vision changes?</label>
                <select
                  className="form-input"
                  value={formData.visionChanges}
                  onChange={(e) => setFormData(prev => ({ ...prev, visionChanges: e.target.value as any }))}
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Fever present?</label>
                <select
                  className="form-input"
                  value={formData.feverPresent}
                  onChange={(e) => setFormData(prev => ({ ...prev, feverPresent: e.target.value as any }))}
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Current medications (optional)</label>
              <textarea
                className="form-input min-h-[80px]"
                value={formData.medications}
                onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
                placeholder="List any current medications..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "btn-primary px-8 py-3 text-base",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Headache'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}