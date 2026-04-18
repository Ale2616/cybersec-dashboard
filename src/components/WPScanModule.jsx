import { useState } from 'react'
import { Shield, Bug, FileText, Play, Square, Target, Globe, Lock, AlertTriangle, Database, Users, Plug, Settings } from 'lucide-react'

const WPScanModule = ({ isScanning }) => {
  const [targetUrl, setTargetUrl] = useState('')
  const [scanOptions, setScanOptions] = useState({
    detectTheme: true,
    detectPlugins: true,
    detectUsers: true,
    enumerateVulns: true,
    aggressiveMode: false,
  })
  const [output, setOutput] = useState([])
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState(null)
  const [scanProgress, setScanProgress] = useState(0)

  const sampleResults = {
    wordpress: {
      version: '6.4.2',
      status: 'vulnerable',
      released: '2024-01-09',
      vulns: 3,
    },
    theme: {
      name: 'twentytwentyfour',
      version: '1.0',
      location: '/wp-content/themes/twentytwentyfour/',
      vulns: 0,
    },
    plugins: [
      { name: 'woocommerce', version: '8.5.1', vulns: 0, status: 'latest' },
      { name: 'contact-form-7', version: '5.8.4', vulns: 0, status: 'latest' },
      { name: 'elementor', version: '3.18.3', vulns: 1, status: 'vulnerable' },
      { name: 'yoast-seo', version: '21.9', vulns: 0, status: 'latest' },
      { name: 'wordfence', version: '7.11.0', vulns: 0, status: 'latest' },
    ],
    users: [
      { username: 'admin', id: 1, role: 'administrator' },
      { username: 'editor_john', id: 2, role: 'editor' },
      { username: 'author_mike', id: 3, role: 'author' },
    ],
    vulns: [
      { id: 'CVE-2024-25600', component: 'WordPress Core', severity: 'high', description: 'Stored XSS in block editor' },
      { id: 'CVE-2024-25601', component: 'WordPress Core', severity: 'medium', description: 'CSRF in REST API' },
      { id: 'CVE-2023-45320', component: 'Elementor', severity: 'critical', description: 'Arbitrary code execution' },
    ],
    config: {
      uploads: 'enabled',
      xmlrpc: 'enabled',
      restApi: 'enabled',
      wpConfig: 'protected',
      debugLog: 'hidden',
    }
  }

  const simulateScan = () => {
    if (!targetUrl) return

    setScanning(true)
    setOutput([])
    setResults(null)
    setScanProgress(0)

    const steps = [
      { msg: `[WPSCAN] Initializing WPScan v3.8.25...`, progress: 5 },
      { msg: `[TARGET] Scanning: ${targetUrl}`, progress: 8 },
      { msg: `[CMS] Detecting WordPress installation...`, progress: 10 },
      { msg: `[CMS] WordPress confirmed!`, progress: 15 },
      { msg: `[VERSION] Checking WordPress version...`, progress: 18 },
      { msg: `[VERSION] Found: ${sampleResults.wordpress.version}`, progress: 20 },
      { msg: `[VULN] Checking vulnerability database...`, progress: 25 },
      { msg: `[VULN] ${sampleResults.wordpress.vulns} vulnerabilities found for core`, progress: 28 },
      { msg: `[THEME] Detecting theme...`, progress: 30 },
      { msg: `[THEME] Found: ${sampleResults.theme.name} v${sampleResults.theme.version}`, progress: 35 },
      { msg: `[PLUGINS] Enumerating plugins (--enumerate-p)...`, progress: 40 },
      { msg: `[PLUGIN] Found: woocommerce ${sampleResults.plugins[0].version}`, progress: 45 },
      { msg: `[PLUGIN] Found: contact-form-7 ${sampleResults.plugins[1].version}`, progress: 48 },
      { msg: `[PLUGIN] Found: elementor ${sampleResults.plugins[2].version}`, progress: 50 },
      { msg: `[PLUGIN] Found: yoast-seo ${sampleResults.plugins[3].version}`, progress: 52 },
      { msg: `[PLUGIN] Found: wordfence ${sampleResults.plugins[4].version}`, progress: 55 },
      { msg: `[VULN] Checking plugin vulnerabilities...`, progress: 60 },
      { msg: `[VULN] Elementor ${sampleResults.plugins[2].version} has 1 vulnerability`, progress: 65 },
      { msg: `[USERS] Enumerating users (--enumerate-u)...`, progress: 70 },
      { msg: `[USER] Found: admin (id: 1, role: administrator)`, progress: 75 },
      { msg: `[USER] Found: editor_john (id: 2, role: editor)`, progress: 78 },
      { msg: `[USER] Found: author_mike (id: 3, role: author)`, progress: 80 },
      { msg: `[CONFIG] Checking configuration files...`, progress: 85 },
      { msg: `[CONFIG] XML-RPC: Enabled (potential brute force)`, progress: 88 },
      { msg: `[CONFIG] REST API: Enabled`, progress: 90 },
      { msg: `[CONFIG] Uploads: Enabled`, progress: 92 },
      { msg: `[REPORT] Generating report...`, progress: 95 },
      { msg: `[COMPLETE] Scan finished successfully`, progress: 100 },
    ]

    let currentStep = 0

    const processStep = () => {
      if (currentStep >= steps.length) {
        setResults(sampleResults)
        setScanning(false)
        return
      }

      const step = steps[currentStep]
      setOutput(prev => [...prev, { text: step.msg, type: step.msg.includes('VULN') ? 'vuln' : step.msg.includes('COMPLETE') ? 'complete' : 'info' }])
      setScanProgress(step.progress)
      currentStep++

      setTimeout(processStep, 250)
    }

    processStep()
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-blue/20 rounded-lg">
            <Globe className="w-8 h-8 text-neon-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-blue">WPSCAN</h2>
            <p className="text-sm text-gray-400">WordPress Security Scanner</p>
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
                placeholder="https://wordpress.com or http://192.168.1.1"
                className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Scan Options */}
        <div className="mt-4">
          <label className="block text-xs text-gray-400 mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            SCAN OPTIONS
          </label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(scanOptions).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setScanOptions(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`px-4 py-2 rounded-lg border text-sm font-mono transition-all ${
                  value
                    ? 'bg-neon-blue/20 border-neon-blue text-neon-blue'
                    : 'bg-cyber-gray border-gray-700 text-gray-500'
                }`}
              >
                {key === 'detectTheme' && '--enumerate-t'}
                {key === 'detectPlugins' && '--enumerate-p'}
                {key === 'detectUsers' && '--enumerate-u'}
                {key === 'enumerateVulns' && '--vp'}
                {key === 'aggressiveMode' && '--aggressive'}
              </button>
            ))}
          </div>
        </div>

        {/* API Token */}
        <div className="mt-4">
          <label className="block text-xs text-gray-400 mb-2">WPSCAN API TOKEN (Optional)</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="password"
              placeholder="Enter API token for latest vulnerability data"
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all font-mono text-sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateScan}
            disabled={scanning || !targetUrl}
            className="flex items-center gap-2 px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue rounded-lg text-neon-blue font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {scanning ? 'SCANNING...' : 'START SCAN'}
          </button>
          <button
            onClick={() => { setOutput([]); setResults(null); setScanning(false); setScanProgress(0); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <>
          {/* WordPress Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-neon-blue/20 rounded-lg">
                  <Globe className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">WordPress Version</p>
                  <p className="text-lg font-bold text-gray-300">{results.wordpress.version}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                results.wordpress.status === 'vulnerable'
                  ? 'bg-neon-red/20 text-neon-red'
                  : 'bg-neon-green/20 text-neon-green'
              }`}>
                {results.wordpress.vulns} VULNS
              </span>
            </div>

            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-neon-purple/20 rounded-lg">
                  <Plug className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Theme</p>
                  <p className="text-lg font-bold text-gray-300">{results.theme.name}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">v{results.theme.version}</span>
            </div>

            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-neon-green/20 rounded-lg">
                  <Users className="w-5 h-5 text-neon-green" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Users Found</p>
                  <p className="text-lg font-bold text-gray-300">{results.users.length}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">via enumeration</span>
            </div>
          </div>

          {/* Plugins */}
          <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center gap-2">
              <Plug className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-display text-gray-300">PLUGINS DETECTED</span>
            </div>
            <div className="divide-y divide-gray-700">
              {results.plugins.map((plugin, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-cyber-gray/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      plugin.vulns > 0 ? 'bg-neon-red' : 'bg-neon-green'
                    }`}></div>
                    <div>
                      <p className="text-sm font-mono text-gray-300">{plugin.name}</p>
                      <p className="text-xs text-gray-500">v{plugin.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {plugin.vulns > 0 && (
                      <span className="px-2 py-1 bg-neon-red/20 text-neon-red rounded text-xs font-bold">
                        {plugin.vulns} VULNS
                      </span>
                    )}
                    <span className={`text-xs ${
                      plugin.status === 'latest' ? 'text-neon-green' : 'text-neon-yellow'
                    }`}>
                      {plugin.status === 'latest' ? 'LATEST' : 'OUTDATED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vulnerabilities */}
          {results.vulns.length > 0 && (
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-neon-red" />
                  <span className="text-sm font-display text-gray-300">VULNERABILITIES</span>
                </div>
                <span className="text-xs text-neon-red">{results.vulns.length} total</span>
              </div>
              <div className="divide-y divide-gray-700">
                {results.vulns.map((vuln, index) => (
                  <div key={index} className="p-4 hover:bg-cyber-gray/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm text-gray-300">{vuln.description}</h4>
                        <p className="text-xs text-gray-500 font-mono mt-1">{vuln.id}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        vuln.severity === 'critical' ? 'bg-neon-red/20 text-neon-red' :
                        vuln.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                        'bg-neon-yellow/20 text-neon-yellow'
                      }`}>
                        {vuln.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Component: {vuln.component}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center gap-2">
              <Users className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-display text-gray-300">ENUMERATED USERS</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cyber-gray/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">ID</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">USERNAME</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">ROLE</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">RISK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {results.users.map((user) => (
                    <tr key={user.id} className="hover:bg-cyber-gray/30">
                      <td className="px-4 py-3 font-mono text-gray-500">{user.id}</td>
                      <td className="px-4 py-3 font-mono text-neon-blue">{user.username}</td>
                      <td className="px-4 py-3 text-gray-300">{user.role}</td>
                      <td className="px-4 py-3">
                        {user.username === 'admin' ? (
                          <span className="text-neon-red text-xs font-bold">HIGH (default admin)</span>
                        ) : (
                          <span className="text-neon-green text-xs">OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
            <h3 className="text-sm font-display text-gray-300 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-neon-blue" />
              CONFIGURATION CHECK
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(results.config).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-xs text-gray-500 uppercase">{key}</p>
                  <p className={`text-sm font-bold ${
                    value === 'enabled' ? 'text-neon-yellow' :
                    value === 'protected' || value === 'hidden' ? 'text-neon-green' :
                    'text-neon-red'
                  }`}>
                    {value.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Terminal Output */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-cyber-gray/50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">SCAN LOG</span>
          </div>
          {scanning && <span className="text-xs text-neon-blue">{scanProgress}%</span>}
        </div>
        <div className="p-4 h-48 overflow-y-auto font-mono text-sm bg-black/50">
          {output.length === 0 ? (
            <div className="text-gray-600">
              <p>{'>'} WPScan v3.8.25 ready...</p>
              <p>{'>'} WordPress security scanner</p>
              <p>{'>'} Powered by WPScan Vulnerability Database</p>
              <p className="text-neon-blue/50">{'>'} Waiting for command_</p>
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
                <p className="text-neon-blue mt-2">{'>'} Scan complete. Review results above_</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-blue" />
            SCAN CAPABILITIES
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• WordPress version detection</li>
            <li>• Plugin enumeration & vuln check</li>
            <li>• Theme detection</li>
            <li>• User enumeration</li>
            <li>• Config file checks</li>
            <li>• WPScan API integration</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-neon-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-display text-gray-300 mb-1">API TOKEN</h3>
              <p className="text-xs text-gray-400">
                Get a free API token from wpscan.com for access to the latest
                vulnerability database. Required for up-to-date results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WPScanModule
