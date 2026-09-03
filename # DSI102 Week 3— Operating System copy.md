---
course_code: "DS1102"
course_title: "Introduction to Digital Technology"
module: "Week 3: Operating System (The Invisible Manager Behind Every Digital Device)"
instructor: "Dr. Nantapong Keandoungchun"
reference_textbook: "Operating System Concepts, 10th Edition (Silberschatz, Galvin & Gagne, 2018)"
target_audience: "International Program & Computer Science Undergraduates"
document_type: "Comprehensive Study Guide & Exam Prep Quiz"
prepared_by: "Bilingual Exam Coach"
language: "Bilingual (English / Thai)"
---

# Operating System: Comprehensive Study Guide & Exam Preparation (ระบบปฏิบัติการ: สรุปเนื้อหาเจาะลึกและแนวข้อสอบ)

ยินดีต้อนรับนักศึกษาทุกคนเข้าสู่สรุปบทเรียนและชุดเตรียมสอบวิชา **DS1102 Introduction to Digital Technology (Week 3: Operating System)** เนื้อหาชุดนี้ได้รับการสังเคราะห์และเรียบเรียงให้ครอบคลุมตามมาตรฐานตำราอ้างอิง *Operating System Concepts (Silberschatz et al.)* โดยเน้นเจาะลึกโครงสร้าง สถาปัตยกรรม กลไกการทำงานระดับฮาร์ดแวร์-เคอร์เนล และการคำนวณที่มักออกสอบในหลักสูตรนานาชาติ พร้อมคำศัพท์เทคนิคภาษาอังกฤษและคำอธิบายภาษาไทยอย่างละเอียด

---

## Key Concepts & Technical Vocabulary (คำศัพท์สำคัญและแนวคิดหลัก)

| Technical Term (ศัพท์เทคนิค) | Definition & Description (คำแปลและคำอธิบายภาษาไทย) | Exam Application / Context Example (ตัวอย่างการใช้งานในการสอบ) |
| :--- | :--- | :--- |
| **Operating System (OS)** | ซอฟต์แวร์ระบบที่เป็นตัวกลางเชื่อมระหว่างผู้ใช้ (User), โปรแกรมประยุกต์ (Applications) และฮาร์ดแวร์ (Hardware) ทำหน้าที่เป็นทั้ง **Resource Manager** (จัดสรรทรัพยากร) และ **Control System** (ควบคุมความปลอดภัย) | *Example:* When multiple apps request memory simultaneously, the OS arbitrates access to prevent system crashes. |
| **Interrupt** | สัญญาณฮาร์ดแวร์แบบอะซิงโครนัส (Asynchronous hardware signal) ที่ส่งไปยังซีพียูเพื่อแจ้งเตือนว่าเกิดเหตุการณ์ภายนอกที่ต้องการการประมวลผลทันที | *Example:* A keystroke on the keyboard fires an interrupt to wake up the OS interrupt handler. |
| **Trap / Exception** | สัญญาณขัดจังหวะแบบซิงโครนัสที่เกิดจากซอฟต์แวร์ภายใน (Synchronous software-generated interrupt) เช่น ข้อผิดพลาดจากการคำนวณ (Divide-by-zero) หรือการร้องขอบริการผ่าน System Call | *Example:* A process attempting to divide an integer by zero triggers an internal CPU exception. |
| **Direct Memory Access (DMA)** | วงจรควบคุมพิเศษที่ถ่ายโอนบล็อกข้อมูลระหว่างอุปกรณ์ I/O และหน่วยความจำหลัก (RAM) ได้โดยตรง โดยที่ซีพียูแทบไม่ต้องเข้ามายุ่งเกี่ยวกับไบต์ข้อมูล | *Example:* High-speed network cards use DMA to copy incoming network packets straight into RAM without burdening the CPU. |
| **Process Control Block (PCB)** | โครงสร้างข้อมูลในเคอร์เนลที่เก็บสถานะและบริบททั้งหมดของโพรเซส เช่น Program Counter (PC), รีจิสเตอร์, ข้อมูลสิทธิ์ และสถานะหน่วยความจำ | *Example:* During a context switch, the OS serializes the state of the active process into its PCB. |
| **Context Switching** | กระบวนการบันทึกสถานะของโพรเซสปัจจุบันลงใน PCB และโหลดสถานะของโพรเซสใหม่จาก PCB อีกตัวขึ้นสู่ซีพียู เพื่อสลับการทำงาน | *Example:* Context switching introduces pure computational overhead because the CPU performs administrative tasks rather than user work. |
| **Time Quantum** | ช่วงเวลาจำกัดคงที่ (Time slice) ที่ตัวจัดตารางซีพียูแบบ Round-Robin กำหนดให้แต่ละโพรเซสประมวลผลก่อนจะถูกแย่งการทำงาน (Preemption) | *Example:* If the time quantum is too small, excessive context switching degrades CPU throughput. |
| **Convoy Effect** | ปรากฏการณ์คอขวดในอัลกอริทึม FCFS ที่โพรเซสสั้นๆ (Short/I/O-bound processes) ต้องเข้าคิวรอโพรเซสขนาดใหญ่ที่ใช้เวลานาน (Long CPU-bound process) ตัวเดียว | *Example:* In FCFS scheduling, a 30 ms job running ahead of ten 1 ms jobs creates a severe convoy effect. |
| **Starvation & Aging** | สภาวะที่โพรเซสบุริมภาพต่ำถูกละเลยจนไม่ได้รัน (Starvation) แก้ไขโดยเทคนิค "Aging" ซึ่งทยอยเพิ่มบุริมภาพของโพรเซสตามระยะเวลาที่รออยู่ในคิว | *Example:* Priority scheduling algorithms implement aging to ensure low-priority background tasks eventually execute. |
| **Logical vs. Physical Address** | **Logical Address:** เลขที่อยู่เสมือนที่สร้างโดยซีพียูขณะประมวลผล<br>**Physical Address:** เลขที่อยู่จริงบนชิปหน่วยความจำ (RAM) ที่เข้าถึงผ่านบัส | *Example:* The CPU executes instructions using logical addresses, which the Memory Management Unit (MMU) translates into physical addresses. |
| **Translation Look-Aside Buffer (TLB)** | หน่วยความจำแคชความเร็วสูงระดับฮาร์ดแวร์ (Associative Cache) สำหรับเก็บคู่จับคู่ Page-to-Frame ล่าสุด เพื่อลดความล่าช้าในการเข้าถึงตารางหน้า (Page Table) | *Example:* A TLB hit allows single-cycle address translation, bypassing an extra read from main memory. |
| **Spooling (Simultaneous Peripheral Operations On-Line)** | การนำข้อมูล I/O ไปพักไว้ในคิวบนดิสก์ชั่วคราว เพื่อรองรับอุปกรณ์ที่ไม่สามารถทำงานร่วมกันพร้อมกันได้ (Dedicated/Sequential device) | *Example:* Multiple users sending documents to a shared office printer simultaneously rely on print spooling. |

---

## Core Content Summary (เนื้อหาเจาะลึกประจำบทเรียน)

### 1. Introduction to Operating Systems (บทนำสู่ระบบปฏิบัติการ)
* **What happens when you click an application? (เกิดอะไรขึ้นเมื่อคลิกเปิดแอปพลิเคชัน):**
  * การกระทำพื้นฐานของผู้ใช้ (User Action) จะเริ่มต้นจาก **User Input** (เช่น คลิกเมาส์) $\rightarrow$ ส่งคำขอ (Request) ไปยัง **Operating System (OS)** $\rightarrow$ OS เรียกใช้บริการระบบ (**System Services**) เพื่อจัดสรรหน่วยความจำและโหลดโค้ดจากที่เก็บข้อมูล (**Storage**) ขึ้นสู่ **RAM** $\rightarrow$ ส่งให้ซีพียู (**CPU**) ประมวลผล $\rightarrow$ แสดงผลลัพธ์ผ่านหน้าจอ (**Screen Output**)
* **The "No-OS" Dilemma (วิกฤตหากระบบไม่มี OS):**
  * หากไม่มี OS โปรแกรมประยุกต์แต่ละตัวจะต้องเขียนชุดคำสั่งควบคุมฮาร์ดแวร์โดยตรง (Direct Hardware Control) เช่น การเข้าถึง Disk, Keyboard, Network Controller ส่งผลให้เกิด:
    1. **Duplicated Code:** โค้ดควบคุมฮาร์ดแวร์ซ้ำซ้อนในทุกแอปพลิเคชัน
    2. **Resource Conflicts:** เกิดการแย่งชิงอุปกรณ์ระหว่างโปรแกรม
    3. **System Crashes:** เกิดข้อผิดพลาดร้ายแรงและระบบหยุดชะงักได้ง่าย
    4. **Security Risks:** ช่องโหว่ด้านความปลอดภัยจากการที่แอปพลิเคชันสามารถเขียนทับข้อมูลของแอปพลิเคชันอื่นได้โดยตรง
* **Roles of an OS (บทบาทสำคัญของ OS):**
  * **Interface:** แปลงฮาร์ดแวร์ที่ซับซ้อนให้เรียกใช้งานได้ง่ายผ่านส่วนบริการร่วม (Common Services)
  * **Resource Manager:** บริหารและจัดสรรเวลาการทำงานของซีพียู (CPU Time), ขนาดหน่วยความจำ (Memory Allocation), พื้นที่จัดเก็บ (Storage Space) และอุปกรณ์เชื่อมต่อ (Devices) อย่างเป็นธรรมและมีประสิทธิภาพ
  * **Control System:** ควบคุมความปลอดภัย (Protection) กำกับดูแลสิทธิ์ และป้องกันการขัดแย้งในการเข้าถึงทรัพยากร
* **OS Categorization by Environment (ประเภทของ OS ตามสภาพแวดล้อม):**
  * **Desktop / Laptop:** ออกแบบเพื่อการโต้ตอบทั่วไปที่ยืดหยุ่น (General-purpose interaction, Multi-tasking)
  * **Smartphone:** ปรับแต่งเน้นอินพุตแบบสัมผัส (Touch interface), เซนเซอร์หลากหลาย (Sensors) และการประหยัดพลังงานแบตเตอรี่ (Battery management)
  * **Server:** ให้ความสำคัญสูงสุดกับความน่าเชื่อถือ (Reliability) และการประมวลผลพร้อมกันในปริมาณมหาศาล (Concurrency/Throughput)
  * **Embedded / IoT:** สถาปัตยกรรมขนาดเล็กสำหรับควบคุมงานเฉพาะด้าน (Small footprint, Real-time constraints)

---

### 2. Handling Input/Output (การจัดการระบบนำเข้า/ส่งออกข้อมูล)
* **I/O Classification (การจำแนกประเภทอุปกรณ์ I/O):**
  * **Human Interface:** อุปกรณ์โต้ตอบกับมนุษย์ (Keyboard, Mouse, Touchscreen, Camera)
  * **Storage:** สื่อบันทึกข้อมูลถาวร (SSD, HDD, USB Flash Drive)
  * **Communication:** อุปกรณ์เครือข่ายและการสื่อสาร (Wi-Fi, Ethernet, Bluetooth)
* **Hardware Interconnection (โครงสร้างการเชื่อมต่อฮาร์ดแวร์):**
  * อุปกรณ์สื่อสารกันผ่าน **Ports** (จุดเชื่อมต่อ), **Controllers** (ชิปควบคุมเฉพาะของอุปกรณ์) และ **Shared Bus** (เส้นทางสัญญาณร่วมกัน เช่น PCI-e, System Bus)
* **Layered I/O Architecture (สถาปัตยกรรม I/O แบบแบ่งชั้น):**
  $$\text{Application} \xrightarrow{\text{System Call}} \text{Kernel I/O Subsystem} \xrightarrow{} \text{Device Driver} \xrightarrow{} \text{Device Controller / Hardware}$$
  * **Device Driver as a Translator:** ทำหน้าที่เป็นตัวแปลคำสั่งสากลจาก OS (Generic Requests) ให้กลายเป็นคำสั่งจำเพาะของฮาร์ดแวร์นั้นๆ (Device-specific instructions) ช่วยซ่อนความแตกต่างของฮาร์ดแวร์ (Hardware Abstraction)
* **Polling vs. Interrupt-Driven I/O:**
  * **Polling (Busy-Waiting):** ซีพียูต้องวนลูปตรวจสอบสถานะของอุปกรณ์ตลอดเวลา ("Are you ready?") ทำให้สูญเสียวงรอบซีพียู (CPU cycles) ไปโดยเปล่าประโยชน์
  * **Interrupt-Driven:** อุปกรณ์จะส่งสัญญาณฮาร์ดแวร์ (Interrupt Request: IRQ) มายังซีพียูเฉพาะเมื่อต้องการบริการ ซีพียูจึงสามารถทำงานอื่นรอได้
* **The Detailed Interrupt Workflow (ขั้นตอนการเกิดและประมวลผล Interrupt):**
  1. ซีพียูกำลังประมวลผลโปรแกรมตามปกติ
  2. อุปกรณ์สร้างสัญญาณขัดจังหวะ (Device generates interrupt)
  3. ซีพียูบันทึกบริบทการทำงานปัจจุบัน (Saves current context: PC, Registers) ลงในสแตกเคอร์เนล
  4. ตัวจัดการสัญญาณขัดจังหวะทำงาน (**Interrupt Handler / Interrupt Service Routine (ISR)** processes event)
  5. ซีพียูคืนสภาพการทำงานเดิม (Return from interrupt)
  6. โปรแกรมเดิมกลับมาทำงานต่อได้อย่างราบรื่น (Program resumes)
* **Comparison: Interrupt vs. Exception vs. System Call:**
  * **Interrupt:** เกิดจากฮาร์ดแวร์ภายนอก (External hardware event) แบบ Asynchronous เช่น คีย์บอร์ดถูกกด, แพ็กเก็ตเครือข่ายส่งถึงการ์ดแลน
  * **Exception:** เกิดจากข้อผิดพลาดภายในคำสั่งของโปรแกรม (Internal execution condition) แบบ Synchronous เช่น Page Fault, Division by zero
  * **System Call (Trap):** เกิดจากการที่โปรแกรมในระดับ User Mode ร้องขอบริการที่มีสิทธิ์สูงจาก Kernel Mode ผ่านซอฟต์แวร์ เช่น `read()`, `write()`, `open()`
* **Direct Memory Access (DMA):**
  * **The Problem:** การโอนย้ายข้อมูลขนาดใหญ่ (Large blocks of data) ทีละไบต์ผ่านซีพียู (Programmed I/O) ทำให้ซีพียูรับภาระหนักเกินไป (CPU overloaded)
  * **The Solution:** ใช้ **DMA Controller** ทำหน้าที่ควบคุมการถ่ายโอนบล็อกข้อมูลระหว่างอุปกรณ์ I/O กับ RAM โดยตรง ซีพียูเพียงแค่ส่งคำสั่งเริ่มต้น (Base address, Byte count, I/O direction) แล้วปล่อยให้ DMA ทำงาน ซีพียูจึงสามารถสลับไปทำงานอื่นได้
  * **The 6-Step DMA Lifecycle:**
    1. แอปพลิเคชันร้องขอการโอนย้ายข้อมูล (Request transfer)
    2. OS จัดทำบล็อกคำสั่ง (OS creates command block)
    3. ตัวควบคุม DMA รับคำสั่ง (DMA controller receives command)
    4. DMA ย้ายข้อมูลระหว่างอุปกรณ์กับแรมโดยตรง (Controller moves bytes over bus)
    5. เมื่อย้ายเสร็จ DMA ส่งสัญญาณ Interrupt แจ้งซีพียู (Interrupt signals completion)
    6. ซีพียูเข้าเคลียร์สถานะและจัดการผลลัพธ์ (CPU handles completion)

---

### 3. Inside the Kernel I/O Subsystem (โครงสร้างภายในระบบย่อยเคอร์เนล I/O)
* **Core I/O Services (บริการหลักของระบบย่อย I/O):**
  * **Caching:** การสำเนาข้อมูลที่ใช้งานบ่อยไว้ในหน่วยความจำความเร็วสูง เพื่อลดเวลาการเข้าถึงข้อมูลซ้ำ
  * **Buffering:** พื้นที่พักข้อมูลชั่วคราวใน RAM เพื่อประสานความเร็วที่แตกต่างกันระหว่างตัวส่ง (Producer) และตัวรับ (Consumer) เช่น เครือข่ายความเร็วต่ำกับแรมความเร็วสูง
  * **Spooling (Simultaneous Peripheral Operations On-Line):** คิวสำหรับอุปกรณ์แบบจำกัดการเข้าถึงทีละหนึ่งงาน (Dedicated devices เช่น เครื่องพิมพ์) โดยระบบจะเขียนงานพิมพ์ลงไฟล์ดิสก์ก่อน แล้วจึงทยอยส่งออกเครื่องพิมพ์ตามลำดับ
* **Error Handling (การจัดการข้อผิดพลาด):**
  * เคอร์เนลมีกลไก: **Detect** (ตรวจจับความผิดพลาด) $\rightarrow$ **Retry** (ลองส่ง/อ่านซ้ำตามเกณฑ์ที่กำหนด) $\rightarrow$ **Report** (แจ้งเตือนรหัสข้อผิดพลาดแก่แอปพลิเคชัน) $\rightarrow$ **Log** (บันทึกเหตุการณ์ลง System Logs)
* **I/O Protection & Dual-Mode Operation:**
  * สถาปัตยกรรมซีพียูแบ่งโหมดการทำงานออกเป็น **User Mode** และ **Kernel Mode (Privileged Mode)**
  * คำสั่งเข้าถึงฮาร์ดแวร์ I/O จัดเป็น **Privileged Instructions** ไม่อนุญาตให้แอปพลิเคชันใน User Mode เรียกใช้โดยตรงเด็ดขาด ต้องผ่าน **System Call** เพื่อสลับโหมดเข้าไปให้เคอร์เนลดำเนินการแทนเสมอ ป้องกันไม่ให้แอปพลิเคชันเข้าควบคุมหรือสร้างความเสียหายต่อระบบ

---

### 4. Process Management & Multithreading (การจัดการโพรเซสและมัลติเธรด)
* **Program vs. Process:**
  * **Program:** ชุดคำสั่งที่ไม่เคลื่อนไหว (Passive entity) จัดเก็บอยู่บนดิสก์ในรูปของไฟล์ Executable (เช่น `.exe`)
  * **Process:** โปรแกรมที่กำลังถูกประมวลผล (Active entity) โหลดอยู่ในหน่วยความจำ พร้อมโครงสร้างทรัพยากรครบถ้วน
* **Process Memory Layout (โครงสร้างหน่วยความจำของโพรเซส):**
  * **Text / Code Segment:** เก็บชุดคำสั่งไบนารีของโปรแกรม (Read-only)
  * **Data Segment:** เก็บตัวแปรส่วนกลาง (Global variables) และตัวแปรคงที่ (Static variables)
  * **Heap Segment:** หน่วยความจำที่จัดสรรแบบไดนามิกระหว่างรันไทม์ (Dynamic memory allocation เช่น คำสั่ง `malloc()` หรือ `new`) โดยขนาดจะขยายตัวขึ้นด้านบน
  * **Stack Segment:** เก็บข้อมูลชั่วคราวสำหรับฟังก์ชัน (Local variables, Parameters, Return addresses) โดยขนาดจะขยายตัวลงด้านล่าง
  * **Process State & Registers:** บันทึกผ่าน **Program Counter (PC)** (ชี้คำสั่งถัดไปที่จะรัน) และ **CPU Registers**
* **The 5-State Process Model (แบบจำลอง 5 สถานะของโพรเซส):**
  * **New:** โพรเซสกำลังถูกสร้างขึ้นในระบบ
  * **Ready:** โพรเซสโหลดอยู่ใน RAM และพร้อมรับการจัดสรรซีพียู (Waiting for CPU allocation)
  * **Running:** คำสั่งของโพรเซสกำลังถูกประมวลผลบนแกนซีพียู (Instructions executing)
  * **Waiting (Blocked):** โพรเซสหยุดรอเหตุการณ์บางอย่าง (เช่น รอ I/O เสร็จสิ้น หรือรอสัญญาณ IPC)
  * **Terminated:** โพรเซสทำงานเสร็จสมบูรณ์และรอการคืนทรัพยากร
* **State Transitions (การเปลี่ยนสถานะ):**
  * $\text{New} \xrightarrow{\text{admitted}} \text{Ready}$
  * $\text{Ready} \xrightarrow{\text{scheduler dispatch}} \text{Running}$
  * $\text{Running} \xrightarrow{\text{interrupt / quantum expired}} \text{Ready}$
  * $\text{Running} \xrightarrow{\text{I/O or event wait}} \text{Waiting}$
  * $\text{Waiting} \xrightarrow{\text{I/O or event completion}} \text{Ready}$ *(จำข้อนี้ให้ดี: โพรเซสที่รอ I/O เสร็จแล้วจะไม่กลับไป Running ทันที แต่ต้องเข้าคิว Ready ก่อน)*
  * $\text{Running} \xrightarrow{\text{exit}} \text{Terminated}$
* **Process Control Block (PCB):**
  * กล่องเก็บข้อมูลสถานะของโพรเซส ได้แก่: Process State, Program Counter (PC), CPU Registers, CPU-Scheduling Information (Priority), Memory-Management Information (Base/Limit, Page Tables), Accounting Information (CPU time used), และ I/O Status Information (List of open files/allocated devices)
* **Context Switching Mechanisms:**
  * เมื่อเกิด Interrupt หรือ System Call ระบบจะสลับการทำงานจาก Process $P_0$ ไปยัง $P_1$:
    1. บันทึกสถานะปัจจุบันของ $P_0$ ลงใน $\text{PCB}_0$
    2. โหลดสถานะที่เคยบันทึกไว้ของ $P_1$ จาก $\text{PCB}_1$ ขึ้นสู่รีจิสเตอร์ของซีพียู
    3. ระหว่างการสลับ ซีพียูจะไม่สามารถประมวลผลงานที่เป็นประโยชน์ของผู้ใช้ได้ (ถือเป็น **System Overhead**)
* **Interprocess Communication (IPC):**
  * เกิดขึ้นเมื่อมี **Cooperating Processes** (โพรเซสที่ต้องส่งต่อข้อมูลหรือแบ่งปันงานร่วมกัน) เพื่อวัตถุประสงค์: Information sharing, Computation speedup, Modularity, และ Convenience
  * **Two IPC Models:**
    1. **Shared Memory:** กำหนดพื้นที่หน่วยความจำร่วมกัน โพรเซสสามารถอ่าน/เขียนได้โดยตรง มีความเร็วสูงมาก แต่ต้องจัดการการประสานจังหวะการเขียน (Synchronization) เองเพื่อหลีกเลี่ยง Race Condition
    2. **Message Passing:** สื่อสารผ่านการส่งข้อความ (`send()`, `receive()`) โดยมี Kernel Message Queue เป็นตัวกลาง ปลอดภัย เหมาะสำหรับระบบแบบกระจาย (Distributed Systems) แต่มีความเร็วช้ากว่าเนื่องจากต้องสลับเข้าสู่เคอร์เนล
* **Single vs. Multithreaded Processes:**
  * **Thread:** หน่วยการใช้งานซีพียูที่เล็กที่สุดภายในโพรเซส (Lightweight process)
  * **Shared among threads:** สมาชิกเธรดในโพรเซสเดียวกันจะแบ่งปัน **Code Segment**, **Data Segment**, และ **Open Files / OS Resources** ร่วมกัน
  * **Private per thread:** แต่ละเธรดมี **Program Counter (PC)**, **Stack**, และชุดของ **CPU Registers** เป็นของตนเอง
* **Concurrency vs. Parallelism:**
  * **Concurrency:** ระบบสามารถรองรับมากกว่าหนึ่งงานให้มีความคืบหน้าพร้อมๆ กัน (Making progress) สามารถเกิดขึ้นได้บนซีพียูแกนเดี่ยว (Single-core) ผ่านการสลับเวลา (Time-slicing / Scheduling)
  * **Parallelism:** ระบบสามารถประมวลผลมากกว่าหนึ่งงานพร้อมกันได้ในเสี้ยววินาทีเดียวกัน (Simultaneous execution) ต้องใช้สถาปัตยกรรมแบบ **Multi-core** หรือ **Multiprocessor** เท่านั้น
  * **Types of Parallelism:**
    * **Data Parallelism:** แบ่งชุดข้อมูลเดียวกันออกเป็นส่วนย่อย แล้วส่งให้แต่ละ Core ประมวลผลด้วยฟังก์ชันเดียวกัน (เช่น การคำนวณ Array ขนาดใหญ่)
    * **Task Parallelism:** กระจายชุดงานหรือเธรดที่ทำหน้าที่ต่างกันอย่างเป็นเอกเทศไปยังแต่ละ Core
* **User Threads vs. Kernel Threads:**
  * **User Threads:** จัดการโดยไลบรารีระดับผู้ใช้ (User-level thread library เช่น POSIX Pthreads, Windows threads, Java threads) การสร้างและสลับเธรดทำได้รวดเร็วโดยไม่ต้องเรียกเคอร์เนล แต่หากเธรดหนึ่งบล็อกเนื่องจาก I/O อาจทำให้ทั้งโพรเซสถูกบล็อกตามไปด้วย
  * **Kernel Threads:** ได้รับการสนับสนุนและจัดการโดยตรงจาก OS Kernel (เช่น Windows, Linux, macOS) จัดการการกระจายงานลง Core ต่างๆ ได้ดีกว่า
  * **Multithreading Models:**
    * **One-to-One:** จับคู่ 1 User Thread กับ 1 Kernel Thread (เป็นที่นิยมสูงสุดใน OS ปัจจุบัน เช่น Windows, Linux) รองรับ Concurrency สูง แต่สร้างเธรดได้จำกัดเนื่องจากกินทรัพยากรเคอร์เนล
    * **Many-to-One:** รวมหลาย User Threads ไปยัง 1 Kernel Thread หากเธรดหนึ่งบล็อก ทุกเธรดจะหยุดชะงัก และไม่สามารถรันข้ามหลาย Core พร้อมกันได้
    * **Many-to-Many:** ผสมผสานความยืดหยุ่น โดยจับกลุ่ม User Threads หลายตัวเข้ากับ Kernel Threads ในจำนวนที่เหมาะสม

---

### 5. CPU Scheduling (การจัดตารางเวลาการใช้ซีพียู)
* **The CPU Scheduler & Ready Queue:**
  * ทำหน้าที่คัดเลือกโพรเซสที่อยู่ใน **Ready Queue** และจัดสรรแกนประมวลผล (CPU Core) ให้
* **Scheduling Criteria (เกณฑ์วัดประสิทธิภาพการจัดตาราง):**
  * **CPU Utilization:** อัตราการใช้งานซีพียูให้เกิดประโยชน์สูงสุด (Keep CPU as busy as possible) $\rightarrow$ ควรมีค่าสูง
  * **Throughput:** จำนวนโพรเซสที่ทำงานเสร็จสิ้นต่อหนึ่งหน่วยเวลา $\rightarrow$ ควรมีค่าสูง
  * **Turnaround Time:** เวลารวมตั้งแต่โพรเซสเข้าสู่ระบบจนกระทั่งประมวลผลเสร็จสิ้น ($\text{Submission} \rightarrow \text{Termination}$) $\rightarrow$ ควรมีค่าน้อย
  * **Waiting Time:** เวลารวมทั้งหมดที่โพรเซสต้องใช้ไปกับการนั่งรออยู่ใน Ready Queue $\rightarrow$ ควรมีค่าน้อย
  * **Response Time:** เวลาตั้งแต่ส่งคำขอจนกระทั่งระบบเริ่มแสดงการตอบสนองแรก (สำคัญที่สุดใน Interactive Systems) $\rightarrow$ ควรมีค่าน้อย
* **Classical Scheduling Algorithms (อัลกอริทึมการจัดตารางเวลาคลาสสิก):**
  1. **First-Come, First-Served (FCFS):**
     * บริหารงานตามลำดับการมาถึงก่อน-หลัง (Non-preemptive)
     * *ข้อดี:* โครงสร้างเรียบง่าย เข้าใจง่าย
     * *ข้อจำกัด:* เกิดปรากฏการณ์ **Convoy Effect** หากโพรเซสแรกใช้เวลาประมวลผลยาวนานมาก จะดึงให้ค่าเฉลี่ยเวลาการรอคอย (Average Waiting Time) สูงขึ้นอย่างมหาศาล
  2. **Shortest-Job-First (SJF):**
     * คัดเลือกโพรเซสที่มีช่วงเวลาการใช้ซีพียูครั้งถัดไปสั้นที่สุด (**Shortest Next CPU Burst**) มาทำงานก่อน
     * *ข้อดี:* ให้ค่าเฉลี่ยเวลาการรอคอยต่ำที่สุดตามหลักการทางทฤษฎี (**Optimal Average Waiting Time**)
     * *ข้อจำกัด:* ในทางปฏิบัติ OS ไม่สามารถล่วงรู้ระยะเวลา CPU burst ในอนาคตได้อย่างแม่นยำ ต้องอาศัยการประมาณการทางสถิติ (Exponential Smoothing)
  3. **Priority Scheduling:**
     * จัดสรรซีพียูให้โพรเซสที่มีระดับความสำคัญ (Priority Value) สูงสุดก่อน
     * *ข้อจำกัด:* เสี่ยงต่อปัญหา **Starvation (Indefinite Blocking)** สำหรับโพรเซสที่บุริมภาพต่ำ
     * *ทางแก้ไข:* ใช้กลไก **Aging** ทยอยเพิ่มบุริมภาพของโพรเซสที่รออยู่ในคิวเป็นเวลานาน
  4. **Round Robin (RR):**
     * ออกแบบมาสำหรับระบบโต้ตอบ (Interactive Systems) แต่ละโพรเซสจะได้รับสิทธิ์ทำงานเท่ากับช่วงเวลาหนึ่งที่เรียกว่า **Time Quantum (q)** (โดยทั่วไปประมาณ 10-100 มิลลิวินาที)
     * หากโพรเซสรันจนหมด Time Quantum จะถูกแย่งสิทธิ์ (Preempted) แล้วนำกลับไปต่อท้าย Ready Queue
     * *ข้อดี:* ไม่เกิด Starvation มี Response Time ที่ยอดเยี่ยม
     * *ข้อจำกัด:* หากกำหนด $q$ เล็กเกินไป จะเกิด Overhead จาก Context Switching มหาศาล แต่หากกำหนด $q$ ใหญ่เกินไป พฤติกรรมจะถดถอยกลายเป็น FCFS
  5. **Multilevel Queue (MLQ):**
     * แบ่ง Ready Queue ออกเป็นหลายคิวตามระดับความสำคัญและลักษณะงาน เช่น:
       $$\text{Real-time processes (สูงสุด)} > \text{System processes} > \text{Interactive processes} > \text{Batch processes (ต่ำสุด)}$$
     * แต่ละคิวสามารถใช้อัลกอริทึมการจัดตารางที่แตกต่างกันได้ (เช่น คิว Interactive ใช้ Round Robin ส่วนคิว Batch ใช้ FCFS)

---

### 6. Memory Management & Paging (การจัดการหน่วยความจำหลักและการแบ่งหน้า)
* **The Memory Challenge:**
  * RAM ต้องได้รับการจัดสรร (Allocate), ติดตามสถานะ (Track), ป้องกันการล่วงล้ำ (Protect) และคืนทรัพยากร (Release) อย่างรัดกุม
* **Logical vs. Physical Address Space:**
  * **Logical Address (Virtual Address):** เลขที่อยู่ที่สร้างขึ้นโดยซีพียูขณะรันโค้ด
  * **Physical Address:** เลขที่อยู่จริงของตำแหน่งข้อมูลในชิปหน่วยความจำหลัก (RAM)
  * **Memory Management Unit (MMU):** ชิปฮาร์ดแวร์ที่ทำหน้าที่แปลง Logical Address ไปเป็น Physical Address แบบเรียลไทม์ โดยใช้ **Relocation Register**:
    $$\text{Physical Address} = \text{Logical Address} + \text{Relocation Register Value}$$
* **Contiguous Allocation vs. Paging:**
  * **Contiguous Allocation:** โปรแกรมต้องจองพื้นที่แรมเป็นก้อนแถบยาวติดต่อกัน โดยใช้รีจิสเตอร์ **Base** (จุดเริ่มต้น) และ **Limit** (ขนาดขอบเขต) ในการป้องกันหน่วยความจำ เกิดปัญหาเศษส่วนภายนอก (External Fragmentation)
  * **Paging (การแบ่งหน้า):** สถาปัตยกรรมที่ยินยอมให้พื้นที่ทางกายภาพของโพรเซสกระจายตัวอยู่แบบไม่ต่อเนื่องกัน (Non-contiguous physical memory)
    * หน่วยความจำเชิงตรรกะ (Logical Memory) ถูกแบ่งเป็นบล็อกขนาดคงที่ เรียกว่า **Page**
    * หน่วยความจำกายภาพ (Physical Memory) ถูกแบ่งเป็นบล็อกขนาดคงที่เท่ากัน เรียกว่า **Frame**
* **The Address Translation Architecture in Paging:**
  * Logical Address ความกว้าง $m$ บิต แบ่งออกเป็นสองส่วน:
    1. **Page Number ($p$):** ขนาด $m - n$ บิต ใช้เป็นดัชนี (Index) ชี้ตำแหน่งใน **Page Table** เพื่อหาหมายเลขเฟรมกายภาพ ($f$)
    2. **Page Offset ($d$):** ขนาด $n$ บิต ชี้ตำแหน่งออฟเซตภายในหน้า ซึ่งจะมีขนาดเท่ากับขนาดของเพจ ($2^n$ ไบต์) โดยค่า $d$ จะไม่เปลี่ยนแปลงเมื่อแปลงเป็น Physical Address
  * $\text{Logical Address} = [p, d] \xrightarrow{\text{Page Table Translation}} \text{Physical Address} = [f, d]$
* **Translation Look-Aside Buffer (TLB):**
  * หากต้องอ่าน Page Table จาก RAM ทุกครั้ง การเข้าถึงข้อมูล 1 ตัวจะต้องเข้าถึงแรมถึง 2 รอบ (รอบแรกอ่าน Page Table, รอบสองอ่านข้อมูลจริง)
  * **TLB Solution:** แคชความเร็วสูงระดับฮาร์ดแวร์ บันทึกคู่ $[p \rightarrow f]$ ที่เข้าถึงบ่อย:
    * **TLB Hit:** พบข้อมูลใน TLB สามารถสร้าง Physical Address ได้ทันที
    * **TLB Miss:** ไม่พบข้อมูลใน TLB ต้องไปอ่าน Page Table ในแรม แล้วนำคู่นั้นมาอัปเดตลงใน TLB
  * **Address-Space Identifier (ASID):** ระบุรหัสโพรเซสลงในแต่ละ Entry ของ TLB เพื่อให้สามารถเก็บการจับคู่ของหลายโพรเซสพร้อมกันได้โดยไม่ต้องล้างแคชทิ้งทั้งหมด (Flush) เมื่อเกิด Context Switch
* **Memory Protection Mechanisms:**
  * **Protection Bits:** บิตกำกับสิทธิ์การเข้าถึงแต่ละเฟรม เช่น Read-only, Read-Write, หรือ Execute-only
  * **Valid / Invalid Bit:** บิตใน Page Table บ่งบอกสถานะ:
    * **Valid ($v$):** หน้านั้นอยู่ใน Logical Address Space ที่ถูกต้องตามกฎหมายของโพรเซส
    * **Invalid ($i$):** หน้านั้นไม่ได้อยู่ในขอบเขตสิทธิ์ของโพรเซส หากมีการพยายามเข้าถึงจะเกิด Hardware Trap (Segmentation Fault / Page Fault)
* **Swapping:**
  * การย้ายโพรเซส (หรือบางเพจ) ออกจาก RAM ชั่วคราวไปยังพื้นที่จัดเก็บสำรอง (**Backing Store** เช่น ดิสก์ หรือ Swap space) และดึงกลับเข้ามาใหม่เมื่อต้องการประมวลผลต่อ ช่วยให้ระบบรันโพรเซสที่มีขนาดหน่วยความจำรวมเกินกว่าขนาดแรมจริงได้

---

### 7. File-System Abstraction (ระบบการจัดการไฟล์)
* **What is a File? (นิยามของไฟล์):**
  * นามธรรมที่ระบบปฏิบัติการสร้างขึ้นเพื่อครอบคลุมชุดข้อมูลไบนารีที่บันทึกอยู่บนสื่อจัดเก็บถาวร (OS abstraction over stored bytes)
  * **File Attributes:** Name (ชื่อไฟล์), Type (ชนิด/นามสกุล), Location (ตำแหน่งบนดิสก์), Size (ขนาด), Protection (สิทธิ์การเข้าถึง), Time/Date/Owner (ข้อมูลวันเวลาและเจ้าของ)
* **File Operations & Internal Tracking:**
  * คำสั่งพื้นฐาน: **Create**, **Open**, **Read**, **Write**, **Seek** (เลื่อนตัวชี้ตำแหน่งไฟล์), **Close**, และ **Delete**
  * **Open-File Table:** โครงสร้างข้อมูลระดับเคอร์เนลที่คอยบันทึกสถานะของไฟล์ทั้งหมดที่กำลังถูกเปิดใช้งานอยู่ในระบบ
  * **File Pointer:** ตัวชี้ตำแหน่งไบต์ปัจจุบันสำหรับการอ่านหรือเขียนครั้งถัดไป
* **Common File Systems across Operating Systems:**
  * **Microsoft Windows:** FAT (File Allocation Table), FAT32, NTFS (New Technology File System)
  * **Linux:** Ext2, Ext3, Ext4
  * **macOS:** HFS (Hierarchical File System), HFS+, APFS (Apple File System)

---

## Multiple-Choice Exam Preparation Quiz (แบบทดสอบจำลองข้อสอบจริง)

ชุดข้อสอบ 8 ข้อนี้สร้างขึ้นเป็นภาษาอังกฤษล้วนตามมาตรฐานข้อสอบหลักสูตรนานาชาติ พร้อมเฉลยและคำอธิบายเจาะลึกภาษาไทย

---

### Question 1
An embedded device connected via a PCI Express bus needs to stream 4K video frames directly to physical RAM. If the system designer uses Programmed I/O where the CPU moves every byte, the CPU utilization spikes to 100%, causing the system to become unresponsive. Which hardware mechanism specifically eliminates this bottleneck by allowing autonomous block data transfers directly to memory?

A. Vectored Interrupt Mechanism  
B. Direct Memory Access (DMA) Controller  
C. Memory Protection Registers  
D. Polling Loop with High-Frequency Timer  

> **Answer:** **B**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ B ถูกต้อง:** **Direct Memory Access (DMA)** ถูกออกแบบมาเพื่อแก้ปัญหาคอขวดของการย้ายข้อมูลบล็อกขนาดใหญ่ (Large data problem) โดยอนุญาตให้อุปกรณ์ I/O แลกเปลี่ยนข้อมูลกับแรมได้โดยตรง ซีพียูมีหน้าที่เพียงแค่สั่งเริ่มงานและรับทราบเมื่อเสร็จสิ้นผ่านสัญญาณ Interrupt  
> * **ข้อ A ผิด:** Vectored Interrupt เป็นเพียงกลไกส่งสัญญาณแจ้งที่อยู่ของตัวจัดการขัดจังหวะ (ISR) แต่ไม่ได้ช่วยเคลื่อนย้ายไบต์ข้อมูล  
> * **ข้อ C ผิด:** Memory Protection Registers (Base/Limit) ทำหน้าที่ควบคุมความปลอดภัยและขอบเขตหน่วยความจำ ไม่เกี่ยวกับการย้ายข้อมูล  
> * **ข้อ D ผิด:** Polling Loop ยิ่งทำให้ซีพียูต้องเสียเวลาตรวจสอบสถานะตลอดเวลา (Busy-waiting) ซึ่งยิ่งทำให้ค่า CPU utilization แย่ลง

---

### Question 2
Consider the differences between Interrupts, Exceptions, and System Calls. Which of the following events represents a hardware-generated asynchronous event?

A. An executing instruction attempts to divide a floating-point number by zero.  
B. A running user process executes a trap instruction to invoke the `read()` function.  
C. A network interface card (NIC) signals the CPU that an incoming Ethernet frame has arrived.  
D. The CPU attempts to fetch an instruction from an invalid memory address, causing a page fault.  

> **Answer:** **C**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ C ถูกต้อง:** สัญญาณจากการ์ดเครือข่าย (NIC) เป็น **Hardware Interrupt** แท้จริง ซึ่งเกิดขึ้นจากอุปกรณ์ภายนอกแบบอะซิงโครนัส (Asynchronous) โดยไม่ขึ้นกับจังหวะของชุดคำสั่งที่ซีพียูกำลังประมวลผลอยู่  
> * **ข้อ A ผิด:** การหารด้วยศูนย์ (Divide-by-zero) เกิดจากข้อผิดพลาดภายในคำสั่งของโปรแกรม จึงจัดเป็น **Exception (Synchronous)**  
> * **ข้อ B ผิด:** การเรียก `read()` เป็นการร้องขอบริการเคอร์เนลผ่านคำสั่ง Trap/Software Interrupt จัดเป็น **System Call**  
> * **ข้อ D ผิด:** Page fault เกิดจากฮาร์ดแวร์ MMU ตรวจพบความผิดพลาดในการเข้าถึงแอดเดรสของคำสั่งปัจจุบัน จัดเป็น **Exception**

---

### Question 3
In a standard five-state process execution model, a process transitions from the **Waiting** state to the **Ready** state when which of the following occurs?

A. The CPU scheduler selects the process for dispatching.  
B. The time quantum assigned to the running process expires.  
C. The process issues a blocking I/O system call.  
D. The asynchronous I/O operation or external event it was waiting for completes.  

> **Answer:** **D**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ D ถูกต้อง:** เมื่อเหตุการณ์ I/O หรือสัญญาณภายนอกที่โพรเซสกำลังรอคอยเสร็จสมบูรณ์ (I/O or event completion) โพรเซสจะถูกย้ายจากสถานะ **Waiting** กลับไปสู่ **Ready** เพื่อรอคิวให้ซีพียูเรียกทำงาน  
> * **ข้อ A ผิด:** การจัดสรรซีพียู (Scheduler dispatch) คือการเปลี่ยนสถานะจาก **Ready $\rightarrow$ Running**  
> * **ข้อ B ผิด:** การหมดเวลา Time Quantum ในอัลกอริทึม Round Robin คือการสลับจาก **Running $\rightarrow$ Ready**  
> * **ข้อ C ผิด:** การเรียก Blocking I/O คือการเปลี่ยนสถานะจาก **Running $\rightarrow$ Waiting**

---

### Question 4
When comparing Single-Threaded and Multithreaded process architectures, which components are uniquely private to each individual thread rather than shared among all threads in the same process?

A. Heap segment and Open-file descriptors  
B. Global variables in the Data segment  
C. Program Counter (PC), CPU Registers, and Stack  
D. Text/Code instructions and Static data  

> **Answer:** **C**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ C ถูกต้อง:** สิ่งที่แต่ละเธรดต้องมีแยกเฉพาะเป็นอิสระต่อกัน (Per-thread state) ได้แก่ **Program Counter (PC)** (เพื่อจำว่าตัวเองรันถึงคำสั่งไหน), **CPU Registers** (เก็บค่าคำนวณชั่วคราว), และ **Stack** (เก็บ Local variables และ Call frames ของฟังก์ชันตนเอง)  
> * **ข้อ A, B และ D ผิด:** ทั้ง Code Segment, Data Segment (ตัวแปร Global), Heap (หน่วยความจำไดนามิก) และ Open Files ล้วนเป็นทรัพยากรส่วนกลางที่ทุกเธรดในโพรเซสเดียวกัน **แชร์ร่วมกัน (Shared)**

---

### Question 5
Suppose five processes arrive at time 0 with CPU burst lengths of 24 ms, 3 ms, 3 ms, 2 ms, and 1 ms, respectively. If the operating system schedules these processes strictly using First-Come, First-Served (FCFS) in the order of arrival ($P_1, P_2, P_3, P_4, P_5$), what undesirable phenomenon occurs, and what is its primary consequence?

A. Priority Inversion, causing the system to deadlock.  
B. Starvation of the lowest-priority process due to aging failure.  
C. Thrashing, causing excessive page swapping to the backing store.  
D. The Convoy Effect, leading to a substantially high average waiting time for short jobs.  

> **Answer:** **D**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ D ถูกต้อง:** ปรากฏการณ์นี้เรียกว่า **Convoy Effect** ซึ่งเกิดขึ้นเมื่อโพรเซสที่ต้องการเวลาประมวลผลนานมาก ($P_1 = 24\text{ ms}$) เข้าไปขวางอยู่หัวแถว ทำให้โพรเซสสั้นๆ ($P_2, P_3, P_4, P_5$) ต้องติดรอเป็นขบวน ส่งผลให้ค่าเฉลี่ยเวลาการรอคอย (Average Waiting Time) พุ่งสูงขึ้นอย่างไม่จำเป็น  
> * **ข้อ A ผิด:** Priority Inversion เกี่ยวข้องกับการแย่งชิง Resource lock ระหว่างเธรดที่มีระดับความสำคัญต่างกัน ไม่ใช่ปัญหาพื้นฐานของ FCFS  
> * **ข้อ B ผิด:** Starvation ไม่เกิดใน FCFS เพราะทุกตัวในคิวจะได้รับการประมวลผลตามลำดับอย่างแน่นอน (ไม่มีการแทรกคิว)  
> * **ข้อ C ผิด:** Thrashing เป็นปัญหาของ Virtual Memory เมื่อเกิด Page Fault ถี่เกินไป ไม่เกี่ยวกับ CPU Scheduling

---

### Question 6
An operating system uses a Round-Robin (RR) CPU scheduling algorithm. If the system architect configures an extremely small time quantum ($q \to 0$, e.g., 1 microsecond) on an architecture where context-switching takes 10 microseconds, what will be the primary operational consequence?

A. The system will degenerate into a First-Come, First-Served (FCFS) scheduler.  
B. The CPU will spend the vast majority of its time executing context switches rather than productive user code.  
C. Long batch processes will experience severe starvation.  
D. Average waiting time will become mathematically optimal matching Shortest-Job-First (SJF).  

> **Answer:** **B**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ B ถูกต้อง:** หาก **Time Quantum มีขนาดเล็กเกินไป** (เมื่อเทียบกับเวลาที่ใช้ในการสลับ Context Switch) ซีพียูจะเสียเวลาไปกับกระบวนการบันทึกและโหลด PCB (Overhead) มากกว่าเวลาที่ได้ประมวลผลงานจริงของโปรแกรม ส่งผลให้ประสิทธิภาพรวมของระบบตกต่ำอย่างรุนแรง  
> * **ข้อ A ผิด:** ระบบจะกลายสภาพเป็น FCFS ก็ต่อเมื่อ Time Quantum มีขนาด **ใหญ่มาก (Extremely large)** จนทุกโพรเซสทำงานเสร็จได้ในรอบเดียว  
> * **ข้อ C ผิด:** Round Robin รับประกันความเท่าเทียมโดยวนให้ทุกโพรเซสได้รันอย่างต่อเนื่อง จึงไม่มีทางเกิด Starvation  
> * **ข้อ D ผิด:** การกำหนด $q$ ให้เล็กมากไม่ได้ทำให้กลายเป็น SJF แต่จะทำให้เกิดภาพลวงตาว่าทุกโปรแกรมรันไปพร้อมกันแบบ Processor Sharing บนเครื่องที่ช้าลงอย่างมาก

---

### Question 7
In a paging memory-management architecture, the CPU generates a 16-bit logical address space, and the page size is configured to be $4\text{ KB}$ ($4,096\text{ bytes}$). How are the 16 bits of the logical address divided between the Page Number ($p$) and the Page Offset ($d$)?

A. Page Number ($p$) = 4 bits, Page Offset ($d$) = 12 bits  
B. Page Number ($p$) = 8 bits, Page Offset ($d$) = 8 bits  
C. Page Number ($p$) = 12 bits, Page Offset ($d$) = 4 bits  
D. Page Number ($p$) = 6 bits, Page Offset ($d$) = 10 bits  

> **Answer:** **A**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ A ถูกต้อง:**  
>   1. ขนาดหน้าเพจคือ $4\text{ KB} = 4,096\text{ bytes} = 2^{12}\text{ bytes}$  
>   2. ดังนั้น ต้องใช้บิตสำหรับ **Page Offset ($d$)** จำนวน $n = 12\text{ bits}$ เพื่อระบุตำแหน่งไบต์ภายในหน้า  
>   3. แอดเดรสมีขนาดทั้งหมด $m = 16\text{ bits}$  
>   4. ดังนั้น บิตสำหรับ **Page Number ($p$)** จะเท่ากับ $m - n = 16 - 12 = 4\text{ bits}$ (ทำให้ระบบมีหน้าเพจได้สูงสุด $2^4 = 16$ หน้า)  
> * **ข้อ B, C และ D ผิด:** มีการแบ่งจำนวนบิตคำนวณที่ไม่สอดคล้องกับขนาด $4\text{ KB}$ ($2^{12}$)

---

### Question 8
Why does modern CPU hardware include an Address-Space Identifier (ASID) field within each Translation Look-Aside Buffer (TLB) entry?

A. To dynamically increase the physical page frame capacity of RAM.  
B. To protect the disk storage from unauthorized Direct Memory Access writes.  
C. To allow entries belonging to multiple processes to coexist in the TLB simultaneously without requiring a complete TLB flush on every context switch.  
D. To eliminate the need for having a Page Table stored in physical main memory.  

> **Answer:** **C**  
> **Explanation (คำอธิบาย):**  
> * **ข้อ C ถูกต้อง:** หากไม่มี **ASID (Address-Space Identifier)** เมื่อเกิด Context Switch ระบบปฏิบัติการจำเป็นต้องสั่ง **Flush TLB** (ล้างค่าแคชทิ้งทั้งหมด) เพื่อป้องกันไม่ให้โพรเซสใหม่เข้าถึงแอดเดรสทางกายภาพของโพรเซสเดิม แต่เมื่อมี ASID ระบุไว้ในแต่ละช่องของ TLB แคชจะสามารถแยกแยะได้ว่ารายการแปลงแอดเดรสนั้นเป็นของโพรเซสใด ทำให้โพรเซสต่างกันใช้ TLB ร่วมกันได้โดยไม่ต้องล้างแคชทิ้งทุกรอบ  
> * **ข้อ A ผิด:** ASID เป็นเพียงป้ายระบุสิทธิ์ในแคช ไม่สามารถขยายขนาดความจุทางกายภาพของชิปแรมได้  
> * **ข้อ B ผิด:** ASID จัดการการแปลแอดเดรสในซีพียู ไม่ได้ทำหน้าที่ควบคุมการเขียนดิสก์ของ DMA  
> * **ข้อ D ผิด:** Page Table ในแรมยังคงจำเป็นต้องมีอยู่เสมอ เพื่อทำหน้าที่เป็นตารางหลักแบบสมบูรณ์เมื่อเกิดสภาวะ TLB Miss

---

## Final Review & Exit Ticket Checklist (เช็กลิสต์ทบทวนก่อนสอบ)

ก่อนปิดการอ่านบททวนบทนี้ ให้นักศึกษาตอบคำถามเหล่านี้กับตนเองเพื่อประเมินความพร้อม:

1. **Why do applications need an OS?**  
   *(เพื่อป้องกันปัญหาโค้ดซ้ำซ้อน ข้อขัดแย้งในการแย่งฮาร์ดแวร์ การล่มของระบบ และสร้างระบบความปลอดภัยในการเข้าถึงทรัพยากรร่วม)*
2. **What is the difference between Interrupt and DMA?**  
   *(Interrupt คือสัญญาณแจ้งเตือนขนาดเล็กเพื่อขอเวลาจากซีพียู ส่วน DMA คือวงจรย้ายข้อมูลบล็อกใหญ่ระหว่าง I/O กับแรมโดยที่ซีพียูไม่ต้องแบกไบต์ข้อมูลเอง)*
3. **What differentiates a Program from a Process?**  
   *(Program คือไฟล์คำสั่งที่อยู่นิ่งบนดิสก์ ส่วน Process คือโปรแกรมที่ถูกโหลดขึ้นมาประมวลผลจริงในหน่วยความจำ พร้อมโครงสร้างทรัพยากรและรีจิสเตอร์)*
4. **Why is CPU scheduling critical for modern computers?**  
   *(เพื่อให้ซีพียูทำงานได้คุ้มค่าที่สุด มีปริมาณงานเสร็จสูงสุด และตอบสนองต่อผู้ใช้งานได้อย่างรวดเร็วโดยไม่เกิดปัญหา Starvation)*
5. **What fundamental problem does Paging solve?**  
   *(แก้ปัญหา External Fragmentation โดยอนุญาตให้โพรเซสสามารถจองและใช้งานหน่วยความจำกายภาพที่กระจัดกระจายไม่ต่อเนื่องกันได้)*