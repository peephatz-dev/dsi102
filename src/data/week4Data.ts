import { StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';

export const week4KeyConcepts: KeyConcept[] = [
  {
    id: 'w4-c1',
    term: 'Virtualization',
    thaiTerm: 'การจำลองเสมือน (Virtualization)',
    definition: 'The creation of a logical (virtual) representation of computing resources—such as servers, OS, storage, or network—decoupling software from physical hardware.',
    thaiDefinition: 'เทคโนโลยีการสร้างตัวแทนเชิงตรรกะของทรัพยากรคอมพิวเตอร์จริง เช่น เซิร์ฟเวอร์ ระบบปฏิบัติการ สื่อบันทึกข้อมูล เพื่อแยกการทำงานของซอฟต์แวร์ออกจากข้อจำกัดของฮาร์ดแวร์กายภาพ',
    example: 'Running 10 isolated virtual machines on a single physical Dell PowerEdge server host.',
    pdfPage: 7,
    category: 'Virtualization',
    important: true,
  },
  {
    id: 'w4-c2',
    term: 'Hypervisor / VMM',
    thaiTerm: 'ไฮเปอร์ไวเซอร์ / โปรแกรมควบคุมเครื่องเสมือน',
    definition: 'The software or firmware layer that creates, monitors, and abstracts physical hardware, allocating CPU, RAM, and storage among Guest VMs.',
    thaiDefinition: 'เลเยอร์ซอฟต์แวร์หรือเฟิร์มแวร์ที่ทำหน้าที่จัดสรรและแปลคำสั่งระหว่างเครื่องเสมือน (VMs) กับฮาร์ดแวร์จริง ควบคุมไม่ให้ VM เข้าถึงฮาร์ดแวร์โดยตรง',
    example: 'VMware ESXi, KVM (Type 1) vs VirtualBox, VMware Workstation (Type 2)',
    pdfPage: 14,
    category: 'Virtualization',
    important: true,
  },
  {
    id: 'w4-c3',
    term: 'Type 1 vs. Type 2 Hypervisor',
    thaiTerm: 'ไฮเปอร์ไวเซอร์ Type 1 (Bare-Metal) vs Type 2 (Hosted)',
    definition: 'Type 1 runs directly on raw physical hardware with no host OS underneath (enterprise data centers). Type 2 runs as an application on top of an existing host OS (desktop learning/testing).',
    thaiDefinition: 'Type 1 (Bare-Metal) ติดตั้งบนฮาร์ดแวร์จริงโดยตรง ไม่มี Host OS คั่นกลาง ประสิทธิภาพสูงสุด ใช้ใน Data Center ส่วน Type 2 (Hosted) รันเป็นโปรแกรมบน Host OS เหมาะสำหรับทดสอบบนคอมพิวเตอร์ส่วนตัว',
    example: 'Type 1: VMware ESXi, Proxmox VE; Type 2: Oracle VirtualBox, VMware Workstation',
    pdfPage: 17,
    category: 'Virtualization',
    important: true,
  },
  {
    id: 'w4-c4',
    term: 'Snapshot vs. VM Migration',
    thaiTerm: 'สแนปชอต (Snapshot) vs การย้ายเครื่องเสมือน (Migration)',
    definition: 'Snapshot freezes and saves the complete memory and disk state at a point in time for instant rollback. Migration moves a running VM between physical hosts with zero downtime (Live Migration).',
    thaiDefinition: 'Snapshot คือการบันทึกสถานะระบบและแรม ณ เสี้ยววินาทีนั้นไว้ เพื่อย้อนกลับ (Rollback) หากอัปเดตพัง; Migration คือการย้าย VM ข้ามเครื่องเซิร์ฟเวอร์จริงโดยไม่ต้องปิดระบบ เพื่อซ่อมบำรุงฮาร์ดแวร์',
    example: 'Take a snapshot before applying an OS kernel security patch; Live-migrate VM to Host B before replacing Host A power supply.',
    pdfPage: 20,
    category: 'VM Management',
    important: true,
  },
  {
    id: 'w4-c5',
    term: '5 Essential Cloud Characteristics (NIST)',
    thaiTerm: 'คุณลักษณะหลัก 5 ประการของคลาวด์ (NIST)',
    definition: '1) On-demand self-service, 2) Broad network access, 3) Resource pooling, 4) Rapid elasticity, and 5) Measured service.',
    thaiDefinition: '5 เสาหลักนิยามคลาวด์: 1) บริการตนเองตามต้องการ, 2) เข้าถึงได้กว้างขวางผ่านเน็ตเวิร์ก, 3) รวมกลุ่มทรัพยากรจัดสรรร่วมกัน, 4) ยืดหยุ่นขยาย/หดได้รวดเร็ว, 5) คิดค่าบริการตามการใช้งานจริง',
    example: 'Spinning up 20 AWS EC2 instances in 2 minutes via web console and paying by the second.',
    pdfPage: 27,
    category: 'Cloud Computing',
    important: true,
  },
  {
    id: 'w4-c6',
    term: 'Scalability vs. Elasticity',
    thaiTerm: 'ความสามารถในการขยายขนาด (Scalability) vs ความยืดหยุ่นปรับตัว (Elasticity)',
    definition: 'Scalability is the structural ability to handle growing workloads (Scale-Up or Scale-Out). Elasticity is the dynamic, automated scaling up AND down matching instantaneous workload fluctuations.',
    thaiDefinition: 'Scalability คือขีดความสามารถในการเพิ่มขนาดรองรับงานโต (อัปเกรดเครื่องหรือเพิ่มเครื่อง); Elasticity คือการปรับขนาดแบบ "อัตโนมัติทั้งขาขึ้นและขาลง" ตามปริมาณทราฟฟิกจริงแบบเรียลไทม์',
    example: 'Scalability: Planning an architecture that can support 1M users. Elasticity: Auto-scaling from 2 servers to 50 during a 1-hour flash sale and shrinking back to 2 afterwards.',
    pdfPage: 28,
    category: 'Cloud Computing',
    important: true,
  },
  {
    id: 'w4-c7',
    term: 'Shared Responsibility Model',
    thaiTerm: 'แบบจำลองความรับผิดชอบร่วมกันด้านความปลอดภัย',
    definition: 'Security OF the Cloud (Provider: physical data centers, host hardware, hypervisor) vs Security IN the Cloud (Customer: guest OS, network firewalls, app code, credentials).',
    thaiDefinition: 'การแบ่งหน้าที่ความปลอดภัย: ผู้ให้บริการดูแล "ความปลอดภัยของคลาวด์" (ศูนย์ข้อมูล, ฮาร์ดแวร์, ระบบเครือข่ายหลัก) ส่วนลูกค้าต้องดูแล "ความปลอดภัยในคลาวด์" (Guest OS, ข้อมูล, รหัสผ่าน, สิทธิ์การเข้าถึง)',
    example: 'In IaaS, if an attacker hacks an unpatched Windows Guest OS, the customer is responsible; if the physical server catches fire, AWS is responsible.',
    pdfPage: 41,
    category: 'Cloud Security',
    important: true,
  },
  {
    id: 'w4-c8',
    term: 'Virtual Machines vs. Containers',
    thaiTerm: 'เครื่องเสมือน (VMs) เทียบกับ คอนเทนเนอร์ (Containers)',
    definition: 'VMs virtualize hardware and each require a full Guest Operating System. Containers virtualize the OS level, sharing the host kernel, making them lightweight (MBs vs GBs) and fast (seconds vs minutes).',
    thaiDefinition: 'VM จำลองฮาร์ดแวร์ ต้องมี Guest OS แยกทุกตัว (หนัก กินแรมเป็น GB); Container จำลองระดับ OS ใช้เคอร์เนลร่วมกับโฮสต์ บรรจุแค่แอปกับไลบรารี (เบา กินพื้นที่ระดับ MB เปิดในเสี้ยววินาที)',
    example: 'VM: Ubuntu VM running on VMware (requires 2GB RAM); Container: Docker container running Node.js (requires 50MB RAM).',
    pdfPage: 42,
    category: 'Modern Cloud',
    important: true,
  }
];

export const week4Modules: StudyModule[] = [
  {
    id: 'w4-m1',
    weekId: 'week4',
    moduleNumber: 1,
    title: 'The Problem with Traditional Infrastructure & The Virtualization Breakthrough',
    thaiTitle: 'ปัญหาของโครงสร้างพื้นฐานดั้งเดิมและการกำเนิดของการจำลองเสมือน',
    pdfPageStart: 1,
    pdfPageEnd: 12,
    overview: 'Why traditional single-workload physical servers wasted up to 85% of hardware capacity, and how the virtualization layer consolidates workloads.',
    subsections: [
      {
        id: 'w4-m1-s1',
        title: 'The Problem with Physical Bare-Metal Servers',
        thaiTitle: 'วิกฤตความสูญเปล่าของเซิร์ฟเวอร์กายภาพแบบเดิม (Physical Server Sprawl)',
        pdfPage: 3,
        content: `Before virtualization, organizations adhered to the strict rule of **"One Application, One Physical Server"** (e.g. Server 1 for Payroll, Server 2 for Email, Server 3 for Database) to prevent applications from crashing each other.\n\nThis produced catastrophic operational problems:
1. **Capacity Waste (Underutilization)**: Industry averages revealed enterprise servers operated at merely **8% to 15% CPU utilization**, leaving 85% of purchased silicon sitting idle!
2. **Server Sprawl**: Data center racks rapidly filled with hundreds of physical machines, creating enormous electric power and cooling bills.
3. **Hardware Lock-in & Slow Provisioning**: Ordering and provisioning a new physical server required 4 to 8 weeks for procurement, mounting, and cabling.
4. **Disaster Recovery Nightmare**: If a motherboard burned out, restoring backups required locating identical server hardware.`,
        bulletPoints: [
          'Traditional servers: Low 8-15% average CPU utilization.',
          'One app per box caused severe server sprawl and exorbitant cooling costs.',
          'Slow procurement cycles (weeks to months).'
        ],
        thaiCommentary: 'ปัญหาหลักของเซิร์ฟเวอร์แบบเดิมคือ "Capacity Waste" ซื้อเครื่องมาแพง แต่ใช้พลัง CPU แค่ 8-15% ที่เหลือสูญเปล่า',
        memoryTip: 'One App per Box = 85% Waste & Server Sprawl',
        infographicId: 'infographic-w4-server-consolidation'
      },
      {
        id: 'w4-m1-s2',
        title: 'The Virtualization Breakthrough',
        thaiTitle: 'จุดเปลี่ยนทางเทคโนโลยี: รวมหลายเครื่องเสมือนลงบนฮาร์ดแวร์เครื่องเดียว',
        pdfPage: 8,
        content: `**Virtualization** introduces an abstraction layer (Hypervisor) that decouples the operating system from physical silicon.\n\n**The Transformation**:
* **Before Virtualization**: 4 physical servers, each running at 10% utilization = 4 physical boxes consuming space and power.
* **After Virtualization**: 1 robust physical host running a hypervisor, hosting 4 isolated Virtual Machines (VMs) simultaneously = **CPU utilization jumps to 70% - 80%**!\n\nEach Virtual Machine behaves exactly like an independent physical computer, with its own virtual CPU, virtual RAM, virtual network interface card (vNIC), and isolated Guest OS.`,
        bulletPoints: [
          'Workload Consolidation boosts hardware utilization from 10% to 75%+.',
          'Hardware Independence: A VM is simply a set of software files (.vmx, .vmdk) that can run on any x86 host.',
          'Isolation: A crash or virus in Guest VM A cannot contaminate Guest VM B.'
        ],
        thaiCommentary: 'การจำลองเสมือนช่วยรวมเวิร์กโหลด (Consolidate) ดันประสิทธิภาพการใช้ทรัพยากรจาก 10% สู่ 70-80% และทำให้ VM เป็นเพียงไฟล์ที่ย้ายไปไหนก็ได้',
        formula: '\\text{Physical Sprawl (4 boxes @ 10\\%)} \\xrightarrow{\\text{Hypervisor}} \\text{Consolidated Host (1 box @ 75\\%)}',
        memoryTip: 'Consolidate 10 physical boxes into 1 host with 10 isolated VMs',
        infographicId: 'infographic-w4-server-consolidation'
      }
    ]
  },
  {
    id: 'w4-m2',
    weekId: 'week4',
    moduleNumber: 2,
    title: 'Hypervisors & Virtual Machine Management',
    thaiTitle: 'สถาปัตยกรรมไฮเปอร์ไวเซอร์และการบริหารจัดการเครื่องเสมือน',
    pdfPageStart: 13,
    pdfPageEnd: 22,
    overview: 'Type 1 (Bare-Metal) vs Type 2 (Hosted) architectures, VM lifecycle operations, Snapshots, and Live Migration.',
    subsections: [
      {
        id: 'w4-m2-s1',
        title: 'Type 1 (Bare-Metal) vs. Type 2 (Hosted) Hypervisors',
        thaiTitle: 'ไฮเปอร์ไวเซอร์ Type 1 (Bare-Metal) เทียบกับ Type 2 (Hosted)',
        pdfPage: 15,
        content: `**Type 1: Bare-Metal Hypervisor**
* Position: Installs and executes directly on raw physical computer hardware. **There is NO host operating system underneath**.
* Characteristics: Minimal latency, maximum I/O throughput, high hardware stability, small attack surface.
* Use Cases: Enterprise data centers, private clouds, mission-critical production (e.g., VMware ESXi, Microsoft Hyper-V Server, KVM, Proxmox VE).

**Type 2: Hosted Hypervisor**
* Position: Runs as a software application on top of an existing **Host Operating System** (Windows, macOS, Linux).
* Characteristics: Introduces double-layer OS abstraction overhead; performance is constrained by host OS scheduling.
* Use Cases: Developer local testing, student learning environments, desktop software compatibility (e.g., Oracle VirtualBox, VMware Workstation / Fusion, Parallels Desktop).`,
        bulletPoints: [
          'Type 1: Hardware -> Hypervisor -> Guest OS (Production Data Centers).',
          'Type 2: Hardware -> Host OS -> Hypervisor -> Guest OS (Developer Desktops).',
          'Exam Rule: Enterprise server = Type 1; Laptop test = Type 2.'
        ],
        thaiCommentary: 'จำให้แม่น: Type 1 ติดตั้งบนฮาร์ดแวร์โดยตรง ไม่มี Host OS (ใช้ในเซิร์ฟเวอร์องค์กร); Type 2 รันเป็นแอปบน Host OS (ใช้ทดสอบบนโน้ตบุ๊ก)',
        memoryTip: 'Type 1 = Bare-Metal on Hardware | Type 2 = Hosted on Top of OS',
        infographicId: 'infographic-w4-hypervisors'
      },
      {
        id: 'w4-m2-s2',
        title: 'Snapshots, Cloning & Live VM Migration',
        thaiTitle: 'การทำสแนปชอต (Snapshot), โคลน (Cloning) และการย้ายระบบสด (Live Migration)',
        pdfPage: 20,
        content: `Because a VM is ultimately encapsulated as data files on storage, administrators gain revolutionary operations:
* **Snapshot**: Instantly freezes and records the system state, RAM contents, and virtual disk pointers at a specific microsecond. If an OS patch or software update corrupts the system, the admin can perform an instant **Rollback** to the snapshot point.
* **Cloning**: Creating an exact duplicate of an existing VM template to deploy 10 new database nodes in seconds.
* **VM Migration (Live Migration)**: Moving an actively executing VM from Physical Host A to Physical Host B over the network **without powering off the VM and with zero perceptible user downtime**!
  * Allows proactive physical server maintenance, RAM replacement, or automated load balancing.`,
        bulletPoints: [
          'Snapshot = Safety net before dangerous updates (Rollback capability).',
          'Live Migration = Move running VM across physical servers without downtime.'
        ],
        thaiCommentary: 'Snapshot บันทึกสถานะเพื่อถอยกลับได้หากอัปเดตพัง, Live Migration ย้าย VM ข้ามเซิร์ฟเวอร์เครื่องจริงได้ขณะที่เครื่องยังเปิดทำงานอยู่',
        memoryTip: 'Snapshot = Undo button | Live Migration = Move server with zero downtime',
      }
    ]
  },
  {
    id: 'w4-m3',
    weekId: 'week4',
    moduleNumber: 3,
    title: 'From Virtual Machines to Cloud Computing: The 5 NIST Characteristics',
    thaiTitle: 'จากเครื่องเสมือนสู่คลาวด์คอมพิวติง: 5 คุณลักษณะตามมาตรฐาน NIST',
    pdfPageStart: 23,
    pdfPageEnd: 28,
    overview: 'Why Virtualization is NOT Cloud Computing, the cloud evolution pipeline, and the 5 essential characteristics defining true cloud services.',
    subsections: [
      {
        id: 'w4-m3-s1',
        title: 'Virtualization != Cloud Computing',
        thaiTitle: 'การจำลองเสมือน ไม่เท่ากับ คลาวด์คอมพิวติง',
        pdfPage: 24,
        content: `A frequent misconception is equating VMs with Cloud:
* **Virtualization** is the underlying foundational **technology** that partitions physical hardware into logical instances. Having a VMware server in your basement does NOT mean you have cloud computing!
* **Cloud Computing** is the **service delivery model** that combines virtualization with automated self-service APIs, multi-tenant resource pooling, on-demand provisioning, and metered billing over a network.\n\n$$\\mathbf{Cloud = Virtualization + Automation + Network\\ Delivery + Metered\\ Billing}$$`,
        bulletPoints: [
          'Virtualization enables Cloud, but Cloud is the automated service delivery model.',
          'Without self-service automation and elasticity, it is merely local virtualization.'
        ],
        thaiCommentary: 'มี VM ไม่ได้แปลว่ามีคลาวด์! คลาวด์ต้องมีระบบอัตโนมัติ (Automation), การกดสร้างเองได้ทันที (Self-service), และคิดเงินตามจริง (Metered Billing)',
        formula: '\\text{Cloud} = \\text{Virtualization} + \\text{Self-Service Automation} + \\text{Broad Network Access} + \\text{Metered Billing}',
        memoryTip: 'Virtualization is the Engine | Cloud is the Self-Driving Taxi Service'
      },
      {
        id: 'w4-m3-s2',
        title: 'The 5 Essential Cloud Characteristics (NIST)',
        thaiTitle: 'คุณลักษณะหลัก 5 ประการของระบบคลาวด์ตามมาตรฐานสากล',
        pdfPage: 27,
        content: `According to the National Institute of Standards and Technology (NIST), every genuine cloud system must exhibit five attributes:
1. **On-Demand Self-Service (บริการตนเองตามความต้องการ)**: Users can provision compute, storage, and networking unilaterally through a web console or API without human interaction with the cloud provider.
2. **Broad Network Access (เข้าถึงได้กว้างขวางผ่านเครือข่าย)**: Services are accessible over standard internet protocols from diverse client platforms (mobile phones, laptops, tablets, workstations).
3. **Resource Pooling (การรวมกลุ่มทรัพยากร)**: Provider resources are pooled to serve multiple consumers in a multi-tenant model, dynamically assigning physical and virtual resources according to consumer demand.
4. **Rapid Elasticity (ความยืดหยุ่นอย่างรวดเร็ว)**: Capabilities can be elastically provisioned and released—automatically in response to real-time traffic spikes—scaling both outward and inward.
5. **Measured Service (คิดค่าบริการตามการใช้งานจริง)**: Resource usage is monitored, controlled, and reported transparently, charging consumers on a pay-as-you-go basis (per second, gigabyte, or API request).`,
        bulletPoints: [
          'NIST 5 Pillars: On-Demand, Broad Access, Resource Pooling, Rapid Elasticity, Measured Service.',
          'All 5 must be present to qualify as true Cloud Computing.'
        ],
        thaiCommentary: 'ท่องจำ 5 เสาหลักของ NIST: On-Demand (กดเปิดเอง), Broad Access (ใช้ได้ทุกที่), Resource Pooling (แชร์พูลร่วมกัน), Rapid Elasticity (ยืดหดทันที), Measured Service (คิดเงินตามจริง)',
        memoryTip: '5 NIST: On-Demand | Broad Network | Pooling | Elasticity | Measured',
        infographicId: 'infographic-w4-cloud-characteristics'
      },
      {
        id: 'w4-m3-s3',
        title: 'Scalability vs. Elasticity',
        thaiTitle: 'เปรียบเทียบ Scalability (ขยายขนาดรองรับงาน) vs Elasticity (ยืดหยุ่นอัตโนมัติ)',
        pdfPage: 28,
        content: `* **Scalability**: The capacity of a system to handle larger workloads by adding resources.
  * *Scale-Up (Vertical)*: Adding more RAM or faster CPU to an existing machine (has physical ceiling).
  * *Scale-Out (Horizontal)*: Adding more server nodes in parallel behind a load balancer (nearly infinite).
* **Elasticity**: The dynamic, **automated** adaptation of capacity to match unpredictable workload fluctuations in real time.
  * *Crucial Distinction*: Scalability is about maximum potential headroom; Elasticity is about dynamically scaling **UP during peaks** AND **scaling DOWN during quiet troughs** to prevent paying for unused servers.`,
        bulletPoints: [
          'Scalability = Ability to grow (can be manual or scheduled).',
          'Elasticity = Automatic real-time expanding AND shrinking to match load.'
        ],
        thaiCommentary: 'Scalability คือขยายได้เพื่อรองรับงานโต, Elasticity คือการปรับขนาด "อัตโนมัติทั้งขาขึ้นและขาลง" ตามกราฟคนใช้งานจริง',
        memoryTip: 'Scalability = Can grow bigger | Elasticity = Autoscale up AND shrink down',
        infographicId: 'infographic-w4-scalability-elasticity'
      }
    ]
  },
  {
    id: 'w4-m4',
    weekId: 'week4',
    moduleNumber: 4,
    title: 'Cloud Service Models: IaaS, PaaS & SaaS',
    thaiTitle: 'รูปแบบการให้บริการบนระบบคลาวด์: IaaS, PaaS และ SaaS',
    pdfPageStart: 29,
    pdfPageEnd: 35,
    overview: 'Analyzing the traditional IT stack vs cloud layers, and navigating the responsibility gradient across service tiers.',
    subsections: [
      {
        id: 'w4-m4-s1',
        title: 'The IT Stack Responsibility Gradient',
        thaiTitle: 'การแบ่งขอบเขตความรับผิดชอบระหว่างผู้ใช้และผู้ให้บริการ',
        pdfPage: 34,
        content: `The 9 Layers of the IT Stack:
\`[Networking] -> [Storage] -> [Servers] -> [Virtualization] -> [Operating System] -> [Middleware] -> [Runtime] -> [Data] -> [Applications]\`\n\n**Service Models Comparison**:
* **On-Premises**: You manage all 9 layers (from buying physical switches to software code).
* **IaaS (Infrastructure as a Service)**: Provider manages Networking, Storage, Servers, and Virtualization. **You manage**: OS, Middleware, Runtime, Data, and Applications. (e.g. AWS EC2, Google Compute Engine).
* **PaaS (Platform as a Service)**: Provider manages everything up through Runtime. **You manage only**: Application Code and Data. (e.g. Heroku, AWS Elastic Beanstalk, Vercel).
* **SaaS (Software as a Service)**: Provider manages all 9 layers. You simply consume the software as an end user. (e.g. Google Docs, Salesforce, Microsoft 365).`,
        bulletPoints: [
          'Exam Rule: In IaaS you configure the OS; in PaaS you deploy code; in SaaS you just log in.',
          'Moving from On-Premises to SaaS shifts operational burden to the cloud vendor.'
        ],
        thaiCommentary: 'จำชั้นของสแต็ก: IaaS ลูกค้าดูแลตั้งแต่ OS ขึ้นไป, PaaS ลูกค้าดูแลแค่แอปกับข้อมูล, SaaS ผู้ให้บริการดูแลทุกชั้นทั้งหมด',
        memoryTip: 'IaaS = Manage OS | PaaS = Manage App | SaaS = Just Consume',
        infographicId: 'infographic-w4-shared-responsibility'
      }
    ]
  },
  {
    id: 'w4-m5',
    weekId: 'week4',
    moduleNumber: 5,
    title: 'Deployment Models, Shared Security & Containers vs. VMs',
    thaiTitle: 'รูปแบบการติดตั้ง ความรับผิดชอบร่วมด้านความปลอดภัย และคอนเทนเนอร์ vs เครื่องเสมือน',
    pdfPageStart: 36,
    pdfPageEnd: 42,
    overview: 'Public/Private/Hybrid clouds, the Shared Responsibility Model for cybersecurity, and OS-level containerization vs hardware VMs.',
    subsections: [
      {
        id: 'w4-m5-s1',
        title: 'Shared Responsibility Model for Cloud Security',
        thaiTitle: 'แบบจำลองความรับผิดชอบร่วมด้านความปลอดภัย (Shared Responsibility)',
        pdfPage: 41,
        content: `Security in cloud computing is never the exclusive duty of one party:
* **Security OF the Cloud (Provider Responsibility)**:
  * Physical security of data centers, biometric badge access, power generators.
  * Underlying host hardware, network switches, and hypervisor firmware patching.
* **Security IN the Cloud (Customer Responsibility)**:
  * Guest Operating System updates and security patches (in IaaS).
  * Network security group configurations, firewall port rules, and VPC routing.
  * Customer application code, SQL injection prevention, user identity and passwords (IAM).
  * Data encryption at rest and in transit.`,
        bulletPoints: [
          'Provider = Security OF the Cloud (Facilities, Hardware, Hypervisor).',
          'Customer = Security IN the Cloud (Data, OS patches, IAM credentials).'
        ],
        thaiCommentary: 'ข้อสอบถามบ่อย: ถ้าเซิร์ฟเวอร์โดนแฮกเพราะไม่ได้อัปเดต Windows Patch บน EC2 ใครผิด? ตอบ: ลูกค้าผิด (Security IN the cloud)',
        memoryTip: 'Provider = Security OF the Cloud | Customer = Security IN the Cloud',
        infographicId: 'infographic-w4-shared-responsibility'
      },
      {
        id: 'w4-m5-s2',
        title: 'Virtual Machines vs. Containers',
        thaiTitle: 'เครื่องเสมือน (VMs) เทียบกับ คอนเทนเนอร์ (Containers / Docker)',
        pdfPage: 42,
        content: `* **Virtual Machines (Hardware-Level Virtualization)**:
  * Hypervisor simulates complete hardware.
  * Every VM contains a **complete Guest Operating System** (Kernel, binaries, drivers).
  * Size: Gigabytes (GBs).
  * Boot Time: Minutes.
  * Isolation: Maximum hardware-level fault and security isolation.
* **Containers (OS-Level Virtualization - e.g. Docker)**:
  * Docker Engine runs on top of a single host operating system.
  * Containers **share the Host OS Kernel**, packaging only the application code, libraries, and binaries.
  * Size: Megabytes (MBs).
  * Boot Time: Milliseconds to seconds.
  * Isolation: Process-level namespace isolation.`,
        bulletPoints: [
          'VMs have separate guest kernels; Containers share the host kernel.',
          'Containers are far more lightweight, booting in seconds.'
        ],
        thaiCommentary: 'VM มี Guest OS แยกทุกตัว ทำให้ไฟล์ใหญ่เป็นกิกะไบต์ ส่วน Container แชร์ Kernel ของโฮสต์ร่วมกัน จึงเปิดได้ในเสี้ยววินาทีและกินแรมน้อยมาก',
        memoryTip: 'VM = Heavy (Full Guest OS) | Container = Lightweight (Shared Kernel)',
        infographicId: 'infographic-w4-vm-vs-container'
      }
    ]
  }
];

export const week4Flashcards: Flashcard[] = [
  {
    id: 'w4-f1',
    weekId: 'week4',
    front: 'Why did traditional physical servers operate at only 8-15% CPU utilization?',
    back: 'Organizations enforced "One App, One Server" to prevent application conflicts. Workloads experienced idle cycles outside business hours, leading to massive hardware capacity waste.',
    thaiExplanation: 'เพราะแยกเครื่องละ 1 แอปเพื่อไม่ให้แย่งทรัพยากรกัน ทำให้ช่วงเวลาส่วนใหญ่ CPU ว่างงาน สูญเปล่าถึง 85%',
    category: 'Virtualization',
    pdfPage: 3,
    examTip: 'Traditional server utilization = 8% to 15%',
  },
  {
    id: 'w4-f2',
    weekId: 'week4',
    front: 'Type 1 vs Type 2 Hypervisor: Where does each sit in the architecture?',
    back: '• Type 1 (Bare-Metal): Sits directly on bare physical hardware with NO host OS underneath (Enterprise Data Centers).\n• Type 2 (Hosted): Sits on top of an existing Host Operating System as an application (Laptops / Testing).',
    thaiExplanation: 'Type 1 ติดตั้งตรงบนฮาร์ดแวร์จริง (Data Center) | Type 2 ติดตั้งบน Host OS (เครื่องส่วนตัว)',
    category: 'Hypervisors',
    pdfPage: 17,
    examTip: 'VMware ESXi = Type 1 | Oracle VirtualBox = Type 2',
  },
  {
    id: 'w4-f3',
    weekId: 'week4',
    front: 'What is the purpose of a VM Snapshot?',
    back: 'A snapshot captures the exact state, memory, and virtual disk pointers of a VM at a specific point in time, allowing instantaneous Rollback if an OS patch or configuration breaks the system.',
    thaiExplanation: 'การบันทึกสถานะเครื่องเสมือนไว้ เพื่อย้อนกลับ (Rollback) หากการอัปเดตระบบมีปัญหา',
    category: 'VM Management',
    pdfPage: 20,
  },
  {
    id: 'w4-f4',
    weekId: 'week4',
    front: 'What is Live VM Migration?',
    back: 'Moving an actively running virtual machine from one physical server host to another across the network without powering off the VM and with zero user downtime.',
    thaiExplanation: 'การย้ายเครื่องเสมือนข้ามเซิร์ฟเวอร์กายภาพได้ขณะที่ระบบยังเปิดใช้งานอยู่ โดยไม่มี Downtime',
    category: 'VM Management',
    pdfPage: 21,
  },
  {
    id: 'w4-f5',
    weekId: 'week4',
    front: 'Why is Virtualization NOT identical to Cloud Computing?',
    back: 'Virtualization is the foundational technology that creates virtual resources. Cloud computing is the automated service delivery model combining virtualization with self-service provisioning, rapid elasticity, and metered billing.',
    thaiExplanation: 'การจำลองเสมือนเป็นเทคโนโลยีพื้นฐาน แต่คลาวด์คือรูปแบบการส่งมอบบริการที่มีระบบอัตโนมัติและคิดเงินตามการใช้งานจริง',
    category: 'Cloud Concepts',
    pdfPage: 24,
    examTip: 'Virtualization enables cloud, but is not cloud by itself!',
  },
  {
    id: 'w4-f6',
    weekId: 'week4',
    front: 'What are the 5 Essential Cloud Characteristics (NIST)?',
    back: '1. On-demand self-service\n2. Broad network access\n3. Resource pooling\n4. Rapid elasticity\n5. Measured service',
    thaiExplanation: '1. บริการตนเอง 2. เข้าถึงผ่านเน็ตเวิร์ก 3. พูลทรัพยากรร่วม 4. ยืดหยุ่นรวดเร็ว 5. คิดเงินตามใช้จริง',
    category: 'Cloud Concepts',
    pdfPage: 27,
    examTip: 'Memorize all 5 NIST characteristics for the exam!',
  },
  {
    id: 'w4-f7',
    weekId: 'week4',
    front: 'Scalability vs Elasticity: What is the crucial distinction?',
    back: '• Scalability is the ability to grow capacity to handle larger workloads.\n• Elasticity is the automated dynamic scaling UP during spikes AND shrinking DOWN during quiet periods to optimize cost.',
    thaiExplanation: 'Scalability คือขยายขนาดได้, Elasticity คือการปรับขนาดอัตโนมัติทั้งขึ้นและลงตามโหลดจริง',
    category: 'Cloud Concepts',
    pdfPage: 28,
  },
  {
    id: 'w4-f8',
    weekId: 'week4',
    front: 'Under the Shared Responsibility Model in IaaS, who is responsible for patching the Guest OS?',
    back: 'The Customer is strictly responsible for patching and securing the Guest OS. The cloud provider only secures physical facilities, hardware, and hypervisor (Security OF the Cloud).',
    thaiExplanation: 'ลูกค้า (Customer) เป็นผู้รับผิดชอบการอัปเดตและรักษาความปลอดภัย Guest OS บน IaaS',
    category: 'Cloud Security',
    pdfPage: 41,
    examTip: 'Security OF the Cloud = Provider | Security IN the Cloud = Customer',
  },
  {
    id: 'w4-f9',
    weekId: 'week4',
    front: 'Virtual Machines vs Containers: How do their kernels differ?',
    back: '• VMs each run a full, isolated Guest Operating System Kernel.\n• Containers share the underlying Host OS Kernel, packaging only application code and runtime dependencies.',
    thaiExplanation: 'VM มีเคอร์เนลของตัวเองแยกทุกตัว (หนักเป็น GB), ส่วน Container แชร์เคอร์เนลร่วมกับโฮสต์ (เบาเป็น MB)',
    category: 'Modern Cloud',
    pdfPage: 42,
  }
];

export const week4Quizzes: QuizQuestion[] = [
  {
    id: 'w4-q1',
    weekId: 'week4',
    topic: 'Traditional Servers vs Virtualization',
    question: 'An enterprise is running four bare-metal physical servers hosting different internal services. Monitoring logs reveal that each server operates at an average CPU utilization of only 8% to 18%. Which technological strategy directly solves this inefficiency by consolidating workloads?',
    thaiContext: 'โจทย์ Quiz ข้อ 1 Week 4: การแก้ปัญหาเซิร์ฟเวอร์กายภาพที่ใช้งาน CPU ต่ำเพียง 8-18%',
    pdfPage: 3,
    difficulty: 'easy',
    options: [
      {
        text: 'Implementing an OS-level container runtime across all individual physical servers without changing host assignments.',
        isCorrect: false,
        explanation: 'Incorrect. Running containers across scattered physical boxes does not consolidate the redundant hardware.'
      },
      {
        text: 'Introducing a virtualization abstraction layer (hypervisor) to host multiple isolated virtual machines on consolidated physical hardware.',
        isCorrect: true,
        explanation: 'Correct! Introducing a virtualization layer allows consolidating multiple independent workloads onto fewer physical servers, pushing CPU utilization from 10% up to 70-80%.'
      },
      {
        text: 'Deploying an external Application Load Balancer to redirect traffic between physical servers.',
        isCorrect: false,
        explanation: 'Incorrect. Load balancing manages network traffic distribution, but does not solve idle hardware sprawl.'
      },
      {
        text: 'Migrating application code directly to an On-Premises bare-metal batch processing cluster.',
        isCorrect: false,
        explanation: 'Incorrect. Batch processing clusters still incur the same hardware overhead.'
      }
    ]
  },
  {
    id: 'w4-q2',
    weekId: 'week4',
    topic: 'Hypervisor Architectures',
    question: 'A cloud infrastructure provider is building a Tier-4 hyperscale data center to offer multi-tenant virtual computing services. Which hypervisor architecture must they deploy and why?',
    thaiContext: 'โจทย์ Quiz ข้อ 2 Week 4: การเลือกสถาปัตยกรรมไฮเปอร์ไวเซอร์สำหรับดาต้าเซ็นเตอร์ระดับองค์กร',
    pdfPage: 17,
    difficulty: 'medium',
    options: [
      {
        text: 'Type 2 Hypervisor, because it runs inside a host desktop operating system providing convenient GUI menus.',
        isCorrect: false,
        explanation: 'Incorrect. Type 2 hosted hypervisors add unnecessary OS overhead and are unsuitable for high-throughput enterprise data centers.'
      },
      {
        text: 'Type 1 (Bare-Metal) Hypervisor, because it executes directly on physical hardware without a host OS intermediary, ensuring maximum I/O performance and stability.',
        isCorrect: true,
        explanation: 'Correct! Type 1 bare-metal hypervisors (e.g. VMware ESXi, KVM) run directly on silicon, eliminating host OS overhead and latency for enterprise production workloads.'
      },
      {
        text: 'Type 2 Hypervisor, because it eliminates the need for physical CPU instruction cycles.',
        isCorrect: false,
        explanation: 'Incorrect. All software requires CPU instruction cycles.'
      },
      {
        text: 'An analog emulator without software abstraction.',
        isCorrect: false,
        explanation: 'Incorrect. Emulators are extremely slow and impractical for cloud infrastructure.'
      }
    ]
  },
  {
    id: 'w4-q3',
    weekId: 'week4',
    topic: 'VM Management: Snapshots',
    question: 'A database administrator plans to apply an experimental security patch to a production PostgreSQL database server running inside a virtual machine. Which VM management feature should the administrator execute immediately before patching to ensure instantaneous recovery if the patch corrupts system tables?',
    thaiContext: 'โจทย์ Quiz ข้อ 3 Week 4: ฟีเจอร์ใดที่ต้องทำก่อนลง Patch อันตรายเพื่อถอยกลับได้ทันที?',
    pdfPage: 20,
    difficulty: 'easy',
    options: [
      {
        text: 'VM Live Migration to a different data center.',
        isCorrect: false,
        explanation: 'Incorrect. Migration moves the VM, but does not protect against software corruption inside the guest OS.'
      },
      {
        text: 'Creating a Point-in-Time Snapshot of the VM state and virtual disks.',
        isCorrect: true,
        explanation: 'Correct! Capturing a Snapshot preserves the exact memory and disk state at that instant, allowing an immediate rollback if the patch corrupts the database.'
      },
      {
        text: 'Upgrading the physical network card to 10Gbps Ethernet.',
        isCorrect: false,
        explanation: 'Incorrect. Network upgrades do not provide system rollback capabilities.'
      },
      {
        text: 'Enabling CPU hyper-threading in the host BIOS.',
        isCorrect: false,
        explanation: 'Incorrect. BIOS settings do not capture application state.'
      }
    ]
  },
  {
    id: 'w4-q4',
    weekId: 'week4',
    topic: 'Cloud Characteristics: Elasticity',
    question: 'An e-commerce retailer experiences an unexpected 500% surge in web traffic during a viral 2-hour influencer livestream. The cloud platform automatically provisions 40 new server instances to absorb the traffic and shuts them down when traffic subsides. Which essential cloud characteristic is demonstrated?',
    thaiContext: 'โจทย์ Quiz ข้อ 4 Week 4: ระบบขยาย 40 เครื่องอัตโนมัติแล้วยุบลงหลังจบไลฟ์ แสดงถึงคุณลักษณะใด?',
    pdfPage: 27,
    difficulty: 'medium',
    options: [
      {
        text: 'Broad Network Access',
        isCorrect: false,
        explanation: 'Incorrect. Broad network access means being accessible across multiple device types.'
      },
      {
        text: 'Rapid Elasticity',
        isCorrect: true,
        explanation: 'Correct! Rapid Elasticity is the ability to automatically scale resources outward during unexpected traffic spikes and scale inward when demand normalizes.'
      },
      {
        text: 'Physical Co-location',
        isCorrect: false,
        explanation: 'Incorrect. Co-location is an on-premises data center term, not a cloud characteristic.'
      },
      {
        text: 'Unchecked Resource Consumption',
        isCorrect: false,
        explanation: 'Incorrect. Cloud services are measured and monitored, not unchecked.'
      }
    ]
  },
  {
    id: 'w4-q5',
    weekId: 'week4',
    topic: 'Cloud Service Models Comparison',
    question: 'A software startup wants to build a Python web service. They want their developers to write code and deploy git commits, without having to manage operating system security patches, web server configuration, or runtime installation. Which cloud service model should they adopt?',
    thaiContext: 'โจทย์ Quiz ข้อ 5 Week 4: ผู้พัฒนาต้องการเขียนโค้ดและดีพลอยโดยไม่ต้องจัดการ OS หรือ Runtime',
    pdfPage: 34,
    difficulty: 'medium',
    options: [
      {
        text: 'Infrastructure as a Service (IaaS)',
        isCorrect: false,
        explanation: 'Incorrect. In IaaS, developers must configure and maintain the Operating System and runtimes themselves.'
      },
      {
        text: 'Platform as a Service (PaaS)',
        isCorrect: true,
        explanation: 'Correct! In PaaS (e.g. Heroku, Vercel, AWS Elastic Beanstalk), the cloud provider manages the OS, runtime, and server infrastructure; developers only manage application code and data.'
      },
      {
        text: 'On-Premises Private Data Center',
        isCorrect: false,
        explanation: 'Incorrect. On-premises requires managing physical hardware, hypervisors, and all software layers.'
      },
      {
        text: 'Bare-Metal Colocation',
        isCorrect: false,
        explanation: 'Incorrect. Colocation provides zero software abstraction.'
      }
    ]
  },
  {
    id: 'w4-q6',
    weekId: 'week4',
    topic: 'Shared Responsibility Model',
    question: 'A company hosts an e-commerce website on AWS EC2 (an IaaS service). A cybercriminal breaches the database because the company system administrator failed to apply critical Windows security updates for six months. Under the AWS Shared Responsibility Model, who is legally and operationally responsible for this incident?',
    thaiContext: 'โจทย์ Quiz ข้อ 6 Week 4: ฐานข้อมูลถูกเจาะเพราะผู้ดูแลระบบไม่ได้ลง Windows update บน EC2 (IaaS)',
    pdfPage: 41,
    difficulty: 'medium',
    options: [
      {
        text: 'The cloud service provider (AWS), because they own the physical computers and data center.',
        isCorrect: false,
        explanation: 'Incorrect. The cloud provider only manages Security OF the Cloud (hardware and facilities).'
      },
      {
        text: 'The customer, because in IaaS the customer is strictly responsible for Security IN the Cloud, including Guest OS patches and firewall configuration.',
        isCorrect: true,
        explanation: 'Correct! In the Shared Responsibility Model for IaaS, the customer retains total ownership of the Guest Operating System, application patches, and credentials (Security IN the Cloud).'
      },
      {
        text: 'The physical motherboard manufacturer.',
        isCorrect: false,
        explanation: 'Incorrect. Hardware vendors are not responsible for unpatched software.'
      },
      {
        text: 'The Internet Service Provider (ISP).',
        isCorrect: false,
        explanation: 'Incorrect. ISPs only provide transit bandwidth.'
      }
    ]
  },
  {
    id: 'w4-q7',
    weekId: 'week4',
    topic: 'Virtual Machines vs Containers',
    question: 'What is the primary architectural difference between a Docker Container and a Virtual Machine running on VMware ESXi?',
    thaiContext: 'โจทย์ Quiz ข้อ 7 Week 4: ความแตกต่างเชิงสถาปัตยกรรมหลักระหว่าง Docker Container และ VM',
    pdfPage: 42,
    difficulty: 'medium',
    options: [
      {
        text: 'Virtual Machines share the host operating system kernel, whereas Containers require a full dedicated guest OS.',
        isCorrect: false,
        explanation: 'Incorrect. This reverses the definition.'
      },
      {
        text: 'Containers virtualize at the OS level and share the host operating system kernel, whereas Virtual Machines virtualize hardware and each require a complete, independent Guest OS.',
        isCorrect: true,
        explanation: 'Correct! Containers package application code and dependencies on top of a shared host kernel, making them lightweight (MBs) and fast (seconds), whereas VMs virtualize complete hardware with isolated Guest OSs (GBs).'
      },
      {
        text: 'Containers can only store text documents, while VMs can store images.',
        isCorrect: false,
        explanation: 'Incorrect. Both technologies can handle any digital data type.'
      },
      {
        text: 'Containers require Type 1 hypervisors, while VMs do not.',
        isCorrect: false,
        explanation: 'Incorrect. Containers do not use hypervisors; they run via container runtime engines (Docker/containerd).'
      }
    ]
  },
  {
    id: 'w4-q8',
    weekId: 'week4',
    topic: 'Scenario Classification',
    question: 'A university professor uses a personal Windows 11 laptop to run Ubuntu Linux inside Oracle VirtualBox for a programming class. How should this computing setup be classified?',
    thaiContext: 'โจทย์ Quiz ข้อ 8 Week 4: การรัน Ubuntu บนโน้ตบุ๊ก Windows ผ่าน VirtualBox จัดเป็นประเภทใด?',
    pdfPage: 47,
    difficulty: 'easy',
    options: [
      {
        text: 'Software as a Service (SaaS)',
        isCorrect: false,
        explanation: 'Incorrect. VirtualBox is a local virtualization application, not a multi-tenant cloud software service.'
      },
      {
        text: 'Local Virtual Machine (Type 2 Hosted Virtualization)',
        isCorrect: true,
        explanation: 'Correct! Running an OS inside VirtualBox on a personal laptop is a classic Type 2 hosted Virtual Machine environment.'
      },
      {
        text: 'Public Cloud IaaS',
        isCorrect: false,
        explanation: 'Incorrect. This setup executes locally on personal laptop hardware, not in a public cloud data center.'
      },
      {
        text: 'Serverless Function as a Service (FaaS)',
        isCorrect: false,
        explanation: 'Incorrect. FaaS runs stateless code snippets in the cloud without server management.'
      }
    ]
  }
];
