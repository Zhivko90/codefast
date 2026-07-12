export default {
  id: 63,
  type: 'web',
  label: 'coding',
  title: { bg: 'Сам: форма, която някой ще попълни', en: 'Freehand: a form someone will fill in' },
  starterCode: ``,
  expected: '<label',
  checkCode: true,
  testCase: {
    bg: 'Има ли форма с action, method, свързани надписи и истински бутон?',
    en: 'Is there a form with an action, a method, connected labels and a real button?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Празен редактор. Шести път — и последният преди финала.',
      en: 'Empty editor. Sixth time — and the last before the finale.',
    },
    {
      type: 'heading',
      bg: 'Задачата',
      en: 'The task',
    },
    {
      type: 'text',
      bg: 'Твоята тема. Направи форма, която някой наистина би попълнил: заявка, записване, поръчка, контакт, анкета — каквото пасва.',
      en: 'Your topic. Build a form someone would genuinely fill in: an enquiry, a signup, an order, a contact form, a survey — whatever fits.',
    },
    {
      type: 'text',
      bg: 'Трябва да има поне: две текстови полета от различен тип, един избор от няколко възможности, едно голямо поле за свободен текст и бутон за изпращане. И страница около формата — не гола форма във въздуха.',
      en: 'It must have at least: two text fields of different types, one choice from several options, one large free-text field and a submit button. And a page around the form — not a bare form floating in space.',
    },
    {
      type: 'heading',
      bg: 'Условието',
      en: 'The condition',
    },
    {
      type: 'quote',
      bg: 'Всяко поле трябва да е попълнимо от човек, който не вижда екрана.',
      en: 'Every field must be fillable by someone who cannot see the screen.',
    },
    {
      type: 'text',
      bg: 'Това значи: всеки надпис свързан с полето си. Всяко поле с name. Всеки type — верният. Бутонът — истински бутон.',
      en: 'That means: every label tied to its field. Every field with a name. Every type — the right one. The button — a real button.',
    },
    {
      type: 'text',
      bg: 'Никакъв placeholder вместо надпис. Той изчезва, щом човек започне да пише, а четецът често изобщо не го чете.',
      en: 'No placeholder instead of a label. It vanishes as soon as the person starts typing, and a reader often does not read it at all.',
    },
    {
      type: 'heading',
      bg: 'Как да се провериш',
      en: 'How to check yourself',
    },
    {
      type: 'text',
      bg: 'Прибери мишката. Наистина — махни ръката си от нея.',
      en: 'Put the mouse away. Really — take your hand off it.',
    },
    {
      type: 'text',
      bg: 'Сега попълни собствената си форма само с клавиатурата. Tab за следващо поле. Интервал за избор. Enter за изпращане.',
      en: 'Now fill in your own form using only the keyboard. Tab for the next field. Space to select. Enter to submit.',
    },
    {
      type: 'text',
      bg: 'Ако стигнеш до края и я изпратиш — работи. Ако някъде заседнеш, ако Tab прескочи нещо важно, ако бутонът не се натиска с Enter — намерил си точно това, което пречи на човека, който няма избор.',
      en: 'If you reach the end and submit it — it works. If you get stuck somewhere, if Tab skips something important, if the button will not press with Enter — you have found exactly what blocks the person who has no choice.',
    },
    {
      type: 'text',
      bg: 'Този тест отнема трийсет секунди. Почти никой не го прави.',
      en: 'This test takes thirty seconds. Almost nobody does it.',
    },
    {
      type: 'heading',
      bg: 'Ако заседнеш',
      en: 'If you freeze',
    },
    {
      type: 'text',
      bg: 'Не започвай от таговете. Започни от въпросите. Какво искаш да знаеш за човека, който попълва? Напиши въпросите на български, като на лист хартия.',
      en: 'Do not start from the tags. Start from the questions. What do you want to know about the person filling it in? Write the questions out in plain words, as if on paper.',
    },
    {
      type: 'text',
      bg: 'После за всеки въпрос питай: отговорът свободен ли е, или е от списък? Един ред ли е, или три? Кратък текст, число, дата, имейл?',
      en: 'Then for each question ask: is the answer free, or from a list? One line or three? Short text, a number, a date, an email?',
    },
    {
      type: 'text',
      bg: 'Отговориш ли на това, таговете се избират сами.',
      en: 'Answer that, and the tags pick themselves.',
    },
    {
      type: 'heading',
      bg: 'И накрая',
      en: 'And finally',
    },
    {
      type: 'text',
      bg: 'Формата няма да изпрати нищо. Адресът в action не съществува. Знаеш вече защо — какво става с данните после е сървър, друг език, друг курс.',
      en: 'The form will not send anything. The address in the action does not exist. You know why by now — what happens to the data afterwards is the server, another language, another course.',
    },
    {
      type: 'text',
      bg: 'Но ръката, която подава, е твоя. И ако тя е направена както трябва, всеки може да я хване.',
      en: 'But the hand that offers is yours. And if it is built right, anyone can take it.',
    },
  ],
};