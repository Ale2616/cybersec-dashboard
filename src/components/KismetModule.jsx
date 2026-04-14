import { useState, useEffect } from 'react'
import { Radio, Map, Radar, Wifi, Play, Square, FileText, Shield, AlertTriangle, Eye } from 'lucide-react'

const KismetModule = ({ isScanning }) => {
  const [interfaceName, setInterfaceName] = useState('wlan0mon')
  const [scanMode, setScanMode] = useState('passive')
  const [output, setOutput] = useState([])
  const [monitoring, setMonitoring] = useState(false)
  const [networks, setNetworks] = useState([])
  const [selectedNetwork, setSelectedNetwork] = useState(null)

  const scanModes = {
    passive: { name: 'Passive Monitor', desc: 'Listen only, no transmission' },
    active: { name: 'Active Scan', desc: 'Send probe requests' },
    gps: { name: 'GPS Mapping', desc: 'Track with GPS coordinates' },
  }

  const generateNetwork = (id) => {
    const essids = ['HomeWiFi', 'OfficeNet', 'Cafe_Guest', 'Linksys', 'Netgear', 'TP-Link', 'Xfinity', 'Spectrum', 'ATT-WiFi', 'Verizon']
    const encryptions = ['WPA2', 'WPA3', 'WPA', 'WEP', 'WPS', 'Open']
    const channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 36, 40, 44, 48, 149, 153, 157, 161, 165]

    return {
      id,
      bssid: `${Math.random().toString(16).substring(2, 4).toUpperCase()}:${
        Math.random().toString(16).substring(2, 4).toUpperCase()}:${
        Math.random().toString(16).substring(2, 4).toUpperCase()}:${
        Math.random().toString(16).substring(2, 4).toUpperCase()}:${
        Math.random().toString(16).substring(2, 4).toUpperCase()}:${
        Math.random().toString(16).substring(2, 4).toUpperCase()}`,
      essid: essids[Math.floor(Math.random() * essids.length)],
      channel: channels[Math.floor(Math.random() * channels.length)],
      signal: Math.floor(Math.random() * 40) - 90,
      encryption: encryptions[Math.floor(Math.random() * encryptions.length)],
      clients: Math.floor(Math.random() * 10),
      packets: Math.floor(Math.random() * 10000),
      firstSeen: new Date().toLocaleTimeString(),
    }
  }

  useEffect(() => {
    let interval
    if (monitoring) {
      interval = setInterval(() => {
        setNetworks(prev => {
          const newNetwork = generateNetwork(prev.length + 1)
          const updated = [...prev, newNetwork].slice(-20)

          setOutput(o => [...o, {
            text: `[DISCOVER] New network: ${newNetwork.essid} (${newNetwork.bssid})`,
            type: 'discover'
          }].slice(-50))

          return updated
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [monitoring])

  const startMonitoring = () => {
    setMonitoring(true)
    setOutput([{ text: `[KISMET] Starting passive monitoring...`, type: 'info' }])
    setNetworks([])
  }

  const stopMonitoring = () => {
    setMonitoring(false)
    setOutput(prev => [...prev, { text: `[KISMET] Monitoring stopped.`, type: 'info' }])
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-blue/20 rounded-lg">
            <Radar className="w-8 h-8 text-neon-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-blue">KISMET</h2>
            <p className="text-sm text-gray-400">Wireless Network Detector & Sniffer</p>
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
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">SCAN MODE</label>
            <select
              value={scanMode}
              onChange={(e) => setScanMode(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all font-mono"
            >
              {Object.entries(scanModes).map(([key, value]) => (
                <option key={key} value={key}>{value.name} - {value.desc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          {!monitoring ? (
            <button
              onClick={startMonitoring}
              className="flex items-center gap-2 px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue rounded-lg text-neon-blue font-bold transition-all glow-button"
            >
              <Play className="w-5 h-5" />
              START MONITORING
            </button>
          ) : (
            <button
              onClick={stopMonitoring}
              className="flex items-center gap-2 px-6 py-3 bg-neon-red/20 hover:bg-neon-red/30 border border-neon-red rounded-lg text-neon-red font-bold transition-all"
            >
              <Square className="w-5 h-5" />
              STOP MONITORING
            </button>
          )}
          <button
            onClick={() => { setOutput([]); setNetworks([]); setMonitoring(false); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>

        {/* Status Bar */}
        {monitoring && (
          <div className="mt-4 p-3 bg-cyber-gray/50 rounded-lg border border-neon-blue/30">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
                <span className="text-gray-400">MONITORING ACTIVE</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-400">Networks: <span className="text-neon-blue">{networks.length}</span></span>
                <span className="text-gray-400">Packets: <span className="text-neon-green">{networks.reduce((a, b) => a + b.packets, 0)}</span></span>
                <span className="text-gray-400">Uptime: <span className="text-neon-yellow">00:00:{(Date.now() % 60).toString().padStart(2, '0')}</span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Network List */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-neon-blue" />
            <span className="text-sm font-display text-gray-300">DETECTED NETWORKS</span>
          </div>
          <span className="text-xs text-gray-500">{networks.length} networks</span>
        </div>
        {networks.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <Radar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No networks detected yet</p>
            <p className="text-xs mt-2">Start monitoring to scan for wireless networks</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
            {networks.map((network) => (
              <div
                key={network.id}
                className={`p-4 hover:bg-cyber-gray/30 transition-all cursor-pointer ${
                  selectedNetwork?.id === network.id ? 'bg-neon-blue/10' : ''
                }`}
                onClick={() => setSelectedNetwork(network)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      network.encryption === 'Open' ? 'bg-neon-red' :
                      network.encryption === 'WEP' ? 'bg-neon-yellow' :
                      'bg-neon-green'
                    }`}></div>
                    <span className="font-mono text-neon-blue font-bold">{network.essid || '(Hidden)'}</span>
                    <span className="text-xs text-gray-500 font-mono">{network.bssid}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    network.encryption === 'Open' ? 'bg-neon-red/20 text-neon-red' :
                    network.encryption === 'WEP' ? 'bg-neon-yellow/20 text-neon-yellow' :
                    'bg-neon-green/20 text-neon-green'
                  }`}>
                    {network.encryption}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-400">
                  <div>
                    <span className="text-gray-500">Channel</span>
                    <p className="text-gray-300">{network.channel}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Signal</span>
                    <p className="text-gray-300">{network.signal} dBm</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Clients</span>
                    <p className="text-gray-300">{network.clients}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Packets</span>
                    <p className="text-gray-300">{network.packets.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Network Details */}
      {selectedNetwork && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-3 flex items-center gap-2">
            <Map className="w-4 h-4 text-neon-blue" />
            NETWORK DETAILS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500 text-xs">BSSID</span>
              <p className="text-neon-blue font-mono">{selectedNetwork.bssid}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">ESSID</span>
              <p className="text-gray-300 font-mono">{selectedNetwork.essid || '(Hidden)'}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Channel</span>
              <p className="text-gray-300 font-mono">{selectedNetwork.channel}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Encryption</span>
              <p className="text-gray-300 font-mono">{selectedNetwork.encryption}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Signal</span>
              <p className="text-gray-300 font-mono">{selectedNetwork.signal} dBm</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Clients</span>
              <p className="text-gray-300 font-mono">{selectedNetwork.clients}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Packets</span>
              <p className="text-gray-300 font-mono">{selectedNetwork.packets.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">First Seen</span>
              <p className="text-gray-300 font-mono">{selectedNetwork.firstSeen}</p>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">DETECTION LOG</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-4 h-48 overflow-y-auto font-mono text-sm bg-black/50">
          {output.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} Kismet ready...</p>
              <p>{'>'} Wireless network detector and sniffer</p>
              <p>{'>'} Start monitoring to detect networks</p>
              <p className="text-neon-blue/50">{'>'} Waiting for command_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'discover' ? 'text-neon-green' :
                    line.type === 'error' ? 'text-neon-red' :
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!monitoring && output.length > 0 && (
                <p className="text-neon-blue mt-2">{'>'} Monitoring stopped. Ready for new session_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-neon-blue" />
            KISMET FEATURES
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Passive 802.11 monitoring</li>
            <li>• Hidden network detection</li>
            <li>• Client device tracking</li>
            <li>• GPS integration</li>
            <li>• Packet capture & logging</li>
            <li>• Multi-interface support</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-green" />
            USAGE NOTES
          </h3>
          <p className="text-xs text-gray-400">
            Kismet operates in passive mode by default, making it undetectable.
            It can find hidden networks by analyzing traffic patterns and
            client behavior. Ideal for wireless site surveys and security audits.
          </p>
        </div>
      </div>
    </div>
  )
}

export default KismetModule
