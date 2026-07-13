export default {
  id: 27,
  type: 'web',
  label: 'coding',
  title: { bg: 'Когато един пункт има свои пунктове', en: 'When one item has items of its own' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>What the price includes:</p>

    <ul>
      <li>Frame</li>
      <li>Tyres</li>
      <li>Front</li>
      <li>Rear</li>
      <li>Bell</li>
    </ul>
  </body>
</html>`,
  expected: '<ul>',
  checkCode: true,
  testCase: {
    bg: 'Стоят ли предната и задната гума ВЪТРЕ в „Tyres"?',
    en: 'Do the front and rear tyre sit INSIDE "Tyres"?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Изброяваш какво влиза в цената. Гумите са две — предна и задна. Ти ги написа като нови пунктове. Пусни и виж.',
      en: 'You are listing what the price includes. There are two tyres — front and rear. You wrote them as new items. Run it and look.',
    },
    {
      type: 'text',
      bbg: 'Списъкът излиза с пет точки, всичките еднакви. Той твърди, че „Front" е такова нещо, каквото е „Frame" и „Bell" — отделна част от велосипеда. А то не е. То е част ОТ гумите.',
      en: 'The list comes out with five bullets, all equal. It claims that "Front" is the same kind of thing as "Frame" and "Bell" — a separate part of the bike. It is not. It is part OF the tyres.',
    },
    {
      type: 'quote',
      bg: 'Списъкът не е рисунка. Той твърди нещо: тези неща са от един и същи вид.',
      en: 'A list is not a drawing. It makes a claim: these things are of the same kind.',
    },
    {
      type: 'heading',
      bg: 'Списък вътре в пункт',
      en: 'A list inside an item',
    },
    {
      type: 'text',
      bg: 'Вътре в един <li> може да сложиш цял нов <ul>. Не след него, не до него — ВЪТРЕ, преди да си затворил </li>. Така новият списък не е съсед на „Tyres", а негово съдържание.',
      en: 'Inside a single <li> you can put a whole new <ul>. Not after it, not next to it — INSIDE, before you close the </li>. That way the new list is not a neighbour of "Tyres", it is its content.',
    },
    {
      type: 'code',
      code: `<ul>
  <li>Frame</li>
  <li>Tyres
    <ul>
      <li>Front</li>
      <li>Rear</li>
    </ul>
  </li>
  <li>Bell</li>
</ul>`,
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>What the price includes:</p><ul><li>Frame</li><li>Tyres<ul><li>Front</li><li>Rear</li></ul></li><li>Bell</li></ul>',
      height: 220,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Виж отстъпа и различната точка. Ти не си ги правил — браузърът сам показва, че вътрешният списък е на друго ниво. Ти каза само КАКВО на какво принадлежи.',
      en: 'Look at the indent and the different bullet. You did not make those — the browser shows on its own that the inner list is on another level. All you said was WHAT belongs to WHAT.',
    },
    {
      type: 'heading',
      bg: 'Мястото на затварящия таг',
      en: 'Where the closing tag goes',
    },
    {
      type: 'text',
      bg: 'Тук се греши най-често: човек затваря </li> веднага след „Tyres" и чак тогава отваря вътрешния <ul>. Изглежда почти същото, а не е — списъкът вече не е вътре в нищо. Затварящият </li> върви СЛЕД вътрешния списък.',
      en: 'This is the usual mistake: closing </li> right after "Tyres" and only then opening the inner <ul>. It looks almost the same, but it is not — the list is no longer inside anything. The closing </li> goes AFTER the inner list.',
    },
    {
      type: 'text',
      bg: 'Може и <ol> вътре в <ul>, и обратното — влагането не се интересува от вида. И може на още нива навътре, стига да има смисъл. Обикновено няма.',
      en: 'You can nest an <ol> inside a <ul> and the other way round — nesting does not care about the type. And you can go deeper still, if it makes sense. Usually it does not.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи предната и задната гума да принадлежат на „Tyres".',
      en: 'Your turn. Make the front and rear tyre belong to "Tyres".',
    },
  ],
};