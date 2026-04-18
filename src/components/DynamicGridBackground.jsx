const DynamicGridBackground = () => {
  return (
    <div className="dynamic-grid-bg" aria-hidden="true">
      {/* Primary animated grid */}
      <div className="grid-layer grid-layer-1" />
      {/* Secondary grid for depth */}
      <div className="grid-layer grid-layer-2" />
      {/* Radial fade at edges for depth illusion */}
      <div className="grid-vignette" />
      {/* Ambient glow blobs */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />
      <div className="ambient-blob blob-3" />
    </div>
  )
}

export default DynamicGridBackground
