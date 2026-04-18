import { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Shield, Search, Map, Globe, Wifi, Lock, AlertTriangle, ChevronRight, Play, Square, Radio, Zap, Key, Radar, Bug, Database, Eye, Settings, Target } from 'lucide-react'
import NmapModule from './components/NmapModule.jsx'
import ShodanModule from './components/ShodanModule.jsx'
import TheHarvesterModule from './components/TheHarvesterModule.jsx'
import MaltegoModule from './components/MaltegoModule.jsx'
import AircrackModule from './components/AircrackModule.jsx'
import WifiteModule from './components/WifiteModule.jsx'
import ReaverModule from './components/ReaverModule.jsx'
import KismetModule from './components/KismetModule.jsx'
import NessusModule from './components/NessusModule.jsx'
import NexposeModule from './components/NexposeModule.jsx'
import ZapModule from './components/ZapModule.jsx'
import BurpSuiteModule from './components/BurpSuiteModule.jsx'
import WPScanModule from './components/WPScanModule.jsx'
import CRTOverlay from './components/CRTOverlay.jsx'
import DynamicGridBackground from './components/DynamicGridBackground.jsx'
import LiveTerminalLogs from './components/LiveTerminalLogs.jsx'

function App() {
  const [activeModule, setActiveModule] = useState('nmap')
  const [isScanning, setIsScanning] = useState(false)

  const modules = [
    { id: 'nmap', name: 'NMAP', icon: Wifi, color: 'neon-green', desc: 'Network Discovery & Security Scanning' },
    { id: 'shodan', name: 'SHODAN', icon: Search, color: 'neon-blue', desc: 'IoT & Device Search Engine' },
    { id: 'harvester', name: 'HARVESTER', icon: Globe, color: 'neon-purple', desc: 'Email & Subdomain Reconnaissance' },
    { id: 'maltego', name: 'MALTEGO', icon: Map, color: 'neon-red', desc: 'OSINT & Link Analysis' },
    { id: 'aircrack', name: 'AIRCRACK', icon: Key, color: 'neon-green', desc: 'WEP/WPA/WPA2 Cracking' },
    { id: 'wifite', name: 'WIFITE', icon: Zap, color: 'neon-yellow', desc: 'Automated WiFi Attacks' },
    { id: 'reaver', name: 'REAVER', icon: Lock, color: 'neon-purple', desc: 'WPS Brute Force' },
    { id: 'kismet', name: 'KISMET', icon: Radar, color: 'neon-blue', desc: 'Wireless Detector & Sniffer' },
    { id: 'nessus', name: 'NESSUS', icon: Shield, color: 'neon-red', desc: 'Vulnerability Assessment' },
    { id: 'nexpose', name: 'NEXPOSE', icon: Database, color: 'orange-500', desc: 'Rapid7 Vulnerability Mgmt' },
    { id: 'zap', name: 'OWASP ZAP', icon: Bug, color: 'neon-green', desc: 'Web App Security Scanner' },
    { id: 'burp', name: 'BURP SUITE', icon: Eye, color: 'neon-red', desc: 'Web Security Platform' },
    { id: 'wpscan', name: 'WPSCAN', icon: Target, color: 'neon-blue', desc: 'WordPress Security Scanner' },
  ]

  const renderModule = () => {
    switch (activeModule) {
      case 'nmap':
        return <NmapModule isScanning={isScanning} />
      case 'shodan':
        return <ShodanModule isScanning={isScanning} />
      case 'harvester':
        return <TheHarvesterModule isScanning={isScanning} />
      case 'maltego':
        return <MaltegoModule isScanning={isScanning} />
      case 'aircrack':
        return <AircrackModule isScanning={isScanning} />
      case 'wifite':
        return <WifiteModule isScanning={isScanning} />
      case 'reaver':
        return <ReaverModule isScanning={isScanning} />
      case 'kismet':
        return <KismetModule isScanning={isScanning} />
      case 'nessus':
        return <NessusModule isScanning={isScanning} />
      case 'nexpose':
        return <NexposeModule isScanning={isScanning} />
      case 'zap':
        return <ZapModule isScanning={isScanning} />
      case 'burp':
        return <BurpSuiteModule isScanning={isScanning} />
      case 'wpscan':
        return <WPScanModule isScanning={isScanning} />
      default:
        return <NmapModule isScanning={isScanning} />
    }
  }

  /* Framer Motion glitch hover variant */
  const glitchHover = {
    rest: { x: 0, skewX: 0 },
    hover: {
      x: [0, -2, 3, -1, 2, 0],
      skewX: [0, -0.5, 1, -0.5, 0],
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  }

  return (
    <div className="min-h-screen bg-cyber-black relative overflow-hidden">
      {/* Animated 3D grid background */}
      <DynamicGridBackground />

      {/* CRT Overlay (scanlines + vignette) */}
      <CRTOverlay />

      {/* Header */}
      <header className="relative z-10 border-b border-neon-green/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-10 h-10 text-neon-green" />
                <div className="absolute inset-0 bg-neon-green/20 blur-lg animate-pulse-slow"></div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold neon-text text-neon-green">
                  CYBERSEC <span className="text-white">//</span> PENTEST
                </h1>
                <p className="text-xs text-gray-400">Advanced Security Toolkit v1.0</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-gray rounded border border-neon-green/30">
                <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-neon-green animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-xs text-gray-400">{isScanning ? 'SYSTEM ACTIVE' : 'SYSTEM READY'}</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {new Date().toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-6 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Module Selection */}
          <aside className="lg:col-span-1">
            <div className="bg-cyber-dark/80 backdrop-blur-sm rounded-lg cyber-border p-4 sticky top-4">
              <h2 className="text-sm font-display text-gray-400 mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                MODULES
              </h2>
              <div className="space-y-2">
                {modules.map((module) => (
                  <motion.button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    variants={glitchHover}
                    initial="rest"
                    whileHover="hover"
                    className={`glitch-hover w-full p-3 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                      activeModule === module.id
                        ? `bg-${module.color}/20 border-${module.color} border`
                        : 'bg-cyber-gray/50 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <module.icon className={`w-5 h-5 ${
                      activeModule === module.id ? `text-${module.color}` : 'text-gray-500'
                    }`} />
                    <div className="flex-1 text-left">
                      <div className={`font-bold text-sm ${
                        activeModule === module.id ? `text-${module.color}` : 'text-gray-300'
                      }`}>
                        {module.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{module.desc}</div>
                    </div>
                    {activeModule === module.id && (
                      <ChevronRight className={`w-4 h-4 text-${module.color}`} />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-xs font-display text-gray-500 mb-3">QUICK STATS</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Scans Today</span>
                    <span className="text-neon-green">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Targets Found</span>
                    <span className="text-neon-blue">1,842</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vulnerabilities</span>
                    <motion.span
                      className="text-neon-red"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      23
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="mt-6 p-3 bg-neon-red/10 border border-neon-red/30 rounded-lg emergency-blink">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-neon-red flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">
                    Only use these tools on systems you have explicit permission to test.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Module Area */}
          <section className="lg:col-span-3">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderModule()}
            </motion.div>
          </section>
        </div>
      </main>

      {/* VIP Footer */}
      <footer className="relative z-10 border-t border-neon-green/30 mt-8 bg-cyber-dark/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-display text-neon-green vip-pulse tracking-widest">
              [ACCESS GRANTED] <span className="text-white">//</span> VIP ALEJANDRO <span className="text-white">//</span> 2026
            </span>
            <span className="flex items-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3 text-neon-green" />
              <span className="text-neon-green/70">ENCRYPTED CONNECTION</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Live Terminal Logs (fixed at bottom) */}
      <LiveTerminalLogs />
    </div>
  )
}

export default App
