# unforgetti — Recipe Manager

A React + TypeScript assignment of a personal recipe management mini-app.

---

## Quick Start

### With Docker
```bash
docker build -t recipe-box .
docker run -p 3000:3000 recipe-box
```

Then open [http://localhost:3000](http://localhost:3000).

### Live Demo

[https://react-recipe-manager-2x1nhpvqp-elviras-projects-a0568c57.vercel.app/](https://react-recipe-manager-2x1nhpvqp-elviras-projects-a0568c57.vercel.app/)

---

## Screenshots

*Coming soon.*

---

## Tech Stack

| Technology | Details |
|---|---|---|
| React v19 | Required by assignment |
| TypeScript v5.9 | Required by assignment |
| Docker + nginx | Required by assignment, multi-stage build for a small production image |
| react-router-dom v7 | Client-side routing |
| shadcn/ui (with Tailwind CSS) | Headless and composable UI library |
| localStorage | Simple persistence, appropriate for a client-only app |
| Cloudinary | Image hosting and dynamic image transformation |


---

## UX Decisions

*Content TBA.*


---

## Challenges

The main challenge was scope management, i.e. deciding which features to implement within a reasonable timeframe without falling into perfectionism. This type of product can have an infinite amount of features, so drawing the line between "good enough for now" and "worth doing properly" required a fair amount of prioritisation.

One technical decision worth mentioning was the image upload flow. Uploading on form submission is simpler and that's what I implemented at first, but uploading immediately on file selection gives better UX (progress feedback, instant preview). The tradeoff is orphaned images, which led to the localStorage tracking approach documented in the Future Improvements section.


---

## Future Improvements

- **Cloudinary orphan cleanup** — A scheduled backend job (e.g. Node.js cron) would periodically delete uploaded images whose `public_id` was never marked as used, keeping storage clean. The frontend already tracks orphaned `public_id`s in localStorage in preparation for this.
- **Filters panel always visible on desktop** — The current sheet pattern requires extra clicks. On wider screens, a persistent sidebar would be more efficient.
- **Character limits** — Description, steps, and notes should have max character limits to prevent extra long entries.
- **Cooking mode** — A focused view where instructions appear one at a time in large text, carousel-style. Ingredients would follow a similar pattern. Would also keep the screen awake (similar to Expo's KeepAwake) so the device doesn't lock while cooking.
- **Flexible time inputs** — Prep and cook times are currently in minutes only. Some recipes require hours or days of preparation, so breaking the input into days, hours, and minutes would be better.
- **Recipe sharing** — Export or shareable links for individual recipes.
- **Filter by ingredients** — Allow users to filter recipes by available ingredients, with the option to match recipes containing some or all of the selected ingredients.

Beyond these, other features worth exploring include recipe suggestions, smart ingredient highlighting within steps, and grocery list generation.

---

## Time Spent
Approximately 40 - 50 hours.
