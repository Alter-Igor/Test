
export interface IWidget {
  enabled: ko.Observable<boolean>,
  description: ko.Observable<string>,
  reference: ko.Observable<string>,
  widgetExpanded: ko.Observable<boolean>,
  validationErrorCount?: ko.Computed<number>,
  displayStyle: string,
  bladeOpen: boolean,
  base: IWidgetBase,
  [key: string]: any | undefined
}

export interface IWidgetBase {
  systemName: string,
  id: string,
  title:  ko.Observable<string>,
  isExpanded: ko.Observable<boolean>,
  hasTitle: ko.Observable<boolean>,
  canContextCollapse: ko.Observable<boolean>,
  icon: ko.Observable<string>,
  canExpandCollapse: ko.Observable<boolean>,
  helpText: ko.Observable<string>
}
