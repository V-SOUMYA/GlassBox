
export interface RiskFlag {
  severity: 'high' | 'medium' | 'low';
  message: string;
}

// Added missing BiasResponse interface for BiasDashboard component
export interface BiasResponse {
  fairness_metrics: {
    disparate_impact: number;
    statistical_parity_difference: number;
    equal_opportunity_difference: number;
    average_odds_difference: number;
  };
  group_analysis: {
    group: string;
    count: number;
    avg_prediction: number;
    avg_actual: number;
    rmse: number;
  }[];
}

// Added missing FeatureImportanceResponse interface for FeatureChart component
export interface FeatureImportanceResponse {
  feature_importances: Record<string, number>;
}

// Added missing LocalExplanationResponse interface for LocalExplanation component
export interface LocalExplanationResponse {
  prediction: number;
  contributions: Record<string, number>;
}

export interface ProjectResponse {
  code_analysis: Record<string, string | number>;
  dataset_profile: Record<string, string | number>;
  risk_flags: (string | RiskFlag)[];
  project_summary: string;
  simple_explanation: string;
}

export interface GlassBoxState {
  projectData: ProjectResponse | null;
  loading: boolean;
  error: string | null;
}
