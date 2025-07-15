export interface QuestionnaireData {
  age: number;
  gender: 'male' | 'female' | 'other';
  headacheOnset: 'sudden' | 'gradual' | 'chronic';
  headacheLocation: 'unilateral' | 'bilateral' | 'frontal' | 'occipital' | 'temporal';
  headacheSeverity: number; // 1-10 scale
  associatedSymptoms: string[];
  neurologicalSymptoms: string[];
  systemicSymptoms: string[];
  previousHeadaches: 'yes' | 'no';
  medications: string;
  recentTrauma: 'yes' | 'no';
  visionChanges: 'yes' | 'no';
  feverPresent: 'yes' | 'no';
}

export interface SNNOOP10Analysis {
  category: 'systemic' | 'neurological' | 'neoplasm' | 'onset' | 'older' | 'pattern' | 'papilledema' | 'low';
  riskLevel: 'high' | 'medium' | 'low';
  explanation: string;
  recommendations: string[];
  urgency: 'immediate' | 'urgent' | 'routine';
}

export interface AIResponse {
  analysis: SNNOOP10Analysis;
  reasoning: string;
}