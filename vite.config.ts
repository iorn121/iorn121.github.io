import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// 現在のルート直下構成（images, font, css, articles）を維持しつつ dist へコピー
export default defineConfig(({ command }) => {
  const plugins = [];
  // 開発時はコピーしない（監視競合を回避）
  if (command === 'build') {
    plugins.push(
      viteStaticCopy({
        targets: [
          { src: 'images', dest: '.' },
          { src: 'font', dest: '.' },
          { src: 'css', dest: '.' },
          { src: 'articles', dest: '.' },
        ],
      }),
    );
  }
  return {
    base: '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    plugins,
  };
});
