"use client"

import { useState } from "react"

function SearchForm({ onSearch, onSortChange }) {
  const [keyword, setKeyword] = useState("")
  const [mediaType, setMediaType] = useState("song")
  const [sortBy, setSortBy] = useState("relevance")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(keyword, mediaType)
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    if (typeof onSortChange === "function") {
      onSortChange(value)
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="keyword">Cari Musik:</label>
        <input
          id="keyword"
          type="text"
          placeholder="Masukkan nama lagu, artist, atau album..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mediaType">Tipe Media:</label>
        <select id="mediaType" value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="song">Lagu</option>
          <option value="album">Album</option>
          <option value="artist">Artist</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="sortBy">Urutkan:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortChange}>
          <option value="relevance">Relevansi</option>
          <option value="price-asc">Harga Terendah</option>
          <option value="price-desc">Harga Tertinggi</option>
          <option value="date">Tanggal Terbaru</option>
        </select>
      </div>

      <button type="submit" className="btn-search">
        Cari
      </button>
    </form>
  )
}

export default SearchForm
