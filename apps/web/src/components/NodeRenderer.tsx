const NodeRenderer = async ({ repo, node }: { repo?: string, node: string }) => {

  const REPO: Map<string, string> = new Map<string, string>([
    ['default', 'http://localhost:3000'],
  ]);

  let baseUrl;
  if (repo) {
    baseUrl = REPO.get(repo) || 'http://localhost:3000';
  } else {
    baseUrl = 'http://localhost:3000';
  }

  let response = await fetch(baseUrl + '/api/nodes/' + node)

  if (!response.ok) {
    return <div>Error fetching node data</div>;
  }
  let nodeData = await response.json();
  let nodeContent = nodeData.content;


  return <div dangerouslySetInnerHTML={{ __html: nodeContent }} />;
}

export default NodeRenderer;
