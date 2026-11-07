# 手动上传部署到 GitHub Pages（图文版，跟着做）

本教程配合 `dist/` 构建产物使用。全程在浏览器完成，不需要会命令行。

---

## 第一步：新建一个 GitHub 仓库

1. 打开 https://github.com → 登录。
2. 点右上角 **「+」→ New repository**。
3. 仓库名填：
   - **推荐**：`你的用户名.github.io`（这是个人主页仓库，地址最干净，就是 `https://你的用户名.github.io/`）
   - 或者任意名字（如 `portfolio`），地址会是 `https://你的用户名.github.io/portfolio/`
4. 勾选 **Public**（免费 Pages 必须公开仓库）。
5. 不勾选 "Add a README"（我们要上传整个 dist 内容）。
6. 点 **Create repository**。

---

## 第二步：本地构建

在你的电脑上打开 `portfolio-site` 文件夹，运行：

```bash
npm run build
```

构建成功后会生成一个 `dist/` 文件夹，里面就是最终要上传的文件（index.html + assets/ + 404.html + public 里的图片）。

---

## 第三步：把 dist 里的文件上传到 GitHub

1. 回到刚才新建的仓库页面。
2. 点 **「Add file」→「Upload files」**。
3. 打开本地的 `dist/` 文件夹，**全选里面的所有内容**（包括 `assets` 子文件夹、`index.html`、`404.html`、`tutorials` 文件夹），全部拖进网页的上传框。
4. 底部填一句提交信息，例如 `upload site`。
5. 点 **Commit changes**。

> 注意：是要上传 dist **里面**的东西，不要把 dist 文件夹本身拖进去（那样会变成 `/dist/index.html` 而不是 `/index.html`）。

---

## 第四步：开启 GitHub Pages

1. 仓库页 → 顶部 **Settings**（设置）。
2. 左侧菜单找 **Pages**。
3. "Build and deployment" 区域，Source 选 **Deploy from a branch**。
4. Branch 选 **main**，Folder 选 **/(root)**。
5. 点 **Save**。

---

## 第五步：访问你的网站

- 主页仓库：`https://你的用户名.github.io/`
- 普通仓库：`https://你的用户名.github.io/仓库名/`

第一次部署要等几分钟，页面顶部会有 "Your site is live" 提示。

---

## 常见问题

**Q：打开是空白页或 404？**
- 检查是否把 dist **里面**的文件传上去了（不是 dist 文件夹本身）。
- 确认 Pages 的 Branch 选了 main、Folder 选了 root。

**Q：图片加载不出来？**
- 确认 `public/tutorials/` 里的图片也跟着 dist 一起传上去了（构建时 Vite 会自动复制）。

**Q：以后怎么更新？**
- 改完 `src/` 里的内容 → 重新 `npm run build` → 回到 GitHub 用 "Add file / Upload files" 把新的 dist 内容再传一遍（同名文件会被覆盖）→ 等几分钟生效。
