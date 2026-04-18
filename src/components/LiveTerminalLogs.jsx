import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react'

const LOG_MESSAGES = [
  { type: 'INFO', msg: 'Scanning port 80 on 192.168.1.1...' },
  { type: 'INFO', msg: 'Resolving DNS for target-server.local...' },
  { type: 'INFO', msg: 'TCP handshake completed on port 443.' },
  { type: 'INFO', msg: 'Checking SSL/TLS certificate validity...' },
  { type: 'INFO', msg: 'Enumerating open services on 10.0.0.5...' },
  { type: 'INFO', msg: 'HTTP headers captured from response.' },
  { type: 'INFO', msg: 'OS fingerprint analysis in progress...' },
  { type: 'WARN', msg: 'Brute force detected on SSH (port 22).' },
  { type: 'WARN', msg: 'Suspicious traffic from 45.33.32.156.' },
  { type: 'WARN', msg: 'Rate limit exceeded on API endpoint.' },
  { type: 'WARN', msg: 'Weak cipher suite detected: RC4-SHA.' },
  { type: 'WARN', msg: 'Unencrypted credentials found in memory dump.' },
  { type: 'WARN', msg: 'Deprecated TLS 1.0 connection detected.' },
  { type: 'SUCCESS', msg: 'Payload injected successfully.' },
  { type: 'SUCCESS', msg: 'Reverse shell established on port 4444.' },
  { type: 'SUCCESS', msg: 'Privilege escalation achieved: root.' },
  { type: 'SUCCESS', msg: 'Database credentials extracted.' },
  { type: 'SUCCESS', msg: 'Firewall rule bypassed on eth0.' },
  { type: 'SUCCESS', msg: 'Session token hijacked via XSS.' },
  { type: 'ERROR', msg: 'Connection refused on port 8080.' },
  { type: 'ERROR', msg: 'Timeout reaching target 172.16.0.1.' },
  { type: 'ERROR', msg: 'IDS alert triggered — switching to stealth.' },
  { type: 'SCAN', msg: 'Port sweep 1-1024 initiated on subnet /24.' },
  { type: 'SCAN', msg: 'Nmap SYN scan running on 192.168.0.0/16...' },
  { type: 'SCAN', msg: 'Vulnerability scan: CVE-2024-25600 found.' },
  { type: 'SCAN', msg: 'WPScan enumeration: 5 plugins detected.' },
  { type: 'SCAN', msg: 'DNS exfiltration channel open on ns1.evil.com.' },
  { type: 'SCAN', msg: 'ARP spoofing detected on local segment.' },
]

const typeColors = {
  INFO: 'text-neon-blue',
  WARN: 'text-neon-yellow',
  SUCCESS: 'text-neon-green',
  ERROR: 'text-neon-red',
  SCAN: 'text-neon-purple',
}

const typeBgColors = {
  INFO: 'bg-neon-blue/20',
  WARN: 'bg-neon-yellow/20',
  SUCCESS: 'bg-neon-green/20',
  ERROR: 'bg-neon-red/20',
  SCAN: 'bg-neon-purple/20',
}

const LiveTerminalLogs = () => {
  const [logs, setLogs] = useState([])
  const [collapsed, setCollapsed] = useState(false)
  const scrollRef = useRef(null)
  const idRef = useRef(0)

  useEffect(() => {
    // Add initial log
    addRandomLog()

    const interval = setInterval(() => {
      addRandomLog()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const addRandomLog = () => {
    const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false })
    idRef.current += 1
    setLogs(prev => {
      const newLogs = [...prev, { ...randomMsg, timestamp, id: idRef.current }]
      // Keep last 25 lines
      return newLogs.slice(-25)
    })
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Toggle bar */}
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="w-full flex items-center justify-between px-4 py-1.5 bg-cyber-dark/95 border-t border-neon-green/30 backdrop-blur-md hover:bg-cyber-gray/80 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neon-green" />
          <span className="text-xs font-mono text-neon-green neon-text">SYSTEM LIVE LOG</span>
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
        </div>
        {collapsed ? (
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>

      {/* Log area */}
      {!collapsed && (
        <div
          ref={scrollRef}
          className="bg-black/95 backdrop-blur-md border-t border-gray-800 overflow-y-auto font-mono text-xs"
          style={{ height: '140px' }}
        >
          <div className="p-3 space-y-0.5">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2 py-0.5"
                >
                  <span className="text-gray-600 flex-shrink-0">{log.timestamp}</span>
                  <span className={`flex-shrink-0 px-1.5 py-0 rounded text-[10px] font-bold ${typeColors[log.type]} ${typeBgColors[log.type]}`}>
                    {log.type}
                  </span>
                  <span className="text-gray-300">{log.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="flex items-center gap-1 text-neon-green/60 pt-1">
              <span>{'>'}</span>
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveTerminalLogs
