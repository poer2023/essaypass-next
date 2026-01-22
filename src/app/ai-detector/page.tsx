'use client';

import { useState, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import { Lang } from '@/lib/types';
import { UI_TEXT } from '@/lib/constants';

export default function AIDetectorPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = UI_TEXT[lang].detector;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.docx') || droppedFile.name.endsWith('.pdf'))) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const handleDetect = useCallback(() => {
    if (!file) return;
    setIsDetecting(true);
    // Simulate detection
    setTimeout(() => {
      setIsDetecting(false);
    }, 3000);
  }, [file]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      <Header lang={lang} onLangChange={setLang} />

      {/* Background Decoration - Gradient + Blur Orbs (matching ai-essay-writer) */}
      <div className="absolute inset-x-0 top-16 h-80 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f0f4ff] to-transparent"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
          {t.heroTitle} <span className="text-blue-600">{t.heroTitleHighlight}</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto px-4 text-base">
          {t.heroSubtitle}
        </p>

        {/* Flow Indicator Badges */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {/* Step 1: Identify Risks - Clean white with subtle shadow */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t.identifyRisks}
          </div>

          {/* Arrow connector - Gradient line with arrow */}
          <div className="flex items-center gap-1">
            <div className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-emerald-400 rounded-full" />
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 17l5-5-5-5v10z" />
            </svg>
          </div>

          {/* Step 2: Professional Solution - Gradient with glow */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-sm font-medium shadow-lg shadow-emerald-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.professionalSolution}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col gap-8">
          {/* Upload Area - Full Width Centered */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Upload Card */}
            <div
              className={`bg-white rounded-2xl border-2 border-dashed transition-all ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
              } p-6 min-h-[280px] flex flex-col items-center justify-center relative group cursor-pointer`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Hover Overlay - Only show when no file */}
              {!file && (
                <div className="absolute inset-0 bg-slate-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none z-10">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-slate-700 font-medium mb-1">
                    {lang === 'en' ? 'Click to upload' : '点击上传'}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {t.uploadSupported}
                  </p>
                </div>
              )}

              {file ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-700 font-medium mb-1">{file.name}</p>
                  <p className="text-slate-500 text-sm mb-5">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  {/* Detect Button - Orange glow style */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDetect(); }}
                    disabled={isDetecting}
                    className={`px-20 py-3.5 rounded-full font-semibold transition-all ${
                      !isDetecting
                        ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_40px_rgba(249,115,22,0.55)] hover:scale-105'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isDetecting ? t.detecting : t.detectButton}
                  </button>
                  {/* Remove - Secondary action below */}
                  <div className="mt-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="text-sm text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Remove file
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center pointer-events-none group-hover:opacity-0 transition-opacity">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-slate-700 font-medium mb-1">
                    {lang === 'en' ? 'Drag and drop your file here' : '拖放文件到这里'}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {t.uploadSupported}
                  </p>
                </div>
              )}

              {/* Important Notes - Only show when no file */}
              {!file && (
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      📝 English text only
                    </span>
                    <span className="flex items-center gap-1">
                      📄 .docx & .pdf supported
                    </span>
                    <span className="flex items-center gap-1">
                      📊 800-30,000 words
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Why EssayPass - Two-Row Banner */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 via-white to-white rounded-2xl border border-blue-100 p-6 shadow-sm">
              {/* Row 1: Title + CTA */}
              <div className="flex items-start justify-between gap-6 mb-5">
                {/* Left: Title + Comparison + Social Proof */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1.5">
                    {t.whyEssayPass.heading}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-500 font-medium">{t.whyEssayPass.comparison.generalRisk}</span>
                      <span className="text-slate-300">→</span>
                      <span className="text-emerald-600 font-medium">{t.whyEssayPass.comparison.essayPassSafe}</span>
                    </div>
                    {/* Social Proof */}
                    <span className="text-xs text-slate-400 border-l border-slate-200 pl-3">
                      ⭐ Trusted by 10,000+ students
                    </span>
                  </div>
                </div>

                {/* Right: CTA with shimmer effect */}
                <button className="relative px-6 py-3 bg-orange-500 text-white text-sm rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 whitespace-nowrap overflow-hidden flex-shrink-0">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></span>
                  {t.whyEssayPass.cta}
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 mb-5"></div>

              {/* Row 2: 3 Features - Card style */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {t.whyEssayPass.features.map((feature, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:shadow-sm transition-all ${
                    index === 0 ? 'hover:border-emerald-200' :
                    index === 1 ? 'hover:border-blue-200' :
                    'hover:border-violet-200'
                  }`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      index === 0 ? 'bg-emerald-50 text-emerald-600' :
                      index === 1 ? 'bg-blue-50 text-blue-600' :
                      'bg-violet-50 text-violet-600'
                    }`}>
                      {/* Low AI Rate - Shield with Checkmark */}
                      {feature.icon === 'check' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                      {/* Verified Sources - Document with Badge */}
                      {feature.icon === 'book' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          <circle cx="18" cy="6" r="3" fill="currentColor" stroke="none" />
                          <path d="M17 6l1 1 2-2" stroke="white" strokeWidth={1.5} />
                        </svg>
                      )}
                      {/* Academic Format - Formatted Document */}
                      {feature.icon === 'format' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path strokeLinecap="round" d="M7 8h10M7 12h10M7 16h6" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm mb-0.5">{feature.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget (Floating) */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-50">
        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
}
