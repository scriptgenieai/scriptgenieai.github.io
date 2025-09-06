# ScriptGenie 官方网站部署指南

本文档提供了将 ScriptGenie 官方网站部署到 GitHub Pages 的详细步骤。

## 目录

1. [准备工作](#准备工作)
2. [GitHub Pages 部署](#github-pages-部署)
   - [自动部署](#自动部署)
   - [手动部署](#手动部署)
3. [自定义域名配置](#自定义域名配置)
4. [常见问题](#常见问题)

## 准备工作

在部署之前，请确保：

1. 你已经有一个 GitHub 账号
2. 你已经创建了一个用于托管网站的 GitHub 仓库
3. 你已经将本项目的所有文件添加到该仓库中

```bash
# 初始化 Git 仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始化 ScriptGenie 官方网站"

# 添加远程仓库
git remote add origin https://github.com/your-username/scriptgenie-website.git

# 推送到远程仓库
git push -u origin main
```

## GitHub Pages 部署

### 自动部署

本项目已经配置了 GitHub Actions 工作流，可以自动部署到 GitHub Pages。

1. 确保 `.github/workflows/deploy.yml` 文件存在于你的仓库中
2. 将代码推送到 GitHub 仓库的 `main` 分支
3. GitHub Actions 会自动构建并部署网站
4. 部署完成后，可以通过 `https://your-username.github.io/scriptgenie-website` 访问

你可以在 GitHub 仓库的 Actions 标签页中查看部署进度和状态。

### 手动部署

如果你想手动部署，可以按照以下步骤操作：

1. 在 GitHub 仓库中，进入 Settings > Pages
2. 在 Source 部分，选择 "Deploy from a branch"
3. 选择 `main` 分支和 `/` (root) 目录
4. 点击 "Save" 按钮

几分钟后，你的网站将被部署到 GitHub Pages，并可通过 `https://your-username.github.io/scriptgenie-website` 访问。

## 自定义域名配置

如果你想使用自定义域名，可以按照以下步骤操作：

1. 确保 `CNAME` 文件存在于你的仓库中，并包含你的自定义域名
2. 在 GitHub 仓库中，进入 Settings > Pages
3. 在 Custom domain 部分，输入你的域名
4. 点击 "Save" 按钮
5. 勾选 "Enforce HTTPS" 选项（推荐）

在你的域名注册商处，添加以下 DNS 记录：

- 如果使用 apex 域名 (example.com)：
  ```
  A     @     185.199.108.153
  A     @     185.199.109.153
  A     @     185.199.110.153
  A     @     185.199.111.153
  ```

- 如果使用子域名 (www.example.com)：
  ```
  CNAME  www   your-username.github.io
  ```

DNS 更改可能需要几小时才能生效。

## 常见问题

### 网站部署后无法访问

- 检查 GitHub Actions 工作流是否成功完成
- 确认你的仓库设置中已启用 GitHub Pages
- 检查你的自定义域名 DNS 配置是否正确

### 样式或图片无法加载

- 确保所有资源路径使用相对路径
- 检查 CSS 和 JavaScript 文件是否正确引用
- 确认图片文件格式和路径是否正确

### 自定义域名配置问题

- 确保 CNAME 文件中只包含域名，没有协议前缀（如 http:// 或 https://）
- 等待 DNS 更改生效（最多可能需要 48 小时）
- 使用 [DNS Checker](https://dnschecker.org/) 验证 DNS 记录是否已正确传播

### 网站在移动设备上显示异常

- 使用 `test-responsive.html` 页面测试不同设备上的显示效果
- 调整 CSS 样式以适应不同屏幕尺寸

如果你遇到其他问题，请查阅 [GitHub Pages 文档](https://docs.github.com/en/pages) 或在项目仓库中提交 Issue。