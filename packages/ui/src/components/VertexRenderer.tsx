const VertexRenderer = async ({
  repo,
  slug,
}: {
  repo: string;
  slug: string;
}) => {
  let vertexResponses: Response;
  try {
    vertexResponses = await fetch(`${repo}/api/vertex/${slug}`);
    if (!vertexResponses.ok) {
      return <div>Error fetching vertex data</div>;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <div>Error fetching vertex data: {errorMessage}</div>;
  }

  const vertexData = await vertexResponses.json();

  let vertexContentResponse: Response;
  try {
    vertexContentResponse = await fetch(vertexData.address);
    if (!vertexContentResponse.ok) {
      return <div>Error fetching vertex content</div>;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <div>Error fetching vertex content: {errorMessage}</div>;
  }

  const vertexContent = await vertexContentResponse.text();

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trust
      dangerouslySetInnerHTML={{ __html: vertexContent }}
    />
  );
};

export default VertexRenderer;
