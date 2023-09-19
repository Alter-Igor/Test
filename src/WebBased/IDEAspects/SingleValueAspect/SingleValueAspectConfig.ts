export interface ISingleValueAspectConfiguration {
    fieldPath: string  | undefined,
    title: string  | undefined
    valueOnNotFound: string  | undefined,
    calculatedValue: string;
    calculatedTitle: string;
    searchParents:boolean | undefined,
    maxDepth:number | undefined,
    formatter: string | undefined,
}
