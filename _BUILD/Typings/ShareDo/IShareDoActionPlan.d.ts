interface IShareDoActionPlan {
    items: IShareDoActionPlanItem[];
    id: string;
    sharedoId: string;
    title: string;
    description?: any;
    isDeleted: boolean;
    canEdit: boolean;
}
interface IShareDoActionPlanItem {
    id: string;
    relatedItemId?: any;
    actionPlanItemType: string;
    description: string;
    value: string;
    iconClass: string;
    widgetSystemName: string;
    comment?: any;
    allowComment: boolean;
    allowAction: boolean;
    actionMenuOptionId?: any;
    actionMenuOptionTitle?: any;
    order: number;
    isComplete: boolean;
    completedByUserId?: any;
    completedByFirstName?: any;
    completedByLastName?: any;
    completedDate?: any;
    required: boolean;
    skipped: boolean;
    options?: any;
    isDeleted: boolean;
    hasComments: boolean;
    callToActionCommand?: any;
    callToActionCommandConfiguration?: any;
    callToActionTitle?: any;
    callToActionIcon?: any;
    callToActionCss?: any;
    callToActionStyles?: any;
    callToActionContextType?: any;
    callToActionContextId?: any;
    callToActionInvoke?: any;
}
