# CYBERSEC PENTESTING DASHBOARD

Dashboard moderno de ciberseguridad para pruebas de pentesting con herramientas profesionales.

![Cybersecurity Dashboard](https://img.shields.io/badge/Status-Ready-success)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## Herramientas Integradas

### Red y OSINT
- **NMAP** - Escaneo de puertos y detección de servicios
- **SHODAN** - Buscador de dispositivos IoT y servicios
- **TheHarvester** - Reconocimiento de emails y subdominios
- **Maltego** - Análisis OSINT y de enlaces

### WiFi Pentesting
- **Aircrack-ng** - Suite de auditoría WEP/WPA/WPA2
- **Wifite** - Framework automatizado de ataques WiFi
- **Reaver** - Ataque de fuerza bruta WPS
- **Kismet** - Detector y sniffer de redes wireless

### Vulnerabilidad Web
- **Nessus** - Escáner de vulnerabilidades (60,000+ checks)
- **Nexpose** - Gestión de vulnerabilidades Rapid7
- **OWASP ZAP** - Escáner de aplicaciones web
- **Burp Suite** - Plataforma de testing web
- **WPScan** - Escáner de seguridad WordPress

## Características

- 🎨 Diseño Cyberpunk/Hacker moderno
- ⚡ Interfaz responsive con Tailwind CSS
- 🔴 Simulación de scans en tiempo real
- 📊 Visualización de resultados interactiva
- 🛡️ Advertencias de seguridad integradas

## Instalación

```bash
cd cybersec-dashboard
npm install
npm run dev
```

## Uso

Abre tu navegador en `http://localhost:3000`

### NMAP
1. Ingresa un target (IP, hostname, o rango)
2. Selecciona el tipo de scan
3. Presiona START SCAN

### SHODAN
1. Ingresa un query de búsqueda
2. Usa filtros rápidos o búsqueda avanzada
3. Explora los resultados

### TheHarvester
1. Ingresa un dominio objetivo
2. Selecciona tipo de datos y fuente
3. Inicia el harvest

### Maltego
1. Ingresa un término de búsqueda
2. Selecciona el tipo de entidad
3. Ejecuta el transform para ver relaciones

### Aircrack-ng
1. Selecciona el tipo de ataque (WEP/WPA/PMKID)
2. Ingresa el BSSID objetivo
3. Carga una wordlist y ejecuta

### Wifite
1. Configura la interfaz WiFi
2. Selecciona los tipos de ataque
3. Inicia el ataque automático

### Reaver
1. Selecciona un objetivo WPS
2. Elige el modo de ataque (PixieDust/Brute)
3. Ejecuta el ataque WPS

### Kismet
1. Configura la interfaz en modo monitor
2. Inicia el monitoreo pasivo
3. Explora las redes detectadas

### Nessus
1. Ingresa el target (IP/hostname/rango)
2. Selecciona el template de scan
3. Revisa las vulnerabilidades encontradas

### Nexpose
1. Configura la red objetivo
2. Selecciona el template de scan
3. Analiza assets y vulnerabilidades

### OWASP ZAP
1. Ingresa la URL objetivo
2. Selecciona el tipo de scan
3. Revisa los alertas de seguridad

### Burp Suite
1. Configura la URL objetivo
2. Usa Scanner, Proxy, Repeater o Intruder
3. Explota vulnerabilidades web

### WPScan
1. Ingresa la URL del WordPress
2. Configura opciones de enumeración
3. Revisa plugins, temas y usuarios

## Estructura

```
cybersec-dashboard/
├── src/
│   ├── components/
│   │   ├── NmapModule.jsx        # Network scanning
│   │   ├── ShodanModule.jsx      # IoT search engine
│   │   ├── TheHarvesterModule.jsx # Email/subdomain recon
│   │   ├── MaltegoModule.jsx     # OSINT link analysis
│   │   ├── AircrackModule.jsx    # WEP/WPA/WPA2 cracking
│   │   ├── WifiteModule.jsx      # Automated WiFi attacks
│   │   ├── ReaverModule.jsx      # WPS brute force
│   │   ├── KismetModule.jsx      # Wireless detector
│   │   ├── NessusModule.jsx      # Vulnerability scanner
│   │   ├── NexposeModule.jsx     # Rapid7 vulnerability mgmt
│   │   ├── ZapModule.jsx         # OWASP web scanner
│   │   ├── BurpSuiteModule.jsx   # Web security platform
│   │   └── WPScanModule.jsx      # WordPress scanner
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **TailwindCSS** - Estilos
- **Lucide React** - Iconos

## ⚠️ ADVERTENCIA LEGAL

Estas herramientas deben usarse ÚNICAMENTE en sistemas que poseas o tengas permiso explícito para testear. El escaneo no autorizado es ilegal.

## License

MIT

---

**Desarrollado para fines educativos y de testing autorizado**
