import { useState } from 'react'
import { Globe, Mail, FileText, Database, Search, Shield } from 'lucide-react'

const TheHarvesterModule = ({ isScanning }) => {
  const [domain, setDomain] = useState('')
  const [dataType, setDataType] = useState('all')
  const [source, setSource] = useState('google')
  const [results, setResults] = useState(null)
  const [harvesting, setHarvesting] = useState(false)

  const sampleData = {
    emails: [
      'admin@example.com',
      'contact@example.com',
      'support@example.com',
      'info@example.com',
      'security@example.com',
      'dev@example.com',
      'hr@example.com',
      'sales@example.com',
    ],
    subdomains: [
      'www.example.com',
      'mail.example.com',
      'api.example.com',
      'dev.example.com',
      'staging.example.com',
      'admin.example.com',
      'vpn.example.com',
      'cdn.example.com',
      'blog.example.com',
      'shop.example.com',
    ],
    hosts: [
      { ip: '93.184.216.34', hostname: 'example.com' },
      { ip: '93.184.216.35', hostname: 'www.example.com' },
      { ip: '93.184.216.36', hostname: 'mail.example.com' },
    ],
  }

  const simulateHarvest = () => {
    if (!domain) return

    setHarvesting(true)
    setResults(null)

    setTimeout(() => {
      setResults(sampleData)
      setHarvesting(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-purple/20 rounded-lg">
            <Globe className="w-8 h-8 text-neon-purple" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-purple">THE HARVESTER</h2>
            <p className="text-sm text-gray-400">Email, Subdomain & Name Reconnaissance Tool</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-2">TARGET DOMAIN</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">DATA TYPE</label>
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all font-mono"
            >
              <option value="all">All Data</option>
              <option value="emails">Emails Only</option>
              <option value="subdomains">Subdomains Only</option>
              <option value="hosts">Hosts/IPs Only</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">SOURCE</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all font-mono"
            >
              <option value="google">Google</option>
              <option value="bing">Bing</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="all">All Sources</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateHarvest}
            disabled={harvesting || !domain}
            className="flex items-center gap-2 px-6 py-3 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple rounded-lg text-neon-purple font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
            {harvesting ? 'HARVESTING...' : 'START HARVEST'}
          </button>
          <button
            onClick={() => { setResults(null); setHarvesting(false); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Loading State */}
      {harvesting && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-8 text-center">
          <div className="inline-block w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
          <div className="mt-4 space-y-2">
            <p className="text-neon-purple font-mono">Querying sources...</p>
            <div className="flex justify-center gap-2 text-xs text-gray-500">
              <span className="animate-pulse">Searching Google</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && !harvesting && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-green/20 rounded-lg">
                    <Mail className="w-6 h-6 text-neon-green" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{results.emails.length}</p>
                    <p className="text-xs text-gray-400">EMAILS FOUND</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-blue/20 rounded-lg">
                    <FileText className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{results.subdomains.length}</p>
                    <p className="text-xs text-gray-400">SUBDOMAINS</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-yellow/20 rounded-lg">
                    <Database className="w-6 h-6 text-neon-yellow" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{results.hosts.length}</p>
                    <p className="text-xs text-gray-400">HOSTS/IPs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Emails */}
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center gap-2">
                <Mail className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-display text-gray-300">EMAILS</span>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {results.emails.map((email, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-cyber-gray hover:bg-gray-700 border border-gray-600 rounded text-sm text-gray-300 transition-all cursor-pointer"
                    >
                      {email}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Subdomains */}
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center gap-2">
                <FileText className="w-4 h-4 text-neon-blue" />
                <span className="text-sm font-display text-gray-300">SUBDOMAINS</span>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {results.subdomains.map((sub, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-cyber-gray hover:bg-gray-700 border border-gray-600 rounded text-sm text-gray-300 transition-all cursor-pointer font-mono"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hosts Table */}
          <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center gap-2">
              <Database className="w-4 h-4 text-neon-yellow" />
              <span className="text-sm font-display text-gray-300">HOSTS & IP ADDRESSES</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cyber-gray/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">#</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">IP ADDRESS</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-400 font-mono">HOSTNAME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {results.hosts.map((host, index) => (
                    <tr key={index} className="hover:bg-cyber-gray/30 transition-all">
                      <td className="px-4 py-3 text-gray-500 font-mono">{index + 1}</td>
                      <td className="px-4 py-3 text-neon-blue font-mono">{host.ip}</td>
                      <td className="px-4 py-3 text-gray-300 font-mono">{host.hostname}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!results && !harvesting && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-8 text-center">
          <Globe className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">Enter a domain to start reconnaissance</p>
          <p className="text-xs text-gray-500 mt-2">
            theHarvester gathers emails, subdomains, and hosts from public sources
          </p>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
        <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-neon-purple" />
          ABOUT THE HARVESTER
        </h3>
        <p className="text-xs text-gray-400">
          theHarvester is a Python-based OSINT tool used for gathering information during
          the reconnaissance phase of penetration testing. It searches search engines,
          PGP key servers, and other public sources to find emails, subdomains, and
          virtual hosts associated with a target domain.
        </p>
      </div>
    </div>
  )
}

export default TheHarvesterModule
