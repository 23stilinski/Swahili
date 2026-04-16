# 🌍 Kujifunza Kiswahili

An interactive Swahili learning website — built to grow week by week.

---

## 📁 Project Structure

```
kiswahili/
│
├── index.html          ← The main page (don't edit this often)
│
├── css/
│   └── style.css       ← All the site styling
│
├── js/
│   └── main.js         ← All the site logic + LESSON REGISTRY
│
└── lessons/            ← 📂 PUT ALL YOUR LESSON FILES HERE
    ├── swahili_tenses_lesson.html
    ├── swahili_negation.html
    ├── swahili_sentence_structure.html
    ├── swahili_object_infixes.html
    ├── swahili_pa_ku_mu.html
    ├── swahili_a_of_association.html
    ├── swahili_word_order.html
    ├── swahili_body_lesson.html
    ├── swahili_animal_game.html
    └── swahili_body_parts_game.html
```

---

## ➕ How to Add a New Lesson Each Week

### Step 1 — Create your lesson file
Put your new HTML lesson file in the `/lessons/` folder.
Name it something clear, like `week8_colours.html`.

### Step 2 — Register it in main.js
Open `js/main.js` and add a new entry to the `LESSONS` array at the top:

```js
{
  id: 'colours',                        // unique ID, no spaces
  title: 'Colours — Rangi',             // title shown on the card
  description: 'Learn all colours...',  // short description
  icon: '🎨',                           // emoji
  category: 'vocab',                    // 'grammar', 'vocab', or 'game'
  badge: 'VOCAB',                       // badge text on card
  week: 8,                              // week number
  file: 'lessons/week8_colours.html',   // path to your file
  tags: ['colours', 'rangi', 'red'],    // search keywords
  isNew: true,                          // shows NEW badge (set to false after a week)
},
```

### Step 3 — Save, commit, push
That's it! The card and sidebar item appear automatically.

---

## 🗂 Categories

| Category  | Used for                          | Colour |
|-----------|-----------------------------------|--------|
| `grammar` | Grammar rules & references        | Blue   |
| `vocab`   | Vocabulary lists & word groups    | Orange |
| `game`    | Interactive games & quizzes       | Green  |

---

## 🚀 Publishing to GitHub Pages

1. Push all files to your GitHub repo
2. Go to **Settings → Pages → Branch: main → / (root)**
3. Your site will be live at `https://yourusername.github.io/kiswahili`

---

## ✏️ VS Code Workflow

Each week:
1. Create your new lesson HTML in `/lessons/`
2. Add the entry to `js/main.js`
3. Preview with Live Preview extension
4. Source Control → Commit → Sync
5. Done! Site updates in ~60 seconds.
