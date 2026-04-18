const CRTOverlay = () => {
  return (
    <div
      className="crt-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        /* Scanlines */
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
        backgroundSize: '100% 3px',
        /* Vignette + subtle curvature feel */
        boxShadow:
          'inset 0 0 120px rgba(0,0,0,0.7), inset 0 0 60px rgba(0,0,0,0.4)',
        borderRadius: '8px',
      }}
    >
      {/* Subtle green scan line that moves down */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)',
          animation: 'crt-scan 4s linear infinite',
        }}
      />
      {/* Flicker effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,255,136,0.01)',
          animation: 'crt-flicker 0.1s infinite alternate',
        }}
      />
    </div>
  )
}

export default CRTOverlay
