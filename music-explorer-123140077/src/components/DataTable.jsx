"use client"

function DataTable({ data, onSelectTrack, selectedTrack, mediaType }) {
  const renderTableHeaders = () => {
    if (mediaType === "artist") {
      return (
        <tr>
          <th>Artwork</th>
          <th>Nama Artist</th>
          <th>Genre</th>
          <th>Aksi</th>
        </tr>
      )
    } else if (mediaType === "album") {
      return (
        <tr>
          <th>Artwork</th>
          <th>Nama Album</th>
          <th>Artist</th>
          <th>Tahun Rilis</th>
          <th>Aksi</th>
        </tr>
      )
    } else {
      // Default for songs
      return (
        <tr>
          <th>Artwork</th>
          <th>Nama Lagu</th>
          <th>Artist</th>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
      )
    }
  }

  const renderTableRows = () => {
    return data.map((item) => {
      if (mediaType === "artist") {
        return (
          <tr key={item.artistId} className={selectedTrack?.artistId === item.artistId ? "selected" : ""}>
            <td className="artwork-cell">
              {item.artworkUrl100 && (
                <img src={item.artworkUrl100 || "/placeholder.svg"} alt={item.artistName} className="artwork-img" />
              )}
            </td>
            <td className="track-name">{item.artistName}</td>
            <td className="artist-name">{item.primaryGenreName || "N/A"}</td>
            <td className="action-cell">
              <button className="btn-detail" onClick={() => onSelectTrack(item)}>
                Detail
              </button>
            </td>
          </tr>
        )
      } else if (mediaType === "album") {
        return (
          <tr key={item.collectionId} className={selectedTrack?.collectionId === item.collectionId ? "selected" : ""}>
            <td className="artwork-cell">
              {item.artworkUrl100 && (
                <img src={item.artworkUrl100 || "/placeholder.svg"} alt={item.collectionName} className="artwork-img" />
              )}
            </td>
            <td className="track-name">{item.collectionName}</td>
            <td className="artist-name">{item.artistName}</td>
            <td className="price">{new Date(item.releaseDate).getFullYear()}</td>
            <td className="action-cell">
              <button className="btn-detail" onClick={() => onSelectTrack(item)}>
                Detail
              </button>
            </td>
          </tr>
        )
      } else {
        // Default for songs
        return (
          <tr key={item.trackId} className={selectedTrack?.trackId === item.trackId ? "selected" : ""}>
            <td className="artwork-cell">
              {item.artworkUrl100 && (
                <img src={item.artworkUrl100 || "/placeholder.svg"} alt={item.trackName} className="artwork-img" />
              )}
            </td>
            <td className="track-name">{item.trackName}</td>
            <td className="artist-name">{item.artistName}</td>
            <td className="price">{item.trackPrice ? `$${item.trackPrice.toFixed(2)}` : "Gratis"}</td>
            <td className="action-cell">
              <button className="btn-detail" onClick={() => onSelectTrack(item)}>
                Detail
              </button>
            </td>
          </tr>
        )
      }
    })
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  )
}

export default DataTable
