import { StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';

export const week1KeyConcepts: KeyConcept[] = [
  {
    id: 'w1-c1',
    term: 'Technology',
    thaiTerm: 'เทคโนโลยี',
    definition: 'The practical application of scientific knowledge to solve problems (broadest category: tools or methods created to solve problems).',
    thaiDefinition: 'เครื่องมือหรือวิธีการที่มนุษย์สร้างขึ้นเพื่อแก้ปัญหา เป็นคำกว้างที่สุด ครอบคลุมทั้งเครื่องมือกลและสิ่งประดิษฐ์ทั่วไป',
    example: 'Paper notebook, mechanical clock, hand calculator',
    pdfPage: 5,
    category: 'Core Concepts',
    important: true,
  },
  {
    id: 'w1-c2',
    term: 'Digital Technology',
    thaiTerm: 'เทคโนโลยีดิจิทัล',
    definition: 'Electronic hardware and software systems that store, compute, transmit, and manipulate information using discrete binary values (0 and 1).',
    thaiDefinition: 'ระบบอิเล็กทรอนิกส์และซอฟต์แวร์ที่ประมวลผล จัดเก็บ ส่งต่อข้อมูลด้วยค่าสถานะไม่ต่อเนื่อง (Discrete) ในรูปเลขฐานสอง (0 และ 1)',
    example: 'Computers, smartphones, digital databases, cloud spreadsheets',
    pdfPage: 6,
    category: 'Core Concepts',
    important: true,
  },
  {
    id: 'w1-c3',
    term: 'Digital Service',
    thaiTerm: 'บริการดิจิทัล',
    definition: 'Value delivered directly to end users through connected applications, databases, platforms, and networks.',
    thaiDefinition: 'การส่งมอบคุณค่าให้แก่ผู้ใช้งานปลายทางผ่านแอปพลิเคชัน ฐานข้อมูล และระบบเครือข่ายที่เชื่อมต่อกัน ไม่ใช่เพียงแค่ตัวโปรแกรม แต่คือผลลัพธ์ที่ผู้ใช้ได้รับ',
    example: 'Online mobile banking, LMS (Learning Management System), E-commerce platforms',
    pdfPage: 10,
    category: 'Core Concepts',
    important: true,
  },
  {
    id: 'w1-c4',
    term: 'Analog vs. Digital',
    thaiTerm: 'สัญญาณแอนะล็อก vs ดิจิทัล',
    definition: 'Analog is a continuous physical signal that changes smoothly over time. Digital is a discrete signal represented in distinct stepped numerical states.',
    thaiDefinition: 'แอนะล็อกเป็นสัญญาณต่อเนื่อง (Continuous) ที่เปลี่ยนแปลงอย่างราบรื่นตามเวลา ส่วนดิจิทัลเป็นสัญญาณไม่ต่อเนื่อง (Discrete) ที่แบ่งเป็นระดับขั้นตัวเลขชัดเจน',
    example: 'Sound waves & Vinyl records (Analog) vs MP3 audio files (Digital)',
    pdfPage: 7,
    category: 'Data Representation',
    important: true,
  },
  {
    id: 'w1-c5',
    term: 'Digitization',
    thaiTerm: 'การแปลงเป็นดิจิทัล',
    definition: 'The systematic process of converting continuous analog signals or physical data into discrete digital values (0 and 1) via sampling and quantization.',
    thaiDefinition: 'กระบวนการแปลงสัญญาณหรือข้อมูลทางกายภาพที่ต่อเนื่อง ให้กลายเป็นข้อมูลดิจิทัลฐานสองผ่านการสุ่มตัวอย่างและการแปลงเป็นระดับขั้น',
    example: 'Recording acoustic voice through a microphone into an MP3 file, scanning paper document to PDF',
    pdfPage: 8,
    category: 'Data Representation',
  },
  {
    id: 'w1-c6',
    term: 'Binary Abstraction (0 and 1)',
    thaiTerm: 'การแทนค่าด้วยเลขฐานสอง',
    definition: 'Simplifying continuous electrical voltage levels into two reliable discrete states: 0 (Off/Low Voltage) and 1 (On/High Voltage), making computing resilient against noise.',
    thaiDefinition: 'การจัดระดับแรงดันไฟฟ้าให้เหลือเพียง 2 สถานะชัดเจน เพื่อลดความผิดพลาดจากสัญญาณรบกวน (Noise) ทำให้ระบบคอมพิวเตอร์มีความแม่นยำสูง',
    example: 'Bit = Single binary digit (0 or 1); Byte = 8 bits, capable of representing 256 unique characters (e.g. ASCII)',
    pdfPage: 8,
    category: 'Data Representation',
    important: true,
  },
  {
    id: 'w1-c7',
    term: '5 Building Blocks of Digital Technology',
    thaiTerm: 'องค์ประกอบ 5 ประการของเทคโนโลยีดิจิทัล',
    definition: 'The fundamental pillars of every digital service: 1) Hardware, 2) Software, 3) Data, 4) Network, and 5) People.',
    thaiDefinition: 'เสาหลัก 5 ด้านที่ทำให้ระบบดิจิทัลทำงานได้: ฮาร์ดแวร์, ซอฟต์แวร์, ข้อมูล, เครือข่าย, และบุคลากร/ผู้ใช้ (บริการไม่ใช่แค่แอป แต่คือความสัมพันธ์ของทั้ง 5 สิ่ง)',
    example: 'Grab/Uber relies on Smartphones/Servers (HW), Mobile App/Backend (SW), GPS & Payment Info (Data), 5G/Internet (Network), and Drivers/Riders (People)',
    pdfPage: 9,
    category: 'Architecture',
    important: true,
  },
  {
    id: 'w1-c8',
    term: 'Information Technology (IT)',
    thaiTerm: 'เทคโนโลยีสารสนเทศ (IT)',
    definition: 'Systems used to store, retrieve, transmit, and manipulate business information and enterprise data.',
    thaiDefinition: 'ระบบที่ใช้จัดเก็บ ประมวลผล ส่งผ่านข้อมูลระดับองค์กร มุ่งเน้นการจัดการข้อมูลและการตัดสินใจทางธุรกิจ',
    example: 'Enterprise ERP, CRM databases, corporate email servers, financial accounting software',
    pdfPage: 17,
    category: 'Technology Types',
  },
  {
    id: 'w1-c9',
    term: 'Operational Technology (OT)',
    thaiTerm: 'เทคโนโลยีปฏิบัติการ (OT)',
    definition: 'Hardware and software that directly monitors and controls physical devices, industrial equipment, sensors, and operational processes.',
    thaiDefinition: 'ฮาร์ดแวร์และซอฟต์แวร์ที่ควบคุมและตรวจสอบเครื่องจักรทางกายภาพ กระบวนการผลิต และระบบสาธารณูปโภคโดยตรง',
    example: 'SCADA systems, PLC industrial controllers, smart grid electrical switches, robotic assembly arms',
    pdfPage: 15,
    category: 'Technology Types',
    important: true,
  },
  {
    id: 'w1-c10',
    term: 'Cloud Computing & Service Models',
    thaiTerm: 'คลาวด์คอมพิวติงและโมเดลการให้บริการ',
    definition: 'On-demand delivery of computing power, database storage, and applications over the internet with pay-as-you-go pricing: IaaS, PaaS, SaaS.',
    thaiDefinition: 'การให้บริการทรัพยากรคอมพิวเตอร์ผ่านเครือข่ายอินเทอร์เน็ตแบบจ่ายตามการใช้งานจริง แบ่งเป็น IaaS (เช่าโครงสร้างพื้นฐาน), PaaS (เช่าแพลตฟอร์มพัฒนา), SaaS (เช่าซอฟต์แวร์พร้อมใช้)',
    example: 'IaaS: AWS EC2; PaaS: Heroku, Google App Engine; SaaS: Google Workspace, Microsoft 365',
    pdfPage: 35,
    category: 'Cloud & Infrastructure',
    important: true,
  },
  {
    id: 'w1-c11',
    term: 'CIA Triad',
    thaiTerm: 'สามเหลี่ยมความมั่นคงปลอดภัยสารสนเทศ (CIA)',
    definition: 'The foundational model for information security: Confidentiality (secrecy), Integrity (accuracy/unaltered), and Availability (accessibility when needed).',
    thaiDefinition: 'หลักการพื้นฐาน 3 เสาหลักของความปลอดภัย: Confidentiality (การรักษาความลับ), Integrity (ความถูกต้องสมบูรณ์ไม่ถูกดัดแปลง), และ Availability (ความพร้อมใช้งานเสมอ)',
    example: 'Encryption protects Confidentiality; Hashing & Digital Signatures protect Integrity; Redundant power & DDoS mitigation protect Availability',
    pdfPage: 39,
    category: 'Cybersecurity',
    important: true,
  },
  {
    id: 'w1-c12',
    term: 'AI & Automation Pipeline',
    thaiTerm: 'ท่อกระบวนการทำงานของ AI และระบบอัตโนมัติ',
    definition: 'The operational 5-stage loop: Data -> Model -> Prediction/Inference -> Action -> Feedback.',
    thaiDefinition: 'วงจรการทำงาน 5 ขั้นตอน: ข้อมูล (Data) -> โมเดล (Model) -> การทำนาย/ตัดสินใจ (Prediction) -> การกระทำตอบสนอง (Action) -> ผลสะท้อนกลับเพื่อเรียนรู้ (Feedback)',
    example: 'Spam filter: incoming emails (Data) -> classifier (Model) -> spam score (Prediction) -> move to junk (Action) -> user marks not spam (Feedback)',
    pdfPage: 20,
    category: 'AI & Automation',
    important: true,
  },
  {
    id: 'w1-c13',
    term: 'Change Management & Digital Adoption',
    thaiTerm: 'การบริหารการเปลี่ยนแปลงและการเปิดรับเทคโนโลยี',
    definition: 'The human-centric discipline of preparing, supporting, and guiding individuals and teams to successfully adopt new digital systems: Explain Why -> Train Clearly -> Pilot Safely -> Measure Use -> Improve Continuously.',
    thaiDefinition: 'กระบวนการนำพาบุคลากรให้ยอมรับและใช้งานระบบดิจิทัลใหม่ได้อย่างมีประสิทธิภาพ เพราะความล้มเหลวส่วนใหญ่เกิดจากคนและกระบวนการ ไม่ใช่ตัวเทคโนโลยี',
    example: 'Rolling out a new hospital electronic medical record system with clinical training and departmental pilot testing',
    pdfPage: 30,
    category: 'Value & Adoption',
  }
];

export const week1Modules: StudyModule[] = [
  {
    id: 'w1-m1',
    weekId: 'week1',
    moduleNumber: 1,
    title: 'Technology → Digital Technology → Digital Service',
    thaiTitle: 'เครื่องมือ → ระบบดิจิทัล → บริการดิจิทัล',
    pdfPageStart: 4,
    pdfPageEnd: 11,
    overview: 'Understanding the clear hierarchical progression from practical human tools to discrete electronic computing systems and user-facing digital services.',
    subsections: [
      {
        id: 'w1-m1-s1',
        title: 'The Hierarchy: Tool → System → Service',
        thaiTitle: 'ลำดับชั้น: เครื่องมือ → ระบบ → บริการ',
        pdfPage: 5,
        content: `**Technology** is the practical application of scientific knowledge to solve human problems. It is the broadest umbrella term.\n\n**Digital Technology** specifically refers to electronic hardware and software systems that store, compute, transmit, and manipulate information using discrete binary values (0 and 1).\n\n**Digital Service** is the ultimate delivery of tangible value to end-users over connected networks, applications, and databases.`,
        bulletPoints: [
          'Technology = Tool (e.g., paper notebook, mechanical watch, calculator)',
          'Digital Technology = System processing binary data (e.g., smartphone, computer, database)',
          'Digital Service = Value delivered to users (e.g., Grab, Mobile Banking, Canva, Shopee)'
        ],
        thaiCommentary: 'จำง่ายเป็นลำดับ "เครื่องมือ → ระบบ → บริการ" ข้อสอบชอบถามให้เรียงลำดับหรือแยกแยะความแตกต่าง',
        formula: '\\text{Technology (Tool)} \\longrightarrow \\text{Digital Technology (System)} \\longrightarrow \\text{Digital Service (Value)}',
        memoryTip: 'Tool → System → Service',
        infographicId: 'infographic-w1-hierarchy'
      },
      {
        id: 'w1-m1-s2',
        title: 'The 5 Building Blocks of Digital Technology',
        thaiTitle: '5 องค์ประกอบพื้นฐานของเทคโนโลยีดิจิทัล',
        pdfPage: 9,
        content: `A digital service is never "just an app". Behind every mobile screen lies an interwoven ecosystem of 5 core building blocks:
1. **People**: End users, system administrators, software engineers, customer support agents.
2. **Software**: Client applications, backend web servers, APIs, microservices, operating systems.
3. **Hardware**: Smartphones, tablets, physical servers, high-performance data centers, routers.
4. **Data**: User credentials, transaction logs, sensor streams, analytical records.
5. **Network**: Fiber optics, 4G/5G cellular, Wi-Fi, routing protocols, DNS, internet gateways.`,
        bulletPoints: [
          'Failure in any single block degrades or completely halts the digital service.',
          'Example Grab: Drivers/Riders (People), iOS/Android App (Software), Phones/Cloud Servers (Hardware), GPS/Fare Calculation (Data), 5G/Cellular (Network).'
        ],
        thaiCommentary: 'บริการดิจิทัลไม่ได้มีแค่แอปพลิเคชัน แต่ต้องพึ่งพาฮาร์ดแวร์ เครือข่าย ข้อมูล และผู้ใช้งานประสานกันอย่างสมบูรณ์',
        memoryTip: 'People + Software + Hardware + Data + Network = Digital Service',
        infographicId: 'infographic-w1-building-blocks'
      }
    ]
  },
  {
    id: 'w1-m2',
    weekId: 'week1',
    moduleNumber: 2,
    title: 'Analog vs. Digital & Binary Abstraction',
    thaiTitle: 'แอนะล็อก vs ดิจิทัล และการแทนค่าด้วยเลขฐานสอง',
    pdfPageStart: 7,
    pdfPageEnd: 8,
    overview: 'Explore why modern computing adopted binary digital representation over continuous analog signals: noise immunity, reproducibility, and simplicity.',
    subsections: [
      {
        id: 'w1-m2-s1',
        title: 'Continuous vs. Discrete Signals',
        thaiTitle: 'สัญญาณต่อเนื่อง (Analog) เทียบกับ สัญญาณขั้นบันได (Digital)',
        pdfPage: 7,
        content: `**Analog Signals** are continuous physical waveforms whose values change smoothly over time without sharp transitions (e.g., sound waves in air, mercury thermometers, vinyl record grooves).\n\n**Digital Signals** represent information using discrete numerical states. The physical reality of voltage is partitioned into two clear buckets:
* State 0: Low voltage (0V - 0.8V)
* State 1: High voltage (2.0V - 5.0V)`,
        bulletPoints: [
          'Analog signals degrade continuously when exposed to electrical noise or distance decay.',
          'Digital signals tolerate noise because small voltage fluctuations still fall within the 0 or 1 threshold.',
          'Digitization consists of Sampling (time slicing) and Quantization (voltage value rounding).'
        ],
        thaiCommentary: 'แอนะล็อกเปลี่ยนแปลงต่อเนื่อง (Continuous) ดิจิทัลแบ่งเป็นระดับขั้นชัดเจน (Discrete) ทนสัญญาณรบกวนได้ดีกว่ามาก',
        formula: '\\text{Analog (Smooth Continuous)} \\xrightarrow{\\text{Sampling + Quantization}} \\text{Digital (Discrete 0 and 1)}',
        memoryTip: 'Analog = Continuous | Digital = Discrete',
        infographicId: 'infographic-w1-analog-digital'
      },
      {
        id: 'w1-m2-s2',
        title: 'Binary Abstraction: Bits, Bytes, and ASCII',
        thaiTitle: 'การแปลงข้อมูลตัวอักษรเป็นเลขฐานสอง (Bit & Byte)',
        pdfPage: 8,
        content: `Every image, song, video, and text document in a computer is ultimately composed of bits:
* **Bit**: The smallest unit of digital data, holding either \`0\` or \`1\`.
* **Byte**: A group of 8 bits ($2^8 = 256$ unique patterns), sufficient to encode English alphanumeric characters in standard ASCII.`,
        bulletPoints: [
          'Letter "A" in ASCII is decimal 65 = `01000001` in binary.',
          'Letter "B" in ASCII is decimal 66 = `01000010` in binary.',
          'Binary abstraction shields programmers from transistor-level electron mechanics.'
        ],
        thaiCommentary: '1 ไบต์ มี 8 บิต สามารถแทนสถานะที่แตกต่างกันได้ 256 สถานะ (2 ยกกำลัง 8)',
        formula: '1\\text{ Byte} = 8\\text{ bits} \\implies 2^8 = 256\\text{ combinations}',
        memoryTip: '8 bits = 1 byte = 1 character (ASCII)',
        infographicId: 'infographic-w1-binary'
      }
    ]
  },
  {
    id: 'w1-m3',
    weekId: 'week1',
    moduleNumber: 3,
    title: 'Types of Digital Technology: IT vs. OT',
    thaiTitle: 'การจำแนกประเภทเทคโนโลยี: IT เทียบกับ OT',
    pdfPageStart: 12,
    pdfPageEnd: 20,
    overview: 'Classifying technology by operational scope: Information Technology managing data vs. Operational Technology controlling physical equipment.',
    subsections: [
      {
        id: 'w1-m3-s1',
        title: 'IT (Information Technology) vs. OT (Operational Technology)',
        thaiTitle: 'เปรียบเทียบ IT (ระบบข้อมูล) และ OT (ระบบควบคุมเครื่องจักร)',
        pdfPage: 15,
        content: `Understanding the boundary between IT and OT is a frequent exam topic:
* **IT (Information Technology)**: Manages enterprise data, corporate records, financial accounting, communications, and customer portals. Focused on data storage, analytics, and business insights.
* **OT (Operational Technology)**: Directly interfaces with physical equipment, industrial machinery, actuators, cooling pumps, and robotic factory arms. Focused on real-time safety, physical reliability, and uptime.`,
        bulletPoints: [
          'IT keywords: Databases, ERP, Cloud Servers, Email, Web applications.',
          'OT keywords: PLC, SCADA, Temperature Sensors, Industrial Assembly Lines, Power Grid switches.',
          'IT failure causes data delay; OT failure can cause physical damage or explosion.'
        ],
        thaiCommentary: 'ถ้าโจทย์พูดถึง "เซ็นเซอร์ตรวจวัดอุณหภูมิ, วาล์วปิดเปิดอัตโนมัติ, เครื่องจักรโรงงาน" = OT ทันที ถ้าพูดถึง "ฐานข้อมูลลูกค้า, ระบบบัญชี, อีเมล" = IT',
        memoryTip: 'IT = Data & Business | OT = Physical Machines & Control',
        infographicId: 'infographic-w1-it-vs-ot'
      }
    ]
  },
  {
    id: 'w1-m4',
    weekId: 'week1',
    moduleNumber: 4,
    title: 'Cloud Computing: IaaS, PaaS & SaaS',
    thaiTitle: 'คลาวด์คอมพิวติง: IaaS, PaaS และ SaaS',
    pdfPageStart: 35,
    pdfPageEnd: 36,
    overview: 'The fundamental cloud service delivery models defined by division of management responsibility between customer and cloud provider.',
    subsections: [
      {
        id: 'w1-m4-s1',
        title: 'The Cloud Service Pyramid & Management Boundaries',
        thaiTitle: 'โมเดลบริการคลาวด์และขอบเขตความรับผิดชอบ',
        pdfPage: 36,
        content: `The cloud layers determine who is responsible for configuring each level of the software and hardware stack:
* **IaaS (Infrastructure as a Service)**: Provider rents out raw virtual machines, networking, and storage. The **Customer** is responsible for installing and managing the Operating System, runtime, security patches, databases, and application code. (e.g., AWS EC2, Google Compute Engine).
* **PaaS (Platform as a Service)**: Provider manages hardware, OS, and software runtimes. The **Customer** only brings application code and data. (e.g., Heroku, Google App Engine, Vercel).
* **SaaS (Software as a Service)**: Complete end-user application hosted, maintained, and operated entirely by the provider. The user simply consumes the service via browser or app. (e.g., Google Docs, Gmail, Microsoft 365, Canva, Salesforce).`,
        bulletPoints: [
          'Exam Rule of Thumb: Who manages the Operating System? If Customer -> IaaS; If Provider -> PaaS.',
          'Pizza as a Service Analogy: IaaS = Rent the kitchen; PaaS = Cook kit delivered; SaaS = Dine at restaurant.'
        ],
        thaiCommentary: 'จุดจับประเด็นในการสอบ: ถ้าเราต้องติดตั้ง OS เอง = IaaS, ถ้าเราแค่เขียนโค้ดแล้วกด deploy = PaaS, ถ้าเปิดเว็บแล้วใช้งานได้ทันที = SaaS',
        formula: '\\text{IaaS (OS + Apps)} \\longrightarrow \\text{PaaS (Apps Only)} \\longrightarrow \\text{SaaS (Zero Management)}',
        memoryTip: 'IaaS = Manage OS | PaaS = Manage Code | SaaS = Just Use',
        infographicId: 'infographic-w1-cloud-models'
      }
    ]
  },
  {
    id: 'w1-m5',
    weekId: 'week1',
    moduleNumber: 5,
    title: 'Cybersecurity: The CIA Triad & Attack Surface',
    thaiTitle: 'ความมั่นคงปลอดภัยสารสนเทศ: สามเหลี่ยม CIA และพื้นที่เสี่ยง',
    pdfPageStart: 39,
    pdfPageEnd: 40,
    overview: 'The cornerstone framework of information security: Confidentiality, Integrity, and Availability, plus understanding system vulnerability vectors.',
    subsections: [
      {
        id: 'w1-m5-s1',
        title: 'The CIA Triad Core Pillars',
        thaiTitle: 'เสาหลักสามเหลี่ยม CIA (ความลับ - ความถูกต้อง - ความพร้อมใช้)',
        pdfPage: 39,
        content: `Every security policy and incident revolves around the three pillars of the **CIA Triad**:
1. **Confidentiality (ความลับ)**: Ensuring sensitive data is only accessible to authorized entities. Violation example: Data breach where passwords or bank statements are leaked.
2. **Integrity (ความถูกต้องสมบูรณ์)**: Ensuring data has not been altered, falsified, or tampered with in unauthorized ways. Violation example: A hacker changes their bank account balance from $10 to $1,000,000.
3. **Availability (ความพร้อมใช้งาน)**: Ensuring authorized users have reliable, timely access to data and services when needed. Violation example: A DDoS attack floods a web server, rendering it inaccessible during exam registration.`,
        bulletPoints: [
          'Confidentiality Defense: Encryption (AES/TLS), access controls, multi-factor authentication (MFA).',
          'Integrity Defense: Hashing (SHA-256), cryptographic checksums, digital signatures, audit logs.',
          'Availability Defense: Redundant hardware, automated failover, load balancing, DDoS scrubbers.'
        ],
        thaiCommentary: 'โจทย์สอบ: หากผู้ใช้แอบเปลี่ยนยอดเงินในฐานข้อมูล = เสีย Integrity, หากแอบดูข้อมูลผู้อื่น = เสีย Confidentiality, หากระบบล่มเข้าไม่ได้ = เสีย Availability',
        memoryTip: 'C = Keep Secret | I = Keep Accurate | A = Keep Accessible',
        infographicId: 'infographic-w1-cia-triad'
      },
      {
        id: 'w1-m5-s2',
        title: 'Attack Surface',
        thaiTitle: 'พื้นที่เสี่ยงต่อการถูกโจมตี (Attack Surface)',
        pdfPage: 39,
        content: `The **Attack Surface** is the sum total of all points, interfaces, and vulnerabilities where an unauthorized attacker can enter, extract data, or inject malicious payloads into a digital system.\n\nEvery time you open an unused network port, deploy an unpatched API endpoint, or connect an untrusted IoT device, the attack surface expands. Good security practices aim to **minimize** the attack surface (Principle of Least Privilege & Zero Trust).`,
        bulletPoints: [
          'Software Attack Surface: Code vulnerabilities, unvalidated web inputs (SQL Injection).',
          'Network Attack Surface: Open ports, unsecured wireless networks, rogue DNS.',
          'Human Attack Surface: Phishing emails, social engineering, weak passwords.'
        ],
        thaiCommentary: 'Attack Surface ยิ่งกว้าง ยิ่งมีความเสี่ยงสูง การรักษาความปลอดภัยที่ดีต้องพยายามลดพื้นที่จุดเสี่ยงให้เหลือน้อยที่สุด',
        memoryTip: 'Smaller Attack Surface = Harder to Attack',
      }
    ]
  },
  {
    id: 'w1-m6',
    weekId: 'week1',
    moduleNumber: 6,
    title: 'AI & Automation Pipeline',
    thaiTitle: 'ท่อกระบวนการทำงานของ AI และระบบอัตโนมัติ',
    pdfPageStart: 20,
    pdfPageEnd: 21,
    overview: 'Understanding the 5 sequential operational stages that transform raw data into intelligent autonomous actions.',
    subsections: [
      {
        id: 'w1-m6-s1',
        title: 'The 5-Stage Operational Pipeline',
        thaiTitle: '5 ขั้นตอนการประมวลผลของระบบ AI',
        pdfPage: 20,
        content: `AI and Automation systems do not magically generate value; they operate via a deterministic 5-step operational pipeline:
1. **Data (ข้อมูลเข้า)**: Raw sensory data, user transactions, images, text inputs, log files.
2. **Model (โมเดล)**: The mathematical algorithm trained on historical data to recognize underlying patterns.
3. **Prediction / Inference (การคาดการณ์)**: Generating an output inference (e.g., probability score of fraud: 94%).
4. **Action (การกระทำ)**: An automated system response (e.g., freezing the suspicious credit card transaction).
5. **Feedback (การเรียนรู้ย้อนกลับ)**: Capturing the outcome (e.g., user confirms the transaction was indeed fraudulent) and feeding it back to retrain and refine the model.`,
        bulletPoints: [
          'Acronym to memorize: **D-M-P-A-F** (Data -> Model -> Prediction -> Action -> Feedback).',
          'Without the Feedback loop, an AI system remains static and cannot adapt to evolving trends.'
        ],
        thaiCommentary: 'ขั้นตอน: ข้อมูล (Data) -> โมเดล (Model) -> ทำนาย (Prediction) -> ทำการตัดสินใจ/ลงมือ (Action) -> นำผลตอบรับมาปรับปรุง (Feedback)',
        formula: '\\text{Data} \\longrightarrow \\text{Model} \\longrightarrow \\text{Prediction} \\longrightarrow \\text{Action} \\longrightarrow \\text{Feedback}',
        memoryTip: 'D-M-P-A-F (Data, Model, Prediction, Action, Feedback)',
        infographicId: 'infographic-w1-ai-pipeline'
      }
    ]
  },
  {
    id: 'w1-m7',
    weekId: 'week1',
    moduleNumber: 7,
    title: 'Change Management & Digital Adoption',
    thaiTitle: 'การบริหารการเปลี่ยนแปลงและการเปิดรับเทคโนโลยี',
    pdfPageStart: 29,
    pdfPageEnd: 30,
    overview: 'Why digital transformation initiatives fail when human and organizational factors are overlooked, and the structured 5-step adoption process.',
    subsections: [
      {
        id: 'w1-m7-s1',
        title: 'Structured 5-Step Digital Adoption Process',
        thaiTitle: 'กระบวนการ 5 ขั้นตอนในการนำเทคโนโลยีมาปรับใช้ในองค์กร',
        pdfPage: 30,
        content: `Technology adoption is an organizational learning journey, not simply installing software. Over 70% of digital transformation failures stem from employee resistance, lack of training, or unclear value propositions.\n\nA structured adoption framework follows 5 clear steps:
1. **Explain Why (ชี้แจงเป้าหมาย)**: Communicate the strategic purpose, solving employee pain points rather than imposing tools.
2. **Train Clearly (ฝึกอบรมอย่างเป็นระบบ)**: Provide role-based, hands-on instructional support.
3. **Pilot Safely (ทดสอบกลุ่มเล็กอย่างปลอดภัย)**: Deploy in a small, controlled department first to catch glitches without organizational chaos.
4. **Measure Use (วัดผลการใช้งานจริง)**: Track daily active usage, error rates, and user drop-off metrics.
5. **Improve Continuously (ปรับปรุงอย่างต่อเนื่อง)**: Gather user feedback and refine workflows incrementally.`,
        bulletPoints: [
          'Key insight: Technology is easy; changing human behavior is hard.',
          'Memory tip: Explain -> Train -> Pilot -> Measure -> Improve.'
        ],
        thaiCommentary: 'การเปลี่ยนแปลงเทคโนโลยีในองค์กรล้มเหลวเพราะ "คนและวัฒนธรรม" มากกว่าปัญหาทางเทคนิค ต้องเริ่มจากการอธิบายเหตุผล ทดสอบกลุ่มเล็ก และวัดผลสม่ำเสมอ',
        memoryTip: 'Explain Why → Train Clearly → Pilot Safely → Measure Use → Improve Continuously',
      }
    ]
  }
];

export const week1Flashcards: Flashcard[] = [
  {
    id: 'w1-f1',
    weekId: 'week1',
    front: 'Technology vs Digital Technology vs Digital Service',
    back: '• Technology = Practical tool/method to solve problems\n• Digital Technology = Electronic system processing discrete binary data (0 & 1)\n• Digital Service = Value delivered to users over connected networks',
    thaiExplanation: 'ลำดับชั้นจำง่าย: เครื่องมือ (Tool) → ระบบดิจิทัล (System) → บริการที่มอบคุณค่า (Service)',
    category: 'Hierarchy',
    pdfPage: 5,
    examTip: 'Remember: Tool → System → Service',
  },
  {
    id: 'w1-f2',
    weekId: 'week1',
    front: 'Why do computers use Binary (0 and 1)?',
    back: 'Binary abstraction groups infinite continuous voltages into two distinct states (Low = 0, High = 1). This provides immense noise immunity and reliable computation across billions of transistors.',
    thaiExplanation: 'การใช้เลขฐานสองช่วยป้องกันสัญญาณรบกวน (Noise) เพราะจัดกลุ่มแรงดันไฟฟ้าเป็นแค่ 2 ช่วงสถานะที่ชัดเจน',
    category: 'Binary',
    pdfPage: 8,
    examTip: 'High noise immunity & electrical reliability.',
  },
  {
    id: 'w1-f3',
    weekId: 'week1',
    front: 'What are the 5 Building Blocks of a Digital Service?',
    back: '1. People (users, admins)\n2. Software (apps, OS, APIs)\n3. Hardware (clients, servers)\n4. Data (databases, inputs)\n5. Network (Internet, 5G, Wi-Fi)',
    thaiExplanation: '5 เสาหลัก: บุคลากร, ซอฟต์แวร์, ฮาร์ดแวร์, ข้อมูล, และเครือข่าย',
    category: 'Architecture',
    pdfPage: 9,
    examTip: 'A digital service is never "just an app"!',
  },
  {
    id: 'w1-f4',
    weekId: 'week1',
    front: 'IT (Information Tech) vs OT (Operational Tech)',
    back: '• IT manages enterprise data, business information, databases, and emails.\n• OT monitors and controls physical machines, industrial hardware, PLCs, and factory sensors.',
    thaiExplanation: 'IT เน้นข้อมูลทางธุรกิจ | OT เน้นควบคุมเครื่องจักรและอุปกรณ์ทางกายภาพ',
    category: 'IT vs OT',
    pdfPage: 15,
    examTip: 'If question mentions physical machines/valves/PLC = OT!',
  },
  {
    id: 'w1-f5',
    weekId: 'week1',
    front: 'IaaS vs PaaS: What is the defining difference?',
    back: 'In IaaS, the customer manages the Operating System, runtime, and applications.\nIn PaaS, the cloud provider manages the OS and runtime; the customer only manages application code and data.',
    thaiExplanation: 'IaaS ผู้ใช้ต้องติดตั้งและดูแล OS เอง ส่วน PaaS ผู้ให้บริการดูแล OS และ Runtime ให้ ผู้ใช้จัดการแค่โค้ด',
    category: 'Cloud Models',
    pdfPage: 36,
    examTip: 'Check who manages the Operating System!',
  },
  {
    id: 'w1-f6',
    weekId: 'week1',
    front: 'CIA Triad: Confidentiality vs Integrity vs Availability',
    back: '• Confidentiality: Preventing unauthorized data viewing (Defense: Encryption).\n• Integrity: Preventing unauthorized data alteration (Defense: Hashing/Signatures).\n• Availability: Ensuring system access when needed (Defense: Redundancy/Backups).',
    thaiExplanation: 'C = ความลับ (ห้ามแอบดู), I = ความถูกต้อง (ห้ามแอบแก้), A = ความพร้อมใช้ (ห้ามล่ม)',
    category: 'Cybersecurity',
    pdfPage: 39,
    examTip: 'Changing bank account balance violates Integrity!',
  },
  {
    id: 'w1-f7',
    weekId: 'week1',
    front: 'What are the 5 stages of the AI & Automation Pipeline?',
    back: '1. Data (Inputs/Logs)\n2. Model (Trained algorithm)\n3. Prediction/Inference (Output estimation)\n4. Action (Automated execution)\n5. Feedback (Outcome evaluation & model retraining)',
    thaiExplanation: 'D-M-P-A-F: Data -> Model -> Prediction -> Action -> Feedback',
    category: 'AI Pipeline',
    pdfPage: 20,
    examTip: 'Acronym: D-M-P-A-F',
  },
  {
    id: 'w1-f8',
    weekId: 'week1',
    front: 'What is an "Attack Surface"?',
    back: 'The total sum of all points, entryways, network ports, and code vulnerabilities where an unauthorized attacker could attempt to enter or extract data from a system.',
    thaiExplanation: 'พื้นที่ผิวหรือจุดทั้งหมดในระบบที่อาจถูกผู้ไม่หวังดีใช้เจาะเข้ามาได้ เป้าหมายความปลอดภัยคือการลด Attack Surface',
    category: 'Cybersecurity',
    pdfPage: 39,
  },
  {
    id: 'w1-f9',
    weekId: 'week1',
    front: 'What are the 5 steps in the Digital Adoption Process?',
    back: '1. Explain Why (Strategic vision)\n2. Train Clearly (Hands-on training)\n3. Pilot Safely (Controlled small group)\n4. Measure Use (Track metrics & KPIs)\n5. Improve Continuously (Incremental feedback)',
    thaiExplanation: 'อธิบายเหตุผล → อบรม → ทดสอบกลุ่มย่อย → วัดผล → ปรับปรุงต่อเนื่อง',
    category: 'Adoption',
    pdfPage: 30,
  },
  {
    id: 'w1-f10',
    weekId: 'week1',
    front: 'Analog vs Digital: Waveform Difference',
    back: 'Analog is a continuous waveform whose values change smoothly with infinite potential values. Digital represents information as discrete, stepped numerical levels (typically 0 and 1).',
    thaiExplanation: 'แอนะล็อกเป็นคลื่นต่อเนื่องไม่มีรอยต่อ ดิจิทัลเป็นค่าตัวเลขแบบขั้นบันได',
    category: 'Data Representation',
    pdfPage: 7,
  }
];

export const week1Quizzes: QuizQuestion[] = [
  {
    id: 'w1-q1',
    weekId: 'week1',
    topic: 'Technology Hierarchy',
    question: 'How does a physical tool differ from digital technology and a digital service in the hierarchy of technology?',
    thaiContext: 'โจทย์ทดสอบความเข้าใจลำดับชั้น: เครื่องมือ (Tool) → ระบบดิจิทัล (System) → บริการดิจิทัล (Service)',
    pdfPage: 5,
    difficulty: 'easy',
    options: [
      {
        text: 'A physical tool is an application; digital technology is physical hardware; a digital service is an internet connection.',
        isCorrect: false,
        explanation: 'Incorrect. An application is software, not a physical tool, and a digital service is value delivery rather than just a connection.'
      },
      {
        text: 'A physical tool is a practical device; digital technology is an electronic system processing binary data; a digital service delivers connected value to end users.',
        isCorrect: true,
        explanation: 'Correct! The hierarchy flows from practical tool (e.g. calculator) to digital technology processing discrete binary data (computer system) to digital service delivering end-user value (online banking).'
      },
      {
        text: 'Digital technology came before tools, while digital services only exist inside internal databases.',
        isCorrect: false,
        explanation: 'Incorrect. Physical tools existed long before digital technology was invented.'
      },
      {
        text: 'They are identical terms that can be used interchangeably in digital system architecture.',
        isCorrect: false,
        explanation: 'Incorrect. They represent distinct abstraction levels in the technology continuum.'
      }
    ]
  },
  {
    id: 'w1-q2',
    weekId: 'week1',
    topic: 'Cloud Computing Models',
    question: 'A development team wants to deploy a new web application. They need to configure the operating system kernel parameters, install custom network drivers, and manage OS-level security patches. Which cloud model MUST they choose?',
    thaiContext: 'โจทย์ทดสอบการแยกแยะระหว่าง IaaS และ PaaS โดยดูว่าใครเป็นผู้ดูแลระบบปฏิบัติการ (OS)',
    pdfPage: 36,
    difficulty: 'medium',
    options: [
      {
        text: 'Software as a Service (SaaS)',
        isCorrect: false,
        explanation: 'Incorrect. SaaS provides only ready-to-use software applications with zero access to the underlying OS or kernel.'
      },
      {
        text: 'Platform as a Service (PaaS)',
        isCorrect: false,
        explanation: 'Incorrect. PaaS abstracts away the operating system and drivers; the cloud provider manages them, preventing custom kernel configuration.'
      },
      {
        text: 'Infrastructure as a Service (IaaS)',
        isCorrect: true,
        explanation: 'Correct! In IaaS (e.g. AWS EC2), the customer manages the Operating System, kernel configurations, runtimes, and drivers, while the provider manages physical hardware.'
      },
      {
        text: 'Function as a Service (FaaS)',
        isCorrect: false,
        explanation: 'Incorrect. FaaS (serverless) provides even less OS-level control than PaaS.'
      }
    ]
  },
  {
    id: 'w1-q3',
    weekId: 'week1',
    topic: 'IT vs OT Classification',
    question: 'A municipal water facility installs automated flow sensors, programmable logic controllers (PLCs), and motorized pressure relief valves. How should this system primarily be classified?',
    thaiContext: 'โจทย์สถานการณ์: ตรวจจับแรงดันน้ำ มี PLC และวาล์วเครื่องจักรทางกายภาพ',
    pdfPage: 15,
    difficulty: 'easy',
    options: [
      {
        text: 'Information Technology (IT) because it transmits data over cables.',
        isCorrect: false,
        explanation: 'Incorrect. Having cables does not make it IT; the key distinction is that it monitors and controls physical processes.'
      },
      {
        text: 'Operational Technology (OT) because it directly monitors and controls physical industrial equipment and processes.',
        isCorrect: true,
        explanation: 'Correct! OT encompasses hardware and software that interacts with physical equipment, valves, sensors, and PLCs in industrial or municipal environments.'
      },
      {
        text: 'Software as a Service (SaaS) because it automates water pressure.',
        isCorrect: false,
        explanation: 'Incorrect. Valves and controllers are physical hardware equipment, not cloud software.'
      },
      {
        text: 'Educational Technology (EdTech) because staff learn from the sensor readings.',
        isCorrect: false,
        explanation: 'Incorrect. This is an industrial municipal control facility, not an educational platform.'
      }
    ]
  },
  {
    id: 'w1-q4',
    weekId: 'week1',
    topic: 'CIA Triad Violations',
    question: 'A malicious insider with database access modifies the grading table, changing a failing grade of "F" to an "A" without instructor authorization. Which pillar of the CIA Triad has been directly breached?',
    thaiContext: 'โจทย์สถานการณ์ความปลอดภัย: มีการแอบแก้ไขข้อมูลในฐานข้อมูลโดยไม่ได้รับอนุญาต',
    pdfPage: 39,
    difficulty: 'easy',
    options: [
      {
        text: 'Confidentiality',
        isCorrect: false,
        explanation: 'Incorrect. Confidentiality is breached when unauthorized parties view private data. Here, the core issue is that the data was tampered with.'
      },
      {
        text: 'Integrity',
        isCorrect: true,
        explanation: 'Correct! Integrity ensures that information remains accurate, authentic, and unaltered by unauthorized parties. Modifying grades directly violates Integrity.'
      },
      {
        text: 'Availability',
        isCorrect: false,
        explanation: 'Incorrect. Availability is breached when a service or database becomes inaccessible or offline (e.g. during a server crash or DDoS).'
      },
      {
        text: 'Non-repudiation',
        isCorrect: false,
        explanation: 'Incorrect. While related, the primary pillar of the classic CIA triad violated by modifying data is Integrity.'
      }
    ]
  },
  {
    id: 'w1-q5',
    weekId: 'week1',
    topic: 'AI & Automation Pipeline',
    question: 'In an automated smart-home thermostat powered by AI, the system records room occupancy logs, computes a 90% likelihood that residents are asleep, adjusts the temperature to 22°C, and then observes if the user manually overrides the temperature setting. What is the correct order of these stages in the AI Operational Pipeline?',
    thaiContext: 'โจทย์เรียงลำดับ 5 ขั้นตอนของ AI Operational Pipeline (Data, Model, Prediction, Action, Feedback)',
    pdfPage: 20,
    difficulty: 'medium',
    options: [
      {
        text: 'Model → Data → Action → Prediction → Feedback',
        isCorrect: false,
        explanation: 'Incorrect. Raw data must enter the system before the model can generate a prediction.'
      },
      {
        text: 'Data → Model / Inference → Prediction → Action → Feedback',
        isCorrect: true,
        explanation: 'Correct! The 5-stage pipeline flows from Data (occupancy logs) to Model (inference engine) producing a Prediction (sleep probability), triggering an Action (adjusting temperature), followed by Feedback (observing user override).'
      },
      {
        text: 'Action → Prediction → Feedback → Model → Data',
        isCorrect: false,
        explanation: 'Incorrect. An action cannot be taken before a prediction is made.'
      },
      {
        text: 'Feedback → Action → Prediction → Data → Model',
        isCorrect: false,
        explanation: 'Incorrect. Feedback is the terminal evaluation loop, not the initial input.'
      }
    ]
  },
  {
    id: 'w1-q6',
    weekId: 'week1',
    topic: 'Digital Adoption & Change Management',
    question: 'A large hospital network purchases state-of-the-art diagnostic imaging software. However, doctors refuse to use it and continue writing notes on paper because they were not informed why the change was happening and received no hands-on guidance. According to change management principles, what was the primary cause of this failure?',
    thaiContext: 'โจทย์วิเคราะห์สาเหตุความล้มเหลวของการนำเทคโนโลยีมาปรับใช้ในองค์กร',
    pdfPage: 30,
    difficulty: 'medium',
    options: [
      {
        text: 'The hardware was incapable of binary abstraction.',
        isCorrect: false,
        explanation: 'Incorrect. This is a technical irrelevance; modern medical hardware executes binary calculations properly.'
      },
      {
        text: 'Failure in human and organizational change management (skipping "Explain Why" and "Train Clearly").',
        isCorrect: true,
        explanation: 'Correct! Technology adoption is an organizational learning journey. Most failures stem from neglecting people and processes rather than software bugs.'
      },
      {
        text: 'The hospital should have deployed Operational Technology instead of Information Technology.',
        isCorrect: false,
        explanation: 'Incorrect. Diagnostic imaging and patient records are squarely Information Technology.'
      },
      {
        text: 'The cloud service provider violated the Availability pillar of the CIA Triad.',
        isCorrect: false,
        explanation: 'Incorrect. The system was online and available; users simply refused to adopt it.'
      }
    ]
  },
  {
    id: 'w1-q7',
    weekId: 'week1',
    topic: 'Data Representation & Binary Abstraction',
    question: 'Why did digital computer architects choose binary representation (0 and 1) rather than a 10-state decimal electrical circuit?',
    thaiContext: 'ทำไมคอมพิวเตอร์จึงใช้เลขฐานสอง (0 และ 1) แทนที่จะใช้เลขฐานสิบในระดับวงจรไฟฟ้า?',
    pdfPage: 8,
    difficulty: 'medium',
    options: [
      {
        text: 'Decimal electrical circuits require more software drivers than binary circuits.',
        isCorrect: false,
        explanation: 'Incorrect. The issue is electrical noise tolerance at the physical circuit level, not software drivers.'
      },
      {
        text: 'Distinguishing between only two discrete voltage thresholds provides immense noise immunity and physical reliability.',
        isCorrect: true,
        explanation: 'Correct! Dividing voltage into two states (e.g. 0V vs 5V) gives a massive safety margin against electrical interference, heat, and component degradation.'
      },
      {
        text: 'Binary code allows data to travel faster than the speed of light.',
        isCorrect: false,
        explanation: 'Incorrect. Electrical signals travel at a fraction of light speed regardless of encoding.'
      },
      {
        text: 'Human mathematics was originally formulated exclusively in binary.',
        isCorrect: false,
        explanation: 'Incorrect. Human cultures predominantly developed base-10 decimal systems.'
      }
    ]
  },
  {
    id: 'w1-q8',
    weekId: 'week1',
    topic: 'Anatomy of Digital Service',
    question: 'Which of the following best exemplifies the "People" building block in the 5 Building Blocks of Grab or Uber?',
    thaiContext: 'องค์ประกอบใดจัดอยู่ในหมวด "People" ของบริการเรียกรถดิจิทัล?',
    pdfPage: 9,
    difficulty: 'easy',
    options: [
      {
        text: 'The smartphone GPS sensor tracking location.',
        isCorrect: false,
        explanation: 'Incorrect. The GPS chip is Hardware.'
      },
      {
        text: 'The drivers who pick up passengers and the riders requesting rides.',
        isCorrect: true,
        explanation: 'Correct! The People component consists of end-users, drivers, support agents, and system operators.'
      },
      {
        text: 'The dispatch routing algorithm running in the cloud.',
        isCorrect: false,
        explanation: 'Incorrect. The dispatch algorithm is Software.'
      },
      {
        text: 'The 4G LTE cellular network transmitting coordinates.',
        isCorrect: false,
        explanation: 'Incorrect. Cellular infrastructure is Network.'
      }
    ]
  }
];
