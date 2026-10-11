# Language selection and entry flow review

## Scope and coverage

Scope: the Thai/English selector, first-visit Modhiw follow dialog, entry confirmation, and preservation of lesson state after changing language. All eight weeks were exercised in visual learning, notes, flashcards and practice. This is a product-flow review, not a review of a branch or pull request.

Stack: React 18, TypeScript, Vite, Arc semantic tokens, Radix tabs and Motion. Conventions: existing README and Arc foundation/motion token files; no project AGENTS.md, CONTRIBUTING.md, CODING_STANDARDS.md or CLAUDE.md was found. The requested better-interface and improve-animations skills were installed in `.agents/skills/`; the six owning better-interface domain guides were read from jakubkrehel/skills for this review.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | `FollowGate.tsx:15–36`, `LanguageSwitch.tsx:5–8`; keyboard Tab loop, Escape, native dialog, wrapping checkbox label and focus on entry | Keyboard flow passed; manual screen-reader walk not verified |
| Layout | `studio.css:250–310`; Thai/English dialog at 320, 390, 768px; app at 320–1440px | No horizontal overflow; both actions reachable by scrolling |
| Writing | `FollowGate.tsx:40–54`, `i18n/overrides.json`; Instagram visit and self-confirmation states | Clear next actions; no claim of Instagram API verification |
| Typography | Rendered Thai/English desktop/mobile views, document lang, selected-language button lang, mobile search font | Headings and labels readable; desktop browser 200% zoom not verified |
| Colors | Rendered/composited foreground and background values for dialog headline, body, CTA, captions and selected language, light/dark | Measured text pairs pass 4.5:1; lowest sampled ratio 6.28:1 |
| UI polish | Language switch has stable labels and static selected underline; dialog scroll containment, entry animation, reduced motion | One-shot entrance, short press feedback, and reduced-motion fade passed |

## Findings and applied fixes

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| HIGH | Accessibility | `src/components/studio/FollowGate.tsx:21` | Tab could move from the final control to browser chrome | Loop Tab/Shift+Tab through enabled dialog controls | Keeps the entry task reachable with the keyboard |
| HIGH | Colors | `src/components/studio/studio.css:308` | Global heading color remained dark on a dark dialog | Use `var(--foreground)` for the dialog heading | Preserves readable contrast in both appearances |
| MEDIUM | UI polish | `src/context/AppContext.tsx:53` | Foreground and animated background colors changed at different speeds during theme switching | Suppress CSS transitions during the theme swap | Avoids transient unreadable color pairs |
| MEDIUM | Writing | `src/components/studio/FollowGate.tsx:51` | A visit to the profile could be mistaken for verified following | Explicit self-confirmation checkbox and privacy note | Accurately describes what this client-side flow can establish |
| MEDIUM | UI polish | `src/components/arc/button/button.tsx:78` | React 18 label phase did not forward Motion's ref; a locale change could crossfade old/new languages | Forward the ref and keep the label key stable across language switches | Prevents ref warnings and overlapping labels |

All listed fixes were applied; no HIGH finding remains in the inspected flow.

## Motion audit

The improve-animations audit was scoped to this entry flow and language selector. Existing teaching animations remain explanatory rather than decorative. The entry dialog is infrequent: it uses a 220ms ease-out entrance from scale .97 and 12px translation, animating only opacity/transform. Reduced motion uses a 150ms opacity fade. Language switching leaves static labels and selected state in place, without label entrance/exit animation. Repeated confirmation states change instantly and remain understandable without motion. Theme transition suppression was the main corrective motion finding.

No additional motion is needed for the checkbox or language change; the selected underline, check icon and enabled action provide feedback. A user can interact during the dialog entrance. Real-device gesture feel and 10% animation-panel playback were not verified.

## Verification

- `npm run check`: course sources, 278 teaching-process variants, all 136 topic models, 12,894 source strings and 191 variable templates passed.
- `npm run build`: production build passed.
- Browser entry flow: initial lesson lock, Escape cannot bypass, Instagram URL, required visit and checkbox, session unlock and remembered language passed.
- Browser learning flow: all eight weeks in English visual/notes/cards/practice had no Thai text left in the checked lesson DOM; translated flashcard backs and quiz feedback passed.
- Browser state: changing language preserved selected week, simulation step, selected practice topic and chosen answer.
- PDF reader: original canvas still renders; extracted slide text changes between Thai and English.
- Light/dark contrast: measured composited pairs, including translucent selected-language backgrounds; sampled ratios are 6.28–19.68:1.
- Responsive checks: 320, 390, 768, 1024 and 1440 CSS-pixel widths passed; reduced-motion dialog uses `follow-fade`.
- Not verified: manual screen-reader operation, 200% desktop browser zoom, actual Instagram account follow status, and visual translation of image-only PDF content. The PDF remains the authoritative original.

## Verdict

Approve for the inspected entry/language flow and sampled lesson surfaces. Manual screen-reader and desktop zoom checks remain unverified; this is not a whole-app accessibility certification or a human linguistic review of every sentence.
