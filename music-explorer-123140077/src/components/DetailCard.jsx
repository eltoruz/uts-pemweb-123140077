"use client"

import { useEffect } from "react"

function DetailCard({ track, onAddToPlaylist, audioRef, mediaType }) {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      // Force reload of audio element to ensure new src is loaded
      audioRef.current.load()
    }
  }, [track, audioRef])

  const renderDetailContent = () => {
    if (mediaType === "artist") {
      return (
        <div className="detail-info">
          <p>
            <strong>Artist:</strong> {track.artistName}
          </p>
          <p>
            <strong>Genre:</strong> {track.primaryGenreName || "N/A"}
          </p>
          <p>
            <strong>Link iTunes:</strong>{" "}
            {track.artistLinkUrl ? (
              <a href={track.artistLinkUrl} target="_blank" rel="noopener noreferrer" className="link-itunes">
                Buka di iTunes
              </a>
            ) : (
              "N/A"
            )}
          </p>
        </div>
      )
    } else if (mediaType === "album") {
      return (
        <div className="detail-info">
          <p>
            <strong>Album:</strong> {track.collectionName}
          </p>
          <p>
            <strong>Artist:</strong> {track.artistName}
          </p>
          <p>
            <strong>Genre:</strong> {track.primaryGenreName || "N/A"}
          </p>
          <p>
            <strong>Tahun Rilis:</strong> {new Date(track.releaseDate).getFullYear()}
          </p>
          <p>
            <strong>Jumlah Lagu:</strong> {track.trackCount || "N/A"}
          </p>
          <p>
            <strong>Harga:</strong> {track.collectionPrice ? `$${track.collectionPrice.toFixed(2)}` : "Gratis"}
          </p>
        </div>
      )
    } else {
      // Default for songs
      return (
        <div className="detail-info">
          <p>
            <strong>Lagu:</strong> {track.trackName}
          </p>
          <p>
            <strong>Artist:</strong> {track.artistName}
          </p>
          <p>
            <strong>Album:</strong> {track.collectionName || "N/A"}
          </p>
          <p>
            <strong>Genre:</strong> {track.primaryGenreName || "N/A"}
          </p>
          <p>
            <strong>Harga:</strong> {track.trackPrice ? `$${track.trackPrice.toFixed(2)}` : "Gratis"}
          </p>
          <p>
            <strong>Rilis:</strong> {new Date(track.releaseDate).toLocaleDateString("id-ID")}
          </p>
        </div>
      )
    }
  }

  const renderActionButtons = () => {
    if (mediaType === "artist") {
      return (
        <>
          {track.artistLinkUrl && (
            <a href={track.artistLinkUrl} target="_blank" rel="noopener noreferrer" className="btn-itunes">
              Buka di iTunes
            </a>
          )}
        </>
      )
    } else if (mediaType === "album") {
      return (
        <>
          {track.collectionViewUrl && (
            <a href={track.collectionViewUrl} target="_blank" rel="noopener noreferrer" className="btn-itunes">
              Buka di iTunes
            </a>
          )}
        </>
      )
    } else {
      // Default for songs
      return (
        <>
          <button className="btn-add-playlist" onClick={() => onAddToPlaylist(track)}>
            + Tambah ke Playlist
          </button>
          {track.trackViewUrl && (
            <a href={track.trackViewUrl} target="_blank" rel="noopener noreferrer" className="btn-itunes">
              Buka di iTunes
            </a>
          )}
        </>
      )
    }
  }

  return (
    <div className="detail-card">
      <h3>Detail {mediaType === "artist" ? "Artist" : mediaType === "album" ? "Album" : "Lagu"}</h3>

      {track.artworkUrl100 && (
        <img
          src={track.artworkUrl100 || "/placeholder.svg"}
          alt={track.trackName || track.collectionName || track.artistName}
          className="detail-artwork"
        />
      )}

      {renderDetailContent()}

      {mediaType === "song" && track.previewUrl && (
        <div className="audio-player">
          <label>Preview Audio:</label>
          <audio key={track.trackId} ref={audioRef} controls className="audio-control">
            <source src={track.previewUrl} type="audio/mpeg" />
            Browser Anda tidak mendukung audio player
          </audio>
        </div>
      )}

      {renderActionButtons()}
    </div>
  )
}

export default DetailCard
