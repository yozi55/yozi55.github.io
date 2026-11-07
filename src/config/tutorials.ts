/**
 * 教程模块配置 —— 你以后添加教程只需往 tutorials 数组追加条目。
 *
 * 两种模式：
 * - 纯文字教程：textSteps 写文字步骤数组，steps 留空
 * - 图文教程：steps 里每张图配一句说明
 */

export interface TutorialStep {
  /** 图片文件路径，相对于 public/ 目录，例如 "tutorials/step1.jpg" */
  image: string;
  /** 图片下方的说明文字，一两句话即可 */
  caption: string;
}

export interface Tutorial {
  id: string;
  title: string;
  /** 一句话简介 */
  summary: string;
  /** 正文（可多段，段落之间用 \n\n 分隔） */
  intro: string;
  /** 图文步骤；纯文字教程传空数组 */
  steps: TutorialStep[];
  /** 纯文字步骤数组（每条一段文字）；图文教程留空 */
  textSteps?: string[];
  /** 可选：结尾备注（例如注意事项、常见错误） */
  note?: string;
  /** 教程涉及的外部链接（资源来源等），按顺序展示在教程末尾 */
  resources?: { label: string; url: string }[];
}

export const tutorials: Tutorial[] = [
  {
    id: "sc-mode-switch",
    title: "游戏内切换模式",
    summary: "省去每次测试 mod 都要回主菜单重选模式的麻烦。",
    intro:
      "这个 mod 让你在 Survivalcraft 游戏内直接切换模式，不用每次测试 mod 都点出主页面重新选模式，省掉反复切换的步骤，mod 测试快很多。",
    steps: [],
    textSteps: ["把 mod 放进 Survivalcraft 的 mods 文件夹，进游戏后按 mod 内设定的按键即可切换。"],
    note: undefined,
  },
];
