const NodeRenderer = async ({ id }: { id: string }) => {

  let response = await fetch('http://localhost:3000/api/nodes/' + id)

  if (!response.ok) {
    throw new Error('Failed to fetch node content');
  }
  let nodeData = await response.json();
  let nodeContent = nodeData.content;


  return <div dangerouslySetInnerHTML={{ __html: nodeContent }} />;
}

export default NodeRenderer;
