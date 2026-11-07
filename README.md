# Personal Portfolio

现代极简风格的个人数字空间。React + TypeScript + Tailwind + Motion。

## 本地运行

```bash
npm install
npm run dev        # 开发服务器 http://localhost:5173
npm run build      # 类型检查 + 构建到 dist/
npm run preview    # 预览构建产物
```

## 自定义内容

- `src/config/site.ts` — 姓名、标语、邮箱、社交、项目、兴趣。
- `src/config/tutorials.ts` — 教程条目。图片放在 `public/tutorials/`。
- `src/pages/*.tsx` — 各页面排版与视觉细节。

## 部署到 GitHub Pages（手动上传，最省事）

构建产物在 `dist/` 里。两种做法任选其一：

### 方式 A：网页直接上传（最简单，适合小文件）

1. 在 GitHub 新建仓库，例如 `username.github.io`（主页仓库）或任意名字。
2. 运行 `npm run build`。
3. 进入仓库网页 → 点 “Add file → Upload files”。
4. 把 `dist/` 文件夹里的**所有内容**（包括 `assets` 子文件夹、`index.html`）全部拖进去，提交。
5. 打开 `https://你的用户名.github.io/`（主页仓库）或 `https://你的用户名.github.io/仓库名/`。

> 本项目已配置 `base: "./"`（相对路径），所以放在任何子目录都不会 404，这是手动上传模式最关键的一步。

### 方式 B：GitHub Pages 设置

仓库 Settings → Pages → Source 选 **Deploy from a branch** → 选 `main` 分支的 `/ (root)` 目录 → Save。
上传 `dist/` 里的文件到仓库根目录即可。
