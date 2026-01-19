'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Header from "@/components/Header";
import OrderConfirmation from "@/components/OrderConfirmation";
import MobileFrame from "@/components/MobileFrame";
import { Lang, EssayFormData, ViewMode } from "@/lib/types";

const DEFAULT_FORM_DATA: EssayFormData = {
  type: 'Research Paper',
  academicLevel: 'Undergraduate',
  topic: 'The Impact of Artificial Intelligence on Modern Education',
  instructions: '### Task Objectives\n- Discuss the pros and cons of AI tools like ChatGPT in classrooms\n- Include ethical considerations\n\n### Constraints\n- Use academic tone\n- Cite all sources',
  referenceFiles: [],
  outlineType: 'ai',
  wordCount: '2000-2500 words',
  language: 'English',
  citationStyle: 'APA 7th',
  includeChartsTables: false,
  includeFormulas: false,
};

export default function TaskPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [formData, setFormData] = useState<EssayFormData>(DEFAULT_FORM_DATA);
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEmbeddedMobile = searchParams.get('viewport') === 'mobile';

  useEffect(() => {
    const savedData = sessionStorage.getItem('essayFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch {
        // 使用默认数据
      }
    }
  }, []);

  const handleBack = () => {
    router.push('/ai-essay-writer');
  };

  const handlePay = () => {
    alert(lang === 'zh' ? '支付功能即将上线！' : 'Payment integration coming soon!');
  };

  const PageContent = () => (
    <div className="bg-gradient-to-b from-slate-50/50 to-slate-100/50 min-h-[calc(100vh-64px)] py-8 px-4">
      <OrderConfirmation
        formData={formData}
        onBack={handleBack}
        onPay={handlePay}
        lang={lang}
      />
    </div>
  );

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
