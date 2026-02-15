import './ui/site-header';
import './ui/site-footer';

// すべてのサブページでトップと同じ背景テーマを適用
if (document.body && !document.body.classList.contains('cork')) {
	document.body.classList.add('cork');
}


