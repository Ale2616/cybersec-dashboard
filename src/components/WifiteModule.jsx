import { useState } from 'react'
import { Wifi, Zap, Target, Play, Square, Terminal, Shield, AlertTriangle, Settings, Radio } from 'lucide-react'

const WifiteModule = ({ isScanning }) => {
  const [interfaceName, setInterfaceName] = useState('wlan0mon')
  const [targetType, setTargetType] = useState('all')
  const [attackOptions, setAttackOptions] = useState({
    wpa: true,
    wep: true,
    wps: true,
    pmkid: true,
    deauth: true,
  })
  const [output, setOutput] = useState([])
  const [running, setRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [targetsFound, setTargetsFound] = useState([])
  const [crackedNetworks, setCrackedNetworks] = useState([])

  const targetTypes = {
    all: { name: 'All Networks', desc: 'WEP, WPA, WPS targets' },
    wep: { name: 'WEP Only', desc: 'Legacy WEP networks' },
    wpa: { name: 'WPA/WPA2 Only', desc: 'Modern WPA networks' },
    wps: { name: 'WPS Only', desc: 'WPS-enabled routers' },
  }

  const sampleTargets = [
    { bssid: '00:1A:2B:3C:4D:5E', essid: 'HomeWiFi', channel: 6, power: -45, wps: true, encryption: 'WPA2' },
    { bssid: 'AA:BB:CC:DD:EE:FF', essid: 'OfficeNet', channel: 11, power: -52, wps: false, encryption: 'WPA2' },
    { bssid: '11:22:33:44:55:66', essid: 'Cafe_Guest', channel: 1, power: -68, wps: true, encryption: 'WPA' },
    { bssid: 'DE:AD:BE:EF:00:11', essid: 'Linksys', channel: 36, power: -61, wps: true, encryption: 'WPS' },
    { bssid: 'FE:DC:BA:98:76:54', essid: 'Netgear_5G', channel: 149, power: -73, wps: false, encryption: 'WPA3' },
  ]

  const simulateAttack = () => {
    setRunning(true)
    setOutput([])
    setTargetsFound(sampleTargets)
    setCrackedNetworks([])

    const steps = [
      { text: `[WIFITE] Starting automated attack...`, step: 'Initializing' },
      { text: `[INTERFACE] Using: ${interfaceName}`, step: 'Configuring' },
      { text: `[SCAN] Scanning for targets...`, step: 'Scanning' },
      { text: `[TARGET] Found ${sampleTargets.length} networks`, step: 'Scanning' },
      { text: `[SELECT] Targeting: HomeWiFi (00:1A:2B:3C:4D:5E)`, step: 'Targeting' },
      { text: `[DEAUTH] Sending deauth packets...`, step: 'Deauthing' },
      { text: `[HANDSHAKE] Capturing WPA handshake...`, step: 'Capturing' },
      { text: `[HANDSHAKE] Success! Handshake captured`, step: 'Captured' },
      { text: `[CRACK] Running aircrack-ng...`, step: 'Cracking' },
      { text: `[SUCCESS] Key found: "password123"`, step: 'Cracked' },
      { text: `[NEXT] Moving to next target...`, step: 'Targeting' },
      { text: `[TARGET] Targeting: Linksys (DE:AD:BE:EF:00:11)`, step: 'Targeting' },
      { text: `[WPS] Starting PixieDust attack...`, step: 'WPS Attack' },
      { text: `[SUCCESS] WPS PIN: 12345670`, step: 'WPS Attack' },
      { text: `[KEY] WPA Key: linksys2024`, step: 'Cracked' },
      { text: `[COMPLETE] Attack run finished!`, step: 'Complete' },
      { text: `[SUMMARY] 2 networks cracked, 3 targets remaining`, step: 'Summary' },
    ]

    let currentStepIndex = 0

    const processStep = () => {
      if (currentStepIndex >= steps.length) {
        setRunning(false)
        setCrackedNetworks([
          { essid: 'HomeWiFi', key: 'password123', method: 'WPA Handshake' },
          { essid: 'Linksys', key: 'linksys2024', method: 'WPS PixieDust' },
        ])
        return
      }

      const step = steps[currentStepIndex]
      setCurrentStep(step.step)
      setOutput(prev => [...prev, { text: step.text, type: step.text.includes('SUCCESS') ? 'success' : step.text.includes('COMPLETE') ? 'complete' : 'info' }])
      setCurrentStepIndex(prev => prev + 1)

      setTimeout(processStep, 800)
    }

    processStep()
  }

  const toggleOption = (option) => {
    setAttackOptions(prev => ({ ...prev, [option]: !prev[option] }))
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-yellow/20 rounded-lg">
            <Zap className="w-8 h-8 text-neon-yellow" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-yellow">WIFITE</h2>
            <p className="text-sm text-gray-400">Automated WiFi Attack Framework</p>
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
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-yellow focus:outline-none focus:ring-1 focus:ring-neon-yellow transition-all font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">TARGET TYPE</label>
            <select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-yellow focus:outline-none focus:ring-1 focus:ring-neon-yellow transition-all font-mono"
            >
              {Object.entries(targetTypes).map(([key, value]) => (
                <option key={key} value={key}>{value.name} - {value.desc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Attack Options */}
        <div className="mt-4">
          <label className="block text-xs text-gray-400 mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            ATTACK OPTIONS
          </label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(attackOptions).map(([key, value]) => (
              <button
                key={key}
                onClick={() => toggleOption(key)}
                className={`px-4 py-2 rounded-lg border text-sm font-mono transition-all ${
                  value
                    ? 'bg-neon-yellow/20 border-neon-yellow text-neon-yellow'
                    : 'bg-cyber-gray border-gray-700 text-gray-500'
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateAttack}
            disabled={running}
            className="flex items-center gap-2 px-6 py-3 bg-neon-yellow/20 hover:bg-neon-yellow/30 border border-neon-yellow rounded-lg text-neon-yellow font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {running ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {running ? 'ATTACKING...' : 'START AUTO ATTACK'}
          </button>
          <button
            onClick={() => { setOutput([]); setRunning(false); setTargetsFound([]); setCrackedNetworks([]); setCurrentStep(''); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            RESET
          </button>
        </div>

        {/* Status Bar */}
        {running && (
          <div className="mt-4 p-3 bg-neon-yellow/10 rounded-lg border border-neon-yellow/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse"></div>
                <span className="text-neon-yellow font-mono text-sm">CURRENT: {currentStep}</span>
              </div>
              <span className="text-xs text-gray-400">
                Cracked: {crackedNetworks.length} | Targets: {targetsFound.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Targets Grid */}
      {targetsFound.length > 0 && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-neon-yellow" />
              <span className="text-sm font-display text-gray-300">DETECTED TARGETS</span>
            </div>
            <span className="text-xs text-gray-500">{targetsFound.length} networks</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {targetsFound.map((target, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  crackedNetworks.find(n => n.essid === target.essid)
                    ? 'bg-neon-green/10 border-neon-green'
                    : 'bg-cyber-gray/50 border-gray-700 hover:border-neon-yellow'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Radio className={`w-4 h-4 ${
                      target.power < -60 ? 'text-neon-green' :
                      target.power < -70 ? 'text-neon-yellow' :
                      'text-neon-red'
                    }`} />
                    <span className="font-mono font-bold text-gray-300">{target.essid}</span>
                  </div>
                  {crackedNetworks.find(n => n.essid === target.essid) && (
                    <span className="text-xs text-neon-green">✓ CRACKED</span>
                  )}
                </div>
                <div className="space-y-1 text-xs text-gray-400 font-mono">
                  <div className="flex justify-between">
                    <span>BSSID:</span>
                    <span className="text-neon-blue">{target.bssid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Channel:</span>
                    <span>{target.channel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Power:</span>
                    <span>{target.power} dBm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Encryption:</span>
                    <span className={target.wps ? 'text-neon-yellow' : 'text-gray-400'}>
                      {target.encryption} {target.wps && '(WPS)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cracked Networks */}
      {crackedNetworks.length > 0 && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-neon-green/10 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-display text-neon-green">CRACKED NETWORKS</span>
          </div>
          <div className="divide-y divide-gray-700">
            {crackedNetworks.map((network, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-neon-green/20 rounded-lg">
                    <Key className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <p className="font-mono font-bold text-gray-300">{network.essid}</p>
                    <p className="text-xs text-gray-500">Method: {network.method}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">PASSWORD</p>
                    <p className="font-mono text-neon-green text-lg">{network.key}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-700 rounded transition-all">
                    <FileText className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
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
              <p>{'>'} Wifite v2.6.3 ready...</p>
              <p>{'>'} Automated wireless attack tool</p>
              <p>{'>'} Configure options and start attack</p>
              <p className="text-neon-yellow/50">{'>'} Waiting for command_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'success' ? 'text-neon-green' :
                    line.type === 'complete' ? 'text-neon-blue' :
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!running && output.length > 0 && (
                <p className="text-neon-yellow mt-2">{'>'} Attack complete. Ready for new run_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info & Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-yellow" />
            HOW WIFITE WORKS
          </h3>
          <p className="text-xs text-gray-400">
            Wifite automates the entire attack process: scans for targets,
            selects vulnerable networks, captures handshakes, runs WPS attacks,
            and cracks passwords using aircrack-ng, reaver, and other tools.
          </p>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-neon-red flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-display text-gray-300 mb-1">LEGAL WARNING</h3>
              <p className="text-xs text-gray-400">
                Only use on networks you own or have explicit permission to test.
                Unauthorized access to computer networks is a federal crime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WifiteModule
