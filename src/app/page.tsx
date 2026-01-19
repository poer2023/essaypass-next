'use client';

import { useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EssayForm from "@/components/EssayForm";
import OrderConfirmation from "@/components/OrderConfirmation";
import MobileFrame from "@/components/MobileFrame";
import { Lang, EssayFormData, ViewMode } from "@/lib/types";

type ViewState = 'form' | 'confirmation';

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [view, setView] = useState<ViewState>('form');
  const [formData, setFormData] = useState<EssayFormData | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('web');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEmbeddedMobile = searchParams.get('viewport') === 'mobile';

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

  // 页面内容组件
  const PageContent = () => (
    <>
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
    </>
  );

  // 如果是嵌入的移动端视图，渲染完整页面（包含简化的 Header）
  if (isEmbeddedMobile) {
    return (
      <>
        <Header lang={lang} onLangChange={setLang} />
        <main>
          <PageContent />
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        lang={lang}
        onLangChange={setLang}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <main>
        {viewMode === 'web' ? (
          <PageContent />
        ) : (
          <div className="bg-slate-100 min-h-[calc(100vh-64px)] flex items-center justify-center py-8">
            <MobileFrame currentPath={pathname} />
          </div>
        )}
      </main>
    </>
  );
}
