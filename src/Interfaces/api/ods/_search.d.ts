
export interface IODSSearchPostBody
{ 
    startPage: number;
     endPage: number;
     rowsPerPage: number;
     searchString: string;
     odsEntityTypes: never[];
     availability: { isAvailable: null;
         isOutOfOffice: null;
         isNotAvailable: null;
     };
     location: { postcode: null;
         range: number;
     };
     connection: { systemName: null;
     };
     competencies: never[];
     teams: never[];
     roles: never[];
     odsTypes: string[];
     wallManagement: boolean;
 } 