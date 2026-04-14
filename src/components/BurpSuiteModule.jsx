import { useState } from 'react'
import { Shield, Bug, FileText, Play, Square, Target, Eye, Lock, Settings, Terminal, Globe, Search } from 'lucide-react'

const BurpSuiteModule = ({ isScanning }) => {
  const [targetUrl, setTargetUrl] = useState('')
  const [scanMode, setScanMode] = useState('active')
  const [output, setOutput] = useState([])
  const [scanning, setScanning] = useState(false)
  const [issues, setIssues] = useState([])
  const [scanProgress, setScanProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('scanner')
  const [requestCount, setRequestCount] = useState(0)

  const scanModes = {
    active: { name: 'Active Scan', desc: 'Send attack payloads' },
    passive: { name: 'Passive Scan', desc: 'Analyze traffic only' },
    audit: { name: 'Full Audit', desc: 'Complete security audit' },
    crawl: { name: 'Crawl Only', desc: 'Map the application' },
  }

  const sampleIssues = [
    { id: 1, name: 'SQL Injection (Boolean-based)', severity: 'high', type: 'Injection', location: 'POST /login', param: 'username' },
    { id: 2, name: 'Reflected XSS', severity: 'medium', type: 'XSS', location: 'GET /search', param: 'q' },
    { id: 3, name: 'Invalid Content-Type', severity: 'info', type: 'Headers', location: 'POST /api', param: 'N/A' },
    { id: 4, name: 'Session Cookie Without HttpOnly', severity: 'low', type: 'Session', location: 'Set-Cookie', param: 'PHPSESSID' },
    { id: 5, name: 'HTML Injection', severity: 'low', type: 'XSS', location: 'GET /profile', param: 'name' },
    { id: 6, name: 'External Redirect', severity: 'medium', type: 'Redirect', location: 'GET /redirect', param: 'url' },
    { id: 7, name: 'Path Traversal', severity: 'high', type: 'File', location: 'GET /download', param: 'file' },
    { id: 8, name: 'Insecure Form Action', severity: 'info', type: 'Config', location: 'POST /upload', param: 'N/A' },
    { id: 9, name: 'CORS Misconfiguration', severity: 'medium', type: 'CORS', location: 'OPTIONS /api', param: 'N/A' },
    { id: 10, name: 'JWT Token Weakness', severity: 'high', type: 'Auth', location: 'Authorization Header', param: 'token' },
  ]

  const sampleRequests = [
    { method: 'GET', url: '/index.html', status: 200, length: 4521 },
    { method: 'POST', url: '/login', status: 302, length: 0 },
    { method: 'GET', url: '/dashboard', status: 200, length: 12453 },
    { method: 'GET', url: '/api/users', status: 200, length: 2341 },
    { method: 'POST', url: '/api/data', status: 500, length: 523 },
  ]

  const simulateScan = () => {
    if (!targetUrl) return

    setScanning(true)
    setOutput([])
    setIssues([])
    setScanProgress(0)
    setRequestCount(0)

    const steps = [
      { msg: `[BURP] Initializing Burp Suite Professional...`, progress: 5 },
      { msg: `[TARGET] Configured: ${targetUrl}`, progress: 8 },
      { msg: `[MODE] Scan type: ${scanModes[scanMode].name}`, progress: 10 },
      { msg: `[CRAWL] Starting application crawl...`, progress: 15 },
      { msg: `[CRAWL] Discovered /index.html`, progress: 18 },
      { msg: `[CRAWL] Discovered /login`, progress: 20 },
      { msg: `[CRAWL] Discovered /dashboard`, progress: 22 },
      { msg: `[CRAWL] Discovered /api/users`, progress: 25 },
      { msg: `[CRAWL] Discovered /admin`, progress: 28 },
      { msg: `[CRAWL] Complete: 32 endpoints mapped`, progress: 30 },
      { msg: `[SCANNER] Starting active scanner...`, progress: 35 },
      { msg: `[INJECT] Testing SQL injection vectors...`, progress: 40 },
      { msg: `[FIND] SQL Injection in /login (username)`, progress: 45 },
      { msg: `[INJECT] Testing XSS payloads...`, progress: 50 },
      { msg: `[FIND] Reflected XSS in /search`, progress: 55 },
      { msg: `[INJECT] Testing path traversal...`, progress: 60 },
      { msg: `[FIND] Path traversal in /download`, progress: 65 },
      { msg: `[INJECT] Testing authentication bypass...`, progress: 70 },
      { msg: `[FIND] JWT weakness detected`, progress: 75 },
      { msg: `[AUDIT] Running security checks...`, progress: 80 },
      { msg: `[AUDIT] Checking security headers...`, progress: 85 },
      { msg: `[REPORT] Compiling findings...`, progress: 95 },
      { msg: `[COMPLETE] Scan completed`, progress: 100 },
    ]

    let currentStep = 0

    const processStep = () => {
      if (currentStep >= steps.length) {
        setIssues(sampleIssues)
        setRequestCount(847)
        setScanning(false)
        return
      }

      const step = steps[currentStep]
      setOutput(prev => [...prev, { text: step.msg, type: step.msg.includes('FIND') ? 'find' : step.msg.includes('COMPLETE') ? 'complete' : 'info' }])
      setScanProgress(step.progress)
      currentStep++

      setTimeout(processStep, 350)
    }

    processStep()
  }

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-neon-red/20 text-neon-red',
      medium: 'bg-orange-500/20 text-orange-500',
      low: 'bg-neon-yellow/20 text-neon-yellow',
      info: 'bg-neon-blue/20 text-neon-blue',
    }
    return colors[severity] || colors.info
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
            <h2 className="text-2xl font-display font-bold text-neon-red">BURP SUITE</h2>
            <p className="text-sm text-gray-400">Web Security Testing Platform</p>
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
                placeholder="https://target.com"
                className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-red focus:outline-none focus:ring-1 focus:ring-neon-red transition-all font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">SCAN MODE</label>
            <select
              value={scanMode}
              onChange={(e) => setScanMode(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-red focus:outline-none focus:ring-1 focus:ring-neon-red transition-all font-mono"
            >
              {Object.entries(scanModes).map(([key, value]) => (
                <option key={key} value={key}>{value.name} - {value.desc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">SCOPE</label>
            <select className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-red focus:outline-none focus:ring-1 focus:ring-neon-red transition-all font-mono">
              <option>Target only</option>
              <option>Target + children</option>
              <option>Target + subdomains</option>
              <option>Custom scope</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateScan}
            disabled={scanning || !targetUrl}
            className="flex items-center gap-2 px-6 py-3 bg-neon-red/20 hover:bg-neon-red/30 border border-neon-red rounded-lg text-neon-red font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {scanning ? 'SCANNING...' : 'START SCAN'}
          </button>
          <button
            onClick={() => { setOutput([]); setIssues([]); setScanning(false); setScanProgress(0); setRequestCount(0); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        {[
          { id: 'scanner', label: 'SCANNER', icon: Shield },
          { id: 'proxy', label: 'PROXY', icon: Eye },
          { id: 'repeater', label: 'REPEATER', icon: Settings },
          { id: 'intruder', label: 'INTRUDER', icon: Target },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono transition-all ${
              activeTab === tab.id
                ? 'text-neon-red border-b-2 border-neon-red'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'scanner' && issues.length > 0 && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4 text-neon-red" />
              <span className="text-sm font-display text-gray-300">SECURITY ISSUES</span>
            </div>
            <span className="text-xs text-gray-500">{issues.length} findings</span>
          </div>
          <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
            {issues.map((issue) => (
              <div key={issue.id} className="p-4 hover:bg-cyber-gray/30 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${getSeverityColor(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{issue.type}</span>
                    </div>
                    <h4 className="text-sm text-gray-300 font-mono">{issue.name}</h4>
                    <p className="text-xs text-gray-500 font-mono mt-1">
                      {issue.location} • Param: {issue.param}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'proxy' && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-neon-blue" />
              <span className="text-sm font-display text-gray-300">PROXY HISTORY</span>
            </div>
            <span className="text-xs text-gray-500">{requestCount} requests</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead className="bg-cyber-gray/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs text-gray-400">#</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400">METHOD</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400">URL</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400">STATUS</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400">LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sampleRequests.map((req, i) => (
                  <tr key={i} className="hover:bg-cyber-gray/30">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className={`px-4 py-2 ${
                      req.method === 'GET' ? 'text-neon-blue' :
                      req.method === 'POST' ? 'text-neon-green' :
                      'text-neon-yellow'
                    }`}>{req.method}</td>
                    <td className="px-4 py-2 text-gray-300">{req.url}</td>
                    <td className={`px-4 py-2 ${
                      req.status === 200 ? 'text-neon-green' :
                      req.status >= 300 && req.status < 400 ? 'text-neon-yellow' :
                      'text-neon-red'
                    }`}>{req.status}</td>
                    <td className="px-4 py-2 text-gray-400">{req.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'repeater' && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                <FileText className="w-3 h-3" /> REQUEST
              </h4>
              <textarea
                className="w-full h-48 bg-black/50 border border-gray-700 rounded p-3 text-xs font-mono text-gray-300 focus:border-neon-red focus:outline-none"
                defaultValue={`GET /admin HTTP/1.1
Host: target.com
User-Agent: Mozilla/5.0
Accept: */*
Cookie: session=abc123`}
              />
            </div>
            <div>
              <h4 className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                <FileText className="w-3 h-3" /> RESPONSE
              </h4>
              <textarea
                readOnly
                className="w-full h-48 bg-black/50 border border-gray-700 rounded p-3 text-xs font-mono text-gray-300 focus:outline-none"
                defaultValue={`HTTP/1.1 403 Forbidden
Content-Type: text/html
Content-Length: 1234

<html><body>Access Denied</body></html>`}
              />
            </div>
          </div>
          <button className="mt-3 px-4 py-2 bg-neon-red/20 border border-neon-red text-neon-red rounded text-xs font-mono hover:bg-neon-red/30 transition-all">
            SEND REQUEST
          </button>
        </div>
      )}

      {activeTab === 'intruder' && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs text-gray-400 mb-2">PAYLOAD CONFIGURATION</h4>
              <div className="flex gap-2">
                <select className="flex-1 bg-cyber-gray border border-gray-700 rounded py-2 px-3 text-xs text-white font-mono">
                  <option>Simple list</option>
                  <option>Number range</option>
                  <option>Brute force</option>
                  <option>Custom payload set</option>
                </select>
                <button className="px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded text-xs font-mono hover:bg-neon-green/30 transition-all">
                  LOAD
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xs text-gray-400 mb-2">PAYLOADS (sample)</h4>
              <div className="h-32 bg-black/50 border border-gray-700 rounded p-3 overflow-y-auto font-mono text-xs text-gray-400">
                <div>admin</div>
                <div>root</div>
                <div>user</div>
                <div>test</div>
                <div>guest</div>
                <div>administrator</div>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-neon-yellow/20 border border-neon-yellow text-neon-yellow rounded text-xs font-mono hover:bg-neon-yellow/30 transition-all">
              START ATTACK
            </button>
          </div>
        </div>
      )}

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">SCAN LOG</span>
          </div>
          {scanning && <span className="text-xs text-neon-red">{scanProgress}%</span>}
        </div>
        <div className="p-4 h-40 overflow-y-auto font-mono text-sm bg-black/50">
          {output.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} Burp Suite Professional v2024</p>
              <p>{'>'} Web security testing platform</p>
              <p>{'>'} Configure target and start scan</p>
              <p className="text-neon-red/50">{'>'} Waiting for command_</p>
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.type === 'find' ? 'text-neon-red' :
                    line.type === 'complete' ? 'text-neon-green' :
                    'text-gray-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!scanning && output.length > 0 && (
                <p className="text-neon-red mt-2">{'>'} Scan complete. {issues.length} issues found_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
        <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
          <Settings className="w-4 h-4 text-neon-red" />
          BURP TOOLS
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-400">
          <span>• Proxy (Intercept)</span>
          <span>• Scanner (Active/Passive)</span>
          <span>• Intruder (Fuzzing)</span>
          <span>• Repeater (Manual)</span>
          <span>• Sequencer (Tokens)</span>
          <span>• Decoder (Encode/Decode)</span>
          <span>• Comparer (Diff)</span>
          <span>• Logger (History)</span>
        </div>
      </div>
    </div>
  )
}

export default BurpSuiteModule
