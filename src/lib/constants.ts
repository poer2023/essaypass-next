
export const OPTIONS = {
  en: {
    essayTypes: [
      "Essay", "Research Paper", "Case Study", "Coursework", "Term Paper",
      "Dissertation", "Report", "Review", "Speech", "Presentation"
    ],
    academicLevels: [
      "High School", "Undergraduate (Years 1-2)", "Bachelor's",
      "Master's", "Doctoral"
    ],
    wordCounts: [
      "300 words", "500 words", "1000 words", "1600 words",
      "2000 words", "3000 words", "5000+ words"
    ],
    languages: [
      "English(US)", "English(UK)", "Spanish", "French",
      "German", "Chinese (Simplified)", "Portuguese"
    ],
    citationStyles: [
      "APA", "MLA", "Chicago", "Harvard", "IEEE", "Vancouver"
    ]
  },
  zh: {
    essayTypes: [
      "论文 (Essay)", "研究论文 (Research Paper)", "案例研究 (Case Study)", "课程作业 (Coursework)", "学期论文 (Term Paper)",
      "学位论文 (Dissertation)", "报告 (Report)", "评论 (Review)", "演讲稿 (Speech)", "演示文稿 (Presentation)"
    ],
    academicLevels: [
      "高中", "本科 (1-2年级)", "本科 (学士)",
      "硕士", "博士"
    ],
    wordCounts: [
      "300 字", "500 字", "1000 字", "1600 字",
      "2000 字", "3000 字", "5000+ 字"
    ],
    languages: [
      "英语 (美式)", "英语 (英式)", "西班牙语", "法语",
      "德语", "简体中文", "葡萄牙语"
    ],
    citationStyles: [
      "APA", "MLA", "Chicago", "Harvard", "IEEE", "Vancouver"
    ]
  }
};

export const UI_TEXT = {
  en: {
    hero: {
      title: "Submission-Ready Academic Results",
      subtitle: "What You Get After Generation"
    },
    carousel: {
      title: "Final Deliverables",
      anchor: "Not a draft. Not a sample. It's the one you submit.",
      cards: [
        { id: 1, title: "Complete Academic Essay", tag: "Submission-Ready" },
        { id: 2, title: "Verified References", tag: "Matched to Text" },
        { id: 3, title: "Summary & FAQs", tag: "Key Points Included" },
        { id: 4, title: "Writing Strategy", tag: "Clear Structure & Logic" },
      ]
    },
    nav: {
      essayWriter: "AI Essay Writer",
      detector: "AI Detector",
      blog: "Blog"
    },
    autoFill: {
      title: "AI Smart Analysis",
      subtitle: "Paste or upload assignment requirements to auto-fill the form.",
      placeholder: "Paste prompt/rubric/syllabus to auto-fill the form...",
      uploadTip: "Upload Requirements",
      uploadReq: "Assignment requirements",
      uploadTooltip: "Upload your assignment brief, rubric, or syllabus. We'll auto-fill the form for you. (1 file max)",
      submit: "Analyze",
      reanalyze: "Re-analyze",
      replaceAll: "Replace All",
      fillsHint: "Fills: Type · Level · Topic · Instructions",
      loading: "Analyzing...",
      successTitle: "Filled",
      collapsedMessage: "Analysis complete. Form updated.",
      viewSummary: "View sourcing",
      edit: "Edit",
      sourceLabel: "Source Fragment",
      extractedLabel: "Current Instruction",
      statusLabel: "Status"
    },
    form: {
      typeLabel: "Type",
      levelLabel: "Academic level",
      topicLabel: "Topic or Name",
      topicPlaceholder: "Assignment's topic or name",
      instructionsLabel: "Instructions & Notes",
      reqSectionTitle: "Editor",
      missingHint: "Templates:",
      addConstraints: "Add constraints",
      missingSuggestions: ["Word count", "Citation style", "References", "Deadline"],
      attachRef: "Attach references",
      attachRefTooltip: "Upload academic papers, reading lists, or course materials as references for your essay.",
      refListLabel: "Reference materials",
      refDisclaimer: "For reference only. Won't overwrite instructions.",
      refDisclaimerShort: "Reference only. Won't overwrite.",
      manage: "Manage",
      insertSummary: "Insert summary",
      outlineLabel: "Outline",
      outlineAI: "AI Smart Outline",
      outlineCustom: "Custom Outline",
      wordCountLabel: "Word Count",
      languageLabel: "Language",
      citationLabel: "Citation Style",
      figuresLabel: "Figures & Equations",
      extraCharts: "Include Charts&Tables",
      extraFormulas: "Include Formulas",
      submitButton: "Get My Paper",
      submitLoading: "Writing...",
      resultTitle: "Generated Result"
    }
  },
  zh: {
    hero: {
      title: "可直接提交的学术成果",
      subtitle: "生成即成品，绝非仅供参考"
    },
    carousel: {
      title: "最终交付内容",
      anchor: "不是草稿，不是示例。是您可以直接提交的成品。",
      cards: [
        { id: 1, title: "完整的学术论文", tag: "可直接提交" },
        { id: 2, title: "验证过的参考文献", tag: "与正文对应" },
        { id: 3, title: "摘要与常见问题", tag: "包含关键点" },
        { id: 4, title: "写作策略说明", tag: "结构逻辑清晰" },
      ]
    },
    nav: {
      essayWriter: "AI 论文写作",
      detector: "AI 检测器",
      blog: "博客"
    },
    autoFill: {
      title: "AI 智能分析",
      subtitle: "粘贴或上传作业要求以自动填充表单。",
      placeholder: "在此粘贴题目/评分标准/大纲以自动填充...",
      uploadTip: "上传要求",
      uploadReq: "作业要求",
      uploadTooltip: "上传老师发布的作业要求、评分标准或教学大纲，AI 将自动填充表单。(限1份)",
      submit: "智能分析",
      reanalyze: "重新分析",
      replaceAll: "覆盖全部",
      fillsHint: "自动填充：类型 · 等级 · 题目 · 说明",
      loading: "分析中...",
      successTitle: "已填充",
      collapsedMessage: "分析完成，表单已更新",
      viewSummary: "查看来源",
      edit: "编辑",
      sourceLabel: "原文片段",
      extractedLabel: "当前说明",
      statusLabel: "状态"
    },
    form: {
      typeLabel: "类型",
      levelLabel: "学术等级",
      topicLabel: "题目或名称",
      topicPlaceholder: "作业的题目或名称",
      instructionsLabel: "写作说明与备注",
      reqSectionTitle: "编辑器",
      missingHint: "插入模板:",
      addConstraints: "添加限制条件",
      missingSuggestions: ["字数要求", "引用格式", "参考文献", "截止日期"],
      attachRef: "添加参考资料",
      attachRefTooltip: "上传学术论文、老师提供的阅读清单或课程资料，作为写作参考。",
      refListLabel: "参考资料",
      refDisclaimer: "仅供写作参考，不会覆盖下方说明。",
      refDisclaimerShort: "仅供参考，不覆盖说明。",
      manage: "管理",
      insertSummary: "插入摘要",
      outlineLabel: "大纲",
      outlineAI: "AI 智能大纲",
      outlineCustom: "自定义大纲",
      wordCountLabel: "字数",
      languageLabel: "语言",
      citationLabel: "引用格式",
      figuresLabel: "图表与公式",
      extraCharts: "包含图表",
      extraFormulas: "包含公式",
      submitButton: "生成我的论文",
      submitLoading: "正在写作...",
      resultTitle: "生成结果"
    }
  }
};

export const ESSAY_TYPES = OPTIONS.en.essayTypes;
export const ACADEMIC_LEVELS = OPTIONS.en.academicLevels;
export const WORD_COUNTS = OPTIONS.en.wordCounts;
export const LANGUAGES = OPTIONS.en.languages;
export const CITATION_STYLES = OPTIONS.en.citationStyles;
