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
};

export const ALL_WEEKS_LIST: WeekInfo[] = [
  WEEKS_INFO.week1,
  WEEKS_INFO.week2,
  WEEKS_INFO.week3,
  WEEKS_INFO.week4,
];
