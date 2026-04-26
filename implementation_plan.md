# Revamp Leader View

## Proposed Changes

### 1. Local History Toggles and 4th Toggle
- Remove Firebase sync logic from `toggleHistorySetting` in `index.html`.
- Update `historySettings` state to include `showManualPoints` (default: true).
- Modify the history filtering logic to use `showManualPoints` for filtering manually added points (where `amount > 0` and `!isWheel`).
- Redesign the toggles to look less "weird". I will convert them to horizontal pill buttons instead of vertical toggle sliders to save vertical space and look more unified.
- Add "إنجازات" toggle to the set.
- Move the user selection button under the toggles.

### 2. Member Selection Overlay
- Create a new state `showMemberSelectOverlay` (can be used to track which action triggered it: `'history'` or `'adminTarget'`).
- Replace the `<select>` dropdowns for both `historyFilterUser` and `targetUser` with a custom button that says the current selected member or "اختر العضو" and shows an icon.
- When clicked, open a full-screen overlay (glassmorphism/blur effect).
- The overlay will render the members grid (same design as the initial login screen avatars).
- Clicking an avatar selects the member and closes the overlay.

### 3. Point Setting Sound Effect
- In `performSetPoints`, change the call to play sound `1.mp3` instead of `30` (which resolved to `4.mp3`).

### 4. Global Password Disable Feature
- Introduce `isPasswordsEnabled` state, synced with Firebase at `settings/passwordsEnabled`. Default to `true`.
- Add a button above the two main dashboard panels in the Admin view to toggle this setting. 
  - Text will alternate between "إيقاف كلمات المرور" (red/warning style) and "تشغيل كلمات المرور" (green/safe style).
- In `selectUser`, check `isPasswordsEnabled`. If false, bypass the `memberPasswordMode` entirely and call `finishMemberLogin(name)` immediately.

## Open Questions
- What exact styling do you prefer for the toggles? I plan to make them sleek pill-shaped toggle buttons side-by-side, instead of the current switch-like sliders.
