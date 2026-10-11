import { StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';

export const week6KeyConcepts: KeyConcept[] = [
  {
    id: 'w6-c1',
    term: 'Connected ≠ Communicating',
    thaiTerm: 'การเชื่อมต่อ (Connected) ≠ การสื่อสาร (Communicating)',
    definition: 'A physical connection (cable, Wi-Fi, fiber) allows devices to send physical signals, but communication requires agreed-upon rules (protocols) so that signals carry mutual meaning, syntax, semantics, and timing.',
    thaiDefinition: 'การมีสายเชื่อมต่อทางกายภาพไม่ได้แปลว่าจะสื่อสารกันรู้เรื่อง การเชื่อมต่อเป็นเพียงทางผ่านของสัญญาณ แต่การสื่อสารต้องมีข้อตกลงและกฎเกณฑ์ร่วมกัน (โปรโตคอล) เช่น โครงสร้างข้อมูล จังหวะเวลา และการจัดการข้อผิดพลาด',
    example: 'Two computers physically wired with an Ethernet cable cannot share a file unless both speak the same protocol (e.g. TCP/IP and SMB/HTTP).',
    pdfPage: 6,
    category: 'Big Idea',
    important: true,
  },
  {
    id: 'w6-c2',
    term: 'Protocol: Syntax, Semantics & Timing',
    thaiTerm: 'โปรโตคอล: ไวยากรณ์ (Syntax), ความหมาย (Semantics) และจังหวะเวลา (Timing)',
    definition: 'A communication rulebook coordinating: 1) Syntax (what the message format looks like), 2) Semantics (what each field/bit means), 3) Timing (when messages are sent and how fast), and 4) Action (what the receiver does next).',
    thaiDefinition: 'กฎเกณฑ์การสื่อสารที่กำหนด: 1) Syntax = รูปแบบโครงสร้างข้อความ, 2) Semantics = ความหมายของแต่ละฟิลด์, 3) Timing = จังหวะเวลาการส่งและตอบสนอง, และ 4) Action = ขั้นตอนการปฏิบัติเมื่อได้รับข้อความ',
    example: 'HTTP defines the syntax of web requests; TCP defines connection timing and retransmissions; IP defines packet addressing.',
    pdfPage: 7,
    category: 'Protocols',
    important: true,
  },
  {
    id: 'w6-c3',
    term: 'Encapsulation & Protocol Data Units (PDU)',
    thaiTerm: 'การห่อหุ้มข้อมูล (Encapsulation) และหน่วยข้อมูลแต่ละเลเยอร์ (PDU)',
    definition: 'The process where each descending layer wraps upper-layer data with its own control header (and trailer). The data unit changes name: Application = Data, Transport = Segment (TCP) / Datagram (UDP), Network = Packet, Data Link = Frame, Physical = Bits.',
    thaiDefinition: 'กระบวนการที่แต่ละเลเยอร์นำข้อมูลจากเลเยอร์บนมาห่อหุ้มด้วย Header ประจำเลเยอร์: Application ได้ Data ➔ Transport ได้ Segment/Datagram ➔ Network ได้ Packet ➔ Data Link ได้ Frame ➔ Physical ได้ Bits',
    example: 'A web page request starts as HTTP Data, gets a TCP header (Segment), an IP header (Packet), and an Ethernet header/trailer (Frame).',
    pdfPage: 9,
    category: 'Layered Models',
    important: true,
  },
  {
    id: 'w6-c4',
    term: 'OSI 7-Layer Model vs. TCP/IP 4-Layer Model',
    thaiTerm: 'แบบจำลอง OSI 7 เลเยอร์ vs แบบจำลอง TCP/IP 4 เลเยอร์',
    definition: 'OSI is a conceptual reference model (Application, Presentation, Session, Transport, Network, Data Link, Physical). TCP/IP is the practical architecture of the Internet (Application, Transport, Internet, Network Access). OSI Application, Presentation, and Session map into TCP/IP Application.',
    thaiDefinition: 'OSI เป็นโมเดลเชิงแนวคิด 7 เลเยอร์เพื่อการศึกษาและการแก้ปัญหา; ส่วน TCP/IP เป็นสถาปัตยกรรมจริงที่ใช้งานบนอินเทอร์เน็ตมี 4 เลเยอร์ (ยุบเลเยอร์ 7, 6, 5 ของ OSI รวมเป็น Application)',
    example: 'OSI helps engineers think and troubleshoot; TCP/IP is how protocols like IP, TCP, and HTTP are implemented in operating systems.',
    pdfPage: 30,
    category: 'Layered Models',
    important: true,
  },
  {
    id: 'w6-c5',
    term: 'Duplex Modes: Simplex vs. Half-Duplex vs. Full-Duplex',
    thaiTerm: 'โหมดการส่งสัญญาณ: ซิมเพล็กซ์, ฮาล์ฟดูเพล็กซ์ และฟูลดูเพล็กซ์',
    definition: 'Simplex: Unidirectional flow (A ➔ B only, e.g. broadcast TV). Half-Duplex: Bidirectional but one direction at a time (A ⇄ B, e.g. walkie-talkies, Wi-Fi). Full-Duplex: Simultaneous bidirectional transmission (A ⇄ B at the same time, e.g. switched Ethernet, telephone call).',
    thaiDefinition: 'Simplex = ส่งทิศทางเดียวตลอดกาล (เช่น จอมอนิเตอร์, วิทยุ); Half-Duplex = ส่งสลับกันสองทางทีละฝั่ง (เช่น วอล์คกี้-ทอล์คกี้, Wi-Fi); Full-Duplex = ส่งและรับได้พร้อมกันสองทางในเวลาเดียวกัน (เช่น สวิตช์แลน, โทรศัพท์)',
    example: 'Modern full-duplex Ethernet switches allow computers to send and receive frames at the same gigabit speed simultaneously.',
    pdfPage: 17,
    category: 'OSI Model',
    important: true,
  },
  {
    id: 'w6-c6',
    term: 'MAC vs. IP vs. Port Number',
    thaiTerm: 'ตัวระบุ 3 ระดับ: MAC Address vs IP Address vs Port Number',
    definition: 'Three distinct identifiers answering 3 different questions: 1) MAC Address (L2): Which local hardware interface receives the frame on this physical link? 2) IP Address (L3): Which host/network is the packet trying to reach across the internet? 3) Port Number (L4): Which specific software application process on that host receives the data?',
    thaiDefinition: 'MAC Address (L2) ระบุการ์ดแลนในลิงก์กายภาพท้องถิ่น; IP Address (L3) ระบุเครื่องคอมพิวเตอร์ปลายทางในระบบเครือข่ายโลก; Port Number (L4) ระบุโปรแกรมหรือโพรเซสซอฟต์แวร์บนเครื่องนั้นๆ',
    example: 'Frame uses Router MAC to reach gateway, Packet has Web Server IP (142.250.190.46), Segment has Port 443 for HTTPS service.',
    pdfPage: 60,
    category: 'Addressing',
    important: true,
  },
  {
    id: 'w6-c7',
    term: 'IPv4 Addressing & CIDR Prefix',
    thaiTerm: 'แอดเดรส IPv4 และสัญลักษณ์ CIDR Prefix (/24)',
    definition: 'A 32-bit logical address represented as 4 decimal octets separated by dots (e.g. 192.168.10.25). CIDR notation (e.g. /24) specifies that the first 24 bits represent the Network portion, and the remaining 8 bits represent the Host portion ($2^8 - 2 = 254$ usable hosts).',
    thaiDefinition: 'หมายเลขประจำเครื่องขนาด 32 บิต แบ่งเป็น 4 อ็อกเท็ตคั่นด้วยจุด (เช่น 192.168.10.25) สัญลักษณ์ CIDR (เช่น /24) กำหนดว่า 24 บิตแรกเป็น Network ID และ 8 บิตหลังเป็น Host ID มีเครื่องใช้งานได้ 254 เครื่อง',
    example: '192.168.10.25/24 has Subnet Mask 255.255.255.0, Network ID 192.168.10.0, and Broadcast 192.168.10.255.',
    pdfPage: 34,
    category: 'IP Addressing',
    important: true,
  },
  {
    id: 'w6-c8',
    term: 'Private IPv4 Address Ranges (RFC 1918)',
    thaiTerm: 'ช่วงไอพีแอดเดรสส่วนตัว (Private IPv4 Ranges)',
    definition: 'Reserved IP ranges not routable on the public Internet: 1) Class A: 10.0.0.0/8, 2) Class B: 172.16.0.0/12 (172.16.0.0–172.31.255.255), 3) Class C: 192.168.0.0/16 (192.168.0.0–192.168.255.255). Devices use NAT to access public networks.',
    thaiDefinition: 'ช่วง IP ภายในบ้าน/องค์กรที่ไม่สามารถวิ่งบนอินเทอร์เน็ตสาธารณะได้โดยตรง: 10.0.0.0/8 (องค์กรใหญ่), 172.16.0.0/12 (องค์กรกลาง), 192.168.0.0/16 (บ้านและออฟฟิศขนาดเล็ก)',
    example: 'Your home laptop gets 192.168.1.100 from your Wi-Fi router, which uses NAT to share one public IP.',
    pdfPage: 32,
    category: 'IP Addressing',
    important: true,
  },
  {
    id: 'w6-c9',
    term: 'IPv6: 128-Bit Addressing & Key Advantages',
    thaiTerm: 'IPv6: แอดเดรส 128 บิต และข้อดีหลัก',
    definition: '128-bit addresses written as 8 hexadecimal quartets (e.g. 2001:db8::1) providing $2^{128} \\approx 3.4 \\times 10^{38}$ unique IPs. Features a simplified 40-byte fixed base header, eliminates broadcasting (uses multicast/anycast), and removes the need for NAT.',
    thaiDefinition: 'แอดเดรสขนาด 128 บิต เขียนด้วยเลขฐานสิบหก 8 ชุดคั่นด้วยโคลอน มีไอพีมหาศาล ($3.4 \\times 10^{38}$) ตัดระบบ Broadcast ทิ้ง (ใช้ Multicast แทน) และตัดความจำเป็นในการทำ NAT',
    example: '2001:0db8:85a3:0000:0000:8a2e:0370:7334 can be abbreviated as 2001:db8:85a3::8a2e:370:7334.',
    pdfPage: 39,
    category: 'IP Addressing',
    important: true,
  },
  {
    id: 'w6-c10',
    term: 'TCP 3-Way Handshake & Reliability Mechanisms',
    thaiTerm: 'การจับมือ 3 ขั้นตอนของ TCP (3-Way Handshake) และกลไกความน่าเชื่อถือ',
    definition: 'The connection establishment sequence: 1) Client ➔ Server: SYN, 2) Server ➔ Client: SYN-ACK, 3) Client ➔ Server: ACK. TCP ensures reliability through sequence numbers, acknowledgements (ACK), and automatic retransmissions of lost segments.',
    thaiDefinition: 'การสร้างการเชื่อมต่อก่อนส่งข้อมูล: 1) SYN ➔ 2) SYN-ACK ➔ 3) ACK รับประกันความสมบูรณ์ของข้อมูลด้วยการให้ตัวรับส่ง ACK ยืนยัน หากสูญหายจะส่งซ้ำ (Retransmit) โดยอัตโนมัติ',
    example: 'Browsers establish a TCP 3-way handshake before sending HTTP GET requests to ensure zero packet loss for web assets.',
    pdfPage: 47,
    category: 'Transport Layer',
    important: true,
  },
  {
    id: 'w6-c11',
    term: 'TCP vs. UDP Design Trade-offs',
    thaiTerm: 'การเปรียบเทียบ TCP vs UDP: ความถูกต้องสมบูรณ์ vs ความรวดเร็วทันเวลา',
    definition: 'TCP is connection-oriented, reliable, and ordered but has higher latency and overhead. UDP is connectionless and unacknowledged ("fire-and-forget") with low overhead (8-byte header vs 20-byte TCP), making it ideal for real-time video, VoIP, and gaming.',
    thaiDefinition: 'TCP เน้นความถูกต้อง ครบถ้วน ลำดับไม่สลับ (มี Handshake/ACK/Retransmit) เหมาะกับเว็บ, ไฟล์; UDP เน้นความเร็วทันเวลา ไม่มีจับมือ เสียแล้วทิ้งไป เหมาะกับสตรีมสด, เกม, วอยซ์คอล, DNS',
    example: 'File download uses TCP so not a single byte is corrupt; Zoom live video uses UDP so late video frames are dropped rather than stalling the conversation.',
    pdfPage: 50,
    category: 'Transport Layer',
    important: true,
  },
  {
    id: 'w6-c12',
    term: 'ICMP Diagnostics: Ping & Traceroute',
    thaiTerm: 'โปรโตคอล ICMP และเครื่องมือวินิจฉัย: Ping และ Traceroute',
    definition: 'Internet Control Message Protocol operates at Layer 3 to send network error reports and diagnostic signals. Ping uses ICMP Echo Request / Echo Reply to verify host reachability. Traceroute deliberately uses expiring TTL (Time Exceeded messages) to map intermediate routers.',
    thaiDefinition: 'ICMP เป็นโปรโตคอลเลเยอร์ 3 สำหรับรายงานข้อผิดพลาดและทดสอบเครือข่าย; Ping ใช้ส่ง Echo Request เพื่อรอ Echo Reply ทดสอบว่าเครื่องปลายทางตอบสนองหรือไม่; Traceroute ใช้กลไก TTL หมดอายุเพื่อดูรายชื่อเราเตอร์ทุกตัวระหว่างทาง',
    example: 'ping 8.8.8.8 checks Internet reachability; traceroute google.com shows every router hop between your laptop and Google.',
    pdfPage: 55,
    category: 'Diagnostics',
    important: true,
  }
];

export const week6Modules: StudyModule[] = [
  {
    id: 'w6-m1',
    weekId: 'week6',
    moduleNumber: 1,
    title: 'The Big Idea: Protocols, Rules & Why Networks Use Layers',
    thaiTitle: 'แนวคิดหลัก: โปรโตคอล กฎเกณฑ์การสื่อสาร และเหตุผลที่เครือข่ายต้องแบ่งเป็นเลเยอร์',
    description: 'Discover why physical connection differs from communication, explore the components of a protocol (Syntax, Semantics, Timing, Action), and learn the 4 benefits of layered architecture.',
    pdfPageStart: 1,
    pdfPageEnd: 8,
    subsections: [
      {
        id: 'w6-m1-s1',
        title: 'Connected ≠ Communicating',
        thaiTitle: 'การเชื่อมต่อทางกายภาพ ไม่ได้หมายถึงการสื่อสารรู้เรื่องเสมอไป',
        pdfPage: 6,
        content: `A physical link does not guarantee mutual understanding.\n\n- **Connection (Infrastructure):** Devices can physically transmit and receive electrical voltages, light pulses, or radio signals through a shared transmission medium (Copper cable, Fiber optic, Wi-Fi radio waves).\n- **Communication (Rules & Meaning):** Devices follow structured rulebooks so that received bit patterns carry semantic meaning, correct timing, valid addressing, and robust error handling.\n\n> A network requires **both physical infrastructure and agreed communication rules (protocols)** to function.`,
        bulletPoints: [
          'Connection = Ability to pass physical signals across a medium.',
          'Communication = Agreement on format, timing, addressing, and error interpretation.',
          'Without shared protocols, devices receive raw electrical noise rather than coherent data.'
        ],
        thaiCommentary: 'การเสียบสายแลนเข้าหากันเป็นแค่ Connection แต่การจะส่งไฟล์หากันได้ ต้องมี Communication Protocols ที่ทั้งสองฝ่ายเข้าใจตรงกัน',
        memoryTip: 'Connected = Physical wire exists. Communicating = Both sides speak the same protocol language.'
      },
      {
        id: 'w6-m1-s2',
        title: 'Protocol as a Rulebook: Syntax, Semantics, Timing & Action',
        thaiTitle: 'โปรโตคอลคือสมุดกฎ: ไวยากรณ์ ความหมาย จังหวะเวลา และการกระทำ',
        pdfPage: 7,
        content: `A **Network Protocol** is an agreed-upon formal standard that coordinates four primary elements:\n\n1. **Syntax:** What does the message look like? (Field positions, bit lengths, delimiter symbols, encoding format).\n2. **Semantics:** What does each field mean? (e.g. Does bit 16 mean an ACK flag or a packet priority level?).\n3. **Timing:** When should messages be sent, and how fast? (Speed matching, flow control, timeout durations).\n4. **Action:** What should the receiver do next? (e.g. Send an acknowledgement, retransmit a dropped frame, or drop a corrupt packet).\n\n*Examples:* HTTP defines web requests; TCP defines connection and retransmission behavior; IP defines packet delivery across networks.`,
        bulletPoints: [
          'Syntax = Data format and structure.',
          'Semantics = Meaning and interpretation of each field.',
          'Timing = Synchronization, speed matching, and timeout boundaries.',
          'Action = The expected algorithmic response from the receiving system.'
        ],
        thaiCommentary: 'โปรโตคอลเปรียบเสมือนไวยากรณ์และมารยาทในการสนทนา กำหนดตั้งแต่รูปแบบคำพูด ความหมายของคำ จังหวะการพูด และสิ่งที่ผู้ฟังต้องทำต่อ'
      },
      {
        id: 'w6-m1-s3',
        title: 'Why Do Networks Use Layers? (4 Core Advantages)',
        thaiTitle: 'ทำไมระบบเครือข่ายจึงต้องแบ่งการทำงานออกเป็นเลเยอร์?',
        pdfPage: 8,
        content: `Networking breaks huge, complex end-to-end communication problems into small, manageable, isolated responsibilities:\n\n1. **Modularity:** Each layer solves one specific category of problem (e.g. Physical layer only cares about bits on copper; Network layer only cares about IP routing).\n2. **Standardization:** Hardware and software from completely different vendors (Cisco, Apple, Microsoft, Intel) interoperate seamlessly as long as they follow the layer protocol standards.\n3. **Troubleshooting:** Network failures can be isolated layer-by-layer (e.g. Check link lights at L1, check IP ping at L3, check firewall port at L4).\n4. **Evolution:** One layer can be upgraded or replaced without altering other layers (e.g. Transitioning from 1 Gbps copper Ethernet to 10 Gbps Fiber does not require rewriting the Web Browser or HTTP protocol!).`,
        bulletPoints: [
          'Modularity: Divide and conquer complex communication challenges.',
          'Standardization: Multi-vendor interoperability.',
          'Troubleshooting: Step-by-step diagnostic isolation.',
          'Evolution: Independent upgrades without rewriting application software.'
        ],
        thaiCommentary: 'การแบ่งเลเยอร์ช่วยให้เวลาเปลี่ยนจากสายทองแดงเป็นไฟเบอร์ออปติก เว็บไซต์และเบราว์เซอร์ไม่ต้องเขียนโปรแกรมใหม่เลยแม้แต่บรรทัดเดียว'
      }
    ]
  },
  {
    id: 'w6-m2',
    weekId: 'week6',
    moduleNumber: 2,
    title: 'Data Encapsulation & Protocol Data Units (PDUs)',
    thaiTitle: 'การห่อหุ้มข้อมูล (Encapsulation) และชื่อเรียกหน่วยข้อมูล (PDU) ในแต่ละเลเยอร์',
    description: 'Master how application data is packaged with headers and trailers as it moves down the network stack from Data to Bits.',
    pdfPageStart: 9,
    pdfPageEnd: 11,
    subsections: [
      {
        id: 'w6-m2-s1',
        title: 'Encapsulation: Data Gets Wrapped',
        thaiTitle: 'การห่อหุ้มข้อมูล: เสมือนการนำจดหมายใส่ซองซ้อนซอง',
        pdfPage: 9,
        infographicId: 'infographic-w6-encapsulation',
        content: `As application data descends the protocol stack on the sending computer, each layer adds its own control information (**Header** and/or **Trailer**):\n\n$$\\begin{matrix} \\text{Application:} & \\text{DATA} \\\\ \\downarrow & \\\\ \\text{Transport:} & \\mathbf{\\text{TCP/UDP Header}} + \\text{DATA} & = \\text{Segment / Datagram} \\\\ \\downarrow & \\\\ \\text{Internet:} & \\mathbf{\\text{IP Header}} + \\text{Transport Segment} & = \\text{Packet} \\\\ \\downarrow & \\\\ \\text{Data Link:} & \\mathbf{\\text{Frame Header}} + \\text{IP Packet} + \\mathbf{\\text{Trailer (FCS)}} & = \\text{Frame} \\\\ \\downarrow & \\\\ \\text{Physical:} & \\text{Signals on medium} & = \\text{Bits} \\end{matrix}$$\n\nAt the destination host, **Decapsulation** reverses this exact sequence: stripping the frame header at L2, the IP header at L3, the TCP header at L4, delivering clean payload data to the application!`,
        bulletPoints: [
          'Encapsulation wraps data with headers going DOWN the stack on the sender.',
          'Decapsulation unwraps and inspects headers going UP the stack on the receiver.',
          'Data units have different names at each layer: Data ➔ Segment ➔ Packet ➔ Frame ➔ Bits.'
        ],
        thaiCommentary: 'เหมือนการเขียนจดหมาย (Data) ➔ ใส่ซองระบุแผนก (TCP Port) ➔ ใส่ซองจดหมายระบุที่อยู่บ้าน (IP) ➔ บรรจุใส่รถบรรทุกติดป้ายทะเบียน (MAC Frame) ➔ ขับเคลื่อนบนถนนจริง (Bits)'
      },
      {
        id: 'w6-m2-s2',
        title: 'Vocabulary: Data Units by Layer & Common Misconceptions',
        thaiTitle: 'คำศัพท์เฉพาะสำหรับหน่วยข้อมูล (PDU) และข้อควรระวังในข้อสอบ',
        pdfPage: 10,
        content: `Exam questions rigorously test the precise terminology of Protocol Data Units (PDUs):\n\n| Layer Group | Common Data Unit (PDU) | Meaning & Content |\n|---|---|---|\n| **Application / Presentation / Session** | **Data** | Application-level request or response text |\n| **Transport** | **Segment** (TCP) / **Datagram** (UDP) | Data with source/destination Port numbers & sequencing |\n| **Network / Internet** | **Packet** | Routed using logical IP address information |\n| **Data Link** | **Frame** | Local link hop delivery using hardware MAC addresses |\n| **Physical** | **Bits** | Raw binary electrical, optical, or RF signal pulses |\n\n> **⚠️ Misconception to Avoid:** A *packet* is NOT automatically the same thing as a *frame*. Routers strip the incoming data-link frame header and rebuild a completely new frame header with a different MAC address for the next hop, while the inner IP packet remains intact!`,
        bulletPoints: [
          'Layer 4 = Segment/Datagram; Layer 3 = Packet; Layer 2 = Frame; Layer 1 = Bits.',
          'A packet is routed across the Internet; a frame carries the packet across one local physical link.',
          'MAC addresses change at every router hop; Source and Destination IP addresses remain constant end-to-end.'
        ],
        thaiCommentary: 'จุดที่ข้อสอบชอบหลอก: Packet กับ Frame ไม่เหมือนกัน! Frame คือซองในระดับการ์ดแลน (MAC) ที่ถูกแกะและเปลี่ยนใหม่ทุกครั้งที่ผ่านเราเตอร์ ส่วน Packet (IP) จะอยู่ข้างในไม่เปลี่ยน'
      }
    ]
  },
  {
    id: 'w6-m3',
    weekId: 'week6',
    moduleNumber: 3,
    title: 'The OSI 7-Layer Model & Troubleshooting by Layer',
    thaiTitle: 'แบบจำลอง OSI 7 เลเยอร์ และการวินิจฉัยปัญหาตามลำดับชั้น',
    description: 'Examine the 7 conceptual layers of OSI, duplex communication modes, and how engineers isolate network faults from Layer 1 to Layer 7.',
    pdfPageStart: 12,
    pdfPageEnd: 27,
    subsections: [
      {
        id: 'w6-m3-s1',
        title: 'OSI 7 Layers Overview & Duplex Modes',
        thaiTitle: 'โครงสร้าง OSI 7 เลเยอร์ และโหมดการส่งสัญญาณ (Duplex Modes)',
        pdfPage: 13,
        content: `The International Organization for Standardization (ISO) defined the **Open Systems Interconnection (OSI)** 7-layer model:\n\n- **Layer 7 - Application:** User-facing network services (HTTP, HTTPS, SMTP, DNS, FTP).\n- **Layer 6 - Presentation:** Data representation, formatting, compression, encryption/decryption, syntax translation.\n- **Layer 5 - Session:** Manages ongoing communication sessions, dialog checkpoints, suspension, and termination.\n- **Layer 4 - Transport:** End-to-end process-to-process delivery, segmentation, flow control, and port multiplexing (TCP, UDP, COTP TP0–TP4).\n- **Layer 3 - Network:** Logical addressing and packet routing across intermediate networks (IPv4, IPv6, ICMP, ARP).\n- **Layer 2 - Data Link:** Frame delivery across a single physical link, divided by IEEE 802 into **LLC (Logical Link Control)** and **MAC (Media Access Control)** sublayers.\n- **Layer 1 - Physical:** Transmission of unstructured raw bit streams over physical copper, fiber, or radio media.\n\n### Duplex Communication Modes:\n- **Simplex:** Data moves in **one direction only** ($A \\rightarrow B$). Example: Keyboard to PC, broadcast monitor.\n- **Half-Duplex:** Bidirectional, but **one direction at a time** ($A \\rightleftarrows B$). Example: Walkie-talkie, Wi-Fi half-duplex radios.\n- **Full-Duplex:** **Simultaneous bidirectional** data flow ($A \\rightleftarrows B$). Example: Telephone conversation, switched full-duplex Ethernet.`,
        bulletPoints: [
          'All People Seem To Need Data Processing (Layers 7 down to 1: Application to Physical).',
          'Simplex = 1-way; Half-Duplex = 2-way alternate; Full-Duplex = 2-way simultaneous.',
          'IEEE 802 divides Data Link into LLC (upper protocol identification) and MAC (medium access control).'
        ],
        thaiCommentary: 'วิธีจำ 7 เลเยอร์จากบนลงล่าง: All People Seem To Need Data Processing (App, Pres, Sess, Trans, Net, Data, Phys)'
      },
      {
        id: 'w6-m3-s2',
        title: 'Troubleshooting by Layer Framework',
        thaiTitle: 'กระบวนการวินิจฉัยปัญหาตามลำดับชั้นเลเยอร์ (Troubleshooting by Layer)',
        pdfPage: 56,
        content: `When network services fail, professional engineers systematically troubleshoot bottom-up or top-down:\n\n| Failure Symptom | Likely Layer to Check | Diagnostic Question & Action |\n|---|---|---|\n| **No link LED light / No Wi-Fi signal** | **Physical (L1)** | Is the cable plugged in? Is the fiber severed? Is the transceiver powered? |\n| **Connected to LAN, but local gateway unreachable** | **Data Link (L2)** | Is the switch port operational? Are MAC addresses learning properly? Port security violation? |\n| **Can reach LAN devices, but cannot access Internet** | **Network (L3)** | Is the default gateway IP correct? Is the subnet mask valid? Is routing table prefix configured? |\n| **Ping succeeds, but web browser says Connection Refused** | **Transport (L4)** | Is port 80/443 blocked by a firewall? Is the web server listening on the port? |\n| **HTTP 404 Not Found / HTTP 500 Internal Error** | **Application (L7)** | Is the URL valid? Is the web application backend service running properly? |`,
        bulletPoints: [
          'Bottom-Up Troubleshooting: Verify physical cables (L1) ➔ Check switch/MAC (L2) ➔ Check IP/routing (L3) ➔ Check port/firewall (L4) ➔ Test app (L7).',
          'Ping checks Layer 3 reachability; if Ping works but the website fails, the issue is at Layer 4 or Layer 7.',
          'Link lights indicate healthy Layer 1 physical link status.'
        ],
        thaiCommentary: 'แนวทางการไล่ปัญหาของวิศวกรเน็ตเวิร์ก: ถ้าไฟสายแลนไม่ติดแก้ที่ L1, ถ้าปิงไม่เจอแก้ที่ L3, ถ้าปิงเจอแต่เข้าเว็บไม่ได้แก้ที่พอร์ต L4 หรือโปรแกรม L7'
      }
    ]
  },
  {
    id: 'w6-m4',
    weekId: 'week6',
    moduleNumber: 4,
    title: 'IP Addressing: IPv4, CIDR, Subnetting & IPv6',
    thaiTitle: 'ระบบแอดเดรสของอินเทอร์เน็ต: IPv4, CIDR Prefix, การแบ่งซับเน็ต และ IPv6',
    description: 'Calculate network and host bits with CIDR notation, examine IPv4 headers, and compare IPv4 with 128-bit IPv6 architecture.',
    pdfPageStart: 28,
    pdfPageEnd: 44,
    subsections: [
      {
        id: 'w6-m4-s1',
        title: 'IPv4 Structure, Octets & Private Ranges',
        thaiTitle: 'โครงสร้าง IPv4 แอดเดรส 32 บิต และช่วงไอพีส่วนตัว (Private Ranges)',
        pdfPage: 32,
        content: `An **IPv4 Address** is a 32-bit binary number written in **dotted-decimal notation** as four 8-bit octets ($4 \\times 8 = 32$ bits):\n$$\\text{Example: } 192.168.1.10 = \\mathbf{11000000} . \\mathbf{10101000} . \\mathbf{00000001} . \\mathbf{00001010}_2$$\n\nTotal possible addresses: $2^{32} = 4,294,967,296$ addresses.\n\n### Common Private IPv4 Ranges (RFC 1918):\n- **10.0.0.0 /8:** (10.0.0.0 – 10.255.255.255) ➔ Large enterprise networks (16.7 million hosts).\n- **172.16.0.0 /12:** (172.16.0.0 – 172.31.255.255) ➔ Medium organizations (1 million hosts).\n- **192.168.0.0 /16:** (192.168.0.0 – 192.168.255.255) ➔ Small business and home LANs (65,536 hosts).\n\n*Private addresses cannot be routed across the public Internet and must be translated using NAT (Network Address Translation).*`,
        bulletPoints: [
          'IPv4 uses 32 bits = 4 octets separated by dots (values 0–255 per octet).',
          'Private IP ranges: 10/8, 172.16/12, 192.168/16.',
          'Loopback testing address: 127.0.0.1 (localhost).'
        ],
        thaiCommentary: 'IPv4 มี 32 บิต แบ่งเป็น 4 ท่อน ท่อนละ 8 บิต (0-255); ช่วงไอพีส่วนตัวที่ไม่วิ่งบนเน็ตสาธารณะคือ 10.x.x.x, 172.16.x.x - 172.31.x.x, และ 192.168.x.x'
      },
      {
        id: 'w6-m4-s2',
        title: 'CIDR Notation & Subnet Mask Mechanics',
        thaiTitle: 'สัญลักษณ์ CIDR และกลไกของ Subnet Mask',
        pdfPage: 34,
        infographicId: 'infographic-w6-subnetting',
        content: `**CIDR (Classless Inter-Domain Routing)** replaces obsolete Class A/B/C addressing by expressing the network boundary via a prefix length (e.g. **/24**):\n\n### The Prefix Equation:\n$$\\text{Total Bits (32)} = \\mathbf{\\text{Network Bits (Prefix)}} + \\mathbf{\\text{Host Bits}}$$\nFor $192.168.10.25/24$:\n- **Prefix /24:** First 24 bits are **Network Bits** ($192.168.10$). Shared by every device on this subnet.\n- **Host Bits (32 - 24 = 8 bits):** Remaining 8 bits identify the specific host ($.25$).\n- **Subnet Mask:** 24 consecutive binary 1s followed by 8 zeros: $11111111.11111111.11111111.00000000 = \\mathbf{255.255.255.0}$.\n\n### Usable Hosts Formula:\n$$\\text{Usable Hosts} = 2^{\\text{Host Bits}} - 2 = 2^8 - 2 = 254$$\n*(We subtract 2 because the all-zeros host address is reserved for the **Network ID** and the all-ones host address is reserved for the **Broadcast Address**).*`,
        bulletPoints: [
          'CIDR /24 means 24 network bits and 8 host bits.',
          'Subnet Mask filters and isolates the network portion from host portion.',
          'Formula: Usable Hosts = 2^(Host Bits) - 2 (subtract Network ID and Broadcast ID).'
        ],
        thaiCommentary: 'สูตรคำนวณจำนวนเครื่องที่ใช้ได้: นำ 32 ลบด้วยเลข CIDR จะได้จำนวนบิตของ Host จากนั้นนำ 2 มายกกำลัง Host Bits แล้วลบออก 2 (หัก Network ID กับ Broadcast ID ออก)'
      },
      {
        id: 'w6-m4-s3',
        title: 'IPv6 Architecture vs. IPv4 Comparison',
        thaiTitle: 'สถาปัตยกรรม IPv6 ขนาด 128 บิต และการเปรียบเทียบกับ IPv4',
        pdfPage: 39,
        content: `IPv6 was created to permanently resolve IPv4 address exhaustion:\n\n- **Address Size:** **128 bits** ($2^{128} \\approx 3.4 \\times 10^{38}$ possible addresses).\n- **Notation:** 8 groups of 4 hexadecimal digits (quartets) separated by colons (e.g. $2001:0db8:0000:0000:0000:0000:0000:0001$).\n- **Abbreviation Rules:** Leading zeros can be omitted ($0001 \\rightarrow 1$). Consecutive groups of all-zero quartets can be collapsed into a double colon ($::$) exactly **ONCE** per address ($2001:db8::1$).\n\n### IPv4 vs. IPv6 Key Differences:\n| Attribute | IPv4 | IPv6 |\n|---|---|---|\n| **Address Length** | 32 bits (4 bytes) | 128 bits (16 bytes) |\n| **Notation Style** | Dotted-decimal (192.168.1.1) | Hexadecimal quartets (2001:db8::1) |\n| **Base Header Size** | Variable (20–60 bytes) | Fixed (40 bytes) for faster routing |\n| **Transmission Modes**| Unicast, Multicast, **Broadcast** | Unicast, Multicast, **Anycast** (**No Broadcast!**) |\n| **Private / Local** | 10/8, 172.16/12, 192.168/16 | Unique Local ULA (FC00::/7) |\n| **Loopback** | 127.0.0.1 | ::1 |`,
        bulletPoints: [
          'IPv6 has 128 bits; IPv4 has 32 bits.',
          'IPv6 has NO broadcast transmission (uses multicast and anycast instead).',
          'IPv6 has a streamlined 40-byte fixed header moving optional fields to extension headers.'
        ],
        thaiCommentary: 'จุดเด่นของ IPv6 ที่ข้อสอบออกบ่อย: มี 128 บิต, เขียนด้วยเลขฐาน 16 คั่นด้วยโคลอน, ไม่มีระบบ Broadcast อีกต่อไป (ใช้ Multicast แทน), และเฮดเดอร์คงที่ 40 ไบต์'
      }
    ]
  },
  {
    id: 'w6-m5',
    weekId: 'week6',
    moduleNumber: 5,
    title: 'Transport Layer Protocols: TCP vs. UDP Deep Dive',
    thaiTitle: 'โปรโตคอลระดับทรานสปอร์ตเลเยอร์: เจาะลึก TCP vs UDP',
    description: 'Trace the TCP 3-Way Handshake, sequence numbering, and error recovery, comparing against connectionless UDP streaming.',
    pdfPageStart: 45,
    pdfPageEnd: 51,
    subsections: [
      {
        id: 'w6-m5-s1',
        title: 'TCP 3-Way Handshake & Reliable Data Delivery',
        thaiTitle: 'การจับมือ 3 ขั้นตอนของ TCP (3-Way Handshake) และการส่งข้อมูลที่รับประกันผล',
        pdfPage: 47,
        infographicId: 'infographic-w6-tcp-udp',
        content: `TCP is a **connection-oriented** protocol providing guaranteed byte-stream delivery:\n\n### The 3-Way Handshake Sequence:\n1. **Step 1 (SYN):** Client sends a TCP segment with the **SYN (Synchronize)** control flag set and an initial sequence number ($seq = x$). *"I would like to open a connection with you."*\n2. **Step 2 (SYN-ACK):** Server responds with **SYN** and **ACK (Acknowledge)** flags set, acknowledging the client ($ack = x + 1$) and choosing its own initial sequence number ($seq = y$). *"I agree, let us connect."*\n3. **Step 3 (ACK):** Client sends back an **ACK** ($ack = y + 1$). The connection state becomes **ESTABLISHED**.\n\n### Why TCP is Reliable:\n- **Acknowledgements (ACK):** The receiver constantly confirms received byte ranges.\n- **Sequence Numbers:** Segments arriving out of order are reassembled correctly.\n- **Automatic Retransmission (ARQ):** If an ACK is not received before a timer expires, the sender retransmits the missing segment.`,
        bulletPoints: [
          'TCP 3-Way Handshake: SYN ➔ SYN-ACK ➔ ACK.',
          'Sequence numbers ensure in-order reassembly of fragmented streams.',
          'Missing segments trigger retransmissions, guaranteeing 100% data integrity.'
        ],
        thaiCommentary: 'ลำดับ 3-Way Handshake: 1) ฝั่งไคลเอนต์ส่ง SYN ➔ 2) เซิร์ฟเวอร์ตอบ SYN-ACK ➔ 3) ไคลเอนต์ยืนยัน ACK แล้วจึงเริ่มส่งข้อมูลจริง'
      },
      {
        id: 'w6-m5-s2',
        title: 'UDP Characteristics & Protocol Selection Scenarios',
        thaiTitle: 'คุณลักษณะของ UDP และเกณฑ์การเลือกโปรโตคอลในการใช้งานจริง',
        pdfPage: 49,
        content: `**UDP (User Datagram Protocol)** is a lightweight, **connectionless** protocol:\n- **No Handshake:** Transmits immediately with zero connection setup latency.\n- **No ACKs / No Retransmission:** Packets dropped along the network are simply lost.\n- **Minimal Header:** Only **8 bytes** of header overhead (vs. 20 bytes for TCP).\n\n> **⚠️ Caution from Slide 41:** Do not simply say *"UDP is faster."* UDP has lower overhead and no setup delay, but raw transmission link speed is identical. Reliability is traded for timeliness.\n\n### Real-World Protocol Selection Guide:\n| Application Scenario | Chosen Protocol | Engineering Justification |\n|---|---|---|\n| **Downloading a PDF Report** | **TCP** | Every byte matters; a single missing byte corrupts the file. |\n| **Opening a Web Page (HTTP)** | **TCP** | HTML and CSS code must arrive completely and in exact order. |\n| **Live Video / Voice Call (Zoom)** | **UDP** | Late packets are useless; dropping a glitch frame is better than freezing the call. |\n| **DNS Domain Name Lookup** | **UDP** | Fast single query and response; low overhead. |\n| **Online Multiplayer Gaming** | **UDP** | Real-time player position updates must be instantaneous. |`,
        bulletPoints: [
          'UDP is connectionless with an 8-byte header and zero handshake delay.',
          'Choose TCP when completeness and order matter more than delay (Web, Email, File transfer).',
          'Choose UDP when timeliness matters more than perfect delivery (VoIP, Video streaming, Gaming, DNS).'
        ],
        thaiCommentary: 'หลักการเลือกใช้: ถ้าข้อมูลขาดแม้แต่ไบต์เดียวแล้วพัง (เช่น ไฟล์, เว็บ, เงิน) ให้ใช้ TCP; แต่ถ้าดีเลย์แล้วพังและยอมให้ภาพกระตุกได้ดีกว่าค้าง (เช่น วิดีโอคอล, สตรีมสด, เกม) ให้ใช้ UDP'
      }
    ]
  },
  {
    id: 'w6-m6',
    weekId: 'week6',
    moduleNumber: 6,
    title: 'ICMP Diagnostics & End-to-End Website Walkthrough',
    thaiTitle: 'การวินิจฉัยเครือข่ายด้วย ICMP และขั้นตอนการเปิดเว็บไซต์ตั้งแต่ต้นจนจบ',
    description: 'Understand ICMP error reporting and diagnostics (Ping, Traceroute), and tie the entire semester together with an end-to-end packet journey.',
    pdfPageStart: 52,
    pdfPageEnd: 66,
    subsections: [
      {
        id: 'w6-m6-s1',
        title: 'ICMP Message Types, Ping & Traceroute Mechanics',
        thaiTitle: 'ประเภทข้อความ ICMP และกลไกการทำงานของ Ping กับ Traceroute',
        pdfPage: 54,
        content: `The **Internet Control Message Protocol (ICMP)** is a Network-layer protocol used by routers and hosts to report communication errors and operational diagnostics:\n\n### Essential ICMP Message Types:\n- **Echo Request (Type 8) & Echo Reply (Type 0):** Used by **Ping** to test end-to-end reachability and measure round-trip time (RTT).\n- **Destination Unreachable (Type 3):** Sent when a router or destination cannot deliver a packet due to a severed link, blocked port, or unknown network.\n- **Time Exceeded (Type 11):** Sent by a router when an incoming packet's **TTL (Time to Live) reaches 0**. Used cleverly by **Traceroute**!\n- **Redirect (Type 5):** Informs a host to use a more optimal next-hop router on the local subnet.\n\n### How Traceroute Works Conceptually:\nTraceroute sends a series of packets with increasing TTL values:\n1. Sends packet with $\\text{TTL} = 1$ ➔ Router 1 decrements TTL to 0, drops packet, and sends back an **ICMP Time Exceeded** message (revealing Router 1's IP!).\n2. Sends packet with $\\text{TTL} = 2$ ➔ Router 2 drops packet, returns ICMP Time Exceeded (revealing Router 2's IP!).\n3. Repeats until the final destination responds!`,
        bulletPoints: [
          'Ping uses ICMP Echo Request / Echo Reply.',
          'Traceroute reveals intermediate hops using ICMP Time Exceeded (TTL expiration).',
          'ICMP is a Layer 3 helper protocol, NOT an application protocol.'
        ],
        thaiCommentary: 'Ping ส่ง Echo Request รอ Echo Reply; ส่วน Traceroute ฉลาดมาก ใช้การตั้งค่า TTL=1, 2, 3 เพื่อให้เราเตอร์ระหว่างทางส่งข้อความ Time Exceeded กลับมา ทำให้รู้ IP ของเราเตอร์ทุกตัวในเส้นทาง'
      },
      {
        id: 'w6-m6-s2',
        title: 'Applied Walkthrough: What Happens When You Open a Website?',
        thaiTitle: 'การเดินทางของข้อมูล: เกิดอะไรขึ้นบ้างเมื่อคุณพิมพ์ URL เปิดเว็บไซต์?',
        pdfPage: 58,
        content: `Putting the entire curriculum together into an 8-step journey:\n\n1. **Enter URL:** User types \`https://www.example.com\` into the browser.\n2. **DNS Resolution:** Browser queries DNS via UDP to translate human domain name \`www.example.com\` into IP address \`93.184.216.34\`.\n3. **TCP Connection:** Browser performs a **TCP 3-Way Handshake** (SYN ➔ SYN-ACK ➔ ACK) with port 443 of the destination IP.\n4. **HTTP Request Created:** Browser constructs an application-layer request: \`GET /index.html HTTP/1.1\`.\n5. **Encapsulation:** The request is wrapped into a TCP Segment, then an IP Packet, then an Ethernet Frame.\n6. **Routing & Forwarding:** The frame crosses local switches to the default gateway router; routers inspect the IP header and forward the packet hop-by-hop across the Internet.\n7. **Server Response:** The web server decapsulates the packet, processes the request, and sends back an HTTP 200 OK response with web data.\n8. **Browser Rendering:** The browser decapsulates the incoming response, interprets HTML/CSS/JS, and displays the webpage on the screen!`,
        bulletPoints: [
          'No single protocol does everything; communication succeeds through cross-layer cooperation.',
          'DNS finds the IP; TCP opens the pipe; IP navigates the path; Ethernet moves the frame; HTTP delivers the content.',
          'The whole multi-layer sequence occurs in less than a single second!'
        ],
        thaiCommentary: 'สรุปการเดินทาง: มนุษย์จำชื่อ DNS แปลงเป็น IP ➔ TCP จับมือเปิดทาง ➔ HTTP ขอหน้าเว็บ ➔ ข้อมูลถูกห่อเป็น Packet และ Frame ➔ วิ่งข้ามเราเตอร์ ➔ เซิร์ฟเวอร์แกะซองและส่งผลลัพธ์กลับมาให้เบราว์เซอร์แสดงผล'
      }
    ]
  }
];

export const week6Flashcards: Flashcard[] = [
  {
    id: 'w6-fc1',
    weekId: 'week6',
    front: 'Why does "Connected" not automatically mean "Communicating"?',
    thaiFront: 'ทำไมคำว่า "เชื่อมต่ออยู่" (Connected) ถึงไม่ได้หมายความว่า "สื่อสารรู้เรื่อง" (Communicating) เสมอไป?',
    back: 'Connection is having a physical path to send signals (cable, Wi-Fi). Communication requires shared protocols ensuring data carries syntax, semantics, and mutual understanding.',
    thaiBack: 'การเชื่อมต่อเป็นเพียงการมีช่องทางกายภาพในการส่งสัญญาณ แต่การสื่อสารต้องมีกฎเกณฑ์ร่วมกัน (โปรโตคอล) ที่กำหนดโครงสร้าง ความหมาย และจังหวะเวลา จึงจะเข้าใจข้อมูลได้',
    pdfPage: 6,
    category: 'Big Idea'
  },
  {
    id: 'w6-fc2',
    weekId: 'week6',
    front: 'Name the Protocol Data Unit (PDU) at Layers 4, 3, 2, and 1.',
    thaiFront: 'จงบอกชื่อหน่วยข้อมูล (PDU) ที่เลเยอร์ 4, 3, 2 และ 1',
    back: 'Layer 4 (Transport) = Segment (TCP) / Datagram (UDP); Layer 3 (Network) = Packet; Layer 2 (Data Link) = Frame; Layer 1 (Physical) = Bits.',
    thaiBack: 'เลเยอร์ 4 = Segment / Datagram; เลเยอร์ 3 = Packet; เลเยอร์ 2 = Frame; เลเยอร์ 1 = Bits',
    pdfPage: 10,
    category: 'Layered Models'
  },
  {
    id: 'w6-fc3',
    weekId: 'week6',
    front: 'What are the 3 Duplex modes and give an everyday example of each?',
    thaiFront: 'โหมด Duplex ทั้ง 3 แบบมีอะไรบ้าง พร้อมยกตัวอย่างในชีวิตประจำวัน',
    back: '1) Simplex: One direction only (Broadcast TV / Keyboard). 2) Half-Duplex: Both directions, but one at a time (Walkie-talkie / Wi-Fi). 3) Full-Duplex: Simultaneous both directions (Telephone / Switched Ethernet).',
    thaiBack: '1) Simplex: ส่งทางเดียวตลอดกาล (วิทยุ/ทีวี); 2) Half-Duplex: สองทางแต่สลับกันทีละฝั่ง (วอล์คกี้-ทอล์คกี้/Wi-Fi); 3) Full-Duplex: ส่งและรับพร้อมกันสองทางได้ทันที (โทรศัพท์/สวิตช์แลน)',
    pdfPage: 17,
    category: 'OSI Model'
  },
  {
    id: 'w6-fc4',
    weekId: 'week6',
    front: 'What questions do MAC Address, IP Address, and Port Number answer?',
    thaiFront: 'MAC Address, IP Address และ Port Number ตอบคำถามเรื่องใดบ้าง?',
    back: 'MAC Address: Which local interface receives the frame on this link? IP Address: Which host/network across the internet? Port Number: Which application process on that host?',
    thaiBack: 'MAC Address: การ์ดแลนใดในลิงก์ท้องถิ่นนี้ที่รับเฟรม; IP Address: โฮสต์/เครือข่ายใดในอินเทอร์เน็ตที่เป็นปลายทาง; Port Number: โปรแกรมใดบนเครื่องนั้นที่ต้องประมวลผลข้อมูล',
    pdfPage: 60,
    category: 'Addressing'
  },
  {
    id: 'w6-fc5',
    weekId: 'week6',
    front: 'In IPv4 CIDR /24, how many bits are network bits, host bits, and usable hosts?',
    thaiFront: 'ในสัญลักษณ์ CIDR /24 มีบิต Network, บิต Host และจำนวนเครื่องที่ใช้ได้กี่เครื่อง?',
    back: '24 Network bits, 8 Host bits (32 - 24 = 8). Usable hosts = 2^8 - 2 = 254 hosts (excluding Network ID and Broadcast ID). Subnet mask is 255.255.255.0.',
    thaiBack: '24 บิต Network, 8 บิต Host; จำนวนเครื่องที่ใช้ได้คือ 2^8 - 2 = 254 เครื่อง (หัก Network ID กับ Broadcast ออก) และ Subnet Mask คือ 255.255.255.0',
    pdfPage: 34,
    category: 'IP Addressing'
  },
  {
    id: 'w6-fc6',
    weekId: 'week6',
    front: 'What are the steps of the TCP 3-Way Handshake?',
    thaiFront: 'ขั้นตอนการจับมือ 3 ขั้นตอนของ TCP (3-Way Handshake) มีอะไรบ้าง?',
    back: 'Step 1: Client sends SYN. Step 2: Server sends SYN-ACK. Step 3: Client sends ACK. Connection is now ESTABLISHED for data transfer.',
    thaiBack: 'ขั้นตอนที่ 1: ไคลเอนต์ส่ง SYN ➔ ขั้นตอนที่ 2: เซิร์ฟเวอร์ตอบ SYN-ACK ➔ ขั้นตอนที่ 3: ไคลเอนต์ยืนยันกลับด้วย ACK จึงถือว่าสร้างการเชื่อมต่อสมบูรณ์',
    pdfPage: 47,
    category: 'Transport Layer'
  },
  {
    id: 'w6-fc7',
    weekId: 'week6',
    front: 'Why should you not simply say "UDP is faster than TCP"?',
    thaiFront: 'ทำไมจึงไม่ควรพูดสรุปง่ายๆ แค่ว่า "UDP เร็วกว่า TCP"?',
    back: 'Both protocols transmit at the same physical line speed. UDP has lower header overhead (8 bytes vs 20 bytes) and zero connection setup delay, but it trades reliability for timeliness.',
    thaiBack: 'ทั้งสองโปรโตคอลวิ่งบนสายสัญญาณด้วยความเร็วฟิสิกส์เท่ากัน แต่ UDP มีส่วนหัวเล็กกว่า (8 ไบต์ เทียบกับ 20 ไบต์) และไม่ต้องเสียเวลารอจับมือ จึงเริ่มส่งได้ทันทีโดยยอมแลกกับความเสี่ยงข้อมูลสูญหาย',
    pdfPage: 49,
    category: 'Transport Layer'
  },
  {
    id: 'w6-fc8',
    weekId: 'week6',
    front: 'How does Traceroute discover intermediate router hops?',
    thaiFront: 'คำสั่ง Traceroute ใช้กลไกใดในการค้นหารายชื่อเราเตอร์ระหว่างทาง?',
    back: 'Traceroute sends packets with incrementing TTL values (1, 2, 3...). Each intermediate router decrements TTL to 0, drops the packet, and returns an ICMP Time Exceeded message revealing its IP address.',
    thaiBack: 'Traceroute ส่งแพ็กเก็ตที่ตั้งค่า TTL เพิ่มขึ้นทีละ 1 (TTL=1, 2, 3...) เมื่อไปถึงเราเตอร์ตัวใดแล้ว TTL หมดอายุเหลือ 0 เราเตอร์จะส่งข้อความ ICMP Time Exceeded กลับมา ทำให้ทราบ IP ของเราเตอร์ตัวนั้น',
    pdfPage: 55,
    category: 'Diagnostics'
  }
];

export const week6Quizzes: QuizQuestion[] = [
  {
    id: 'w6-q1',
    weekId: 'week6',
    pdfPage: 10,
    topic: 'Encapsulation & PDUs',
    question: 'At which layer of the OSI model is data called a "Frame", and what control fields are added to it?',
    thaiContext: 'ในเลเยอร์ใดของแบบจำลอง OSI ที่ข้อมูลถูกเรียกว่า "Frame" และมีฟิลด์ควบคุมใดถูกเพิ่มเข้ามาบ้าง?',
    options: [
      {
        text: 'Network Layer, which adds source and destination IP addresses plus a TTL counter.',
        isCorrect: false,
        explanation: 'The Network layer produces Packets with IP addresses, not Frames.'
      },
      {
        text: 'Data Link Layer, which wraps the packet with a frame header containing MAC addresses and an FCS error-checking trailer.',
        isCorrect: true,
        explanation: 'Correct! The Data Link layer wraps packets into Frames using local MAC addresses and appends a Frame Check Sequence (FCS) trailer.'
      },
      {
        text: 'Transport Layer, which adds TCP sequence numbers and port multiplexing.',
        isCorrect: false,
        explanation: 'The Transport layer packages data into Segments or Datagrams.'
      },
      {
        text: 'Physical Layer, which converts bits into electromagnetic voltages.',
        isCorrect: false,
        explanation: 'The Physical layer handles raw Bits, not Frames.'
      }
    ]
  },
  {
    id: 'w6-q2',
    weekId: 'week6',
    pdfPage: 17,
    topic: 'Duplex Modes',
    question: 'A two-way radio (walkie-talkie) where users must release the push-to-talk button before listening represents which duplex mode?',
    thaiContext: 'วิทยุสื่อสารสองทาง (วอล์คกี้-ทอล์คกี้) ที่ผู้ใช้ต้องปล่อยปุ่มพูดก่อนจึงจะรับฟังเสียงอีกฝ่ายได้ จัดเป็นโหมดการส่งสัญญาณประเภทใด?',
    options: [
      {
        text: 'Simplex mode, because only one device can transmit throughout the entire day.',
        isCorrect: false,
        explanation: 'Simplex is permanently one-way (e.g. broadcast television), with no return communication possible.'
      },
      {
        text: 'Half-Duplex mode, because communication can flow in both directions, but only in one direction at a time.',
        isCorrect: true,
        explanation: 'Half-Duplex allows bidirectional communication, but nodes must take turns transmitting.'
      },
      {
        text: 'Full-Duplex mode, because both users can talk and listen at the exact same millisecond.',
        isCorrect: false,
        explanation: 'Full-Duplex allows simultaneous transmission and reception (like a phone call).'
      },
      {
        text: 'Multiplex mode, because it translates analog sound into fiber optic laser bursts.',
        isCorrect: false,
        explanation: 'Multiplexing is combining signals, not a duplex transmission mode.'
      }
    ]
  },
  {
    id: 'w6-q3',
    weekId: 'week6',
    pdfPage: 34,
    topic: 'IPv4 & CIDR',
    question: 'Given the host IP address 192.168.10.25 with CIDR notation /24, which portion represents the shared network address and what is the subnet mask?',
    thaiContext: 'กำหนดให้โฮสต์มีไอพี 192.168.10.25/24 ส่วนใดคือแอดเดรสของเน็ตเวิร์ก และ Subnet Mask มีค่าเท่าใด?',
    options: [
      {
        text: 'Network part is 192.168.10 and the subnet mask is 255.255.255.0.',
        isCorrect: true,
        explanation: 'In /24, the first 24 bits (first 3 octets: 192.168.10) identify the subnet, and 24 binary 1s equal 255.255.255.0.'
      },
      {
        text: 'Network part is .25 and the subnet mask is 255.0.0.0.',
        isCorrect: false,
        explanation: '.25 is the host part inside the subnet, not the network part.'
      },
      {
        text: 'Network part is 192.168 and the subnet mask is 255.255.0.0 (/16).',
        isCorrect: false,
        explanation: 'That would be a /16 network prefix, not /24.'
      },
      {
        text: 'Network part is 255.255.255.255 and the host can use 4 billion IPs.',
        isCorrect: false,
        explanation: '255.255.255.255 is the global broadcast address.'
      }
    ]
  },
  {
    id: 'w6-q4',
    weekId: 'week6',
    pdfPage: 39,
    topic: 'IPv6 Architecture',
    question: 'Which of the following is a key characteristic of IPv6 that differs fundamentally from IPv4?',
    thaiContext: 'ข้อใดเป็นคุณลักษณะสำคัญของ IPv6 ที่แตกต่างจาก IPv4 อย่างสิ้นเชิง?',
    options: [
      {
        text: 'IPv6 uses 32-bit addresses written in decimal octets.',
        isCorrect: false,
        explanation: 'IPv6 uses 128-bit addresses in hexadecimal quartets; IPv4 uses 32 bits.'
      },
      {
        text: 'IPv6 eliminates traditional broadcast addresses, utilizing Multicast and Anycast instead.',
        isCorrect: true,
        explanation: 'IPv6 has no broadcast; it uses multicast to communicate with specific groups and anycast for nearest-node delivery.'
      },
      {
        text: 'IPv6 relies on NAT (Network Address Translation) because its address space is smaller than IPv4.',
        isCorrect: false,
        explanation: 'IPv6 has 340 undecillion addresses (2^128), eliminating the need for NAT.'
      },
      {
        text: 'IPv6 requires a variable 20-to-60 byte base header.',
        isCorrect: false,
        explanation: 'IPv6 features a streamlined, fixed 40-byte base header.'
      }
    ]
  },
  {
    id: 'w6-q5',
    weekId: 'week6',
    pdfPage: 47,
    topic: 'Transport Layer',
    question: 'What is the correct 3-step sequence used by TCP to establish a connection before data transmission begins?',
    thaiContext: 'ลำดับ 3 ขั้นตอนที่ถูกต้องของ TCP ในการสร้างการเชื่อมต่อ (3-Way Handshake) ก่อนเริ่มส่งข้อมูลคือข้อใด?',
    options: [
      {
        text: 'PING ➔ PONG ➔ ACK',
        isCorrect: false,
        explanation: 'Ping and Pong are not part of TCP connection setup (Ping is ICMP).'
      },
      {
        text: 'SYN ➔ SYN-ACK ➔ ACK',
        isCorrect: true,
        explanation: 'Client sends SYN, Server responds with SYN-ACK, and Client confirms with ACK. Connection is then ESTABLISHED.'
      },
      {
        text: 'FIN ➔ FIN-ACK ➔ RST',
        isCorrect: false,
        explanation: 'FIN and FIN-ACK are used to terminate a connection, not establish one.'
      },
      {
        text: 'DNS Query ➔ IP Route ➔ HTTP GET',
        isCorrect: false,
        explanation: 'These are separate application and network steps, not the TCP 3-way handshake.'
      }
    ]
  },
  {
    id: 'w6-q6',
    weekId: 'week6',
    pdfPage: 51,
    topic: 'Protocol Selection',
    question: 'Why is UDP selected over TCP for real-time live video calls (such as Zoom or Discord)?',
    thaiContext: 'ทำไมการสื่อสารแบบวิดีโอคอลสด (เช่น Zoom หรือ Discord) จึงเลือกใช้โปรโตคอล UDP มากกว่า TCP?',
    options: [
      {
        text: 'TCP cannot carry multimedia audio or video streams under any circumstance.',
        isCorrect: false,
        explanation: 'TCP can carry video (e.g. YouTube streaming with buffering), but retransmissions cause unacceptable live stalls.'
      },
      {
        text: 'In live calls, timely delivery is more critical than 100% reliability; retransmitting a late dropped frame causes freezing rather than helpful playback.',
        isCorrect: true,
        explanation: 'Delayed video packets are useless during a real-time conversation. UDP drops lost frames and continues smoothly without retransmission delays.'
      },
      {
        text: 'UDP encrypts all packets with quantum cryptography automatically.',
        isCorrect: false,
        explanation: 'UDP provides zero encryption on its own; encryption is handled by higher layers (e.g. DTLS/SRTP).'
      },
      {
        text: 'UDP guarantees that every single packet arrives in perfect sequential order.',
        isCorrect: false,
        explanation: 'UDP has no ordering or delivery guarantees.'
      }
    ]
  },
  {
    id: 'w6-q7',
    weekId: 'week6',
    pdfPage: 55,
    topic: 'Network Diagnostics',
    question: 'How does the network utility "Traceroute" leverage ICMP to discover the path of routers between source and destination?',
    thaiContext: 'เครื่องมือ "Traceroute" อาศัยกลไกใดของ ICMP ในการค้นหาเส้นทางเราเตอร์ระหว่างต้นทางและปลายทาง?',
    options: [
      {
        text: 'It sends packets with incrementing TTL (Time to Live) values; intermediate routers drop the packet when TTL reaches 0 and return an ICMP Time Exceeded message.',
        isCorrect: true,
        explanation: 'Each router that decrements TTL to 0 generates an ICMP Time Exceeded message, revealing its IP address to the traceroute utility.'
      },
      {
        text: 'It sends an encrypted password to each router requesting their internal configuration file.',
        isCorrect: false,
        explanation: 'Traceroute does not require authentication or configuration files.'
      },
      {
        text: 'It disables all firewalls along the path using an ICMP Redirect command.',
        isCorrect: false,
        explanation: 'ICMP cannot disable remote network firewalls.'
      },
      {
        text: 'It queries the global DNS root server for the physical GPS coordinates of every wire.',
        isCorrect: false,
        explanation: 'Traceroute operates through packet TTL expiration, not DNS GPS lookups.'
      }
    ]
  }
];
