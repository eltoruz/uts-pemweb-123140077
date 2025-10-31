"use client"

import { useState, useRef } from "react"
import "./App.css"
import Header from "./components/Header"
import SearchForm from "./components/SearchForm"
import DataTable from "./components/DataTable"
import DetailCard from "./components/DetailCard"
import Pagination from "./components/Pagination"
import Playlist from "./components/Playlist"
import usePlaylist from "./hooks/usePlaylist"
import useItunesApi from "./hooks/useItunesApi"
import { sortResults } from "./utils/sortUtils"

function App() {
  const { playlist, addToPlaylist, removeFromPlaylist, isHydrated } = usePlaylist()
  const { results, loading, error, fetchResults } = useItunesApi()

  const [selectedTrack, setSelectedTrack] = useState(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [mediaType, setMediaType] = useState("song")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const audioRef = useRef(null)

  const sortedResults = sortResults(results, sortBy)
  const totalPages = Math.ceil(sortedResults.length / itemsPerPage)
  const currentData = sortedResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (keyword, type) => {
    setMediaType(type)
    setSelectedTrack(null)
    setCurrentPage(1)
    fetchResults(keyword, type)
  }

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="search-section">
          <SearchForm onSearch={handleSearch} onSortChange={setSortBy} />
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading">Mencari musik...</div>}
          {results.length > 0 && (
            <div className="results-info-bar">
              <span>
                Total: {results.length} hasil | Halaman {currentPage} dari {totalPages}
              </span>
            </div>
          )}
        </div>

        <div className="content-wrapper">
          <div className="results-section">
            {currentData.length > 0 && (
              <>
                <DataTable
                  data={currentData}
                  onSelectTrack={setSelectedTrack}
                  selectedTrack={selectedTrack}
                  mediaType={mediaType}
                />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </div>

          <div className="detail-section">
            {selectedTrack && (
              <DetailCard
                track={selectedTrack}
                onAddToPlaylist={addToPlaylist}
                audioRef={audioRef}
                mediaType={mediaType}
              />
            )}
          </div>
        </div>

        <Playlist playlist={playlist} isHydrated={isHydrated} onRemove={removeFromPlaylist} />
      </main>
    </div>
  )
}

export default App
