import { useState } from 'react'
import { Key, Lock, Wifi, FileText, Play, Square, Terminal, Shield, AlertTriangle, Database } from 'lucide-react'

const AircrackModule = ({ isScanning }) => {
  const [interfaceName, setInterfaceName] = useState('wlan0mon')
  const [attackType, setAttackType] = useState('wpa2')
  const [targetBssid, setTargetBssid] = useState('')
  const [targetChannel, setTargetChannel] = useState('6')
  const [wordlist, setWordlist] = useState('/usr/share/wordlists/rockyou.txt')
  const [output, setOutput] = useState([])
  const [running, setRunning] = useState(false)
  const [crackProgress, setCrackProgress] = useState(0)
  const [keysTested, setKeysTested] = useState(0)

  const attackTypes = {
    wpa2: { name: 'WPA/WPA2 Handshake', desc: 'Capture & crack WPA handshakes' },
    wep: { name: 'WEP Crack', desc: 'Break WEP encryption (fast)' },
    wps: { name: 'WPS PIN', desc: 'Recover WPS PIN' },
    pmkid: { name: 'PMKID Attack', desc: 'Client-less WPA attack' },
  }

  const simulateAttack = () => {
    if (!targetBssid) return

    setRunning(true)
    setOutput([])
    setCrackProgress(0)
    setKeysTested(0)

    const lines = attackType === 'wep' ? [
      `[AIRCRACK] Starting WEP attack against ${targetBssid}...`,
      `[INTERFACE] Monitoring on ${interfaceName}`,
      `[TARGET] BSSID: ${targetBssid} Channel: ${targetChannel}`,
      `[ARP] Waiting for ARP packets...`,
      `[ARP] ARP request captured!`,
      `[INJECT] Injecting ARP packets...`,
      `[IVS] Collecting IVs... (5000/10000)`,
      `[IVS] Collecting IVs... (15000/10000)`,
      `[IVS] Enough IVs collected!`,
      `[CRACK] Running PTW attack...`,
      `[KEY] WEP KEY FOUND: A1:B2:C3:D4:E5`,
      `[COMPLETE] Crack completed in 45 seconds!`,
    ] : [
      `[AIRCRACK] Starting WPA2 attack against ${targetBssid}...`,
      `[INTERFACE] Monitoring on ${interfaceName}`,
      `[TARGET] BSSID: ${targetBSSID} Channel: ${targetChannel}`,
      `[HANDSHAKE] Waiting for handshake...`,
      `[DEAUTH] Sending deauth packets...`,
      `[HANDSHAKE] WPA handshake captured!`,
      `[VERIFY] Handshake verified successfully`,
      `[CRACK] Loading wordlist: ${wordlist}`,
      `[CRACK] Testing keys...`,
      `[PROGRESS] 1000 keys tested...`,
      `[PROGRESS] 5000 keys tested...`,
      `[PROGRESS] 10000 keys tested...`,
      `[PROGRESS] 50000 keys tested...`,
      `[PROGRESS] 100000 keys tested...`,
      `[SUCCESS] KEY FOUND: "password123"`,
      `[COMPLETE] Crack completed successfully!`,
    ]

    lines.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev, {
          text: line,
          type: line.includes('SUCCESS') || line.includes('FOUND') ? 'success' :
                line.includes('ERROR') ? 'error' :
                line.includes('COMPLETE') ? 'complete' :
                line.includes('PROGRESS') ? 'progress' : 'info'
        }])
        setCrackProgress(Math.min(((index + 1) / lines.length) * 100, 100))
        if (line.includes('keys tested')) {
          const match = line.match(/(\d+)/)
          if (match) setKeysTested(parseInt(match[1]))
        }
        if (index === lines.length - 1) setRunning(false)
      }, index * 400)
    })
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-green/20 rounded-lg">
            <Key className="w-8 h-8 text-neon-green" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-green">AIRCRACK-NG</h2>
            <p className="text-sm text-gray-400">WiFi Security Auditing Suite</p>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-2">WIFI INTERFACE</label>
            <input
              type="text"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">ATTACK TYPE</label>
            <select
              value={attackType}
              onChange={(e) => setAttackType(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono"
            >
              {Object.entries(attackTypes).map(([key, value]) => (
                <option key={key} value={key}>{value.name} - {value.desc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">TARGET BSSID</label>
            <input
              type="text"
              value={targetBssid}
              onChange={(e) => setTargetBssid(e.target.value.toUpperCase())}
              placeholder="00:1A:2B:3C:4D:5E"
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">CHANNEL</label>
            <input
              type="text"
              value={targetChannel}
              onChange={(e) => setTargetChannel(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-2">WORDLIST PATH</label>
            <input
              type="text"
              value={wordlist}
              onChange={(e) => setWordlist(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateAttack}
            disabled={running || !targetBssid}
            className="flex items-center gap-2 px-6 py-3 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green rounded-lg text-neon-green font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {running ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {running ? 'CRACKING...' : 'START ATTACK'}
          </button>
          <button
            onClick={() => { setOutput([]); setRunning(false); setCrackProgress(0); setKeysTested(0); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>

        {/* Progress */}
        {running && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>PROGRESS</span>
              <span>{crackProgress.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all duration-300"
                style={{ width: `${crackProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-center font-mono">
              Keys tested: {keysTested.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Quick Commands */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
        <h3 className="text-sm font-display text-gray-300 mb-3 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-neon-green" />
          QUICK COMMANDS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
          <code className="p-2 bg-black/30 rounded text-gray-400">
            airodump-ng wlan0mon --bssid [TARGET]
          </code>
          <code className="p-2 bg-black/30 rounded text-gray-400">
            aireplay-ng --deauth 10 -a [BSSID] wlan0mon
          </code>
          <code className="p-2 bg-black/30 rounded text-gray-400">
            aircrack-ng -w rockyou.txt capture.cap
          </code>
          <code className="p-2 bg-black/30 rounded text-gray-400">
            airmon-ng start wlan0
          </code>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">CRACK TERMINAL</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-4 h-80 overflow-y-auto font-mono text-sm bg-black/50">
          {output.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} Aircrack-ng 1.7 ready...</p>
              <p>{'>'} WEP/WPA/WPA2 cracking suite</p>
              <p>{'>'} Enter target BSSID and start attack</p>
              <p className="text-neon-green/50">{'>'} Waiting for command_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'success' ? 'text-neon-green' :
                    line.type === 'error' ? 'text-neon-red' :
                    line.type === 'complete' ? 'text-neon-blue' :
                    line.type === 'progress' ? 'text-neon-yellow' :
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!running && (
                <p className="text-neon-green mt-2">{'>'} Attack complete. Ready for new target_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info & Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Database className="w-4 h-4 text-neon-green" />
            ATTACK METHODS
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• <strong>WEP:</strong> IVS collection + PTW/FMS attack</li>
            <li>• <strong>WPA:</strong> Handshake capture + dictionary</li>
            <li>• <strong>PMKID:</strong> Client-less handshake capture</li>
            <li>• <strong>WPS:</strong> PixieDust + brute force</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-neon-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-display text-gray-300 mb-1">REQUIREMENTS</h3>
              <p className="text-xs text-gray-400">
                Monitor mode adapter required. Use <code className="text-neon-green">airmon-ng</code> to enable.
                WPA cracking depends on wordlist quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AircrackModule
