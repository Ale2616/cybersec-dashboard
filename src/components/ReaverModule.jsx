import { useState } from 'react'
import { Key, Lock, Radio, Target, Play, Square, FileText, Shield, AlertTriangle } from 'lucide-react'

const ReaverModule = ({ isScanning }) => {
  const [interfaceName, setInterfaceName] = useState('wlan0mon')
  const [targetBssid, setTargetBssid] = useState('')
  const [attackMode, setAttackMode] = useState('auto')
  const [output, setOutput] = useState([])
  const [running, setRunning] = useState(false)
  const [wpsProgress, setWpsProgress] = useState(0)

  const attackModes = {
    auto: { name: 'Auto (PixieDust + Brute)', desc: 'Try PixieDust first, then brute' },
    pixie: { name: 'PixieDust Only', desc: 'Fast offline attack' },
    brute: { name: 'Brute Force', desc: 'Online PIN attack' },
    wps: { name: 'WPS Check', desc: 'Check WPS status only' },
  }

  const sampleTargets = [
    { bssid: '00:1A:2B:3C:4D:5E', essid: 'HomeWiFi', wps: 'Enabled', wpsLocked: false, signal: -45 },
    { bssid: 'AA:BB:CC:DD:EE:FF', essid: 'OfficeNet', wps: 'Enabled', wpsLocked: true, signal: -52 },
    { bssid: '11:22:33:44:55:66', essid: 'Cafe_Guest', wps: 'Disabled', wpsLocked: false, signal: -68 },
    { bssid: 'DE:AD:BE:EF:00:11', essid: 'Linksys', wps: 'Enabled', wpsLocked: false, signal: -61 },
  ]

  const simulateAttack = () => {
    if (!targetBssid) return

    setRunning(true)
    setOutput([])
    setWpsProgress(0)

    const lines = [
      `[REAVER] Starting WPS attack against ${targetBssid}...`,
      `[INTERFACE] Using: ${interfaceName}`,
      `[TARGET] BSSID: ${targetBssid}`,
      `[ASSOC] Associated with ${targetBssid} (ESSID: HomeWiFi)`,
      `[WPS] Starting PixieDust attack...`,
      `[PIXIE] Sending EAPOL START...`,
      `[PIXIE] Received M1...`,
      `[PIXIE] Sending M2...`,
      `[PIXIE] Received M3...`,
      `[PIXIE] Sending M4...`,
      `[PIXIE] Received M5...`,
      `[PIXIE] Received M6...`,
      `[PIXIE] Received M7...`,
      `[SUCCESS] PixieDust attack successful!`,
      `[WPS] PIN FOUND: 12345670`,
      `[KEY] Computing network key...`,
      `[SUCCESS] WPA PSK FOUND: "supersecret123"`,
      `[INFO] Uptime: 0 days, 0 hours, 23 minutes`,
      `[SAVE] Session saved to: /var/lib/reaver/${targetBssid.replace(/:/g, '-')}.wpc`,
      `[COMPLETE] Attack completed successfully!`,
    ]

    lines.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev, {
          text: line,
          type: line.includes('SUCCESS') || line.includes('FOUND') ? 'success' :
                line.includes('ERROR') ? 'error' :
                line.includes('COMPLETE') ? 'complete' : 'info'
        }])
        setWpsProgress(Math.min(((index + 1) / lines.length) * 100, 100))
        if (index === lines.length - 1) setRunning(false)
      }, index * 300)
    })
  }

  const selectTarget = (bssid) => {
    setTargetBssid(bssid)
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-purple/20 rounded-lg">
            <Lock className="w-8 h-8 text-neon-purple" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-purple">REAVER</h2>
            <p className="text-sm text-gray-400">WPS Brute Force Attack Tool</p>
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
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">ATTACK MODE</label>
            <select
              value={attackMode}
              onChange={(e) => setAttackMode(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all font-mono"
            >
              {Object.entries(attackModes).map(([key, value]) => (
                <option key={key} value={key}>{value.name} - {value.desc}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-2">TARGET BSSID</label>
            <input
              type="text"
              value={targetBssid}
              onChange={(e) => setTargetBssid(e.target.value.toUpperCase())}
              placeholder="00:1A:2B:3C:4D:5E"
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all font-mono"
            />
            <p className="text-xs text-gray-500 mt-1">Click on a network below to auto-fill</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateAttack}
            disabled={running || !targetBssid}
            className="flex items-center gap-2 px-6 py-3 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple rounded-lg text-neon-purple font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {running ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {running ? 'ATTACKING...' : 'START WPS ATTACK'}
          </button>
          <button
            onClick={() => { setOutput([]); setRunning(false); setWpsProgress(0); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>

        {/* Progress Bar */}
        {running && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>WPS PROGRESS</span>
              <span>{wpsProgress.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-neon-purple transition-all duration-300"
                style={{ width: `${wpsProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Target List */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center gap-2">
          <Radio className="w-4 h-4 text-neon-purple" />
          <span className="text-sm font-display text-gray-300">WPS TARGETS</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cyber-gray/50">
              <tr>
                <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">SELECT</th>
                <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">BSSID</th>
                <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">ESSID</th>
                <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">WPS</th>
                <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">LOCKED</th>
                <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">SIGNAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sampleTargets.map((target, index) => (
                <tr
                  key={index}
                  className={`hover:bg-cyber-gray/30 transition-all cursor-pointer ${
                    targetBssid === target.bssid ? 'bg-neon-purple/10' : ''
                  }`}
                  onClick={() => selectTarget(target.bssid)}
                >
                  <td className="px-4 py-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      targetBssid === target.bssid
                        ? 'bg-neon-purple border-neon-purple'
                        : 'border-gray-600'
                    }`}></div>
                  </td>
                  <td className="px-4 py-3 font-mono text-neon-blue">{target.bssid}</td>
                  <td className="px-4 py-3 text-gray-300">{target.essid}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      target.wps === 'Enabled'
                        ? 'bg-neon-green/20 text-neon-green'
                        : 'bg-gray-700 text-gray-500'
                    }`}>
                      {target.wps}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      target.wpsLocked
                        ? 'bg-neon-red/20 text-neon-red'
                        : 'bg-neon-green/20 text-neon-green'
                    }`}>
                      {target.wpsLocked ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-400">{target.signal} dBm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">ATTACK LOG</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-4 h-64 overflow-y-auto font-mono text-sm bg-black/50">
          {output.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} Reaver v1.6.6 ready...</p>
              <p>{'>'} WPS brute force attack tool</p>
              <p>{'>'} Select a target and start attack</p>
              <p className="text-neon-purple/50">{'>'} Waiting for command_</p>
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
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!running && (
                <p className="text-neon-purple mt-2">{'>'} Attack complete. Ready for new target_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info & Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-neon-purple" />
            ABOUT REAVER
          </h3>
          <p className="text-xs text-gray-400">
            Reaver is a tool that brute forces the PIN used by WPS (WiFi Protected Setup).
            Once the PIN is found, Reaver can recover the WPA/WPA2 passphrase.
            PixieDust attacks can crack some routers in seconds.
          </p>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-neon-red flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-display text-gray-300 mb-1">WARNING</h3>
              <p className="text-xs text-gray-400">
                WPS attacks can lock routers temporarily. Many modern routers have
                WPS disabled by default or include lockout mechanisms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReaverModule
