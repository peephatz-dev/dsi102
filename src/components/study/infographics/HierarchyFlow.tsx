import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Cpu, Globe, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const HierarchyFlow: React.FC = React.memo(() => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'tool',
      title: 'Technology',
      thaiTitle: 'เครื่องมือ (Tool)',
      subtitle: 'The Broadest Umbrella',
      icon: Wrench,
      color: ' ',
      badge: 'Level 1: Tool',
      definition: 'The practical application of scientific knowledge to solve human problems.',
      thaiDetail: 'เครื่องมือหรือวิธีการใดๆ ที่มนุษย์สร้างขึ้นเพื่อทุ่นแรง ไม่จำเป็นต้องมีวงจรอิเล็กทรอนิกส์',
      examples: ['Paper notebook', 'Mechanical wind-up clock', 'Abacus / Hand calculator', 'Lever & Wheel'],
      keyRule: 'Technology = Any practical tool created to solve a problem.'
    },
    {
      id: 'system',
      title: 'Digital Technology',
      thaiTitle: 'ระบบดิจิทัล (System)',
      subtitle: 'Electronic & Binary',
      icon: Cpu,
      color: ' ',
      badge: 'Level 2: System',
      definition: 'Electronic systems processing information using discrete binary values (0 and 1).',
      thaiDetail: 'ระบบฮาร์ดแวร์และซอฟต์แวร์อิเล็กทรอนิกส์ที่ประมวลผล จัดเก็บ ส่งข้อมูลด้วยเลขฐานสอง 0 และ 1',
      examples: ['Personal Computer', 'Smartphone', 'Relational Database', 'Solid State Drive'],
      keyRule: 'Digital Technology = Electronic systems running on binary discrete data.'
    },
    {
      id: 'service',
      title: 'Digital Service',
      thaiTitle: 'บริการดิจิทัล (Value)',
      subtitle: 'Connected End-User Value',
      icon: Globe,
      color: ' ',
      badge: 'Level 3: Service',
      definition: 'Value delivered directly to end users over connected applications, networks, and databases.',
      thaiDetail: 'การส่งมอบคุณค่าที่จับต้องได้ให้ผู้ใช้ผ่านระบบเครือข่าย ไม่ใช่แค่ตัวแอป แต่คือผลลัพธ์ที่ได้รับ',
      examples: ['Grab Ride-Hailing', 'Online Mobile Banking', 'E-Commerce Platform', 'Canva Design Cloud'],
      keyRule: 'Digital Service = Connected delivery of value to people.'
    }
  ];

  const current = steps[activeStep];
  const IconComponent = current.icon;

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Interactive Architecture</span>
          </div>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">The Digital Continuum: Tool → System → Service</h4>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)]">
          {steps.map((step, idx) => (
            <Button variant="ghost"
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeStep === idx
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none'
                  : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{step.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Pipeline Progress Bar */}
      <div className="my-5 grid grid-cols-3 gap-3">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`group relative flex cursor-pointer flex-col rounded-xl border p-3.5 transition-all ${
                isActive
                  ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] shadow-none ring-1 ring-[var(--border-strong)]'
                  : isPassed
                  ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] hover:border-[var(--border-strong)]'
                  : 'border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-mono font-medium ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                  STAGE 0{idx + 1}
                </span>
                {isPassed && <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-muted)] ${step.color} text-[var(--accent-foreground)] shadow-none`}>
                  <StepIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{step.title}</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">{step.thaiTitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Details Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] ${current.color} text-[var(--accent-foreground)] shadow-none`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[var(--surface)] border border-[var(--border-strong)] px-2 py-0.5 text-[10px] font-medium text-[var(--foreground)]">
                    {current.badge}
                  </span>
                  <span className="text-xs text-[var(--accent)] font-medium">{current.subtitle}</span>
                </div>
                <h5 className="mt-1 text-base font-medium text-[var(--foreground)]">{current.title} — {current.thaiTitle}</h5>
                <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)]">{current.definition}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)] italic">คำอธิบายไทย: {current.thaiDetail}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-[var(--border-strong)] pt-4">
            <div>
              <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Real-World Examples</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {current.examples.map((ex, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)] font-medium shadow-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {ex}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Exam Memorization Rule</p>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 text-xs text-[var(--accent)]">
                <Sparkles className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span className="font-medium">{current.keyRule}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span>Click stages to explore the progression</span>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-secondary)]">
          <span>Tool</span>
          <ArrowRight className="h-3 w-3 text-[var(--text-secondary)]" />
          <span>System</span>
          <ArrowRight className="h-3 w-3 text-[var(--text-secondary)]" />
          <span>Service</span>
        </div>
      </div>
    </div>
  );
});
