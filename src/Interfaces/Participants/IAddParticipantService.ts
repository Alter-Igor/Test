
    // Define the shape of the arguments for the AddParticipantService
    export interface IAddParticipantServiceArgs {
        sharedoId: string | number; // Depending on the type of sharedoId
        sharedoTypeSystemName: string;
        roleSystemNames: string[]; 
        selectedEntity: any; // You might need to specify a more specific type here
        defaultToSearch?: boolean; // The ? denotes it's optional
    }

    