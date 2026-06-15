'use client'

import { ScrollReveal } from '@/components/ScrollReveal'
import { TypewriterText } from '@/components/TypewriterText'

export function HeroSection() {
  return (
    <section className="relative px-6 pt-28 pb-16 sm:px-12">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="pb-14 lg:pb-20">
          <ScrollReveal>
            <p className="mb-8 font-display text-[11px] uppercase tracking-[0.36em] text-text-muted">
              Reading archive / selected notes
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <TypewriterText className="text-[clamp(2.5rem,10vw,10rem)] font-light uppercase leading-[0.85] tracking-normal text-text-primary" />
          </ScrollReveal>

          <ScrollReveal delay={0.36}>
            <div className="mt-12 grid max-w-3xl grid-cols-1 gap-8 border-t border-border-subtle pt-6 sm:grid-cols-[0.65fr_1fr]">
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-accent-rust">
                Notes on attention, skill, and durable work.
              </p>
              <p className="font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                A small collection of book studies arranged like project records:
                each one is a way of looking, practicing, and building.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
