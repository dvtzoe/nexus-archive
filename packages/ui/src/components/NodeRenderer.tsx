import { type NodePointer } from "@nexus-archive/types";

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

  let baseUrl;
  if (repo) {
    baseUrl = REPO.get(repo) || "http://localhost:3000";
  } else {
    baseUrl = "http://localhost:3000";
  }

  let nodePointerResponse;
  try {
    nodePointerResponse = await fetch(baseUrl + "/api/node/" + node);
    if (!nodePointerResponse.ok) {
      return <div>Error fetching node data</div>;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    let errorMessage = error instanceof Error ? error.message : String(error);
    return <div>Error fetching node data: {errorMessage}</div>;
  }

  let nodeData: NodePointer = await nodePointerResponse.json();
  let nodeAddress = nodeData.address;

  let nodeContentResponse;
  try {
    nodeContentResponse = await fetch(nodeAddress);
    if (!nodeContentResponse.ok) {
      return <div>Error fetching node content</div>;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    let errorMessage = error instanceof Error ? error.message : String(error);
    return <div>Error fetching node content: {errorMessage}</div>;
  }

  let nodeContent = await nodeContentResponse.text();

  return <div dangerouslySetInnerHTML={{ __html: nodeContent }} />;
};

export default NodeRenderer;
