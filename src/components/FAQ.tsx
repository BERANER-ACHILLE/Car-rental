import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types';
import { FAQS, TRANSLATIONS } from '../data';

interface FAQProps {
  currentLang: Language;
}

export default function FAQ({ currentLang }: FAQProps) {
  const t = TRANSLATIONS[currentLang];
  const [openId, setOpenId] = useState<string | null>('license');

  const toggleAccordion = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section id="faqs" className="py-20 bg-white dark:bg-slate-950 border-t border-gray-150 dark:border-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="faq-section-header">
          <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-2.5 font-mono">
            ★ QUESTIONS & RÉPONSES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight uppercase leading-none">
            {t.faqTitle}
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-50/50 dark:bg-slate-900/40 border-blue-600 dark:border-yellow-400 shadow-md' 
                    : 'bg-white dark:bg-slate-900/20 border-gray-150 dark:border-slate-800/80 hover:border-gray-250 dark:hover:border-slate-700 hover:shadow-xs'
                }`}
                id={`faq-item-${faq.id}`}
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex justify-between items-center p-5 sm:p-6 text-left font-bold text-gray-900 dark:text-white text-sm sm:text-base cursor-pointer select-none"
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="font-sans font-extrabold leading-snug pr-4 text-gray-850 dark:text-gray-200">
                    {currentLang === 'en' ? faq.question : faq.questionFr}
                  </span>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                    isOpen 
                      ? 'bg-blue-100 dark:bg-yellow-400/20 text-blue-600 dark:text-yellow-400' 
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-500'
                  }`}>
                    {isOpen ? (
                      <span className="font-black text-lg shrink-0">−</span>
                    ) : (
                      <span className="font-black text-lg shrink-0">+</span>
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div 
                    className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-550 dark:text-gray-400 leading-relaxed font-medium border-t border-gray-50 dark:border-slate-855"
                    id={`faq-answer-${faq.id}`}
                  >
                    {currentLang === 'en' ? faq.answer : faq.answerFr}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
