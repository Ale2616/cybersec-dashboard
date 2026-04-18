import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, Server, MapPin, Shield, AlertTriangle, Wifi, Building2, Activity, Terminal, Clock, Cpu, Archive } from 'lucide-react'

/* ── Loading messages ── */
const LOADING_MSGS = [
  '[ INTERCEPTANDO TRÁFICO... ]',
  '[ ESTABLECIENDO CONEXIÓN... ]',
  '[ BYPASS DE FIREWALL... ]',
  '[ RESOLVIENDO DNS... ]',
  '[ ESCANEANDO PUERTOS... ]',
  '[ ANALIZANDO PAQUETES... ]',
  '[ ACCEDIENDO AL SATÉLITE... ]',
]

/* ── Detect input type ── */
const detectType = (input) => {
  const s = input.trim()
  if (/^clear$/i.test(s)) return 'cmd-clear'
  if (/^whoami$/i.test(s)) return 'cmd-whoami'
  if (/^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/.test(s)) return 'mac'
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(s)) return 'ip'
  // treat anything else as domain (strip protocol/path)
  if (s.length > 0) return 'domain'
  return null
}

const extractDomain = (input) => {
  let d = input.trim().replace(/^https?:\/\//i, '')
  d = d.split('/')[0].split('?')[0]
  return d
}

/* ── Typewriter line ── */
const TypewriterLine = ({ label, value, delay = 0, color = 'text-neon-green' }) => {
  const [txt, setTxt] = useState('')
  const full = String(value)
  useEffect(() => {
    setTxt('')
    let i = 0
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setTxt(full.slice(0, i))
        if (i >= full.length) clearInterval(iv)
      }, 25)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [full, delay])

  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.25 }}
      className="flex items-start gap-3 py-1.5 border-b border-gray-800/50 last:border-0">
      <span className="text-gray-500 text-xs uppercase tracking-wider w-28 flex-shrink-0 pt-0.5 font-display">{label}</span>
      <span className={`font-mono text-sm ${color}`}>
        {txt}
        {txt.length < full.length && <span className="inline-block w-2 h-4 bg-neon-green/80 ml-0.5 animate-pulse" />}
      </span>
    </motion.div>
  )
}

/* ── Section header ── */
const SectionHeader = ({ icon: Icon, title, color = 'text-neon-green', badge }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" style={{ color: 'inherit' }} />
    <Icon className={`w-4 h-4 ${color}`} />
    <h3 className={`text-sm font-display ${color} neon-text tracking-widest`}>{title}</h3>
    {badge && <span className="ml-auto text-xs font-mono text-gray-500">{badge}</span>}
  </div>
)

const ShodanModule = ({ isScanning }) => {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MSGS[0])
  const [error, setError] = useState(null)
  // Results states
  const [ipResult, setIpResult] = useState(null)
  const [dnsResult, setDnsResult] = useState(null)
  const [waybackResult, setWaybackResult] = useState(null)
  const [macResult, setMacResult] = useState(null)
  const [detectedType, setDetectedType] = useState(null)
  // Terminal
  const [termLines, setTermLines] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!searching) return
    let idx = 0
    const iv = setInterval(() => { idx = (idx + 1) % LOADING_MSGS.length; setLoadingMsg(LOADING_MSGS[idx]) }, 700)
    return () => clearInterval(iv)
  }, [searching])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [termLines])

  const log = (text, type = 'info') => {
    setTermLines(prev => [...prev, { text, type, id: Date.now() + Math.random() }])
  }

  const clearAll = () => {
    setTermLines([])
    setIpResult(null)
    setDnsResult(null)
    setWaybackResult(null)
    setMacResult(null)
    setError(null)
    setDetectedType(null)
  }

  /* ── MAIN EXECUTE ── */
  const executeSearch = async () => {
    const raw = query.trim()
    if (!raw) return
    const type = detectType(raw)
    if (!type) return

    // Handle commands
    if (type === 'cmd-clear') { clearAll(); log('> clear', 'cmd'); log('[SYS] Terminal cleared.', 'success'); return }
    if (type === 'cmd-whoami') { log('> whoami', 'cmd'); log('root@vip-alejandro', 'success'); return }

    setSearching(true)
    setError(null)
    setIpResult(null)
    setDnsResult(null)
    setWaybackResult(null)
    setMacResult(null)
    setDetectedType(type)

    log(`> scan ${raw}`, 'cmd')
    log(`[SYS] Input type detected: ${type.toUpperCase()}`)

    try {
      if (type === 'ip') await scanIP(raw)
      else if (type === 'domain') await scanDomain(raw)
      else if (type === 'mac') await scanMAC(raw)
    } catch (e) {
      log(`[FAIL] ${e.message}`, 'error')
      setError('[ ERROR DE CONEXIÓN CON EL SATÉLITE ]')
    } finally {
      setSearching(false)
    }
  }

  /* ── IP Scan ── */
  const scanIP = async (ip) => {
    log(`[NET] Connecting to ipapi.co...`)
    const res = await fetch(`https://ipapi.co/${ip}/json/`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const d = await res.json()
    if (d.error) throw new Error(d.reason || 'Invalid IP')
    log(`[GEO] Located: ${d.city}, ${d.country_name}`, 'success')
    log(`[ORG] ISP: ${d.org}`, 'success')
    log(`[ASN] ${d.asn}`, 'success')
    log(`[DONE] IP intelligence complete`, 'success')
    setIpResult({ ip: d.ip || ip, city: d.city || '?', region: d.region || '?', country: d.country_name || '?', countryCode: d.country_code || '--', org: d.org || '?', asn: d.asn || 'N/A', timezone: d.timezone || 'N/A', lat: d.latitude || 0, lon: d.longitude || 0, postal: d.postal || 'N/A', network: d.network || 'N/A' })
  }

  /* ── Domain Scan (DNS + Wayback) ── */
  const scanDomain = async (raw) => {
    const domain = extractDomain(raw)
    log(`[DNS] Resolving ${domain}...`)

    // DNS lookup
    try {
      const res = await fetch(`https://networkcalc.com/api/dns/lookup/${domain}`)
      if (!res.ok) throw new Error(`DNS HTTP ${res.status}`)
      const d = await res.json()
      const records = d.records || {}
      const aRecords = (records.A || []).map(r => r.address || r.value || JSON.stringify(r))
      const mxRecords = (records.MX || []).map(r => r.exchange || r.value || JSON.stringify(r))
      log(`[DNS] A records: ${aRecords.length} found`, 'success')
      log(`[DNS] MX records: ${mxRecords.length} found`, 'success')
      setDnsResult({ domain, aRecords, mxRecords, raw: records })
    } catch (e) {
      log(`[DNS] Failed: ${e.message}`, 'error')
      setDnsResult({ domain, aRecords: [], mxRecords: [], error: e.message })
    }

    // Wayback Machine
    log(`[ARCHIVE] Querying Wayback Machine...`)
    try {
      const res = await fetch(`https://archive.org/wayback/available?url=${domain}`)
      if (!res.ok) throw new Error(`Wayback HTTP ${res.status}`)
      const d = await res.json()
      const snap = d.archived_snapshots?.closest
      if (snap && snap.url) {
        log(`[ARCHIVE] Snapshot found: ${snap.timestamp}`, 'success')
        setWaybackResult({ available: true, url: snap.url, timestamp: snap.timestamp, status: snap.status })
      } else {
        log(`[ARCHIVE] No snapshots available`, 'warn')
        setWaybackResult({ available: false })
      }
    } catch (e) {
      log(`[ARCHIVE] Failed: ${e.message}`, 'error')
      setWaybackResult({ available: false, error: e.message })
    }
    log(`[DONE] Domain reconnaissance complete`, 'success')
  }

  /* ── MAC Scan ── */
  const scanMAC = async (mac) => {
    log(`[HW] Looking up MAC vendor...`)
    const res = await fetch(`https://api.maclookup.app/v2/macs/${mac}`)
    if (!res.ok) throw new Error(`MAC HTTP ${res.status}`)
    const d = await res.json()
    const company = d.company || 'Unknown Vendor'
    log(`[+] HARDWARE VENDOR DETECTADO: ${company}`, 'success')
    log(`[DONE] MAC lookup complete`, 'success')
    setMacResult({ mac, company, country: d.country || 'N/A', blockType: d.blockType || 'N/A', updated: d.updated || 'N/A' })
  }

  const inputType = query.trim() ? detectType(query.trim()) : null

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-blue/20 rounded-lg">
            <Search className="w-8 h-8 text-neon-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold neon-text-blue">OSINT RECON</h2>
            <p className="text-sm text-gray-400">Multi-Target Intelligence Scanner</p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded bg-neon-green/10 border border-neon-green/30">
            <Activity className="w-3.5 h-3.5 text-neon-green" />
            <span className="text-xs text-neon-green font-mono">LIVE</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="text" value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
              placeholder="IP, Dominio, MAC o comando (whoami / clear)"
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all font-mono"
            />
          </div>
          <button onClick={executeSearch} disabled={searching || !query.trim()}
            className="px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue rounded-lg text-neon-blue font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
            {searching ? 'SCANNING...' : 'EXECUTE'}
          </button>
        </div>

        {/* Type indicator + Quick buttons */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          {inputType && !['cmd-clear','cmd-whoami'].includes(inputType) && (
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
              DETECTED: {inputType.toUpperCase()}
            </span>
          )}
          <span className="text-xs text-gray-500">Quick:</span>
          {['8.8.8.8','google.com','00:1A:2B:3C:4D:5E','whoami'].map(q => (
            <button key={q} onClick={() => setQuery(q)}
              className="px-2.5 py-1 bg-cyber-gray hover:bg-gray-700 border border-gray-600 rounded text-xs text-gray-400 hover:text-white transition-all font-mono">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      <AnimatePresence>
        {searching && (
          <motion.div initial={{ opacity: 0, scaleY: 0.8 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0.8 }}
            className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg cyber-border p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-full h-px bg-neon-green/30" style={{ animation: 'scan 1.5s linear infinite' }} />
            </div>
            <motion.p animate={{ opacity: [1, 0.3, 1, 0.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
              className="text-neon-green font-display text-lg neon-text tracking-widest">{loadingMsg}</motion.p>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} className="w-2 h-6 bg-neon-green/60 rounded-sm"
                  animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && !searching && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-cyber-dark/90 rounded-lg border border-neon-red/50 p-6 text-center emergency-blink">
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <AlertTriangle className="w-10 h-10 text-neon-red mx-auto mb-3" />
              <p className="text-neon-red font-display text-lg neon-text-red tracking-wider">{error}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ IP RESULTS ══════ */}
      <AnimatePresence>
        {ipResult && !searching && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg cyber-border p-6">
            <SectionHeader icon={MapPin} title="IP GEOLOCATION — TARGET ACQUIRED" color="text-neon-green" badge="ipapi.co" />
            <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
              <TypewriterLine label="IP" value={ipResult.ip} delay={0} color="text-neon-blue" />
              <TypewriterLine label="CITY" value={ipResult.city} delay={200} />
              <TypewriterLine label="REGION" value={ipResult.region} delay={400} />
              <TypewriterLine label="COUNTRY" value={`${ipResult.country} (${ipResult.countryCode})`} delay={600} />
              <TypewriterLine label="ORG / ISP" value={ipResult.org} delay={800} color="text-neon-purple" />
              <TypewriterLine label="ASN" value={ipResult.asn} delay={1000} color="text-neon-yellow" />
              <TypewriterLine label="NETWORK" value={ipResult.network} delay={1200} />
              <TypewriterLine label="TIMEZONE" value={ipResult.timezone} delay={1400} />
              <TypewriterLine label="COORDS" value={`${ipResult.lat}, ${ipResult.lon}`} delay={1600} color="text-neon-blue" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ DNS RESULTS ══════ */}
      <AnimatePresence>
        {dnsResult && !searching && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg cyber-border p-6">
            <SectionHeader icon={Globe} title="DNS RECONNAISSANCE" color="text-neon-blue" badge="networkcalc.com" />
            <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
              <TypewriterLine label="DOMAIN" value={dnsResult.domain} delay={0} color="text-neon-blue" />
              {dnsResult.aRecords.length > 0 ? (
                dnsResult.aRecords.map((r, i) => (
                  <TypewriterLine key={`a-${i}`} label={`A REC [${i + 1}]`} value={r} delay={200 + i * 200} />
                ))
              ) : (
                <TypewriterLine label="A REC" value="No A records found" delay={200} color="text-gray-500" />
              )}
              {dnsResult.mxRecords.length > 0 ? (
                dnsResult.mxRecords.map((r, i) => (
                  <TypewriterLine key={`mx-${i}`} label={`MX [${i + 1}]`} value={r} delay={600 + i * 200} color="text-neon-purple" />
                ))
              ) : (
                <TypewriterLine label="MX" value="No MX records found" delay={600} color="text-gray-500" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ WAYBACK RESULTS ══════ */}
      <AnimatePresence>
        {waybackResult && !searching && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg cyber-border p-6">
            <SectionHeader icon={Archive} title="WAYBACK MACHINE — ARCHIVO HISTÓRICO" color="text-neon-yellow" badge="archive.org" />
            <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
              {waybackResult.available ? (
                <>
                  <TypewriterLine label="STATUS" value="SNAPSHOT ENCONTRADO" delay={0} color="text-neon-green" />
                  <TypewriterLine label="TIMESTAMP" value={waybackResult.timestamp} delay={200} color="text-neon-yellow" />
                  <TypewriterLine label="URL" value={waybackResult.url} delay={400} color="text-neon-blue" />
                  <div className="mt-3">
                    <a href={waybackResult.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-neon-blue hover:underline font-mono">
                      [ ABRIR SNAPSHOT → ]
                    </a>
                  </div>
                </>
              ) : (
                <TypewriterLine label="STATUS" value="No hay snapshots disponibles para este dominio" delay={0} color="text-gray-500" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ MAC RESULTS ══════ */}
      <AnimatePresence>
        {macResult && !searching && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-cyber-dark/90 backdrop-blur-sm rounded-lg cyber-border p-6">
            <SectionHeader icon={Cpu} title="HARDWARE VENDOR — MAC LOOKUP" color="text-neon-purple" badge="maclookup.app" />
            <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
              <TypewriterLine label="MAC" value={macResult.mac} delay={0} color="text-neon-blue" />
              <TypewriterLine label="VENDOR" value={macResult.company} delay={300} color="text-neon-green" />
              <TypewriterLine label="COUNTRY" value={macResult.country} delay={600} />
              <TypewriterLine label="BLOCK" value={macResult.blockType} delay={900} color="text-neon-yellow" />
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="mt-4 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
              <p className="text-neon-green font-mono text-sm neon-text">
                [+] HARDWARE VENDOR DETECTADO: {macResult.company}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ TERMINAL OUTPUT ══════ */}
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
        <div ref={scrollRef} className="p-4 h-48 overflow-y-auto font-mono text-xs bg-black/50">
          {termLines.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} OSINT Multi-Scanner v2.0 ready...</p>
              <p>{'>'} Supported: IP | Domain | MAC | Commands</p>
              <p>{'>'} APIs: ipapi.co | networkcalc | archive.org | maclookup</p>
              <p>{'>'} Type <span className="text-neon-blue">whoami</span> or <span className="text-neon-blue">clear</span></p>
              <p className="text-neon-blue/50">{'>'} Awaiting target_</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {termLines.map(l => (
                <motion.div key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className={`py-0.5 ${l.type === 'error' ? 'text-neon-red' : l.type === 'success' ? 'text-neon-green' : l.type === 'cmd' ? 'text-neon-blue' : l.type === 'warn' ? 'text-neon-yellow' : 'text-gray-400'}`}>
                  {l.text}
                </motion.div>
              ))}
              {!searching && <p className="text-neon-blue/60 mt-1">{'>'} Ready_</p>}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-blue" />CAPABILITIES
          </h3>
          <ul className="text-xs text-gray-400 space-y-1 font-mono">
            <li>• IP Geolocation & ISP</li>
            <li>• DNS A & MX Records</li>
            <li>• Wayback Machine Archive</li>
            <li>• MAC Vendor Lookup</li>
            <li>• Console Commands</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-neon-purple" />APIS CONNECTED
          </h3>
          <div className="space-y-1.5">
            {['ipapi.co','networkcalc.com','archive.org','maclookup.app'].map(api => (
              <div key={api} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs text-neon-green/80 font-mono">{api}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neon-green" />COMMANDS
          </h3>
          <div className="space-y-1 text-xs font-mono">
            <p><span className="text-neon-blue">whoami</span> <span className="text-gray-500">→ identity</span></p>
            <p><span className="text-neon-blue">clear</span> <span className="text-gray-500">→ reset terminal</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShodanModule
