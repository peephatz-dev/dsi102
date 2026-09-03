import { StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';

export const week3KeyConcepts: KeyConcept[] = [
  {
    id: 'w3-c1',
    term: 'Operating System (OS)',
    thaiTerm: 'ระบบปฏิบัติการ (OS)',
    definition: 'System software that acts as an intermediary between users/applications and raw hardware. Acts as both Resource Manager and Control System.',
    thaiDefinition: 'ซอฟต์แวร์ระบบที่เป็นตัวกลางเชื่อมระหว่างผู้ใช้/แอปพลิเคชัน และฮาร์ดแวร์ ทำหน้าที่ทั้งจัดสรรทรัพยากร (Resource Manager) และควบคุมความปลอดภัย (Control System)',
    example: 'When multiple apps request memory simultaneously, the OS arbitrates access to prevent system crashes.',
    pdfPage: 8,
    category: 'Core OS',
    important: true,
  },
  {
    id: 'w3-c2',
    term: 'Interrupt',
    thaiTerm: 'สัญญาณขัดจังหวะฮาร์ดแวร์ (Interrupt)',
    definition: 'An asynchronous hardware signal sent to the CPU by an external peripheral device to indicate that an event requires immediate processing.',
    thaiDefinition: 'สัญญาณฮาร์ดแวร์แบบอะซิงโครนัส (เกิดเมื่อไหร่ก็ได้) ส่งจากอุปกรณ์ภายนอกไปยังซีพียู เพื่อแจ้งเตือนเหตุการณ์ที่ต้องจัดการทันที เช่น การกดแป้นพิมพ์',
    example: 'A keystroke on the keyboard fires an interrupt to wake up the OS interrupt handler.',
    pdfPage: 23,
    category: 'Kernel & I/O',
    important: true,
  },
  {
    id: 'w3-c3',
    term: 'Trap / Exception',
    thaiTerm: 'แทรป / ข้อยกเว้นภายในซอฟต์แวร์ (Trap / Exception)',
    definition: 'A synchronous, software-generated condition or signal caused by an internal CPU error (e.g. divide-by-zero) or an intentional System Call instruction.',
    thaiDefinition: 'สัญญาณขัดจังหวะแบบซิงโครนัสที่เกิดจากซอฟต์แวร์ภายใน เช่น เกิดข้อผิดพลาดหารด้วยศูนย์ (Divide-by-zero) หรือการร้องขอบริการระบบผ่าน System Call',
    example: 'A user application executing a read() system call triggers a trap to elevate privilege into Kernel Mode.',
    pdfPage: 24,
    category: 'Kernel & I/O',
    important: true,
  },
  {
    id: 'w3-c4',
    term: 'Direct Memory Access (DMA)',
    thaiTerm: 'การเข้าถึงหน่วยความจำโดยตรง (DMA)',
    definition: 'Specialized hardware controller capable of transferring high-speed blocks of data directly between I/O devices and RAM without burdening the CPU with per-byte transfers.',
    thaiDefinition: 'วงจรควบคุมพิเศษที่ถ่ายโอนบล็อกข้อมูลระหว่างอุปกรณ์ I/O และ RAM ได้โดยตรง ซีพียูเพียงแค่สั่งเริ่มงานและรับทราบเมื่อเสร็จสิ้น ทำให้ซีพียูไม่เกิดคอขวด 100% load',
    example: 'High-speed NVMe drives or Gigabit network controllers copy incoming packet payloads straight into RAM via DMA.',
    pdfPage: 25,
    category: 'Kernel & I/O',
    important: true,
  },
  {
    id: 'w3-c5',
    term: 'Process Control Block (PCB)',
    thaiTerm: 'บล็อกควบคุมโพรเซส (PCB)',
    definition: 'The kernel data structure storing all state and execution context of an active process: Program Counter (PC), CPU registers, memory limits, process ID, and open file descriptors.',
    thaiDefinition: 'โครงสร้างข้อมูลในเคอร์เนลที่เก็บสถานะและบริบททั้งหมดของโพรเซส เช่น ตัวนับคำสั่ง (PC), ค่าในรีจิสเตอร์, สิทธิ์ และข้อมูลหน่วยความจำ',
    example: 'During a context switch, the OS serializes the state of the active process into its PCB.',
    pdfPage: 38,
    category: 'Process Management',
    important: true,
  },
  {
    id: 'w3-c6',
    term: 'Context Switching',
    thaiTerm: 'การสลับบริบทการทำงาน (Context Switching)',
    definition: 'The procedure where the OS saves the computational state of the current running process into its PCB and restores the state of the next scheduled process into CPU registers.',
    thaiDefinition: 'กระบวนการบันทึกสถานะของโพรเซสปัจจุบันลงใน PCB และโหลดสถานะของโพรเซสใหม่จาก PCB อีกตัวขึ้นสู่ซีพียู เป็น Pure Computational Overhead ที่ไม่ได้สร้างงานของผู้ใช้',
    example: 'Occurs every few milliseconds under preemptive multitasking to share one CPU among 100 background threads.',
    pdfPage: 40,
    category: 'Process Management',
    important: true,
  },
  {
    id: 'w3-c7',
    term: 'Time Quantum & Round-Robin',
    thaiTerm: 'ช่วงเวลาจำกัดคงที่ (Time Quantum)',
    definition: 'The fixed slice of CPU time allocated to each process under Round-Robin scheduling before being preempted and placed back at the tail of the ready queue.',
    thaiDefinition: 'ช่วงเวลาสั้นๆ (เช่น 10-20 ms) ที่ CPU มอบให้แต่ละโพรเซสรันก่อนถูกแย่งสิทธิ์ (Preemption) หากสั้นเกินไปจะเกิด Context Switch ถี่จนประสิทธิภาพตก',
    example: 'A time quantum of 10 ms ensures that interactive GUI applications remain responsive without starvation.',
    pdfPage: 54,
    category: 'CPU Scheduling',
    important: true,
  },
  {
    id: 'w3-c8',
    term: 'Convoy Effect',
    thaiTerm: 'ปรากฏการณ์ขบวนรถไฟคอขวด (Convoy Effect)',
    definition: 'A performance bottleneck in FCFS (First-Come, First-Served) scheduling where short or I/O-bound processes are stuck waiting behind a massive, long CPU-bound process.',
    thaiDefinition: 'ปัญหาใน FCFS ที่โพรเซสสั้นๆ ต้องติดค้างรอโพรเซสขนาดใหญ่ที่ใช้เวลานานเพียงตัวเดียว ส่งผลให้เวลาการรอคอยเฉลี่ย (Average Waiting Time) พุ่งสูงมาก',
    example: 'A 30 ms job running ahead of ten 1 ms jobs creates a severe convoy effect.',
    pdfPage: 49,
    category: 'CPU Scheduling',
    important: true,
  },
  {
    id: 'w3-c9',
    term: 'Starvation & Aging',
    thaiTerm: 'สภาวะอดตาย (Starvation) และการบ่มเพาะบุริมภาพ (Aging)',
    definition: 'Starvation: Low-priority processes wait indefinitely because high-priority processes continually arrive. Aging: Solution that gradually increases the priority of waiting processes over time.',
    thaiDefinition: 'Starvation คือโพรเซสระดับล่างไม่ได้รันเลยเพราะมีโพรเซสสำคัญกว่ามาแทรกเรื่อยๆ แก้ไขโดย Aging ซึ่งทยอยเพิ่มค่าบุริมภาพของโพรเซสตามระยะเวลาที่รออยู่ในคิว',
    example: 'Priority scheduling algorithms implement aging so that background cleanup tasks are guaranteed to execute eventually.',
    pdfPage: 51,
    category: 'CPU Scheduling',
    important: true,
  },
  {
    id: 'w3-c10',
    term: 'Logical vs. Physical Address',
    thaiTerm: 'เลขที่อยู่เสมือน (Logical) vs เลขที่อยู่จริงบนชิป (Physical)',
    definition: 'Logical Address is generated by the CPU during code execution. Physical Address is the actual electrical bus address on the physical DRAM memory chip, translated by the MMU.',
    thaiDefinition: 'Logical Address คือแอดเดรสเสมือนที่ซีพียูมองเห็น ส่วน Physical Address คือตำแหน่งจริงบนชิป RAM ที่ถูกแปลงโดยฮาร์ดแวร์ Memory Management Unit (MMU)',
    example: 'CPU executes instruction at virtual address 0x1000; MMU looks up Page Table and maps it to physical DRAM frame 0x9000.',
    pdfPage: 61,
    category: 'Memory Management',
    important: true,
  },
  {
    id: 'w3-c11',
    term: 'Translation Look-Aside Buffer (TLB)',
    thaiTerm: 'แคชแปลงตำแหน่งตารางหน้าความเร็วสูง (TLB)',
    definition: 'An ultra-fast, hardware associative cache inside the MMU that stores recent Page-to-Frame mappings to bypass redundant DRAM memory access cycles.',
    thaiDefinition: 'หน่วยความจำแคชความเร็วสูงระดับฮาร์ดแวร์ใน MMU สำหรับเก็บคู่ Page-to-Frame ล่าสุด เพื่อลดความล่าช้าในการเข้าถึง Page Table ในหน่วยความจำหลัก',
    example: 'A TLB hit allows address translation in 1 ns, avoiding an extra 100 ns read from main memory.',
    pdfPage: 69,
    category: 'Memory Management',
    important: true,
  },
  {
    id: 'w3-c12',
    term: 'Spooling (Simultaneous Peripheral Operations On-Line)',
    thaiTerm: 'การเก็บพักข้อมูลในคิวชั่วคราว (Spooling)',
    definition: 'Buffering I/O jobs onto intermediate disk storage so a dedicated sequential device (such as an office printer) can process jobs sequentially without stalling client applications.',
    thaiDefinition: 'การนำข้อมูลงานพิมพ์หรือ I/O ไปเข้าคิวพักไว้บนดิสก์ชั่วคราว เพื่อรองรับอุปกรณ์ที่ไม่สามารถรับงานพร้อมกันได้ ทำให้โปรแกรมทำงานอื่นต่อได้ทันทีโดยไม่ต้องรอให้พรินต์เสร็จ',
    example: 'Multiple network users sending 50-page PDF prints to a shared office laser printer at the exact same moment.',
    pdfPage: 34,
    category: 'Kernel & I/O',
  }
];

export const week3Modules: StudyModule[] = [
  {
    id: 'w3-m1',
    weekId: 'week3',
    moduleNumber: 1,
    title: 'Introduction to Operating Systems: The "No-OS" Dilemma & Roles',
    thaiTitle: 'บทนำสู่ระบบปฏิบัติการ: วิกฤตหากไม่มี OS และ 3 บทบาทหลัก',
    pdfPageStart: 8,
    pdfPageEnd: 21,
    overview: 'Why modern computing is impossible without an operating system, the hardware-software mediation layer, and the 3 cornerstone roles of an OS.',
    subsections: [
      {
        id: 'w3-m1-s1',
        title: 'What Happens When You Click an Application?',
        thaiTitle: 'เกิดอะไรขึ้นเบื้องหลังเมื่อคุณคลิกเปิดแอปพลิเคชัน?',
        pdfPage: 9,
        content: `Every simple user action triggers an invisible multi-layer cascade:
1. **User Input**: Mouse click or screen tap on the application icon.
2. **OS System Call**: The GUI shell requests the OS kernel to instantiate a new process.
3. **Storage to RAM**: The OS file system locates the executable binary on persistent storage and loads instructions and static data into free physical RAM frames.
4. **Memory & PCB Allocation**: The OS allocates the Process Control Block (PCB), stack, and heap memory spaces.
5. **CPU Scheduling**: The process enters the **Ready Queue**; the CPU scheduler assigns a time slice and sets the Program Counter to the entry point.
6. **Screen Output**: Computed graphics buffers are dispatched to the GPU frame buffer for display rendering.`,
        bulletPoints: [
          'Input -> OS Request -> Disk-to-RAM Loader -> PCB Creation -> CPU Scheduling -> Output.'
        ],
        thaiCommentary: 'การคลิกเพียงครั้งเดียว ต้องผ่านการจัดการของ OS ตั้งแต่จัดสรรหน่วยความจำ โหลดไบนารีจากดิสก์ สร้าง PCB และนำเข้าคิวรอซีพียู',
        memoryTip: 'Click → OS Loader → RAM Allocation → PCB → CPU → Display',
        infographicId: 'infographic-w3-no-os'
      },
      {
        id: 'w3-m1-s2',
        title: 'The "No-OS" Dilemma & The 3 Roles of an OS',
        thaiTitle: 'วิกฤตหากระบบไร้ OS และ 3 บทบาทสำคัญของระบบปฏิบัติการ',
        pdfPage: 12,
        content: `Without an Operating System, every single software application would be forced to contain custom assembly drivers for every motherboard chipset, GPU, network card, and keyboard. This produces four catastrophic failures:
1. **Duplicated Code**: Enormous code bloat across every installed program.
2. **Resource Conflicts**: Multiple programs competing to drive the printer or network card simultaneously.
3. **System Crashes**: One buggy pointer overwrites another program's memory.
4. **Zero Security**: Any script can read private bank credentials or system passwords directly from physical memory.\n\n**The 3 Cornerstone Roles of an OS**:
* **1. Common Interface (ตัวกลาง)**: Shields developers by presenting unified abstractions (System Calls: \`read()\`, \`write()\`, \`open()\`).
* **2. Resource Manager (ผู้จัดการทรัพยากร)**: Arbitrates and allocates CPU time, RAM pages, disk blocks, and I/O bandwidth fairly and efficiently.
* **3. Control System (ผู้ควบคุมความปลอดภัย)**: Enforces memory protection boundaries, user privilege levels (Dual-Mode: User Mode vs Kernel Mode), and access permissions.`,
        bulletPoints: [
          'No-OS = Code duplication, resource crashes, memory clobbering, total insecurity.',
          'OS Core Roles: Interface (Abstraction) + Resource Manager (Allocation) + Control System (Protection).'
        ],
        thaiCommentary: 'OS มี 3 หน้าที่หลัก: Interface (ตัวกลางให้แอปคุยง่าย), Resource Manager (จัดสรรเวลา CPU และแรม), Control System (ควบคุมความปลอดภัยและสิทธิ์)',
        memoryTip: '3 Roles: Interface | Resource Manager | Control System',
        infographicId: 'infographic-w3-no-os'
      }
    ]
  },
  {
    id: 'w3-m2',
    weekId: 'week3',
    moduleNumber: 2,
    title: 'Handling Input/Output: Polling, Interrupts, Traps & DMA',
    thaiTitle: 'การจัดการระบบ I/O: โพลลิ่ง สัญญาณขัดจังหวะ แทรป และ DMA',
    pdfPageStart: 22,
    pdfPageEnd: 26,
    overview: 'How the CPU coordinates with external peripherals without wasting computational cycles in busy-waiting loops.',
    subsections: [
      {
        id: 'w3-m2-s1',
        title: 'Polling vs. Hardware Interrupts vs. Traps/Exceptions',
        thaiTitle: 'เปรียบเทียบ Polling, Hardware Interrupt และ Software Trap',
        pdfPage: 23,
        content: `* **Polling (Busy-Waiting)**: The CPU sits in an active loop reading a device status register continuously until data arrives. This wastes 100% of CPU cycles doing no productive work.
* **Hardware Interrupt**: **Asynchronous** physical signal triggered by external devices (keyboard key press, network packet arrival, disk controller ready). The CPU suspends the current instruction sequence, saves state, and jumps to the Interrupt Service Routine (ISR) in the kernel.
* **Trap / Exception**: **Synchronous** software-generated interrupt originating directly from inside the CPU core. Triggered either by an execution error (Divide-by-zero, Invalid Memory Access / Segmentation Fault) or intentionally via a **System Call** (software interrupt to switch from User Mode to Kernel Mode).`,
        bulletPoints: [
          'Interrupt = Asynchronous, hardware-triggered (external to CPU core).',
          'Trap / Exception = Synchronous, software-triggered (internal to CPU core / System Call).',
          'Polling = Wasteful busy-waiting checking status register in a loop.'
        ],
        thaiCommentary: 'โจทย์สอบ: สัญญาณจากคีย์บอร์ดหรือเน็ตเวิร์กการ์ด = Hardware Interrupt (อะซิงโครนัส), ข้อผิดพลาดหารด้วยศูนย์หรือเรียก System Call = Trap/Exception (ซิงโครนัส)',
        memoryTip: 'Hardware Interrupt = Async & External | Trap = Sync & Internal',
        infographicId: 'infographic-w3-interrupt-trap'
      },
      {
        id: 'w3-m2-s2',
        title: 'Direct Memory Access (DMA): Eliminating the CPU Bottleneck',
        thaiTitle: 'DMA: ขนถ่ายข้อมูลบล็อกใหญ่ตรงสู่ RAM โดยไม่ต้องรบกวนซีพียู',
        pdfPage: 25,
        content: `In early computers (Programmed I/O), every single byte read from a disk had to travel through the CPU: \`Disk -> CPU Register -> RAM\`. For a 4K video stream or Gigabit network, this caused the CPU to spike to 100% utilization doing nothing but copying memory bytes.\n\n**Direct Memory Access (DMA)** solves this:
1. The CPU programs the DMA Controller with: Source Device, Target RAM Address, and Byte Count.
2. The CPU immediately resumes running other user application threads!
3. The DMA Controller takes master control of the system memory bus and transfers the entire block of data directly from device controller to RAM.
4. Once the entire multi-megabyte transfer completes, the DMA controller issues a single **Interrupt** to notify the CPU that data is ready.`,
        bulletPoints: [
          'DMA transfers memory blocks autonomously while CPU performs user computation.',
          'CPU only handles initialization and receives the completion interrupt.',
          'Drastically reduces CPU overhead for high-speed devices (NVMe SSDs, GPUs, 10GbE Network).'
        ],
        thaiCommentary: 'DMA คือตัวช่วยชีวิตซีพียู: ย้ายข้อมูลเป็นก้อนตรงเข้า RAM ซีพียูสั่งเริ่มงานแล้วไปทำงานอื่น พอเสร็จ DMA จะส่ง Interrupt มาบอกทีเดียว',
        formula: '\\text{Programmed I/O (Byte-by-byte CPU overhead)} \\gg \\text{DMA (Autonomous Block Transfer)}',
        memoryTip: 'DMA = Direct Device-to-RAM Block Transfer without CPU intervention',
        infographicId: 'infographic-w3-dma'
      }
    ]
  },
  {
    id: 'w3-m3',
    weekId: 'week3',
    moduleNumber: 3,
    title: 'Inside the Kernel I/O Subsystem: Spooling vs. Buffering',
    thaiTitle: 'โครงสร้างภายในระบบย่อย I/O: Spooling เทียบกับ Buffering',
    pdfPageStart: 27,
    pdfPageEnd: 36,
    overview: 'Techniques used by the kernel to bridge device speed mismatches and manage dedicated sequential peripherals.',
    subsections: [
      {
        id: 'w3-m3-s1',
        title: 'Spooling vs. Buffering vs. Caching',
        thaiTitle: 'Spooling (เข้าคิวบนดิสก์) vs Buffering (พักข้อมูลในแรม)',
        pdfPage: 34,
        content: `* **Buffering**: Storing data temporarily in main memory (RAM) while it is being transferred between two devices with different speeds or block sizes (e.g. video streaming buffer to prevent playback stutter).
* **Spooling (Simultaneous Peripheral Operations On-Line)**: Overlaps the I/O of one job with the computation of others by storing dedicated sequential jobs in a queue on disk. Standard example: **Print Spooler**. Since a laser printer cannot interleave pages from five different users at once, print jobs are written to spool files on disk and fed sequentially.
* **Caching**: Keeping a high-speed copy of frequently accessed data in faster memory to accelerate subsequent read requests.`,
        bulletPoints: [
          'Buffering = In RAM, manages speed and transfer size differences.',
          'Spooling = On Disk, manages exclusive access to non-shareable dedicated devices (printers).',
          'Caching = In Cache/RAM, speeds up repeat access by storing copies.'
        ],
        thaiCommentary: 'Spooling จุดเด่นคือใช้กับอุปกรณ์ที่ไม่สามารถสลับไปมาระหว่างผู้ใช้พร้อมกันได้ เช่น เครื่องพิมพ์ โดยนำงานไปพักไว้บนดิสก์ก่อน',
        memoryTip: 'Buffer = RAM Speed Adapter | Spool = Disk Queue for Dedicated Device',
        infographicId: 'infographic-w3-spooling'
      }
    ]
  },
  {
    id: 'w3-m4',
    weekId: 'week3',
    moduleNumber: 4,
    title: 'Process Management, PCB & Context Switching',
    thaiTitle: 'การจัดการโพรเซส, โครงสร้าง PCB และการสลับบริบทการทำงาน',
    pdfPageStart: 37,
    pdfPageEnd: 45,
    overview: 'The lifecycle of executing programs, the 5 standard process states, and how context switching enables preemptive multitasking.',
    subsections: [
      {
        id: 'w3-m4-s1',
        title: 'Program vs. Process & The 5 Process States',
        thaiTitle: 'โปรแกรม (ไฟล์บนดิสก์) vs โพรเซส (มีชีวิตในแรม) และ 5 สถานะการทำงาน',
        pdfPage: 37,
        content: `* **Program**: A passive entity stored on disk (executable binary file, e.g. \`chrome.exe\`).
* **Process**: An active entity loaded in memory, with an allocated Program Counter, stack, heap, data section, and system resources.\n\n**The 5 Classic Process States**:
1. **New**: The process is currently being instantiated by the OS loader.
2. **Ready**: The process is loaded in RAM and waiting in the Ready Queue for CPU time.
3. **Running**: The process instructions are actively executing on a physical CPU core.
4. **Waiting / Blocked**: The process cannot execute until an external event or I/O operation completes (e.g. awaiting disk read).
5. **Terminated**: The process has finished execution and the OS is reclaiming its memory.`,
        bulletPoints: [
          'Program is passive code on disk; Process is dynamic active execution in RAM.',
          'State transitions: Ready -> Running (Scheduled) -> Waiting (I/O request) -> Ready (I/O done) -> Running -> Terminated.'
        ],
        thaiCommentary: 'โปรแกรมคือไฟล์ที่นอนอยู่บนดิสก์ โพรเซสคือโปรแกรมที่ถูกโหลดขึ้นแรมและกำลังมีชีวิตทำงานอยู่',
        memoryTip: 'New → Ready → Running → (Waiting) → Terminated',
        infographicId: 'infographic-w3-process-lifecycle'
      },
      {
        id: 'w3-m4-s2',
        title: 'The Process Control Block (PCB) & Context Switch Overhead',
        thaiTitle: 'โครงสร้าง PCB และภาระงานส่วนเกินจากการสลับบริบท (Overhead)',
        pdfPage: 38,
        content: `Every process has a dedicated **PCB** in the kernel containing:
* Process ID (PID) and Process State
* Program Counter (PC) indicating next instruction address
* CPU Registers (Accumulators, Index registers, Stack pointer)
* Memory Management info (Page tables, base/limit registers)
* Accounting and I/O status (open file handles)\n\n**Context Switch**:
When the OS switches the CPU from Process $P_0$ to Process $P_1$:
1. Save state of $P_0$ into $PCB_0$
2. Update OS scheduling queues
3. Load state of $P_1$ from $PCB_1$ into CPU registers
4. Resume execution at $P_1$'s Program Counter\n\n**Crucial Note**: Context Switch time is **pure computational overhead**! The CPU performs administrative register shuffling; zero user code executes during this window. Excessive context switching destroys system throughput.`,
        bulletPoints: [
          'PCB preserves full processor execution state during suspension.',
          'Context switch consumes pure overhead (~microseconds) where no user progress occurs.'
        ],
        thaiCommentary: 'Context Switch เป็นงานธุรการที่ไม่มีผลงานของผู้ใช้เกิดขึ้นเลย (Pure Overhead) หากสลับบ่อยเกินไประบบจะอืด',
        memoryTip: 'Save to PCB0 → Restore from PCB1 = Context Switch (Pure Overhead)',
        infographicId: 'infographic-w3-process-lifecycle'
      }
    ]
  },
  {
    id: 'w3-m5',
    weekId: 'week3',
    moduleNumber: 5,
    title: 'CPU Scheduling Algorithms: FCFS, Round Robin & Priority',
    thaiTitle: 'อัลกอริทึมการจัดตารางเวลาซีพียู: FCFS, Round Robin และ Priority',
    pdfPageStart: 46,
    pdfPageEnd: 58,
    overview: 'How the OS scheduler decides which ready process receives CPU execution time, and mathematical calculation of waiting times.',
    subsections: [
      {
        id: 'w3-m5-s1',
        title: 'FCFS & The Convoy Effect',
        thaiTitle: 'FCFS (มาก่อนได้ก่อน) และปัญหาขบวนรถไฟติดค้าง (Convoy Effect)',
        pdfPage: 49,
        content: `**FCFS (First-Come, First-Served)** is a non-preemptive algorithm that allocates the CPU to processes strictly in order of arrival in the Ready Queue.\n\n**The Convoy Effect**:
Consider 3 processes arriving at time 0:
* $P_1$ with Burst Time = 24 ms
* $P_2$ with Burst Time = 3 ms
* $P_3$ with Burst Time = 3 ms\n\n**Execution Order: $P_1 \\rightarrow P_2 \\rightarrow P_3$**:
* Waiting Time: $P_1 = 0$, $P_2 = 24$, $P_3 = 27$
* Average Waiting Time = $(0 + 24 + 27) / 3 = \\mathbf{17\\text{ ms}}$\n\n**Execution Order: $P_2 \\rightarrow P_3 \\rightarrow P_1$**:
* Waiting Time: $P_2 = 0$, $P_3 = 3$, $P_1 = 6$
* Average Waiting Time = $(0 + 3 + 6) / 3 = \\mathbf{3\\text{ ms}}$!\n\n**Insight**: A long CPU-bound job in front forces short jobs to wait behind it like a slow truck holding up a convoy of sports cars on a single-lane highway.`,
        bulletPoints: [
          'FCFS has the worst average waiting time when burst times vary significantly.',
          'Convoy Effect severely degrades interactive desktop responsiveness.'
        ],
        thaiCommentary: 'การคำนวณเวลารอคอยใน FCFS มักออกสอบ: หา Gantt Chart -> คำนวณเวลารอของแต่ละตัว -> หาค่าเฉลี่ย',
        formula: '\\text{Avg Waiting Time (P1 first)} = 17\\text{ ms} \\gg \\text{Avg Waiting Time (Short first)} = 3\\text{ ms}',
        memoryTip: 'FCFS + Long Job First = Severe Convoy Effect',
        infographicId: 'infographic-w3-scheduling'
      },
      {
        id: 'w3-m5-s2',
        title: 'Round Robin (RR) & Time Quantum Trade-Off',
        thaiTitle: 'Round Robin และผลกระทบของการกำหนดขนาด Time Quantum',
        pdfPage: 54,
        content: `**Round Robin (RR)** is designed for time-sharing systems. Each process receives a fixed slice of CPU time called a **Time Quantum** (usually 10-100 ms). If the process is still running when the quantum expires, it is preempted and sent to the tail of the Ready Queue.\n\n**The Quantum Dilemma**:
* **If Time Quantum is Extremely Large ($q \\rightarrow \\infty$)**: RR degrades into simple **FCFS** (First-Come, First-Served).
* **If Time Quantum is Extremely Small ($q \\rightarrow 0$)**: The system suffers from severe **context switch thrashing**. If quantum is 1 ms and context switch takes 0.5 ms, 33% of total CPU time is completely wasted on overhead!
* **Golden Rule**: The time quantum should be chosen such that roughly 80% of CPU bursts are shorter than the quantum.`,
        bulletPoints: [
          'Large Quantum -> FCFS behavior.',
          'Tiny Quantum -> Excessive context switch overhead degrades system throughput.'
        ],
        thaiCommentary: 'ถ้า Quantum ใหญ่เกินไป จะกลายเป็น FCFS แต่ถ้าเล็กเกินไป จะเสียเวลาสลับ Context Switch จนเครื่องค้าง',
        memoryTip: 'Quantum too big = FCFS | Quantum too small = Pure Context Switch Overhead',
        infographicId: 'infographic-w3-scheduling'
      },
      {
        id: 'w3-m5-s3',
        title: 'Priority Scheduling, Starvation & Aging',
        thaiTitle: 'การจัดตารางเวลาตามลำดับความสำคัญ ปัญหาอดตาย และเทคนิค Aging',
        pdfPage: 51,
        content: `In **Priority Scheduling**, each process is assigned an integer priority rank. The CPU is allocated to the process with the highest priority (e.g. 0 = highest).\n\n**Starvation (Indefinite Blocking)**:
A major vulnerability: low-priority background processes may wait indefinitely in the Ready Queue because high-priority processes continually arrive and preempt them. Rumor has it that when MIT shut down their IBM 7094 in 1973, they discovered a low-priority job submitted in 1967 that had been starved for 6 years!\n\n**The Solution: Aging (การบ่มเพาะ)**:
The scheduler gradually increments the priority of processes waiting in the Ready Queue over time (e.g., increase priority by 1 every 15 minutes). Eventually, even the lowest-priority job ages into the highest-priority bracket and is guaranteed execution.`,
        bulletPoints: [
          'Starvation: Low-priority jobs never run.',
          'Aging: Increase waiting process priority over elapsed time to eliminate starvation.'
        ],
        thaiCommentary: 'โจทย์สอบ: Starvation แก้ด้วยเทคนิคใด? ตอบ: Aging (ทยอยเพิ่มความสำคัญตามเวลาที่รอ)',
        memoryTip: 'Starvation solved by Aging',
        infographicId: 'infographic-w3-scheduling'
      }
    ]
  },
  {
    id: 'w3-m6',
    weekId: 'week3',
    moduleNumber: 6,
    title: 'Memory Management & Paging Architecture',
    thaiTitle: 'การจัดการหน่วยความจำหลัก และสถาปัตยกรรมแบ่งหน้า (Paging)',
    pdfPageStart: 59,
    pdfPageEnd: 73,
    overview: 'Overcoming external fragmentation through non-contiguous paging, Page Table address translation, and TLB cache acceleration.',
    subsections: [
      {
        id: 'w3-m6-s1',
        title: 'Paging Architecture: Pages, Frames & Address Translation',
        thaiTitle: 'โครงสร้าง Paging: หน้า (Pages) เฟรม (Frames) และการแปลงแอดเดรส',
        pdfPage: 64,
        content: `Early contiguous memory allocation caused severe **External Fragmentation** (free memory existed in scattered tiny chunks, unable to satisfy large allocations).\n\n**Paging** solves external fragmentation by decoupling logical address space from physical RAM:
* **Physical Memory** is divided into fixed-size blocks called **Frames** (e.g., 4 KB).
* **Logical Memory** is divided into blocks of the exact same size called **Pages**.
* A **Page Table** maps each virtual Page Number ($p$) to physical Frame Number ($f$).\n\n**Address Breakdown**:
The CPU generates a Logical Address divided into:
1. **Page Number ($p$)**: Used as an index into the Page Table to retrieve Frame ($f$).
2. **Page Offset ($d$)**: The exact displacement within the page/frame. The offset does NOT change during translation!`,
        bulletPoints: [
          'Physical Frame size == Logical Page size (typically 4 KB = 4096 bytes = $2^{12}$).',
          'Offset ($d$) remains identical between logical and physical addresses.',
          'Paging eliminates External Fragmentation completely (leaves only minor Internal Fragmentation on the final page).'
        ],
        thaiCommentary: 'จำสูตรและการแยกแอดเดรส: แอดเดรสเสมือนถูกแบ่งเป็น Page Number (p) และ Offset (d) โดยที่ Offset จะคงที่เท่าเดิมเสมอตอนแปลงเป็น Physical Address',
        formula: '\\text{Logical: } (p, d) \\xrightarrow{\\text{Page Table } p \\mapsto f} \\text{Physical: } (f, d)',
        memoryTip: 'Page = Logical | Frame = Physical | Offset remains constant',
        infographicId: 'infographic-w3-paging'
      },
      {
        id: 'w3-m6-s2',
        title: 'Translation Look-Aside Buffer (TLB) & EMAT Calculation',
        thaiTitle: 'แคช TLB และการคำนวณเวลาการเข้าถึงหน่วยความจำเฉลี่ย (EMAT)',
        pdfPage: 69,
        content: `Standard Paging doubles memory access latency:
1. First read: Access the Page Table in DRAM to get the Frame number.
2. Second read: Access the actual data instruction in DRAM at that Frame.\n\nTo eliminate this delay, CPUs use a specialized associative cache called the **TLB (Translation Look-Aside Buffer)**.\n\n**Effective Memory Access Time (EMAT) Formula**:
$$\\mathbf{EMAT = Hit\\_Ratio \\times (t_{TLB} + t_{RAM}) + (1 - Hit\\_Ratio) \\times (t_{TLB} + 2 \\times t_{RAM})}$$\n\n**Exam Calculation Example**:
* TLB lookup time = 20 ns
* Main RAM access time = 100 ns
* TLB Hit Ratio = 80% (0.80)\n\n* On TLB Hit: $20 + 100 = 120\\text{ ns}$
* On TLB Miss: $20 + 100\\text{ (Page Table)} + 100\\text{ (Data)} = 220\\text{ ns}$
* $\\text{EMAT} = 0.80 \\times 120 + 0.20 \\times 220 = 96 + 44 = \\mathbf{140\\text{ ns}}$.`,
        bulletPoints: [
          'TLB stores recent Page-to-Frame mappings in hardware associative registers.',
          'High TLB Hit Ratio (~99%) brings EMAT very close to raw memory speed.'
        ],
        thaiCommentary: 'สูตร EMAT ออกสอบคำนวณบ่อยมาก! จำไว้ว่า Miss จะต้องเสียเวลาอ่านแรม 2 รอบ (รอบแรกอ่าน Page Table, รอบสองอ่านข้อมูลจริง)',
        formula: '\\text{EMAT} = \\alpha \\times (t_{\\text{TLB}} + t_{\\text{RAM}}) + (1 - \\alpha) \\times (t_{\\text{TLB}} + 2 \\cdot t_{\\text{RAM}})',
        memoryTip: 'Hit = 1 RAM access | Miss = 2 RAM accesses',
        infographicId: 'infographic-w3-paging'
      }
    ]
  }
];

export const week3Flashcards: Flashcard[] = [
  {
    id: 'w3-f1',
    weekId: 'week3',
    front: 'Hardware Interrupt vs Software Trap/Exception',
    back: '• Interrupt: Asynchronous signal from external hardware peripheral (keyboard, NIC).\n• Trap/Exception: Synchronous signal generated internally by CPU due to error (divide-by-zero) or intentional System Call.',
    thaiExplanation: 'Interrupt มาจากฮาร์ดแวร์ภายนอก (อะซิงโครนัส) | Trap มาจากซอฟต์แวร์หรือซีพียูภายใน (ซิงโครนัส เช่น System Call หรือ Divide-by-zero)',
    category: 'Kernel & I/O',
    pdfPage: 23,
    examTip: 'Check if event is synchronous (Trap) or asynchronous (Interrupt)!',
  },
  {
    id: 'w3-f2',
    weekId: 'week3',
    front: 'What problem does DMA (Direct Memory Access) solve?',
    back: 'In Programmed I/O, the CPU must move every individual byte between I/O and RAM, causing 100% CPU bottleneck. DMA allows autonomous block data transfers straight into RAM while CPU continues executing application code.',
    thaiExplanation: 'แก้ปัญหา CPU คอขวดจากการคัดลอกข้อมูลทีละไบต์ DMA ย้ายบล็อกข้อมูลเข้า RAM ได้เองโดยตรง',
    category: 'Kernel & I/O',
    pdfPage: 25,
    examTip: 'High-speed devices use DMA to avoid CPU saturation.',
  },
  {
    id: 'w3-f3',
    weekId: 'week3',
    front: 'What is Context Switching and why is it considered "pure overhead"?',
    back: 'Context Switching is saving the running process state into its PCB and restoring the next scheduled process state from its PCB. It is pure overhead because the CPU performs administrative work rather than executing user code.',
    thaiExplanation: 'เป็นการบันทึกสถานะลง PCB ตัวเก่าและโหลดจาก PCB ตัวใหม่ นับเป็น Pure Overhead เพราะไม่ได้สร้างงานของผู้ใช้เลย',
    category: 'Process Management',
    pdfPage: 40,
  },
  {
    id: 'w3-f4',
    weekId: 'week3',
    front: 'What is the Convoy Effect in FCFS CPU Scheduling?',
    back: 'A bottleneck where multiple short or I/O-bound processes are forced to wait in the Ready Queue behind a single massive CPU-bound process, resulting in high average waiting time.',
    thaiExplanation: 'ปรากฏการณ์ที่โพรเซสสั้นๆ ต้องติดค้างรอโพรเซสขนาดใหญ่ที่รันนานตัวเดียวในอัลกอริทึม FCFS',
    category: 'CPU Scheduling',
    pdfPage: 49,
    examTip: 'Convoy Effect is unique to FCFS!',
  },
  {
    id: 'w3-f5',
    weekId: 'week3',
    front: 'Round Robin: What happens if Time Quantum is too large vs too small?',
    back: '• Too large: Degrades into simple FCFS.\n• Too small: Extreme context-switching overhead wastes CPU time and destroys system throughput.',
    thaiExplanation: 'ถ้า Quantum ใหญ่เกินจะกลายเป็น FCFS ถ้าเล็กเกินจะเสียเวลากับ Context Switch ถี่จนระบบอืด',
    category: 'CPU Scheduling',
    pdfPage: 54,
  },
  {
    id: 'w3-f6',
    weekId: 'week3',
    front: 'What is Starvation in Priority Scheduling and how is it resolved?',
    back: 'Starvation occurs when low-priority processes wait indefinitely because high-priority jobs continually arrive. It is resolved by AGING: gradually increasing a process priority the longer it waits in the Ready Queue.',
    thaiExplanation: 'Starvation คือการที่โพรเซสความสำคัญต่ำถูกละเลยจนไม่ได้รัน แก้ด้วยเทคนิค Aging (ทยอยเพิ่มความสำคัญตามเวลาที่รอ)',
    category: 'CPU Scheduling',
    pdfPage: 51,
    examTip: 'Starvation -> Solved by Aging!',
  },
  {
    id: 'w3-f7',
    weekId: 'week3',
    front: 'Paging: Pages vs Frames',
    back: '• Logical address space is divided into Pages.\n• Physical memory (RAM) is divided into Frames of the identical size (e.g. 4 KB).\n• The Page Table maps Page Number to Frame Number.',
    thaiExplanation: 'Page อยู่ในหน่วยความจำเสมือน (Logical) | Frame อยู่ในแรมจริง (Physical) มีขนาดเท่ากันทุกประการ',
    category: 'Memory Management',
    pdfPage: 64,
  },
  {
    id: 'w3-f8',
    weekId: 'week3',
    front: 'What is the function of the TLB (Translation Look-Aside Buffer)?',
    back: 'A fast hardware associative cache inside the MMU that caches recent Page-to-Frame mappings. A TLB hit avoids an extra DRAM memory read to the Page Table, speeding up address translation.',
    thaiExplanation: 'แคชระดับฮาร์ดแวร์ใน MMU ที่จำคู่ Page-to-Frame เพื่อไม่ต้องไปเปิดดูตารางหน้า (Page Table) ในแรมซ้ำสองรอบ',
    category: 'Memory Management',
    pdfPage: 69,
  },
  {
    id: 'w3-f9',
    weekId: 'week3',
    front: 'What is Spooling and when is it used?',
    back: 'Spooling (Simultaneous Peripheral Operations On-Line) queues I/O jobs on disk for dedicated, non-shareable sequential devices like office printers, allowing applications to proceed without waiting.',
    thaiExplanation: 'การนำงาน I/O ไปเข้าคิวพักไว้บนดิสก์ เช่น คิวงานพิมพ์ เพื่อรองรับอุปกรณ์ที่ไม่สามารถรันงานสลับไปมาพร้อมกันได้',
    category: 'Kernel & I/O',
    pdfPage: 34,
  }
];

export const week3Quizzes: QuizQuestion[] = [
  {
    id: 'w3-q1',
    weekId: 'week3',
    topic: 'I/O Architecture & DMA',
    question: 'An embedded device connected via a PCI Express bus needs to stream 4K video frames directly to physical RAM. If the system designer uses Programmed I/O where the CPU moves every byte, the CPU utilization spikes to 100%, causing the system to become unresponsive. Which hardware mechanism specifically eliminates this bottleneck by allowing autonomous block data transfers directly to memory?',
    thaiContext: 'โจทย์ Quiz ข้อ 1 Week 3: การแก้ไขปัญหา CPU utilization 100% จากการเคลื่อนย้ายบล็อกข้อมูลวิดีโอ 4K',
    pdfPage: 25,
    difficulty: 'medium',
    options: [
      {
        text: 'Vectored Interrupt Mechanism',
        isCorrect: false,
        explanation: 'Incorrect. Vectored interrupts dispatch execution to the correct Interrupt Service Routine (ISR) address, but do not move data bytes.'
      },
      {
        text: 'Direct Memory Access (DMA) Controller',
        isCorrect: true,
        explanation: 'Correct! A DMA Controller takes master control of the system memory bus to transfer high-speed contiguous blocks of data directly between the peripheral device and RAM without CPU intervention, freeing the processor for productive computation.'
      },
      {
        text: 'Memory Protection Registers',
        isCorrect: false,
        explanation: 'Incorrect. Base and limit registers enforce security boundaries, not bulk data transfer.'
      },
      {
        text: 'Polling Loop with High-Frequency Timer',
        isCorrect: false,
        explanation: 'Incorrect. Polling exacerbates the problem by locking the CPU in a 100% busy-waiting state.'
      }
    ]
  },
  {
    id: 'w3-q2',
    weekId: 'week3',
    topic: 'Interrupts vs Exceptions',
    question: 'Consider the differences between Interrupts, Exceptions, and System Calls. Which of the following statements correctly distinguishes their architectural behavior in a modern CPU?',
    thaiContext: 'โจทย์ Quiz ข้อ 2 Week 3: การจำแนกความแตกต่างระหว่าง Interrupt, Exception และ System Call',
    pdfPage: 23,
    difficulty: 'medium',
    options: [
      {
        text: 'Hardware Interrupts are synchronous events triggered by software bugs, whereas Traps are asynchronous signals from peripheral devices.',
        isCorrect: false,
        explanation: 'Incorrect. This reverses the definitions: Hardware Interrupts are asynchronous; Traps are synchronous.'
      },
      {
        text: 'Hardware Interrupts are asynchronous signals generated by external hardware (e.g. NIC or keyboard), while Traps/Exceptions are synchronous conditions generated internally by the CPU (e.g. divide-by-zero or system call instruction).',
        isCorrect: true,
        explanation: 'Correct! Hardware interrupts occur asynchronously at unpredictable intervals based on external device events. Traps/exceptions occur synchronously at precise instruction boundaries within the CPU instruction stream.'
      },
      {
        text: 'Traps cannot change CPU execution privilege from User Mode to Kernel Mode.',
        isCorrect: false,
        explanation: 'Incorrect. Traps (via system call instructions) are the primary standard gateway to elevate privilege into Kernel Mode.'
      },
      {
        text: 'Hardware Interrupts always bypass the Operating System kernel to execute inside user-space libraries directly.',
        isCorrect: false,
        explanation: 'Incorrect. Hardware interrupts always vector into kernel mode ISRs.'
      }
    ]
  },
  {
    id: 'w3-q3',
    weekId: 'week3',
    topic: 'Process Management & Context Switching',
    question: 'Why is the time consumed during a Context Switch between two processes considered "pure computational overhead" by operating system designers?',
    thaiContext: 'โจทย์ Quiz ข้อ 3 Week 3: เหตุใดเวลาที่เสียไปกับการสลับบริบท (Context Switch) จึงถือเป็น Pure Overhead?',
    pdfPage: 40,
    difficulty: 'easy',
    options: [
      {
        text: 'Because the CPU must erase all DRAM cells before switching processes.',
        isCorrect: false,
        explanation: 'Incorrect. Memory is not erased during context switching; page tables and protection bits prevent unauthorized access.'
      },
      {
        text: 'Because the CPU executes administrative register-saving and PCB state-restoring instructions during which zero productive user application work is performed.',
        isCorrect: true,
        explanation: 'Correct! During a context switch, the CPU saves register state into the outgoing PCB and restores the incoming PCB state. No user instructions advance during this period, representing pure administrative latency.'
      },
      {
        text: 'Because context switching can only occur when the computer is connected to a remote Cloud server.',
        isCorrect: false,
        explanation: 'Incorrect. Context switching occurs locally on single CPUs/cores.'
      },
      {
        text: 'Because all processes are permanently terminated whenever a context switch occurs.',
        isCorrect: false,
        explanation: 'Incorrect. Processes are simply paused and resumed later.'
      }
    ]
  },
  {
    id: 'w3-q4',
    weekId: 'week3',
    topic: 'CPU Scheduling & Convoy Effect',
    question: 'Three processes arrive at time 0 in the Ready Queue: P1 (burst time = 24 ms), P2 (burst time = 3 ms), and P3 (burst time = 3 ms). Under First-Come, First-Served (FCFS) scheduling in order P1 -> P2 -> P3, what is the Average Waiting Time, and what phenomenon is demonstrated?',
    thaiContext: 'โจทย์ Quiz ข้อ 4 Week 3: การคำนวณ Average Waiting Time ใน FCFS และปรากฏการณ์ Convoy Effect',
    pdfPage: 49,
    difficulty: 'hard',
    options: [
      {
        text: 'Average Waiting Time = 3 ms, demonstrating the Aging phenomenon.',
        isCorrect: false,
        explanation: 'Incorrect. 3 ms is the average waiting time if short jobs P2 and P3 run first, not when P1 runs first.'
      },
      {
        text: 'Average Waiting Time = 17 ms, demonstrating the Convoy Effect where short jobs wait behind a massive CPU-bound job.',
        isCorrect: true,
        explanation: 'Correct! Waiting times: P1 = 0 ms, P2 = 24 ms, P3 = 24 + 3 = 27 ms. Average Waiting Time = (0 + 24 + 27) / 3 = 51 / 3 = 17 ms. This high latency caused by short processes queuing behind a long CPU-bound process is the classic Convoy Effect.'
      },
      {
        text: 'Average Waiting Time = 30 ms, demonstrating Thrashing.',
        isCorrect: false,
        explanation: 'Incorrect. Thrashing relates to virtual memory paging, not CPU burst waiting times.'
      },
      {
        text: 'Average Waiting Time = 0 ms, because all processes execute concurrently in hardware registers.',
        isCorrect: false,
        explanation: 'Incorrect. FCFS on a single CPU core is strictly sequential.'
      }
    ]
  },
  {
    id: 'w3-q5',
    weekId: 'week3',
    topic: 'Round-Robin Time Quantum Trade-Off',
    question: 'In a Round-Robin (RR) CPU scheduling algorithm, what happens to system performance if the operating system configures the Time Quantum to be extremely small (e.g., 0.1 microseconds)?',
    thaiContext: 'โจทย์ Quiz ข้อ 5 Week 3: ผลกระทบเมื่อตั้งค่า Time Quantum เล็กเกินไปใน Round-Robin',
    pdfPage: 54,
    difficulty: 'medium',
    options: [
      {
        text: 'The scheduling algorithm becomes identical to non-preemptive First-Come, First-Served (FCFS).',
        isCorrect: false,
        explanation: 'Incorrect. RR becomes FCFS when the quantum is extremely large, not extremely small.'
      },
      {
        text: 'The CPU spends a disproportionate amount of time performing context switches, drastically reducing overall system throughput and wasting processor capacity.',
        isCorrect: true,
        explanation: 'Correct! If the quantum is minuscule, the context switch overhead approaches or exceeds the slice of actual user computation, causing massive performance degradation (thrashing).'
      },
      {
        text: 'The computer instantly runs out of physical DRAM memory and crashes.',
        isCorrect: false,
        explanation: 'Incorrect. Time slicing affects CPU registers and queues, not physical memory exhaustion.'
      },
      {
        text: 'The system achieves 100% computational efficiency with zero latency.',
        isCorrect: false,
        explanation: 'Incorrect. Hardware cannot switch contexts with zero latency.'
      }
    ]
  },
  {
    id: 'w3-q6',
    weekId: 'week3',
    topic: 'Priority Scheduling & Starvation',
    question: 'In a priority-based CPU scheduling system, low-priority background logging processes are left indefinitely in the ready queue without receiving CPU time because high-priority interactive web requests continuously arrive. What is this pathology called, and what standard algorithmic technique permanently resolves it?',
    thaiContext: 'โจทย์ Quiz ข้อ 6 Week 3: ภาวะ Starvation และการแก้ไขด้วยเทคนิค Aging',
    pdfPage: 51,
    difficulty: 'easy',
    options: [
      {
        text: 'Convoy Effect; resolved by increasing the time quantum.',
        isCorrect: false,
        explanation: 'Incorrect. The Convoy Effect occurs in FCFS; this scenario describes starvation in priority scheduling.'
      },
      {
        text: 'Starvation (Indefinite Blocking); resolved by Aging (gradually increasing the priority of processes that wait in the system for a long time).',
        isCorrect: true,
        explanation: 'Correct! Starvation occurs when low-priority processes are starved of CPU time. The universal remedy is Aging, which steadily increments the priority rank of waiting processes until they execute.'
      },
      {
        text: 'Deadlock; resolved by deleting the Operating System kernel.',
        isCorrect: false,
        explanation: 'Incorrect. Deadlock is circular waiting for resources; deleting the kernel destroys the system.'
      },
      {
        text: 'Page Fault; resolved by Spooling data onto flash memory.',
        isCorrect: false,
        explanation: 'Incorrect. Page faults are memory management events.'
      }
    ]
  },
  {
    id: 'w3-q7',
    weekId: 'week3',
    topic: 'Memory Management & Paging',
    question: 'In a paging memory system with a 4 KB page size, the CPU generates a 32-bit Logical Address. How is this address partitioned into the Page Number (p) and the Page Offset (d)?',
    thaiContext: 'โจทย์ Quiz ข้อ 7 Week 3: การแบ่งโครงสร้าง Logical Address เป็น Page Number และ Offset สำหรับขนาดหน้า 4 KB',
    pdfPage: 64,
    difficulty: 'hard',
    options: [
      {
        text: '16 bits for Page Number and 16 bits for Page Offset.',
        isCorrect: false,
        explanation: 'Incorrect. 16 bits offset would mean a 64 KB page size ($2^{16} = 65,536$).'
      },
      {
        text: '20 bits for Page Number (p) and 12 bits for Page Offset (d).',
        isCorrect: true,
        explanation: 'Correct! Since the page size is 4 KB = $4096\\text{ bytes} = 2^{12}\\text{ bytes}$, exactly 12 bits are required for the Offset ($d$). In a 32-bit address, the remaining $32 - 12 = 20\\text{ bits}$ represent the Page Number ($p$).'
      },
      {
        text: '8 bits for Page Number and 24 bits for Page Offset.',
        isCorrect: false,
        explanation: 'Incorrect. 24 bits offset corresponds to a 16 MB page size.'
      },
      {
        text: '31 bits for Page Number and 1 bit for Page Offset.',
        isCorrect: false,
        explanation: 'Incorrect. 1 bit offset corresponds to a 2-byte page size.'
      }
    ]
  },
  {
    id: 'w3-q8',
    weekId: 'week3',
    topic: 'TLB & Effective Memory Access Time',
    question: 'A computer system has a TLB lookup time of 20 nanoseconds and a main memory (RAM) access time of 100 nanoseconds. If the TLB hit ratio is 80% (0.80), what is the Effective Memory Access Time (EMAT)?',
    thaiContext: 'โจทย์ Quiz ข้อ 8 Week 3: การคำนวณ Effective Memory Access Time (EMAT) ด้วยสูตร TLB Hit/Miss',
    pdfPage: 69,
    difficulty: 'hard',
    options: [
      {
        text: '100 nanoseconds',
        isCorrect: false,
        explanation: 'Incorrect. 100 ns is the raw RAM access time without accounting for TLB or misses.'
      },
      {
        text: '120 nanoseconds',
        isCorrect: false,
        explanation: 'Incorrect. 120 ns is only the time on a TLB Hit ($20\\text{ ns TLB} + 100\\text{ ns RAM}$).'
      },
      {
        text: '140 nanoseconds',
        isCorrect: true,
        explanation: 'Correct! On TLB Hit (80%): $20 + 100 = 120\\text{ ns}$. On TLB Miss (20%): $20 + 100\\text{ (Page Table)} + 100\\text{ (Data)} = 220\\text{ ns}$. EMAT = $(0.80 \\times 120) + (0.20 \\times 220) = 96 + 44 = \\mathbf{140\\text{ ns}}$.'
      },
      {
        text: '220 nanoseconds',
        isCorrect: false,
        explanation: 'Incorrect. 220 ns is the time on a complete TLB Miss.'
      }
    ]
  }
];
