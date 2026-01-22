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

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t.identifyRisks}
          </button>

          {/* Dashed line connector */}
          <div className="flex items-center gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1.5 h-0.5 bg-slate-300 rounded-full" />
            ))}
            <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 17l5-5-5-5v10z" />
            </svg>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.professionalSolution}
          </button>
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
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
              } p-6 min-h-[280px] flex flex-col items-center justify-center relative`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

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
                    onClick={handleDetect}
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
                      onClick={() => setFile(null)}
                      className="text-sm text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Remove file
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-center cursor-pointer"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-slate-700 font-medium underline mb-2">
                    {lang === 'en' ? '上传文件框' : '上传文件框'}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {t.uploadSupported}
                  </p>
                </button>
              )}

              {/* Inline Notes Tags - Only show when no file */}
              {!file && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 justify-center text-xs text-slate-400">
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 rounded-full">
                      📝 English text only
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 rounded-full">
                      🖼️ Images not analyzed
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 rounded-full">
                      📄 Max 10MB
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Why EssayPass - Two-Row Banner */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 via-white to-white rounded-2xl border border-blue-100 p-6 shadow-sm">
              {/* Row 1: All elements in one line */}
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* Left group: Badge + Heading */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded border border-slate-200">
                    💡 {t.whyEssayPass.badge}
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    {t.whyEssayPass.heading}
                  </h2>
                </div>

                {/* Right group: Comparison + CTA */}
                <div className="flex items-center gap-4">
                  {/* Comparison badge */}
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs">
                    <span className="text-red-500 font-bold">{t.whyEssayPass.comparison.generalRisk}</span>
                    <span className="text-slate-400">vs</span>
                    <span className="text-blue-600 font-bold">{t.whyEssayPass.comparison.essayPassSafe}</span>
                  </div>

                  {/* CTA - with shimmer effect */}
                  <button className="relative px-5 py-2.5 bg-orange-500 text-white text-sm rounded-lg font-medium hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 whitespace-nowrap overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></span>
                    {t.whyEssayPass.cta}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 mb-5"></div>

              {/* Row 2: 3 Features - full width */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {t.whyEssayPass.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon === 'check' && (
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {feature.icon === 'book' && (
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                      {feature.icon === 'format' && (
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm">{feature.title}</h4>
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
