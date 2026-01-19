'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EssayForm from "@/components/EssayForm";
import MobileFrame from "@/components/MobileFrame";
import { Lang, EssayFormData, ViewMode } from "@/lib/types";

export default function AIEssayWriterPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const router = useRouter();

  const handleFormSubmit = (data: EssayFormData) => {
    // 存储表单数据到 sessionStorage（demo用）
    sessionStorage.setItem('essayFormData', JSON.stringify(data));
    // 跳转到订单页
    router.push('/ai-essay-writer/task/123456');
  };

  // 页面内容组件
  const PageContent = () => (
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
  );

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
            <MobileFrame>
              <PageContent />
            </MobileFrame>
          </div>
        )}
      </main>
    </>
  );
}
