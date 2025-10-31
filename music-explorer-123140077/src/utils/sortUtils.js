export function sortResults(data, sortBy) {
  const sorted = [...data]

  if (sortBy === "price-asc") {
    sorted.sort((a, b) => (a.trackPrice || a.collectionPrice || 0) - (b.trackPrice || b.collectionPrice || 0))
  } else if (sortBy === "price-desc") {
    sorted.sort((a, b) => (b.trackPrice || b.collectionPrice || 0) - (a.trackPrice || a.collectionPrice || 0))
  } else if (sortBy === "date") {
    sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
  }

  return sorted
}
