/**
 * 响应式设计测试脚本
 * 用于检查网站在不同设备上的显示效果
 */

// 设备尺寸列表
const devices = [
  { name: '手机 (小)', width: 320, height: 568 },
  { name: '手机 (中)', width: 375, height: 667 },
  { name: '手机 (大)', width: 414, height: 736 },
  { name: '平板 (竖屏)', width: 768, height: 1024 },
  { name: '平板 (横屏)', width: 1024, height: 768 },
  { name: '笔记本', width: 1366, height: 768 },
  { name: '桌面', width: 1920, height: 1080 }
];

// 测试元素列表
const elementsToTest = [
  { selector: 'header', description: '导航栏' },
  { selector: '.hero', description: '英雄区域' },
  { selector: '.features-grid', description: '特性网格' },
  { selector: '.use-cases-grid', description: '应用场景网格' },
  { selector: '.tech-stack-content', description: '技术栈内容' },
  { selector: '.download-options', description: '下载选项' },
  { selector: '.footer-content', description: '页脚内容' }
];

/**
 * 测试网站在指定设备上的响应式设计
 * @param {string} url - 网站URL
 */
async function testResponsiveDesign(url = 'index.html') {
  console.log('开始测试响应式设计...');
  console.log(`测试URL: ${url}`);
  console.log('-----------------------------------');
  
  // 在浏览器中打开此文件时执行
  if (typeof window !== 'undefined') {
    devices.forEach(device => {
      console.log(`设备: ${device.name} (${device.width}x${device.height})`);
      console.log('检查元素:');
      
      elementsToTest.forEach(element => {
        const el = document.querySelector(element.selector);
        if (el) {
          console.log(`- ${element.description}: 可见`);
        } else {
          console.log(`- ${element.description}: 不可见 [问题]`);
        }
      });
      
      console.log('-----------------------------------');
    });
    
    console.log('测试完成!');
  } else {
    console.log('此脚本需要在浏览器环境中运行');
  }
}

// 如果在浏览器中直接运行此脚本
if (typeof window !== 'undefined') {
  window.testResponsiveDesign = testResponsiveDesign;
  console.log('响应式测试工具已加载。');
  console.log('在控制台中运行 testResponsiveDesign() 开始测试。');
}

// 导出函数供Node.js环境使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testResponsiveDesign };
}