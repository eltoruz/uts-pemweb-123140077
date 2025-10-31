import { useState } from "react"

export default function useItunesApi() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchResults = async (keyword, mediaType) => {
    if (!keyword.trim()) {
      setError("Masukkan keyword pencarian")
      return
    }

    setLoading(true)
    setError("")
    setResults([])

    try {
      const entityMap = {
        song: "song",
        album: "album",
        artist: "allArtist",
        podcast: "podcast",
      }

      const entity = entityMap[mediaType] || "song"

      const url = new URL("https://itunes.apple.com/search")
      url.searchParams.append("term", keyword)
      url.searchParams.append("entity", entity)
      url.searchParams.append("limit", "200")

      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const data = await response.json()
      if (!data.results?.length) {
        setError("Tidak ada hasil pencarian.")
        setResults([])
      } else {
        const filtered = filterResultsByMediaType(data.results, mediaType)
        setResults(filtered)
      }
    } catch (err) {
      setError(`Gagal mengambil data: ${err.message}`)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const filterResultsByMediaType = (results, type) => {
    return results.filter((item) => {
      if (type === "song") return item.kind === "song"
      if (type === "album") return item.wrapperType === "collection"
      if (type === "artist") return item.wrapperType === "artist"
      return true
    })
  }

  return { results, loading, error, fetchResults }
}
