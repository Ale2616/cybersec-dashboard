<div align="center">

# 🛡️ CYBERSEC // PENTEST DASHBOARD v3.0

### Motor de Inteligencia OSINT en Tiempo Real — 7 Herramientas Funcionales

[![Version](https://img.shields.io/badge/Version-3.0_LIVE-00ff88?style=for-the-badge&logo=hackthebox&logoColor=white)](https://cybersec-dashboard-vip-pro.vercel.app)
[![Live Demo](https://img.shields.io/badge/▶_DEMO-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://cybersec-dashboard-vip-pro.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

```
╔══════════════════════════════════════════════════════════════════╗
║  CYBERSEC // PENTEST v3.0                                        ║
║  [ACCESS GRANTED] // VIP ALEJANDRO // 2026                       ║
║  Status: OPERATIONAL   |   Arsenal: 7 LIVE + 12 SIM             ║
║  Targets: IP • DOMAIN • MAC • EMAIL • URL • CVE • COMMANDS      ║
╚══════════════════════════════════════════════════════════════════╝
```

</div>

---

## 📋 Descripción General

**CYBERSEC // PENTEST v3.0** es un dashboard de ciberseguridad con estética CRT/Neón que integra un **motor de reconocimiento OSINT con 7 herramientas funcionales**. El sistema detecta automáticamente el tipo de objetivo ingresado (IP, Dominio, MAC, Email, URL o software) y ejecuta la herramienta correspondiente en tiempo real.

Además, incluye **12 simuladores de alta fidelidad** que replican herramientas profesionales de pentesting para completar la experiencia inmersiva de un centro de operaciones de seguridad.

---

## 🧠 Sistema de Detección Automática

El corazón del panel es un **clasificador de inputs en tiempo real** que analiza lo que el usuario escribe y enruta automáticamente al módulo correcto:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   User Input    │────▶│  detectType()    │────▶│  Execute Module     │
└─────────────────┘     └──────────────────┘     └─────────────────────┘
                                │
          ┌─────────┬──────────┼──────────┬──────────┬──────────┐
          ▼         ▼          ▼          ▼          ▼          ▼
      ┌───────┐ ┌────────┐ ┌──────┐ ┌────────┐ ┌───────┐ ┌────────┐
      │  IP   │ │ Domain │ │ MAC  │ │ Email  │ │  URL  │ │  CVE   │
      │ipapi  │ │DNS+WBM │ │Vendor│ │Breach  │ │ Scan  │ │ Search │
      └───────┘ └────────┘ └──────┘ └────────┘ └───────┘ └────────┘
```

**Reglas de detección:**

| Patrón | Tipo | Ejemplo |
|---|---|---|
| `X.X.X.X` (IPv4) | IP Intelligence | `8.8.8.8` |
| Texto con `.` sin protocolo | DNS Recon + Wayback | `google.com` |
| `XX:XX:XX:XX:XX:XX` | MAC Lookup | `00:1A:2B:3C:4D:5E` |
| Contiene `@` y `.` | Email Breach | `user@yahoo.com` |
| Empieza con `http` | URL Scanner | `https://example.com` |
| Empieza con `search ` | CVE Search | `search apache` |
| `whoami` / `clear` | Comandos de consola | — |

---

## 🔴 Arsenal Funcional — 7 Herramientas en Tiempo Real

### 1. 🔍 CVE Search — Búsqueda de Vulnerabilidades

```
Comando:    search <software>
Base:       National Vulnerability Database (CVE IDs reales)
Datos:      CVE ID, descripción técnica, CVSS Score, severidad
Ejemplo:    search apache → CVE-2024-23897 (CVSS 9.8), CVE-2023-44487 (CVSS 7.5)
Cobertura:  Apache, Nginx, Windows, Linux, WordPress y más
```

Las vulnerabilidades se muestran en tarjetas individuales con **código de colores por severidad**: 🔴 Crítico (CVSS ≥ 7) · 🟡 Medio (CVSS ≥ 4) · 🟢 Bajo.

---

### 2. 📧 Email Breach Check — Rastreo de Filtraciones

```
Input:      dirección de email (ej. user@yahoo.com)
Motor:      Base de inteligencia de brechas conocidas
Datos:      Estado (COMPROMETIDA / LIMPIA), lista de brechas, fechas, volumen de records
Ejemplo:    test@yahoo.com → ⚠ COMPROMETIDA — 3 brechas (Collection #1, Yahoo Breach, Dark Web)
```

Si la cuenta está comprometida, se activa una **alerta de emergencia** con parpadeo rojo y el mensaje `[!] CREDENCIALES POTENCIALMENTE EXPUESTAS`.

---

### 3. 🔗 URL Malware Scanner — Análisis de Reputación Web

```
Input:      URL completa (ej. https://suspicious-site.xyz)
Motor:      Análisis heurístico de dominios y patrones de amenaza
Datos:      Host, Threat Score (0-100), Verdict (CLEAN / SUSPICIOUS / MALICIOUS)
Ejemplo:    https://bit.ly/xyz → Threat Score: 45/100 → SUSPICIOUS
```

El veredicto usa código de colores: 🟢 CLEAN · 🟡 SUSPICIOUS · 🔴 MALICIOUS.

---

### 4. 🌍 IP Intelligence — Geolocalización & OSINT

```
Endpoint:   https://ipapi.co/{ip}/json/
Datos:      IP, Ciudad, Región, País, ISP, ASN, Red, Timezone, Coordenadas GPS, Código Postal
Ejemplo:    8.8.8.8 → Mountain View, California, Google LLC, AS15169
```

---

### 5. 🔎 DNS Reconnaissance — Descubrimiento de Infraestructura

```
Endpoint:   https://networkcalc.com/api/dns/lookup/{dominio}
Datos:      Registros A (IPs del servidor), Registros MX (servidores de correo)
Ejemplo:    google.com → A: 142.250.217.238 | MX: smtp.google.com
```

---

### 6. 📦 Wayback Machine — Archivo Histórico de Internet

```
Endpoint:   https://archive.org/wayback/available?url={dominio}
Datos:      Disponibilidad de snapshots, URL del archivo, Timestamp
Se ejecuta: Automáticamente después del escaneo DNS
```

---

### 7. 🔧 MAC Lookup — Identificación de Hardware

```
Endpoint:   https://api.maclookup.app/v2/macs/{mac}
Datos:      Empresa fabricante, País de origen, Tipo de bloque
Ejemplo:    00:1A:2B:3C:4D:5E → [+] HARDWARE VENDOR DETECTADO: Cisco Systems, Inc.
```

---

### ⚠️ Manejo de Errores Global

Si cualquier módulo falla, el sistema muestra:

```
[ ERROR DE CONEXIÓN CON EL SATÉLITE ]
```

Con animación `emergency-blink` y alerta visual en rojo neón.

---

## ⌨️ Comandos de Consola

| Comando | Respuesta |
|---|---|
| `whoami` | `root@vip-alejandro` |
| `clear` | Limpia terminal y todos los resultados |
| `search <term>` | Busca vulnerabilidades CVE para el software indicado |

---

## 🟢 Simuladores de Inmersión (12 Módulos)

Los siguientes módulos son **simulaciones de alta fidelidad** diseñadas para completar la experiencia de un entorno de pentesting profesional. Replican la interfaz, los flujos de trabajo y los outputs de cada herramienta real:

| Módulo | Herramienta Simulada | Función |
|---|---|---|
| 📡 **NMAP** | Network Mapper | Escaneo de puertos y detección de OS |
| 🌐 **HARVESTER** | theHarvester | Recolección de emails y subdominios |
| 🗺️ **MALTEGO** | Maltego CE | Análisis de enlaces y relaciones OSINT |
| 🔑 **AIRCRACK** | Aircrack-ng | Cracking de redes WEP/WPA/WPA2 |
| ⚡ **WIFITE** | Wifite2 | Ataques WiFi automatizados |
| 🔒 **REAVER** | Reaver | Fuerza bruta contra WPS |
| 📻 **KISMET** | Kismet | Detector y sniffer de redes wireless |
| 🛡️ **NESSUS** | Tenable Nessus | Evaluación de vulnerabilidades |
| 🗄️ **NEXPOSE** | Rapid7 Nexpose | Gestión de vulnerabilidades |
| 🐛 **OWASP ZAP** | ZAP Proxy | Escáner de seguridad web |
| 👁️ **BURP SUITE** | PortSwigger Burp | Plataforma de testing web |
| 🎯 **WPSCAN** | WPScan CLI | Escáner de seguridad WordPress |

> Cada simulador incluye inputs configurables, barras de progreso animadas, outputs de terminal con datos verosímiles y resultados con la estética neón del dashboard.

---

## 🎨 Stack Técnico y Visual

| Capa | Implementación |
|---|---|
| **Framework** | React 18.2 + Vite 4.4 |
| **Styling** | Tailwind CSS 3.3 + CSS custom |
| **Animaciones** | Framer Motion 11.x |
| **Iconos** | Lucide React |
| **Tipografía** | JetBrains Mono · Fira Code · Orbitron |
| **CRT Overlay** | Scanlines + vignette + flicker (CSS puro) |
| **Grid 3D** | Doble capa con drift y perspectiva animada |
| **Glitch Hover** | Distorsión clip-path al interactuar |
| **Neon Glow** | text-shadow multicapa (verde/azul/rojo/púrpura) |
| **Live Terminal** | Logs del sistema cada 3 segundos |
| **Typewriter** | Renderizado carácter por carácter con cursor |

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Ale2616/cybersec-dashboard.git
cd cybersec-dashboard

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
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
├── index.html                         # Entry point + Google Fonts
├── tailwind.config.js                 # Colores neón, animaciones custom
├── package.json                       # Dependencias del proyecto
├── src/
│   ├── main.jsx                       # React root
│   ├── index.css                      # CRT, grid, glitch, glow, VIP pulse
│   ├── App.jsx                        # Layout + routing de módulos
│   └── components/
│       ├── ShodanModule.jsx           # ★ OSINT RECON v3.0 (7 herramientas)
│       ├── CRTOverlay.jsx             # Overlay de scanlines
│       ├── DynamicGridBackground.jsx  # Fondo 3D animado
│       ├── LiveTerminalLogs.jsx       # Terminal de logs en tiempo real
│       ├── NmapModule.jsx             # Simulador Nmap
│       ├── BurpSuiteModule.jsx        # Simulador Burp Suite
│       ├── WPScanModule.jsx           # Simulador WPScan
│       ├── NessusModule.jsx           # Simulador Nessus
│       ├── NexposeModule.jsx          # Simulador Nexpose
│       ├── ZapModule.jsx              # Simulador OWASP ZAP
│       ├── AircrackModule.jsx         # Simulador Aircrack-ng
│       ├── WifiteModule.jsx           # Simulador Wifite
│       ├── ReaverModule.jsx           # Simulador Reaver
│       ├── KismetModule.jsx           # Simulador Kismet
│       ├── TheHarvesterModule.jsx     # Simulador theHarvester
│       └── MaltegoModule.jsx          # Simulador Maltego
```

---

## ⚖️ Aviso Legal

> **Este dashboard es una herramienta educativa y de demostración.** Las APIs de OSINT utilizadas son públicas y gratuitas. Los módulos de simulación no realizan ataques reales contra ningún sistema. Utiliza estas herramientas de forma responsable y únicamente en sistemas sobre los que tengas autorización explícita. El uso indebido de herramientas de pentesting es ilegal y puede tener consecuencias legales.

---

<div align="center">

### 👨‍💻 Desarrollado por

## **José Alejandro Anturi Pérez**

[![Deploy](https://img.shields.io/badge/🌐_Deploy-cybersec--dashboard--vip--pro.vercel.app-00ff88?style=for-the-badge)](https://cybersec-dashboard-vip-pro.vercel.app)

```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   ██████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗    ║
║  ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝    ║
║  ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████╗    ║
║  ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗╚════██║    ║
║  ╚██████╗   ██║   ██████╔╝███████╗██║  ██║███████║    ║
║   ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝    ║
║                                                        ║
║         [ACCESS GRANTED] // VIP ALEJANDRO // 2026      ║
║              Status: OPERATIONAL v3.0                  ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

</div>
