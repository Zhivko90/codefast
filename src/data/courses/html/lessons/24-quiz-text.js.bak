export default {
  id: 24,
  quiz: true,
  label: 'mcq',
  title: { bg: 'Провери се: текст и съдържание', en: 'Check yourself: text & content' },
  questions: [
    {
      q: {
        bg: 'Човек иска два реда текст един под друг. Натиска Enter между тях в кода. Пуска — текстът излиза слепен на един ред. Какво не е разбрал?',
        en: 'Someone wants two lines of text one below the other. They press Enter between them in the code. They run it — the text comes out glued on one line. What have they missed?',
      },
      options: [
        { bg: 'Трябвал му е втори Enter — един не стига', en: 'They needed a second Enter — one is not enough' },
        { bg: 'Браузърът не гледа празните редове в кода; разделянето се иска с таг', en: 'The browser ignores blank lines in the code; separation must be asked for with a tag' },
        { bg: 'Редакторът е развалил кода при запис', en: 'The editor broke the code when saving' },
        { bg: 'Липсва <!DOCTYPE html>', en: 'The <!DOCTYPE html> is missing' },
      ],
      correct: 1,
      explain: {
        bg: 'Празните редове в кода са за твоите очи. Браузърът ги гълта нарочно — иначе всяко разместване на кода щеше да мести страницата. Искаш нещо да е отделно? Казваш го с таг.',
        en: 'Blank lines in code are for your eyes. The browser swallows them on purpose — otherwise every reshuffle of the code would shift the page. Want something separate? Say it with a tag.',
      },
    },
    {
      q: {
        bg: 'Иска „Цена: 25 лева" на един ред. Слага цената в един <p>, сумата — в друг <p>, и ги залепя един до друг без нито един празен ред. Пак се разделят. Защо?',
        en: 'They want "Price: 25 leva" on one line. They put the label in one <p>, the amount in another <p>, and glue them together with no blank line at all. They still split. Why?',
      },
      options: [
        { bg: 'Защото <p> е блоков — всеки взема цял ред, колкото и къс да е', en: 'Because <p> is a block tag — each takes a whole line, however short it is' },
        { bg: 'Защото между тях няма интервал', en: 'Because there is no space between them' },
        { bg: 'Защото трябва да са в един <h1>', en: 'Because they must be inside one <h1>' },
        { bg: 'Защото абзаците не могат да съдържат числа', en: 'Because paragraphs cannot contain numbers' },
      ],
      correct: 0,
      explain: {
        bg: 'Два блока никога няма да застанат един до друг — това не е въпрос на наместване. Решението е ЕДИН абзац, а вътре в него редов таг за частта, която трябва да изпъква.',
        en: 'Two blocks will never stand side by side — this is not a matter of nudging. The fix is ONE paragraph, with an inline tag inside it for the part that should stand out.',
      },
    },
    {
      q: {
        bg: 'Иска малко въздух между два абзаца. Слага три <br> един след друг. Работи. Какво му е лошото?',
        en: 'They want some air between two paragraphs. They stack three <br> in a row. It works. What is wrong with it?',
      },
      options: [
        { bg: 'Нищо — щом изглежда добре, добре е', en: 'Nothing — if it looks right, it is right' },
        { bg: '<br> не значи „разстояние", а „редът свършва тук, но мисълта не". Разстоянията са CSS', en: '<br> does not mean "gap", it means "the line ends here but the thought does not". Gaps are CSS' },
        { bg: 'Позволени са най-много два <br>', en: 'At most two <br> are allowed' },
        { bg: '<br> работи само вътре в <h1>', en: '<br> only works inside <h1>' },
      ],
      correct: 1,
      explain: {
        bg: 'Изглежда правилно и точно затова е капан. Тагът се избира по смисъл. <br> е за адрес, стих, ред от песен — за въздух между абзаци не е.',
        en: 'It looks right, and that is exactly why it is a trap. You pick the tag by meaning. <br> is for an address, a verse, a line of a song — not for air between paragraphs.',
      },
    },
    {
      q: {
        bg: 'Прави намаление. Иска старата цена да е зачеркната, защото „така е по-красиво и се вижда сивичко". Кое е по-точното основание да ползва <del>?',
        en: 'They are running a sale. They want the old price crossed out because "it looks nicer and shows up grey". What is the better reason to use <del>?',
      },
      options: [
        { bg: 'Че <del> прави текста сив и зачеркнат', en: 'That <del> makes the text grey and struck through' },
        { bg: 'Че <del> значи „това го имаше и вече не важи" — носи смисъл, не вид', en: 'That <del> means "this was here and no longer applies" — it carries meaning, not a look' },
        { bg: 'Че <del> е по-къс за писане от CSS', en: 'That <del> is shorter to type than CSS' },
        { bg: 'Че без <del> цената няма да се вижда', en: 'That without <del> the price will not show' },
      ],
      correct: 1,
      explain: {
        bg: 'Ако избираш тага заради вида му, значението изчезва в деня, в който смениш стила. <del> казва какво Е станало с тази цена. Как изглежда — това е работа на CSS.',
        en: 'If you pick a tag for its look, the meaning vanishes the day you change the style. <del> says what HAPPENED to that price. How it looks is CSS.',
      },
    },
    {
      q: {
        bg: 'Пише в страницата си: „Днес научих тага <p>". Пуска — изречението излиза осакатено, а тага го няма. Какво е станало?',
        en: 'They write on their page: "Today I learned the <p> tag". They run it — the sentence comes out mangled and the tag is nowhere. What happened?',
      },
      options: [
        { bg: 'Браузърът не различава „ето ти таг" от „говоря за таг" — изпълнил го е', en: 'The browser cannot tell "here is a tag" from "I am talking about a tag" — it executed it' },
        { bg: 'Тагът <p> не може да се пише с малки букви', en: 'The <p> tag cannot be written in lowercase' },
        { bg: 'Липсва затварящ </p>', en: 'A closing </p> is missing' },
        { bg: 'Трябва да е в <strong>', en: 'It needs to be inside <strong>' },
      ],
      correct: 0,
      explain: {
        bg: 'За браузъра ъгловата скоба значи едно: започва таг. Затова, като искаш да ПОКАЖЕШ символа, пишеш името му: &lt; и &gt;. Кодът не може да опише сам себе си със себе си.',
        en: 'To the browser an angle bracket means one thing: a tag begins. So when you want to SHOW the symbol, you write its name: &lt; and &gt;. Code cannot describe itself using itself.',
      },
    },
    {
      q: {
        bg: 'Три реда адрес: улица, етаж, град. Кое е вярното?',
        en: 'A three-line address: street, floor, city. Which is right?',
      },
      options: [
        { bg: 'Три отделни <p> — всеки ред си е самостоятелен', en: 'Three separate <p> — each line stands on its own' },
        { bg: 'Списък — редовете са изброяване', en: 'A list — the lines are an enumeration' },
        { bg: 'Един <p> с <br> вътре — един адрес, но на нови редове', en: 'One <p> with <br> inside — one address, on new lines' },
        { bg: 'Три <h3> — за да изпъкват', en: 'Three <h3> — so they stand out' },
      ],
      correct: 2,
      explain: {
        bg: 'Адресът е една мисъл, не три. И не е списък — не можеш да прередиш улицата и града. Точно за това е <br>: нов ред ВЪТРЕ в един абзац.',
        en: 'An address is one thought, not three. And it is not a list — you cannot reorder the street and the city. That is exactly what <br> is for: a new line INSIDE one paragraph.',
      },
    },
    {
      q: {
        bg: 'Иска думата „важно" да е удебелена, защото е важна. Колега казва: „ползвай <strong>". Друг казва: „ползвай CSS". Кой е прав?',
        en: 'They want the word "important" bold, because it is important. One colleague says: "use <strong>". Another says: "use CSS". Who is right?',
      },
      options: [
        { bg: 'Първият — думата наистина Е важна, а <strong> носи точно този смисъл', en: 'The first — the word truly IS important, and <strong> carries exactly that meaning' },
        { bg: 'Вторият — удебеляването винаги е стил', en: 'The second — bold is always styling' },
        { bg: 'Никой — удебеляване не се прави в HTML', en: 'Neither — bold is not done in HTML' },
        { bg: 'Все едно е, стига да излезе удебелено', en: 'It makes no difference, as long as it comes out bold' },
      ],
      correct: 0,
      explain: {
        bg: 'Въпросът не е „удебелено ли да е", а „защо". Ако думата НОСИ тежест — <strong>. Ако просто искаш дебели букви за красота — CSS. Един и същ вид, две различни причини.',
        en: 'The question is not "should it be bold" but "why". If the word CARRIES weight — <strong>. If you just want thick letters for looks — CSS. Same appearance, two different reasons.',
      },
    },
  ],
};