import { useRef, useState } from "react"

function Playlist({ playlist, isHydrated, onRemove }) {
  const [playingTrackId, setPlayingTrackId] = useState(null)
  const audioRef = useRef(null)

  const handlePlayPreview = (track) => {
    if (!track.previewUrl) return

    const audio = audioRef.current
    if (!audio) return

    // Jika track yang sama sedang dimainkan → pause
    if (playingTrackId === track.trackId) {
      audio.pause()
      setPlayingTrackId(null)
      return
    }

    // Set source baru dan play
    audio.src = track.previewUrl
    audio.play()
    setPlayingTrackId(track.trackId)
  }

  const handleEnded = () => setPlayingTrackId(null)

  return (
    <div className="playlist-section">
      <h2>Playlist Saya ({isHydrated ? playlist.length : 0})</h2>

      <audio ref={audioRef} onEnded={handleEnded} hidden />

      {!isHydrated ? (
        <p className="empty-playlist">Memuat playlist...</p>
      ) : playlist.length === 0 ? (
        <p className="empty-playlist">Playlist kosong. Tambahkan lagu dari hasil pencarian.</p>
      ) : (
        <div className="playlist-list">
          {playlist.map((track) => (
            <div key={track.trackId} className="playlist-item">
              <div className="playlist-left">
                <button
                  className={`play-btn ${playingTrackId === track.trackId ? "pause" : ""}`}
                  onClick={() => handlePlayPreview(track)}
                  disabled={!track.previewUrl}
                >
                  {playingTrackId === track.trackId ? "⏸" : "▶️"}
                </button>

                <div className="playlist-info">
                  <p className="playlist-track">{track.trackName}</p>
                  <p className="playlist-artist">{track.artistName}</p>
                </div>
              </div>

              <button className="remove-btn" onClick={() => onRemove(track.trackId)}>
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Playlist
