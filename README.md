<div align="center">

# 🛡️ CYBERSEC // PENTEST DASHBOARD

### Motor de Inteligencia OSINT en Tiempo Real con Estética CRT/Neón

[![Live Demo](https://img.shields.io/badge/▶_LIVE_DEMO-Vercel-00ff88?style=for-the-badge&logo=vercel&logoColor=white)](https://cybersec-dashboard-vip-pro.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

```
╔══════════════════════════════════════════════════════════════╗
║  [ACCESS GRANTED] // VIP ALEJANDRO // 2026                  ║
║  Status: OPERATIONAL   |   Threat Level: MAXIMUM             ║
╚══════════════════════════════════════════════════════════════╝
```

</div>

---

## 📋 Descripción General

**CYBERSEC // PENTEST** es un dashboard de ciberseguridad construido con React que combina un **motor de inteligencia OSINT 100% funcional** con una interfaz inmersiva inspirada en terminales retro CRT y estética neón cyberpunk.

El panel conecta con **4 APIs públicas en tiempo real** para realizar reconocimiento de IPs, dominios y direcciones MAC, mientras que 12 módulos adicionales simulan herramientas de pentesting profesional con alta fidelidad visual para crear una experiencia completa de command center.

### ✨ Características Principales

| Categoría | Detalle |
|---|---|
| 🔍 **OSINT Real** | Geolocalización IP, DNS Recon, Wayback Machine, MAC Lookup |
| 🖥️ **Estética CRT** | Scanlines, vignette, flicker y curvatura de monitor retro |
| 🌐 **Grid 3D Dinámico** | Fondo con perspectiva animada y blobs de luz ambiental |
| ⚡ **Glitch Effects** | Distorsión visual al interactuar con los módulos |
| 📟 **Live Terminal** | Log del sistema imprimiendo eventos cada 3 segundos |
| ⌨️ **Typewriter** | Resultados aparecen carácter por carácter |
| 🎯 **Auto-Detección** | Reconoce automáticamente IP, Dominio, MAC o Comando |
| 🔐 **VIP Footer** | Firma con animación de pulso constante |

---

## 🧠 Desglose de Ingeniería

### Sistema de Detección Automática de Inputs

El módulo OSINT RECON implementa un **clasificador regex** que analiza el input del usuario en tiempo real y determina automáticamente qué tipo de objetivo se ingresó, ejecutando la API correspondiente sin intervención manual:

```javascript
const detectType = (input) => {
  const s = input.trim()
  if (/^clear$/i.test(s))                              → 'cmd-clear'
  if (/^whoami$/i.test(s))                              → 'cmd-whoami'
  if (/^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/.test(s)) → 'mac'
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(s))               → 'ip'
  // Cualquier otro input válido                         → 'domain'
}
```

**Flujo de ejecución:**

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│  User Input │───▶│ detectType() │───▶│ Route to API    │
└─────────────┘    └──────────────┘    └─────────────────┘
                                              │
                   ┌──────────────────────────┼──────────────────┐
                   │              │            │           │      │
                   ▼              ▼            ▼           ▼      ▼
              ┌─────────┐  ┌──────────┐ ┌──────────┐ ┌────────┐ ┌───────┐
              │ ipapi.co│  │networkcalc│ │archive.org│ │maclookup│ │console│
              └─────────┘  └──────────┘ └──────────┘ └────────┘ └───────┘
```

### Arquitectura del Typewriter Effect

Cada línea de resultado utiliza un componente `TypewriterLine` que renderiza el texto carácter por carácter usando `setInterval` con delays escalonados y un cursor parpadeante animado con Framer Motion:

```
Delay: 0ms    →  IP:        8.8.8.8
Delay: 200ms  →  CITY:      Mountain View
Delay: 400ms  →  REGION:    California
Delay: 600ms  →  COUNTRY:   United States (US)
Delay: 800ms  →  ORG/ISP:   Google LLC
...
```

---

## 🔴 Arsenal Funcional (APIs Reales)

Estas son las herramientas que realizan **peticiones HTTP reales** a APIs públicas:

### 1. 🌍 IP Geolocation — `ipapi.co`

```
Endpoint:  https://ipapi.co/{ip}/json/
Datos:     IP, Ciudad, Región, País, ISP/Organización, ASN, Red, Timezone, Coordenadas GPS
Ejemplo:   8.8.8.8 → Mountain View, California, Google LLC, AS15169
```

### 2. 🔎 DNS Reconnaissance — `networkcalc.com`

```
Endpoint:  https://networkcalc.com/api/dns/lookup/{dominio}
Datos:     Registros A (IPs del servidor), Registros MX (servidores de correo)
Ejemplo:   google.com → A: 142.250.217.238 | MX: smtp.google.com
```

### 3. 📦 Archivo Histórico — `archive.org`

```
Endpoint:  https://archive.org/wayback/available?url={dominio}
Datos:     Disponibilidad de snapshots, URL del snapshot más cercano, Timestamp
Se ejecuta: Automáticamente después del escaneo DNS
```

### 4. 🔧 MAC Vendor Lookup — `maclookup.app`

```
Endpoint:  https://api.maclookup.app/v2/macs/{mac}
Datos:     Empresa fabricante, País de origen, Tipo de bloque
Ejemplo:   00:1A:2B:3C:4D:5E → Cisco Systems, Inc.
Output:    [+] HARDWARE VENDOR DETECTADO: Cisco Systems, Inc.
```

### ⚠️ Manejo de Errores

Si cualquier API falla o el input es inválido, el sistema muestra:

```
[ ERROR DE CONEXIÓN CON EL SATÉLITE ]
```

Con animación de parpadeo de emergencia (`emergency-blink`) y el icono de alerta en rojo neón.

---

## 🟢 Arsenal Estético (Módulos Simulados)

Los siguientes 12 módulos son **simulaciones de alta fidelidad** diseñadas para la inmersión visual del usuario. No realizan conexiones reales, pero replican fielmente la interfaz y el flujo de trabajo de cada herramienta profesional:

| Módulo | Herramienta Real | Simulación |
|---|---|---|
| 📡 **NMAP** | Network Mapper | Escaneo de puertos, detección de OS, output de terminal |
| 🌐 **HARVESTER** | theHarvester | Recolección de emails y subdominios |
| 🗺️ **MALTEGO** | Maltego CE | Análisis de enlaces OSINT |
| 🔑 **AIRCRACK** | Aircrack-ng | Cracking WEP/WPA/WPA2 |
| ⚡ **WIFITE** | Wifite2 | Ataques WiFi automatizados |
| 🔒 **REAVER** | Reaver | Fuerza bruta WPS |
| 📻 **KISMET** | Kismet | Detector y sniffer wireless |
| 🛡️ **NESSUS** | Tenable Nessus | Evaluación de vulnerabilidades |
| 🗄️ **NEXPOSE** | Rapid7 Nexpose | Gestión de vulnerabilidades |
| 🐛 **OWASP ZAP** | ZAP Proxy | Escáner de seguridad web |
| 👁️ **BURP SUITE** | PortSwigger Burp | Plataforma de seguridad web |
| 🎯 **WPSCAN** | WPScan CLI | Escáner de seguridad WordPress |

> Cada módulo incluye inputs configurables, barras de progreso, outputs de terminal simulados y resultados con la estética neón del dashboard.

---

## ⌨️ Comandos de Consola

El módulo OSINT RECON incluye una terminal interactiva que acepta comandos directos:

| Comando | Respuesta |
|---|---|
| `whoami` | `root@vip-alejandro` |
| `clear` | Limpia la pantalla del terminal y todos los resultados |

---

## 🎨 Stack Visual

| Capa | Tecnología | Propósito |
|---|---|---|
| **CRT Overlay** | CSS puro | Scanlines horizontales, vignette, flicker sutil |
| **Grid 3D** | CSS Animations | Dos capas de cuadrícula con drift y perspectiva |
| **Glitch Hover** | CSS + Framer Motion | Distorsión clip-path + traslación al hover |
| **Neon Glow** | CSS text-shadow | Multi-capa verde/azul/rojo/púrpura |
| **Live Logs** | React + setInterval | Mensajes aleatorios cada 3s con AnimatePresence |
| **Typewriter** | React + setInterval | Renderizado carácter por carácter con cursor |
| **VIP Footer** | CSS keyframes | Pulso constante con glow verde |
| **Tipografía** | Google Fonts | JetBrains Mono + Fira Code + Orbitron |

---

## 🚀 Instalación

### Requisitos

- **Node.js** 16+
- **npm** 8+

### Setup Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Ale2616/cybersec-dashboard.git
cd cybersec-dashboard

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El dashboard estará disponible en `http://localhost:3000`

### Build de Producción

```bash
npm run build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
cybersec-dashboard/
├── index.html                    # Entry point + Google Fonts
├── tailwind.config.js            # Colores neón, animaciones custom
├── package.json                  # React 18, Framer Motion, Lucide
├── src/
│   ├── main.jsx                  # React root
│   ├── index.css                 # CRT, grid, glitch, glow, VIP pulse
│   ├── App.jsx                   # Layout principal + integración global
│   └── components/
│       ├── CRTOverlay.jsx        # Overlay de scanlines + vignette
│       ├── DynamicGridBackground.jsx  # Fondo 3D animado
│       ├── LiveTerminalLogs.jsx  # Terminal de logs en tiempo real
│       ├── ShodanModule.jsx      # ★ OSINT RECON (APIs reales)
│       ├── NmapModule.jsx        # Simulación Nmap
│       ├── BurpSuiteModule.jsx   # Simulación Burp Suite
│       ├── WPScanModule.jsx      # Simulación WPScan
│       ├── NessusModule.jsx      # Simulación Nessus
│       ├── NexposeModule.jsx     # Simulación Nexpose
│       ├── ZapModule.jsx         # Simulación OWASP ZAP
│       ├── AircrackModule.jsx    # Simulación Aircrack-ng
│       ├── WifiteModule.jsx      # Simulación Wifite
│       ├── ReaverModule.jsx      # Simulación Reaver
│       ├── KismetModule.jsx      # Simulación Kismet
│       ├── TheHarvesterModule.jsx # Simulación theHarvester
│       └── MaltegoModule.jsx     # Simulación Maltego
```

---

## 🛠️ Tecnologías

| Tech | Versión | Uso |
|---|---|---|
| React | 18.2 | UI Components & State |
| Vite | 4.4 | Bundler & Dev Server |
| Tailwind CSS | 3.3 | Utility-first Styling |
| Framer Motion | 11.x | Animations & Transitions |
| Lucide React | 0.263 | Icon System |
| Axios | 1.6 | HTTP Client |

---

## ⚖️ Aviso Legal

> **Este dashboard es una herramienta educativa y de demostración.** Los módulos simulados no realizan ataques reales. Las APIs de OSINT utilizadas son públicas y gratuitas. Utiliza estas herramientas únicamente en sistemas sobre los que tengas autorización explícita. El uso indebido de herramientas de pentesting es ilegal.

---

<div align="center">

### 👨‍💻 Desarrollado por

## **José Alejandro Anturi Pérez**


[![Deploy](https://img.shields.io/badge/🌐_Deploy-cybersec--dashboard--vip--pro.vercel.app-00ff88?style=for-the-badge)](https://cybersec-dashboard-vip-pro.vercel.app)

```
╔════════════════════════════════════════════╗
║  [ACCESS GRANTED] // VIP ALEJANDRO // 2026 ║
╚════════════════════════════════════════════╝
```

</div>
