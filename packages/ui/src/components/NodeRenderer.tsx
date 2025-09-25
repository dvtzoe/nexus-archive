import type { NodePointer } from "@nexus-archive/types";

const NodeRenderer = async ({
  repo,
  node,
}: {
  repo?: string;
  node: string;
}) => {
  const REPO: Map<string, string> = new Map<string, string>([
    ["default", "http://localhost:3000"],
  ]);

  const baseUrl = REPO.get(repo || "default") || "http://localhost:3000";

  let nodePointerResponse: Response;
  try {
    nodePointerResponse = await fetch(`${baseUrl}/api/node/${node}`);
    if (!nodePointerResponse.ok) {
      return <div>Error fetching node data</div>;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <div>Error fetching node data: {errorMessage}</div>;
  }

  const nodeData: NodePointer = await nodePointerResponse.json();
  const nodeAddress = nodeData.address;

  let nodeContentResponse: Response;
  try {
    nodeContentResponse = await fetch(nodeAddress);
    if (!nodeContentResponse.ok) {
      return <div>Error fetching node content</div>;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <div>Error fetching node content: {errorMessage}</div>;
  }

  const nodeContent = await nodeContentResponse.text();

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trust
      dangerouslySetInnerHTML={{ __html: nodeContent }}
    />
  );
};

export default NodeRenderer;
