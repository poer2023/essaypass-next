'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EssayForm from "@/components/EssayForm";
import OrderConfirmation from "@/components/OrderConfirmation";
import { Lang, EssayFormData } from "@/lib/types";

type ViewState = 'form' | 'confirmation';

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [view, setView] = useState<ViewState>('form');
  const [formData, setFormData] = useState<EssayFormData | null>(null);

  const handleFormSubmit = (data: EssayFormData) => {
    setFormData(data);
    setView('confirmation');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setView('form');
  };

  const handlePay = () => {
    // TODO: Integrate payment
    alert(lang === 'zh' ? '支付功能即将上线！' : 'Payment integration coming soon!');
  };

  return (
    <>
      <Header lang={lang} onLangChange={setLang} />
      <main>
        {view === 'form' ? (
          <div className="bg-[#F8FAFC] min-h-[calc(100vh-64px)]">
            {/* Decorative background elements */}
            <div className="absolute inset-x-0 top-16 h-80 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f0f4ff] to-transparent"></div>
              <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
              <div className="absolute top-20 right-20 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl"></div>
            </div>
            <Hero lang={lang} />
            <EssayForm lang={lang} onSubmit={handleFormSubmit} />
          </div>
        ) : (
          formData && (
            <div className="bg-gradient-to-b from-slate-50/50 to-slate-100/50 min-h-[calc(100vh-64px)] py-8 px-4">
              <OrderConfirmation
                formData={formData}
                onBack={handleBack}
                onPay={handlePay}
                lang={lang}
              />
            </div>
          )
        )}
      </main>
    </>
  );
}
