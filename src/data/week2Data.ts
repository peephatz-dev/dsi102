import { StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';

export const week2KeyConcepts: KeyConcept[] = [
  {
    id: 'w2-c1',
    term: 'Computer Platform',
    thaiTerm: 'แพลตฟอร์มคอมพิวเตอร์',
    definition: 'The integrated environment composed of Hardware Architecture + Software Environment that enables applications to execute and deliver services.',
    thaiDefinition: 'สภาพแวดล้อมโดยรวมที่รวมเอาสถาปัตยกรรมฮาร์ดแวร์ + สภาพแวดล้อมซอฟต์แวร์เข้าด้วยกัน เพื่อให้แอปพลิเคชันทำงานและส่งมอบบริการดิจิทัลได้',
    example: 'Windows on x86-64, iOS on Apple ARM Silicon, Android on Qualcomm Snapdragon',
    pdfPage: 6,
    category: 'Architecture',
    important: true,
  },
  {
    id: 'w2-c2',
    term: 'Physical Device vs. Computing Platform',
    thaiTerm: 'อุปกรณ์ทางกายภาพ vs แพลตฟอร์มคอมพิวเตอร์',
    definition: 'A device is the physical machinery. A platform is the combination of that machine plus the OS and runtimes. Device != Platform.',
    thaiDefinition: 'ตัวเครื่องทางกายภาพ (Device) ไม่เท่ากับแพลตฟอร์ม (Platform) เพราะฮาร์ดแวร์เดียวกันสามารถรันเป็นคนละแพลตฟอร์มได้เมื่อลง OS คนละตัว เช่น PC เครื่องเดียวกัน ลง Windows หรือลง Ubuntu Linux',
    example: 'Identical Dell server hardware running as Windows Hyper-V host vs Ubuntu KVM server',
    pdfPage: 10,
    category: 'Architecture',
    important: true,
  },
  {
    id: 'w2-c3',
    term: 'Platform Stack & Abstraction',
    thaiTerm: 'สแต็กของแพลตฟอร์มและการซ่อนความซับซ้อน (Abstraction)',
    definition: 'A 5-layer hierarchy: User -> Application -> Operating System -> Drivers -> Hardware. Requests flow downward; execution results return upward.',
    thaiDefinition: 'สแต็ก 5 ชั้น: ผู้ใช้ -> แอปพลิเคชัน -> ระบบปฏิบัติการ -> ไดรเวอร์ -> ฮาร์ดแวร์ คำร้องขอ (Request) ไหลลงล่าง ผลลัพธ์ (Result) ไหลย้อนขึ้นบน โดยมีการซ่อนความซับซ้อนของระดับล่างไว้',
    example: 'Browser user clicks submit -> App makes HTTP call -> OS allocates socket buffer -> Network driver formats packets -> NIC sends electrical signals',
    pdfPage: 8,
    category: 'Stack Layers',
    important: true,
  },
  {
    id: 'w2-c4',
    term: 'Von Neumann Architecture',
    thaiTerm: 'สถาปัตยกรรมฟอนนอยมันน์',
    definition: 'Theoretical foundation of modern general-purpose computers: CPU (Control Unit + ALU + Registers) and Memory connected via shared System Buses.',
    thaiDefinition: 'สถาปัตยกรรมพื้นฐานของคอมพิวเตอร์สมัยใหม่ ประกอบด้วยหน่วยประมวลผลกลาง (CPU) หน่วยความจำหลัก (Memory) และอุปกรณ์รับ-แสดงผล (I/O) เชื่อมโยงผ่านบัสระบบ',
    example: 'Fetch-Decode-Execute-Store cycle executing instructions sequentially from memory',
    pdfPage: 15,
    category: 'Hardware Organization',
    important: true,
  },
  {
    id: 'w2-c5',
    term: 'System Bus (Address, Data, Control)',
    thaiTerm: 'บัสระบบ (Address, Data, Control)',
    definition: 'Shared physical communication pathways: 1) Address Bus (unidirectional, specifies memory location), 2) Data Bus (bidirectional, carries content), 3) Control Bus (coordinates timing and Read/Write signals).',
    thaiDefinition: 'เส้นทางสัญญาณ 3 สาย: บัสตำแหน่ง (Address - ทิศทางเดียว บอกตำแหน่งแรม), บัสข้อมูล (Data - สองทิศทาง ขนส่งข้อมูลจริง), บัสควบคุม (Control - ควบคุมจังหวะและคำสั่งอ่าน/เขียน)',
    example: 'CPU puts RAM address 0x7FFF on Address Bus, asserts READ signal on Control Bus, receives 64-bit value via Data Bus',
    pdfPage: 39,
    category: 'Hardware Organization',
    important: true,
  },
  {
    id: 'w2-c6',
    term: 'CPU vs. GPU vs. NPU/TPU',
    thaiTerm: 'หน่วยประมวลผล CPU vs GPU vs NPU/TPU',
    definition: 'CPU: Few complex cores optimized for low-latency serial execution. GPU: Thousands of smaller cores optimized for massive parallel SIMD throughput. NPU/TPU: Domain-specific matrix multiplication engines for neural network tensors.',
    thaiDefinition: 'CPU เน้นความเร็วในงานลำดับเดี่ยวที่ซับซ้อน, GPU มีคอร์ขนาดเล็กหลายพันคอร์เน้นคำนวณกราฟิกและเมทริกซ์ขนานกันพร้อมกัน, NPU/TPU ออกแบบพิเศษเฉพาะงานคูณเทนเซอร์ของ AI',
    example: 'CPU manages OS logic; GPU renders 3D frame vertices; NPU runs real-time voice noise cancellation',
    pdfPage: 23,
    category: 'Processing Units',
    important: true,
  },
  {
    id: 'w2-c7',
    term: 'Memory Hierarchy & Volatility',
    thaiTerm: 'ลำดับชั้นหน่วยความจำและความคงทนของข้อมูล',
    definition: 'Trade-off pyramid: Registers (fastest, tiny, volatile) -> Cache L1/L2/L3 (SRAM, volatile) -> Main RAM (DRAM, volatile) -> Storage (SSD/NVMe, non-volatile) -> Secondary/Cold Backup (HDD/Tape, non-volatile).',
    thaiDefinition: 'ปิรามิดลำดับชั้น: ยิ่งใกล้ CPU ยิ่งเร็ว ความจุยิ่งน้อย และราคาต่อไบต์ยิ่งแพง แรมเป็น Volatile (ไฟดับข้อมูลหาย) ส่วนดิสก์เก็บข้อมูลเป็น Non-Volatile (ไฟดับข้อมูลยังอยู่)',
    example: 'CPU registers take ~1 CPU cycle; RAM takes ~100-200 cycles; NVMe SSD takes ~100,000 cycles',
    pdfPage: 27,
    category: 'Memory & Storage',
    important: true,
  },
  {
    id: 'w2-c8',
    term: 'SRAM vs. DRAM',
    thaiTerm: 'SRAM เทียบกับ DRAM',
    definition: 'SRAM (Static RAM): Uses 6-transistor flip-flops, extremely fast, no refresh required, used for CPU Cache. DRAM (Dynamic RAM): Uses 1 transistor + 1 capacitor, dense and cheaper, requires continuous electrical refresh, used for Main System RAM.',
    thaiDefinition: 'SRAM เร็วมาก ไม่ต้องรีเฟรช ใช้ทำแคชใน CPU (L1/L2/L3) ราคาแพง; DRAM เก็บประจุในตัวเก็บประจุ ต้องคอยรีเฟรชตลอดเวลา จุได้เยอะ ราคาถูกกว่า ใช้ทำแรมหลักของระบบ',
    example: 'L1/L2/L3 Cache = SRAM; 16GB DDR5 System Stick = DRAM',
    pdfPage: 30,
    category: 'Memory & Storage',
    important: true,
  }
];

export const week2Modules: StudyModule[] = [
  {
    id: 'w2-m1',
    weekId: 'week2',
    moduleNumber: 1,
    title: 'Definition, Stack Architecture & Evolution of Computer Platforms',
    thaiTitle: 'นิยาม โครงสร้างสแต็ก และวิวัฒนาการของแพลตฟอร์มคอมพิวเตอร์',
    pdfPageStart: 1,
    pdfPageEnd: 11,
    overview: 'Understanding what constitutes a computing platform, the 5-layer hierarchical stack, and the historical progression from mainframes to distributed cloud ecosystems.',
    subsections: [
      {
        id: 'w2-m1-s1',
        title: 'Platform = Hardware Architecture + Software Environment',
        thaiTitle: 'แพลตฟอร์ม = สถาปัตยกรรมฮาร์ดแวร์ + สภาพแวดล้อมซอฟต์แวร์',
        pdfPage: 6,
        content: `A **Computer Platform** is not merely a piece of metal or plastic. It is the integrated execution environment formed by the union of **Hardware Architecture** (instruction set, processor, buses) and **Software Environment** (Operating System, kernel drivers, runtimes, standard libraries).\n\n$$\\mathbf{Platform = Hardware + Software\\ Environment}$$\n\n**Device $\\neq$ Platform**: A single physical machine (e.g. standard x86-64 desktop) can become two entirely distinct platforms depending on whether it runs Microsoft Windows 11 or Red Hat Enterprise Linux.`,
        bulletPoints: [
          'Hardware provides the raw computational muscle (CPU, RAM, storage, buses).',
          'Software environment provides the system abstractions and API contracts.',
          'Applications compile and execute against the platform, not bare transistors.'
        ],
        thaiCommentary: 'จุดที่ข้อสอบมักหลอก: อุปกรณ์เครื่องเดียวกันสามารถเป็นคนละแพลตฟอร์มได้ หากเปลี่ยนระบบปฏิบัติการหรือสภาพแวดล้อมซอฟต์แวร์',
        formula: '\\text{Platform} = \\text{Hardware Architecture} + \\text{Software Environment}',
        memoryTip: 'Platform = HW + SW Environment',
        infographicId: 'infographic-w2-stack'
      },
      {
        id: 'w2-m1-s2',
        title: 'The 5-Layer Platform Stack & Abstraction Flow',
        thaiTitle: 'สแต็ก 5 ชั้น: คำร้องขอลงล่าง ผลลัพธ์ย้อนขึ้นบน',
        pdfPage: 8,
        content: `System coordination adheres to a strict hierarchical stack:
1. **User**: Initiates action via mouse click, touch gesture, or keystroke.
2. **Applications**: Translates user intent into software requests (e.g. web browser sending an HTTP GET).
3. **Operating System (OS)**: Central resource manager arbitrating CPU time slices, memory blocks, and security permissions.
4. **Drivers / System Software**: Bridges generic OS system calls into hardware-specific register commands.
5. **Physical Hardware**: Transistors, registers, ALU, system bus, and peripheral controllers executing electrical operations.\n\n**Data Flow Direction**:
* **Requests propagate DOWNWARD** from user to hardware.
* **Execution results propagate UPWARD** from hardware back to user display.`,
        bulletPoints: [
          'Downwards = Requests (User -> Apps -> OS -> Drivers -> Hardware)',
          'Upwards = Execution Results (Hardware -> Drivers -> OS -> Apps -> Screen)',
          'Abstraction decouples upper software layers from lower-level electrical complexities.'
        ],
        thaiCommentary: 'ท่องจำให้ขึ้นใจสำหรับการสอบ: Requests flow DOWNWARD, Results return UPWARD',
        memoryTip: 'Requests ↓ Downwards | Results ↑ Upwards',
        infographicId: 'infographic-w2-stack'
      },
      {
        id: 'w2-m1-s3',
        title: 'Evolution of Computer Platforms',
        thaiTitle: 'วิวัฒนาการ 5 ยุคของแพลตฟอร์มคอมพิวเตอร์',
        pdfPage: 11,
        content: `Computing platforms evolved through five distinct historical paradigms:
1. **Mainframe Era (1960s-1970s)**: Centralized monolithic mainframes (IBM System/360) accessed via dumb terminals. Zero local compute.
2. **Personal Computer (PC) Era (1980s-1990s)**: Decentralized local processing on desktops (IBM PC, Apple Macintosh). Computation moved to individual desks.
3. **Client-Server Era (1990s-2000s)**: Distributed architecture partitioning workloads between lightweight client frontends and centralized backend database servers.
4. **Cloud & Mobile Era (2010s)**: Smartphones connected to hyperscale multi-tenant cloud data centers (AWS, Azure, GCP).
5. **Edge & Specialized AI Era (Present-Future)**: Ultra-low latency localized computing on IoT edge nodes combined with specialized tensor acceleration chips.`,
        bulletPoints: [
          'Mainframe (Centralized) -> PC (Decentralized) -> Client-Server (Hybrid) -> Cloud/Mobile (Elastic) -> Edge/AI (Distributed Specialized).'
        ],
        thaiCommentary: 'วิวัฒนาการเคลื่อนจากรวมศูนย์ (Mainframe) สู่กระจายตัว (PC) แล้วกลับมารวมศูนย์บนคลาวด์ (Cloud) และปัจจุบันกระจายสู่ขอบเครือข่ายพร้อมชิป AI (Edge/AI)',
        memoryTip: 'Mainframe → PC → Client-Server → Cloud/Mobile → Edge/AI'
      }
    ]
  },
  {
    id: 'w2-m2',
    weekId: 'week2',
    moduleNumber: 2,
    title: 'Hardware Architecture & System Organization',
    thaiTitle: 'สถาปัตยกรรมฮาร์ดแวร์และการจัดระเบียบระบบคอมพิวเตอร์',
    pdfPageStart: 12,
    pdfPageEnd: 16,
    overview: 'The internal anatomy of computer hardware: Motherboard, Northbridge/Southbridge bus architecture, and the Von Neumann model.',
    subsections: [
      {
        id: 'w2-m2-s1',
        title: 'Von Neumann Architecture & The Motherboard',
        thaiTitle: 'สถาปัตยกรรมฟอนนอยมันน์และแผงวงจรหลัก (Motherboard)',
        pdfPage: 14,
        content: `Every standard modern computer is built on the **Von Neumann Architecture**:
* **Central Processing Unit (CPU)**: Executes instructions via Control Unit (orchestrator), Arithmetic Logic Unit (ALU - math and logic operations), and high-speed Registers.
* **Primary Memory (RAM)**: Holds program instructions and active working data simultaneously (Stored-Program Concept).
* **I/O System**: Translates between internal digital buses and external human/network peripherals.
* **Motherboard (แผงวงจรหลัก)**: The primary printed circuit board (PCB) providing the physical traces, sockets, power delivery, and system buses that interconnect the CPU, RAM, GPU, and storage drives.`,
        bulletPoints: [
          'Stored-Program Concept: Data and Program Instructions share the same physical memory space in Von Neumann systems.',
          'Motherboard interconnects components through high-speed PCIe lanes and memory buses.'
        ],
        thaiCommentary: 'หลักการของ Von Neumann คือ ทั้งโค้ดคำสั่งและข้อมูลจะถูกโหลดเก็บไว้ในหน่วยความจำเดียวกัน (Stored-Program Concept)',
        formula: '\\text{System} = \\text{CPU} + \\text{Memory (RAM)} + \\text{I/O} + \\text{System Bus}',
        memoryTip: 'CPU + Memory + I/O = Von Neumann',
        infographicId: 'infographic-w2-von-neumann'
      }
    ]
  },
  {
    id: 'w2-m3',
    weekId: 'week2',
    moduleNumber: 3,
    title: 'Processing Units: CPU, GPU & Specialized AI Accelerators',
    thaiTitle: 'หน่วยประมวลผล: CPU, GPU และชิปเร่งความเร็ว AI เฉพาะทาง',
    pdfPageStart: 17,
    pdfPageEnd: 24,
    overview: 'Comparing computational engines: serial low-latency CPUs, massively parallel SIMD GPUs, and specialized tensor accelerators (NPU/TPU).',
    subsections: [
      {
        id: 'w2-m3-s1',
        title: 'The CPU & The Instruction Machine Cycle',
        thaiTitle: 'วงรอบการประมวลผลคำสั่งของซีพียู (Fetch-Decode-Execute-Store)',
        pdfPage: 18,
        content: `The CPU is the central brain of the platform. It executes instructions through the continuous **Instruction Cycle**:
1. **FETCH**: Retrieves the next instruction from RAM using the memory address in the Program Counter (PC) register.
2. **DECODE**: The Control Unit interprets the operational opcode and identifies required operands.
3. **EXECUTE**: The Arithmetic Logic Unit (ALU) performs the mathematical calculation, logical comparison, or register transfer.
4. **STORE (Write-Back)**: Writes the resulting computation back into a register or main memory location.`,
        bulletPoints: [
          'Cycle sequence: FETCH -> DECODE -> EXECUTE -> STORE.',
          'Clock Speed (GHz): Measures how many billions of clock cycles the CPU can cycle per second.',
          'Multicore Architecture: Multiple independent physical CPU cores placed on a single silicon die to run parallel threads.'
        ],
        thaiCommentary: 'ลำดับขั้นตอน 4 จังหวะของ CPU: ดึงคำสั่ง (Fetch) -> แปลคำสั่ง (Decode) -> คำนวณ/ประมวลผล (Execute) -> บันทึกผลลัพธ์ (Store)',
        formula: '\\text{Fetch} \\longrightarrow \\text{Decode} \\longrightarrow \\text{Execute} \\longrightarrow \\text{Store}',
        memoryTip: 'F-D-E-S (Fetch, Decode, Execute, Store)',
        infographicId: 'infographic-w2-cpu-gpu'
      },
      {
        id: 'w2-m3-s2',
        title: 'Architectural Comparison: CPU vs. GPU vs. AI Accelerators',
        thaiTitle: 'การเปรียบเทียบสถาปัตยกรรม: CPU vs GPU vs NPU/TPU',
        pdfPage: 23,
        content: `Modern computers utilize heterogeneous processing architectures:
* **CPU (Central Processing Unit)**: Optimized for **low latency** and complex sequential branching logic. Features large caches and powerful branch predictors over a small number of ultra-fast cores (e.g., 8 to 32 cores).
* **GPU (Graphics Processing Unit)**: Optimized for **high throughput** and massive parallelism via SIMD (Single Instruction, Multiple Data). Contains thousands of lightweight cores executing identical calculations across arrays of pixels or floating-point vectors.
* **AI Accelerators (NPU / TPU / Apple Neural Engine)**: Domain-Specific Architectures (DSA) purpose-built for low-precision tensor operations (INT8/FP16 matrix multiplications and convolutions) with extreme power efficiency.`,
        bulletPoints: [
          'CPU = Low Latency, Complex Serial Code, OS orchestration.',
          'GPU = High Throughput, Massive Parallel Matrix Math, 3D Rendering.',
          'NPU/TPU = Maximum Energy Efficiency for Neural Network Inferences.'
        ],
        thaiCommentary: 'CPU คือคนฉลาดทำงานทีละอย่างรวดเร็ว, GPU คือกองทัพคนนับพันช่วยกันคำนวณงานง่ายๆ พร้อมกัน, NPU/TPU คือเครื่องคิดเลขเฉพาะทางสำหรับสูตรคูณเมทริกซ์ AI',
        memoryTip: 'CPU = Low Latency Serial | GPU = Massive Parallel Throughput | NPU/TPU = Matrix AI',
        infographicId: 'infographic-w2-cpu-gpu'
      }
    ]
  },
  {
    id: 'w2-m4',
    weekId: 'week2',
    moduleNumber: 4,
    title: 'Memory & Storage Hierarchy',
    thaiTitle: 'ลำดับชั้นหน่วยความจำและการจัดเก็บข้อมูล',
    pdfPageStart: 25,
    pdfPageEnd: 34,
    overview: 'The physical trade-offs governing computer memory: speed, capacity, cost per byte, and data persistence (volatility).',
    subsections: [
      {
        id: 'w2-m4-s1',
        title: 'The Memory Hierarchy Pyramid',
        thaiTitle: 'ปิรามิดลำดับชั้นหน่วยความจำ: เร็ว-แพง-เล็ก สู่ ช้า-ถูก-ใหญ่',
        pdfPage: 27,
        content: `Computer architecture resolves the fundamental speed gap between CPU transistors and persistent disks through a multi-tiered hierarchy:
1. **Registers**: Embedded inside CPU core; ~0.5 nanosecond access; ultra-fast, tiny capacity (few hundred bytes).
2. **L1, L2, L3 Cache (SRAM)**: Static RAM fabricated on the processor die; ~1-10 nanoseconds; holds frequently used code/data blocks.
3. **Main Memory (DRAM / RAM)**: Dynamic RAM connected via memory bus; ~50-100 nanoseconds; holds active OS kernel and running application processes.
4. **Solid-State Storage (NVMe / SSD)**: Flash NAND memory; ~10-100 microseconds; persistent non-volatile local storage.
5. **Magnetic Hard Disk (HDD) / Cold Cloud Storage**: Mechanical spindles or deep archive tape; milliseconds access; highest capacity, cheapest cost per gigabyte.`,
        bulletPoints: [
          'Ascending the pyramid: Faster speed, higher cost per bit, lower capacity, closer to CPU core.',
          'Descending the pyramid: Slower speed, lower cost per bit, massive capacity, persistent (non-volatile).'
        ],
        thaiCommentary: 'ยิ่งขึ้นสูง ยิ่งใกล้ CPU ยิ่งเร็วมาก จุได้น้อย และแพงมาก; ยิ่งลงล่าง ยิ่งช้า ความจุเยอะ ราคาถูก และไฟดับข้อมูลไม่หาย (Non-Volatile)',
        formula: '\\text{Speed: Registers} > \\text{L1/L2/L3 Cache} > \\text{DRAM (RAM)} > \\text{NVMe SSD} > \\text{HDD/Tape}',
        memoryTip: 'Top: Fast, Small, Volatile | Bottom: Slow, Huge, Persistent',
        infographicId: 'infographic-w2-memory-pyramid'
      },
      {
        id: 'w2-m4-s2',
        title: 'SRAM vs. DRAM & Volatility',
        thaiTitle: 'เปรียบเทียบ SRAM (Cache) vs DRAM (RAM) และคุณสมบัติ Volatile',
        pdfPage: 30,
        content: `**SRAM (Static RAM)**:
* Circuit: 6 transistors per memory bit.
* Speed: Ultra-fast (nanoseconds).
* Cost & Density: Expensive, physically large footprint.
* Refresh Requirement: Does NOT require electrical refresh cycles as long as power is supplied.
* Application: CPU Cache (L1, L2, L3).

**DRAM (Dynamic RAM)**:
* Circuit: 1 transistor + 1 microscopic capacitor per bit.
* Speed: Moderate (slower than SRAM due to capacitor charging time).
* Cost & Density: Highly dense, inexpensive per gigabyte.
* Refresh Requirement: **Requires continuous electrical refresh cycles** hundreds of times per second because capacitor charges leak away.
* Application: Main System Memory (RAM sticks).

**Volatility**:
* **Volatile Memory**: Loses all stored information immediately upon power loss (Registers, SRAM Cache, DRAM System RAM).
* **Non-Volatile Memory**: Retains data permanently without continuous power (NVMe SSD, NAND Flash, HDD, ROM).`,
        bulletPoints: [
          'SRAM = 6 transistors, no refresh, CPU Cache, expensive.',
          'DRAM = 1 transistor + 1 capacitor, needs periodic refresh, system RAM, cheap.',
          'Volatile = Power off -> Data lost | Non-Volatile = Power off -> Data saved.'
        ],
        thaiCommentary: 'ข้อสอบถามบ่อย: DRAM ต้องคอย "รีเฟรชประจุไฟฟ้า" ตลอดเวลาเพราะเก็บข้อมูลใน Capacitor ส่วน SRAM ไม่ต้องรีเฟรชจึงเร็วกว่ามาก',
        memoryTip: 'SRAM = Static Cache (No refresh) | DRAM = Dynamic RAM (Must refresh)',
      }
    ]
  },
  {
    id: 'w2-m5',
    weekId: 'week2',
    moduleNumber: 5,
    title: 'Input, Output & System Bus Infrastructure',
    thaiTitle: 'ระบบนำเข้า/ส่งออก และโครงสร้างพื้นฐานบัสระบบ',
    pdfPageStart: 35,
    pdfPageEnd: 39,
    overview: 'How internal CPU and memory pathways coordinate through dedicated Address, Data, and Control buses.',
    subsections: [
      {
        id: 'w2-m5-s1',
        title: 'The System Bus: Address, Data, and Control',
        thaiTitle: 'บัสระบบ 3 ชนิด: Address Bus, Data Bus, Control Bus',
        pdfPage: 39,
        content: `A **Bus** is a shared physical group of copper conductors (traces) that transmit digital electrical signals between components:
1. **Address Bus (บัสตำแหน่ง)**: **Unidirectional** (flows only from CPU out to memory/peripherals). It specifies the exact physical memory location in RAM that the CPU wants to read from or write to. Width in bits determines max addressable memory (e.g., 32-bit bus = $2^{32} = 4\\text{ GB}$; 64-bit bus can address 16 Exabytes).
2. **Data Bus (บัสข้อมูล)**: **Bidirectional** (flows both ways). It carries the actual raw data payload (instructions, integers, characters) between CPU, RAM, and storage controllers.
3. **Control Bus (บัสควบคุม)**: Carries operational command timing and synchronization signals, such as Memory Read, Memory Write, I/O Acknowledgement, and hardware Interrupt Requests (IRQ).`,
        bulletPoints: [
          'Address Bus = Unidirectional (CPU -> Memory/IO).',
          'Data Bus = Bidirectional (CPU <-> Memory/IO).',
          'Control Bus = Bidirectional control & timing signals (Read/Write/Interrupts).'
        ],
        thaiCommentary: 'จำให้แม่นในการสอบ: Address Bus วิ่งทางเดียว (Unidirectional) จาก CPU ไปชี้ตำแหน่งแรม ส่วน Data Bus วิ่งไป-กลับได้สองทิศทาง (Bidirectional)',
        formula: '\\text{Max Memory Addressable} = 2^{\\text{Address Bus Width in Bits}}',
        memoryTip: 'Address = One-way street (Out from CPU) | Data = Two-way highway',
        infographicId: 'infographic-w2-von-neumann'
      }
    ]
  },
  {
    id: 'w2-m6',
    weekId: 'week2',
    moduleNumber: 6,
    title: 'Software Stack, Client-Server & Distributed Cloud Platforms',
    thaiTitle: 'สแต็กซอฟต์แวร์ ไคลเอนต์-เซิร์ฟเวอร์ และแพลตฟอร์มคลาวด์แบบกระจาย',
    pdfPageStart: 40,
    pdfPageEnd: 46,
    overview: 'How system software coordinates hardware access, and how modern digital platforms distribute roles across networks.',
    subsections: [
      {
        id: 'w2-m6-s1',
        title: 'Client-Server Architecture & Multi-Tier Systems',
        thaiTitle: 'สถาปัตยกรรม Client-Server และระบบแยกเลเยอร์หลายชั้น',
        pdfPage: 44,
        content: `A computing platform is not restricted to a single physical box. In modern web services, platforms operate across a **Client-Server** model:
* **Client**: User-facing interface device (browser on desktop, smartphone native app) generating user interaction requests.
* **Server**: High-availability remote computing resource listening for requests, executing business logic, and querying backend data stores.
* **Example - E-Commerce Login**:
  1. Browser (Client) gathers username/password and sends HTTPS POST request.
  2. Load Balancer routes traffic to an available Web Application Server.
  3. Web App Server authenticates credentials by querying the Secure Database Server.
  4. Database returns session token; Web App returns signed authorization response to Client display.`,
        bulletPoints: [
          'Server is a role defined by the service provided, not merely a physical computer chassis.',
          'Multi-tier architectures separate presentation (Frontend), logic (Backend), and persistence (Database).'
        ],
        thaiCommentary: 'เซิร์ฟเวอร์คือ "บทบาทหน้าที่" ในการให้บริการคำร้องขอ ไม่ใช่แค่หน้าตาของตัวเครื่องคอมพิวเตอร์',
        memoryTip: 'Client requests → Server processes & responds',
      }
    ]
  },
  {
    id: 'w2-m7',
    weekId: 'week2',
    moduleNumber: 7,
    title: 'Platform Taxonomy & The Architectural Trade-off Matrix',
    thaiTitle: 'การจำแนกประเภทแพลตฟอร์มและเมทริกซ์การชดเชยทางสถาปัตยกรรม (Trade-offs)',
    pdfPageStart: 47,
    pdfPageEnd: 54,
    overview: 'Engineering trade-offs across computing platforms: Latency vs. Bandwidth, Battery vs. Performance, Edge vs. Cloud.',
    subsections: [
      {
        id: 'w2-m7-s1',
        title: 'The Engineering Trade-off Matrix',
        thaiTitle: 'ตารางวิเคราะห์การชดเชยข้อดี-ข้อเสียทางวิศวกรรม (Trade-offs)',
        pdfPage: 48,
        content: `Computer platform design involves zero universal solutions; every architectural decision requires balancing conflicting engineering trade-offs:
* **Latency vs. Throughput**: CPU prioritizes ultra-low latency for immediate single-thread responsiveness; GPU sacrifices single-thread latency to maximize bulk data throughput.
* **Power / Thermal vs. Peak Performance**: Mobile platforms (ARM architecture) throttle clock frequencies and enforce sleep states to conserve battery and run fanless; Server platforms (x86 Xeon / EPYC) draw hundreds of watts to maximize compute capacity.
* **General-Purpose vs. Domain-Specific**: CPUs can run any software program but with moderate efficiency; ASICs / NPUs run only neural network tensor math but do so with 100x better energy efficiency.
* **Edge vs. Cloud**: Cloud provides infinite elastic scalability but incurs network transmission latency; Edge computing processes data on-site within microseconds but has constrained memory and battery.`,
        bulletPoints: [
          'Mobile platforms optimize for Thermal Design Power (TDP) and battery life.',
          'Server platforms optimize for continuous uptime, ECC memory protection, and high throughput.',
          'Edge nodes optimize for deterministic real-time latency.'
        ],
        thaiCommentary: 'ในเชิงวิศวกรรมคอมพิวเตอร์ ไม่มีสถาปัตยกรรมใดดีที่สุดในทุกด้าน ต้องเลือกระหว่าง: ความเร็วเดี่ยว vs ความจุก้อนใหญ่, แบตเตอรี่ vs ความแรง, อเนกประสงค์ vs เฉพาะทาง',
        memoryTip: 'No Free Lunch: Every architecture trades latency, power, cost, or generality',
        infographicId: 'infographic-w2-tradeoffs'
      }
    ]
  }
];

export const week2Flashcards: Flashcard[] = [
  {
    id: 'w2-f1',
    weekId: 'week2',
    front: 'What constitutes a "Computer Platform"?',
    back: 'Platform = Hardware Architecture + Software Environment.\nIt provides the unified execution environment enabling software applications to run and communicate with hardware.',
    thaiExplanation: 'แพลตฟอร์ม คือ ฮาร์ดแวร์ + สภาพแวดล้อมซอฟต์แวร์ (OS/Runtime) รวมกัน',
    category: 'Platform Stack',
    pdfPage: 6,
    examTip: 'Remember: Device != Platform',
  },
  {
    id: 'w2-f2',
    weekId: 'week2',
    front: 'In the Platform Stack, what directions do Requests and Results travel?',
    back: '• Requests propagate DOWNWARD (User -> App -> OS -> Drivers -> Hardware)\n• Results propagate UPWARD (Hardware -> Drivers -> OS -> App -> Screen)',
    thaiExplanation: 'คำร้องขอไหลลงล่าง (Downwards) สู่ฮาร์ดแวร์ ผลลัพธ์ไหลย้อนขึ้นบน (Upwards) สู่หน้าจอ',
    category: 'Platform Stack',
    pdfPage: 8,
    examTip: 'Requests Downward ↓ | Results Upward ↑',
  },
  {
    id: 'w2-f3',
    weekId: 'week2',
    front: 'Explain the 4 stages of the CPU Instruction Machine Cycle',
    back: '1. FETCH: Read instruction from RAM into CPU.\n2. DECODE: Control Unit interprets opcode.\n3. EXECUTE: ALU computes result.\n4. STORE: Write result back to register or RAM.',
    thaiExplanation: 'F-D-E-S: ดึงคำสั่ง (Fetch) -> แปลคำสั่ง (Decode) -> คำนวณ (Execute) -> บันทึกผล (Store)',
    category: 'Processing Units',
    pdfPage: 19,
    examTip: 'F-D-E-S sequence is a classic exam question!',
  },
  {
    id: 'w2-f4',
    weekId: 'week2',
    front: 'CPU vs GPU: What is the fundamental architectural distinction?',
    back: '• CPU: Few powerful cores designed for low-latency serial computing and complex branching.\n• GPU: Thousands of smaller cores designed for massive parallel throughput via SIMD (Single Instruction, Multiple Data).',
    thaiExplanation: 'CPU เน้นความเร็วการคำนวณทีละคำสั่ง (Serial/Low Latency) ส่วน GPU เน้นพลังคำนวณขนานพร้อมกันปริมาณมหาศาล (Parallel/High Throughput)',
    category: 'Processing Units',
    pdfPage: 23,
  },
  {
    id: 'w2-f5',
    weekId: 'week2',
    front: 'SRAM vs DRAM: Compare speed, cost, and refresh mechanism',
    back: '• SRAM (Cache): 6 transistors/bit, ultra-fast, expensive, NO electrical refresh needed.\n• DRAM (System RAM): 1 transistor + 1 capacitor/bit, cheaper, highly dense, REQUIRES periodic electrical refresh.',
    thaiExplanation: 'SRAM เร็วมาก ไม่ต้องรีเฟรช ใช้ทำแคช CPU; DRAM ราคาถูก จุเยอะ ต้องคอยรีเฟรชประจุไฟฟ้าตลอดเวลา ใช้ทำแรมหลัก',
    category: 'Memory & Storage',
    pdfPage: 30,
    examTip: 'DRAM has capacitors that leak charge, hence requires constant refreshing!',
  },
  {
    id: 'w2-f6',
    weekId: 'week2',
    front: 'System Bus: Address Bus vs Data Bus vs Control Bus',
    back: '• Address Bus: Unidirectional (CPU -> Memory), selects memory address.\n• Data Bus: Bidirectional (CPU <-> Memory), carries actual data payload.\n• Control Bus: Carries timing, Read/Write, and Interrupt signals.',
    thaiExplanation: 'Address Bus วิ่งทิศทางเดียว (Unidirectional) จาก CPU สู่แรม; Data Bus วิ่งได้สองทิศทาง (Bidirectional)',
    category: 'System Bus',
    pdfPage: 39,
    examTip: 'Address Bus is UNIDIRECTIONAL!',
  },
  {
    id: 'w2-f7',
    weekId: 'week2',
    front: 'What is the Stored-Program Concept in Von Neumann Architecture?',
    back: 'Program instructions and data are stored together in the same unified primary memory space (RAM), accessed over the same shared system bus.',
    thaiExplanation: 'คำสั่งโปรแกรมและข้อมูลถูกเก็บไว้ในหน่วยความจำ (RAM) เดียวกัน และแชร์เส้นทางบัสร่วมกัน',
    category: 'Von Neumann',
    pdfPage: 15,
  },
  {
    id: 'w2-f8',
    weekId: 'week2',
    front: 'Volatile vs Non-Volatile Memory',
    back: '• Volatile: Requires continuous electrical power to preserve data; power off = data lost (Registers, Cache, RAM).\n• Non-Volatile: Retains data permanently without electrical power (SSD, HDD, Flash ROM).',
    thaiExplanation: 'Volatile ไฟดับข้อมูลหาย (เช่น RAM, Cache) | Non-Volatile ไฟดับข้อมูลยังอยู่ถาวร (เช่น SSD, HDD)',
    category: 'Memory & Storage',
    pdfPage: 31,
  },
  {
    id: 'w2-f9',
    weekId: 'week2',
    front: 'Why can two identical computers represent completely different platforms?',
    back: 'Because Platform = Hardware + Software Environment. Installing Windows vs Linux creates distinct system call APIs, driver interfaces, and runtime environments despite identical hardware.',
    thaiExplanation: 'เพราะฮาร์ดแวร์เหมือนกัน แต่หากติดตั้ง OS หรือ Software Environment ต่างกัน ก็จะกลายเป็นคนละแพลตฟอร์ม',
    category: 'Platform Stack',
    pdfPage: 10,
  }
];

export const week2Quizzes: QuizQuestion[] = [
  {
    id: 'w2-q1',
    weekId: 'week2',
    topic: 'Platform Stack Model',
    question: 'According to the computer platform stack model, how do requests and execution results systematically propagate between users and underlying hardware components?',
    thaiContext: 'โจทย์ Quiz ข้อ 1 จากเนื้อหา Week 2: ทิศทางการไหลของ Request และ Result ใน Platform Stack',
    pdfPage: 8,
    difficulty: 'easy',
    options: [
      {
        text: 'Requests originate at the hardware level and propagate upward, while results flow downward to the user.',
        isCorrect: false,
        explanation: 'Incorrect. This inverts the fundamental flow: user input initiates the request, not physical hardware.'
      },
      {
        text: 'Requests propagate downward from the user/application layer through system software to hardware, while results return upward to the user interface.',
        isCorrect: true,
        explanation: 'Correct! In the platform stack hierarchy, user actions trigger requests flowing downward through Application, OS, and Drivers to Hardware. Computed execution results then travel upward back to the user display.'
      },
      {
        text: 'Requests and results circulate exclusively between the CPU and RAM across the system bus without traversing the OS layer.',
        isCorrect: false,
        explanation: 'Incorrect. This ignores the user, application, and operating system abstraction layers entirely.'
      },
      {
        text: 'Both requests and results bypass system software drivers to communicate directly with hardware registers.',
        isCorrect: false,
        explanation: 'Incorrect. Applications cannot bypass OS protection boundaries to write to raw registers directly in modern protected architectures.'
      }
    ]
  },
  {
    id: 'w2-q2',
    weekId: 'week2',
    topic: 'Processing Units Architecture',
    question: 'A financial analytics firm must run two workloads: (1) A single-threaded legacy fraud evaluation script with intricate conditional branching, and (2) A massive Monte Carlo portfolio risk simulation calculating millions of matrix multiplications concurrently. What hardware configuration represents optimal platform architecture?',
    thaiContext: 'โจทย์ Quiz ข้อ 2 จากเนื้อหา Week 2: การเลือกใช้ CPU คอร์แรง vs GPU คอร์ขนานตามลักษณะเวิร์กโหลด',
    pdfPage: 23,
    difficulty: 'medium',
    options: [
      {
        text: 'Assign both workloads to a high-core-count GPU cluster.',
        isCorrect: false,
        explanation: 'Incorrect. GPUs perform poorly on complex single-threaded conditional branching logic due to branch divergence.'
      },
      {
        text: 'Assign Workload 1 to a high-single-thread clock speed CPU, and assign Workload 2 to a massively parallel GPU accelerator.',
        isCorrect: true,
        explanation: 'Correct! CPUs optimize for low latency and complex sequential branching logic via large caches and branch predictors. GPUs optimize for massive throughput across millions of uniform parallel mathematical operations (SIMD).'
      },
      {
        text: 'Assign Workload 1 to cold secondary storage, and Workload 2 to the L1 Cache.',
        isCorrect: false,
        explanation: 'Incorrect. Storage cannot compute logic; it only stores persistent bytes.'
      },
      {
        text: 'Assign Workload 1 to an analog sensor, and Workload 2 to a microcontroller ROM.',
        isCorrect: false,
        explanation: 'Incorrect. Neither component is capable of high-performance enterprise financial analytics.'
      }
    ]
  },
  {
    id: 'w2-q3',
    weekId: 'week2',
    topic: 'Memory Hierarchy & Volatility',
    question: 'During a live server motherboard upgrade, an engineer hot-plugs a new DDR5 DRAM module. Which statement accurately describes the architectural characteristics of DRAM compared to CPU SRAM Cache?',
    thaiContext: 'โจทย์ Quiz ข้อ 3 จากเนื้อหา Week 2: เปรียบเทียบคุณสมบัติเชิงสถาปัตยกรรมระหว่าง DRAM และ SRAM',
    pdfPage: 30,
    difficulty: 'medium',
    options: [
      {
        text: 'DRAM utilizes 6-transistor flip-flops per bit, operates faster than SRAM, and does not require periodic electrical refreshing.',
        isCorrect: false,
        explanation: 'Incorrect. That describes SRAM. DRAM uses 1 transistor and 1 capacitor per bit.'
      },
      {
        text: 'DRAM stores electrical charge in microscopic capacitors that continuously leak, requiring periodic dynamic refresh cycles, making it slower but far denser and cheaper than SRAM.',
        isCorrect: true,
        explanation: 'Correct! DRAM bits are stored in capacitors that lose charge rapidly, requiring continuous refresh cycles. This makes DRAM slower than SRAM, but allows immense density and low cost per gigabyte for main memory.'
      },
      {
        text: 'DRAM is completely non-volatile and will retain all database rows even after the server power supply is severed.',
        isCorrect: false,
        explanation: 'Incorrect. DRAM is volatile; when power is removed, all electrical charge drains away instantly.'
      },
      {
        text: 'DRAM resides physically inside the CPU Arithmetic Logic Unit alongside instruction registers.',
        isCorrect: false,
        explanation: 'Incorrect. Registers reside in the CPU core; DRAM resides externally on separate memory sticks connected via the memory bus.'
      }
    ]
  },
  {
    id: 'w2-q4',
    weekId: 'week2',
    topic: 'System Bus Infrastructure',
    question: 'An embedded systems engineer is designing an industrial controller. When analyzing the system bus connecting the processor to memory and I/O devices, which bus line is strictly UNIDIRECTIONAL and what is its primary function?',
    thaiContext: 'โจทย์ Quiz ข้อ 4 จากเนื้อหา Week 2: บัสชนิดใดที่ส่งสัญญาณทิศทางเดียว (Unidirectional) และมีหน้าที่อะไร?',
    pdfPage: 39,
    difficulty: 'medium',
    options: [
      {
        text: 'The Data Bus, which carries byte payloads exclusively from RAM to the hard drive.',
        isCorrect: false,
        explanation: 'Incorrect. The Data Bus is bidirectional, allowing data to move both into and out of the CPU.'
      },
      {
        text: 'The Address Bus, which originates exclusively from the CPU to select target memory cell locations or I/O ports.',
        isCorrect: true,
        explanation: 'Correct! The Address Bus is unidirectional because only the CPU (or DMA controller in bus-master mode) determines and outputs the memory address of the target location being accessed.'
      },
      {
        text: 'The Control Bus, which only transmits clock pulses from the monitor to the keyboard.',
        isCorrect: false,
        explanation: 'Incorrect. The Control Bus carries bidirectional control and handshake signals between CPU, memory, and devices.'
      },
      {
        text: 'The Power Rail, which translates machine code into high-level Python syntax.',
        isCorrect: false,
        explanation: 'Incorrect. Power rails supply DC electrical voltage; they do not perform code translation.'
      }
    ]
  },
  {
    id: 'w2-q5',
    weekId: 'week2',
    topic: 'Platform Taxonomy & Engineering Trade-Offs',
    question: 'An IoT engineer must deploy autonomous camera sensors in a remote rainforest to detect endangered wildlife. The device runs on a small solar battery and cellular connectivity is intermittent. What architectural trade-off should the engineer choose?',
    thaiContext: 'โจทย์ Quiz ข้อ 5 จากเนื้อหา Week 2: การวิเคราะห์ Trade-off ระหว่าง Edge Computing และ Cloud Computing',
    pdfPage: 48,
    difficulty: 'medium',
    options: [
      {
        text: 'Stream full 4K raw video continuously to a centralized Cloud server for deep learning processing.',
        isCorrect: false,
        explanation: 'Incorrect. Continuous 4K streaming would immediately drain the battery and fail due to intermittent cellular connectivity.'
      },
      {
        text: 'Deploy an Edge Computing platform featuring an ultra-low-power NPU accelerator to run inference locally on-device, transmitting only lightweight alert metadata when an animal is detected.',
        isCorrect: true,
        explanation: 'Correct! Edge computing with specialized energy-efficient accelerators solves battery constraints and bandwidth limitations by executing model inference locally without depending on constant cloud connectivity.'
      },
      {
        text: 'Replace the digital camera with an analog vacuum tube circuit to achieve zero latency.',
        isCorrect: false,
        explanation: 'Incorrect. Vacuum tubes consume massive amounts of electrical power and cannot execute AI neural networks.'
      },
      {
        text: 'Eliminate local memory and store all camera frames exclusively in the CPU instruction registers.',
        isCorrect: false,
        explanation: 'Incorrect. Registers hold only a few bytes of active data, incapable of storing multi-megabyte image frames.'
      }
    ]
  },
  {
    id: 'w2-q6',
    weekId: 'week2',
    topic: 'CPU Instruction Machine Cycle',
    question: 'In which stage of the CPU instruction cycle does the Control Unit decode the opcode and determine which internal data pathways and ALU circuits to activate?',
    thaiContext: 'ขั้นตอนใดใน Instruction Cycle ที่ Control Unit ทำหน้าที่ถอดรหัสคำสั่ง?',
    pdfPage: 19,
    difficulty: 'easy',
    options: [
      {
        text: 'FETCH stage',
        isCorrect: false,
        explanation: 'Incorrect. The FETCH stage retrieves the raw instruction bytes from memory into the Instruction Register.'
      },
      {
        text: 'DECODE stage',
        isCorrect: true,
        explanation: 'Correct! During DECODE, the Control Unit interprets the operational code (opcode) and prepares operands and ALU routes.'
      },
      {
        text: 'EXECUTE stage',
        isCorrect: false,
        explanation: 'Incorrect. In EXECUTE, the ALU actually carries out the mathematical or logical operation.'
      },
      {
        text: 'STORE stage',
        isCorrect: false,
        explanation: 'Incorrect. In STORE, the computed result is written back to registers or RAM.'
      }
    ]
  }
];
