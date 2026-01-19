'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang, ViewMode } from '@/lib/types';
import { UI_TEXT } from '@/lib/constants';

interface HeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export default function Header({ lang, onLangChange, viewMode = 'web', onViewModeChange }: HeaderProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = UI_TEXT[lang];
  const pathname = usePathname();

  const languages = [
    { code: 'en' as Lang, label: 'English', flag: '🇺🇸' },
    { code: 'zh' as Lang, label: '中文', flag: '🇨🇳' }
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const navItems = [
    { href: '/ai-essay-writer', label: t.nav.essayWriter },
    { href: '/ai-detector', label: t.nav.detector },
    { href: '/blog', label: t.nav.blog },
    { href: '/history', label: t.nav.history },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#2563EB" />
            <path d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16" cy="20" r="2" fill="white" />
          </svg>
          <span className="text-xl font-bold text-blue-600 tracking-tight">EssayPass</span>
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname?.startsWith(item.href)
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          {onViewModeChange && (
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => onViewModeChange('web')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'web'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Web</span>
              </button>
              <button
                onClick={() => onViewModeChange('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          )}

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <span className="text-base">{currentLang.flag}</span>
              {currentLang.label}
              <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Language Dropdown */}
            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        onLangChange(language.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                        lang === language.code ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      {language.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mobile Language Switcher */}
          <button
            onClick={() => onLangChange(lang === 'en' ? 'zh' : 'en')}
            className="sm:hidden w-9 h-9 flex items-center justify-center text-lg border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            {currentLang.flag}
          </button>

          {/* User Avatar */}
          <button className="w-9 h-9 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
