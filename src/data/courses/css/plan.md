# CSS курс — план. 98 урока + 11 ревюта = 110

Този файл НЕ се зарежда от кода. Тук стои целият план.
Готов урок → добавяш slug-а в outline.js. Само тогава — slug без файл
чупи страницата на курса на nextLesson.id.

Свереност: MDN Curriculum 3 (fundamentals), 4 (text styling), 5 (layout);
freeCodeCamp Responsive Web Design v9.

## basics
- cssintro: 01-ugly ✅, 02-where ✅, 03-rule ✅, 04-stylesheet ✅, 05-defaults, R1-review-intro, 06-quiz-intro, 07-first-code
- selectors: 08-select-tag, 09-class, 10-id, 11-descendant, 12-attribute, 13-pseudo-class, 14-pseudo-element, 15-broken-selectors, R2-review-selectors, 16-quiz-selectors, 17-freehand-selectors

## box
- boxmodel: 18-size-lie, 19-padding, 20-border, 21-radius, 22-margin, 23-border-box, 24-margin-collapse, R3-review-box, 25-quiz-box
- sizing: 26-display, 27-width-height, 28-min-max, 29-overflow, 30-center, 31-broken-box, R4-review-sizing, 32-freehand-box

## text
- typography: 33-font-family, 34-webfonts, 35-font-size, 36-line-height, 37-font-weight, 38-text-align, 39-text-decoration, R5-review-typography, 40-quiz-typography
- colors: 41-color-units, 42-variables, 43-background, 44-gradient, 45-shadow, 46-contrast, 47-broken-color, R6-review-colors, 48-freehand-text

## cascade
- cascade: 49-not-applied, 50-specificity, 51-inherit, 52-important, 53-order, 54-semicolon, 55-devtools, R7-review-cascade, 56-quiz-cascade

## layout
- flow: 57-flow, 58-side-by-side, 59-float
- flexbox: 60-flex, 61-main-axis, 62-justify, 63-align, 64-grow, 65-wrap, 66-gap, 67-broken-flex, R8-review-flex, 68-quiz-flex, 69-freehand-flex
- grid: 70-grid, 71-columns, 72-rows, 73-areas, 74-auto-fit, R9-review-grid, 75-quiz-grid
- position: 76-position, 77-absolute, 78-fixed-sticky, 79-zindex, 80-broken-position

## components
- uiparts: 81-links, 82-lists, 83-form-basic, 84-form-hard, R10-review-components, 85-freehand-form

## responsive
- adaptive: 86-phone-broken, 87-viewport-meta, 88-relative-units, 89-media, 90-mobile-first, R11-review-responsive, 91-quiz-responsive
- states: 92-hover, 93-focus, 94-transition, 95-reduced-motion, 96-freehand-states

## final
- finish: 97-final, 98-publish

---

## Уроци, които никой конкурент няма

- **24-margin-collapse** — два margin-а се сливат в един. Работи, изглежда грешно.
- **54-semicolon** — една липсваща точка и запетая убива всичко под нея. Без грешка.
- **59-float** — НЕ „float е лош". Истинската му работа е обтичане на изображение
  в текст. За колони вече не се ползва. Не заменяй един мит с обратния.
- **84-form-hard** — защо <select> не се стилизира еднакво никъде. Системни стилове,
  shadow DOM, appearance: none.
- **95-reduced-motion** — анимацията, която причинява гадене на реален човек.

---

## Проверката на CSS — ГОТОВА

src/core/styleCheck.js. Рендерира кода в скрит iframe и пита браузъра
getComputedStyle. НЕ сравнява низове — това е грешката на SoloLearn.

Типове: style_is, style_is_not, style_matches (pattern), style_applies.

⚠ НОРМАЛИЗАЦИЯ ЧРЕЗ ПРОБА. Не сравнявай със записан наготово низ.
Прави се невидим елемент от същия таг, в същия родител, задава му се
очакваната стойност, и се сравнява computed срещу computed.
Така red, #f00, rgb(255,0,0) и hsl(0,100%,50%) минават еднакво.

⚠ ВСИЧКИ елементи, не първият. querySelectorAll, не querySelector.
Три заглавия, оцветено само първото → пада.

⚠ nomatch е ОТДЕЛНА грешка от wrong. Селектор, който не улучва нищо,
не е „грешен цвят". Урокът дава errNoMatch до err.

Тестова страница: /bg/styletest — 26 случая. Пусни я след всяка промяна
в styleCheck.js или checkProblem.js.

### Проверени факти — не ги пипай без нов източник

- getComputedStyle връща цветове като rgb(255, 0, 0), легаси синтаксис със
  запетаи. НО oklch/lab/lch НЕ се смъкват до rgb — връщат се като oklch(...).
- width, height, padding връщат USED стойност — проценти излизат в px.
- Във Firefox `auto` връща used стойност, не `auto`. Не проверявай `auto`.
- Ползвай ДЪЛГИ свойства: text-decoration-line, margin-top, border-top-width.
  Съкратените се сериализират различно по браузъри.
- MDN, viewport: никога user-scalable=no — заключва хората, които увеличават,
  за да четат.

---

## Многофайлов редактор — ГОТОВ

Monaco (= редакторът на VS Code) беше вграден отпреди. Липсваше подредбата.

**Решение: dockview-react.** Не се пише на ръка.
Частите му за преоразмеряване са вдъхновени от кода на самия VS Code.
Нула зависимости, MIT.

Писах го на ръка три пъти и всеки път се чупеше на друго:
- <button draggable> не тръгва в Chrome (бутонът поглъща mousedown)
- setState в onDragStart убива драга (React прерисува влачения възел)
- Monaco изяжда dragover — пускането работеше само върху лентата с табове

### ⚠ ПЕТ КАПАНА ПРИ ВГРАЖДАНЕТО

1. Контейнерът иска w-full h-full, НЕ flex-1 — родителят в WorkBench
   не е flex, височината става нула и файловете изчезват.
2. Панелите се създават ВЕДНЪЖ в onReady. getFile/setFile през params
   замръзват в старото затваряне → минават през контекст + ref.
3. Editor иска path={име}, иначе Monaco дава един модел на всички файлове
   и Ctrl+Z в CSS вади HTML.
4. ТЕМАТА се задава с theme={themeDark} от 'dockview-react' — ОБЕКТ, не низ.
   theme="dark" гърми с "Cannot read properties of undefined (reading 'split')".
5. CSS-ът се насочва към .dv-shell, НЕ към .dockview-theme-dark.
   Dockview слага собствен клас с тема на .dv-shell — вътрешен елемент,
   по-близък предшественик на таба от какъвто и да е клас на родителя.
   По-близкият печели при наследяване на променливи. Троен клас за
   специфичност, защото техният CSS се зарежда след globals.css.

⚠ НЕ вграждай Sandpack / StackBlitz / code-server.
Техните iframe-ове са на ЧУЖД домейн → cross-origin →
getComputedStyle и axe са забранени. Губиш проверката, а тя е продуктът.

⚠ НЕ прави контейнери (CodeChef модел) преди Node курс.
HTML, CSS и JS-в-браузъра се рендерират в браузъра на човека безплатно.
Контейнер значи сървър на всеки активен потребител, забавяне при вдигане,
проверката се пренаписва за headless Chrome, и режим на отказ 502.

**Записът.** code.content в Supabase остава низ. Няколко файла → JSON низ.
Разпознава се по първия знак: { → файлове, всичко друго → един файл.
Старите редове започват с < и не се пипат. Нула миграция.

**Сглобяването.** src/core/bundle.js: намира <link rel="stylesheet" href="X">,
заменя го със <style data-from="X"> + съдържанието. Надолу всичко получава
един низ — styleCheck, checkProblem и axe не знаят, че е имало файлове.

⚠ ПРОВЕРКА ЗА ВРЪЗКАТА: dom_has: 'style[data-from]'.
НЕ търси "<link" — assemble вече го е заменил. Следата съществува само
ако href сочи истински файл. Сгрешено име → друга грешка, не „грешен цвят".

**Остава за JS курса:** конзолен панел, проверка на върната стойност,
показване на грешки по време на изпълнение. Файловете бяха 1/3 от работата.

---

## Друго, записано мимоходом

- Ученикът НЕ създава файлове засега. Уроците ги дават. Бутон „нов файл"
  се добавя после, върху същата структура, без да чупи нищо.
- От урок 05 нататък уроците са с два файла: HTML е даден и не се пипа,
  ученикът пише само в styles.css. Така урок не може да мине чрез триене.
- New-Item НЯМА параметър -LiteralPath. Скоби в пътя се решават с
  [IO.Directory]::CreateDirectory(...) и Set-Content -LiteralPath.