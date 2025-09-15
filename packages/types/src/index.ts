export interface NexusNode {
  content: string;
  id: string;
  isEntryPoint?: boolean;
}

export interface Link {
  id: string;
  prevNodeRepository: string;
  prevNodeId: string;
  nextNodeRepository?: string;
  nextNodeId?: string;
}

export interface LinkList {
  id: string;
  links: Link[];
}
