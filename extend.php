<?php

/*
 * Japonya.jp forum teması.
 *
 * Stiller less/forum.less, davranış js/dist/forum.js; görseller assets/ klasöründen
 * public/assets/extensions/japonya-theme/ altına kopyalanır.
 */

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->content(function (Document $document) {
            // Yazı tipleri: gövde Inter, başlıklar Source Serif 4, Japonca işaretler Noto Serif JP (yalnız kullanılan karakterler).
            $jp = rawurlencode('交流日本へ、もっと近く旅');
            $document->head[] = '<link rel="preconnect" href="https://fonts.googleapis.com">';
            $document->head[] = '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
            $document->head[] = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap">';
            $document->head[] = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500&text='.$jp.'&display=swap">';
        }),

    new Extend\Locales(__DIR__.'/locale'),
];
