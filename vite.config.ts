import path from 'node:path';

import { defineConfig, type Plugin, type PluginOption } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// 現在のルート直下構成（images, font, css, articles）を維持しつつ dist へコピー
export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [];

  // 開発時は /site.js を仮想的に配信（中身は /src/site.ts を読み込むだけ）
  // 本番(build)では rollup の entry として site.js を生成する
  if (command === 'serve') {
    const virtualSiteJsPlugin: Plugin = {
      name: 'virtual-site-js',
      enforce: 'pre',
      resolveId(source: string) {
        const pathname = source.split('?', 1)[0];
        if (pathname === '/site.js') {
          return '/site.js';
        }
        return null;
      },
      load(id: string) {
        const pathname = id.split('?', 1)[0];
        if (pathname === '/site.js') {
          return 'import "/src/site.ts";';
        }
        return null;
      },
    };
    plugins.push(virtualSiteJsPlugin);
  }

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
      rollupOptions: {
        input: {
          main: path.resolve(process.cwd(), 'index.html'),
          site: path.resolve(process.cwd(), 'src/site.ts'),
        },
        output: {
          entryFileNames: (chunk) => {
            if (chunk.name === 'site') {
              return 'site.js';
            }
            return 'assets/[name]-[hash].js';
          },
        },
      },
    },
    plugins,
  };
});
