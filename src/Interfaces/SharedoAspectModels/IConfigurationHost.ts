

/**
 * This is a stub for the 'IConfigurationHost' interface.
 * When a IDEAspect is loaded, it is passed a 'configuration' object.
 * This configuration object includes a '_host' property which is an instance of 'IConfigurationHost'.
 */
export interface IConfigurationHost {
    _host?: IHost | undefined
}


export interface IHost {
    blade: Sharedo.Core.Case.Sharedo.AddEditSharedo;
    enabled: ko.Observable<boolean>; // Using 'any' for return type as it's not clear what these functions return
    model: Sharedo.Core.Case.Sharedo.Models.Sharedo;
}


