interface IRelatedDocument {
  id: string;
  sharedoId: string;
  title: string;
  displayOrder: number;
  iconClass: string;
  documentId: string;
  documentAttributes?: any;
  repositoryId: string;
  repositoryContext: string;
  filingState: string;
  filedInSharedoId?: any;
  isPrivate: boolean;
  documentTemplatePackContentId?: any;
  documentType?: any;
}

type GetRelatedDocumentsResponse = IRelatedDocument[];