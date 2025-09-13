export interface NexusNode {
  content: string;
  id: string;
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
