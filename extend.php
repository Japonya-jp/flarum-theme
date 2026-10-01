<?php

/*
 * Japonya.jp forum teması.
 *
 * Stiller less/forum.less, davranış js/dist/forum.js; görseller assets/ klasöründen
 * public/assets/extensions/japonya-theme/ altına kopyalanır.
 */

use Flarum\Extend;
use Flarum\Frontend\Document;
use Illuminate\Contracts\Filesystem\Factory;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->content(function (Document $document) {
            // Yazı tipleri: gövde Inter, başlıklar Source Serif 4, Japonca işaretler Noto Serif JP (yalnız kullanılan karakterler).
            $jp = rawurlencode('交流日本へ、もっと近く旅');
            $fonts = [
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@400;600;700&display=swap',
                'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500&text='.$jp.'&display=swap',
            ];
            $document->head[] = '<link rel="preconnect" href="https://fonts.googleapis.com">';
            $document->head[] = '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
            // Yazı tipi CSS'i sayfanın ilk çizimini bekletmez: önce yedek yazı tipiyle çizilir, yüklenince değişir (display=swap).
            foreach ($fonts as $href) {
                $document->head[] = '<link rel="preload" as="style" href="'.$href.'" onload="this.onload=null;this.rel=\'stylesheet\'">';
                $document->head[] = '<noscript><link rel="stylesheet" href="'.$href.'"></noscript>';
            }
            // Geniş ekranda en büyük öğe arka plandaki harita (1320 px altında gizli): HTML'den hemen istenir.
            $map = resolve(Factory::class)->disk('flarum-assets')->url('extensions/japonya-theme/map.webp');
            $document->head[] = '<link rel="preload" as="image" href="'.e($map).'" media="(min-width: 1321px)" fetchpriority="high">';
        }),

    new Extend\Locales(__DIR__.'/locale'),
];
