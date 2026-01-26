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
    <div className="min-h-screen bg-white relative">
      <Header lang={lang} onLangChange={setLang} />

      {/* Hero Section */}
      <section className="pt-6 sm:pt-8 pb-4 text-center relative z-10 px-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-3">
          {t.heroTitle} <span className="text-blue-600">{t.heroTitleHighlight}</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
          {t.heroSubtitle}
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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

        </div>
      </section>

      {/* Simplified CTA Banner - Light blue background */}
      <div className="w-full bg-[#F8FAFC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: Content */}
            <div className="space-y-4">
              {/* Title + Badge */}
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Why EssayPass Writer?
                </h2>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                  TRUSTED
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 max-w-xl">
                Concerned about detection? Our writer mimics human logic to ensure your paper is
                <span className="text-emerald-600 font-semibold"> SAFE & SOLID</span>.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Low AI Rate
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Verified Sources
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                  <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  APA/MLA
                </span>
              </div>
            </div>

            {/* Right: CTA Button */}
            <a
              href="/ai-essay-writer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all whitespace-nowrap"
            >
              Try EssayPass Writer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="bg-white pt-12 sm:pt-16 pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-slate-900 mb-4">
              Advanced AI Detector & Plagiarism Checker
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Receive an instant report highlighting similarity scores and AI probability
            </p>
          </div>

          {/* Content Grid - Left Steps, Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Steps */}
            <div>
              {/* Step 1 */}
              <div className="flex gap-5 py-6 border-b border-slate-100">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">1</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Upload or Paste</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Copy your text or upload your document (PDF, Docx) into our secure analysis window.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-5 py-6 border-b border-slate-100">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">2</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Deep Scan</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Our engine compares your text against billions of web pages and academic databases while analyzing syntax for AI patterns.
                  </p>
                </div>
              </div>

              {/* Step 3 - No bottom border */}
              <div className="flex gap-5 py-6">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">3</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Get Detailed Report</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Receive an instant report allowing you to make necessary revisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
                  alt="Person working at laptop with notebook"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-5">
            Bring Transparency to the Writing Process with Ethical Scholarship
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Providing educators with actionable insights to guide students toward genuine learning and authentic, original work.
          </p>
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
