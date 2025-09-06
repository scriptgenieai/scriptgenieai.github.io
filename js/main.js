document.addEventListener('DOMContentLoaded', function() {
  // 初始化粒子背景
  initParticles();
  
  // 导航栏滚动效果
  initScrollEffect();
  
  // 检测浏览器语言并初始化语言设置
  initLanguage();
  
  // 语言切换功能
  initLanguageSwitch();
  
  // 初始化联系我们弹窗样式
  initContactPopup();
});

// 显示联系信息弹窗
function showContactInfo() {
  // 检查是否已存在弹窗，如果存在则先移除
  const existingModal = document.querySelector('.contact-modal');
  if (existingModal) {
    document.body.removeChild(existingModal);
    document.removeEventListener('click', closeModal);
  }
  
  const currentLang = document.documentElement.lang || 'zh';
  
  // 获取当前语言的翻译
  const currentTranslations = window.currentTranslations || {};
  
  const title = currentTranslations.contact_modal_title || (currentLang === 'zh' ? '联系我们' : 'Contact Us');
  
  const emailAddress = 'scriptgenieai@outlook.com';
  
  // 创建邮箱链接元素
  const emailLink = document.createElement('a');
  emailLink.href = 'mailto:' + emailAddress;
  emailLink.className = 'email-link';
  emailLink.title = currentLang === 'zh' ? '点击打开邮件客户端' : 'Click to open mail client';
  emailLink.innerHTML = '✉️ ' + emailAddress;
  
  // 创建复制按钮
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.innerHTML = '<i class="copy-icon">📋</i>';
  copyButton.title = currentLang === 'zh' ? '复制邮箱地址' : 'Copy email address';
  
  // 添加复制功能
  copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText(emailAddress).then(function() {
      // 复制成功，更改图标
      copyButton.innerHTML = '<i class="copy-icon">✓</i>';
      copyButton.title = currentLang === 'zh' ? '已复制' : 'Copied';
      
      // 3秒后恢复原图标
      setTimeout(function() {
        copyButton.innerHTML = '<i class="copy-icon">📋</i>';
        copyButton.title = currentLang === 'zh' ? '复制邮箱地址' : 'Copy email address';
      }, 3000);
    });
  });
  
  // 创建消息容器
  const messageContainer = document.createElement('div');
  messageContainer.innerHTML = currentLang === 'zh' ? '请通过以下邮箱联系我们：<br>' : 'Please contact us via email:<br>';
  
  // 创建邮箱容器，包含邮箱链接和复制按钮
  const emailContainer = document.createElement('div');
  emailContainer.className = 'email-container';
  
  const strong = document.createElement('strong');
  strong.appendChild(emailLink);
  
  emailContainer.appendChild(strong);
  emailContainer.appendChild(copyButton);
  
  messageContainer.appendChild(emailContainer);
  
  console.log('创建了邮箱链接元素:', emailLink);
  
  // 创建弹窗元素
  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.innerHTML = `
    <div class="contact-modal-content">
      <div class="contact-modal-header">
        <h3>${title}</h3>
        <span class="contact-modal-close">&times;</span>
      </div>
      <div class="contact-modal-body">
        <p></p>
      </div>
    </div>
  `;
  
  // 将消息容器添加到弹窗中
  const messageElement = modal.querySelector('.contact-modal-body p');
  messageElement.appendChild(messageContainer);
  
  // 添加到页面
  document.body.appendChild(modal);
  
  // 点击弹窗外部关闭
  function closeModal(e) {
    if (e.target === modal) {
      removeModal();
    }
  }
  
  // 统一的关闭弹窗函数
  function removeModal() {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal);
      document.removeEventListener('click', closeModal);
    }
  }
  
  // 添加关闭按钮事件
  const closeBtn = modal.querySelector('.contact-modal-close');
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    removeModal();
  });
  
  // 延迟添加外部点击监听器，避免立即触发
  setTimeout(function() {
    document.addEventListener('click', closeModal);
  }, 100);
  
  // 确保弹窗可以立即接收点击事件
   modal.style.pointerEvents = 'auto';
}

// 初始化联系我们弹窗样式
function initContactPopup() {
  // 创建样式
  const style = document.createElement('style');
  style.textContent = `
    .contact-modal {
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .contact-modal-content {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 500px;
      animation: modalFadeIn 0.3s ease-out;
    }
    
    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .contact-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }
    
    .contact-modal-header h3 {
      margin: 0;
      color: var(--primary-color);
    }
    
    .email-container {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 10px 0 !important;
    }
    
    .email-link {
      color: #007bff !important;
      text-decoration: none !important;
      transition: all 0.2s ease !important;
      padding: 5px 10px !important;
      border-radius: 4px !important;
      background-color: rgba(0, 123, 255, 0.1) !important;
      display: inline-flex !important;
      align-items: center !important;
      margin: 5px 0 !important;
      font-weight: 500 !important;
      position: relative !important;
      overflow: hidden !important;
      cursor: pointer !important;
    }
    
    .copy-button {
      background: none !important;
      border: none !important;
      cursor: pointer !important;
      margin-left: 8px !important;
      padding: 5px !important;
      border-radius: 4px !important;
      transition: all 0.2s ease !important;
      background-color: rgba(0, 123, 255, 0.1) !important;
    }
    
    .copy-button:hover {
      background-color: rgba(0, 123, 255, 0.2) !important;
    }
    
    .copy-icon {
      font-style: normal !important;
      font-size: 16px !important;
    }
    
    .email-link:active {
      transform: scale(0.98) !important;
      background-color: rgba(0, 123, 255, 0.3) !important;
    }
    
    .email-link::after {
      content: '' !important;
      position: absolute !important;
      width: 100% !important;
      height: 100% !important;
      top: 0 !important;
      left: 0 !important;
      pointer-events: none !important;
      background-image: radial-gradient(circle, #fff 10%, transparent 10.01%) !important;
      background-repeat: no-repeat !important;
      background-position: 50% !important;
      transform: scale(10, 10) !important;
      opacity: 0 !important;
      transition: transform .3s, opacity .5s !important;
    }
    
    .email-link:active::after {
      transform: scale(0, 0) !important;
      opacity: .3 !important;
      transition: 0s !important;
    }
    
    .email-link:hover {
      color: #0056b3 !important;
      text-decoration: none !important;
      background-color: rgba(0, 123, 255, 0.2) !important;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
      transform: translateY(-1px) !important;
    }
    
    .click-hint {
      display: block !important;
      font-size: 0.85em !important;
      color: #6c757d !important;
      margin-top: 5px !important;
      font-style: italic !important;
    }
    
    .contact-modal-close {
      font-size: 24px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      color: #aaa !important;
      transition: color 0.2s !important;
    }
    
    .contact-modal-close:hover {
      color: var(--primary-color) !important;
    }
    
    .contact-modal-body {
      padding: 20px !important;
      text-align: center !important;
    }
    
    .contact-modal-body p {
      margin: 0 !important;
      line-height: 1.6 !important;
    }
  `;
  
  // 添加到页面
  document.head.appendChild(style);
  console.log('联系我们弹窗样式已初始化');
}

// 初始化语言设置
function initLanguage() {
  // 获取浏览器语言
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  
  // 默认语言为中文
  let currentLang = 'zh';
  
  // 检测浏览器语言
  // 如果浏览器语言以en开头或是英语变种，则设置为英文
  if (browserLang.startsWith('en') || browserLang === 'en-us' || browserLang === 'en-gb' || 
      browserLang === 'en-au' || browserLang === 'en-ca' || browserLang === 'en-nz' || 
      browserLang === 'en-ie' || browserLang === 'en-za' || browserLang === 'en-jm' || 
      browserLang === 'en-bz' || browserLang === 'en-tt') {
    currentLang = 'en';
  }
  // 如果浏览器语言以zh开头或是中文变种，则设置为中文
  else if (browserLang.startsWith('zh') || browserLang === 'zh-cn' || browserLang === 'zh-tw' || 
           browserLang === 'zh-hk' || browserLang === 'zh-sg' || browserLang === 'zh-mo') {
    currentLang = 'zh';
  }
  // 其他语言默认使用中文
  
  // 加载对应语言
  loadTranslations(currentLang);
  
  // 设置语言按钮状态
  const langButtons = document.querySelectorAll('.language-switch button');
  langButtons.forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 设置html的lang属性
  document.documentElement.lang = currentLang;
  
  console.log('Browser language detected:', browserLang, 'Setting language to:', currentLang);
}

// 初始化粒子背景
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
}

// 导航栏滚动效果
function initScrollEffect() {
  const header = document.querySelector('.header');
  const scrollThreshold = 50;
  
  // 确保初始状态是正确的
  if (window.scrollY <= scrollThreshold) {
    header.style.boxShadow = 'none';
    header.style.background = 'rgba(26, 26, 46, 0.9)';
  }
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      // 当滚动时，导航链接和语言切换按钮需要变成深色
      document.querySelectorAll('.nav a, .language-switch button').forEach(el => {
        el.style.color = 'var(--dark-color)';
      });
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(26, 26, 46, 0.9)';
      // 当回到顶部时，导航链接和语言切换按钮需要变成浅色
      document.querySelectorAll('.nav a, .language-switch button').forEach(el => {
        el.style.color = 'var(--text-light)';
      });
    }
  });
  
  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        // 检查是否是联系我们链接
        if (this.getAttribute('data-i18n') === 'contact_us') {
          console.log('联系我们链接被点击');
          showContactInfo();
          return;
        }
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 注释掉重复的联系我们链接绑定，避免创建多个遮罩层
  // document.querySelectorAll('a[data-i18n="contact_us"]').forEach(link => {
  //   link.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     console.log('联系我们链接被点击（直接绑定）');
  //     showContactInfo();
  //   });
  // });
  
  // 联系我们弹窗已在DOMContentLoaded事件中初始化
}

// 语言切换功能
function initLanguageSwitch() {
  const langButtons = document.querySelectorAll('.language-switch button');
  
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 移除所有按钮的active类
      langButtons.forEach(btn => btn.classList.remove('active'));
      
      // 为当前点击的按钮添加active类
      this.classList.add('active');
      
      // 获取语言代码
      const lang = this.getAttribute('data-lang');
      
      // 加载对应语言的翻译
      loadTranslations(lang);
      
      // 设置html的lang属性
      document.documentElement.lang = lang;
    });
  });
}

// 加载翻译内容的函数
function loadTranslations(lang) {
  // 预定义的翻译内容
  const translations = {
    'zh': {
      'page_title': 'ScriptGenie AI - AI驱动的浏览器脚本生成器',
      'page_description': 'ScriptGenie AI是一个革命性的Chrome扩展程序，它将AI大语言模型的强大能力与浏览器脚本开发相结合，让普通用户无需编程知识即可创建功能强大的浏览器自动化脚本。',
      'nav_features': '核心功能',
      'nav_use_cases': '应用场景',
      'nav_download': '立即下载',
      'nav_docs': '文档',
      'hero_title': 'AI驱动的浏览器脚本生成器',
      'hero_subtitle': '让AI为您创建强大的浏览器自动化脚本，无需编程知识',
      'btn_download': '立即下载',
      'btn_learn_more': '了解更多',
      'features_title': '核心功能',
      'use_cases_title': '适用场景',
      'download_title': '立即下载',
      'installation_guide': '安装指南',
      'product': '产品',
      'resources': '资源',
      'documentation': '文档',
      'tutorials': '教程',
      'api_reference': 'API参考',
      'faq': '常见问题',
      'about_us': '关于我们',
      'team': '团队',
      'contact_us': '联系我们',
      'privacy_policy': '隐私政策',
      'terms_of_use': '使用条款',
      'copyright': '© 2024 ScriptGenie AI. 保留所有权利。',
      // 核心功能卡片
      'feature_ai_gen': 'AI智能生成',
      'feature_ai_gen_desc': '支持OpenAI、Claude、DeepSeek等多种AI模型，通过自然语言描述生成专业脚本',
      'feature_editor': '专业编辑器',
      'feature_editor_desc': '集成Monaco Editor，提供语法高亮、智能提示、代码折叠等专业功能',
      'feature_version': '版本管理',
      'feature_version_desc': '专业级快照系统，支持版本回退和重要版本固定',
      'feature_matching': '兼容篡改猴',
      'feature_matching_desc': '完整兼容Tampermonkey脚本系统，支持URL匹配规则和GM API函数',
      'feature_i18n': '国际化支持',
      'feature_i18n_desc': '支持多语言扩展',
      'feature_security': '安全可靠',
      'feature_security_desc': '本地存储，API Key加密保护，用户数据安全',
      // 应用场景卡片
      'use_case_automation': '网页自动化',
      'use_case_automation_desc': '自动填表、数据抓取、页面监控',
      'use_case_ux': '用户体验优化',
      'use_case_ux_desc': '去广告、样式调整、功能增强',
      'use_case_productivity': '工作效率提升',
      'use_case_productivity_desc': '重复操作自动化、批量处理',
      'use_case_learning': '学习研究',
      'use_case_learning_desc': '网页行为分析、脚本开发学习',
      // 安装步骤
      'install_step1': '下载扩展程序',
      'install_step2': '打开Chrome扩展管理页面',
      'install_step3': '启用开发者模式',
      'install_step4': '加载已解压的扩展程序',
      // 联系我们弹窗
      'contact_modal_title': '联系我们',
      'contact_modal_message': '请通过以下邮箱联系我们：<br><strong>scriptgenieai@outlook.com</strong>'
    },
    'en': {
      'page_title': 'ScriptGenie AI - AI-Powered Browser Script Generator',
      'page_description': 'ScriptGenie AI is a revolutionary Chrome extension that combines the power of AI language models with browser script development, allowing users to create powerful browser automation scripts without programming knowledge.',
      'nav_features': 'Features',
      'nav_use_cases': 'Use Cases',
      'nav_download': 'Download',
      'nav_docs': 'Documentation',
      'hero_title': 'AI-Powered Browser Script Generator',
      'hero_subtitle': 'Let AI create powerful browser automation scripts for you, no coding required',
      'btn_download': 'Download Now',
      'btn_learn_more': 'Learn More',
      'features_title': 'Core Features',
      'use_cases_title': 'Use Cases',
      'download_title': 'Download Now',
      'installation_guide': 'Installation Guide',
      'product': 'Product',
      'resources': 'Resources',
      'documentation': 'Documentation',
      'tutorials': 'Tutorials',
      'api_reference': 'API Reference',
      'faq': 'FAQ',
      'about_us': 'About Us',
      'team': 'Team',
      'contact_us': 'Contact Us',
      'privacy_policy': 'Privacy Policy',
      'terms_of_use': 'Terms of Use',
      'copyright': '© 2024 ScriptGenie AI. All rights reserved.',
      // Feature cards
      'feature_ai_gen': 'AI Generation',
      'feature_ai_gen_desc': 'Supports multiple AI models including OpenAI, Claude, and DeepSeek, generating professional scripts through natural language',
      'feature_editor': 'Professional Editor',
      'feature_editor_desc': 'Integrated Monaco Editor with syntax highlighting, smart suggestions, and code folding',
      'feature_version': 'Version Management',
      'feature_version_desc': 'Professional snapshot system with version rollback and important version pinning',
      'feature_matching': 'Tampermonkey Compatible',
      'feature_matching_desc': 'Fully compatible with Tampermonkey script system, supporting URL matching rules and GM API functions',
      'feature_i18n': 'Internationalization',
      'feature_i18n_desc': 'Supports multiple languages',
      'feature_security': 'Security & Reliability',
      'feature_security_desc': 'Local storage with API key encryption for data security',
      // Use case cards
      'use_case_automation': 'Web Automation',
      'use_case_automation_desc': 'Form filling, data scraping, page monitoring',
      'use_case_ux': 'UX Enhancement',
      'use_case_ux_desc': 'Ad removal, style adjustments, feature enhancements',
      'use_case_productivity': 'Productivity Boost',
      'use_case_productivity_desc': 'Repetitive task automation, batch processing',
      'use_case_learning': 'Learning & Research',
      'use_case_learning_desc': 'Web behavior analysis, script development learning',
      // Installation steps
      'install_step1': 'Download the extension',
      'install_step2': 'Open Chrome extensions page',
      'install_step3': 'Enable developer mode',
      'install_step4': 'Load unpacked extension',
      // Contact modal
      'contact_modal_title': 'Contact Us',
      'contact_modal_message': 'Please contact us via email:<br><strong>scriptgenieai@outlook.com</strong>'
    }
  };
  
  // 更新页面上的文本内容
  updatePageContent(translations[lang]);
}

// 更新页面内容的函数
function updatePageContent(translations) {
  // 将当前翻译保存到全局变量，以便其他函数可以访问
  window.currentTranslations = translations;
  
  // 遍历所有带有data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      // 如果是标题元素
      if (element.tagName === 'TITLE') {
        element.textContent = translations[key];
      }
      // 如果是meta描述元素
      else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
        element.setAttribute('content', translations[key]);
      }
      // 如果是输入元素，更新value属性
      else if (element.tagName === 'INPUT') {
        element.value = translations[key];
      } 
      // 如果是链接元素，保留子元素
      else if (element.tagName === 'A' && element.children.length > 0) {
        // 保存子元素
        const children = Array.from(element.children);
        // 更新文本内容
        element.textContent = translations[key];
        // 恢复子元素
        children.forEach(child => element.appendChild(child));
      }
      // 其他元素直接更新文本内容
      else {
        element.textContent = translations[key];
      }
    }
  });
}