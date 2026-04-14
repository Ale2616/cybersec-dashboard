import { useState } from 'react'
import { Shield, Bug, FileText, Play, Square, Target, Globe, Lock, AlertTriangle, Eye } from 'lucide-react'

const ZapModule = ({ isScanning }) => {
  const [targetUrl, setTargetUrl] = useState('')
  const [scanType, setScanType] = useState('full')
  const [output, setOutput] = useState([])
  const [scanning, setScanning] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [scanProgress, setScanProgress] = useState(0)
  const [spiderProgress, setSpiderProgress] = useState(0)

  const scanTypes = {
    quick: { name: 'Quick Scan', desc: 'Fast security check', duration: '~5 min' },
    full: { name: 'Full Scan', desc: 'Complete OWASP Top 10', duration: '~30 min' },
    api: { name: 'API Scan', desc: 'REST/SOAP API testing', duration: '~15 min' },
    ajax: { name: 'AJAX Spider', desc: 'JavaScript-heavy apps', duration: '~20 min' },
    baseline: { name: 'Baseline', desc: 'Passive scan only', duration: '~10 min' },
  }

  const sampleAlerts = [
    { id: 1, name: 'SQL Injection', severity: 'high', category: 'Injection', url: '/login.php', param: 'username' },
    { id: 2, name: 'Cross-Site Scripting (Reflected)', severity: 'medium', category: 'XSS', url: '/search', param: 'query' },
    { id: 3, name: 'CSRF Token Missing', severity: 'medium', category: 'CSRF', url: '/transfer', param: 'N/A' },
    { id: 4, name: 'Directory Traversal', severity: 'high', category: 'Path Traversal', url: '/files', param: 'path' },
    { id: 5, name: 'Insecure Direct Object Reference', severity: 'high', category: 'IDOR', url: '/user/profile', param: 'id' },
    { id: 6, name: 'Missing Security Headers', severity: 'low', category: 'Headers', url: '/*', param: 'N/A' },
    { id: 7, name: 'Weak SSL/TLS Configuration', severity: 'medium', category: 'Crypto', url: 'https://', param: 'N/A' },
    { id: 8, name: 'Information Disclosure', severity: 'low', category: 'Info', url: '/error', param: 'N/A' },
    { id: 9, name: 'Broken Authentication', severity: 'critical', category: 'Auth', url: '/admin', param: 'session' },
    { id: 10, name: 'Sensitive Data Exposure', severity: 'high', category: 'Data', url: '/api/users', param: 'N/A' },
  ]

  const simulateScan = () => {
    if (!targetUrl) return

    setScanning(true)
    setOutput([])
    setAlerts([])
    setScanProgress(0)
    setSpiderProgress(0)

    const steps = [
      { msg: `[ZAP] Initializing OWASP ZAP scanner...`, progress: 5, spider: 0 },
      { msg: `[TARGET] URL: ${targetUrl}`, progress: 8, spider: 0 },
      { msg: `[SCAN] Type: ${scanTypes[scanType].name}`, progress: 10, spider: 0 },
      { msg: `[SPIDER] Starting web crawler...`, progress: 15, spider: 10 },
      { msg: `[SPIDER] Found: /index.html`, progress: 18, spider: 20 },
      { msg: `[SPIDER] Found: /login.php`, progress: 20, spider: 30 },
      { msg: `[SPIDER] Found: /admin/`, progress: 22, spider: 40 },
      { msg: `[SPIDER] Found: /api/users`, progress: 25, spider: 50 },
      { msg: `[SPIDER] Found: /search`, progress: 28, spider: 60 },
      { msg: `[SPIDER] Found: /files`, progress: 30, spider: 70 },
      { msg: `[SPIDER] Complete: 45 URLs discovered`, progress: 35, spider: 100 },
      { msg: `[PASSIVE] Running passive scan rules...`, progress: 40, spider: 100 },
      { msg: `[ACTIVE] Starting active scan...`, progress: 45, spider: 100 },
      { msg: `[ALERT] SQL Injection detected in /login.php`, progress: 55, spider: 100 },
      { msg: `[ALERT] XSS vulnerability in /search`, progress: 60, spider: 100 },
      { msg: `[ALERT] Directory traversal in /files`, progress: 65, spider: 100 },
      { msg: `[ALERT] CSRF token missing`, progress: 70, spider: 100 },
      { msg: `[ALERT] Broken authentication detected`, progress: 75, spider: 100 },
      { msg: `[FUZZ] Running fuzzing tests...`, progress: 80, spider: 100 },
      { msg: `[REPORT] Generating HTML report...`, progress: 90, spider: 100 },
      { msg: `[COMPLETE] Scan finished`, progress: 100, spider: 100 },
    ]

    let currentStep = 0

    const processStep = () => {
      if (currentStep >= steps.length) {
        setAlerts(sampleAlerts)
        setScanning(false)
        return
      }

      const step = steps[currentStep]
      setOutput(prev => [...prev, { text: step.msg, type: step.msg.includes('ALERT') ? 'alert' : step.msg.includes('COMPLETE') ? 'complete' : 'info' }])
      setScanProgress(step.progress)
      setSpiderProgress(step.spider)
      currentStep++

      setTimeout(processStep, 300)
    }

    processStep()
  }

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-neon-red/20 text-neon-red border-neon-red',
      high: 'bg-orange-500/20 text-orange-500 border-orange-500',
      medium: 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow',
      low: 'bg-neon-blue/20 text-neon-blue border-neon-blue',
    }
    return colors[severity] || colors.low
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-green/20 rounded-lg">
            <Globe className="w-8 h-8 text-neon-green" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-green">OWASP ZAP</h2>
            <p className="text-sm text-gray-400">Web Application Security Scanner</p>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-2">TARGET URL</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com or http://192.168.1.1"
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
                <option key={key} value={key}>{value.name} - {value.desc} ({value.duration})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">AUTHENTICATION</label>
            <select className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all font-mono">
              <option>None (Anonymous)</option>
              <option>Form-based Login</option>
              <option>HTTP Basic Auth</option>
              <option>OAuth 2.0</option>
              <option>JWT Token</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateScan}
            disabled={scanning || !targetUrl}
            className="flex items-center gap-2 px-6 py-3 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green rounded-lg text-neon-green font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {scanning ? 'SCANNING...' : 'START SCAN'}
          </button>
          <button
            onClick={() => { setOutput([]); setAlerts([]); setScanning(false); setScanProgress(0); setSpiderProgress(0); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>

        {/* Progress Bars */}
        {scanning && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>SPIDER</span>
              <span>{spiderProgress}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon-blue transition-all" style={{ width: `${spiderProgress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>ACTIVE SCAN</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all" style={{ width: `${scanProgress}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Alerts Found */}
      {alerts.length > 0 && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-display text-gray-300">SECURITY ALERTS</span>
            </div>
            <div className="flex gap-2 text-xs">
              {['critical', 'high', 'medium', 'low'].map(sev => (
                <span key={sev} className={`px-2 py-1 rounded capitalize ${
                  sev === 'critical' ? 'bg-neon-red/20 text-neon-red' :
                  sev === 'high' ? 'bg-orange-500/20 text-orange-500' :
                  sev === 'medium' ? 'bg-neon-yellow/20 text-neon-yellow' :
                  'bg-neon-blue/20 text-neon-blue'
                }`}>
                  {sev}: {alerts.filter(a => a.severity === sev).length}
                </span>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-cyber-gray/30 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{alert.category}</span>
                    </div>
                    <h4 className="text-sm text-gray-300 font-mono">{alert.name}</h4>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-mono mt-2">
                  <span className="text-gray-400">URL:</span> {alert.url}
                  {alert.param !== 'N/A' && (
                    <span className="ml-4"><span className="text-gray-400">Param:</span> {alert.param}</span>
                  )}
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
              <p>{'>'} OWASP ZAP 2.14 ready...</p>
              <p>{'>'} Web application security scanner</p>
              <p>{'>'} OWASP Top 10 vulnerability detection</p>
              <p className="text-neon-green/50">{'>'} Waiting for command_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'alert' ? 'text-neon-red' :
                    line.type === 'complete' ? 'text-neon-green' :
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!scanning && output.length > 0 && (
                <p className="text-neon-green mt-2">{'>'} Scan complete. {alerts.length} alerts found_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-green" />
            OWASP TOP 10 COVERAGE
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <span>• Injection (SQL, NoSQL)</span>
            <span>• Broken Authentication</span>
            <span>• Sensitive Data Exposure</span>
            <span>• XML External Entities</span>
            <span>• Broken Access Control</span>
            <span>• Security Misconfig</span>
            <span>• Cross-Site Scripting</span>
            <span>• Insecure Deserialization</span>
          </div>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-neon-blue" />
            SCAN MODES
          </h3>
          <p className="text-xs text-gray-400">
            <strong className="text-gray-300">Spider:</strong> Crawls the application<br/>
            <strong className="text-gray-300">Active:</strong> Sends attack payloads<br/>
            <strong className="text-gray-300">Passive:</strong> Analyzes responses only<br/>
            <strong className="text-gray-300">AJAX:</strong> Handles JavaScript apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default ZapModule
