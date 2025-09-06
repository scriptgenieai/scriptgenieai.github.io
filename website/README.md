# ScriptGenie 官方网站

这是 ScriptGenie Chrome 扩展的官方网站，展示了产品的核心功能和技术特点。

## 网站内容

- 产品介绍和核心功能
- 应用场景展示
- 技术栈说明
- 下载和安装指南

## 本地开发

由于这是一个纯静态网站，你可以直接在浏览器中打开 `index.html` 文件进行预览。

```bash
# 克隆仓库
git clone https://github.com/your-username/scriptgenie-website.git
cd scriptgenie-website

# 使用任意静态服务器运行
python -m http.server 8000
# 或者
npx serve
```

然后在浏览器中访问 `http://localhost:8000`。

## 部署到 GitHub Pages

本网站配置了 GitHub Actions 工作流，可以自动部署到 GitHub Pages。

### 自动部署

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. GitHub Actions 会自动构建并部署网站
3. 部署完成后，可以通过 `https://your-username.github.io/scriptgenie-website` 访问

### 手动部署

如果你想手动部署，可以按照以下步骤操作：

1. 在 GitHub 仓库中，进入 Settings > Pages
2. 在 Source 部分，选择 GitHub Actions
3. 点击 "Configure" 按钮
4. 选择 "Deploy from a branch"
5. 选择 `main` 分支和 `/` (root) 目录
6. 点击 "Save" 按钮

## 自定义域名

如果你想使用自定义域名，可以按照以下步骤操作：

1. 在 GitHub 仓库中，进入 Settings > Pages
2. 在 Custom domain 部分，输入你的域名
3. 点击 "Save" 按钮
4. 在你的域名注册商处，添加以下 DNS 记录：
   - 如果使用 apex 域名 (example.com)：添加 A 记录，指向 GitHub Pages 的 IP 地址
   - 如果使用子域名 (www.example.com)：添加 CNAME 记录，指向 `your-username.github.io`

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。