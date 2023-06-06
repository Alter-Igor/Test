export interface IWorkTypeContext {
    instanceId: string;
    aspectData: AspectData;
    id: () => string;
    canEdit: () => boolean;
    categoryId: () => string | undefined;
    currencyCode: () => string | undefined;
    description: () => string | undefined;
    externalReference: () => string | undefined;
    parentSharedoId: () => string | undefined;
    phaseIsOpen: () => string | undefined;
    phaseName: () => string | undefined;
    phaseSystemName: () => string | undefined;
    priorityId: () => string | undefined;
    reference: () => string | undefined;
    referenceIsUserProvided: () => string | undefined;
    sharedoTypeSystemName: () => string | undefined;
    timeZone: () => string | undefined;
    title: () => string | undefined;
    titleIsUserProvided: () => string | undefined;
}
export interface AspectData {
    workScheduling: WorkScheduling;
    odsEntityPicker: OdsEntityPicker;
    formBuilder: FormBuilder | undefined;
    taskAssignedTo: TaskAssignedTo;
    tags: Tags;
    mandatoryInPhase: MandatoryInPhase;
    taskDetails: TaskDetails;
    taskDueDate: TaskDueDate;
}
export interface TaskDueDate {
    id: string;
    dueDateTime: string;
    dueDateTime_TimeZone: string;
    reminders: any[];
}
export interface TaskDetails {
}
export interface MandatoryInPhase {
    transitions: Transition[];
    transitionSystemNames: any[];
}
export interface Transition {
    systemName: string;
    fromPhaseName: string;
    toPhaseName: string;
    sharedoTypeName: string;
    displayName: string;
}
export interface Tags {
    tags: any[];
}
export interface TaskAssignedTo {
    primaryOwner: string;
    displayName: string;
}
export interface FormBuilder {
    formData?: any;
    sharedoId: string;
    formId?: any;
    formIds: any[];
}
export interface OdsEntityPicker {
    odsEntities: any[];
}
export interface WorkScheduling {
    id: string;
    actualStart?: any;
    actualEnd?: any;
    restarted?: any;
    expectedStart?: any;
    expectedEnd: string;
    userProvidedExpectedStart: boolean;
    userProvidedExpectedEnd: boolean;
    linkDueDateToExpectedStart: boolean;
    linkDueDateToExpectedEnd: boolean;
}
