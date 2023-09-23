

export interface ShareDoEvent {
    eventPath: string;
    eventName: string;
    source: any;
    data: any;
}


export function fireEvent(event:ShareDoEvent) {

    $ui.events.broadcast(event.eventPath, event);
}