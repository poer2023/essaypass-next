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
  className?: string;
}

export default function Header({ lang, onLangChange, viewMode = 'web', onViewModeChange, className = '' }: HeaderProps) {
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
    <header className={`sticky top-0 z-50 bg-blue-50 backdrop-blur-md border-b border-blue-100 shadow-md ${className}`}>
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
              className={`text-sm font-medium transition-colors ${pathname?.startsWith(item.href)
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
                      className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors ${lang === language.code ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
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

          {/* Divider - Desktop only */}
          {onViewModeChange && (
            <div className="hidden md:block w-px h-6 bg-slate-200"></div>
          )}

          {/* View Mode Switcher - Desktop only */}
          {onViewModeChange && (
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => onViewModeChange('web')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'web'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Web</span>
              </button>
              <button
                onClick={() => onViewModeChange('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'mobile'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Mobile</span>
              </button>
            </div>
          )}

          {/* GitHub Link - Desktop only */}
          {onViewModeChange && (
            <a
              href="https://github.com/poer2023/essaypass-next"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-9 h-9 items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="View on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
