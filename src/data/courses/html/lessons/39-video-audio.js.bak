export default {
  id: 39,
  type: 'web',
  label: 'coding',
  title: { bg: 'Черният правоъгълник', en: 'The black rectangle' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <p>Watch it in action:</p>

    <video src="/uroci/bike.mp4" width="480"></video>

    <p>And this is the bell:</p>

    <audio src="/uroci/bell.mp3"></audio>
  </body>
</html>`,
  expected: 'controls',
  checkCode: true,
  testCase: {
    bg: 'Има ли видеото и звукът копчета за пускане (controls)?',
    en: 'Do the video and the audio have playback buttons (controls)?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Знаеш <img>. Логично е видеото да работи по същия начин: таг, src, път до файла. Написа го точно така. Пусни.',
      en: 'You know <img>. It stands to reason video works the same way: a tag, src, a path to the file. You wrote exactly that. Run it.',
    },
    {
      type: 'text',
      bg: 'Черен правоъгълник. Никакви копчета. Кликаш — не става нищо. А звукът? Него изобщо го няма. Празно място, сякаш не си написал нищо.',
      en: 'A black rectangle. No buttons. You click it — nothing happens. And the audio? Nowhere to be seen. An empty space, as if you had written nothing at all.',
    },
    {
      type: 'text',
      bg: 'Файловете съществуват. Пътищата са верни. Таговете са верни. И все пак не работи.',
      en: 'The files exist. The paths are right. The tags are right. And still it does not work.',
    },
    {
      type: 'heading',
      bg: 'Снимката се гледа. Видеото се управлява.',
      en: 'An image is looked at. A video is operated.',
    },
    {
      type: 'text',
      bg: 'Ето разликата, която пропусна. Снимката просто СТОИ там — нищо не ѝ трябва, освен да я покажеш. Видеото и звукът искат някой да реши: пусни, спри, върни, по-силно. Тоест искат УПРАВЛЕНИЕ.',
      en: 'Here is the difference you missed. An image just SITS there — it needs nothing but to be shown. Video and audio need someone to decide: play, pause, rewind, louder. That is, they need CONTROLS.',
    },
    {
      type: 'text',
      bg: 'А браузърът не ти дава копчета, докато не му кажеш. Ти не си му казал. Затова ти показа видеото, но без нищо, с което да го пипнеш — и затова звукът е невидим: звук без копчета няма какво да покаже.',
      en: 'And the browser will not give you buttons until you ask. You did not ask. So it showed you the video with nothing to touch it by — and that is why the audio is invisible: sound with no buttons has nothing to show.',
    },
    {
      type: 'code',
      code: `<video src="/uroci/bike.mp4" controls></video>

<audio src="/uroci/bell.mp3" controls></audio>`,
    },
    {
      type: 'text',
      bg: 'Забележи: controls няма стойност. Няма кавички, няма равно. Просто стои там. Такива атрибути значат „да" само с присъствието си — има ли го, вярно е; няма ли го, не е.',
      en: 'Notice: controls has no value. No quotes, no equals sign. It just sits there. Attributes like this mean "yes" simply by being present — if it is there, it is true; if not, it is not.',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>Watch it in action:</p><video src="/uroci/bike.mp4" controls style="max-width:100%"></video><p>And this is the bell:</p><audio src="/uroci/bell.mp3" controls></audio>',
      height: 330,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Защо има затварящ таг',
      en: 'Why there is a closing tag',
    },
    {
      type: 'text',
      bg: 'Странно, нали? <img> няма </img>, а <video> има </video> — при положение че и двете нямат какво да съдържат. Само че видеото има: между таговете можеш да сложиш текст, който се показва, ако браузърът не може да пусне файла.',
      en: 'Odd, is it not? <img> has no </img>, yet <video> has </video> — even though neither seems to hold anything. Except video does: between the tags you can put text that shows if the browser cannot play the file.',
    },
    {
      type: 'code',
      code: `<video src="/uroci/bike.mp4" controls>
  Your browser cannot play this video.
</video>`,
    },
    {
      type: 'text',
      bg: 'Това е същата идея като alt от миналия урок: какво остава, когато главното го няма. Само че тук го пишеш вътре, а не в атрибут.',
      en: 'This is the same idea as alt in the last lesson: what is left when the main thing is missing. Only here you write it inside, not in an attribute.',
    },
    {
      type: 'heading',
      bg: 'Другите атрибути',
      en: 'The other attributes',
    },
    {
      type: 'list',
      items: [
        { bg: 'controls — копчетата. Почти винаги го искаш.', en: 'controls — the buttons. You almost always want this.' },
        { bg: 'autoplay — пуска се само. Помисли два пъти: човек отваря страницата ти в офиса и от тонколоните гръмва музика. Мразят се такива сайтове.', en: 'autoplay — starts on its own. Think twice: someone opens your page at the office and music blasts out of the speakers. People hate sites like that.' },
        { bg: 'muted — без звук. Браузърите не позволяват autoplay СЪС звук, така че двете обикновено вървят заедно.', en: 'muted — no sound. Browsers do not allow autoplay WITH sound, so the two usually go together.' },
        { bg: 'loop — върти се в кръг.', en: 'loop — plays over and over.' },
        { bg: 'poster — снимка, която стои, докато човек не е натиснал пускане. Иначе първият кадър, който често е черен.', en: 'poster — an image that shows until someone presses play. Otherwise you get the first frame, which is often black.' },
      ],
    },
    {
      type: 'code',
      code: '<video src="/uroci/bike.mp4" controls poster="/uroci/bike.jpg"></video>',
    },
    {
      type: 'text',
      bg: 'Ето за какво служи снимката, която вече имаш. Вместо черен правоъгълник — велосипедът. Дребна работа, а личи.',
      en: 'That is what the photo you already have is for. Instead of a black rectangle — the bike. A small thing, but it shows.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи видеото и звукът да се пускат. И ако искаш — сложи снимката като poster.',
      en: 'Your turn. Make the video and the audio playable. And if you like — set the photo as the poster.',
    },
  ],
};