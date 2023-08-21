

export interface IPhaseFeatures {
  systemName: string;
  displayName: string;
  description: string;
  enabled: boolean;
  configurable: boolean;
  sharedoLevel: boolean;
  phaseLevel: boolean;
  isSystem: boolean;
  parentGlobalFeatureInstance?: IParentGlobalFeatureInstance;
}

export interface IParentGlobalFeatureInstance {
  systemName: string;
  displayName: string;
  description: string;
  category: string;
  enabled: boolean;
  configurable: boolean;
  configurationValid: boolean;
  icon: string;
  dependencies?: any;
  dependents?: any;
  childFeatures?: any;
  isSystem: boolean;
  available: boolean;
  isEnvironmentSpecific: boolean;
  hidden: boolean;
}