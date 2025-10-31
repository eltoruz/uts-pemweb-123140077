import { useState, useEffect } from "react"

export default function usePlaylist() {
  const [playlist, setPlaylist] = useState([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load playlist dari localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("musicPlaylist")
      if (saved) setPlaylist(JSON.parse(saved))
    } catch (err) {
      console.error("Error loading playlist:", err)
    }
    setIsHydrated(true)
  }, [])

  // Simpan playlist ke localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("musicPlaylist", JSON.stringify(playlist))
      } catch (err) {
        console.error("Error saving playlist:", err)
      }
    }
  }, [playlist, isHydrated])

  const addToPlaylist = (track) => {
    setPlaylist((prev) => {
      if (!prev.find((item) => item.trackId === track.trackId)) {
        return [...prev, track]
      }
      return prev
    })
  }

  const removeFromPlaylist = (trackId) => {
    setPlaylist((prev) => prev.filter((item) => item.trackId !== trackId))
  }

  return { playlist, addToPlaylist, removeFromPlaylist, isHydrated }
}
