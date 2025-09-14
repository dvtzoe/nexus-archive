const NodeRenderer = async ({ repo, node }: { repo?: string, node?: string }) => {
  if (!node || !repo) {
    return <div>Must specify both repo and node</div>;
  }

  let response = await fetch('http://localhost:3000/api/nodes/' + node)

  if (!response.ok) {
    return <div>Error fetching node data</div>;
  }
  let nodeData = await response.json();
  let nodeContent = nodeData.content;


  return <div dangerouslySetInnerHTML={{ __html: nodeContent }} />;
}

export default NodeRenderer;
