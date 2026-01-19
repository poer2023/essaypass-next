'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from "@/components/Header";
import MobileFrame from "@/components/MobileFrame";
import { Lang, ViewMode } from "@/lib/types";
import { UI_TEXT } from "@/lib/constants";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('en');
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const t = UI_TEXT[lang].landing;

  const handleStartDrafting = () => {
    if (topic.trim()) {
      sessionStorage.setItem('essayFormData', JSON.stringify({ topic: topic.trim() }));
    }
    router.push('/ai-essay-writer');
  };

  const PageContent = () => (
    <div className="bg-gradient-to-b from-blue-50/30 via-white to-slate-50 min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {t.heroDesc}
              </p>

              {/* Search/Input Box */}
              <div className="flex items-center bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-1.5 max-w-lg">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 px-4 py-3 text-slate-700 placeholder-slate-400 bg-transparent outline-none text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleStartDrafting()}
                />
                <button
                  onClick={handleStartDrafting}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-lg transition-all shadow-md shadow-orange-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  {t.startBtn}
                </button>
              </div>
            </div>

            {/* Right: Images Collage */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[400px]">
                {/* Top left image */}
                <div className="absolute top-0 left-8 w-48 h-40 rounded-2xl overflow-hidden shadow-xl shadow-slate-300/50 border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
                    alt="Student studying"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Top right image */}
                <div className="absolute top-4 right-0 w-40 h-32 rounded-2xl overflow-hidden shadow-xl shadow-slate-300/50 border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=300&fit=crop"
                    alt="Student with laptop"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Center image */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-56 h-44 rounded-2xl overflow-hidden shadow-2xl shadow-slate-400/40 border-4 border-white z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
                    alt="Students collaborating"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Bottom right image */}
                <div className="absolute bottom-0 right-8 w-44 h-36 rounded-2xl overflow-hidden shadow-xl shadow-slate-300/50 border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
                    alt="Writing notes"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-blue-600">{t.feature1Title}</h3>
            </div>
            <p className="text-sm text-slate-500">{t.feature1Desc}</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-blue-600">{t.feature2Title}</h3>
            </div>
            <p className="text-sm text-slate-500">{t.feature2Desc}</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-blue-600">{t.feature3Title}</h3>
            </div>
            <p className="text-sm text-slate-500">{t.feature3Desc}</p>
          </div>
        </div>
      </section>

      {/* Section 2: AI Research Companion */}
      <section className="bg-gradient-to-b from-slate-50 to-blue-50/30 py-20 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {t.section2Title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t.section2Desc}
          </p>
        </div>
      </section>
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
              <Header lang={lang} onLangChange={setLang} />
              <PageContent />
            </MobileFrame>
          </div>
        )}
      </main>
    </>
  );
}
