#!/bin/bash

# ScriptGenie 官方网站部署脚本
# 此脚本帮助将网站部署到 GitHub Pages

echo "===== ScriptGenie 官方网站部署脚本 ====="
echo "此脚本将帮助你将网站部署到 GitHub Pages"
echo ""

# 检查 Git 是否安装
if ! command -v git &> /dev/null; then
    echo "错误: Git 未安装，请先安装 Git"
    exit 1
fi

# 检查当前目录是否为网站根目录
if [ ! -f "index.html" ]; then
    echo "错误: 当前目录不是网站根目录，请先切换到网站根目录"
    exit 1
fi

# 检查是否已初始化 Git 仓库
if [ ! -d ".git" ]; then
    echo "初始化 Git 仓库..."
    git init
    echo "Git 仓库初始化完成"
fi

# 询问 GitHub 用户名和仓库名
read -p "请输入你的 GitHub 用户名: " github_username
read -p "请输入仓库名 (例如: scriptgenie-website): " repo_name

# 检查远程仓库是否已配置
remote_url=$(git config --get remote.origin.url)
if [ -z "$remote_url" ]; then
    echo "配置远程仓库..."
    git remote add origin "https://github.com/$github_username/$repo_name.git"
    echo "远程仓库配置完成"
fi

# 添加所有文件到 Git
echo "添加文件到 Git..."
git add .

# 提交更改
echo "提交更改..."
git commit -m "更新 ScriptGenie 官方网站"

# 推送到 GitHub
echo "推送到 GitHub..."
git push -u origin main

echo ""
echo "===== 部署完成 ====="
echo "你的网站已成功推送到 GitHub 仓库"
echo "GitHub Actions 将自动部署网站到 GitHub Pages"
echo "几分钟后，你可以通过以下链接访问你的网站:"
echo "https://$github_username.github.io/$repo_name"

# 检查是否有自定义域名
if [ -f "CNAME" ]; then
    custom_domain=$(cat CNAME)
    echo "或者通过你的自定义域名访问: $custom_domain"
fi

echo ""
echo "如需更多信息，请参阅 DEPLOYMENT.md 文件"