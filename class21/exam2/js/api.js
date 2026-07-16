export async function getFestivalData() {
  const artistResponse = await fetch("./artists.json");

  const performanceResponse = await fetch("./performances.json");

  const responses = Promise.all([artistResponse, performanceResponse]);

  if (!responses.ok) {
      if (!artistResponse.ok) {
        throw new Error(
          `Artist data could not be loaded. HTTP status: ${artistResponse.status}`
        );
      }
      
      if (!performanceResponse.ok) {
        throw new Error(
          `Performance data could not be loaded. HTTP status: ${artistResponse.status}`
        );
      }
  }

  const artists = artistResponse.json();

  const performances = performanceResponse.json();

  return {
    artist: artists,
    performance: performances,
  };
}
