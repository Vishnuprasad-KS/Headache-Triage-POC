import React, { useState } from 'react';
import { QuestionnaireData } from '../types';
import { cn } from '../utils/cn';

interface QuestionnaireFormProps {
  onSubmit: (data: QuestionnaireData) => void;
  isLoading: boolean;
}

const associatedSymptomsOptions = [
  { value: 'Nausea', label: 'Feeling sick to your stomach' },
  { value: 'Vomiting', label: 'Throwing up' },
  { value: 'Light sensitivity', label: 'Light hurts your eyes' },
  { value: 'Sound sensitivity', label: 'Sounds seem too loud' },
  { value: 'Dizziness', label: 'Feeling dizzy or unsteady' },
  { value: 'Fatigue', label: 'Feeling very tired' },
  { value: 'Neck stiffness', label: 'Stiff or sore neck' },
  { value: 'Confusion', label: 'Trouble thinking clearly' }
];

const neurologicalSymptomsOptions = [
  { value: 'Weakness', label: 'Weakness in arms or legs' },
  { value: 'Numbness', label: 'Numbness or tingling' },
  { value: 'Speech difficulties', label: 'Trouble speaking clearly' },
  { value: 'Memory problems', label: 'Trouble remembering things' },
  { value: 'Coordination issues', label: 'Trouble with balance or coordination' },
  { value: 'Seizures', label: 'Seizures or convulsions' },
  { value: 'Loss of consciousness', label: 'Fainting or passing out' },
  { value: 'Tremor', label: 'Shaking or trembling' }
];

const systemicSymptomsOptions = [
  { value: 'Fever', label: 'Fever or feeling hot' },
  { value: 'Weight loss', label: 'Losing weight without trying' },
  { value: 'Night sweats', label: 'Sweating a lot at night' },
  { value: 'Fatigue', label: 'Feeling extremely tired' },
  { value: 'Joint pain', label: 'Aching joints' },
  { value: 'Rash', label: 'Skin rash' },
  { value: 'Jaw claudication', label: 'Jaw pain when chewing' },
  { value: 'Scalp tenderness', label: 'Scalp feels sore to touch' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your Headache</h1>
          <p className="text-gray-600">Please answer these questions to help us understand your headache better. This will help determine if you need urgent medical care.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">How old are you?</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.age || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  required
                  min="1"
                  max="120"
                  placeholder="Enter your age"
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
          </div>

          {/* Headache Characteristics */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About Your Headache</h2>
            
            <div className="space-y-6">
              <div className="form-group">
                <label className="form-label">How did your headache start?</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-white">
                    <input
                      type="radio"
                      name="onset"
                      value="sudden"
                      checked={formData.headacheOnset === 'sudden'}
                      onChange={(e) => setFormData(prev => ({ ...prev, headacheOnset: e.target.value as any }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium">Very suddenly (like a thunderclap)</div>
                      <div className="text-sm text-gray-600">The worst headache of your life that came on in seconds</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-white">
                    <input
                      type="radio"
                      name="onset"
                      value="gradual"
                      checked={formData.headacheOnset === 'gradual'}
                      onChange={(e) => setFormData(prev => ({ ...prev, headacheOnset: e.target.value as any }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium">Gradually over hours or days</div>
                      <div className="text-sm text-gray-600">Started mild and got worse over time</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-white">
                    <input
                      type="radio"
                      name="onset"
                      value="chronic"
                      checked={formData.headacheOnset === 'chronic'}
                      onChange={(e) => setFormData(prev => ({ ...prev, headacheOnset: e.target.value as any }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium">I've had this type of headache for weeks or months</div>
                      <div className="text-sm text-gray-600">This is an ongoing problem</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Where does your head hurt?</label>
                <select
                  className="form-input"
                  value={formData.headacheLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, headacheLocation: e.target.value as any }))}
                  required
                >
                  <option value="unilateral">One side of my head</option>
                  <option value="bilateral">Both sides of my head</option>
                  <option value="frontal">My forehead area</option>
                  <option value="occipital">The back of my head</option>
                  <option value="temporal">My temple area</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">How bad is your pain? (1 = mild, 10 = worst pain ever)</label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Mild</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    className="flex-1"
                    value={formData.headacheSeverity}
                    onChange={(e) => setFormData(prev => ({ ...prev, headacheSeverity: parseInt(e.target.value) }))}
                  />
                  <span className="text-sm text-gray-600">Severe</span>
                  <span className="text-lg font-semibold w-8 text-center">{formData.headacheSeverity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Associated Symptoms */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Other Symptoms</h2>
            <p className="text-gray-600 mb-4">Check any other symptoms you're having along with your headache:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {associatedSymptomsOptions.map((symptom) => (
                <label key={symptom.value} className="flex items-start space-x-3 cursor-pointer p-2 rounded hover:bg-yellow-100">
                  <input
                    type="checkbox"
                    checked={formData.associatedSymptoms.includes(symptom.value)}
                    onChange={(e) => handleCheckboxChange('associatedSymptoms', symptom.value, e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-sm">{symptom.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Neurological Symptoms */}
          <div className="bg-red-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Concerning Symptoms</h2>
            <p className="text-gray-600 mb-4">Check if you're experiencing any of these more serious symptoms:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {neurologicalSymptomsOptions.map((symptom) => (
                <label key={symptom.value} className="flex items-start space-x-3 cursor-pointer p-2 rounded hover:bg-red-100">
                  <input
                    type="checkbox"
                    checked={formData.neurologicalSymptoms.includes(symptom.value)}
                    onChange={(e) => handleCheckboxChange('neurologicalSymptoms', symptom.value, e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-sm">{symptom.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Systemic Symptoms */}
          <div className="bg-orange-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">General Health Symptoms</h2>
            <p className="text-gray-600 mb-4">Check if you've noticed any of these general health changes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {systemicSymptomsOptions.map((symptom) => (
                <label key={symptom.value} className="flex items-start space-x-3 cursor-pointer p-2 rounded hover:bg-orange-100">
                  <input
                    type="checkbox"
                    checked={formData.systemicSymptoms.includes(symptom.value)}
                    onChange={(e) => handleCheckboxChange('systemicSymptoms', symptom.value, e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-sm">{symptom.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Questions */}
          <div className="bg-green-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">A Few More Questions</h2>
            
            <div className="space-y-6">
              <div className="form-group">
                <label className="form-label">Have you had headaches like this before?</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="previousHeadaches"
                      value="yes"
                      checked={formData.previousHeadaches === 'yes'}
                      onChange={(e) => setFormData(prev => ({ ...prev, previousHeadaches: e.target.value as any }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Yes, I've had similar headaches before</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="previousHeadaches"
                      value="no"
                      checked={formData.previousHeadaches === 'no'}
                      onChange={(e) => setFormData(prev => ({ ...prev, previousHeadaches: e.target.value as any }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>No, this is a new type of headache for me</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Did you hit your head recently?</label>
                  <select
                    className="form-input"
                    value={formData.recentTrauma}
                    onChange={(e) => setFormData(prev => ({ ...prev, recentTrauma: e.target.value as any }))}
                    required
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Are you having trouble seeing?</label>
                  <select
                    className="form-input"
                    value={formData.visionChanges}
                    onChange={(e) => setFormData(prev => ({ ...prev, visionChanges: e.target.value as any }))}
                    required
                  >
                    <option value="no">No, my vision is normal</option>
                    <option value="yes">Yes, my vision is different</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Do you have a fever?</label>
                  <select
                    className="form-input"
                    value={formData.feverPresent}
                    onChange={(e) => setFormData(prev => ({ ...prev, feverPresent: e.target.value as any }))}
                    required
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes, I feel hot or have a temperature</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">What medicines are you taking? (if any)</label>
                <textarea
                  className="form-input min-h-[80px]"
                  value={formData.medications}
                  onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
                  placeholder="List any medicines, vitamins, or supplements you take regularly..."
                />
                <p className="text-sm text-gray-500 mt-1">Include prescription drugs, over-the-counter medicines, vitamins, and supplements</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "btn-primary px-12 py-4 text-lg font-semibold",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? 'Checking Your Headache...' : 'Get My Headache Assessment'}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 text-sm">
            If you're having trouble understanding any question, it's okay to skip it or make your best guess. 
            The most important thing is to be honest about your symptoms.
          </p>
        </div>
      </div>
    </div>
  );
}