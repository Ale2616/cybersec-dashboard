import { useState } from 'react'
import { Shield, AlertTriangle, FileText, Play, Square, Target, Database, PieChart, Server, Lock } from 'lucide-react'

const NexposeModule = ({ isScanning }) => {
  const [target, setTarget] = useState('')
  const [scanTemplate, setScanTemplate] = useState('discovery')
  const [output, setOutput] = useState([])
  const [scanning, setScanning] = useState(false)
  const [assets, setAssets] = useState([])
  const [vulnerabilities, setVulnerabilities] = useState([])
  const [scanProgress, setScanProgress] = useState(0)

  const templates = {
    discovery: { name: 'Discovery Scan', desc: 'Quick network discovery', duration: '~5 min' },
    audit: { name: 'Full Audit', desc: 'Comprehensive vulnerability scan', duration: '~30 min' },
    web: { name: 'Web Scan', desc: 'Web application security', duration: '~20 min' },
    malware: { name: 'Malware Analysis', desc: 'Detect malware indicators', duration: '~15 min' },
    sensitive: { name: 'Sensitive Data', desc: 'Find exposed sensitive data', duration: '~25 min' },
  }

  const sampleAssets = [
    { ip: '192.168.1.10', hostname: 'webserver01', os: 'Ubuntu 20.04', mac: '00:1A:2B:3C:4D:5E', risk: 85 },
    { ip: '192.168.1.15', hostname: 'dbserver01', os: 'CentOS 7', mac: 'AA:BB:CC:DD:EE:FF', risk: 92 },
    { ip: '192.168.1.20', hostname: 'workstation05', os: 'Windows 10', mac: '11:22:33:44:55:66', risk: 45 },
    { ip: '192.168.1.25', hostname: 'router01', os: 'Cisco IOS', mac: 'DE:AD:BE:EF:00:11', risk: 68 },
  ]

  const sampleVulns = [
    { name: 'Unpatched Apache Server', severity: 'high', exploits: 3, cve: 'CVE-2021-40438' },
    { name: 'SMB Signing Disabled', severity: 'medium', exploits: 0, cve: 'N/A' },
    { name: 'Weak SSH Configuration', severity: 'medium', exploits: 1, cve: 'CVE-2020-15778' },
    { name: 'Outdated OpenSSL', severity: 'high', exploits: 2, cve: 'CVE-2021-3449' },
    { name: 'Anonymous FTP Access', severity: 'low', exploits: 0, cve: 'N/A' },
    { name: 'MySQL Root Empty Password', severity: 'critical', exploits: 1, cve: 'N/A' },
  ]

  const simulateScan = () => {
    if (!target) return

    setScanning(true)
    setOutput([])
    setAssets([])
    setVulnerabilities([])
    setScanProgress(0)

    const steps = [
      { msg: `[NEXPOSE] Initializing Rapid7 scan engine...`, progress: 5, asset: false },
      { msg: `[TARGET] Scanning: ${target}`, progress: 8, asset: false },
      { msg: `[TEMPLATE] Using: ${templates[scanTemplate].name}`, progress: 10, asset: false },
      { msg: `[DISCOVER] Performing network discovery...`, progress: 15, asset: false },
      { msg: `[HOST] Found: 192.168.1.10 (webserver01)`, progress: 20, asset: true },
      { msg: `[HOST] Found: 192.168.1.15 (dbserver01)`, progress: 25, asset: true },
      { msg: `[HOST] Found: 192.168.1.20 (workstation05)`, progress: 30, asset: true },
      { msg: `[HOST] Found: 192.168.1.25 (router01)`, progress: 35, asset: true },
      { msg: `[FINGERPRINT] OS detection complete`, progress: 40, asset: false },
      { msg: `[SERVICE] Enumerating services...`, progress: 45, asset: false },
      { msg: `[VULN] Checking vulnerability database...`, progress: 55, asset: false },
      { msg: `[EXPLOIT] Checking exploit availability...`, progress: 65, asset: false },
      { msg: `[RISK] Calculating risk scores...`, progress: 75, asset: false },
      { msg: `[COMPLIANCE] Running compliance checks...`, progress: 85, asset: false },
      { msg: `[REPORT] Generating report...`, progress: 95, asset: false },
      { msg: `[COMPLETE] Scan finished successfully`, progress: 100, asset: false },
    ]

    let currentStep = 0

    const processStep = () => {
      if (currentStep >= steps.length) {
        setAssets(sampleAssets)
        setVulnerabilities(sampleVulns)
        setScanning(false)
        return
      }

      const step = steps[currentStep]
      setOutput(prev => [...prev, { text: step.msg, type: step.msg.includes('COMPLETE') ? 'complete' : 'info' }])
      setScanProgress(step.progress)

      if (step.asset) {
        setAssets(prev => [...prev, sampleAssets[prev.length]])
      }

      currentStep++
      setTimeout(processStep, 350)
    }

    processStep()
  }

  const getRiskColor = (risk) => {
    if (risk >= 80) return 'text-neon-red'
    if (risk >= 60) return 'text-orange-500'
    if (risk >= 40) return 'text-neon-yellow'
    return 'text-neon-green'
  }

  const getRiskBar = (risk) => {
    if (risk >= 80) return 'bg-neon-red'
    if (risk >= 60) return 'bg-orange-500'
    if (risk >= 40) return 'bg-neon-yellow'
    return 'bg-neon-green'
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-orange-500/20 rounded-lg">
            <Database className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-orange-500">NEXPOSE</h2>
            <p className="text-sm text-gray-400">Rapid7 Vulnerability Management</p>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-2">TARGET NETWORK</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="192.168.1.0/24 or specific IP"
                className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">SCAN TEMPLATE</label>
            <select
              value={scanTemplate}
              onChange={(e) => setScanTemplate(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all font-mono"
            >
              {Object.entries(templates).map(([key, value]) => (
                <option key={key} value={key}>{value.name} - {value.desc} ({value.duration})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateScan}
            disabled={scanning || !target}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500 rounded-lg text-orange-500 font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {scanning ? 'SCANNING...' : 'START SCAN'}
          </button>
          <button
            onClick={() => { setOutput([]); setAssets([]); setVulnerabilities([]); setScanning(false); setScanProgress(0); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Assets Found */}
      {assets.length > 0 && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-display text-gray-300">DISCOVERED ASSETS</span>
            </div>
            <span className="text-xs text-gray-500">{assets.length} hosts</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cyber-gray/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">IP ADDRESS</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">HOSTNAME</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">OS</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">MAC</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">RISK SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {assets.map((asset, index) => (
                  <tr key={index} className="hover:bg-cyber-gray/30 transition-all">
                    <td className="px-4 py-3 font-mono text-neon-blue">{asset.ip}</td>
                    <td className="px-4 py-3 text-gray-300">{asset.hostname}</td>
                    <td className="px-4 py-3 text-gray-400">{asset.os}</td>
                    <td className="px-4 py-3 font-mono text-gray-500">{asset.mac}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-800 rounded-full w-16">
                          <div
                            className={`h-full rounded-full ${getRiskBar(asset.risk)}`}
                            style={{ width: `${asset.risk}%` }}
                          ></div>
                        </div>
                        <span className={`font-bold ${getRiskColor(asset.risk)}`}>{asset.risk}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vulnerabilities */}
      {vulnerabilities.length > 0 && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neon-red" />
              <span className="text-sm font-display text-gray-300">VULNERABILITIES</span>
            </div>
            <span className="text-xs text-neon-red">{vulnerabilities.filter(v => v.severity === 'critical' || v.severity === 'high').length} require attention</span>
          </div>
          <div className="divide-y divide-gray-700 max-h-64 overflow-y-auto">
            {vulnerabilities.map((vuln, index) => (
              <div key={index} className="p-4 hover:bg-cyber-gray/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      vuln.severity === 'critical' ? 'bg-neon-red' :
                      vuln.severity === 'high' ? 'bg-orange-500' :
                      vuln.severity === 'medium' ? 'bg-neon-yellow' :
                      'bg-neon-blue'
                    }`}></div>
                    <div>
                      <p className="text-sm text-gray-300">{vuln.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{vuln.cve}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      vuln.severity === 'critical' ? 'bg-neon-red/20 text-neon-red' :
                      vuln.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                      vuln.severity === 'medium' ? 'bg-neon-yellow/20 text-neon-yellow' :
                      'bg-neon-blue/20 text-neon-blue'
                    }`}>
                      {vuln.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{vuln.exploits} exploits</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">SCAN LOG</span>
          </div>
          {scanning && (
            <span className="text-xs text-orange-500">{scanProgress}% complete</span>
          )}
        </div>
        <div className="p-4 h-48 overflow-y-auto font-mono text-sm bg-black/50">
          {output.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} Nexpose Security Console ready...</p>
              <p>{'>'} Rapid7 vulnerability management</p>
              <p>{'>'} Configure scan and start</p>
              <p className="text-orange-500/50">{'>'} Waiting for command_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'complete' ? 'text-neon-green' : 'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!scanning && output.length > 0 && (
                <p className="text-orange-500 mt-2">{'>'} Scan complete. Review findings above_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
        <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-orange-500" />
          NEXPOSE FEATURES
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
          <div>
            <strong className="text-gray-300">Real Risk Score:</strong> Prioritizes vulns by exploit availability
          </div>
          <div>
            <strong className="text-gray-300">Integration:</strong> Connects with Metasploit for exploitation
          </div>
          <div>
            <strong className="text-gray-300">Compliance:</strong> CIS, HIPAA, PCI-DSS, SOX audits
          </div>
          <div>
            <strong className="text-gray-300">Tracking:</strong> Trend analysis over time
          </div>
        </div>
      </div>
    </div>
  )
}

export default NexposeModule
