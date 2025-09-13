export type Protocol = 'http' | 'https';
export type ContentType = 'mdx' | 'html' | 'text';
export interface NodeMetadata {
    id: string;
    title: string;
    protocol: Protocol;
    isEntryPoint: boolean;
}
export interface Node extends NodeMetadata {
    content: string;
    contentType: ContentType;
}
export interface NodeReference {
    id: string;
    protocol: string;
    repositoryServer: string;
}
export interface Link {
    id: string;
    previousNodeRepository: string;
    previousNodeId: string;
    nextNodeRepository?: string;
    nextNodeId?: string;
}
export interface LinkList {
    id: string;
    links: Link[];
}
