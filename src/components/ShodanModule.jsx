import { useState } from 'react'
import { Search, Globe, Server, MapPin, Shield, AlertTriangle } from 'lucide-react'

const ShodanModule = ({ isScanning }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  const sampleResults = [
    {
      ip: '192.168.1.100',
      ports: [22, 80, 443, 8080],
      os: 'Linux 4.15+',
      location: 'United States',
      org: 'Amazon.com',
      vulns: ['CVE-2021-44228', 'CVE-2020-1938'],
      services: ['SSH', 'HTTP', 'HTTPS', 'Proxy']
    },
    {
      ip: '10.0.0.50',
      ports: [21, 22, 3306, 5432],
      os: 'Ubuntu 20.04',
      location: 'Germany',
      org: 'Hetzner Online',
      vulns: ['CVE-2021-3156'],
      services: ['FTP', 'SSH', 'MySQL', 'PostgreSQL']
    },
    {
      ip: '172.16.0.25',
      ports: [80, 443, 8443],
      os: 'CentOS 7',
      location: 'Netherlands',
      org: 'DigitalOcean',
      vulns: [],
      services: ['HTTP', 'HTTPS', 'Admin Panel']
    },
    {
      ip: '203.0.113.42',
      ports: [22, 23, 80, 161],
      os: 'Embedded Device',
      location: 'Singapore',
      org: 'Unknown',
      vulns: ['CVE-2017-17215', 'CVE-2018-9995'],
      services: ['SSH', 'Telnet', 'HTTP', 'SNMP']
    },
  ]

  const simulateSearch = () => {
    if (!query) return

    setSearching(true)
    setResults([])

    setTimeout(() => {
      setResults(sampleResults)
      setSearching(false)
    }, 1500)
  }

  const getSeverityColor = (count) => {
    if (count === 0) return 'text-neon-green'
    if (count <= 2) return 'text-neon-yellow'
    return 'text-neon-red'
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-blue/20 rounded-lg">
            <Search className="w-8 h-8 text-neon-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold neon-text-blue">SHODAN</h2>
            <p className="text-sm text-gray-400">The Search Engine for the Internet of Things</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && simulateSearch()}
              placeholder='Search: port:22 "SSH" country:US or IP: 192.168.1.1'
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all font-mono"
            />
          </div>
          <button
            onClick={simulateSearch}
            disabled={searching || !query}
            className="px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue rounded-lg text-neon-blue font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {searching ? 'SEARCHING...' : 'SEARCH'}
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs text-gray-500">Quick:</span>
          {['port:22', 'port:3389', 'webcam', 'industrial', 'database', 'vuln:'].map((filter) => (
            <button
              key={filter}
              onClick={() => setQuery(filter)}
              className="px-3 py-1 bg-cyber-gray hover:bg-gray-700 border border-gray-600 rounded text-xs text-gray-400 hover:text-white transition-all"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-display text-gray-300">SEARCH RESULTS</span>
          </div>
          {results.length > 0 && (
            <span className="text-xs text-neon-blue">{results.length} hosts found</span>
          )}
        </div>

        {searching ? (
          <div className="p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4 font-mono">Querying Shodan API...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Enter a search query to discover devices</p>
            <p className="text-xs mt-2">Try: "apache", "port:21", or an IP address</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {results.map((result, index) => (
              <div key={index} className="p-4 hover:bg-cyber-gray/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                    <span className="font-mono text-neon-blue font-bold">{result.ip}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {result.location}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${getSeverityColor(result.vulns.length)}`}>
                    {result.vulns.length} VULNS
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Organization</span>
                    <p className="text-gray-300">{result.org}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Operating System</span>
                    <p className="text-gray-300">{result.os}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Open Ports</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {result.ports.map((port) => (
                        <span key={port} className="px-2 py-0.5 bg-gray-700 rounded text-gray-300">
                          {port}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Services</span>
                    <p className="text-gray-300">{result.services.join(', ')}</p>
                  </div>
                </div>

                {result.vulns.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-neon-red" />
                    <div className="flex flex-wrap gap-2">
                      {result.vulns.map((vuln) => (
                        <span key={vuln} className="px-2 py-1 bg-neon-red/20 border border-neon-red/30 rounded text-xs text-neon-red">
                          {vuln}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-blue" />
            SEARCH FILTERS
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <code className="text-gray-400">port:80</code>
            <code className="text-gray-400">country:US</code>
            <code className="text-gray-400">org:"Amazon"</code>
            <code className="text-gray-400">vuln:CVE-2021</code>
            <code className="text-gray-400">hostname:"api"</code>
            <code className="text-gray-400">os:"Linux"</code>
          </div>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-neon-purple" />
            API INFO
          </h3>
          <p className="text-xs text-gray-400 mb-2">
            Shodan API requires an API key for full functionality.
          </p>
          <a
            href="https://account.shodan.io/"
            target="_blank"
            className="text-xs text-neon-blue hover:underline"
          >
            Get your API key →
          </a>
        </div>
      </div>
    </div>
  )
}

export default ShodanModule
