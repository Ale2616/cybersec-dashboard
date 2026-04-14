import { useState } from 'react'
import { Shield, AlertTriangle, FileText, Play, Square, Target, CheckCircle, XCircle, Bug, Server } from 'lucide-react'

const NessusModule = ({ isScanning }) => {
  const [target, setTarget] = useState('')
  const [scanType, setScanType] = useState('basic')
  const [output, setOutput] = useState([])
  const [scanning, setScanning] = useState(false)
  const [vulnerabilities, setVulnerabilities] = useState([])
  const [scanProgress, setScanProgress] = useState(0)

  const scanTypes = {
    basic: { name: 'Basic Network Scan', desc: 'Standard vulnerability detection', plugins: '~4000' },
    webapp: { name: 'Web Application', desc: 'OWASP Top 10 + web vulns', plugins: '~1500' },
    malware: { name: 'Malware Detection', desc: 'Scan for malware & backdoors', plugins: '~800' },
    compliance: { name: 'Compliance Audit', desc: 'CIS, PCI-DSS, HIPAA', plugins: '~2000' },
    full: { name: 'Full Deep Scan', desc: 'All plugins enabled', plugins: '~15000+' },
  }

  const sampleVulns = [
    { id: 'CVE-2021-44228', name: 'Apache Log4j Remote Code Execution', severity: 'critical', cvss: 10.0, port: 8080 },
    { id: 'CVE-2020-1938', name: 'Apache Tomcat AJP File Read', severity: 'high', cvss: 9.8, port: 8009 },
    { id: 'CVE-2019-11043', name: 'PHP-FPM Remote Code Execution', severity: 'high', cvss: 9.1, port: 80 },
    { id: 'CVE-2017-5638', name: 'Apache Struts RCE', severity: 'critical', cvss: 10.0, port: 80 },
    { id: 'CVE-2014-0160', name: 'OpenSSL Heartbleed', severity: 'high', cvss: 7.5, port: 443 },
    { id: 'CVE-2021-34473', name: 'ProxyShell Exchange RCE', severity: 'critical', cvss: 9.8, port: 443 },
    { id: 'CVE-2018-9995', name: 'DVR Camera Backdoor', severity: 'medium', cvss: 6.5, port: 80 },
    { id: 'WEAK-CIPHER', name: 'Weak SSL/TLS Ciphers', severity: 'medium', cvss: 4.3, port: 443 },
    { id: 'SMB-SIGNING', name: 'SMB Signing Not Required', severity: 'low', cvss: 3.1, port: 445 },
  ]

  const simulateScan = () => {
    if (!target) return

    setScanning(true)
    setOutput([])
    setVulnerabilities([])
    setScanProgress(0)

    const steps = [
      { msg: `[NESSUS] Initializing scan engine...`, progress: 5 },
      { msg: `[TARGET] Target: ${target}`, progress: 8 },
      { msg: `[SCAN] Type: ${scanTypes[scanType].name}`, progress: 10 },
      { msg: `[PLUGINS] Loading ${scanTypes[scanType].plugins} plugins...`, progress: 15 },
      { msg: `[DISCOVER] Host discovery in progress...`, progress: 20 },
      { msg: `[DISCOVER] Host is UP (latency: 12ms)`, progress: 25 },
      { msg: `[PORTS] Scanning ports...`, progress: 30 },
      { msg: `[PORTS] Found 15 open ports`, progress: 35 },
      { msg: `[SERVICES] Detecting services...`, progress: 40 },
      { msg: `[VULN] Checking CVE-2021-44228 (Log4j)...`, progress: 50 },
      { msg: `[VULN] FOUND: Critical vulnerability on port 8080`, progress: 55 },
      { msg: `[VULN] Checking CVE-2014-0160 (Heartbleed)...`, progress: 60 },
      { msg: `[VULN] FOUND: OpenSSL vulnerability on port 443`, progress: 65 },
      { msg: `[VULN] Running compliance checks...`, progress: 70 },
      { msg: `[VULN] Checking web application security...`, progress: 75 },
      { msg: `[VULN] Testing for SQL injection...`, progress: 80 },
      { msg: `[VULN] Testing for XSS vulnerabilities...`, progress: 85 },
      { msg: `[REPORT] Compiling results...`, progress: 90 },
      { msg: `[COMPLETE] Scan completed successfully`, progress: 100 },
      { msg: `[SUMMARY] ${sampleVulns.length} vulnerabilities found`, progress: 100 },
    ]

    let currentStep = 0

    const processStep = () => {
      if (currentStep >= steps.length) {
        setVulnerabilities(sampleVulns)
        setScanning(false)
        return
      }

      const step = steps[currentStep]
      setOutput(prev => [...prev, { text: step.msg, type: step.msg.includes('FOUND') ? 'vuln' : step.msg.includes('COMPLETE') ? 'complete' : 'info' }])
      setScanProgress(step.progress)
      currentStep++

      setTimeout(processStep, 400)
    }

    processStep()
  }

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-neon-red/20 text-neon-red border-neon-red',
      high: 'bg-orange-500/20 text-orange-500 border-orange-500',
      medium: 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow',
      low: 'bg-neon-blue/20 text-neon-blue border-neon-blue',
      info: 'bg-gray-500/20 text-gray-400 border-gray-500',
    }
    return colors[severity] || colors.info
  }

  const getSeverityIcon = (severity) => {
    if (severity === 'critical' || severity === 'high') return AlertTriangle
    if (severity === 'medium') return Bug
    return CheckCircle
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-red/20 rounded-lg">
            <Shield className="w-8 h-8 text-neon-red" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-red">NESSUS</h2>
            <p className="text-sm text-gray-400">Vulnerability Assessment Scanner</p>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-2">TARGET (IP / HOSTNAME / RANGE)</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="192.168.1.1 or scanme.nmap.org"
                className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-red focus:outline-none focus:ring-1 focus:ring-neon-red transition-all font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">SCAN TEMPLATE</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-red focus:outline-none focus:ring-1 focus:ring-neon-red transition-all font-mono"
            >
              {Object.entries(scanTypes).map(([key, value]) => (
                <option key={key} value={key}>{value.name} ({value.plugins} plugins)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateScan}
            disabled={scanning || !target}
            className="flex items-center gap-2 px-6 py-3 bg-neon-red/20 hover:bg-neon-red/30 border border-neon-red rounded-lg text-neon-red font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {scanning ? 'SCANNING...' : 'START SCAN'}
          </button>
          <button
            onClick={() => { setOutput([]); setVulnerabilities([]); setScanning(false); setScanProgress(0); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>

        {/* Progress Bar */}
        {scanning && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>SCAN PROGRESS</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-red via-orange-500 to-neon-red transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Vulnerabilities Found */}
      {vulnerabilities.length > 0 && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neon-red" />
              <span className="text-sm font-display text-gray-300">VULNERABILITIES FOUND</span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-neon-red/20 text-neon-red rounded">
                Critical: {vulnerabilities.filter(v => v.severity === 'critical').length}
              </span>
              <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded">
                High: {vulnerabilities.filter(v => v.severity === 'high').length}
              </span>
              <span className="px-2 py-1 bg-neon-yellow/20 text-neon-yellow rounded">
                Medium: {vulnerabilities.filter(v => v.severity === 'medium').length}
              </span>
              <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">
                Low: {vulnerabilities.filter(v => v.severity === 'low').length}
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
            {vulnerabilities.map((vuln, index) => {
              const Icon = getSeverityIcon(vuln.severity)
              return (
                <div key={index} className="p-4 hover:bg-cyber-gray/30 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        vuln.severity === 'critical' ? 'text-neon-red' :
                        vuln.severity === 'high' ? 'text-orange-500' :
                        vuln.severity === 'medium' ? 'text-neon-yellow' :
                        'text-neon-blue'
                      }`} />
                      <div>
                        <h4 className="font-mono text-sm text-gray-300">{vuln.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{vuln.id} • Port {vuln.port}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-bold border ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity.toUpperCase()} (CVSS {vuln.cvss})
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">SCAN LOG</span>
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
              <p>{'>'} Nessus Professional v10.0 ready...</p>
              <p>{'>'} Vulnerability management platform</p>
              <p>{'>'} Enter target and select scan template</p>
              <p className="text-neon-red/50">{'>'} Waiting for command_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'vuln' ? 'text-neon-red' :
                    line.type === 'complete' ? 'text-neon-green' :
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!scanning && output.length > 0 && (
                <p className="text-neon-red mt-2">{'>'} Scan complete. Review vulnerabilities above_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-neon-red" />
            SCAN CAPABILITIES
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• 60,000+ vulnerability checks</li>
            <li>• CVE, CIS, PCI-DSS compliance</li>
            <li>• Web app scanning (OWASP Top 10)</li>
            <li>• Malware & backdoor detection</li>
            <li>• Configuration auditing</li>
            <li>• Cloud asset scanning</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-neon-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-display text-gray-300 mb-1">AUTHENTICATION</h3>
              <p className="text-xs text-gray-400">
                For best results, provide credentials for authenticated scanning.
                This enables deeper vulnerability detection and configuration checks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NessusModule
