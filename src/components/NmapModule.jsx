import { useState } from 'react'
import { Wifi, Play, Square, Terminal, Target, Clock, AlertCircle } from 'lucide-react'

const NmapModule = ({ isScanning }) => {
  const [target, setTarget] = useState('')
  const [scanType, setScanType] = useState('quick')
  const [output, setOutput] = useState([])
  const [localScanning, setLocalScanning] = useState(false)

  const scanTypes = {
    quick: { name: 'Quick Scan', ports: '-F', desc: 'Top 100 ports' },
    full: { name: 'Full TCP', ports: '-p-', desc: 'All 65535 ports' },
    stealth: { name: 'Stealth SYN', ports: '-sS', desc: 'Half-open scan' },
    udp: { name: 'UDP Scan', ports: '-sU', desc: 'UDP ports' },
    aggressive: { name: 'Aggressive', ports: '-A', desc: 'OS + Version + Scripts' },
  }

  const simulateScan = () => {
    if (!target) return

    setLocalScanning(true)
    setOutput([])

    const lines = [
      `[INIT] Starting Nmap scan on ${target}...`,
      `[SCAN] Using scan type: ${scanTypes[scanType].name}`,
      `[SCAN] Target resolution...`,
      `[SCAN] Host appears up (latency: 0.045s)`,
      `[SCAN] Initiating port scan...`,
      `[DISCOVER] Port 22/tcp OPEN - SSH`,
      `[DISCOVER] Port 80/tcp OPEN - HTTP`,
      `[DISCOVER] Port 443/tcp OPEN - HTTPS`,
      `[DISCOVER] Port 3306/tcp OPEN - MySQL`,
      `[DISCOVER] Port 8080/tcp OPEN - HTTP-Proxy`,
      `[INFO] Service detection on port 22...`,
      `[INFO] SSH-2.0-OpenSSH_8.2p1 Ubuntu`,
      `[INFO] Service detection on port 80...`,
      `[INFO] Apache httpd 2.4.41`,
      `[VULN] Potential vulnerability: CVE-2021-44228 (Log4j)`,
      `[VULN] Outdated SSH version detected`,
      `[COMPLETE] Nmap done: 1 IP address scanned in 12.45 seconds`,
      `[SUMMARY] 5 open ports, 2 vulnerabilities found`,
    ]

    lines.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev, {
          text: line,
          type: line.includes('VULN') ? 'vuln' : line.includes('COMPLETE') ? 'success' : 'info'
        }])
        if (index === lines.length - 1) setLocalScanning(false)
      }, index * 300)
    })
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-green/20 rounded-lg">
            <Wifi className="w-8 h-8 text-neon-green" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-green">NMAP</h2>
            <p className="text-sm text-gray-400">Network Mapper - Port Scanning & Service Detection</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-2">TARGET (IP / HOSTNAME / RANGE)</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="192.168.1.1 or scanme.nmap.org"
                className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">SCAN TYPE</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono"
            >
              {Object.entries(scanTypes).map(([key, value]) => (
                <option key={key} value={key}>{value.name} ({value.desc})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateScan}
            disabled={localScanning || !target}
            className="flex items-center gap-2 px-6 py-3 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green rounded-lg text-neon-green font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {localScanning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {localScanning ? 'SCANNING...' : 'START SCAN'}
          </button>
          <button
            onClick={() => { setOutput([]); setLocalScanning(false); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">TERMINAL OUTPUT</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-4 h-96 overflow-y-auto font-mono text-sm bg-black/50">
          {output.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} Ready to scan...</p>
              <p>{'>'} Enter target and select scan type</p>
              <p className="text-neon-green/50">{'>'} Awaiting user input_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'vuln' ? 'text-neon-red' :
                    line.type === 'success' ? 'text-neon-green' :
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!localScanning && (
                <p className="text-neon-green mt-2">{'>'} Scan complete. Ready for next command_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-neon-blue" />
            <span className="text-sm font-display text-gray-300">COMMON COMMANDS</span>
          </div>
          <ul className="text-xs text-gray-400 space-y-1 font-mono">
            <li>nmap -sV [target]</li>
            <li>nmap -O [target]</li>
            <li>nmap -sC [target]</li>
            <li>nmap -p- [target]</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-neon-purple" />
            <span className="text-sm font-display text-gray-300">SCAN TIMES</span>
          </div>
          <ul className="text-xs text-gray-400 space-y-1 font-mono">
            <li>Quick: ~30 seconds</li>
            <li>Full: ~10 minutes</li>
            <li>Stealth: ~2 minutes</li>
            <li>Aggressive: ~5 minutes</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm font-display text-gray-300">LEGAL NOTICE</span>
          </div>
          <p className="text-xs text-gray-400">
            Only scan systems you own or have written permission to test. Unauthorized scanning is illegal.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NmapModule
