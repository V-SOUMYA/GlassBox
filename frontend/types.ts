
export interface GroupAnalysis {
  group: string;
  count: number;
  avg_prediction: number;
  avg_actual: number;
  rmse: number;
}

export interface FairnessMetrics {
  disparate_impact: number;
  statistical_parity_difference: number;
  equal_opportunity_difference: number;
  average_odds_difference: number;
  [key: string]: number;
}

export interface BiasResponse {
  group_analysis: GroupAnalysis[];
  fairness_metrics: FairnessMetrics;
}

export interface FeatureImportanceResponse {
  feature_importances: Record<string, number>;
}

export interface LocalExplanationResponse {
  prediction: number;
  contributions: Record<string, number>;
}

export interface GlassBoxState {
  bias: BiasResponse | null;
  importance: FeatureImportanceResponse | null;
  local: LocalExplanationResponse | null;
  loading: boolean;
  error: string | null;
}
