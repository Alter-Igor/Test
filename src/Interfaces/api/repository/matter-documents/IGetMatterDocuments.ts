interface IGetMatterDocumentsResponse {
  capabilities: string[];
  items: Item[];
  repositoryUrl: string;
}

interface Item {
  type: number;
  id: string;
  pathId: string;
  name: string;
  title: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  createdDate: string;
  meta: Meta;
  size?: number;
  extension?: string;
  icon?: string;
  url?: string;
  urls?: Url[];
  downloadUrl?: string;
  urlMeta?: UrlMeta;
  versions?: any[];
  editMetaUrl?: string;
}

interface UrlMeta {
}

interface Url {
  label: string;
  url: string;
  isDownloadUrl: boolean;
}

interface Meta {
  '@odata.etag'?: string;
  fileLeafRef?: string;
  title?: string;
  mediaServiceImageTags?: string;
  id?: string;
  contentType?: string;
  created?: string;
  authorLookupId?: string;
  modified?: string;
  editorLookupId?: string;
  _CheckinComment?: string;
  linkFilenameNoMenu?: string;
  linkFilename?: string;
  docIcon?: string;
  fileSizeDisplay?: string;
  itemChildCount?: string;
  folderChildCount?: string;
  _ComplianceFlags?: string;
  _ComplianceTag?: string;
  _ComplianceTagWrittenTime?: string;
  _ComplianceTagUserId?: string;
  _CommentCount?: string;
  _LikeCount?: string;
  _DisplayName?: string;
  appAuthorLookupId?: string;
  appEditorLookupId?: string;
  edit?: string;
  _UIVersionString?: string;
  parentVersionStringLookupId?: string;
  parentLeafNameLookupId?: string;
}