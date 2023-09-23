

export interface IRefreshWatcherConfiguration {
  widgets: IRefreshWatcherWidget[];
  useIntervalRefreshEveryXSeconds: boolean;
  refreshOnEvents: boolean;
  eventsToListenTo: IRefreshWatcherEventsToListenTo[];
  intervalSeconds: number | undefined;
}

export interface IRefreshWatcherEventsToListenTo {
  eventName: string;
}

export interface IRefreshWatcherWidget {
  typeName: string;
  methodToExecute: string;
  parameters: string[] | undefined;
}
