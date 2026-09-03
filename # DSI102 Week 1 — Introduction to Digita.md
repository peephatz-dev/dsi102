# DSI102 Week 1 — Introduction to Digital Technology & Technical Fundamentals

> **Study Note**
>
> This guide explains the core concepts of digital technology, computer platforms, cloud computing, networking, cybersecurity, AI automation, and digital adoption.
>
> <!-- คอมเมนต์ไทย: เอกสารนี้เน้น "เข้าใจความสัมพันธ์ของแต่ละเรื่อง" มากกว่าการท่องศัพท์แยกกัน -->

---

# 1. Technology → Digital Technology → Digital Service

## Technology

**Technology** is the practical application of scientific knowledge to solve problems.

Examples:

* Paper notebook
* Mechanical clock
* Calculator

<!-- ไทย: Technology เป็นคำกว้างที่สุด หมายถึง "เครื่องมือหรือวิธีการที่มนุษย์สร้างขึ้นเพื่อแก้ปัญหา" -->

### Memory Tip

> **Technology = Tool**

<!-- จำง่าย: Technology = เครื่องมือ -->

---

## Digital Technology

**Digital Technology** refers to electronic hardware and software systems that store, compute, transmit, and manipulate information using discrete binary values such as `0` and `1`.

Examples:

* Computer
* Smartphone
* Digital database
* Cloud spreadsheet

<!-- ไทย: จุดสำคัญคือ "Digital" เพราะข้อมูลถูกแทนด้วยสถานะที่เป็น discrete โดยพื้นฐานคือ 0 และ 1 -->

### Memory Tip

> **Digital Technology = Technology that processes data digitally**

---

## Digital Service

A **Digital Service** delivers value directly to end users through connected applications, databases, platforms, and networks.

Examples:

* Online banking
* Learning Management System (LMS)
* Online shopping platform

<!-- ไทย: Digital Service ไม่ใช่แค่ตัวเครื่องหรือโปรแกรม แต่คือ "บริการที่ผู้ใช้ได้รับคุณค่า" -->

### The Hierarchy

```text
Technology
     ↓
Digital Technology
     ↓
Digital Service
```

Or remember:

> **Tool → System → Service**

<!-- ไทย: จำเป็นลำดับ "เครื่องมือ → ระบบ → บริการ" -->

---

# 2. Analog vs. Digital vs. Digitization

## Analog

An **Analog Signal** is a continuous physical signal whose value changes smoothly over time.

Examples:

* Sound waves
* Vinyl records
* Mercury thermometers

<!-- ไทย: Analog = ต่อเนื่อง ค่าเปลี่ยนได้เรื่อย ๆ -->

### Memory Tip

> **Analog = Continuous**

---

## Digital

**Digital data** represents information using discrete states.

A fundamental representation is:

```text
0 / 1
```

<!-- ไทย: Digital = ไม่ต่อเนื่อง (Discrete) และในระดับพื้นฐานของคอมพิวเตอร์คือ 0 กับ 1 -->

### Memory Tip

> **Digital = Discrete**

---

## Digitization

**Digitization** is the process of converting continuous analog information into machine-readable digital data.

The main stages are:

```text
Sampling → Quantizing → Encoding
```

### S-Q-E Memory Trick

> **S-Q-E = Sample → Quantize → Encode**

<!-- ไทย:
Sampling = เก็บตัวอย่าง
Quantizing = แบ่ง/กำหนดค่าที่เป็น discrete
Encoding = เข้ารหัสเป็นข้อมูลดิจิทัล
-->

### Simple Mental Model

```text
Analog
  ↓
Sample
  ↓
Quantize
  ↓
Encode
  ↓
Digital
```

---

# 3. Binary Abstraction

**Binary Abstraction** is the conceptual technique of representing different types of information using unified patterns of binary digits (`0` and `1`).

Different media can be represented digitally:

* Text
* Images
* Audio
* Video

Once represented as binary data, computer systems can process them using common digital operations.

Examples:

```text
Store
Compress
Transmit
Encrypt
```

<!-- ไทย: จุดสำคัญคือ ไม่ว่าข้อมูลเดิมจะเป็นข้อความ รูป เสียง หรือวิดีโอ เมื่อเข้าสู่ระบบดิจิทัลแล้วสามารถถูกแทนเป็น bits ได้ -->

### Memory Tip

> **Everything Digital → 0 and 1**

<!-- จำว่า: สุดท้ายข้อมูลดิจิทัลทั้งหมดลงเอยที่ 0 และ 1 -->

---

# 4. The 5 Building Blocks of Digital Technology

Every digital service depends on five interconnected building blocks:

```text
People
Data
Software
Hardware
Networks
```

---

## 4.1 People

**People** include:

* End users
* Administrators
* Developers
* Organizational stakeholders

<!-- ไทย: ใครเป็นคนใช้ ใครดูแล ใครสร้าง และใครได้รับผลกระทบ -->

---

## 4.2 Data

**Data** includes:

* Transaction records
* Databases
* User profiles
* Telemetry
* Multimedia

<!-- ไทย: ข้อมูลที่ระบบต้องเก็บ ใช้ วิเคราะห์ หรือส่งต่อ -->

---

## 4.3 Software

**Software** includes:

* Operating systems
* Applications
* Algorithms
* APIs
* Business logic

<!-- ไทย: Software คือส่วนที่กำหนดว่า "ระบบจะทำอะไร" -->

---

## 4.4 Hardware

**Hardware** includes:

* CPU
* GPU
* RAM
* Persistent storage
* Sensors
* Actuators

<!-- ไทย: Hardware คือส่วนทางกายภาพที่ใช้ประมวลผลและทำงาน -->

---

## 4.5 Networks

**Networks** provide communication between systems.

Examples:

* Wi-Fi
* 5G
* Ethernet
* Internet backbone

<!-- ไทย: Network ทำให้เครื่องและระบบต่าง ๆ ติดต่อและแลกเปลี่ยนข้อมูลกันได้ -->

---

## Memory Trick

Remember:

> **P-D-S-H-N**

A useful sentence is:

> **People use Data through Software on Hardware over Networks.**

<!-- ไทย:
คน → ใช้ข้อมูล → ผ่านซอฟต์แวร์ → บนฮาร์ดแวร์ → ผ่านเครือข่าย
-->

---

# 5. Information Technology (IT) vs. Operational Technology (OT)

## Information Technology — IT

**Information Technology (IT)** focuses on managing, storing, sending, and retrieving information and transactional data.

Examples:

* Databases
* Business systems
* User accounts
* Transactions
* Corporate platforms

<!-- ไทย: IT เน้น "ข้อมูลและสารสนเทศ" -->

### Memory Tip

> **IT = Information**

---

## Operational Technology — OT

**Operational Technology (OT)** focuses on systems that monitor, control, and operate physical processes and equipment.

Examples:

* Industrial sensors
* PLC controllers
* Factory equipment
* Physical infrastructure
* Automated shutdown systems

<!-- ไทย: OT เน้น "การควบคุมสิ่งที่เกิดขึ้นจริงในโลกกายภาพ" -->

### Memory Tip

> **OT = Operation**

---

## How to Differentiate IT and OT

Ask:

> **Is the system mainly managing information, or controlling physical operations?**

```text
Information → IT

Physical Operation → OT
```

<!-- ไทย: ถ้าโจทย์พูดถึง database/account/transaction ให้คิด IT
ถ้าพูดถึง sensor/PLC/machine/factory control ให้คิด OT
-->

---

# 6. Computer Platform Stack

The basic computer platform stack is:

```text
User
  ↓
Application Programs
  ↓
Operating System
  ↓
Hardware
```

---

## User

The **User** interacts with applications and digital services.

<!-- ไทย: คนที่ใช้งานระบบ -->

---

## Application Programs

Applications provide specific functions to users.

Examples:

* Web browser
* Word processor
* Mobile application

<!-- ไทย: Application คือโปรแกรมที่ผู้ใช้เปิดเพื่อทำงานบางอย่าง -->

---

## Operating System

The **Operating System (OS)** manages computer resources and provides an interface between applications, users, and hardware.

Examples:

* Windows
* macOS
* Linux

<!-- ไทย: OS เป็นตัวกลางสำคัญระหว่าง Software กับ Hardware -->

---

## Hardware

Hardware is the physical computing infrastructure.

Examples:

* CPU
* RAM
* Storage
* Input/Output devices

<!-- ไทย: Hardware = ส่วนที่จับต้องได้ของคอมพิวเตอร์ -->

### Memory Tip

> **User → App → OS → Hardware**

<!-- จำเป็นภาษาไทย: คน → โปรแกรม → OS → เครื่อง -->

---

# 7. Operating System Functions

The Operating System has three major roles in this study guide:

---

## 7.1 Resource Manager

The OS manages system resources such as:

* CPU cycles
* Main memory
* Storage
* I/O devices

The OS determines how resources are allocated among competing processes.

<!-- ไทย: OS ทำหน้าที่เหมือน "ผู้จัดสรรทรัพยากร" ว่าโปรแกรมไหนจะใช้ CPU/RAM/Storage เมื่อไร -->

### Memory Question

> **Who gets the resources, when, and how much?**

---

## 7.2 User Interface

The OS provides interfaces through which users or other systems interact with the computer.

Examples:

* CLI
* GUI
* Touch UI
* Mobile UI
* REST/System APIs

<!-- ไทย: UI คือช่องทางที่ใช้สั่งงานหรือสื่อสารกับระบบ -->

---

## 7.3 Security Boundary

The OS helps enforce security controls such as:

* Authentication
* Access control
* User identity
* Memory isolation

<!-- ไทย: OS ไม่ได้แค่ทำให้เครื่องทำงาน แต่ยังช่วยกำหนดว่า "ใครมีสิทธิ์ทำอะไร" -->

### Memory Tip

Remember the three OS roles:

```text
Resource
Interface
Security
```

> **OS = Manage Resources + Provide Interface + Enforce Security**

---

# 8. Cloud Computing

Cloud computing provides computing resources over networks on demand.

The three important service models are:

```text
IaaS → PaaS → SaaS
```

The key idea is:

> **As you move from IaaS toward SaaS, the cloud provider manages more of the technology stack.**

<!-- ไทย: ยิ่งจาก IaaS → PaaS → SaaS ผู้ให้บริการ Cloud จะรับผิดชอบมากขึ้น และผู้ใช้ดูแลน้อยลง -->

---

# 8.1 IaaS — Infrastructure as a Service

IaaS provides basic computing infrastructure.

The provider delivers:

* Virtual servers
* Storage
* Physical networks

The customer manages:

* Operating System
* Runtime
* Middleware
* Applications
* Data

### Memory Tip

> **IaaS = Rent the Infrastructure**

<!-- ไทย: เหมือนเช่า "เครื่อง/โครงสร้างพื้นฐาน" แล้วเรายังต้องดูแล OS และ Software เอง -->

---

# 8.2 PaaS — Platform as a Service

PaaS provides a managed platform for running applications.

The provider manages:

* Hardware
* Virtualization
* Operating System
* Runtime

The customer mainly manages:

* Applications
* Data

### Memory Tip

> **PaaS = Rent the Platform**

<!-- ไทย: เราไม่ต้องดูแล OS/runtime เองมากนัก แต่เอา Application และ Data ไปใช้งานบน Platform -->

---

# 8.3 SaaS — Software as a Service

SaaS provides a complete managed software application.

The provider manages:

* Infrastructure
* Operating System
* Application
* Maintenance

The customer mainly manages:

* User access
* Application settings

Examples:

* Google Workspace
* Microsoft 365
* Canvas LMS

### Memory Tip

> **SaaS = Use the Software**

<!-- ไทย: เปิดแล้วใช้งาน ไม่ต้องสร้างหรือดูแล Infrastructure เอง -->

---

## Cloud Memory Trick

```text
IaaS → PaaS → SaaS
```

Think:

```text
I = Infrastructure
P = Platform
S = Software
```

And:

> **I manage more → Provider manages more → I manage less**

<!-- ไทย: IaaS = เราดูแลเยอะ
PaaS = แบ่งกันดูแล
SaaS = Provider ดูแลเกือบทั้งหมด
-->

---

# 9. Communication Protocols

A **Communication Protocol** is a standardized set of rules that allows different computing devices to communicate and exchange data.

Examples:

* HTTP
* TCP
* IP
* DNS
* Ethernet

Protocols define how data should be structured, transmitted, routed, and interpreted.

<!-- ไทย: Protocol เปรียบเหมือน "กฎ + ภาษากลาง" ที่ทำให้อุปกรณ์ต่างชนิดคุยกันรู้เรื่อง -->

### Simple Analogy

Imagine two people speaking different languages.

Even if they are physically connected by a phone call, communication will fail without a shared language.

Similarly:

> **Network connection alone is not enough.**

Devices also need compatible protocols.

### Memory Tip

> **Protocol = Rules for Communication**

---

# 10. Information Security — CIA Triad

The three fundamental security pillars are:

```text
Confidentiality
Integrity
Availability
```

Remember:

> **CIA**

---

# 10.1 Confidentiality

**Confidentiality** means protecting information from unauthorized access or disclosure.

Examples of controls:

* Authentication
* Encryption
* Access control

<!-- ไทย: Confidentiality = "ใครเห็นข้อมูลได้บ้าง?" -->

### Memory Tip

> **C = Confidential = Keep it Secret**

---

# 10.2 Integrity

**Integrity** means ensuring that data remains accurate, complete, and protected from unauthorized modification.

Unauthorized changes include:

* Modification
* Insertion
* Deletion
* Tampering

<!-- ไทย: Integrity = "ข้อมูลยังถูกต้องและไม่ถูกแก้โดยไม่ได้รับอนุญาตหรือไม่?" -->

### Memory Tip

> **I = Integrity = Keep it Correct**

---

# 10.3 Availability

**Availability** means ensuring that systems, networks, and services remain accessible to authorized users when needed.

Examples of mitigation:

* Redundancy
* Failover
* DDoS mitigation

<!-- ไทย: Availability = "ระบบยังใช้งานได้ไหม?" -->

### Memory Tip

> **A = Available = Keep it Working**

---

## CIA Quick Test

Use these three questions:

```text
C → Who can see it?

I → Was the data changed?

A → Can the system still be used?
```

<!-- ไทย: สูตรจำง่ายมาก -->

| Scenario                                 | Security Pillar     |
| ---------------------------------------- | ------------------- |
| Unauthorized person views sensitive data | **Confidentiality** |
| Someone changes an account balance       | **Integrity**       |
| Server becomes unavailable               | **Availability**    |

### Ultimate CIA Memory Trick

> **C = Secret**
> **I = Correct**
> **A = Working**

<!-- ไทย: ลับ → ถูกต้อง → ใช้งานได้ -->

---

# 11. Attack Surface

An **Attack Surface** is the total collection of exploitable entry points through which an attacker may attempt to compromise a system.

Examples:

* Network interfaces
* Endpoints
* APIs
* Services
* Credentials

<!-- ไทย: Attack Surface ไม่ใช่แค่ "ช่องโหว่หนึ่งจุด" แต่หมายถึง "พื้นที่/จุดทั้งหมดที่อาจถูกโจมตีได้" -->

### House Analogy

Imagine an organization as a house.

The attack surface could include:

```text
Doors
Windows
Ventilation
Locks
Other entrances
```

The more entry points a system exposes, the more points need to be secured.

### Memory Tip

> **Attack Surface = All Possible Entry Points**

---

# 12. AI & Automation Operational Pipeline

An intelligent automated system can be understood through five sequential stages:

```text
Data
  ↓
Model
  ↓
Prediction
  ↓
Action
  ↓
Feedback
```

---

# 12.1 Data

**Data** consists of inputs used by the system.

Sources can include:

* Historical logs
* Real-time sensors
* Training features

<!-- ไทย: Data = สิ่งที่ระบบเอาเข้ามาเพื่อเรียนรู้หรือประมวลผล -->

---

# 12.2 Model

A **Model** represents mathematical or algorithmic patterns used to infer relationships from data.

<!-- ไทย: Model = สิ่งที่เรียนรู้รูปแบบจาก Data เพื่อใช้สร้างผลลัพธ์ -->

---

# 12.3 Prediction / Inference

**Prediction / Inference** is the process of producing an output from the model.

Examples:

* Classification
* Forecasting
* Generated output

<!-- ไทย: Model เอาข้อมูลเข้าไปแล้วสร้างคำตอบ/การคาดการณ์ออกมา -->

---

# 12.4 Action

**Action** is what the system does with the prediction.

Examples:

* Automated workflow
* Decision
* Recommendation

<!-- ไทย: Prediction ไม่ได้จบที่คำตอบ แต่สามารถนำไปสู่การกระทำจริง -->

---

# 12.5 Feedback

**Feedback** represents the real-world results of the system's actions.

The feedback can be used to improve or recalibrate the system.

<!-- ไทย: Feedback = ดูว่าผลลัพธ์จริงเป็นอย่างไร แล้วนำกลับไปปรับปรุงระบบ -->

### Memory Sentence

> **Data → Model → Predict → Act → Learn**

<!-- ไทย: มีข้อมูล → สร้างโมเดล → ทำนาย → ลงมือ → เรียนรู้จากผล -->

### Acronym

> **D-M-P-A-F**

---

# 13. Change Management and Digital Adoption

Digital transformation does not depend only on technical implementation.

A major source of failure can be:

> **Human and Organizational Friction**

Examples:

* Fear of complexity
* Lack of training
* Unclear workflows
* Resistance to new systems

<!-- ไทย: ระบบอาจไม่ได้พังทางเทคนิค แต่คนอาจไม่ยอมใช้ ใช้ไม่เป็น หรือไม่เข้าใจว่าทำไมต้องเปลี่ยน -->

---

# Structured Adoption Process

The study guide proposes five stages:

```text
Explain Why
      ↓
Train Clearly
      ↓
Pilot Safely
      ↓
Measure Use
      ↓
Improve Continuously
```

---

## 13.1 Explain Why

Explain why the organization needs the change.

<!-- ไทย: ต้องบอกก่อนว่า "เปลี่ยนไปทำไม" -->

---

## 13.2 Train Clearly

Provide clear training so users understand how to use the new system.

<!-- ไทย: สอนให้คนใช้งานเป็น -->

---

## 13.3 Pilot Safely

Test the new system in a controlled environment before full deployment.

<!-- ไทย: ทดลองกลุ่มเล็กก่อน ไม่ควรเปลี่ยนทั้งองค์กรทันที -->

---

## 13.4 Measure Use

Measure whether people are actually using the system effectively.

<!-- ไทย: อย่าดูแค่ว่า Deploy สำเร็จ ต้องดูว่า "คนใช้จริงไหม" -->

---

## 13.5 Improve Continuously

Use observations and feedback to continuously improve the system.

<!-- ไทย: หลัง Deploy แล้วต้องปรับปรุงต่อ ไม่ใช่ทำครั้งเดียวแล้วจบ -->

### Memory Tip

> **Explain → Train → Pilot → Measure → Improve**

<!-- ไทย: บอกเหตุผล → สอน → ทดลอง → วัด → ปรับ -->

---

# 14. Vocabulary Quick Reference

| Term                       | Simple Meaning                      | Thai Memory                         |
| -------------------------- | ----------------------------------- | ----------------------------------- |
| **Analog Signal**          | Continuous physical signal          | สัญญาณต่อเนื่อง                     |
| **Attack Surface**         | All possible attack entry points    | จุดที่โจมตีได้ทั้งหมด               |
| **Availability**           | Systems remain accessible           | ระบบยังใช้ได้                       |
| **Binary Abstraction**     | Representing data as binary         | ทุกอย่างแทนด้วย 0/1                 |
| **Change Management**      | Managing human adoption of change   | จัดการการเปลี่ยนแปลงของคน           |
| **Cloud Computing**        | On-demand computing resources       | ใช้ทรัพยากรคอมพิวเตอร์ผ่านเครือข่าย |
| **Communication Protocol** | Rules for network communication     | กติกาการสื่อสาร                     |
| **Confidentiality**        | Protection from unauthorized access | ความลับ                             |
| **Digital Service**        | Technology that delivers user value | บริการที่ส่งมอบคุณค่า               |
| **Digital Technology**     | Technology using digital data       | เทคโนโลยีดิจิทัล                    |
| **Digitization**           | Analog-to-digital conversion        | แปลง Analog เป็น Digital            |
| **IaaS**                   | Infrastructure managed as a service | เช่า Infrastructure                 |
| **Integrity**              | Data remains correct and unmodified | ข้อมูลถูกต้อง                       |
| **IT**                     | Information Technology              | จัดการข้อมูล                        |
| **OT**                     | Operational Technology              | ควบคุมการปฏิบัติการจริง             |
| **PaaS**                   | Managed application platform        | เช่า Platform                       |
| **SaaS**                   | Complete software service           | ใช้ Software สำเร็จรูป              |
| **Virtual Machine (VM)**   | Software-emulated computer          | คอมพิวเตอร์จำลอง                    |

---

# 15. Key Exam Questions

## Question 1 — Technology Hierarchy

**How does a physical tool differ from digital technology and a digital service?**

### Answer Structure

```text
Technology
→ Physical/practical tool

Digital Technology
→ Electronic system that processes binary data

Digital Service
→ Connected technology that delivers value to users
```

<!-- ไทย: ถ้าเจอคำถามนี้ ให้ตอบเป็น Tool → System → Service -->

---

## Question 2 — IaaS vs PaaS

**What is the critical difference between IaaS and PaaS?**

### Answer

In **IaaS**, the customer manages the operating system, runtime, middleware, applications, and data.

In **PaaS**, the provider manages the operating system and runtime, while the customer mainly manages applications and data.

<!-- ไทย: จุดต่างที่ต้องจับคือ "OS และ Runtime ใครเป็นคนดูแล?" -->

> **IaaS → Customer manages OS**

> **PaaS → Provider manages OS + Runtime**

---

## Question 3 — IT or OT?

A facility has:

* Temperature sensors
* PLC controllers
* Automated cooling shutdown

### Answer

This is primarily **Operational Technology (OT)** because the systems monitor and control physical operations and equipment.

<!-- ไทย: เห็น Sensor + PLC + เครื่องจักร/ระบบทางกายภาพ → คิด OT -->

---

## Question 4 — CIA Triad

An unauthorized user changes an account balance in a database.

Which security pillar is violated?

### Answer

**Integrity**

Because the data was modified without authorization.

<!-- ไทย: ไม่ได้เน้นว่าข้อมูลถูกดู แต่เน้นว่า "ยอดเงินถูกเปลี่ยน" → Integrity -->

---

## Question 5 — AI Pipeline

What are the five stages of the AI operational pipeline?

### Answer

```text
Data
→ Model
→ Prediction
→ Action
→ Feedback
```

<!-- ไทย: ข้อนี้ควรจำลำดับให้ได้แบบไม่ต้องคิด -->

---

## Question 6 — Digital Adoption

Why can automating an inefficient manual process lead to adoption failure?

### Answer

Because automation does not automatically solve human and organizational problems. If the original workflow is inefficient, unclear, or poorly understood, simply automating it may preserve those problems and create resistance or confusion.

<!-- ไทย: หลักคิดคือ "เอากระบวนการที่แย่อยู่แล้วไปทำให้เร็วขึ้น ไม่ได้แปลว่ามันจะดีขึ้น" -->

---

# 16. One-Page Memory Map

Use this map to recall the entire chapter:

```text
                    DIGITAL TECHNOLOGY
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       DATA            SOFTWARE          HARDWARE
          │                │                │
          └────────── NETWORKS ─────────────┘
                           │
                        PEOPLE
                           │
                           ▼
                    DIGITAL SERVICE
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
       CLOUD            NETWORK            SECURITY
        │                  │                  │
   IaaS/PaaS/SaaS      Protocols            CIA
                                              │
                                   C → Secret
                                   I → Correct
                                   A → Working
                                              │
                                              ▼
                                           AI
                                              │
                              Data → Model → Prediction
                                              ↓
                                           Action
                                              ↓
                                          Feedback
                                              │
                                              ▼
                                    CHANGE MANAGEMENT
                                              │
                         Explain → Train → Pilot
                                  → Measure → Improve
```

<!-- ไทย: ถ้าจำภาพรวมนี้ได้ จะสามารถเชื่อมทุกหัวข้อเข้าด้วยกันได้ -->

---

# 17. Final Memory Checklist

Before the exam, make sure you can recall these without looking:

* [ ] **Tool → System → Service**
* [ ] **Analog = Continuous**
* [ ] **Digital = Discrete**
* [ ] **Digitization = Sampling → Quantizing → Encoding**
* [ ] **Binary = 0 and 1**
* [ ] **P-D-S-H-N**
* [ ] **IT = Information**
* [ ] **OT = Operation**
* [ ] **User → App → OS → Hardware**
* [ ] **OS = Resource + Interface + Security**
* [ ] **IaaS → PaaS → SaaS**
* [ ] **Provider manages more from IaaS → SaaS**
* [ ] **Protocol = Rules for Communication**
* [ ] **CIA = Confidentiality + Integrity + Availability**
* [ ] **Attack Surface = All Possible Entry Points**
* [ ] **Data → Model → Prediction → Action → Feedback**
* [ ] **Explain → Train → Pilot → Measure → Improve**

---

# Ultra-Short Memory Version

```text
TECHNOLOGY
Tool → System → Service

DIGITAL
Analog → Digitization → Digital
Everything → 0/1

5 BUILDING BLOCKS
People → Data → Software → Hardware → Networks

IT vs OT
IT = Information
OT = Operation

COMPUTER
User → App → OS → Hardware

OS
Resource → Interface → Security

CLOUD
IaaS → PaaS → SaaS
More Provider Responsibility →

NETWORK
Protocol = Communication Rules

SECURITY
CIA
C = Secret
I = Correct
A = Working

AI
Data → Model → Prediction → Action → Feedback

ADOPTION
Explain → Train → Pilot → Measure → Improve
```

<!-- ไทย: ถ้าเวลาก่อนสอบเหลือน้อยมาก ให้อ่านส่วนนี้ซ้ำหลายรอบ แล้วค่อยย้อนกลับไปอ่านรายละเอียดด้านบน -->
