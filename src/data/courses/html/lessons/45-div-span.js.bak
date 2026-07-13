export default {
  id: 45,
  type: 'web',
  label: 'coding',
  title: { bg: 'Кутията, която не значи нищо', en: 'The box that means nothing' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p class="listing">Blue bike, almost new. 40 leva.</p>
    <p class="listing">Black bike, 21 gears. 18 leva.</p>
    <p class="listing">Red bike, needs a new chain. 12 leva.</p>

    <p>All prices are negotiable.</p>

    <p>Written by Ivan on 12 July.</p>
  </body>
</html>`,
  expected: '<div',
  checkCode: true,
  testCase: {
    bg: 'Обградени ли са трите обяви в един <div>?',
    en: 'Are the three listings wrapped in a single <div>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Обявите вече си имат име. Сега искаш всичките три да са в ЕДНА обща рамка — не всяка поотделно, а трите заедно, като раздел на страницата.',
      en: 'The listings have a name now. Next you want all three inside ONE shared box — not each on its own, but the three together, as a section of the page.',
    },
    {
      type: 'text',
      bg: 'Опитай се да го кажеш. Около какво да е рамката? Около трите абзаца. Само че „трите абзаца" не е нещо. Те са три отделни неща, които просто стоят едно до друго. Няма кутия, която да ги събира.',
      en: 'Try to say it. Around what should the box go? Around the three paragraphs. Except "the three paragraphs" is not a thing. They are three separate things that merely stand next to each other. There is no box holding them together.',
    },
    {
      type: 'quote',
      bg: 'Класът дава име. Той не прави от три неща едно.',
      en: 'A class gives a name. It does not turn three things into one.',
    },
    {
      type: 'heading',
      bg: 'Празната кутия',
      en: 'The empty box',
    },
    {
      type: 'text',
      bg: 'За това има таг. Той не значи нищо, не изглежда никак и не прави нищо. Единствената му работа е да огражда. Казва се <div>.',
      en: 'There is a tag for this. It means nothing, looks like nothing, and does nothing. Its only job is to wrap. It is called <div>.',
    },
    {
      type: 'code',
      code: `<div class="listings">
  <p class="listing">Blue bike, almost new. 40 leva.</p>
  <p class="listing">Black bike, 21 gears. 18 leva.</p>
  <p class="listing">Red bike, needs a new chain. 12 leva.</p>
</div>`,
    },
    {
      type: 'text',
      bg: 'Пусни. Нищо не се променя. Абсолютно нищо — и това е правилно. <div> е невидим по природа. Но сега трите обяви СА едно нещо, и това нещо има име. Има какво да хванеш.',
      en: 'Run it. Nothing changes. Absolutely nothing — and that is correct. <div> is invisible by nature. But now the three listings ARE one thing, and that thing has a name. There is something to grab.',
    },
    {
      type: 'preview',
      html: '<h1>Bikes for sale</h1><div style="border:2px dashed #999;padding:10px;background:#f7f7f7"><p style="margin:6px 0">Blue bike, almost new. 40 leva.</p><p style="margin:6px 0">Black bike, 21 gears. 18 leva.</p><p style="margin:6px 0">Red bike, needs a new chain. 12 leva.</p></div><p>All prices are negotiable.</p><p>Written by Ivan on 12 July.</p>',
      height: 300,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Горе е нарисувана рамката, за да видиш какво си направил. В твоя редактор няма да я видиш — тя ще дойде с CSS. Днес само построяваш кутията.',
      en: 'Above the box is drawn in so you can see what you made. In your editor you will not see it — it comes with CSS. Today you only build the box.',
    },
    {
      type: 'heading',
      bg: 'И <span>',
      en: 'And <span>',
    },
    {
      type: 'text',
      bg: '<div> е блоков — взема цял ред, като <p>. Има и негов близнак, който е РЕДОВ: <span>. Същата празнота, само че живее вътре в изречението.',
      en: '<div> is a block — it takes a whole line, like <p>. It has a twin that is INLINE: <span>. The same emptiness, only it lives inside a sentence.',
    },
    {
      type: 'code',
      code: '<p class="listing">Black bike, 21 gears. <span class="price">18 leva</span></p>',
    },
    {
      type: 'text',
      bg: 'Пак нищо не се вижда. Но сега можеш да хванеш само цената във всяка обява — да я направиш зелена, дебела, каквото решиш. Без <span> цената е просто букви насред изречение, без име и без дръжка.',
      en: 'Again, nothing shows. But now you can grab just the price in every listing — make it green, bold, whatever you decide. Without <span> the price is only letters in the middle of a sentence, with no name and no handle.',
    },
    {
      type: 'heading',
      bg: 'Внимавай със <span>',
      en: 'Careful with <span>',
    },
    {
      type: 'text',
      bg: 'Тук започва изкушението. Искаш нещо удебелено → слагаш <span class="bold">. Работи. Само че вече имаш <strong>, който значи „това е важно" — а <span class="bold"> не значи нищо. Ползвай <span> само когато НЯМА подходящ таг. Цената не е важна дума; тя е цена. Затова тук <span> е верният избор, а <strong> — не.',
      en: 'This is where the temptation starts. You want something bold → you reach for <span class="bold">. It works. Except you already have <strong>, which means "this matters" — while <span class="bold"> means nothing at all. Use <span> only when NO suitable tag exists. A price is not an important word; it is a price. That is why <span> is right here, and <strong> is not.',
    },
    {
      type: 'quote',
      bg: '<div> и <span> са последното средство, не първото.',
      en: '<div> and <span> are the last resort, not the first.',
    },
    {
      type: 'text',
      bg: 'Защо това е толкова важно — в следващия урок. Ще ти покажа какво става, когато човек забрави тази последна дума.',
      en: 'Why this matters so much — in the next lesson. I will show you what happens when someone forgets that last sentence.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Събери трите обяви в един <div> с име. И ако искаш, дай име и на цените вътре.',
      en: 'Your turn. Gather the three listings into one named <div>. And if you like, name the prices inside as well.',
    },
  ],
};