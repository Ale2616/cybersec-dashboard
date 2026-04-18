import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, Server, MapPin, Shield, AlertTriangle, Wifi, Building2, Hash, Activity } from 'lucide-react'

/* ── Glitch loading messages ── */
const LOADING_MESSAGES = [
  '[ INTERCEPTANDO TRÁFICO... ]',
  '[ ESTABLECIENDO CONEXIÓN... ]',
  '[ BYPASS DE FIREWALL... ]',
  '[ RESOLVIENDO DNS... ]',
  '[ ESCANEANDO PUERTOS... ]',
  '[ ANALIZANDO PAQUETES... ]',
  '[ TRAZANDO RUTA... ]',
]

/* ── Typewriter line component ── */
const TypewriterLine = ({ label, value, delay = 0, color = 'text-neon-green' }) => {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = String(value)

  useEffect(() => {
    setDisplayedText('')
    let i = 0
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayedText(fullText.slice(0, i))
        if (i >= fullText.length) clearInterval(interval)
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [fullText, delay])

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.3 }}
      className="flex items-start gap-3 py-2 border-b border-gray-800/60 last:border-0"
    >
      <span className="text-gray-500 text-xs uppercase tracking-wider w-28 flex-shrink-0 pt-0.5 font-display">
        {label}
      </span>
      <span className={`font-mono text-sm ${color}`}>
        {displayedText}
        {displayedText.length < fullText.length && (
          <span className="inline-block w-2 h-4 bg-neon-green/80 ml-0.5 animate-pulse" />
        )}
      </span>
    </motion.div>
  )
}

const ShodanModule = ({ isScanning }) => {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])
  const [terminalLines, setTerminalLines] = useState([])

  /* ── Cycle loading messages while searching ── */
  useEffect(() => {
    if (!searching) return
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[idx])
    }, 800)
    return () => clearInterval(interval)
  }, [searching])

  /* ── Real API fetch ── */
  const executeSearch = async () => {
    const ip = query.trim()
    if (!ip) return

    setSearching(true)
    setResult(null)
    setError(null)
    setTerminalLines([])

    // Add terminal output lines during fetch
    const addLine = (text, type = 'info') => {
      setTerminalLines(prev => [...prev, { text, type, id: Date.now() + Math.random() }])
    }

    addLine(`[CMD] > shodan host ${ip}`, 'cmd')
    addLine(`[NET] Establishing connection to target...`)

    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`)

      addLine(`[NET] HTTP ${response.status} — Response received`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      // ipapi.co returns { error: true, reason: "..." } for invalid IPs
      if (data.error) {
        throw new Error(data.reason || 'Invalid IP address')
      }

      addLine(`[OSINT] Extracting intelligence data...`)
      addLine(`[GEO] Geolocation resolved: ${data.city}, ${data.country_name}`, 'success')
      addLine(`[ORG] ISP identified: ${data.org}`, 'success')
      addLine(`[ASN] Autonomous System: ${data.asn}`, 'success')
      addLine(`[DONE] Intelligence extraction complete`, 'success')

      // Short delay for dramatic effect before showing results
      await new Promise(resolve => setTimeout(resolve, 600))

      setResult({
        ip: data.ip || ip,
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        country: data.country_name || 'Unknown',
        countryCode: data.country_code || '--',
        org: data.org || 'Unknown',
        asn: data.asn || 'N/A',
        timezone: data.timezone || 'N/A',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        postal: data.postal || 'N/A',
        network: data.network || 'N/A',
      })
    } catch (err) {
      addLine(`[ERROR] ${err.message}`, 'error')
      addLine(`[ABORT] Target unreachable or protected`, 'error')
      setError('[ ERROR: OBJETIVO INALCANZABLE O PROTEGIDO ]')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-blue/20 rounded-lg">
            <Search className="w-8 h-8 text-neon-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold neon-text-blue">SHODAN</h2>
            <p className="text-sm text-gray-400">IP Intelligence & Geolocation Scanner</p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded bg-neon-green/10 border border-neon-green/30">
            <Activity className="w-3.5 h-3.5 text-neon-green" />
            <span className="text-xs text-neon-green font-mono">LIVE API</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
              placeholder='Ingresa una IP: 8.8.8.8, 1.1.1.1, 142.250.80.46'
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all font-mono"
            />
          </div>
          <button
            onClick={executeSearch}
            disabled={searching || !query.trim()}
            className="px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue rounded-lg text-neon-blue font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {searching ? 'SCANNING...' : 'SEARCH'}
          </button>
        </div>

        {/* Quick IPs */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs text-gray-500">Quick:</span>
          {['8.8.8.8', '1.1.1.1', '142.250.80.46', '208.67.222.222', '9.9.9.9'].map((ip) => (
            <button
              key={ip}
              onClick={() => setQuery(ip)}
              className="px-3 py-1 bg-cyber-gray hover:bg-gray-700 border border-gray-600 rounded text-xs text-gray-400 hover:text-white transition-all font-mono"
            >
              {ip}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State — Hacker Glitch */}
      <AnimatePresence>
        {searching && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg cyber-border p-8 text-center overflow-hidden relative"
          >
            {/* Scan line effect inside loading */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute w-full h-px bg-neon-green/30"
                style={{ animation: 'scan 1.5s linear infinite' }}
              />
            </div>

            <motion.div
              animate={{ opacity: [1, 0.3, 1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block"
            >
              <p className="text-neon-green font-display text-lg neon-text tracking-widest">
                {loadingMsg}
              </p>
            </motion.div>

            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-6 bg-neon-green/60 rounded-sm"
                  animate={{ scaleY: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>

            <p className="text-xs text-gray-600 mt-4 font-mono">
              Querying ipapi.co intelligence database...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && !searching && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg border border-neon-red/50 p-6 text-center emergency-blink"
          >
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <AlertTriangle className="w-10 h-10 text-neon-red mx-auto mb-3" />
              <p className="text-neon-red font-display text-lg neon-text-red tracking-wider">
                {error}
              </p>
            </motion.div>
            <p className="text-xs text-gray-500 mt-3 font-mono">
              Verifica la dirección IP e intenta de nuevo
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results — Typewriter Reveal */}
      <AnimatePresence>
        {result && !searching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Intelligence Header */}
            <div className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg cyber-border p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
                <h3 className="text-sm font-display text-neon-green neon-text tracking-widest">
                  INTELLIGENCE REPORT — TARGET ACQUIRED
                </h3>
              </div>

              <div className="bg-black/50 rounded-lg p-5 border border-gray-800">
                <TypewriterLine label="IP" value={result.ip} delay={0} color="text-neon-blue" />
                <TypewriterLine label="CITY" value={result.city} delay={300} />
                <TypewriterLine label="REGION" value={result.region} delay={600} />
                <TypewriterLine label="COUNTRY" value={`${result.country} (${result.countryCode})`} delay={900} />
                <TypewriterLine label="ORG / ISP" value={result.org} delay={1200} color="text-neon-purple" />
                <TypewriterLine label="ASN" value={result.asn} delay={1500} color="text-neon-yellow" />
                <TypewriterLine label="NETWORK" value={result.network} delay={1800} />
                <TypewriterLine label="TIMEZONE" value={result.timezone} delay={2100} />
                <TypewriterLine label="COORDS" value={`${result.latitude}, ${result.longitude}`} delay={2400} color="text-neon-blue" />
                <TypewriterLine label="POSTAL" value={result.postal} delay={2700} />
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-neon-blue/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-bold text-gray-300">{result.city}, {result.country}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-mono">{result.latitude}, {result.longitude}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-neon-purple/20 rounded-lg">
                    <Building2 className="w-5 h-5 text-neon-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Organization</p>
                    <p className="text-sm font-bold text-gray-300">{result.org}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-mono">ASN: {result.asn}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-neon-green/20 rounded-lg">
                    <Wifi className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Network</p>
                    <p className="text-sm font-bold text-gray-300">{result.network}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-mono">TZ: {result.timezone}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Output Log */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center gap-2">
          <Server className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-display text-gray-300">TERMINAL OUTPUT</span>
          <div className="ml-auto flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-neon-red/70" />
            <div className="w-3 h-3 rounded-full bg-neon-yellow/70" />
            <div className="w-3 h-3 rounded-full bg-neon-green/70" />
          </div>
        </div>
        <div className="p-4 h-44 overflow-y-auto font-mono text-xs bg-black/50">
          {terminalLines.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} Shodan IP Intelligence Scanner ready...</p>
              <p>{'>'} Connected to ipapi.co API</p>
              <p>{'>'} Enter an IP address to begin reconnaissance</p>
              <p className="text-neon-blue/50">{'>'} Awaiting target_</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {terminalLines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`py-0.5 ${
                    line.type === 'error' ? 'text-neon-red' :
                    line.type === 'success' ? 'text-neon-green' :
                    line.type === 'cmd' ? 'text-neon-blue' :
                    'text-gray-400'
                  }`}
                >
                  {line.text}
                </motion.div>
              ))}
              {!searching && terminalLines.length > 0 && (
                <p className="text-neon-blue/60 mt-2">{'>'} Ready for next target_</p>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-blue" />
            DATA EXTRACTED
          </h3>
          <ul className="text-xs text-gray-400 space-y-1 font-mono">
            <li>• IP Address & Network Range</li>
            <li>• City, Region & Country</li>
            <li>• ISP / Organization</li>
            <li>• Autonomous System Number (ASN)</li>
            <li>• Timezone & Postal Code</li>
            <li>• GPS Coordinates</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-neon-purple" />
            API STATUS
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs text-neon-green font-mono">CONNECTED — ipapi.co</span>
          </div>
          <p className="text-xs text-gray-400">
            Datos en tiempo real. Sin API key requerida para consultas básicas.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShodanModule
