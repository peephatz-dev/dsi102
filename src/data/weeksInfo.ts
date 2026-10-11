import { WeekInfo, WeekId } from '../types/course';

export const WEEKS_INFO: Record<WeekId, WeekInfo> = {
  week1: {
    id: 'week1',
    weekNumber: 1,
    title: 'Introduction to Digital Technology & Technical Fundamentals',
    thaiTitle: 'บทนำสู่เทคโนโลยีดิจิทัลและพื้นฐานทางเทคนิค',
    shortDesc: 'Technology Hierarchy, Analog vs Digital, 5 Building Blocks, Cloud Models, Networking, CIA Triad, AI Automation Pipeline, and Digital Adoption.',
    pdfFileName: 'DSI102_Week1_Introduction to Digital Technology.pdf',
    pdfFilePath: '/pdfs/week1.pdf',
    totalPages: 48,
    badge: 'Fundamentals',
    accentColor: '#3b82f6', // blue-500
    gradient: 'from-blue-600 to-indigo-600',
  },
  week2: {
    id: 'week2',
    weekNumber: 2,
    title: 'Computer Platform: Foundation of Digital Systems',
    thaiTitle: 'แพลตฟอร์มคอมพิวเตอร์และสถาปัตยกรรมระบบดิจิทัล',
    shortDesc: 'Physical Devices vs Platforms, 5-Layer Stack, Von Neumann Architecture, CPU vs GPU vs NPU/TPU, Memory Hierarchy, System Bus, and Distributed Cloud.',
    pdfFileName: 'DSI102_Week2_Computer_Platform.pdf',
    pdfFilePath: '/pdfs/week2.pdf',
    totalPages: 54,
    badge: 'Hardware & Architecture',
    accentColor: '#10b981', // emerald-500
    gradient: 'from-emerald-600 to-teal-600',
  },
  week3: {
    id: 'week3',
    weekNumber: 3,
    title: 'Operating System: The Invisible Manager',
    thaiTitle: 'ระบบปฏิบัติการ: ผู้จัดการล่องหนเบื้องหลังทุกอุปกรณ์',
    shortDesc: 'Roles of OS, Interrupts & Traps, DMA, Process Management, Multithreading, CPU Scheduling (FCFS, RR, Priority), Paging & TLB, and Spooling.',
    pdfFileName: 'DSI102_Week3_Operating_System.pdf',
    pdfFilePath: '/pdfs/week3.pdf',
    totalPages: 78,
    badge: 'Kernel & Resource Management',
    accentColor: '#8b5cf6', // purple-500
    gradient: 'from-purple-600 to-pink-600',
  },
  week4: {
    id: 'week4',
    weekNumber: 4,
    title: 'Virtual Machines & Cloud Computing',
    thaiTitle: 'เครื่องเสมือนและการประมวลผลแบบคลาวด์',
    shortDesc: 'Physical Server Problems, Hypervisor Types 1 & 2, VM Lifecycle, 5 Cloud Characteristics, IaaS/PaaS/SaaS, Containers vs VMs, and Shared Responsibility.',
    pdfFileName: 'DSI102_Week4_VM_Cloud.pdf',
    pdfFilePath: '/pdfs/week4.pdf',
    totalPages: 48,
    badge: 'Cloud & Virtualization',
    accentColor: '#f59e0b', // amber-500
    gradient: 'from-amber-500 to-orange-600',
  },
  week5: {
    id: 'week5',
    weekNumber: 5,
    title: 'Introduction to Computer Network',
    thaiTitle: 'บทนำสู่ระบบเครือข่ายคอมพิวเตอร์',
    shortDesc: 'Network Devices (Hub, Switch, Router, AP, Modem), Physical Links (Twisted Pair, Coaxial, Fiber Optic), T568A/B Wiring, Wireless Spectrum, Network Scopes, and Topologies.',
    pdfFileName: 'DSI102_Week5_Introduction_to_Computer_Network.pdf',
    pdfFilePath: '/pdfs/week5.pdf',
    totalPages: 74,
    badge: 'Hardware & Topology',
    accentColor: '#06b6d4', // cyan-500
    gradient: 'from-cyan-600 to-blue-600',
  },
  week6: {
    id: 'week6',
    weekNumber: 6,
    title: 'Network Communication: How Data Moves Across Networks',
    thaiTitle: 'การสื่อสารในระบบเครือข่าย: โปรโตคอล เลเยอร์ และการเดินทางของแพ็กเก็ต',
    shortDesc: 'Layered Models (OSI 7 Layers vs TCP/IP 4 Layers), Encapsulation & PDU, IP Addressing (IPv4 vs IPv6, CIDR, Subnet Mask), TCP 3-Way Handshake vs UDP, ICMP Diagnostics (Ping, Traceroute), and End-to-End Packet Walk.',
    pdfFileName: 'DSI102_Week6_Network_Communication.pdf',
    pdfFilePath: '/pdfs/week6.pdf',
    totalPages: 66,
    badge: 'Protocols & Layered Models',
    accentColor: '#ec4899', // pink-500
    gradient: 'from-pink-600 to-rose-600',
  },
  week7: { id: 'week7', weekNumber: 7, title: 'Network Security: All Layers', thaiTitle: 'ความปลอดภัยหลายชั้นและ Defense in Depth', shortDesc: 'Perimeter, network, endpoint, application, data, users, cloud, and recovery.', pdfFileName: 'DSI102_Week8_Network_Layers_Security.pdf', pdfFilePath: '/pdfs/week7.pdf', totalPages: 74, badge: 'Security layers', accentColor: '#6366f1', gradient: '' },
  week8: { id: 'week8', weekNumber: 8, title: 'Cyber Attacks, Threats and Vulnerabilities', thaiTitle: 'ภัยคุกคาม ช่องโหว่ และการตอบสนองต่อเหตุ', shortDesc: 'Malware, phishing, network and application threats, case studies, incident response.', pdfFileName: 'DSI102_Week9_Cyber_Attacks.pdf', pdfFilePath: '/pdfs/week8.pdf', totalPages: 72, badge: 'Cybersecurity', accentColor: '#6366f1', gradient: '' },
};

export const ALL_WEEKS_LIST: WeekInfo[] = [
  WEEKS_INFO.week1,
  WEEKS_INFO.week2,
  WEEKS_INFO.week3,
  WEEKS_INFO.week4,
  WEEKS_INFO.week5,
  WEEKS_INFO.week6,
  WEEKS_INFO.week7,
  WEEKS_INFO.week8,
];
