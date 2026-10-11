import { StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';

export const week5KeyConcepts: KeyConcept[] = [
  {
    id: 'w5-c1',
    term: 'Computer Network & The 4 Questions',
    thaiTerm: 'ระบบเครือข่ายคอมพิวเตอร์และ 4 คำถามหลัก',
    definition: 'A link between two or more network devices. Structured around 4 core questions: 1) What devices? (hub, switch, router, AP), 2) How connected? (copper, fiber, wireless), 3) How communicate? (frames, packets, addressing), and 4) How protected? (firewalls, access controls).',
    thaiDefinition: 'การเชื่อมต่อระหว่างอุปกรณ์เครือข่ายตั้งแต่สองเครื่องขึ้นไป โดยมี 4 มิติสำคัญ: 1) ใช้อุปกรณ์อะไร, 2) เชื่อมโยงด้วยสื่อชนิดใด, 3) สื่อสารด้วยกฎเกณฑ์/โปรโตคอลใด, และ 4) มีกลไกป้องกันความปลอดภัยอย่างไร',
    example: 'Connecting laptop, smartphones, and printers through home Wi-Fi and fiber broadband router to access cloud servers.',
    pdfPage: 4,
    category: 'Fundamentals',
    important: true,
  },
  {
    id: 'w5-c2',
    term: 'Hub (Layer 1 Physical)',
    thaiTerm: 'ฮับ (อุปกรณ์เลเยอร์ 1 - ทวนสัญญาณ)',
    definition: 'A physical-layer multiport repeater with zero address intelligence (cannot read MAC or IP). Repeats incoming electrical/optical signals out to ALL ports. All connected devices share a single collision domain.',
    thaiDefinition: 'อุปกรณ์ฮาร์ดแวร์เลเยอร์ 1 ที่ไม่มีหน่วยความจำและอ่านแอดเดรสไม่เป็น เมื่อมีสัญญาณเข้ามาทางพอร์ตหนึ่ง จะกระจายสัญญาณซ้ำออกไปทุกพอร์ตพร้อมกัน ส่งผลให้อยู่ใน Collision Domain เดียวกันและเสี่ยงต่อสัญญาณชนกัน',
    example: 'Legacy 10BASE-T hub broadcasting every packet to all 8 desktop computers in a lab.',
    pdfPage: 9,
    category: 'Network Devices',
    important: true,
  },
  {
    id: 'w5-c3',
    term: 'Switch (Layer 2 Data Link)',
    thaiTerm: 'สวิตช์ (อุปกรณ์เลเยอร์ 2 - ส่งต่อตาม MAC Address)',
    definition: 'An intelligent Layer 2 device that learns source MAC addresses and records them in a MAC Table (CAM Table). Selectively forwards frames only to the designated target port, creating an isolated collision domain per port.',
    thaiDefinition: 'อุปกรณ์เลเยอร์ 2 ที่จดจำ MAC Address ลงในตารางเพื่อเลือกส่งเฟรมไปยังพอร์ตปลายทางอย่างเจาะจง ไม่ส่งมั่ว แยก Collision Domain แต่ละพอร์ตเป็นอิสระต่อกันอย่างสิ้นเชิง',
    example: 'A 24-port Gigabit Ethernet switch forwarding traffic directly between PC A (Port 1) and Printer (Port 4).',
    pdfPage: 10,
    category: 'Network Devices',
    important: true,
  },
  {
    id: 'w5-c4',
    term: 'Router (Layer 3 Network)',
    thaiTerm: 'เราเตอร์ (อุปกรณ์เลเยอร์ 3 - เชื่อมต่อและกำหนดเส้นทางข้ามเครือข่าย)',
    definition: 'A Layer 3 device that connects disparate IP networks (e.g. LAN to WAN). Inspects destination IP addresses, matches against its routing table using Longest Prefix Match, and forwards packets across next hops.',
    thaiDefinition: 'อุปกรณ์เลเยอร์ 3 ทำหน้าที่เชื่อมต่อเครือข่ายคนละวง (Subnet) เข้าด้วยกัน ตรวจสอบ Destination IP และค้นหาเส้นทางที่ดีที่สุดจาก Routing Table เพื่อส่งต่อแพ็กเก็ตไปยัง Next Hop หรือ Gateway',
    example: 'Office gateway router connecting internal subnet 192.168.1.0/24 to the public Internet via ISP WAN port.',
    pdfPage: 11,
    category: 'Network Devices',
    important: true,
  },
  {
    id: 'w5-c5',
    term: 'Modem (Modulator / Demodulator)',
    thaiTerm: 'โมเด็ม (ตัวแปลงสัญญาณอนาล็อก ⇄ ดิจิทัล)',
    definition: 'A hardware unit that converts signals between service-provider transmission media (analog waves or optical pulses) and digital pulses utilized by computer networks.',
    thaiDefinition: 'อุปกรณ์แปลงสัญญาณระหว่างฝั่งผู้ให้บริการ (สัญญาณอนาล็อกหรือแสงไฟเบอร์) กับสัญญาณดิจิทัลของคอมพิวเตอร์ (เช่น Optical Modem, Cable Modem, VDSL Modem)',
    example: 'Fiber ONT/Modem converting optical laser pulses from the street into RJ45 Ethernet digital frames.',
    pdfPage: 13,
    category: 'Network Devices',
    important: false,
  },
  {
    id: 'w5-c6',
    term: 'Access Point (AP - Layer 2 Bridge)',
    thaiTerm: 'แอ็กเซสพอยต์ (AP - สะพานเชื่อมไร้สายเข้าสู่เครือข่ายสาย)',
    definition: 'A Layer 2 bridge that connects wireless 802.11 Wi-Fi clients into a wired Ethernet LAN, maintaining all devices on the same local IP subnet.',
    thaiDefinition: 'อุปกรณ์เลเยอร์ 2 ทำหน้าที่แปลงเฟรมระหว่างคลื่น Wi-Fi กับสายสัญญาณ Ethernet ช่วยให้อุปกรณ์ไร้สายเชื่อมต่อเข้ามาอยู่ใน Local IP Subnet เดียวกันกับสาย LAN',
    example: 'Ceiling-mounted Cisco AP connecting student laptops wirelessly to the university laboratory switch.',
    pdfPage: 15,
    category: 'Network Devices',
    important: true,
  },
  {
    id: 'w5-c7',
    term: 'Twisted-Pair & Differential Signaling',
    thaiTerm: 'สายคู่บิดเกลียว (Twisted-Pair) และการหักล้างสัญญาณรบกวน',
    definition: 'Pairs of copper conductors twisted around each other so both wires are equally exposed to external electromagnetic noise. The receiver subtracts the signals, cancelling out common-mode noise.',
    thaiDefinition: 'สายทองแดงที่บิดเกลียวเข้าหากันเป็นคู่เพื่อให้ทั้งสองเส้นได้รับสัญญาณรบกวนเท่ากัน เมื่อตัวรับนำสัญญาณมาหักลบกัน (Differential Signaling) สัญญาณรบกวนจะหักล้างหมดไป เหลือเพียงสัญญาณข้อมูลที่แท้จริง',
    example: 'Cat 6 UTP cable carrying 10 Gbps Ethernet without data corruption from nearby electrical wiring.',
    pdfPage: 32,
    category: 'Transmission Media',
    important: true,
  },
  {
    id: 'w5-c8',
    term: 'T568A vs. T568B Wiring Standards',
    thaiTerm: 'มาตรฐานการเรียงสาย T568A vs T568B',
    definition: 'The two wiring color pinout standards for 8-pin RJ45 connectors. T568A uses Green pair on Pins 1-2 and Orange on Pins 3 & 6. T568B swaps them: Orange pair on Pins 1-2 and Green on Pins 3 & 6. Blue (4-5) and Brown (7-8) are identical in both.',
    thaiDefinition: 'มาตรฐานการเรียงสีสายแลน 8 พินในหัว RJ45: T568A ใช้คู่สีเขียวที่พิน 1-2 และส้มที่ 3, 6; ส่วน T568B สลับเอาคู่สีส้มมาไว้ที่พิน 1-2 และเขียวที่ 3, 6 (คู่สีฟ้า 4-5 และน้ำตาล 7-8 คงเดิม)',
    example: 'Straight-through cable has T568B on both ends; Crossover cable has T568A on one end and T568B on the other.',
    pdfPage: 27,
    category: 'Cabling Standards',
    important: true,
  },
  {
    id: 'w5-c9',
    term: 'Single-Mode vs. Multi-Mode Fiber',
    thaiTerm: 'สายใยแก้วนำแสง Single-Mode vs Multi-Mode',
    definition: 'Single-mode features an ultra-thin 9 µm core supporting a single laser light path for long-distance telecommunications (>10 km). Multi-mode has a wider 50/62.5 µm core allowing multiple light modes with LED sources, ideal for buildings/campuses (<2 km).',
    thaiDefinition: 'Single-mode แกนแก้วเล็กมาก (9 ไมครอน) ลำแสงวิ่งเป็นเส้นตรงเส้นเดียว ใช้เลเซอร์ ส่งได้ไกลระดับสิบกิโลเมตร; Multi-mode แกนแก้วกว้างกว่า แสงสะท้อนหลายมุม ใช้ไฟ LED เหมาะกับภายในอาคารหรือดาต้าเซ็นเตอร์',
    example: 'Single-mode runs undersea and inter-city backbones; Multi-mode connects servers between datacenter racks.',
    pdfPage: 41,
    category: 'Transmission Media',
    important: true,
  },
  {
    id: 'w5-c10',
    term: 'Wireless Frequency vs. Wavelength Trade-off',
    thaiTerm: 'ความสัมพันธ์ระหว่างความถี่กับความยาวคลื่นในระบบไร้สาย',
    definition: 'Inverse relationship: Higher frequency equals shorter wavelength. Higher frequencies (e.g. 5 GHz Wi-Fi) carry higher data bandwidth but have poorer obstacle penetration and shorter range than lower frequencies (e.g. 2.4 GHz).',
    thaiDefinition: 'ความถี่สูงขึ้น = ความยาวคลื่นสั้นลง: ส่งข้อมูลได้เร็วกว่าแต่ทะลุทะลวงสิ่งกีดขวางได้แย่กว่าและระยะทางสั้นลง (เช่น Wi-Fi 5 GHz เร็วกว่าแต่ทะลุกำแพงสู้ 2.4 GHz ไม่ได้)',
    example: '2.4 GHz covers the whole house with 3 non-overlapping channels; 5 GHz provides maximum gaming speeds in the same room.',
    pdfPage: 45,
    category: 'Wireless Communication',
    important: true,
  },
  {
    id: 'w5-c11',
    term: 'Network Geographic Scopes (PAN to WAN)',
    thaiTerm: 'ขอบเขตเครือข่ายตามภูมิศาสตร์ (PAN, LAN, CAN, MAN, WAN)',
    definition: 'PAN (Personal: Bluetooth ~10m), LAN (Local Area: home/office building), CAN (Campus: university/corporate park), MAN (Metropolitan: city-wide), and WAN (Wide Area: country/global Internet).',
    thaiDefinition: 'การแบ่งขนาดเครือข่ายตามพื้นที่: PAN (อุปกรณ์ส่วนบุคคล), LAN (อาคาร/ห้อง), CAN (วิทยาเขตมหาวิทยาลัย), MAN (ระดับเมือง), WAN (ระดับประเทศหรือเครือข่ายอินเทอร์เน็ตทั่วโลก)',
    example: 'Connecting smart watch to phone is PAN; Connecting lab PCs to switch is LAN; The Internet is the ultimate WAN.',
    pdfPage: 52,
    category: 'Network Types',
    important: true,
  },
  {
    id: 'w5-c12',
    term: 'Network Topologies & Fault Tolerance',
    thaiTerm: 'โทโพโลยีเครือข่ายและความทนทานต่อความเสียหาย (Fault Tolerance)',
    definition: 'Arrangement of nodes and links: Bus (shared trunk, low fault tolerance), Star (central switch, central point of failure, easy install), Ring (closed loop), Mesh (multiple redundant links, highest fault tolerance), Tree (hierarchical).',
    thaiDefinition: 'โครงสร้างการเชื่อมต่อ: Bus (สายแกนร่วม พังทั้งระบบถ้ารอยต่อขาด), Star (รวมที่สวิตช์กลาง เป็นที่นิยมสุด), Ring (วงแหวน), Mesh (โยงใยหลายเส้นทาง ทนทานสูงสุดแต่ราคาสูง), Tree (ต้นไม้ตามลำดับขั้น)',
    example: 'Modern offices use Star topology with switches; Mission-critical router cores use Mesh topology.',
    pdfPage: 57,
    category: 'Topologies',
    important: true,
  }
];

export const week5Modules: StudyModule[] = [
  {
    id: 'w5-m1',
    weekId: 'week5',
    moduleNumber: 1,
    title: 'Computer Network Definition & The 4 Core Questions',
    thaiTitle: 'นิยามของระบบเครือข่ายคอมพิวเตอร์ และ 4 คำถามหลัก',
    description: 'Understand the fundamental purpose of computer networks and the 4-part mental framework (Devices, Links, Communication, Protection).',
    pdfPageStart: 1,
    pdfPageEnd: 6,
    subsections: [
      {
        id: 'w5-m1-s1',
        title: 'What is a Computer Network?',
        thaiTitle: 'ระบบเครือข่ายคอมพิวเตอร์คืออะไร?',
        pdfPage: 4,
        content: `A **Computer Network** is defined as a communication link between two or more network devices.\n\nIt is not just "the Internet"; it encompasses all interconnected electronic systems around us, including:\n- **Home Wi-Fi:** Home router connecting smartphones, laptops, and smart TVs.\n- **University LAN:** Computer laboratories, printers, and campus file servers.\n- **Mobile Networks:** 4G/5G cellular towers connecting devices on the move.\n- **Cloud Services:** Data centers hosting web applications, databases, and media storage.\n- **Smart Devices (IoT):** Wearables, home security sensors, and industrial monitors.`,
        bulletPoints: [
          'A computer network requires both physical infrastructure and agreed communication rules.',
          'Every user interaction follows a chain: User Device → Wi-Fi / Link → Access Point → Switch → Router → Internet → Server.',
          'Networks exist to share resources, transfer data, and enable distributed computing.'
        ],
        thaiCommentary: 'เครือข่ายคอมพิวเตอร์คือสายใยเชื่อมต่ออุปกรณ์สองชิ้นขึ้นไปเข้าด้วยกัน โดยต้องมีทั้งฮาร์ดแวร์กายภาพและกฎเกณฑ์การสื่อสาร (โปรโตคอล) ควบคู่กัน',
        memoryTip: 'Chain of Request: Phone ➔ Wi-Fi ➔ Access Point ➔ Router ➔ Internet ➔ Destination Server.'
      },
      {
        id: 'w5-m1-s2',
        title: 'The 4 Questions of Networking Mental Framework',
        thaiTitle: 'กรอบความคิด 4 คำถามแห่งระบบเครือข่าย',
        pdfPage: 5,
        content: `To analyze any network architecture without getting lost in technical acronyms, apply the **Four Questions Framework**:\n\n1. **What devices?** (Hardware roles: Hub, Switch, Router, Access Point, Modem, Repeater).\n2. **How connected?** (Transmission media: Copper twisted pair, Fiber optic, Wireless RF).\n3. **How communicate?** (Protocols, Packets, Frames, Addressing: MAC vs IP vs Port).\n4. **How protected?** (Security defenses: Firewalls, IDS/IPS, NAC, Access controls).`,
        bulletPoints: [
          'Devices: Hardware building blocks performing specific layer tasks.',
          'Links: The physical or wireless medium carrying electrical, optical, or radio signals.',
          'Communication: The rulebook (protocols) ensuring sender and receiver agree on syntax, semantics, and timing.',
          'Protection: Perimeter shields preventing unauthorized access and maintaining service availability.'
        ],
        thaiCommentary: 'เมื่อวิเคราะห์ระบบเครือข่าย ให้ถามตัวเอง 4 ข้อเสมอ: ใช้อุปกรณ์อะไร, เชื่อมต่อด้วยอะไร, สื่อสารด้วยกฎเกณฑ์ไหน, และป้องกันความปลอดภัยอย่างไร',
        memoryTip: 'Remember: Device ➔ Link ➔ Communication ➔ Protection.'
      }
    ]
  },
  {
    id: 'w5-m2',
    weekId: 'week5',
    moduleNumber: 2,
    title: 'Network Device Ecosystem: Hub vs. Switch vs. Router',
    thaiTitle: 'ระบบนิเวศอุปกรณ์เครือข่าย: ฮับ vs สวิตช์ vs เราเตอร์ vs AP vs โมเด็ม',
    description: 'Examine the functional roles of network devices across Layers 1, 2, and 3, understanding collision domains and address intelligence.',
    pdfPageStart: 7,
    pdfPageEnd: 18,
    subsections: [
      {
        id: 'w5-m2-s1',
        title: 'Hub (Layer 1) vs. Switch (Layer 2) vs. Router (Layer 3)',
        thaiTitle: 'การเปรียบเทียบเชิงลึก: Hub (L1) vs Switch (L2) vs Router (L3)',
        pdfPage: 17,
        infographicId: 'infographic-w5-devices',
        content: `The three core forwarding devices operate at distinctly different layers of communication:\n\n### 1. Hub (Layer 1 - Physical)\n- **Operation:** Multiport physical signal repeater.\n- **Address Intelligence:** NONE (cannot read MAC or IP addresses).\n- **Forwarding Rule:** **ONE INPUT → EVERY PORT**. Repeats electrical voltage indiscriminately.\n- **Collision Domain:** All connected devices share **ONE single collision domain**.\n\n### 2. Switch (Layer 2 - Data Link)\n- **Operation:** Intelligent multi-port bridge.\n- **Address Intelligence:** Reads **MAC Addresses** (48-bit hardware addresses).\n- **Forwarding Rule:** **LEARN → LOOK UP → FORWARD**. Builds a MAC Address Table (CAM Table) dynamically.\n- **Collision Domain:** Every single switch port is an **isolated collision domain** (Full-Duplex support).\n\n### 3. Router (Layer 3 - Network)\n- **Operation:** Gateway interconnecting different IP subnets and WANs.\n- **Address Intelligence:** Reads **Logical IP Addresses** (IPv4 / IPv6).\n- **Forwarding Rule:** Matches destination IP against its **Routing Table** using Longest Prefix Match.\n- **Broadcast Domain:** Routers do NOT forward broadcast frames by default, separating broadcast domains.`,
        bulletPoints: [
          'Hub repeats to all ports = Shared medium, high collisions.',
          'Switch learns MAC = Selective forwarding, zero collision between ports.',
          'Router reads IP = Route selection between distinct networks (LAN to WAN).'
        ],
        thaiCommentary: 'ข้อสอบชอบถามมาก: Hub ส่งกระจายทุกพอร์ตไม่มีสมอง (L1), Switch ส่งเจาะจงตาม MAC Address (L2), Router ส่งข้ามวงเน็ตเวิร์กตาม IP Address (L3)',
        memoryTip: 'Hub = L1 Broadcast; Switch = L2 MAC Filter; Router = L3 IP Routing.'
      },
      {
        id: 'w5-m2-s2',
        title: 'Access Point, Modem & Repeater Roles',
        thaiTitle: 'บทบาทของ Access Point, โมเด็ม และตัวทวนสัญญาณ (Repeater)',
        pdfPage: 15,
        content: `Beyond the primary forwarding devices, auxiliary devices handle medium translation and range extension:\n\n- **Access Point (AP):** Bridges wireless 802.11 clients directly into the wired Ethernet LAN. It operates as a **Layer 2 bridge**, keeping all devices within the same local IP subnet.\n- **Modem (Modulator / Demodulator):** Converts continuous provider signals (analog audio, optical light, or coaxial RF) into discrete digital signals suitable for local computer hardware.\n- **Repeater:** Amplifies and regenerates attenuated signals across long cable or wireless distances before signal degradation leads to bit errors.`,
        bulletPoints: [
          'Access Point = Layer 2 bridge (Ethernet IN → Wi-Fi OUT, same subnet).',
          'Modem = Converts analog/fiber provider media into digital computer signals.',
          'Repeater = Overcomes distance attenuation by regenerating clean signal pulses.'
        ],
        thaiCommentary: 'Access Point ไม่ใช่เราเตอร์ แต่เป็นสะพานเชื่อมสัญญาณไร้สายเข้ามาในวงสายแลนเดิม; โมเด็มทำหน้าที่แปลงสัญญาณคลื่นของผู้ให้บริการเป็นดิจิทัล'
      }
    ]
  },
  {
    id: 'w5-m3',
    weekId: 'week5',
    moduleNumber: 3,
    title: 'Wired Media: Twisted-Pair, RJ45 Pinouts & Cabling Standards',
    thaiTitle: 'สื่อนำสัญญาณแบบมีสาย: สายคู่บิดเกลียว, มาตรฐานหัว RJ45 และประเภทสายสัญญาณ',
    description: 'Explore why twisted pair cables cancel noise, compare T568A vs T568B pinouts, and learn Straight-Through vs Crossover applications.',
    pdfPageStart: 22,
    pdfPageEnd: 36,
    subsections: [
      {
        id: 'w5-m3-s1',
        title: 'Twisted-Pair Physics & Differential Signaling',
        thaiTitle: 'ฟิสิกส์เบื้องหลังสายคู่บิดเกลียว และการหักล้างสัญญาณรบกวน',
        pdfPage: 32,
        content: `Copper cabling is susceptible to Electromagnetic Interference (EMI) from power lines, fluorescent lights, and motors.\n\n### Why Twisting Works:\n1. **Positions Alternate:** Each wire in the pair moves closer to and farther from the noise source in equal intervals.\n2. **Noise Becomes Common:** External electromagnetic interference induces identical noise voltages onto both wires.\n3. **The Receiver Subtracts:** The receiving hardware reads the voltage difference ($V_1 - V_2$) rather than absolute voltage to ground. Because common-mode noise is equal on both wires, it cancels out completely:\n$$\\text{Signal}_{\\text{final}} = (S + N) - (-S + N) = 2S$$\n\n### Shielding Classifications:\n- **UTP (Unshielded Twisted Pair):** Standard office use, relies solely on twisting.\n- **FTP (Foil Twisted Pair):** Foil shield wraps around pairs.\n- **STP (Shielded Twisted Pair):** Braided metal screen providing heavy shielding against harsh industrial noise.`,
        bulletPoints: [
          'Twisting ensures equal exposure to interference on both conductors.',
          'Differential receiver subtracts the pair, cancelling out common-mode noise.',
          'Shielding abbreviations: U = Unshielded, F = Foil, S = Screen/Braid, TP = Twisted Pair.'
        ],
        thaiCommentary: 'การบิดเกลียวทำให้สัญญาณรบกวนตกลงบนสายทั้งสองเส้นเท่ากัน เมื่อตัวรับนำสัญญาณมาลบกัน สัญญาณรบกวนจึงหักล้างกันไปเอง'
      },
      {
        id: 'w5-m3-s2',
        title: 'T568A vs. T568B Wiring Standards & Cable Types',
        thaiTitle: 'มาตรฐาน T568A vs T568B และการเลือกระหว่าง Straight-Through กับ Crossover',
        pdfPage: 27,
        infographicId: 'infographic-w5-cabling',
        content: `Ethernet twisted-pair cables terminate in 8-pin **RJ45 (8P8C)** connectors following either T568A or T568B pin color sequences:\n\n### The Core Color Pinouts:\n- **T568A:** Pin 1: White/Green, Pin 2: Green, Pin 3: White/Orange, Pin 4: Blue, Pin 5: White/Blue, Pin 6: Orange, Pin 7: White/Brown, Pin 8: Brown.\n- **T568B:** Pin 1: White/Orange, Pin 2: Orange, Pin 3: White/Green, Pin 4: Blue, Pin 5: White/Blue, Pin 6: Green, Pin 7: White/Brown, Pin 8: Brown.\n- **The Key Swap:** Pins 1 & 2 swap with Pins 3 & 6 (Green pair swaps with Orange pair). Pins 4, 5 (Blue) and 7, 8 (Brown) remain completely untouched!\n\n### Cable Construction Types:\n- **Straight-Through Cable:** Same standard on both ends (T568B ➔ T568B). Connects **UNLIKE devices** (e.g., Computer to Switch, Switch to Router).\n- **Crossover Cable:** Different standards on ends (T568A ➔ T568B). Connects **LIKE devices** directly without a switch (e.g., Computer to Computer, Switch to Switch, Router to Router).\n\n*(Note: Modern hardware supports **Auto-MDIX**, automatically detecting pair transceivers).*`,
        bulletPoints: [
          'T568A vs T568B difference: Green and Orange pairs swap positions (Pins 1-2 vs Pins 3 & 6).',
          'Straight-through = Unlike devices (PC to Switch); Crossover = Like devices (PC to PC).',
          'RJ11 (telephone, 4-6 pins) is smaller and incompatible with RJ45 (computer network, 8 pins).'
        ],
        thaiCommentary: 'จำสูตรง่ายๆ: T568A ขึ้นต้นด้วยเขียว (1-2), T568B ขึ้นต้นด้วยส้ม (1-2); สายตรงต่ออุปกรณ์ต่างชนิดกัน, สายไขว้ต่ออุปกรณ์ชนิดเดียวกัน',
        memoryTip: 'Straight-Through = Unlike devices; Crossover = Like devices (PC-PC, Switch-Switch).'
      },
      {
        id: 'w5-m3-s3',
        title: 'Ethernet Cable Categories & Performance Ladder',
        thaiTitle: 'ลำดับขั้นมาตรฐานสายแลน (Cat 3 ถึง Cat 8)',
        pdfPage: 34,
        content: `Ethernet twisted-pair cables are rated into categories based on maximum operating frequency (MHz) and data bandwidth:\n\n- **Cat 3 (16 MHz):** Legacy 10BASE-T (10 Mbps).\n- **Cat 5 (100 MHz):** 100BASE-TX Fast Ethernet (100 Mbps).\n- **Cat 5e (100 MHz):** Enhanced for Gigabit Ethernet (1000BASE-T / 2.5G).\n- **Cat 6 (250 MHz):** Gigabit Ethernet up to 100m, supports 10 Gbps up to 55m.\n- **Cat 6A (500 MHz):** Augmented Cat 6, supports full 10 Gbps up to 100m.\n- **Cat 7 / 7A (600 MHz – 1 GHz):** Individually shielded pairs, proprietary connectors.\n- **Cat 8 (2 GHz):** 25 Gbps / 40 Gbps over short datacenter runs (up to 30m).`,
        bulletPoints: [
          'Cat 5e is the historical baseline for Gigabit LANs.',
          'Cat 6 / 6A is standard for modern 10G enterprise installations.',
          'Higher category = Higher frequency bandwidth + tighter pair twists + better shielding.'
        ],
        thaiCommentary: 'สาย Cat ยิ่งสูง ตัวนำทองแดงยิ่งหนา เกลียวบิดยิ่งแน่น ความถี่สูงขึ้น รองรับความเร็วระดับ 10G ถึง 40G'
      }
    ]
  },
  {
    id: 'w5-m4',
    weekId: 'week5',
    moduleNumber: 4,
    title: 'Fiber Optic Networking: Principles, Modes & Connectors',
    thaiTitle: 'ระบบเครือข่ายใยแก้วนำแสง (Fiber Optic): หลักการ, Single-mode vs Multi-mode',
    description: 'Understand total internal reflection, compare single-mode and multi-mode fiber characteristics, and identify optical connectors.',
    pdfPageStart: 37,
    pdfPageEnd: 42,
    subsections: [
      {
        id: 'w5-m4-s1',
        title: 'Fiber Anatomy & Total Internal Reflection',
        thaiTitle: 'โครงสร้างกายวิภาคของเส้นใยแก้ว และการสะท้อนกลับหมด',
        pdfPage: 39,
        content: `Fiber optic cables transmit binary data using modulated pulses of light rather than electrical currents.\n\n### The 4 Concentric Layers:\n1. **Core:** Ultra-pure silica glass or plastic center through which light travels.\n2. **Cladding:** Outer glass layer with a **lower refractive index** ($n_{\\text{cladding}} < n_{\\text{core}}$), creating **Total Internal Reflection** so light rays cannot escape the core.\n3. **Buffer:** Protective plastic coating shielding the fragile glass strand from moisture and mechanical stress.\n4. **Outer Jacket:** Heavy outer PVC or Kevlar armor for tensile pulling strength.\n\n### Major Advantages over Copper:\n- **Immune to EMI/RFI:** Unaffected by power cables, radio towers, or lightning.\n- **Tremendous Distance:** Signals travel tens of kilometers without repeaters.\n- **High Security:** Extremely difficult to tap without breaking the glass and triggering an alarm.`,
        bulletPoints: [
          'Light stays trapped in the core via Total Internal Reflection at the cladding boundary.',
          'Zero electromagnetic interference and virtually limitless bandwidth potential.',
          'Conversion chain: Electrical data ➔ Light pulse (Transmitter) ➔ Optical fiber ➔ Photo detector (Receiver).'
        ],
        thaiCommentary: 'แสงจะสะท้อนกลับหมดอยู่ภายในแกนแก้ว (Core) เพราะเปลือกหุ้ม (Cladding) มีค่าดัชนีหักเหของแสงต่ำกว่า ทำให้ไม่มีสัญญาณรั่วไหลและกันสัญญาณรบกวนได้ 100%'
      },
      {
        id: 'w5-m4-s2',
        title: 'Single-Mode vs. Multi-Mode Fiber Comparison',
        thaiTitle: 'การเปรียบเทียบ Single-Mode vs. Multi-Mode Fiber',
        pdfPage: 41,
        content: `Fiber cables are divided into two fundamental operational modes:\n\n### 1. Single-Mode Fiber (SMF)\n- **Core Diameter:** Extremely narrow (approximately **9 µm**).\n- **Light Paths:** Exactly **ONE** straight light path, eliminating modal dispersion.\n- **Light Source:** High-powered **Laser Diodes**.\n- **Distance:** Long-distance telecommunications, undersea cables, inter-city links (**10 km to 100+ km**).\n- **Cost:** More expensive optical transceivers due to precision lasers.\n\n### 2. Multi-Mode Fiber (MMF)\n- **Core Diameter:** Wide (**50 µm or 62.5 µm**).\n- **Light Paths:** **Multiple light rays** reflecting at different angles (step-index or graded-index).\n- **Light Source:** Less expensive **LEDs or VCSELs**.\n- **Distance:** Local campus and datacenter backbones (**up to 550m – 2 km**).\n- **Limitation:** Modal dispersion (different rays arrive at slightly different times, blurring signals over long runs).`,
        bulletPoints: [
          'Single-mode = 9 µm narrow core, 1 path, laser, long distance (>10 km).',
          'Multi-mode = 50/62.5 µm wide core, multiple paths, LED, short distance (<2 km).',
          'Common connectors: FC (screw-on), LC (snap-on RJ45 style), SC (snap-on square), ST (twist-on bayonet).'
        ],
        thaiCommentary: 'จำง่ายๆ: Single-mode รูเล็กเท่าเส้นผม ยิงเลเซอร์เส้นเดียว วิ่งข้ามจังหวัด; Multi-mode รูใหญ่ แสงสะท้อนไปมา ใช้ LED วิ่งในตึก'
      }
    ]
  },
  {
    id: 'w5-m5',
    weekId: 'week5',
    moduleNumber: 5,
    title: 'Wireless Networks, RF Spectrum & Topologies',
    thaiTitle: 'เครือข่ายไร้สาย, คลื่นความถี่วิทยุ และโทโพโลยีเครือข่าย',
    description: 'Learn the relationship between frequency and wavelength, study cellular and satellite links, and compare network topologies.',
    pdfPageStart: 43,
    pdfPageEnd: 62,
    subsections: [
      {
        id: 'w5-m5-s1',
        title: 'Wireless Spectrum, Microwave & Satellite Orbits',
        thaiTitle: 'สเปกตรัมคลื่นวิทยุ, ไมโครเวฟภาคพื้นดิน และวงโคจรดาวเทียม',
        pdfPage: 44,
        content: `Wireless links convey data through free space using electromagnetic waves.\n\n### Frequency vs. Wavelength Rule:\n- **Lower Frequency (longer wavelength):** Better penetration through walls and terrain, but lower data carrying capacity.\n- **Higher Frequency (shorter wavelength):** Huge data bandwidth, but absorbed easily by rain, walls, and foliage.\n\n### Wireless Infrastructure Categories:\n- **Terrestrial Microwave:** Tower-to-tower **line-of-sight** transmission spaced 20–30 miles apart (~100 Mbps).\n- **Satellite Microwave:** Ground station ➔ Satellite transponder ➔ Ground station.\n  - **GEO (Geostationary Orbit):** 36,000 km altitude, fixed position above equator, high latency (~500ms round-trip).\n  - **MEO (Medium Earth Orbit):** 5,000–15,000 km (GPS, Galileo navigation).\n  - **LEO (Low Earth Orbit):** 500–1,000 km (Starlink, OneWeb: low latency, rapid orbits).\n- **Cellular Networks:** City divided into hexagonal cells, each served by a base station tower reusing frequencies.`,
        bulletPoints: [
          'High frequency = Short wavelength = High data rate, poor penetration.',
          'Wi-Fi 2.4 GHz (channels 1, 6, 11) vs 5 GHz (23 non-overlapping channels).',
          'Satellite orbits: GEO (36,000 km, stationary), LEO (500-1,000 km, low latency).'
        ],
        thaiCommentary: 'คลื่นความถี่ต่ำส่งได้ไกลทะลุกำแพงดีแต่เน็ตช้า คลื่นความถี่สูงเน็ตแรงมากแต่โดนกำแพงบังแล้วสัญญาณดรอปทันที'
      },
      {
        id: 'w5-m5-s2',
        title: 'Network Topologies & Single Point of Failure',
        thaiTitle: 'โทโพโลยีเครือข่าย: Bus, Star, Ring, Mesh, Tree',
        pdfPage: 56,
        infographicId: 'infographic-w5-topology',
        content: `A **Network Topology** describes the physical and logical arrangement of nodes and links:\n\n### 1. Bus Topology\n- Shared backbone trunk cable terminating with resistors at both ends.\n- **Fault Tolerance:** Extremely low. If the main backbone is cut, the entire network fails.\n\n### 2. Star Topology\n- All devices connect to a central switch or hub.\n- **Fault Tolerance:** Moderate. If one device cable breaks, only that device is isolated. If the central switch fails, the whole network is down (**Single Point of Failure**).\n\n### 3. Ring Topology\n- Closed circular loop where each device connects to two neighbors. Signals circulate unidirectionally.\n- **Fault Tolerance:** Moderate. A single break halts token circulation unless dual counter-rotating rings exist.\n\n### 4. Mesh Topology\n- Nodes have direct, redundant interconnecting links.\n- **Fault Tolerance:** **Highest**. Multiple alternate paths prevent any single point of failure. High cabling cost.\n\n### 5. Tree Topology\n- Hierarchical star structure (Core switch ➔ Distribution switches ➔ Workgroup switches). Ideal for multi-floor buildings.`,
        bulletPoints: [
          'Bus = Shared backbone, low cost, fragile.',
          'Star = Most common LAN topology, switch is single point of failure.',
          'Mesh = Maximum redundancy, highest fault tolerance, used in core backbones.'
        ],
        thaiCommentary: 'ออฟฟิศทั่วไปใช้ Star Topology มากที่สุดเพราะติดตั้งง่ายและสายขาดเส้นเดียวเครื่องอื่นยังทำงานได้ ส่วน Mesh นิยมในระบบที่ห้ามล่มเด็ดขาด'
      }
    ]
  },
  {
    id: 'w5-m6',
    weekId: 'week5',
    moduleNumber: 6,
    title: 'Network Scopes, Boundaries & Protection Overview',
    thaiTitle: 'ขอบเขตเครือข่าย (PAN-WAN), ขอบเขตการเข้าถึง และการป้องกันความปลอดภัย',
    description: 'Categorize networks by geographic scope and access boundaries, then review security tools in a small office architecture.',
    pdfPageStart: 51,
    pdfPageEnd: 74,
    subsections: [
      {
        id: 'w5-m6-s1',
        title: 'Geographic Scope & Access Boundaries',
        thaiTitle: 'ขอบเขตทางภูมิศาสตร์ (PAN ถึง WAN) และขอบเขตการเข้าถึง',
        pdfPage: 52,
        content: `### Geographic Classifications:\n- **PAN (Personal Area Network):** Personal space within 10 meters (Bluetooth, wireless headphones, smartwatch).\n- **LAN (Local Area Network):** Confined to a single room, floor, or building (Ethernet, office Wi-Fi).\n- **CAN (Campus Area Network):** Interconnected LANs across a university or military base.\n- **MAN (Metropolitan Area Network):** Spans an entire city or metropolitan region (cable TV networks, municipal fiber).\n- **WAN (Wide Area Network):** Countrywide or global scale interconnecting diverse networks (the Internet).\n\n### Network Access Boundaries:\n- **Intranet:** Private network restricted exclusively to authorized organization staff.\n- **Extranet:** Controlled private network granting secure access to trusted partners and suppliers.\n- **Internet:** Globally connected public system of open networks.\n- **Darknet:** Encrypted overlay network accessible only via specialized software (e.g. Tor) providing anonymity.`,
        bulletPoints: [
          'Scale ladder: PAN ➔ LAN ➔ CAN ➔ MAN ➔ WAN.',
          'Intranet = Internal employees only; Extranet = Internal + Trusted external partners.',
          'SAN (Storage Area Network) = Dedicated high-speed storage network behind servers.'
        ],
        thaiCommentary: 'ข้อสอบถามบ่อย: Intranet เข้าได้เฉพาะคนในองค์กร, Extranet ให้คู่ค้าหรือลูกค้าภายนอกเข้าถึงได้บางส่วน, Internet คือสาธารณะ'
      },
      {
        id: 'w5-m6-s2',
        title: 'Network Defense Tools & Small Office Architecture',
        thaiTitle: 'เครื่องมือความปลอดภัย และสถาปัตยกรรมเครือข่ายสำนักงานขนาดเล็ก',
        pdfPage: 65,
        content: `### Essential Network Defense Tools:\n- **Firewall:** Boundary gatekeeper filtering inbound/outbound packets based on IP, port, and protocol rules.\n- **IDS (Intrusion Detection System):** Passive sensor detecting suspicious traffic and raising alerts.\n- **IPS (Intrusion Prevention System):** Active in-line device that detects and immediately drops malicious packets.\n- **NAC (Network Access Control):** Verifies device compliance (antivirus, OS patches) before granting LAN access.\n- **Load Balancer:** Distributes incoming traffic across multiple web servers to prevent overload.\n\n### Putting It All Together: Small Office Blueprint\n$$\\text{Internet} \\rightarrow \\text{Modem} \\rightarrow \\text{Router / Firewall} \\rightarrow \\text{Core Switch} \\rightarrow \\begin{cases} \\text{Wired PCs + NAS Storage} \\\\ \\text{Access Point} \\rightarrow \\text{Wireless Laptops} \\end{cases}$$`,
        bulletPoints: [
          'Firewall controls allowed vs blocked traffic at the network perimeter.',
          'IDS warns; IPS acts and blocks.',
          'A robust small office combines modem, router/firewall, switch, NAS, and wireless AP in a structured chain.'
        ],
        thaiCommentary: 'ลำดับการเชื่อมต่อที่ถูกต้องในชีวิตจริง: อินเทอร์เน็ตเข้าโมเด็ม ➔ ผ่านเราเตอร์/ไฟร์วอลล์ ➔ เข้าสวิตช์กลาง ➔ กระจายสู่เครื่อง PC, NAS และ Access Point'
      }
    ]
  }
];

export const week5Flashcards: Flashcard[] = [
  {
    id: 'w5-fc1',
    weekId: 'week5',
    front: 'Hub vs. Switch: What is the key difference in forwarding behavior?',
    thaiFront: 'ความแตกต่างสำคัญที่สุดในการส่งต่อข้อมูลระหว่าง Hub และ Switch คืออะไร?',
    back: 'A Hub is a Layer 1 device that broadcasts incoming signals to ALL ports (one collision domain). A Switch is a Layer 2 device that learns MAC addresses and selectively forwards frames ONLY to the designated target port (isolated collision domains per port).',
    thaiBack: 'Hub ส่งกระจายสัญญาณออกทุกพอร์ต (L1) ไม่มีสมอง เกิดการชนกันของสัญญาณง่าย ส่วน Switch ส่งเจาะจงเฉพาะพอร์ตปลายทางตามตาราง MAC Address (L2) ช่วยแยก Collision Domain',
    pdfPage: 17,
    category: 'Network Devices'
  },
  {
    id: 'w5-fc2',
    weekId: 'week5',
    front: 'Why are the wires in a twisted-pair cable twisted together?',
    thaiFront: 'ทำไมสายทองแดงคู่ในสายแลนถึงต้องบิดเกลียวเข้าหากัน?',
    back: 'Twisting keeps both wires equally exposed to external electromagnetic interference. The differential receiver subtracts the signals from the two wires, causing common-mode noise to cancel out completely.',
    thaiBack: 'เพื่อให้สายทั้งสองเส้นได้รับสัญญาณรบกวนจากภายนอกเท่ากัน เมื่อตัวรับนำสัญญาณมาหักลบกัน (Differential Signaling) สัญญาณรบกวนจะหักล้างกันหมดไป เหลือแต่ข้อมูลจริง',
    pdfPage: 32,
    category: 'Transmission Media'
  },
  {
    id: 'w5-fc3',
    weekId: 'week5',
    front: 'What is the color pinout difference between T568A and T568B?',
    thaiFront: 'ความแตกต่างของสีพินระหว่างมาตรฐาน T568A และ T568B คืออะไร?',
    back: 'The Green pair and Orange pair swap positions: T568A has Green on Pins 1-2 and Orange on Pins 3 & 6. T568B has Orange on Pins 1-2 and Green on Pins 3 & 6. Pins 4-5 (Blue) and 7-8 (Brown) remain identical.',
    thaiBack: 'คู่สีเขียวกับคู่สีสลับตำแหน่งกัน: T568A ใช้เขียวที่พิน 1-2 และส้มที่ 3, 6; ส่วน T568B ใช้ส้มที่พิน 1-2 และเขียวที่ 3, 6 (คู่สีฟ้า 4-5 และน้ำตาล 7-8 เหมือนกันทั้งคู่)',
    pdfPage: 27,
    category: 'Cabling Standards'
  },
  {
    id: 'w5-fc4',
    weekId: 'week5',
    front: 'When do you use a Straight-Through cable vs. a Crossover cable?',
    thaiFront: 'เมื่อไหร่ที่ต้องใช้สาย Straight-Through และเมื่อไหร่ที่ต้องใช้สาย Crossover?',
    back: 'Straight-Through (same standard on both ends) connects UNLIKE devices (e.g. PC to Switch). Crossover (T568A on one end, T568B on the other) connects LIKE devices directly (e.g. PC to PC, Switch to Switch).',
    thaiBack: 'Straight-Through (ปลายสองข้างเรียงเหมือนกัน) ใช้ต่ออุปกรณ์ต่างชนิด เช่น PC ต่อ Switch; Crossover (ปลายข้างหนึ่งเป็น A อีกข้างเป็น B) ใช้ต่ออุปกรณ์ชนิดเดียวกัน เช่น PC ต่อ PC',
    pdfPage: 28,
    category: 'Cabling Standards'
  },
  {
    id: 'w5-fc5',
    weekId: 'week5',
    front: 'Single-Mode vs. Multi-Mode Fiber: Which is used for long distances and why?',
    thaiFront: 'Single-Mode กับ Multi-Mode Fiber: ชนิดไหนใช้ส่งระยะทางไกล และเพราะเหตุใด?',
    back: 'Single-Mode Fiber is used for long distances (>10 km). It has an ultra-narrow 9 µm core allowing only ONE straight light ray from a laser, completely eliminating modal dispersion.',
    thaiBack: 'Single-Mode ใช้สำหรับระยะไกล (>10 กม.) เพราะแกนแก้วมีขนาดเล็กมาก (9 ไมครอน) ทำให้แสงเลเซอร์เดินทางเป็นเส้นตรงเส้นเดียว ไม่มีปัญหาการสะท้อนหักเหเหลื่อมเวลากัน (Modal Dispersion)',
    pdfPage: 41,
    category: 'Transmission Media'
  },
  {
    id: 'w5-fc6',
    weekId: 'week5',
    front: 'What happens to a Bus topology if the central backbone cable is severed?',
    thaiFront: 'จะเกิดอะไรขึ้นกับโครงสร้างแบบ Bus หากสายเคเบิลหลัก (Backbone) ขาด?',
    back: 'The entire network collapses immediately. The missing termination causes signal reflections, corrupting communication for all connected devices.',
    thaiBack: 'เครือข่ายทั้งหมดจะล่มทันทีและไม่สามารถสื่อสารกันได้เลย เพราะสัญญาณจะสะท้อนกลับและรบกวนกันหมดเนื่องจากขาดตัวต้านทานปิดหัวท้าย (Terminator)',
    pdfPage: 57,
    category: 'Topologies'
  },
  {
    id: 'w5-fc7',
    weekId: 'week5',
    front: 'What is the trade-off between wireless frequency and transmission distance?',
    thaiFront: 'Trade-off ระหว่างความถี่คลื่นไร้สายกับระยะทางการส่งสัญญาณคืออะไร?',
    back: 'Higher frequency (e.g. 5 GHz) offers higher data throughput but suffers from shorter range and poor obstacle penetration. Lower frequency (e.g. 2.4 GHz) penetrates walls better and covers larger distances at lower speeds.',
    thaiBack: 'ความถี่สูง (เช่น 5 GHz) ให้ความเร็วเน็ตสูงมากแต่ระยะทางสั้นและทะลุกำแพงได้แย่ ส่วนความถี่ต่ำ (เช่น 2.4 GHz) ส่งได้ไกลและทะลุกำแพงดีกว่าแต่ความเร็วต่ำกว่า',
    pdfPage: 45,
    category: 'Wireless Communication'
  },
  {
    id: 'w5-fc8',
    weekId: 'week5',
    front: 'What is the difference between an Intranet, an Extranet, and the Internet?',
    thaiFront: 'ความแตกต่างระหว่าง Intranet, Extranet และ Internet คืออะไร?',
    back: 'Intranet is strictly private to internal organization employees. Extranet allows controlled access to trusted external business partners/suppliers. The Internet is the publicly accessible global network.',
    thaiBack: 'Intranet เข้าถึงได้เฉพาะพนักงานภายในองค์กร; Extranet ให้คู่ค้าหรือลูกค้าภายนอกที่ได้รับอนุญาตเข้าถึงได้บางส่วน; Internet เป็นเครือข่ายสาธารณะที่ทุกคนเข้าถึงได้ทั่วโลก',
    pdfPage: 54,
    category: 'Network Types'
  }
];

export const week5Quizzes: QuizQuestion[] = [
  {
    id: 'w5-q1',
    weekId: 'week5',
    pdfPage: 17,
    topic: 'Network Devices',
    question: 'A network technician replaces a legacy Hub with a modern Layer 2 Switch. What immediate architectural advantage is gained?',
    thaiContext: 'ช่างเทคนิคเปลี่ยนจาก Hub รุ่นเก่าเป็น Layer 2 Switch สิ่งที่จะได้เปรียบทางสถาปัตยกรรมทันทีคืออะไร?',
    options: [
      {
        text: 'The network switches from digital signals to analog radio frequency modulation.',
        isCorrect: false,
        explanation: 'Both hubs and switches handle digital baseband signals; modulation is performed by modems.'
      },
      {
        text: 'Each connected device receives an isolated collision domain, allowing simultaneous full-duplex communication without frame collisions.',
        isCorrect: true,
        explanation: 'Switches inspect destination MAC addresses and forward frames selectively, isolating collision domains to individual ports.'
      },
      {
        text: 'The switch automatically assigns public IP addresses using longest prefix match routing.',
        isCorrect: false,
        explanation: 'IP address assignment and routing are Layer 3 (Router/DHCP) responsibilities, not Layer 2 switch forwarding.'
      },
      {
        text: 'The switch broadcasts every incoming electrical signal out to all other ports.',
        isCorrect: false,
        explanation: 'Broadcasting to all ports is the inefficient behavior of a Layer 1 Hub, not an intelligent switch.'
      }
    ]
  },
  {
    id: 'w5-q2',
    weekId: 'week5',
    pdfPage: 27,
    topic: 'Cabling Standards',
    question: 'When comparing RJ45 T568A and T568B wiring standards, which pairs of pins swap color positions?',
    thaiContext: 'เมื่อเปรียบเทียบมาตรฐานการเข้าหัวแลน RJ45 ระหว่าง T568A และ T568B พินคู่สีใดที่มีการสลับตำแหน่งกัน?',
    options: [
      {
        text: 'Pins 1–2 (Green pair in A, Orange pair in B) swap with Pins 3 & 6 (Orange pair in A, Green pair in B).',
        isCorrect: true,
        explanation: 'Correct! Pins 1-2 and 3 & 6 swap green and orange pairs. Pins 4-5 (Blue) and 7-8 (Brown) remain unchanged in both standards.'
      },
      {
        text: 'Pins 4–5 (Blue pair) swap with Pins 7–8 (Brown pair).',
        isCorrect: false,
        explanation: 'The blue and brown pairs stay at pins 4-5 and 7-8 in both T568A and T568B.'
      },
      {
        text: 'All 8 pins are reversed in reverse numerical order from 8 down to 1.',
        isCorrect: false,
        explanation: 'This is a rollover cable used for console connections, not the standard T568A/B pair swap.'
      },
      {
        text: 'Pins 1–4 swap with Pins 5–8.',
        isCorrect: false,
        explanation: 'Only the green and orange pairs (Pins 1, 2, 3, and 6) swap positions.'
      }
    ]
  },
  {
    id: 'w5-q3',
    weekId: 'week5',
    pdfPage: 28,
    topic: 'Cable Types',
    question: 'In traditional networking before Auto-MDIX, what type of cable was required to connect two desktop computers directly to each other without a switch?',
    thaiContext: 'ในยุคก่อนที่จะมีระบบ Auto-MDIX หากต้องการต่อคอมพิวเตอร์สองเครื่องเข้าหากันโดยตรงโดยไม่ผ่านสวิตช์ ต้องใช้สายแลนประเภทใด?',
    options: [
      {
        text: 'A Straight-Through cable with T568B on both ends.',
        isCorrect: false,
        explanation: 'A straight-through cable connects unlike devices (e.g. PC to switch). Directly connecting two PCs requires transmit pins to cross into receive pins.'
      },
      {
        text: 'A Crossover cable with T568A on one end and T568B on the opposite end.',
        isCorrect: true,
        explanation: 'Crossover cables cross Tx pins (1 & 2) to Rx pins (3 & 6) so two like devices (PC to PC or switch to switch) can communicate.'
      },
      {
        text: 'A Single-Mode Fiber Optic patch cord with SC screw connectors.',
        isCorrect: false,
        explanation: 'Desktop NICs typically use twisted-pair copper with RJ45 connectors, not fiber.'
      },
      {
        text: 'An RJ11 4-wire telephone cable.',
        isCorrect: false,
        explanation: 'RJ11 is for analog telephone systems, not Ethernet networking.'
      }
    ]
  },
  {
    id: 'w5-q4',
    weekId: 'week5',
    pdfPage: 41,
    topic: 'Fiber Optics',
    question: 'Why is Single-Mode Fiber (SMF) selected over Multi-Mode Fiber (MMF) for long-distance telecommunications (>10 km)?',
    thaiContext: 'ทำไมระบบสื่อสารโทรคมนาคมระยะไกล (>10 กม.) จึงเลือกใช้สายใยแก้วนำแสงแบบ Single-Mode มากกว่า Multi-Mode?',
    options: [
      {
        text: 'Single-mode fiber uses copper shielding to prevent radio waves from leaking.',
        isCorrect: false,
        explanation: 'Fiber cables contain glass/silica cores, not copper.'
      },
      {
        text: 'Its ultra-thin 9 µm core allows only a single laser light path, preventing modal dispersion.',
        isCorrect: true,
        explanation: 'By permitting only one mode of light propagation, different rays cannot reflect at different angles or blur the signal over distance.'
      },
      {
        text: 'Multi-mode fiber core is too narrow for laser light to pass through.',
        isCorrect: false,
        explanation: 'Multi-mode fiber has a wider core (50-62.5 µm), which allows multiple light paths causing modal dispersion.'
      },
      {
        text: 'Single-mode fiber requires zero cladding around its core.',
        isCorrect: false,
        explanation: 'All fiber requires cladding to create total internal reflection.'
      }
    ]
  },
  {
    id: 'w5-q5',
    weekId: 'week5',
    pdfPage: 57,
    topic: 'Topologies',
    question: 'In an enterprise Star network topology, what is the primary risk regarding a Single Point of Failure?',
    thaiContext: 'ในโครงสร้างเครือข่ายแบบ Star Topology ความเสี่ยงหลักเกี่ยวกับจุดล้มเหลวเดี่ยว (Single Point of Failure) คืออะไร?',
    options: [
      {
        text: 'If any single employee unplugs their laptop, the entire office loses connection.',
        isCorrect: false,
        explanation: 'In a star topology, if one client cable fails, only that single workstation is isolated.'
      },
      {
        text: 'If the central switch fails, all connected devices lose communication with each other.',
        isCorrect: true,
        explanation: 'Because all traffic must pass through the central switch, the switch is the single point of failure for the star.'
      },
      {
        text: 'Signals bounce back and forth indefinitely because star topologies lack terminators.',
        isCorrect: false,
        explanation: 'Signal bounce on an unterminated backbone is a characteristic of Bus topology, not Star.'
      },
      {
        text: 'Every computer must stay powered on to relay tokens to the next neighbor.',
        isCorrect: false,
        explanation: 'Token passing is characteristic of Ring topology, not Star.'
      }
    ]
  },
  {
    id: 'w5-q6',
    weekId: 'week5',
    pdfPage: 11,
    topic: 'Network Layer',
    question: 'How does a Router determine where to forward an incoming IP packet destined for an external network?',
    thaiContext: 'เราเตอร์มีวิธีการตัดสินใจอย่างไรว่าจะส่งต่อแพ็กเก็ต IP ไปยังเส้นทางใด?',
    options: [
      {
        text: 'It repeats the packet to every port like an electrical repeater.',
        isCorrect: false,
        explanation: 'Repeating without checking addresses is what a Layer 1 Hub does.'
      },
      {
        text: 'It inspects the destination IP address and selects the best matching route from its Routing Table using Longest Prefix Match.',
        isCorrect: true,
        explanation: 'Routers evaluate destination IP addresses against prefix entries in their routing table; the most specific matching prefix wins.'
      },
      {
        text: 'It looks up the hardware serial number of the monitor attached to the destination.',
        isCorrect: false,
        explanation: 'Monitor hardware serial numbers are completely irrelevant to IP network routing.'
      },
      {
        text: 'It strips all headers and converts the packet into an analog telephone signal.',
        isCorrect: false,
        explanation: 'Routers forward IP packets across network interfaces without stripping layer 3 data.'
      }
    ]
  },
  {
    id: 'w5-q7',
    weekId: 'week5',
    pdfPage: 54,
    topic: 'Network Boundaries',
    question: 'An automobile manufacturer allows certified parts suppliers to access its inventory system through an encrypted portal. This network setup is best classified as an:',
    thaiContext: 'บริษัทผลิตรถยนต์เปิดให้คู่ค้าผู้ผลิตชิ้นส่วนสามารถเข้าถึงระบบคลังสินค้าได้ผ่านพอร์ทัลที่มีการเข้ารหัส เครือข่ายลักษณะนี้จัดเป็นประเภทใด?',
    options: [
      {
        text: 'Intranet',
        isCorrect: false,
        explanation: 'An intranet is restricted exclusively to internal organization employees.'
      },
      {
        text: 'Extranet',
        isCorrect: true,
        explanation: 'An Extranet extends private organization resources securely to trusted external partners, suppliers, and vendors.'
      },
      {
        text: 'Darknet',
        isCorrect: false,
        explanation: 'A Darknet is an anonymous network requiring specialized routing software like Tor.'
      },
      {
        text: 'Personal Area Network (PAN)',
        isCorrect: false,
        explanation: 'A PAN is short-range personal device connectivity (e.g. Bluetooth).'
      }
    ]
  }
];
