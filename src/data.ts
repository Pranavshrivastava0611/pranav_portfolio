import { Project, TimelineEvent, TimelineEntry } from './types';


export const SHOWCASE_PROJECTS: Project[] = [
  {
    id: 'orcha',
    caseFileNumber: 'CASE_FILE_001',
    name: 'Orcha (AgentOS)',
    description: 'Full-stack SaaS platform for building and orchestrating multi-agent LLM workflows.',
    category: 'AI',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaXyct4B3KIrhXaZu-luKJHT_vGZn29r6JXbLfxxXBJ8ush_ZqHv998kCg73cMLRDSuBhj7M5SxCpsXx8h_p160QAqlVxf1_fsS64rbaXMvCddiH0D5TY5hwbBxFmnQEuJnpHc6ykR1ruCoR5AcFjdBmFOoBarBEjGEvMpSqoknLlhFeM3QL0u2voU_PhHMabff9szNXLz28D4Ta0KJbJUcc7-Rj2nGEkzlg2_EjH89gaWuMypp3PUcXwfw4L3p5E7bBl8Yfve',
    date: '2026-01-15',
    tags: ['LangGraph', 'Next.js', 'BullMQ', 'pgvector', 'Docker', 'AWS'],
    fullDossier: 'Orcha is an advanced SaaS framework constructed to build, run, and scale multi-agent LLM systems. Supports sequential, parallel fan-out, and hierarchical agent coordination patterns using LangGraph with governed runtime contexts. Features structured tool-calling, contextual memory vaults, RAG pipelines, and real-time telemetry observation logs.',
    metadata: {
      signalTelemetryTitle: 'LangGraph Agent Orchestrator',
      threatLevel: 'CRITICAL',
      containmentProtocol: 'Persist all user keys inside AES-256 encrypted vaults. Monitor BullMQ queue lag; scale agent workers dynamically if processing delay exceeds 10 seconds.'
    }
  },
  {
    id: 'solsphere',
    caseFileNumber: 'CASE_FILE_002',
    name: 'SolSphere',
    description: 'On-chain social platform on Solana with tokenized communities.',
    category: 'Web3',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2d7k8eLXICHu8b-kqOsjJ2cR8pdjR5sAwLtAYdX-T4xn_S5-ltSgNqSwCDejaXqUkSHUStcI5hwOCOqqIcKBHyT_UJUSwuaa7_sSsaO1T4SGC3op7Zyc8DJgGuw-VUYm4mtm31KQ2PS3XFMyyrrZ89xqGI_KNkNvIjC2wYazN2ZeJS7BXIvyXZ9HDcL2N4FsyOUnoBixnB_qHJOBJS3ySuDghAHAFkqftj5N5H-uAjv6PTpzDwr9XZbqHQNUa7tTJhPcNr2e8',
    date: '2026-01-01',
    tags: ['Solana', 'Next.js', 'Anchor', 'Web3.js'],
    fullDossier: 'A highly scalable decentralized social hub constructed on the Solana network. Employs SPL token-gated community portals, on-chain message feeds, and transaction batching. Reduces typical gas overheads by 99% compared to EVM layers and maintains sub-400ms transaction finality for over 1,000 concurrent active users.',
    metadata: {
      signalTelemetryTitle: 'Solana RPC & Anchor Telemetry',
      threatLevel: 'MEDIUM',
      containmentProtocol: 'Distribute RPC network calls across load-balanced Solana endpoints. Verify Anchor account constraints on every state instruction.'
    }
  },
  {
    id: 'forkup',
    caseFileNumber: 'CASE_FILE_003',
    name: 'ForkUp',
    description: 'Decentralized bounty platform with GitHub event-driven workflows.',
    category: 'Web3',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuFAxDtKhmJ6pTWoQz2nq9n4XEr2HSAyfaeyHuJ9u4ZtHvXnzCiOZ94WbfhADsKMsSka1LAj4JvGy5X2N-hXu9nt5XHYHcWNpIWDaEUT9SUKVLVgliNWplTTbTN3oMa9ZpE7EddenJGlgbW4XojbYSyhNusCrVzO9YFzsK-sP6n9xbMrsZyXMcETYj47ebNHDBVnY3zk4PLZ2cv2ibWFVkvxaShYvKH36vj852NwPiEM9RvK5Gy0XfrmPiXwBHY7otTJRtFWiQ',
    date: '2025-03-15',
    tags: ['Solana', 'Next.js', 'Probot', 'Privy', 'Web3.js'],
    fullDossier: 'ForkUp is an on-chain developer bounty platform. Leverages event-driven GitHub webhook workflows and smart contract escrow to automatically execute payouts on milestone merges, decreasing manual administrative reward overhead by 80%. Integrated with Privy authentication.',
    metadata: {
      signalTelemetryTitle: 'Escrow Contract Watchdog',
      threatLevel: 'HIGH',
      containmentProtocol: 'Trigger automatic transaction reversals if the repository webhook secret deviates from registration settings.'
    }
  },
  {
    id: 'vmlang',
    caseFileNumber: 'CASE_FILE_004',
    name: 'vm_lang Compiler',
    description: 'C++17 compiler and custom bytecode virtual machine with browser IDE.',
    category: 'Systems',
    imgUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&h=600&fit=crop',
    date: '2024-09-01',
    tags: ['C++17', 'Next.js', 'Compilers', 'Bytecode'],
    fullDossier: 'Built a full language toolchain including custom lexical analysis, recursive descent parser, Abstract Syntax Tree generation, bytecode assembly compiler, and a Stack-based Virtual Machine execution engine, wrapped inside a client-side Next.js terminal workspace.',
    metadata: {
      signalTelemetryTitle: 'C++ Bytecode VM Status',
      threatLevel: 'LOW',
      containmentProtocol: 'Confine execution inside sandboxed heap allocations. Throw immediate stack violations if recursion limits are breached.'
    }
  },
  {
    id: 'gesturearena',
    caseFileNumber: 'CASE_FILE_005',
    name: 'GestureArena',
    description: 'Multiplayer mobile game utilizing neural hand tracking and Go servers.',
    category: 'Mobile',
    imgUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    date: '2024-06-15',
    tags: ['Expo', 'MediaPipe', 'Go', 'WebSockets'],
    fullDossier: 'A real-time multiplayer mobile game using Expo, Google MediaPipe for neural hand gesture mapping, and a Go-based WebSocket backend. Synchronizes gesture inputs and game coordinates across clients under 18ms of network latency.',
    metadata: {
      signalTelemetryTitle: 'Go WebSocket Frame Stream',
      threatLevel: 'MEDIUM',
      containmentProtocol: 'Perform client coordinate validation on the Go coordinator thread to prevent unauthorized spatial state hacks.'
    }
  },
  {
    id: 'lms',
    caseFileNumber: 'CASE_FILE_006',
    name: 'Loan Management System',
    description: 'Backend-intensive financial system with JWT-based role authorization.',
    category: 'Backend',
    imgUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    date: '2024-04-10',
    tags: ['Next.js', 'MongoDB', 'Node.js', 'JWT'],
    fullDossier: 'A complete full-stack LMS containing secure role-based access control structures, loan application processing, document uploads, and dynamic interest calculation microservices built with Next.js, Node, and MongoDB.',
    metadata: {
      signalTelemetryTitle: 'LMS API Gateway Logs',
      threatLevel: 'LOW',
      containmentProtocol: 'Log all database writes to encrypted audit files. Rate-limit credit check queries to block request floods.'
    }
  }
];



export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2023',
    title: 'B.Tech CSE Initiated',
    description: 'Enrolled in Computer Science and Engineering at IIIT Una. Focused on systems programming, compiler structures, and algorithmic complexity.',
    label: 'IIIT UNA CSE // CLR_1',
    category: 'tech',
    isClassified: false,
    clearanceLevelRequired: 1
  },
  {
    year: '2024',
    title: 'DefiLlama Intercept',
    description: 'Contributed to DefiLlama, the largest DeFi TVL tracking platform. Authored blockchain trackers and impacted 185+ on-chain adapters.',
    label: 'DEFILLAMA OSS CONTRIBUTIONS',
    category: 'breach',
    isClassified: true,
    clearanceLevelRequired: 2
  },
  {
    year: '2024',
    title: 'vm_lang Compilation System',
    description: 'Constructed custom C++17 compilers and bytecode VMs. Created an online IDE compiler sandbox for secure runtime trials.',
    label: 'COMPILER TOOLCHAIN SYNTHESIS',
    category: 'tech',
    isClassified: false,
    clearanceLevelRequired: 3
  },
  {
    year: '2025',
    title: 'ForkUp Deployment',
    description: 'Shipped a Solana Web3.js decentralized bounty platform. Handled escrow smart contracts and GitHub webhook automation channels.',
    label: 'FORKUP ACTIVE ESCROW',
    category: 'tech',
    isClassified: false,
    clearanceLevelRequired: 3
  },
  {
    year: '2025',
    title: 'FoodBot AI Assignment',
    description: 'Software Engineer Trainee deployment. Architected multi-step agentic LLM pipelines, WebSocket microservices, and CRM workflows.',
    label: 'AI INFRASTRUCTURE OPERATIONS',
    category: 'breach',
    isClassified: true,
    clearanceLevelRequired: 4
  },
  {
    year: '2026',
    title: 'SolSphere Portal Launch',
    description: 'Deployed an on-chain tokenized social community network on Solana using Anchor. Scaled messages under 400ms transaction finality.',
    label: 'SOLSPHERE ACTIVE SECTOR',
    category: 'tech',
    isClassified: false,
    clearanceLevelRequired: 4
  },
  {
    year: '2026',
    title: 'Orcha Mainframe Activated',
    description: 'Launched Orcha (AgentOS) for multi-agent LLM workflow scheduling. Elected Technical Head of IIIT Una Entrepreneurship cell.',
    label: 'ORCHA ACTIVATED #112',
    category: 'breach',
    isClassified: true,
    clearanceLevelRequired: 5
  }
];

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'iiitu-deploy',
    fileCode: 'IIITU-23',
    yearRange: '2023 — PRESENT',
    title: 'B.Tech CSE Deployed',
    department: 'Indian Institute of Information Technology Una',
    description: 'Enrolled in B.Tech Computer Science and Engineering. Deployed on high-intensity computational mathematics, algorithmic analysis, and [REDACTED_CGPA_7_64] score tracking.',
    tags: ['Academics', 'Algorithms', 'Systems'],
    confidentialLog: 'ESTABLISHED SYSTEM INTEGRATION AT IIIT UNA. COMPLETED DIRECTIVES IN DATA STRUCTURES AND ADVANCED COMPUTER SYSTEMS.',
    iconType: 'memory',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop',
    imageAlt: 'IIIT Una computer labs'
  },
  {
    id: 'defillama-oss',
    fileCode: 'DFL-24',
    yearRange: '2024 — PRESENT',
    title: 'DefiLlama Core Contributions',
    department: 'Decentralized Analytics Network',
    description: 'Contributed Dune Analytics credit-tracking scripts and server integrations. Impacted [REDACTED_185_ADAPTERS] on-chain adapters, tracking over $100B+ TVL.',
    tags: ['TypeScript', 'Blockchain', 'OSS'],
    confidentialLog: 'INTEGRATION SUCCESSFUL. MONITORING HUNDREDS OF ACTIVE PROTOCOL ADAPTERS ON DEFILLAMA MAIN CORE PLATFORM.',
    iconType: 'dangerous',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop',
    imageAlt: 'Blockchain tracking matrix'
  },
  {
    id: 'vmlang-release',
    fileCode: 'VML-24',
    yearRange: '2024',
    title: 'vm_lang Language Synthesis',
    department: 'Compiler & Systems Engineering',
    description: 'Constructed vm_lang, a C++17 powered compiler. Implemented lexer, parser, AST generation, stack-based VM, and a Next.js [REDACTED_IDE_SANDBOX] for secure execution.',
    tags: ['C++17', 'Compilers', 'Bytecode'],
    confidentialLog: 'BYTECODE EXECUTION LATENCY REMAINS BELOW 12 MICROSECONDS. SANDBOXED HEAP CONSTRAINED TO 64MB PER THREAD.',
    iconType: 'memory',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&h=600&fit=crop',
    imageAlt: 'Custom compiler IDE interface'
  },
  {
    id: 'forkup-release',
    fileCode: 'FKP-25',
    yearRange: '2025',
    title: 'ForkUp Bounty Platform',
    department: 'Web3 & Workflow Automation',
    description: 'Built a decentralized bounty system. Deployed event-driven GitHub webhooks with escrow smart contracts to automate SOL payouts, reducing [REDACTED_MANUAL_PROCESSES] by 80%.',
    tags: ['Solana', 'Next.js', 'Probot', 'Privy'],
    confidentialLog: 'FUNDS ESCROW SECURITY FULLY VERIFIED. INTEGRATED PRIVY USER WALLET SIGNING WITH WEBHOOK CALLBACK TRIGGER LOOPS.',
    iconType: 'memory',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop',
    imageAlt: 'Decentralized bounty systems'
  },
  {
    id: 'foodbot-intern',
    fileCode: 'FBT-25',
    yearRange: '2025 — 2026',
    title: 'FoodBot AI Trainee Deployment',
    department: 'AI Infrastructure Division',
    description: 'Developed multi-step agentic LLM pipelines, MCP server integrations, and WebSocket order relays. Automated 3+ manual support processes, reducing [REDACTED_RESPONSE_TIME] by 40%. Built a scalable React CRM.',
    tags: ['LLMs', 'MCP', 'WebSockets', 'CRM'],
    confidentialLog: 'SHIPPED SCALABLE CRM WITH REAL-TIME TELEMETRY STREAMING. API ROUTE LATENCY DECREASED BY 200MS.',
    iconType: 'psychology',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    imageAlt: 'AI agent model execution'
  },
  {
    id: 'solsphere-release',
    fileCode: 'SLS-26',
    yearRange: '2026',
    title: 'SolSphere On-Chain Matrix',
    department: 'Solana Ecosystem Core',
    description: 'Developed a social network utilizing Solana token-gated access and Anchor contracts. Decreased transaction cost overhead by [REDACTED_99_PERCENT] and achieved sub-400ms finality.',
    tags: ['Solana', 'Anchor', 'Next.js'],
    confidentialLog: 'SPL-TOKEN ESCROWS STABLE. NETWORK CAPACITY EXCEEDS 1000 CONCURRENT ONLINE CHANNELS.',
    iconType: 'memory',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    imageAlt: 'Solana Anchor nodes'
  },
  {
    id: 'orcha-deploy',
    fileCode: 'ORC-26',
    yearRange: '2026 — PRESENT',
    title: 'Orcha Mainframe Activation',
    department: 'Autonomous Agent OS',
    description: 'Built Orcha SaaS for scheduling multi-agent LangGraph workflows. Serving as [REDACTED_TECHNICAL_HEAD] of the Entrepreneurship & Innovation Cell at IIIT Una.',
    tags: ['LangGraph', 'Next.js', 'BullMQ', 'Docker'],
    confidentialLog: 'MULTIPLE AUTONOMOUS AGENTS SECURED BY AES-256 VAULTS. SCHEDULER DISTRIBUTED ACROSS CLUSTERS WITH REAL-TIME OBSERVABILITY.',
    iconType: 'dangerous',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    imageAlt: 'Orcha server telemetry'
  }
];


