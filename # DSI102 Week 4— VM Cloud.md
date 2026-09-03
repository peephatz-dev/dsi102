```markdown
---
title: "Exam Study Guide: Virtual Machines (VM) and Cloud Computing"
course_code: "DSI102"
course_name: "Introduction to Digital Technology"
module: "Week 4: From Physical Hardware to On-Demand Infrastructure"
instructor: "Dr. Nantapong Keandoungchun"
target_audience: "Bilingual International Program Students & Exam Candidates"
document_type: "Comprehensive Revision & Exam Preparation Guide"
version: "1.0"
---

# Module Overview: Virtual Machine & Cloud Computing (ภาพรวมโมดูล: เครื่องเสมือนและการประมวลผลแบบคลาวด์)

ยินดีต้อนรับนักศึกษาสู่คู่มือเตรียมสอบวิชา **DSI102 Introduction to Digital Technology** ประจำสัปดาห์ที่ 4 เอกสารชุดนี้ได้รับการออกแบบตามมาตรฐานหลักสูตรนานาชาติ โดยเชื่อมโยงแนวคิดตั้งแต่ระดับสถาปัตยกรรมฮาร์ดแวร์กายภาพ (Physical Hardware), ระบบปฏิบัติการ (Operating Systems), การจำลองเสมือน (Virtualization), ตลอดจนการพัฒนาไปสู่ระบบคลาวด์ตามความต้องการ (On-Demand Cloud Infrastructure)

---

# Section 1: Key Concepts & Technical Vocabulary (หมวดคำศัพท์และมโนทัศน์สำคัญ)

รวบรวมคำศัพท์เชิงเทคนิคที่จำเป็นสำหรับการสอบ พร้อมคำอธิบายและตัวอย่างบริบทการใช้งานจริงในอุตสาหกรรม:

1. **Virtualization (การจำลองเสมือน)** - เทคโนโลยีการสร้างตัวแทนเชิงตรรกะ (Logical Representation) ของทรัพยากรคอมพิวเตอร์จริง เช่น เซิร์ฟเวอร์, ระบบปฏิบัติการ, สื่อบันทึกข้อมูล หรือระบบเครือข่าย เพื่อให้สามารถแยกการทำงานของซอฟต์แวร์ออกจากข้อจำกัดของฮาร์ดแวร์กายภาพ
   * *Usage Example:* "Through hardware-level **virtualization**, companies can run multiple distinct operating systems on a single physical host without hardware conflicts."

2. **Hypervisor / Virtual Machine Monitor (VMM) (ไฮเปอร์ไวเซอร์ / โปรแกรมควบคุมเครื่องเสมือน)** - เลเยอร์ซอฟต์แวร์หรือเฟิร์มแวร์ที่ทำหน้าที่จัดสรร คั่นกลาง และแปลคำสั่งระหว่างเครื่องเสมือน (VMs) กับฮาร์ดแวร์จริง เพื่อควบคุมไม่ให้ VM เข้าถึงฮาร์ดแวร์โดยตรง
   * *Usage Example:* "The **hypervisor** intercepts CPU and memory requests from guest operating systems and schedules them onto the physical processor."

3. **Host Machine vs. Guest Machine (เครื่องโฮสต์ เทียบกับ เครื่องเกสต์)** - **Host** คือเครื่องคอมพิวเตอร์กายภาพจริงและสภาพแวดล้อมหลักที่เป็นเจ้าของทรัพยากร ส่วน **Guest** คือสภาพแวดล้อมเสมือนหรือระบบปฏิบัติการ (Guest OS) ที่ทำงานอยู่ภายในเครื่องเสมือน (VM)
   * *Usage Example:* "A failure on the **host machine** can abruptly terminate all running **guest machines** unless high-availability clustering is implemented."

4. **Resource Contention (การแย่งชิงทรัพยากร)** - สภาวะที่เครื่องเสมือนหลายเครื่องบนโฮสต์เดียวกันพยายามเรียกใช้ทรัพยากรกายภาพ (เช่น CPU, RAM, I/O) พร้อมกันจนเกินขีดความสามารถที่ฮาร์ดแวร์จะรองรับได้ ส่งผลให้ประสิทธิภาพการทำงานลดลง
   * *Usage Example:* "Overcommitting physical memory across too many virtual machines will lead to severe **resource contention** and latency spikes."

5. **Snapshot (สแนปชอต)** - การบันทึกสถานะของระบบ ข้อมูลในหน่วยความจำ และดิสก์ของเครื่องเสมือน ณ เวลาใดเวลาหนึ่งไว้ชั่วคราว เพื่อให้สามารถย้อนกลับ (Rollback) มายังจุดเดิมได้หากเกิดข้อผิดพลาด
   * *Usage Example:* "System administrators always capture a **snapshot** of the production VM prior to applying critical operating system patches."

6. **VM Migration (การย้ายเครื่องเสมือน)** - กระบวนการย้ายเครื่องเสมือนจากเครื่องเซิร์ฟเวอร์กายภาพหนึ่งไปยังอีกเครื่องหนึ่ง โดยอาจทำขณะเปิดเครื่องอยู่ (Live Migration) เพื่อการบำรุงรักษาฮาร์ดแวร์หรือการกระจายโหลดงาน
   * *Usage Example:* "**VM migration** enables seamless hardware maintenance by moving running workloads to another host without interrupting service to users."

7. **Rapid Elasticity (ความยืดหยุ่นอย่างรวดเร็ว)** - คุณลักษณะของระบบคลาวด์ที่สามารถเพิ่ม (Scale-out) หรือลด (Scale-in) ทรัพยากรคอมพิวเตอร์ได้โดยอัตโนมัติตามความต้องการของปริมาณงาน (Workload) ที่เปลี่ยนแปลงแบบไดนามิก
   * *Usage Example:* "The e-commerce platform relies on **rapid elasticity** to provision hundreds of temporary server instances during flash sale events."

8. **Resource Pooling (การรวมกลุ่มทรัพยากร)** - การนำทรัพยากรคอมพิวเตอร์ของผู้ให้บริการ (เช่น Compute, Storage, Network) มารวมกันไว้ในสระทรัพยากรส่วนกลาง เพื่อจัดสรรแบบไดนามิกให้แก่ผู้เช่าหลายราย (Multi-tenant)
   * *Usage Example:* "Through **resource pooling**, a cloud provider dynamically reassigns computing power across different geographic tenants based on time zones."

9. **Shared Responsibility Model (แบบจำลองความรับผิดชอบร่วมกัน)** - กรอบการทำงานด้านความปลอดภัยบนคลาวด์ที่แบ่งหน้าที่ความรับผิดชอบอย่างชัดเจนระหว่างผู้ให้บริการคลาวด์ (Security OF the Cloud) และลูกค้า (Security IN the Cloud)
   * *Usage Example:* "Under the **shared responsibility model** in IaaS, the customer remains strictly responsible for patching the guest operating system and securing database credentials."

10. **Containerization (คอนเทนเนอไรเซชัน)** - การจำลองเสมือนในระดับระบบปฏิบัติการ (OS-level Virtualization) ที่แชร์เคอร์เนลของโฮสต์ร่วมกัน โดยบรรจุเฉพาะแอปพลิเคชันและไลบรารีที่จำเป็น ทำให้มีขนาดเบาและเปิดใช้งานได้เร็วกว่าเครื่องเสมือน
    * *Usage Example:* "Unlike virtual machines that require a complete guest OS, **containers** package only the code and dependencies on top of a shared host kernel."

---

# Section 2: Core Content Summary (เนื้อหาเจาะลึกรายบทเรียน)

---

## Chapter 1: The Problem with Traditional Infrastructure & The Virtualization Breakthrough (บทที่ 1: ปัญหาของโครงสร้างพื้นฐานดั้งเดิมและการกำเนิดของการจำลองเสมือน)

### 1. ปัญหาของเซิร์ฟเวอร์กายภาพดั้งเดิม (Traditional Physical Servers)
* **รูปแบบดั้งเดิม (Traditional Infrastructure):** องค์กรในอดีตมักจัดวางระบบแบบ "หนึ่งเซิร์ฟเวอร์ต่องานเดียว" (*One Physical Server dedicated to One Workload/Application*) เช่น Server A รัน Application A, Server B รัน Application B เป็นต้น
* **การสูญเสียขีดความสามารถ (Capacity Waste / Low Workload Utilization):** จากกรณีศึกษาในบทเรียน พบว่าเซิร์ฟเวอร์แต่ละเครื่องมีการใช้งานพลังประมวลผลต่ำมาก เช่น:
  * Server A ใช้กำลังงานเพียง 15%
  * Server B ใช้กำลังงานเพียง 10%
  * Server C ใช้กำลังงานเพียง 20%
  * Server D ใช้กำลังงานเพียง 8%
* **ผลกระทบเชิงลบ:** 
  1. ค่าใช้จ่ายในการจัดซื้อฮาร์ดแวร์ (Capital Expenditure - CapEx) สูงเกินความจำเป็น
  2. สิ้นเปลืองพลังงานไฟฟ้า ค่าระบายความร้อน (Cooling) และพื้นที่จัดวางในดาต้าเซ็นเตอร์ (Data Center Footprint)
  3. ความยืดหยุ่นต่ำ การติดตั้งระบบใหม่ต้องใช้เวลารอการจัดซื้อและติดตั้งเครื่องจริงเป็นสัปดาห์หรือเป็นเดือน

### 2. แนวคิดหลักของการจำลองเสมือน (The Big Idea of Virtualization)
* **การแปลงรูป (Transformation):** การเปลี่ยน *One Physical Machine* ให้กลายเป็น *Many Logical Machines* ผ่านชั้นซอฟต์แวร์พิเศษที่เรียกว่า **เลเยอร์การจำลองเสมือน (Virtualization Layer)**
* **หลักการแยกส่วน (Separation of Concerns):** Virtualization ทำการแยกสิ่งที่ซอฟต์แวร์มองเห็นออกจากฮาร์ดแวร์กายภาพเบื้องหลัง (*Separates what software sees from the underlying physical hardware*)
* **โครงสร้างทางสถาปัตยกรรม (Anatomy of a Virtual Machine):**
  * **Application:** ซอฟต์แวร์ปลายทางที่ใช้งานจริง
  * **Guest Operating System (Guest OS):** ระบบปฏิบัติการที่รันอยู่ภายใน VM โดยตัว Guest OS จะเข้าใจว่าตนเองเป็นเจ้าของฮาร์ดแวร์จริงๆ
  * **Virtual Hardware Layer:** ทรัพยากรเสมือนที่ถูกจำลองขึ้นมา ได้แก่ **vCPU** (หน่วยประมวลผลเสมือน), **vRAM** (หน่วยความจำเสมือน), **Virtual Disk** (ดิสก์เสมือน) และ **vNIC** (การ์ดเครือข่ายเสมือน)
  * **Hypervisor Layer:** ตัวกลางแปลงคำสั่งเสมือนให้กลายเป็นการทำงานบนฮาร์ดแวร์จริง
  * **Physical Hardware:** ทรัพยากรจริงของเครื่องโฮสต์ (Host CPU, RAM, Storage, Physical NIC)
* **ข้อเปรียบเทียบระหว่าง Physical Machine กับ Virtual Machine:**

| คุณลักษณะ (Criteria) | เครื่องกายภาพ (Physical Machine) | เครื่องเสมือน (Virtual Machine) |
| :--- | :--- | :--- |
| **โครงสร้างสถาปัตยกรรม** | ฮาร์ดแวร์เฉพาะตัว (Dedicated Hardware) | กำหนดด้วยซอฟต์แวร์ (Software-defined) |
| **การทำงานของ OS** | รันระบบปฏิบัติการหลักเพียง 1 OS | รัน Guest OS แยกอิสระได้หลายตัวบนโฮสต์เดียวกัน |
| **การพึ่งพาฮาร์ดแวร์** | ผูกติดกับอุปกรณ์จริง (Hardware-dependent) | ไม่ผูกติด สามารถย้ายข้ามเครื่องได้ (Portable as files/images) |
| **การบำรุงรักษา** | ต้องดูแลรักษาชิ้นส่วนอุปกรณ์กายภาพจริง | บริหารจัดการผ่านซอฟต์แวร์ (Snapshot, Clone, Template) |
| **สภาพแวดล้อมการทำงาน** | ครอบครองฮาร์ดแวร์โดยตรง (Direct Device Ownership) | สภาพแวดล้อมถูกแยกเด็ดขาด (Isolated Environment) แต่แชร์ฮาร์ดแวร์ร่วมกัน |

---

## Chapter 2: Hypervisors & VM Management (บทที่ 2: สถาปัตยกรรมไฮเปอร์ไวเซอร์และการบริหารจัดการเครื่องเสมือน)

### 1. ประเภทของไฮเปอร์ไวเซอร์ (Hypervisor Classification)
ไฮเปอร์ไวเซอร์ทำหน้าที่เป็นชั้นควบคุม (Control Layer) ซึ่งเครื่องเสมือนจะไม่สัมผัสฮาร์ดแวร์โดยตรง (*VMs do not "touch" hardware directly*) แบ่งออกเป็น 2 ประเภทหลัก:


```

[Type 1: Bare-Metal Architecture]       [Type 2: Hosted Architecture]
+-------------------------------+       +-------------------------------+
|      VM 1   |   VM 2          |       |      VM 1   |   VM 2          |
+-------------------------------+       +-------------------------------+
|       Type 1 Hypervisor       |       |     Hypervisor Application    |
+-------------------------------+       +-------------------------------+
|       Physical Hardware       |       |       Host Operating System   |
+-------------------------------+       +-------------------------------+
|       Physical Hardware       |
+-------------------------------+

```

* **Type 1 Hypervisor (Bare-Metal Hypervisor):**
  * ติดตั้งและทำงานลงบนฮาร์ดแวร์กายภาพโดยตรงโดยไม่ต้องอาศัยระบบปฏิบัติการของโฮสต์ (*Runs directly on physical hardware*)
  * มีประสิทธิภาพสูงมาก (High Performance) และมีค่าใช้จ่ายส่วนเกินของระบบ (System Overhead) ต่ำ
  * เหมาะสำหรับศูนย์ข้อมูลระดับองค์กร (Data Centers & Enterprise Production Virtualization)
  * *ตัวอย่างเทคโนโลยี:* VMware ESXi, Microsoft Hyper-V Server, Xen Project, KVM (Kernel-based Virtual Machine)
* **Type 2 Hypervisor (Hosted Hypervisor):**
  * ติดตั้งเป็นแอปพลิเคชันตัวหนึ่งบนระบบปฏิบัติการของโฮสต์ (*Runs as an application on top of a host operating system*)
  * มี System Overhead มากกว่า เนื่องจากต้องส่งผ่านคำสั่งไปยัง Host OS ก่อนส่งต่อให้ฮาร์ดแวร์จริง
  * เหมาะสำหรับการเรียนรู้ การทดสอบระบบ และการพัฒนาซอฟต์แวร์ของโปรแกรมเมอร์ (Learning, Testing, Development)
  * *ตัวอย่างเทคโนโลยี:* Oracle VM VirtualBox, VMware Workstation / Fusion, Parallels Desktop

### 2. วงจรชีวิตและการจัดการเครื่องเสมือน (VM Lifecycle & Management)
* **วงจรชีวิตของเครื่องเสมือน (VM Lifecycle):**
  $$\text{Create} \longrightarrow \text{Configure} \longrightarrow \text{Start} \longrightarrow \text{Run} \longrightarrow \text{Snapshot} \longrightarrow \text{Stop} \longrightarrow \text{Archive / Delete}$$
  เนื่องจาก VM อยู่ในรูปไฟล์ข้อมูล (Software Objects) จึงมีความยืดหยุ่นในการคัดลอก ระงับการทำงาน และกู้คืนได้เร็วกว่าเครื่องกายภาพอย่างมาก
* **การจัดสรรทรัพยากร (Resource Allocation):**
  * ตัวอย่าง: เซิร์ฟเวอร์กายภาพมีสเปก 16 Cores, 64 GB RAM, 2 TB Disk สามารถซอยย่อยจัดสรรให้แก่ VM A (4 Cores, 16 GB), VM B (6 Cores, 24 GB), VM C (2 Cores, 8 GB), VM D (4 Cores, 16 GB)
  * **ข้อควรระวัง:** อาจเกิดภาวะแย่งชิงทรัพยากร (**Resource Contention**) ได้เมื่อเปิดรัน VM พร้อมกันมากเกินไป
* **การจับภาพสถานะและการคัดลอก (Snapshots vs. Cloning):**
  * **Snapshot:** บันทึกสถานะ (State) ของ VM ณ เวลาหนึ่งๆ ใช้สำหรับสร้างจุดคืนสภาพเดิมก่อนการอัปเดตระบบหรือการทดลองโปรแกรมที่มีความเสี่ยง
  * **Clone:** การสร้างเครื่องเสมือนเครื่องใหม่ขึ้นมาโดยคัดลอกคุณลักษณะและข้อมูลจาก VM ต้นแบบ เหมาะสำหรับการสร้างสภาพแวดล้อมที่ต้องซ้ำกันหลายๆ ชุด
* **การย้ายตำแหน่งเครื่องเสมือน (VM Migration):**
  * การย้าย VM จาก Host A ไปยัง Host B
  * ประโยชน์: รองรับการปิดซ่อมบำรุงฮาร์ดแวร์โฮสต์โดยไม่ต้องหยุดให้บริการ (Maintenance), กระจายภาระงาน (Load Balancing), และเพิ่มความพร้อมใช้งานของระบบ (High Availability)
* **ประโยชน์และข้อจำกัดของการจำลองเสมือน (Benefits vs. Limitations):**
  * **Benefits:** เพิ่มอัตราการใช้ประโยชน์ของทรัพยากร (Resource Utilization), มีการแยกสภาพแวดล้อมที่ปลอดภัย (Isolation), ติดตั้งระบบได้อย่างรวดเร็ว (Fast Deployment), สะดวกต่อการทดสอบ, ประหยัดฮาร์ดแวร์ และเคลื่อนย้ายระบบได้ง่าย (Portability)
  * **Limitations:** เกิดการสูญเสียประสิทธิภาพบางส่วน (Performance Overhead), เกิดปัญหา Resource Contention, หาก Host เสียจะกระทบทุก VM ที่อยู่ภายใน (Single Point of Host Failure Impact), ความซับซ้อนในการจัดการใบอนุญาตการใช้งาน (Licensing Issues) และความเสี่ยงจากการกำหนดค่าความปลอดภัยผิดพลาด (Security Misconfiguration)

---

## Chapter 3: From Virtual Machines to Cloud Computing (บทที่ 3: วิวัฒนาการจากเครื่องเสมือนสู่การประมวลผลแบบคลาวด์)

### 1. ความแตกต่างที่สำคัญ: Virtualization $\neq$ Cloud Computing
* สองคำนี้มีความเกี่ยวข้องกันอย่างลึกซึ้ง แต่ตอบโจทย์คำถามคนละมิติ:
  * **Virtualization:** ตอบคำถามว่า *"เราจะแยกทรัพยากรคอมพิวเตอร์ออกจากฮาร์ดแวร์กายภาพได้อย่างไร?"* (เทคนิคการสร้างเครื่องเสมือน)
  * **Cloud Computing:** ตอบคำถามว่า *"เราจะส่งมอบทรัพยากรคอมพิวเตอร์เป็นบริการผ่านระบบเครือข่ายได้อย่างไร?"* (รูปแบบการให้บริการทางธุรกิจและเทคโนโลยี)
* **กฎสำคัญในการสอบ:** Virtualization ถือเป็นเทคโนโลยีรากฐานที่ทำให้เกิดคลาวด์ แต่ **"ไม่ใช่การจำลองเสมือนทุกระบบจะเป็นคลาวด์"** (*Virtualization can enable cloud infrastructure, but not all virtualization is cloud*)

### 2. เส้นทางวิวัฒนาการจากเซิร์ฟเวอร์สู่คลาวด์ (Progression Pipeline)
$$\text{Physical Server} \longrightarrow \text{Virtual Machines} \longrightarrow \text{Resource Pool} \longrightarrow \text{Automation \& Management} \longrightarrow \text{Network Access} \longrightarrow \text{Cloud Service}$$
คลาวด์ไม่ใช่เพียงแค่ "VM ของคนอื่น" (*Not just someone else's VM*) แต่เป็นระบบอัตโนมัติ (Automation) ที่ผู้ใช้สามารถเรียกใช้บริการผ่านเครือข่ายได้ด้วยตนเองทันที

### 3. คุณลักษณะหลัก 5 ประการของระบบคลาวด์ (Core Characteristics of Cloud Computing)
1. **On-Demand Self-Service (การบริการตนเองตามความต้องการ):** ผู้ใช้สามารถกดสั่งจองทรัพยากร (เช่น CPU, Storage) ได้ด้วยตนเองทันทีผ่านระบบอัตโนมัติ โดยไม่ต้องรอการอนุมัติจากเจ้าหน้าที่มนุษย์
2. **Broad Network Access (การเข้าถึงผ่านเครือข่ายกว้างขวาง):** สามารถเข้าถึงบริการได้ผ่านเครือข่ายอินเทอร์เน็ตมาตรฐานจากหลากหลายอุปกรณ์ (แล็ปท็อป, สมาร์ตโฟน, แท็บเล็ต)
3. **Resource Pooling (การรวมกลุ่มทรัพยากร):** ผู้ให้บริการนำฮาร์ดแวร์มารวมกันเป็นสระทรัพยากรขนาดใหญ่ เพื่อแบ่งปันให้ผู้ใช้งานหลายราย (Multi-tenancy) โดยผู้ใช้ไม่จำเป็นต้องทราบตำแหน่งทางกายภาพที่แน่นอนของเซิร์ฟเวอร์
4. **Rapid Elasticity (ความยืดหยุ่นรวดเร็ว):** ความสามารถในการปรับเพิ่มหรือลดทรัพยากรได้อย่างรวดเร็วและเป็นอัตโนมัติตามความต้องการใช้งานจริง
5. **Measured Service (บริการที่วัดปริมาณการใช้ได้):** ระบบมีกลไกวัดและบันทึกปริมาณการใช้งานทรัพยากรอย่างละเอียด เพื่อคิดค่าบริการแบบจ่ายตามจริง (Pay-per-use / Pay-as-you-go)

### 4. การเปรียบเทียบจุดแตกต่าง: Scalability vs. Elasticity
* **Scalability (ความสามารถในการขยายระบบ):** เน้นการ **วางแผนล่วงหน้า** เพื่อรองรับการเติบโตของระบบในระยะยาว เช่น องค์กรเติบโตขึ้น จึงวางแผนจัดซื้อหรืออัปเกรดระบบจากเดิมที่ใช้ 2 เซิร์ฟเวอร์ เพิ่มเป็น 10 เซิร์ฟเวอร์
* **Elasticity (ความยืดหยุ่นของระบบ):** เน้นการ **ปรับตัวแบบอัตโนมัติและไดนามิก** ตามความผันผวนของความต้องการใช้งานในแต่ละช่วงเวลา เช่น การเพิ่มจำนวนเซิร์ฟเวอร์อัตโนมัติช่วงเทศกาลลดราคาสินค้า 11.11 แล้วลดจำนวนลงกลับสู่ระดับปกติเมื่อหมดเทศกาล

---

## Chapter 4: Cloud Service Models (บทที่ 4: รูปแบบการให้บริการบนระบบคลาวด์)

รูปแบบการให้บริการบนคลาวด์วัดกันที่ **"ขอบเขตหน้าที่ความรับผิดชอบในการบริหารจัดการ IT Stack"** (Management Responsibility Matrix):


```

+------------------+---------------+---------------+---------------+---------------+
| IT Stack Layer   |  On-Premises  |     IaaS      |     PaaS      |     SaaS      |
+------------------+---------------+---------------+---------------+---------------+
| Applications     |   Customer    |   Customer    |   Customer    |   Provider    |
| Data             |   Customer    |   Customer    |   Customer    |   Provider    |
| Runtime          |   Customer    |   Customer    |   Provider    |   Provider    |
| Middleware       |   Customer    |   Customer    |   Provider    |   Provider    |
| Operating System |   Customer    |   Customer    |   Provider    |   Provider    |
| Virtualization   |   Customer    |   Provider    |   Provider    |   Provider    |
| Servers          |   Customer    |   Provider    |   Provider    |   Provider    |
| Storage          |   Customer    |   Provider    |   Provider    |   Provider    |
| Networking       |   Customer    |   Provider    |   Provider    |   Provider    |
+------------------+---------------+---------------+---------------+---------------+

```

### 1. IaaS (Infrastructure as a Service - การให้บริการโครงสร้างพื้นฐาน)
* **แนวคิด:** เช่าทรัพยากรพื้นฐาน (Compute, Storage, Network) แล้วผู้เช่าเป็นผู้ติดตั้งและดูแลซอฟต์แวร์ตั้งแต่ระดับ OS ขึ้นไปเอง
* **ผู้ให้บริการดูแล:** Virtualization, Physical Servers, Storage, Networking
* **ลูกค้าดูแล:** Applications, Data, Runtime, Middleware, Operating System
* **จุดเด่น:** ผู้ใช้มีอิสระในการควบคุมสูงที่สุด (Maximum Control) ปรับแต่ง OS และระบบเครือข่ายได้ตามใจ
* *ตัวอย่างในชีวิตจริง:* AWS EC2, Google Compute Engine, Microsoft Azure Virtual Machines

### 2. PaaS (Platform as a Service - การให้บริการแพลตฟอร์ม)
* **แนวคิด:** ผู้ให้บริการจัดเตรียมสภาพแวดล้อมและเครื่องมือในการรันแอปพลิเคชันไว้ให้สำเร็จรูป นักพัฒนาทำหน้าที่เพียงเขียนโค้ดและนำข้อมูลมาลง
* **ผู้ให้บริการดูแล:** Runtime, Middleware, OS, Virtualization, Servers, Storage, Networking
* **ลูกค้าดูแล:** Applications และ Data
* **จุดเด่น:** ลดภาระการดูแลรักษา Patching ของ OS เหมาะกับนักพัฒนาซอฟต์แวร์ที่ต้องการ Deploy โค้ดอย่างรวดเร็ว
* *ตัวอย่างในชีวิตจริง:* Heroku, Google App Engine, AWS Elastic Beanstalk, Managed Database (เช่น Azure SQL Database)

### 3. SaaS (Software as a Service - การให้บริการซอฟต์แวร์สำเร็จรูป)
* **แนวคิด:** การส่งมอบแอปพลิเคชันที่พร้อมใช้งานสมบูรณ์แบบผ่านอินเทอร์เน็ต
* **ผู้ให้บริการดูแล:** ดูแลรับผิดชอบทุกชั้นของ IT Stack ตั้งแต่ฮาร์ดแวร์จนถึงตัวแอปพลิเคชันและฐานข้อมูล
* **ลูกค้าดูแล:** จัดการเพียงการใช้งาน การตั้งค่าสิทธิ์ผู้ใช้ และข้อมูลส่วนบุคคล
* **จุดเด่น:** ใช้งานง่ายที่สุด ไม่ต้องมีความรู้เชิงเทคนิคในการดูแลเซิร์ฟเวอร์
* *ตัวอย่างในชีวิตจริง:* Gmail, Microsoft 365, Google Workspace, Canva, Salesforce

---

## Chapter 5: Deployment Models, Security & Modern Cloud (บทที่ 5: รูปแบบการติดตั้ง ความปลอดภัย และคลาวด์ยุคใหม่)

### 1. รูปแบบการติดตั้งคลาวด์ (Cloud Deployment Models)
* **Public Cloud (คลาวด์สาธารณะ):** ทรัพยากรฮาร์ดแวร์ถูกแชร์กันระหว่างผู้ใช้งานทั่วไปผ่านอินเทอร์เน็ต บริหารจัดการโดยผู้ให้บริการภายนอก (เช่น AWS, GCP, Azure)
* **Private Cloud (คลาวด์ส่วนตัว):** สภาพแวดล้อมคลาวด์ที่ถูกสร้างขึ้นเพื่อใช้งานเฉพาะองค์กรเดียวเท่านั้น เพื่อความปลอดภัยสูงสุดและการปฏิบัติตามกฎหมายอย่างเข้มงวด
* **Hybrid Cloud (คลาวด์แบบผสมผสาน):** การเชื่อมต่อโครงสร้างพื้นฐานที่มีความแตกต่างกันเข้าด้วยกัน โดยทั่วไปคือการเชื่อมระหว่าง On-Premises / Private Cloud เข้ากับ Public Cloud
* **Multi-Cloud (การใช้บริการมัลติคลาวด์):** การเลือกใช้บริการจากผู้ให้บริการคลาวด์สาธารณะตั้งแต่ 2 รายขึ้นไป เพื่อลดการผูกขาด (Vendor Lock-in) เช่น ใช้ Compute ของ AWS, ใช้ Data Analytics ของ Google Cloud และใช้ระบบสำรองข้อมูลบน Azure

### 2. โมเดลความรับผิดชอบร่วมด้านความปลอดภัย (Shared Responsibility Model)
ความปลอดภัยบนคลาวด์ไม่ใช่หน้าที่ของฝ่ายใดฝ่ายหนึ่งเพียงลำพัง:
* **Security OF the Cloud (ความปลอดภัย "ของ" ระบบคลาวด์) $\rightarrow$ เป็นหน้าที่ของ Cloud Provider:**
  * การรักษาความปลอดภัยทางกายภาพของดาต้าเซ็นเตอร์ (Physical Security)
  * โครงสร้างพื้นฐานหลัก (Core Infrastructure)
  * ชั้นฮาร์ดแวร์และไฮเปอร์ไวเซอร์ (Underlying Platform)
  * กลไกความพร้อมใช้งานของระบบในระดับสากล (Global Availability)
* **Security IN the Cloud (ความปลอดภัย "ใน" ระบบคลาวด์) $\rightarrow$ เป็นหน้าที่ของ Customer:**
  * การจัดการบัญชีผู้ใช้งานและรหัสผ่าน (User Accounts & IAM)
  * การกำหนดสิทธิ์และการควบคุมการเข้าถึง (Permissions & Access Policies)
  * การกำหนดค่าความปลอดภัยของระบบ (Configurations & Firewall rules)
  * การปกป้องข้อมูลของแอปพลิเคชันและการเข้ารหัส (Data Protection & Encryption)

### 3. ตารางเปรียบเทียบสถาปัตยกรรมยุคใหม่: Virtual Machines vs. Containers


```

+------------------------------------+------------------------------------+
|       Virtual Machine (VM)         |             Container              |
+------------------------------------+------------------------------------+
|  [App A]      |  [App B]           |  [App A]      |  [App B]           |
|  [Guest OS A] |  [Guest OS B]      |  [Libs/Deps]  |  [Libs/Deps]       |
|  [Virtual Hardware]                |  [Container Runtime (Docker)]      |
|  [Hypervisor Layer]                |  [Shared Host OS Kernel]           |
|  [Physical Host Hardware]          |  [Physical Host Hardware]          |
+------------------------------------+------------------------------------+

```

* **Virtual Machines:** ทำการจำลองในระดับฮาร์ดแวร์ (**Hardware-level Virtualization**) มี Guest OS แยกเด็ดขาด ส่งผลให้มีการแยกสภาพแวดล้อมที่แข็งแกร่ง ปลอดภัยสูง แต่ใช้ทรัพยากรมากและเปิดเครื่องช้า (Heavier Footprint)
* **Containers:** ทำการจำลองในระดับระบบปฏิบัติการ (**OS-level Virtualization**) โดยแชร์เคอร์เนลของ Host OS ร่วมกัน บรรจุเพียงตัวโปรแกรมและสิ่งที่จำเป็นต้องใช้ มีขนาดเล็ก น้ำหนักเบา เปิดใช้งานได้ภายในเสี้ยววินาที (Lightweight Packaging)

---

# Section 3: Comprehensive Practice Quiz (แบบทดสอบจำลองข้อสอบจริง)

---

### Question 1
An enterprise is running four bare-metal physical servers hosting different internal services. Monitoring logs reveal that each server operates at an average CPU utilization of only 8% to 18%. Which technological strategy directly solves this inefficiency by consolidating workloads?
- A) Implementing an OS-level container runtime across all individual physical servers without changing host assignments.
- B) Introducing a virtualization abstraction layer to host multiple isolated virtual machines on consolidated physical hardware.
- C) Deploying an external Application Load Balancer to redirect traffic between physical servers.
- D) Migrating application code directly to an On-Premises bare-metal batch processing cluster.

> **Answer: B**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ B ถูก:** จากเนื้อหาบทเรียน ปัญหาของเซิร์ฟเวอร์แบบดั้งเดิมคือ *Capacity Waste* จากการใช้งาน CPU ต่ำ (8-20%) การนำ **Virtualization Layer (Hypervisor)** เข้ามาใช้ จะช่วยรวมศูนย์เวิร์กโหลด (*Consolidate Workloads*) จากเครื่องกายภาพหลายๆ เครื่อง ให้มารันเป็นเครื่องเสมือน (*VMs*) ภายในเซิร์ฟเวอร์กายภาพเครื่องเดียว ช่วยเพิ่มความคุ้มค่าของการใช้ทรัพยากร (*Better Resource Utilization*)
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A ผิด:* การลง Container บนเครื่องเดิมทีละเครื่องโดยไม่รวมฮาร์ดแวร์ ไม่ได้แก้ปัญหาการมีเครื่องกายภาพกระจัดกระจายและสูญเปล่า
>   * *ข้อ C ผิด:* Load Balancer ทำหน้าที่กระจายทราฟฟิกของเครือข่าย แต่ไม่ได้แก้ปัญหาระดับสถาปัตยกรรมฮาร์ดแวร์ที่สูญเปล่า
>   * *ข้อ D ผิด:* การย้ายไป Bare-metal cluster ยังคงเป็นการผูกติดกับฮาร์ดแวร์กายภาพและไม่ช่วยเรื่องการแยกสภาพแวดล้อมเสมือน

---

### Question 2
How does a guest operating system in a virtualized architecture interact with physical hardware components such as the CPU and RAM?
- A) The guest OS communicates directly with the physical motherboard chipset through bypass drivers.
- B) The guest OS interacts with virtual hardware abstractions, which are subsequently mapped to physical resources by the hypervisor.
- C) The guest OS modifies the host operating system's kernel space to request direct hardware interrupts.
- D) The guest OS shares its own physical device registers directly with sibling virtual machines.

> **Answer: B**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ B ถูก:** ตามแผนภาพ *Anatomy of a Virtual Machine* ในสไลด์ ตัว Guest OS จะคิดว่าตนเองมีฮาร์ดแวร์จริง (*believes it has hardware*) แต่ในความเป็นจริงมันติดต่อผ่านฮาร์ดแวร์เสมือน (*Virtual CPU / Memory / Disk / Network*) จากนั้น **Hypervisor** จะทำหน้าที่จัดทำแผนผังและส่งต่อคำขอไปยังทรัพยากรกายภาพจริง (*maps those requests to real physical resources*) โดยที่ VM จะไม่แตะฮาร์ดแวร์จริงโดยตรง (*VMs do not "touch" hardware directly*)
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A และ D ผิด:* เครื่องเสมือนถูกจำกัดสิทธิ์และแยกสภาพแวดล้อม (*Isolated*) จึงไม่สามารถเข้าถึงชิปเซ็ตจริงโดยตรงหรือแชร์รีจิสเตอร์กับ VM อื่นได้
>   * *ข้อ C ผิด:* สถาปัตยกรรม VM ทั่วไป (โดยเฉพาะ Type 1) ไม่ได้ไปแก้ไขเคอร์เนลของ Host OS แต่อย่างใด

---

### Question 3
An IT engineer wants to set up a high-performance virtualization environment in an enterprise data center to maximize throughput and minimize virtualization overhead. Which type of hypervisor should be deployed, and what is its architectural characteristic?
- A) Type 2 Hypervisor, because it operates on top of a fully configured host desktop operating system.
- B) Type 1 Hypervisor, because it installs and runs directly on bare-metal physical hardware without an underlying host OS.
- C) Type 2 Hypervisor, because it provides automated hardware translation through consumer desktop applications.
- D) Type 1 Hypervisor, because it relies on the host operating system to schedule process threads.

> **Answer: B**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ B ถูก:** **Type 1 Hypervisor (Bare-Metal)** ทำงานโดยตรงบนฮาร์ดแวร์กายภาพ (*Runs directly on physical hardware*) โดยไม่ต้องมี Host OS มาคั่นกลาง จึงให้ประสิทธิภาพสูงสุด (*Higher potential performance*) และลดการสูญเสียทรัพยากร จึงเป็นมาตรฐานสำหรับดาต้าเซ็นเตอร์ระดับองค์กร (เช่น VMware ESXi, Hyper-V Server)
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A และ C ผิด:* Type 2 (Hosted) ต้องรันบน Host OS อีกทอดหนึ่ง ทำให้เกิด *More overhead* จึงไม่เหมาะกับงานระดับ Enterprise Data Center
>   * *ข้อ D ผิด:* Type 1 ไม่ต้องพึ่งพา Host OS ในการจัดคิวโพรเซส เพราะตัวมันเองทำหน้าที่ควบคุมฮาร์ดแวร์โดยตรง

---

### Question 4
A software developer needs to quickly verify an application bug on an isolated Ubuntu environment using their corporate Windows 11 laptop. Which software solution exemplifies the appropriate hypervisor type for this scenario?
- A) VMware ESXi
- B) Oracle VM VirtualBox
- C) KVM bare-metal appliance
- D) Microsoft Hyper-V Server standalone

> **Answer: B**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ B ถูก:** การรัน Linux บนแล็ปท็อป Windows ที่มีอยู่เดิม เป็นการใช้งานแบบ **Type 2 Hypervisor (Hosted Hypervisor)** ซึ่งรันเป็นแอปพลิเคชันบน Host OS สำหรับการทดสอบและพัฒนา (*Learning, testing, development*) โดย **Oracle VM VirtualBox** (รวมถึง VMware Workstation) เป็นตัวอย่างคลาสสิกของ Type 2
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A, C และ D ผิด:* VMware ESXi, KVM และ Hyper-V Server จัดเป็น Type 1 (Bare-Metal) ซึ่งใช้สำหรับติดตั้งบนเครื่องเซิร์ฟเวอร์โดยตรง ไม่ได้รันเป็นโปรแกรมบน Windows Desktop

---

### Question 5
Which statement accurately captures the technical boundary between Virtualization and Cloud Computing?
- A) Virtualization delivers computing resources as metered services over the network, whereas Cloud Computing provides hardware partitioning.
- B) Virtualization abstracts physical computing resources into software representations, whereas Cloud Computing delivers resources as on-demand, network-accessible services.
- C) Virtualization completely eliminates the need for physical data centers, whereas Cloud Computing strictly requires local on-premises hardware.
- D) Any organization running a Type 1 hypervisor on-premises has inherently achieved full cloud computing compliance.

> **Answer: B**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ B ถูก:** เนื้อหาสไลด์ระบุชัดเจนว่า *Virtualization $\neq$ Cloud Computing*: Virtualization มุ่งเน้นการจำลองและตัดขาดการพึ่งพาฮาร์ดแวร์กายภาพ (*abstracted from physical hardware*) ส่วน Cloud Computing มุ่งเน้นรูปแบบการส่งมอบทรัพยากรคอมพิวเตอร์เหล่านั้นออกมาเป็น "บริการ" ผ่านเครือข่าย (*delivered as services over a network*)
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A ผิด:* สลับนิยามกันอย่างสิ้นเชิง
>   * *ข้อ C ผิด:* ทั้งคู่ยังคงต้องมีฮาร์ดแวร์กายภาพและศูนย์ข้อมูลรองรับอยู่เบื้องหลังเสมอ
>   * *ข้อ D ผิด:* สไลด์ระบุชัดว่า *"Not all virtualization is cloud"* การมีแค่ Hypervisor แต่ขาดระบบ Self-service, Automation และ Billing ไม่ถือว่าเป็นคลาวด์

---

### Question 6
During an online university admission registration, traffic surges unexpectedly by 800% for three hours. The cloud infrastructure automatically spins up 15 additional application instances to maintain response times, and subsequently terminates them when traffic subsides. Which core cloud characteristic is demonstrated?
- A) Resource Pooling
- B) Measured Service
- C) Broad Network Access
- D) Rapid Elasticity

> **Answer: D**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ D ถูก:** **Rapid Elasticity (ความยืดหยุ่นรวดเร็ว)** คือความสามารถของระบบในการปรับเปลี่ยนทรัพยากรแบบไดนามิกและเป็นอัตโนมัติตามปริมาณความต้องการใช้งานจริง (*Dynamic adjustment of resources in response to changing demand / automatically adding capacity during peak usage*)
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A ผิด:* Resource Pooling คือการรวมทรัพยากรฮาร์ดแวร์มาแชร์กันระหว่างผู้ใช้งานหลายราย
>   * *ข้อ B ผิด:* Measured Service คือระบบการวัดปริมาณเพื่อคิดเงินตามที่ใช้จริง
>   * *ข้อ C ผิด:* Broad Network Access คือการเปิดให้เข้าถึงระบบได้จากหลากหลายอุปกรณ์ผ่านเครือข่าย

---

### Question 7
A company is developing a custom web platform. The development team wants to deploy their application source code and manage database records directly, but they refuse to handle operating system patching, middleware installation, or hardware maintenance. Which cloud service model should they choose?
- A) Infrastructure as a Service (IaaS)
- B) Platform as a Service (PaaS)
- C) Software as a Service (SaaS)
- D) On-Premises Bare-Metal Hosting

> **Answer: B**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ B ถูก:** ในโมเดล **PaaS (Platform as a Service)** ลูกค้าจะรับผิดชอบเฉพาะระดับ **Applications และ Data** เท่านั้น ขณะที่ผู้ให้บริการคลาวด์จะดูแลตั้งแต่ Runtime, Middleware, OS, Virtualization ตลอดจน Physical Infrastructure ทั้งหมด ทำให้นักพัฒนาไม่ต้องกังวลเรื่องการ Patch OS หรือดูแลเซิร์ฟเวอร์
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A ผิด:* IaaS บังคับให้ลูกค้าต้องดูแลรับผิดชอบตั้งแต่ OS, Middleware และ Runtime เอง
>   * *ข้อ C ผิด:* SaaS ผู้ให้บริการจะเป็นผู้ดูแลทุกอย่างรวมถึงตัว Application ลูกค้าจะไม่สามารถลงโค้ดของตนเองได้
>   * *ข้อ D ผิด:* On-Premises ลูกค้าต้องดูแลจัดการทุกเลเยอร์ด้วยตนเอง 100%

---

### Question 8
In an Infrastructure as a Service (IaaS) deployment, which of the following responsibilities falls under the CUSTOMER'S domain rather than the cloud provider's?
- A) Applying security patches to the guest operating system and managing application access policies.
- B) Servicing faulty ECC memory modules in the physical server racks.
- C) Updating the firmware of the physical network switches inside the data center.
- D) Upgrading the core Type 1 hypervisors across the physical host cluster.

> **Answer: A**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ A ถูก:** ในโมเดล IaaS และตามหลักการ **Shared Responsibility Model** ลูกค้ามีหน้าที่รับผิดชอบความปลอดภัย "ใน" คลาวด์ (*Security IN the Cloud*) ซึ่งรวมถึงระบบปฏิบัติการของเครื่องเกสต์ (*Guest OS Patching*), บัญชีผู้ใช้, ข้อมูล และนโยบายการควบคุมการเข้าถึง (*Access policies*)
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ B, C และ D ผิด:* การดูแลรักษาแรมของเครื่องจริง, การอัปเดตสวิตช์เครือข่าย และการอัปเกรดไฮเปอร์ไวเซอร์ของศูนย์ข้อมูล ล้วนเป็นหน้าที่ของผู้ให้บริการคลาวด์ (*Security OF the Cloud*) ทั้งสิ้น

---

### Question 9
An international bank stores its highly confidential customer financial records in a dedicated on-premises infrastructure behind strict compliance firewalls, while utilizing a public cloud platform to run high-volume customer-facing marketing analytics. Which deployment model does this architecture illustrate?
- A) Private Cloud
- B) Multi-Cloud
- C) Hybrid Cloud
- D) Community Cloud

> **Answer: C**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ C ถูก:** **Hybrid Cloud** ถูกนิยามว่าเป็นการเชื่อมต่อสภาพแวดล้อมโครงสร้างพื้นฐานที่แตกต่างกันเข้าด้วยกัน (*Different infrastructure environments connected together*) โดยเฉพาะการเชื่อมต่อระหว่างระบบส่วนตัว (On-Premises / Private) กับระบบคลาวด์สาธารณะ (Public Cloud)
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ A ผิด:* ไม่ใช่ Private Cloud ล้วน เพราะมีการใช้งาน Public Cloud ร่วมด้วย
>   * *ข้อ B ผิด:* Multi-Cloud คือการใช้ผู้ให้บริการ Public Cloud ตั้งแต่ 2 เจ้าขึ้นไป (เช่น AWS คู่กับ Google Cloud)
>   * *ข้อ D ผิด:* Community Cloud คือคลาวด์ที่แชร์กันเฉพาะกลุ่มองค์กรที่มีพันธกิจร่วมกัน

---

### Question 10
From an architectural perspective, what is the primary structural difference between a Virtual Machine (VM) and a Container?
- A) A VM virtualizes physical hardware and requires a dedicated guest operating system, whereas a container virtualizes at the OS level and shares the host kernel.
- B) A VM runs strictly on personal computers, whereas containers can only execute within enterprise public clouds.
- C) A VM does not utilize a hypervisor, whereas containers require two concurrent hypervisors to function.
- D) A VM packages only application dependencies, whereas a container includes an entire simulated motherboard and BIOS firmware.

> **Answer: A**  
> **Explanation (คำอธิบาย):**  
> * **เหตุผลที่ข้อ A ถูก:** ตามสไลด์หน้า *Containers vs Virtual Machines*:
>   * **Virtual Machine:** ทำการจำลองในระดับฮาร์ดแวร์ (*Virtualize hardware environments*) และต้องรัน Guest OS แยกเด็ดขาดของตนเอง
>   * **Container:** ทำการจำลองในระดับระบบปฏิบัติการ (*Virtualize at the operating-system level*) โดยแชร์ Host OS Kernel ร่วมกัน และแพ็กเกจเฉพาะแอปพลิเคชันกับ Dependencies เท่านั้น ทำให้มีน้ำหนักเบาและประหยัดทรัพยากรกว่ามาก
> * **เหตุผลที่ข้ออื่นผิด:**
>   * *ข้อ B ผิด:* ทั้ง VM และ Container สามารถทำงานได้ทั้งบนเครื่องส่วนบุคคลและคลาวด์ระดับองค์กร
>   * *ข้อ C ผิด:* VM ต้องใช้ Hypervisor ส่วน Container ใช้ Container Runtime
>   * *ข้อ D ผิด:* สลับคุณสมบัติกันอย่างสิ้นเชิง

---

# Section 4: Scenario-Based Classification Activity (กิจกรรมฝึกทักษะจำแนกประเภทตามสถานการณ์จริง)

ตารางฝึกฝนการวิเคราะห์สถานการณ์เพื่อความแม่นยำในการสอบ (อ้างอิงจากบทเรียน Week 4 Activity):

| หมายเลขสถานการณ์ | รายละเอียดสถานการณ์ (Scenario Description) | การจำแนกประเภท (Classification) | เหตุผลเชิงวิเคราะห์ทางเทคนิค (Technical Justification) |
| :---: | :--- | :---: | :--- |
| **1** | Run Linux inside your Windows laptop. | **VM (Type 2)** | Linux รันเป็น Guest OS อยู่บนเครื่องเสมือนที่ควบคุมโดย Hypervisor บนระบบปฏิบัติการ Windows ของโฮสต์ |
| **2** | Rent a virtual server online (e.g., AWS EC2). | **IaaS** | ผู้ให้บริการจัดหาโครงสร้างพื้นฐาน Compute/Storage/Network เสมือนมาให้ โดยผู้เช่าต้องจัดการเลเยอร์ OS และแอปพลิเคชันเอง |
| **3** | Deploy code directly without managing the OS. | **PaaS** | ผู้พัฒนาโฟกัสเพียงตัวโค้ดและข้อมูล โดยผู้ให้บริการคลาวด์ดูแลระบบปฏิบัติการ รันไทม์ และเซิร์ฟเวอร์เบื้องหลังทั้งหมด |
| **4** | Use an online email application (e.g., Gmail). | **SaaS** | ผู้ใช้ใช้งานซอฟต์แวร์แอปพลิเคชันที่สมบูรณ์ผ่านเว็บเบราว์เซอร์ โดยไม่ต้องดูแลหรือจัดการโครงสร้างพื้นฐานใดๆ เลย |
| **5** | Test experimental software in an isolated OS. | **VM** | เครื่องเสมือนมอบสภาพแวดล้อมที่แยกขาดจากเครื่องจริง ป้องกันไม่ให้ข้อผิดพลาดส่งผลกระทบต่อระบบปฏิบัติการหลัก |
| **6** | Use a cloud-based university learning portal. | **SaaS** | อาจารย์และนักศึกษาเข้าใช้งานระบบการเรียนการสอนสำเร็จรูปที่พร้อมใช้ผ่านระบบคลาวด์โดยตรง |

---

# Section 5: Key Takeaways & Exam Checklist (สรุปประเด็นหัวใจสำคัญก่อนเข้าห้องสอบ)

* [ ] **Takeaway 1:** Virtualization คือการทำ **Abstraction** เพื่อแปลงทรัพยากรกายภาพ (Physical Resources) ไปเป็นทรัพยากรเชิงตรรกะเสมือน (Logical Resources) เพื่อขจัดปัญหาการใช้งานฮาร์ดแวร์ไม่คุ้มค่า
* [ ] **Takeaway 2:** เครื่องเสมือน (VM) ทำงานเสมือนเครื่องคอมพิวเตอร์อิสระ โดยมี **Hypervisor** เป็นตัวกลางควบคุมการเข้าถึงฮาร์ดแวร์ (Type 1 ทำงานบนฮาร์ดแวร์โดยตรง ส่วน Type 2 ทำงานบน Host OS)
* [ ] **Takeaway 3:** **Virtualization $\neq$ Cloud Computing** — การจำลองเสมือนเป็นเทคโนโลยีสร้างทรัพยากร แต่คลาวด์เป็นรูปแบบการส่งมอบทรัพยากรเป็นบริการตามความต้องการผ่านเครือข่าย
* [ ] **Takeaway 4:** รูปแบบบริการ **IaaS, PaaS และ SaaS** แตกต่างกันที่ **"ขอบเขตความรับผิดชอบในการบริหารจัดการเลเยอร์ของ IT Stack"** ยิ่งขยับไปทาง SaaS ลูกค้ายิ่งควบคุมน้อยลงและผู้ให้บริการยิ่งดูแลมากขึ้น
* [ ] **Takeaway 5:** ตามหลัก **Shared Responsibility Model** ผู้ให้บริการดูแลความปลอดภัย "ของ" คลาวด์ (*Security OF the Cloud*) ส่วนลูกค้าต้องรับผิดชอบความปลอดภัย "ใน" คลาวด์ (*Security IN the Cloud*) เสมอ

```