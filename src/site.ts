import './ui/site-footer';
import './ui/site-head';
import './ui/site-header';

// サブページでもトップと同じ背景テーマを適用
if (document.body && !document.body.classList.contains('cork')) {
  document.body.classList.add('cork');
}
