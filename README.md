# unforgetti — Recipe Manager

A React + TypeScript assignment of a personal recipe management mini-app.

---

## Quick Start

### Environment Variables

Copy `.env.example` to `.env` and fill in the values (sent separately):
```bash
cp .env.example .env
```

### With Docker
```bash
docker build -t recipe-box .
docker run -p 3000:3000 recipe-box
```

Then open [http://localhost:3000](http://localhost:3000).

### Live Demo

[https://react-recipe-manager-2x1nhpvqp-elviras-projects-a0568c57.vercel.app/](https://react-recipe-manager-2x1nhpvqp-elviras-projects-a0568c57.vercel.app/)

### Tips
- Press `d` to toggle dark mode

---

## Screenshots
<img width="1187" height="776" alt="mobile-screenshots-1" src="https://github.com/user-attachments/assets/f5074a76-48ae-4457-b32c-aca2a4b2e8bd" />
<img width="804" height="776" alt="mobile-screenshots-2" src="https://github.com/user-attachments/assets/b25b54e5-b6db-4871-9b91-0d272e75a2f8" />
<img width="1254" height="737" alt="desktop-recipe_page" src="https://github.com/user-attachments/assets/726840d6-3be4-430b-9def-d36122db50f0" />
<img width="1256" height="737" alt="desktop-home" src="https://github.com/user-attachments/assets/4288f42b-078a-4288-a455-38f6ac9985b4" />
<img width="1257" height="736" alt="desktop-edit_recipe" src="https://github.com/user-attachments/assets/8aa79836-355c-4a23-9909-1b4b77fd88b7" />
<img width="1254" height="734" alt="desktop-add_recipe" src="https://github.com/user-attachments/assets/87208cc2-07fd-47c2-88f7-e15f11594acd" />


---

## Tech Stack

| Technology | Details |
|---|---|
| React v19 | Required by assignment |
| TypeScript v5.9 | Required by assignment |
| Docker + nginx | Required by assignment, multi-stage build for a small production image |
| react-router-dom v7 | Client-side routing |
| shadcn/ui (with Tailwind CSS) | Headless and composable UI library |
| localStorage | Simple persistence, appropriate for a client-only app |
| Cloudinary | Image hosting and dynamic image transformation |


---

## UX Decisions

**Recipe card content** — The card shows image, title, description, total time, servings, and the favorite toggle. Tags, separate prep/cook times, ingredient counts, and step counts are intentionally omitted. These add visual clutter without meaningfully helping someone decide whether a recipe interests them.

**Selected filters always visible** — Filters live inside a sheet to save space, but the currently active filters are always shown inline above the results. On mobile this costs some vertical space, but knowingat a glance what filters are applied and being able to remove them one by one is worth it, especially since the filter panel is hidden by default.

**Filters in a sheet instead of a drawer** — Drawers are generally nicer on mobile since they can be dismissed with a swipe. However, the prep and cook time sliders created a drag conflict with the drawer's swipe-to-close gesture, making the experience unreliable. A sheet avoids this entirely.

**Recipe card is not fully clickable** — Only the image and title navigate to the recipe. Since the favorite button performs a different action, making the entire card a link would create a confusing interaction where part of the card does one thing and the rest does another.

**Collapsible ingredients on mobile** — Once you've gathered your ingredients, that section is no longer useful. Being able to collapse it frees up screen space for the instructions.

**Different layouts for mobile and desktop on the recipe page** — On mobile, a vertical layout is the only sensible option. On desktop, placing the ingredient list and image on the right panel and the main recipe content on the left makes better use of horizontal space and creates a cleaner information hierarchy.

**General UI scope** — There are many UI improvements I would have liked to implement, some of which are noted in Future Improvements. For this assignment, I focused on what made the most sense within a reasonable timeframe.


---

## Challenges

**Scope management** — The main challenge was deciding which features to implement within a reasonable timeframe without falling into perfectionism. This type of product can have an infinite amount of features, so drawing the line between "good enough for now" and "worth doing properly" required a fair amount of prioritisation.

**Image upload flow** — Uploading on form submission is simpler and that's what I implemented at first, but uploading immediately on file selection gives better UX (progress feedback, instant preview). The tradeoff is orphaned images, which led to the localStorage tracking approach documented in the Future Improvements section.

**Form architecture** — React 19's new `action`-based form API was considered but not used. The create and edit forms share the same section components, and some parts have custom validation logic that doesn't map cleanly to the native form model (requiring at least one ingredient, removing empty steps before submission, multi-field ingredient entries). A controlled state approach with `onSubmit` gave more predictable behaviour across both forms.

**Component conflicts inside the filter sheet** — Some filter components didn't behave as expected when rendered inside a Radix sheet. The tags combobox in particular wouldn't fire selection events until `modal={false}` was added to the sheet, which disables Radix's default focus trapping. This took some debugging to identify since the issue wasn't obvious from the component code alone.

**404 redirect constraints** — Redirecting to a 404 page using `navigate()` directly in the render body causes React to complain about side effects during rendering. The correct approach is to wrap the navigation in a `useEffect`, even though it results in a brief render before the redirect fires.


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
