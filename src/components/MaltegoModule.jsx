import { useState } from 'react'
import { Map, Users, Link, Share2, Globe, FileText, Database, Server, Search } from 'lucide-react'

const MaltegoModule = ({ isScanning }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [entityType, setEntityType] = useState('domain')
  const [graphData, setGraphData] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)

  const entityTypes = [
    { value: 'domain', label: 'Domain', icon: Globe },
    { value: 'person', label: 'Person', icon: Users },
    { value: 'email', label: 'Email', icon: FileText },
    { value: 'ip', label: 'IP Address', icon: Server },
    { value: 'company', label: 'Company', icon: Database },
  ]

  const sampleGraph = {
    nodes: [
      { id: 1, label: 'example.com', type: 'domain', x: 0, y: 0 },
      { id: 2, label: 'admin@example.com', type: 'email', x: -100, y: -80 },
      { id: 3, label: 'John Smith', type: 'person', x: 100, y: -80 },
      { id: 4, label: 'Example Corp', type: 'company', x: 0, y: -150 },
      { id: 5, label: '93.184.216.34', type: 'ip', x: -100, y: 80 },
      { id: 6, label: 'www.example.com', type: 'domain', x: 100, y: 80 },
      { id: 7, label: 'api.example.com', type: 'domain', x: 0, y: 150 },
    ],
    edges: [
      { from: 1, to: 2, label: 'has email' },
      { from: 1, to: 3, label: 'owned by' },
      { from: 1, to: 4, label: 'belongs to' },
      { from: 1, to: 5, label: 'resolves to' },
      { from: 1, to: 6, label: 'subdomain' },
      { from: 1, to: 7, label: 'subdomain' },
      { from: 3, to: 4, label: 'works at' },
      { from: 6, to: 5, label: 'hosted on' },
    ]
  }

  const simulateAnalysis = () => {
    if (!searchTerm) return

    setAnalyzing(true)
    setGraphData(null)

    setTimeout(() => {
      setGraphData(sampleGraph)
      setAnalyzing(false)
    }, 2000)
  }

  const getEntityColor = (type) => {
    const colors = {
      domain: 'text-neon-blue',
      email: 'text-neon-green',
      person: 'text-neon-purple',
      company: 'text-neon-yellow',
      ip: 'text-neon-red',
    }
    return colors[type] || 'text-gray-400'
  }

  const getEntityIcon = (type) => {
    const icons = {
      domain: Globe,
      email: FileText,
      person: Users,
      company: Database,
      ip: Server,
    }
    const Icon = icons[type] || Share2
    return Icon
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-neon-red/20 rounded-lg">
            <Map className="w-8 h-8 text-neon-red" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neon-red">MALTEGO</h2>
            <p className="text-sm text-gray-400">OSINT & Link Analysis Framework</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-2">SEARCH TERM</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter domain, email, person, or company"
                className="w-full bg-cyber-gray border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neon-red focus:outline-none focus:ring-1 focus:ring-neon-red transition-all font-mono"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-2">ENTITY TYPE</label>
            <div className="flex gap-2">
              {entityTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => setEntityType(type.value)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg border transition-all ${
                      entityType === type.value
                        ? 'bg-neon-red/20 border-neon-red text-neon-red'
                        : 'bg-cyber-gray border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-mono hidden sm:inline">{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={simulateAnalysis}
            disabled={analyzing || !searchTerm}
            className="flex items-center gap-2 px-6 py-3 bg-neon-red/20 hover:bg-neon-red/30 border border-neon-red rounded-lg text-neon-red font-bold transition-all glow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Link className="w-5 h-5" />
            {analyzing ? 'ANALYZING...' : 'RUN TRANSFORM'}
          </button>
          <button
            onClick={() => { setGraphData(null); setAnalyzing(false); }}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Loading State */}
      {analyzing && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-8 text-center">
          <div className="inline-block w-12 h-12 border-4 border-neon-red border-t-transparent rounded-full animate-spin"></div>
          <div className="mt-4 space-y-2">
            <p className="text-neon-red font-mono">Running Maltego transforms...</p>
            <div className="flex justify-center gap-1 text-xs text-gray-500">
              <span className="animate-pulse">Querying</span>
              <span className="animate-pulse" style={{ animationDelay: '0.1s' }}>OSINT</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>sources</span>
              <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>...</span>
            </div>
          </div>
        </div>
      )}

      {/* Graph Visualization */}
      {graphData && !analyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Graph Area */}
          <div className="lg:col-span-2 bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-neon-red" />
                <span className="text-sm font-display text-gray-300">ENTITY GRAPH</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-700 rounded transition-all">
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-4 h-96 relative overflow-hidden" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,68,102,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
              {/* Central Node */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Connection lines (simplified visual representation) */}
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" style={{ width: 400, height: 400 }}>
                    {graphData.edges.map((edge, i) => {
                      const fromNode = graphData.nodes.find(n => n.id === edge.from)
                      const toNode = graphData.nodes.find(n => n.id === edge.to)
                      return (
                        <line
                          key={i}
                          x1={200 + fromNode.x}
                          y1={200 + fromNode.y}
                          x2={200 + toNode.x}
                          y2={200 + toNode.y}
                          stroke="rgba(255, 68, 102, 0.3)"
                          strokeWidth="1"
                        />
                      )
                    })}
                  </svg>

                  {/* Nodes */}
                  {graphData.nodes.map((node) => {
                    const Icon = getEntityIcon(node.type)
                    return (
                      <div
                        key={node.id}
                        className={`absolute p-3 rounded-full border-2 ${getEntityColor(node.type)} border-cyber-dark bg-cyber-dark hover:scale-110 transition-transform cursor-pointer`}
                        style={{
                          left: `calc(50% + ${node.x}px)`,
                          top: `calc(50% + ${node.y}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        title={node.label}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 font-mono">
                          {node.label.substring(0, 15)}{node.label.length > 15 ? '...' : ''}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Entity List */}
          <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700 bg-cyber-gray/50">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-display text-gray-300">ENTITIES</span>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {graphData.nodes.map((node) => {
                const Icon = getEntityIcon(node.type)
                return (
                  <div
                    key={node.id}
                    className="flex items-center gap-3 p-3 bg-cyber-gray/50 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg bg-cyber-dark ${getEntityColor(node.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 font-mono truncate">{node.label}</p>
                      <p className="text-xs text-gray-500 uppercase">{node.type}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!graphData && !analyzing && (
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-8 text-center">
          <Map className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">Enter a search term and run a transform</p>
          <p className="text-xs text-gray-500 mt-2">
            Maltego discovers relationships between entities using OSINT data sources
          </p>
        </div>
      )}

      {/* Transforms Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-neon-blue" />
            DOMAIN TRANSFORMS
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• To IP Address</li>
            <li>• To Netblock</li>
            <li>• Find DNS Entries</li>
            <li>• Find Subdomains</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-neon-purple" />
            PERSON TRANSFORMS
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• To Social Profiles</li>
            <li>• To Email Addresses</li>
            <li>• To Phone Numbers</li>
            <li>• To Affiliations</li>
          </ul>
        </div>
        <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4">
          <h3 className="text-sm font-display text-gray-300 mb-2 flex items-center gap-2">
            <Link className="w-4 h-4 text-neon-green" />
            DATA SOURCES
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Shodan</li>
            <li>• HaveIBeenPwned</li>
            <li>• VirusTotal</li>
            <li>• WHOIS Lookup</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MaltegoModule
