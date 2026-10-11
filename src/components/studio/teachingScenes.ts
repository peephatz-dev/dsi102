import { StudyModule, StudySubsection } from '../../types/course';
export function getTeachingScenes(module:StudyModule,sub:StudySubsection):string[]{
 const t=sub.title.toLowerCase();
 const rules:[RegExp,string[]][]=[
 [/emat/,['emat','w3-m6']], [/pcb|context switch/,['context','w3-m4']], [/snapshot|cloning|migration/,['snapshot','w4-m2']],
 [/ipv4-compatible|mapped notation/,['ipv6']], [/ipv6/,['ipv6','w6-m4']], [/troubleshooting/,['diagnose']],
 [/mfa/,['mfa','w7-m7']], [/recovery objectives/,['recovery','w7-m6']], [/raid|dlp/,['raid','w7-m6']],
 [/password reuse/,['reuse','mfa']], [/dos vs ddos/,['capacity']], [/spoofing|session misuse/,['session','w8-m5']],
 [/xss|csrf/,['webSafety']], [/secure lifecycle/,['lifecycle']], [/authentication vs authorization/,['w7-m5','mfa']],
 [/acl and encryption/,['w7-m5','w8-m5']], [/iam/,['w7-m5','w7-m8']], [/vpn/,['w8-m5','w7-m3']],
 [/attack surface|insiders/,['w7-m1','w7-m5']], [/virus|worm|trojan|spyware|keylogger|botnet/,['w8-m3']],
 [/backup/,['w7-m6']], [/email security|phishing|trusted verification|persuasion|awareness/,['w8-m4','mfa']],
 [/sql injection/,['w8-m6']], [/broken access control/,['w7-m5']], [/defense and response|incident triage|security lifecycle|coordinated|benefits and challenges/,['w8-m8','w7-m1']],
 [/anti-malware/,['w8-m3','w7-m4']], [/host and mobile/,['w7-m4','w7-m3']],
 [/shared responsibility|responsibility gradient/,['w4-m4']], [/virtual machines vs containers/,['w4-m5']],
 [/cpu.*instruction|instruction machine/,['w2-m2']], [/architectural comparison/,['w2-m3']], [/sram|dram|volatility/,['volatility','w2-m4']],
 [/priority scheduling/,['w3-m5','aging']], [/round robin|fcfs/,['w3-m5']], [/dma|interrupt|polling|trap/,['w3-m2']],
 [/spooling|buffering|caching/,['w3-m3']], [/paging|tlb/,['w3-m6','emat']],
 [/differential|twisted-pair physics/,['differential','w5-m3']], [/t568|cable types/,['w5-m3']], [/cable categories/,['w5-m3','week5-extra-1']],
 [/fiber anatomy|single-mode|multi-mode/,['w5-m4']], [/wireless spectrum|microwave|satellite|cellular/,['week5-extra-2','week5-extra-1']],
 [/sensor networks/,['week5-extra-2','w1-m3']], [/san|logical networks/,['week5-extra-2']], [/topolog/,['w5-m5']],
 [/access point|modem|repeater/,['week5-extra-1','w5-m2']], [/hub.*switch.*router/,['w5-m2']], [/geographic|access boundaries/,['w5-m6','w7-m3']],
 [/defense tools|office architecture/,['w5-m2','w7-m1']], [/coaxial|rj11|rj45|shielding|network links/,['week5-extra-1','w5-m3']],
 [/tcp.*handshake|udp characteristics/,['w6-m5']], [/icmp|ping|traceroute/,['week6-extra-2','diagnose']],
 [/dns name/,['w6-m6']], [/mac.*ip.*port/,['week6-extra-3']], [/https|open a website/,['w6-m6','w6-m2']],
 [/ipv4.*header|ipv6.*header/,['week6-extra-2','ipv6']], [/cidr|subnet|classful|ipv4 structure/,['w6-m4']],
 [/tcp\/ip mapping|encapsulation|data units|osi|layer|transport|presentation|session|data link|physical signals/,['w6-m2','diagnose']],
 [/cloud characteristics|scalability|elasticity|virtualization !=/,['w4-m3','w4-m4']],
 [/analog|continuous|discrete/,['w1-m2','week5-extra-1']], [/binary|ascii/,['w1-m2']],
 [/building blocks/,['w1-m1','w1-m3','w6-m6']], [/cia/,['w1-m5','w8-m5','capacity']],
 ];
 // Lesson-specific matches precede broad layering terms (platform stacks are not TCP/IP layers).
 if(module.weekId==='week2'&&/stack|abstraction|platform.*hardware|evolution/.test(t))return ['w2-m1','w2-m6'];
 for(const[pattern,ids]of rules)if(pattern.test(t))return ids;
 return [module.id];
}
