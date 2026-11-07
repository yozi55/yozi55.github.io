/**
 * 全站个人信息配置 —— 修改这里即可更新整个网站。
 * 新增项目只需在 projects 数组中追加条目。
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  role: string;
  details: string[];
  stack: string[];
  link?: string;
  featured?: boolean;
}

export interface Interest {
  title: string;
  note: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  /** 可点外链；QQ 等没有个人主页的渠道留空，页面会渲染为可复制纯文本 */
  href?: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  email: string;
  about: {
    lead: string;
    paragraphs: string[];
    currently: string[];
  };
  projects: Project[];
  interests: Interest[];
  socials: SocialLink[];
  footerNote: string;
}

export const site: SiteConfig = {
  // 填写你的姓名/昵称（这里用 GitHub 用户名占位，请替换）
  name: "Yozi",
  role: "正在学习 C# 与网页开发的中学生",
  tagline: "喜欢亲手把想法变成能运行的东西。",
  location: "中国",
  timezone: "Asia/Shanghai",
  email: "2359690388@qq.com",
  about: {
    lead: "一个对技术、英语和自由生活有强烈好奇心的中学生。",
    paragraphs: [
      "我目前正在学习 C#，用 Visual Studio 2022 写第一个自己的程序，并打算通过给 Survivalcraft 做模组来真正理解编程——因为只有把东西做出来跑起来，才算学会。",
      "除了代码，我在系统地学英语（用可理解性输入的方式），研究未来去澳大利亚、新西兰或欧洲生活或学习的可能性。我相信多一种能力就多一种选择权，所以我尽量不只在课本里学，而是亲手做网站、做模组，把想法落地。",
    ],
    currently: [
      "学习 C# 与网页开发，给自己做 Survivalcraft 模组",
      "练习英语听力，追求接近母语者的输入质量",
    ],
  },
  // 只列你真实做过的项目
  projects: [
    {
      id: "survivalcraft-mod",
      title: "游戏内切换模式",
      subtitle: "Survivalcraft 模组 —— 免回主菜单切模式",
      year: "2026",
      description:
        "一个为 Survivalcraft 写的 C# 模组：在游戏内直接切换模式，不再需要每次测试 mod 都点出主页面重新选模式。让 mod 开发测试循环更短、更顺。",
      role: "设计与开发",
      details: [
        "目标：把「测试 mod → 回主菜单 → 重选模式」的来回操作，压缩成游戏内一键切换",
        "C# 实现，跑在 Survivalcraft 的 mod 框架里",
        "自用工具型 mod，专注减少测试期间的反复操作",
      ],
      stack: ["C#", "Survivalcraft mod"],
      link: "https://test.suancaixianyu.cn/#/postDetails/2002",
      featured: true,
    },
  ],
  interests: [
    {
      title: "编程与模组",
      note: "C#、Visual Studio、Survivalcraft 与 SCAPI —— 写代码是为了做出能跑的东西。",
    },
    {
      title: "英语学习",
      note: "可理解性输入、接近母语者式的听力。词汇要在真实语境里记，不想反复背已经会的基础词。",
    },
    {
      title: "未来与迁移",
      note: "研究澳大利亚、新西兰、欧洲的学习与签证路径。多一种能力，就多一种选择自己生活的可能。",
    },
    {
      title: "思维与心理学",
      note: "阿德勒、自我反思与对比较心理的觉察。我想知道焦虑从哪里来，怎么把情绪转化为选择。",
    },
  ],
  socials: [
    {
      label: "GitHub",
      handle: "yozi55",
      href: "https://github.com/yozi55",
    },
    {
      label: "Telegram",
      handle: "niaozda",
      href: "https://t.me/niaozda",
    },
    {
      label: "QQ",
      handle: "2359690388",
      // QQ 没有可公开访问的个人主页，留空 => 页面渲染为可点击复制
    },
  ],
  footerNote: "一个正在学习的中学生做的个人空间 —— 没有使用模板，所有页面自己搭。",
};
