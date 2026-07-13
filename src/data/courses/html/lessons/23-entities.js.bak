export default {
  id: 23,
  type: 'web',
  label: 'coding',
  title: { bg: 'Как се пише таг, без да стане таг', en: 'How to write a tag without it becoming a tag' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Today I learned the <p> tag and the <strong> tag.</p>
    <p>Price & delivery: 18 leva</p>
  </body>
</html>`,
  expected: '&lt;',
  checkCode: true,
  testCase: {
    bg: 'Вижда ли се <p> като текст на страницата?',
    en: 'Does <p> appear as text on the page?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Реши да се похвалиш какво си научил. Написа го най-нормално. Пусни и виж какво излиза.',
      en: 'You decided to show off what you learned. You wrote it the normal way. Run it and see what comes out.',
    },
    {
      type: 'text',
      bg: 'Изречението е осакатено. Тагът, за който говориш, го няма — вместо да се покаже, той се е ИЗПЪЛНИЛ. Браузърът не може да различи „ето ти таг" от „говоря ти за таг". За него ъгловата скоба значи едно нещо: започва таг.',
      en: 'The sentence is mangled. The tag you were talking about is gone — instead of being shown, it got EXECUTED. The browser cannot tell "here is a tag" from "I am talking about a tag". To it, an angle bracket means one thing: a tag starts here.',
    },
    {
      type: 'quote',
      bg: 'Символите, с които пишеш HTML, не могат да бъдат просто текст в HTML.',
      en: 'The characters you write HTML with cannot simply be text inside HTML.',
    },
    {
      type: 'heading',
      bg: 'Пишеш го с име, не със символ',
      en: 'You write it by name, not by symbol',
    },
    {
      type: 'text',
      bg: 'Решението е да не пишеш самия символ, а името му. Започва с & и свършва с точка и запетая. Браузърът го вижда, разбира го и накрая рисува символа — но вече като текст, не като команда.',
      en: 'The fix is to write not the symbol itself, but its name. It starts with & and ends with a semicolon. The browser reads it, understands it, and finally draws the symbol — as text this time, not as a command.',
    },
    {
      type: 'list',
      items: [
        { bg: '&lt; дава < — „less than", по-малко', en: '&lt; gives < — less than' },
        { bg: '&gt; дава > — „greater than", по-голямо', en: '&gt; gives > — greater than' },
        { bg: '&amp; дава & — самото &, защото и то е специално', en: '&amp; gives & — the ampersand itself, because it is special too' },
        { bg: '&nbsp; дава интервал, който не се разкъсва', en: '&nbsp; gives a space that will not break' },
      ],
    },
    {
      type: 'code',
      code: '<p>Today I learned the &lt;p&gt; tag and the &lt;strong&gt; tag.</p>',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Today I learned the &lt;p&gt; tag and the &lt;strong&gt; tag.</p><p>Price &amp; delivery: 18&nbsp;leva</p>',
      height: 170,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Защо и &',
      en: 'Why & too',
    },
    {
      type: 'text',
      bg: 'Забеляза ли, че &amp; се пише с &? Ето капана: щом всяко име започва с &, то самото & вече не може да е просто знак. Иначе браузърът ще гледа „Price & delivery" и ще се чуди къде свършва името. Затова има име и за него.',
      en: 'Notice that &amp; is written with an &? Here is the trap: since every name starts with &, the & itself can no longer be just a character. Otherwise the browser looks at "Price & delivery" and wonders where the name ends. So it has a name of its own.',
    },
    {
      type: 'heading',
      bg: 'И неразкъсваемият интервал',
      en: 'And the non-breaking space',
    },
    {
      type: 'text',
      bg: '&nbsp; е обикновен интервал с едно свойство: браузърът няма право да пренася реда на него. Пишеш 18&nbsp;leva и числото никога няма да остане самотно на края на реда, а мярката — на следващия. Полезно е при числа, единици и имена.',
      en: '&nbsp; is a plain space with one property: the browser is not allowed to break the line at it. Write 18&nbsp;leva and the number will never be left alone at the end of a line with the unit on the next one. Useful with numbers, units and names.',
    },
    {
      type: 'text',
      bg: 'Пази се от изкушението да редиш &nbsp; едно след друго, за да отместиш нещо. Това е същата грешка като редицата <br> от миналия урок. Отместването е CSS.',
      en: 'Resist the urge to line up several &nbsp; to push something across. That is the same mistake as the row of <br> in the last lesson. Indentation is CSS.',
    },
    {
      type: 'heading',
      bg: 'И тагът за самия код',
      en: 'And the tag for the code itself',
    },
    {
      type: 'text',
      bg: 'Сега тагът се вижда. Само че погледни го — стои си като обикновена дума насред изречението. Нищо не подсказва, че това е КОД, а не приказка.',
      en: 'Now the tag shows. But look at it — it sits there like an ordinary word in the middle of a sentence. Nothing hints that this is CODE and not chit-chat.',
    },
    {
      type: 'text',
      bg: 'Има таг точно за това. Реден е, като <strong>, и казва: това, което е вътре, е код.',
      en: 'There is a tag for exactly this. It is inline, like <strong>, and it says: what is inside is code.',
    },
    {
      type: 'code',
      code: '<p>Today I learned the <code>&lt;p&gt;</code> tag.</p>',
    },
    {
      type: 'text',
      bg: 'Браузърът го показва с моноширинен шрифт — онзи, в който всяка буква заема еднакво място. Точно като в редактора вляво от теб.',
      en: 'The browser shows it in a monospace font — the one where every letter takes up the same width. Exactly like the editor to your left.',
    },
    {
      type: 'text',
      bg: 'Забележи: <code> не отменя нуждата от &lt;. Двете вървят заедно. <code> казва „това е код", а &lt; се грижи скобата изобщо да се покаже. Пропуснеш ли второто, браузърът пак ще изпълни тага — този път вътре в <code>.',
      en: 'Notice: <code> does not remove the need for &lt;. The two go together. <code> says "this is code", while &lt; makes sure the bracket shows at all. Skip the second and the browser will execute the tag again — this time inside the <code>.',
    },
    {
      type: 'heading',
      bg: 'А за цял блок код',
      en: 'And for a whole block of code',
    },
    {
      type: 'text',
      bg: 'Искаш да покажеш не една дума, а няколко реда — цял пример. Пробвай с <code>: редовете се слепват. Разбира се. Браузърът гълта празните редове, това го знаеш отдавна.',
      en: 'You want to show not one word but several lines — a whole example. Try it with <code>: the lines glue together. Of course. The browser swallows blank lines, you have known that for a while.',
    },
    {
      type: 'text',
      bg: 'Тук е единственото място в целия HTML, където браузърът СПАЗВА твоите интервали и празни редове. Тагът се казва <pre> — от „preformatted", предварително форматиран.',
      en: 'This is the one place in all of HTML where the browser HONOURS your spaces and blank lines. The tag is called <pre> — from "preformatted".',
    },
    {
      type: 'code',
      code: `<pre><code>&lt;p&gt;First line&lt;/p&gt;
&lt;p&gt;Second line&lt;/p&gt;</code></pre>`,
    },
    {
      type: 'text',
      bg: 'Двата заедно: <pre> пази подредбата, <code> казва че е код. Ще ги виждаш винаги в тази двойка.',
      en: 'The two together: <pre> keeps the layout, <code> says it is code. You will always see them as a pair.',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Today I learned the <code style="background:#eee;padding:2px 4px;border-radius:3px">&lt;p&gt;</code> tag.</p><pre style="background:#eee;padding:10px;border-radius:4px;overflow-x:auto"><code>&lt;p&gt;First line&lt;/p&gt;\n&lt;p&gt;Second line&lt;/p&gt;</code></pre>',
      height: 220,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Внимание с <pre>: той пази ВСИЧКО. Всеки интервал, който сложиш за красота в кода, ще излезе на екрана. Затова се пише слепено, без отстъпи — иначе те се появяват в резултата.',
      en: 'Careful with <pre>: it keeps EVERYTHING. Every space you add for tidiness in the code will show up on screen. So it is written tight, with no indentation — otherwise the indentation appears in the result.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи изречението да казва наистина „научих тага <p>" — така, че тагът да се вижда. Ако искаш, обгради го в <code> и оправи амперсанда във втория абзац.',
      en: 'Your turn. Make the sentence actually say "I learned the <p> tag" — with the tag visible. If you like, wrap it in <code> and fix the ampersand in the second paragraph too.',
    },
  ],
};