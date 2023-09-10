export interface IPhasePlan {
  systemName: string;
  sharedoTypeSystemName: string;
  name: string;
  inUse: boolean;
  canBeOverriden: boolean;
  isRoot: boolean;
  phases: Phase[];
  transitions: Transition[];
  graphLayout: string;
}

export interface Transition {
  systemName: string;
  fromPhaseSystemName: string;
  toPhaseSystemName: string;
  name: string;
  description?: any;
  transitionWaitTimeSeconds?: any;
  isOptimumPath: boolean;
  isUserDriven: boolean;
  reasonIsMandatory: boolean;
  reasonOptionSetName?: any;
  closeUI: boolean;
  closeUIAction?: any;
  alwaysShowPhaseChangeInformation: boolean;
}

export interface Phase {
  systemName: string;
  name: string;
  description?: string;
  shortName: string;
  iconClass: string;
  colour?: string;
  isStart: boolean;
  isOpen: boolean;
  isRemoved: boolean;
  isSystemClosedPhase: boolean;
  expectedDurationSeconds?: any;
  isReportable: boolean;
  includeInLifecycleCalculations: boolean;
}