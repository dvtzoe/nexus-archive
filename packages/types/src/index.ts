export interface NodePointer {
  id: string;
  isEntryPoint?: boolean;
  address: string;
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
