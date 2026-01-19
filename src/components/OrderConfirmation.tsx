'use client';

import React, { useState } from 'react';
import { EssayFormData, Lang } from '@/lib/types';
import { UI_TEXT } from '@/lib/constants';

interface OrderConfirmationProps {
  formData: EssayFormData;
  onBack: () => void;
  onPay: () => void;
  lang: Lang;
}

// UI Text for OrderConfirmation
const ORDER_TEXT = {
  en: {
    configTitle: 'Essay Configuration',
    untitled: 'Untitled Essay',
    edit: 'Edit details',
    samplePreviews: 'Sample Previews',
    sampleDesc: 'See example outputs. Your final files follow your topic & requirements.',
    previewSamples: 'Preview samples',
    allInOne: 'All-in-one Service',
    turnitinTitle: 'Turnitin Similarity & AI Report',
    turnitinDesc: 'Official PDF report (similarity + AI) delivered with paper.',
    recommended: 'Recommended',
    addonLabel: 'Add-on (Turnitin Official Report)',
    total: 'Total',
    payButton: 'Pay',
    securePayment: 'SSL Secure Payment',
    closePreview: 'Close Preview',
    samplePreview: 'Sample Preview',
    highFidelity: 'High-Fidelity Sample',
    samplePlaceholder: 'This is a placeholder for the sample. In production, this would display a high-resolution PDF or interactive document viewer to show the quality of output.',
    faq1Title: 'Q: Will my EssayPass paper get flagged?',
    faq1Answer: 'A: Our engine writes line-by-line using academic logic, unlike standard LLMs. Plus, you can add the official Turnitin report for proof.',
    faq2Title: 'Q: Is the draft actually usable?',
    faq2Answer: 'A: Yes. You get real citations (matched to text), a clear outline, and a verified reference list. It is a submission-ready artifact.',
    trustedBy: 'Trusted by',
    students: '5M+ students',
    gallery: {
      paper: { label: 'Paper sample', title: 'Submission-ready paper' },
      summary: { label: 'Summary sample', title: '1-Page Summary' },
      faq: { label: 'FAQ sample', title: 'Topic FAQ' },
      strategy: { label: 'Logic sample', title: 'Writing Strategy' },
      refs: { label: 'Sources sample', title: 'Reference Full Text' }
    },
    billing: {
      paper: { text: 'Submission-ready paper', format: 'DOCX/PDF' },
      summary: { text: '1-Page Summary', format: 'PDF' },
      faq: { text: 'Topic FAQ', format: 'PDF' },
      strategy: { text: 'Writing Strategy', format: 'PDF' },
      refs: { text: 'Reference Full Text', format: 'ZIP/PDF' },
      agent: { text: 'AI Agent Context', format: 'Chat Log' }
    },
    previewTitles: {
      paper: 'Final Paper Sample',
      summary: 'Executive Summary Sample',
      faq: 'Topic FAQ & Analysis Sample',
      strategy: 'Logic & Strategy Map Sample',
      refs: 'Verified References Sample',
      all: 'Sample Deliverables Overview'
    }
  },
  zh: {
    configTitle: '论文配置',
    untitled: '未命名论文',
    edit: '编辑详情',
    samplePreviews: '样例预览',
    sampleDesc: '查看示例输出。最终文件将按照您的主题和要求生成。',
    previewSamples: '预览样例',
    allInOne: '一站式服务',
    turnitinTitle: 'Turnitin 查重 & AI 检测报告',
    turnitinDesc: '官方 PDF 报告（查重率 + AI 检测）随论文交付。',
    recommended: '推荐',
    addonLabel: '附加服务 (Turnitin 官方报告)',
    total: '总计',
    payButton: '支付',
    securePayment: 'SSL 安全支付',
    closePreview: '关闭预览',
    samplePreview: '样例预览',
    highFidelity: '高保真样例',
    samplePlaceholder: '这是样例的占位符。在生产环境中，这将显示高分辨率 PDF 或交互式文档查看器以展示输出质量。',
    faq1Title: '问：EssayPass 的论文会被检测出来吗？',
    faq1Answer: '答：我们的引擎使用学术逻辑逐行写作，不同于标准 LLM。此外，您可以添加官方 Turnitin 报告作为证明。',
    faq2Title: '问：生成的草稿真的能用吗？',
    faq2Answer: '答：是的。您将获得真实的引用（与正文匹配）、清晰的大纲和经过验证的参考文献列表。这是可直接提交的成品。',
    trustedBy: '已获信赖',
    students: '500万+ 学生',
    gallery: {
      paper: { label: '论文样例', title: '可提交的论文' },
      summary: { label: '摘要样例', title: '一页摘要' },
      faq: { label: 'FAQ样例', title: '主题常见问题' },
      strategy: { label: '逻辑样例', title: '写作策略' },
      refs: { label: '文献样例', title: '参考文献全文' }
    },
    billing: {
      paper: { text: '可提交的论文', format: 'DOCX/PDF' },
      summary: { text: '一页摘要', format: 'PDF' },
      faq: { text: '主题常见问题', format: 'PDF' },
      strategy: { text: '写作策略', format: 'PDF' },
      refs: { text: '参考文献全文', format: 'ZIP/PDF' },
      agent: { text: 'AI 代理上下文', format: '聊天记录' }
    },
    previewTitles: {
      paper: '最终论文样例',
      summary: '执行摘要样例',
      faq: '主题 FAQ 与分析样例',
      strategy: '逻辑与策略图样例',
      refs: '已验证参考文献样例',
      all: '交付物概览样例'
    }
  }
};

// Preview Modal Component
const PreviewModal = ({
  activeItem,
  onClose,
  lang
}: {
  activeItem: string | null;
  onClose: () => void;
  lang: Lang;
}) => {
  if (!activeItem) return null;

  const t = ORDER_TEXT[lang];
  const titleMap = t.previewTitles as Record<string, string>;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl p-0 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="text-xl">📄</span>
            {titleMap[activeItem] || t.samplePreview}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 overflow-y-auto bg-slate-50/30">
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h4 className="text-slate-900 font-bold mb-2">{t.highFidelity}</h4>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
              {t.samplePlaceholder}
            </p>
            <div className="w-full max-w-md space-y-3 opacity-50 blur-[1px]">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-white">
          <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
            {t.closePreview}
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ formData, onBack, onPay, lang }) => {
  const [isTurnitinChecked, setIsTurnitinChecked] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [showClickHint, setShowClickHint] = useState(true);

  // 3秒后隐藏点击引导
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowClickHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const t = ORDER_TEXT[lang];

  // Pricing Logic
  const BASE_PRICE = 9.99;
  const BASE_ORIGINAL = 40.00;
  const ADDON_PRICE = 4.99;
  const ADDON_ORIGINAL_VALUE = 9.99;

  const totalPrice = (BASE_PRICE + (isTurnitinChecked ? ADDON_PRICE : 0)).toFixed(2);
  const totalOriginal = (BASE_ORIGINAL + (isTurnitinChecked ? ADDON_ORIGINAL_VALUE : 0)).toFixed(2);

  // Gallery Items
  const GALLERY_ITEMS = [
    { id: 'paper', label: t.gallery.paper.label, fullTitle: t.gallery.paper.title },
    { id: 'summary', label: t.gallery.summary.label, fullTitle: t.gallery.summary.title },
    { id: 'faq', label: t.gallery.faq.label, fullTitle: t.gallery.faq.title },
    { id: 'strategy', label: t.gallery.strategy.label, fullTitle: t.gallery.strategy.title },
    { id: 'refs', label: t.gallery.refs.label, fullTitle: t.gallery.refs.title }
  ];

  // Billing Items
  const BILLING_ITEMS = [
    { id: 'paper', text: t.billing.paper.text, format: t.billing.paper.format },
    { id: 'summary', text: t.billing.summary.text, format: t.billing.summary.format },
    { id: 'faq', text: t.billing.faq.text, format: t.billing.faq.format },
    { id: 'strategy', text: t.billing.strategy.text, format: t.billing.strategy.format },
    { id: 'refs', text: t.billing.refs.text, format: t.billing.refs.format },
    { id: 'agent', text: t.billing.agent.text, format: t.billing.agent.format },
  ];

  // 真实文档缩略图样式 - 让用户一眼看出"这是可预览的文档"
  const renderCardVisual = (id: string) => {
    switch(id) {
      case 'paper':
        // 论文：模拟真实学术论文格式
        return (
          <div className="w-full h-full bg-white relative flex flex-col p-2.5 overflow-hidden">
            {/* 论文标题 */}
            <div className="text-[7px] font-bold text-slate-800 text-center mb-0.5 leading-tight">The Impact of AI on</div>
            <div className="text-[7px] font-bold text-slate-800 text-center mb-1 leading-tight">Education</div>
            {/* 作者 */}
            <div className="text-[5px] text-slate-400 text-center mb-1.5 italic">Author • University</div>
            {/* Abstract */}
            <div className="text-[6px] font-bold text-slate-700 mb-0.5">Abstract</div>
            <div className="space-y-[2px] mb-1.5">
              <div className="h-[2px] w-full bg-slate-300 rounded-full"></div>
              <div className="h-[2px] w-full bg-slate-300 rounded-full"></div>
              <div className="h-[2px] w-3/4 bg-slate-300 rounded-full"></div>
            </div>
            {/* 1. Introduction */}
            <div className="text-[6px] font-bold text-slate-700 mb-0.5">1. Introduction</div>
            <div className="space-y-[2px] flex-1">
              <div className="h-[2px] w-full bg-slate-200 rounded-full"></div>
              <div className="h-[2px] w-full bg-slate-200 rounded-full"></div>
              <div className="h-[2px] w-5/6 bg-slate-200 rounded-full"></div>
            </div>
            {/* 页码 */}
            <div className="text-[5px] text-slate-400 text-center mt-1">— 1 —</div>
          </div>
        );
      case 'refs':
        // 参考文献：真实的引用列表样式
        return (
          <div className="w-full h-full bg-white relative flex flex-col p-2.5 overflow-hidden">
            {/* References 标题 */}
            <div className="text-[7px] font-bold text-slate-800 mb-1.5 pb-1 border-b border-slate-200 text-center">References</div>
            {/* 参考文献列表 */}
            <div className="space-y-1.5 flex-1 text-[5px]">
              <div className="flex items-start gap-1">
                <span className="text-emerald-600 font-medium shrink-0">Smith, J.</span>
                <span className="text-slate-400">(2024).</span>
                <div className="h-[2px] flex-1 bg-slate-200 rounded-full mt-1"></div>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-emerald-600 font-medium shrink-0">Brown, A.</span>
                <span className="text-slate-400">(2023).</span>
                <div className="h-[2px] flex-1 bg-slate-200 rounded-full mt-1"></div>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-emerald-600 font-medium shrink-0">Lee, M.</span>
                <span className="text-slate-400">(2024).</span>
                <div className="h-[2px] flex-1 bg-slate-200 rounded-full mt-1"></div>
              </div>
            </div>
            {/* 验证标记 */}
            <div className="flex items-center justify-end gap-0.5 mt-1">
              <svg className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span className="text-[5px] text-emerald-500 font-medium">Verified</span>
            </div>
          </div>
        );
      case 'summary':
        // 执行摘要：清晰的要点列表
        return (
          <div className="w-full h-full bg-gradient-to-b from-rose-50 to-white relative flex flex-col p-2.5 overflow-hidden">
            {/* Executive Summary 标题 */}
            <div className="text-[7px] font-bold text-rose-600 mb-1.5 pb-1 border-b border-rose-200">Executive Summary</div>
            {/* 要点列表 */}
            <div className="space-y-1.5 flex-1">
              <div className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-0.5 shrink-0"></div>
                <div className="h-[2px] w-full bg-slate-300 rounded-full mt-1"></div>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-0.5 shrink-0"></div>
                <div className="h-[2px] w-5/6 bg-slate-300 rounded-full mt-1"></div>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-0.5 shrink-0"></div>
                <div className="h-[2px] w-full bg-slate-300 rounded-full mt-1"></div>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-0.5 shrink-0"></div>
                <div className="h-[2px] w-4/5 bg-slate-300 rounded-full mt-1"></div>
              </div>
            </div>
          </div>
        );
      case 'faq':
        // FAQ：问答格式
        return (
          <div className="w-full h-full bg-gradient-to-b from-amber-50 to-white relative flex flex-col p-2.5 overflow-hidden">
            {/* Topic FAQ 标题 */}
            <div className="text-[7px] font-bold text-amber-600 mb-1.5 pb-1 border-b border-amber-200">Topic FAQ</div>
            {/* Q&A 列表 */}
            <div className="space-y-1.5 flex-1">
              {/* Q1 */}
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[6px] font-bold text-amber-600">Q:</span>
                  <div className="h-[2px] flex-1 bg-amber-300 rounded-full"></div>
                </div>
                <div className="flex items-center gap-1 pl-2">
                  <span className="text-[6px] font-bold text-blue-500">A:</span>
                  <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              {/* Q2 */}
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[6px] font-bold text-amber-600">Q:</span>
                  <div className="h-[2px] flex-1 bg-amber-300 rounded-full"></div>
                </div>
                <div className="flex items-center gap-1 pl-2">
                  <span className="text-[6px] font-bold text-blue-500">A:</span>
                  <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'strategy':
        // 写作策略：大纲结构
        return (
          <div className="w-full h-full bg-gradient-to-b from-violet-50 to-white relative flex flex-col p-2.5 overflow-hidden">
            {/* Writing Strategy 标题 */}
            <div className="text-[7px] font-bold text-violet-600 mb-1.5 pb-1 border-b border-violet-200">Writing Strategy</div>
            {/* 大纲结构 */}
            <div className="space-y-1 flex-1 text-[5px]">
              <div className="flex items-center gap-1">
                <span className="text-violet-600 font-bold">I.</span>
                <span className="text-slate-600">Introduction</span>
              </div>
              <div className="flex items-center gap-1 pl-2">
                <span className="text-slate-400">a.</span>
                <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-violet-600 font-bold">II.</span>
                <span className="text-slate-600">Methods</span>
              </div>
              <div className="flex items-center gap-1 pl-2">
                <span className="text-slate-400">a.</span>
                <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-violet-600 font-bold">III.</span>
                <span className="text-slate-600">Results</span>
              </div>
            </div>
          </div>
        );
      case 'agent':
        // AI Agent：聊天界面
        return (
          <div className="w-full h-full bg-gradient-to-b from-indigo-50 to-white relative flex flex-col p-2.5 overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-1 mb-1.5 pb-1 border-b border-indigo-200">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/></svg>
              </div>
              <span className="text-[6px] font-bold text-indigo-600">AI Assistant</span>
            </div>
            {/* Chat messages */}
            <div className="space-y-1 flex-1">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-indigo-500 text-white rounded-lg px-1.5 py-0.5 max-w-[75%]">
                  <div className="text-[4px]">Help me revise...</div>
                </div>
              </div>
              {/* AI response */}
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-lg px-1.5 py-0.5 max-w-[75%]">
                  <div className="text-[4px] text-slate-600">Sure! Here's my suggestion...</div>
                </div>
              </div>
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-indigo-500 text-white rounded-lg px-1.5 py-0.5 max-w-[75%]">
                  <div className="text-[4px]">Thanks!</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'turnitin':
        // Turnitin：查重报告
        return (
          <div className="w-full h-full bg-white relative flex flex-col p-2.5 overflow-hidden">
            {/* Report header */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[6px] font-bold text-red-500">Turnitin Report</span>
              <span className="text-[7px] font-bold bg-green-100 text-green-600 px-1 py-0.5 rounded">8%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full mb-2 overflow-hidden">
              <div className="h-full w-[8%] bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
            </div>
            {/* Details */}
            <div className="space-y-1 text-[5px] flex-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Internet</span>
                <span className="text-slate-700 font-medium">5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Publications</span>
                <span className="text-slate-700 font-medium">2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Student Papers</span>
                <span className="text-slate-700 font-medium">1%</span>
              </div>
            </div>
            {/* AI Detection */}
            <div className="border-t border-slate-100 pt-1 mt-1 flex justify-between items-center">
              <span className="text-[5px] text-slate-500">AI Detection</span>
              <span className="text-[6px] font-bold text-green-500">0% AI</span>
            </div>
          </div>
        );
      case 'ppt':
        // PPT：演示文稿
        return (
          <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 relative flex flex-col p-2 overflow-hidden">
            {/* Slide */}
            <div className="bg-white rounded shadow-sm p-1.5 flex-1 flex flex-col">
              <div className="text-[6px] font-bold text-orange-600 mb-1">Presentation Title</div>
              <div className="flex gap-1.5 flex-1">
                {/* Left: bullet points */}
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-orange-400 shrink-0"></div>
                    <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-orange-400 shrink-0"></div>
                    <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-orange-400 shrink-0"></div>
                    <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
                {/* Right: chart placeholder */}
                <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-300" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg>
                </div>
              </div>
            </div>
            {/* Slide number */}
            <div className="text-[5px] text-slate-400 text-center mt-1">1 / 12</div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <>
      <PreviewModal
        activeItem={activePreview}
        onClose={() => setActivePreview(null)}
        lang={lang}
      />
      {/* 聚光灯遮罩已移除 */}
      <div className="max-w-6xl mx-auto font-sans animate-fade-in-up pb-52 sm:pb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-start">

        {/* LEFT COLUMN: Main Order Card */}
        <div className="flex-1 w-full bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-5 sm:px-8 sm:py-6 relative overflow-visible">

          {/* Header */}
          <div className="mb-6 border-b border-slate-50 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">{formData.topic || t.untitled}</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded border border-slate-100 text-[11px] font-medium text-slate-500 bg-slate-50">{formData.type}</span>
              <span className="px-2.5 py-0.5 rounded border border-slate-100 text-[11px] font-medium text-slate-500 bg-slate-50">{formData.wordCount}</span>
              <span className="px-2.5 py-0.5 rounded border border-slate-100 text-[11px] font-medium text-slate-500 bg-slate-50">{formData.citationStyle}</span>
            </div>
          </div>

          {/* SECTION: ALL-IN-ONE SERVICE - 3 Column Cards */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900 italic">{t.allInOne}</h3>
            </div>

            {/* Mobile: Grid layout, Desktop: Flex layout */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 items-stretch">
              {/* Column 1: Core paper (2 cards) */}
              <div className="lg:flex-[2] min-w-0">
                <h4 className="text-sm font-bold text-slate-800 mb-3">1. Core paper</h4>
                <div className="border border-slate-200 rounded-2xl p-4 bg-white lg:h-[180px] flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full lg:flex lg:justify-around">
                    {/* Submission-ready paper */}
                    <div className="flex flex-col items-center relative">
                      <div
                        onClick={() => setActivePreview('paper')}
                        className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all relative overflow-hidden group"
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                          {renderCardVisual('paper')}
                        </div>
                        {/* Hover效果 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                            <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* 小手戳动提示 - 3秒后消失 */}
                      {showClickHint && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                          {/* 涟漪光圈 */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500/20 animate-tap-ripple"></div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500/40 animate-tap-ripple" style={{animationDelay: '0.2s'}}></div>
                          {/* 现代手指图标 - 参考 Untitled UI / IconScout 风格 */}
                          <div className="relative w-8 h-10 animate-tap-hint">
                            <svg viewBox="0 0 24 32" fill="none" className="w-full h-full" style={{filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'}}>
                              {/* 手指 */}
                              <path
                                d="M12 0C9.8 0 8 1.8 8 4V18L5.7 15.7C4.5 14.5 2.5 14.5 1.3 15.7C0.1 16.9 0.1 18.9 1.3 20.1L9.2 28C10.4 29.2 12 30 13.8 30H16C20.4 30 24 26.4 24 22V12C24 9.8 22.2 8 20 8C19.3 8 18.6 8.2 18 8.5V4C18 1.8 16.2 0 14 0H12Z"
                                fill="white"
                                stroke="#3B82F6"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              />
                              {/* 手指分隔线 */}
                              <path d="M12 8V16" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round"/>
                              <path d="M16 10V18" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                      )}
                      <div className="mt-2 h-10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-700 leading-tight text-center">Submission-ready paper</span>
                      </div>
                    </div>

                    {/* Reference sources */}
                    <div className="flex flex-col items-center">
                      <div
                        onClick={() => setActivePreview('refs')}
                        className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 transition-all relative overflow-hidden group"
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                          {renderCardVisual('refs')}
                        </div>
                        {/* 预览图标覆盖层 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                            <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 h-10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-700 leading-tight text-center">Reference sources</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Review & understanding (3 cards) */}
              <div className="lg:flex-[3] min-w-0">
                <h4 className="text-sm font-bold text-slate-800 mb-3">2. Review & understanding</h4>
                <div className="border border-slate-200 rounded-2xl p-4 bg-white lg:h-[180px] flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-3 w-full lg:flex lg:gap-4 lg:justify-around">
                    {/* 1-page summary */}
                    <div className="flex flex-col items-center">
                      <div
                        onClick={() => setActivePreview('summary')}
                        className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-red-200 hover:-translate-y-0.5 transition-all relative overflow-hidden group"
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                          {renderCardVisual('summary')}
                        </div>
                        {/* 预览图标覆盖层 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                            <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 h-10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-700 leading-tight text-center">1-page summary</span>
                      </div>
                    </div>

                    {/* Topic Q&A */}
                    <div className="flex flex-col items-center">
                      <div
                        onClick={() => setActivePreview('faq')}
                        className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-orange-200 hover:-translate-y-0.5 transition-all relative overflow-hidden group"
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                          {renderCardVisual('faq')}
                        </div>
                        {/* 预览图标覆盖层 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                            <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 h-10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-700 leading-tight text-center">Topic Q&A</span>
                      </div>
                    </div>

                    {/* Writing Structure */}
                    <div className="flex flex-col items-center">
                      <div
                        onClick={() => setActivePreview('strategy')}
                        className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all relative overflow-hidden group"
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                          {renderCardVisual('strategy')}
                        </div>
                        {/* 预览图标覆盖层 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                            <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 h-10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-700 leading-tight text-center">Writing Structure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Revision (1 card) */}
              <div className="lg:flex-[1] min-w-0">
                <h4 className="text-sm font-bold text-slate-800 mb-3">3. Revision</h4>
                <div className="border border-slate-200 rounded-2xl p-4 bg-white lg:h-[180px] flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div
                      onClick={() => setActivePreview('agent')}
                      className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-violet-200 hover:-translate-y-0.5 transition-all relative overflow-hidden group"
                    >
                      <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                        {renderCardVisual('agent')}
                      </div>
                      {/* 预览图标覆盖层 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                          <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 h-10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-slate-700 leading-tight text-center">AI revision agent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: ADD-ON Services */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900 italic">Add-on Services</h3>
              </div>
            </div>

            {/* Add-on Cards Row */}
            <div className="grid grid-cols-2 gap-4 lg:flex lg:gap-4">
              {/* Turnitin Card */}
              <div
                className={`flex flex-col items-center p-4 rounded-2xl border cursor-pointer transition-all select-none ${isTurnitinChecked ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/30' : 'border-slate-200 hover:border-blue-300 bg-white'}`}
              >
                {/* Card Visual - Click for preview */}
                <div
                  onClick={(e) => { e.stopPropagation(); setActivePreview('turnitin'); }}
                  className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden mb-2 cursor-pointer group"
                >
                  <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                    {renderCardVisual('turnitin')}
                  </div>
                  {/* Preview icon overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                      <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  {/* Checkbox overlay */}
                  <div
                    onClick={(e) => { e.stopPropagation(); setIsTurnitinChecked(!isTurnitinChecked); }}
                    className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors cursor-pointer hover:scale-110 ${isTurnitinChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white/80 hover:border-blue-400'}`}
                  >
                    {isTurnitinChecked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                  </div>
                </div>
                {/* Title & Price - Click for toggle */}
                <div onClick={() => setIsTurnitinChecked(!isTurnitinChecked)} className="text-center">
                  <div className="text-xs font-semibold text-slate-700 mb-1">Similarity & AI Report</div>
                  <div className="text-sm font-bold text-slate-900">+$4.99</div>
                </div>
              </div>

              {/* PPT Card - Placeholder */}
              <div className="flex flex-col items-center p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white cursor-pointer transition-all select-none opacity-60">
                {/* Card Visual */}
                <div
                  onClick={() => setActivePreview('ppt')}
                  className="w-[100px] h-[100px] bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden mb-2 cursor-pointer group"
                >
                  <div className="w-full h-full rounded-lg overflow-hidden border border-slate-50">
                    {renderCardVisual('ppt')}
                  </div>
                  {/* Preview icon overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                      <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  {/* Coming soon badge */}
                  <div className="absolute top-1.5 right-1.5 bg-slate-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Soon</div>
                </div>
                {/* Title & Price */}
                <div className="text-xs font-semibold text-slate-700 text-center mb-1">Presentation Slides</div>
                <div className="text-sm font-bold text-slate-400">+$9.99</div>
              </div>
            </div>
          </div>

          {/* SECTION 4: CHECKOUT / TOTAL - Desktop only */}
          <div className="hidden sm:flex flex-col gap-3 mt-auto">
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-1.5">

              {/* All-in-one Package line item */}
              <div className="flex justify-between text-[11px] text-slate-500 font-medium px-1">
                <span>{t.allInOne}</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-slate-300">${BASE_ORIGINAL.toFixed(2)}</span>
                  <span>${BASE_PRICE.toFixed(2)}</span>
                </div>
              </div>

              {isTurnitinChecked && (
                <div className="flex justify-between text-[11px] text-slate-500 font-medium px-1 animate-fade-in-up">
                  <span>{t.addonLabel}</span>
                  <span>+${ADDON_PRICE.toFixed(2)}</span>
                </div>
              )}

              {/* Grand Total */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/60">
                <span className="text-base font-bold text-slate-900">{t.total}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 line-through text-xs font-medium">${totalOriginal}</span>
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">${totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <button
                onClick={onPay}
                className="w-full bg-gradient-to-r from-[#5046e5] to-[#8b5cf6] hover:from-[#4338ca] hover:to-[#7c3aed] text-white text-lg font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>{t.payButton} ${totalPrice}</span>
                <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>

              <div className="flex justify-center items-center gap-1.5 mt-3 opacity-60 grayscale text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                {t.securePayment}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile FAQ Section - Separate from main card */}
        <div className="w-full lg:hidden flex flex-col gap-3">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{t.faq1Title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.faq1Answer}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{t.faq2Title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.faq2Answer}</p>
          </div>

          {/* Social Proof */}
          <div className="mt-2 px-1 flex items-center justify-start gap-3">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F3F7FC] bg-slate-200 overflow-hidden relative">
                  <img src={`https://i.pravatar.cc/100?img=${i + 25}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-600 font-medium leading-tight">
              {t.trustedBy} <br/><span className="font-bold text-blue-600 text-xs">{t.students}</span>.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQ Sidebar - Desktop only */}
        <div className="w-full lg:w-[300px] flex-col gap-3 hidden lg:flex sticky top-24">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{t.faq1Title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.faq1Answer}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{t.faq2Title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.faq2Answer}</p>
          </div>

          {/* Social Proof */}
          <div className="mt-2 px-1 flex items-center justify-start gap-3">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F3F7FC] bg-slate-200 overflow-hidden relative">
                  <img src={`https://i.pravatar.cc/100?img=${i + 25}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-600 font-medium leading-tight">
              {t.trustedBy} <br/><span className="font-bold text-blue-600 text-xs">{t.students}</span>.
            </div>
          </div>
        </div>

      </div>
      </div>

      {/* Mobile Fixed Bottom Pay Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 pt-3 pb-4 sm:hidden z-50 shadow-lg shadow-slate-900/10">
        {/* Price breakdown */}
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex justify-between text-xs text-slate-500">
            <span>{t.allInOne}</span>
            <div className="flex items-center gap-2">
              <span className="line-through text-slate-300">${BASE_ORIGINAL.toFixed(2)}</span>
              <span>${BASE_PRICE.toFixed(2)}</span>
            </div>
          </div>
          {isTurnitinChecked && (
            <div className="flex justify-between text-xs text-slate-500 animate-fade-in-up">
              <span>{t.addonLabel}</span>
              <span>+${ADDON_PRICE.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-1">
            <span className="text-sm font-bold text-slate-900">{t.total}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 line-through text-xs">${totalOriginal}</span>
              <span className="text-2xl font-bold text-slate-900">${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Pay button - full width like desktop */}
        <button
          onClick={onPay}
          className="w-full bg-gradient-to-r from-[#5046e5] to-[#8b5cf6] hover:from-[#4338ca] hover:to-[#7c3aed] text-white text-lg font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>{t.payButton} ${totalPrice}</span>
          <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>

        <div className="flex justify-center items-center gap-1.5 mt-2 opacity-60 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
          {t.securePayment}
        </div>
      </div>
    </>
  )
}

export default OrderConfirmation;
