# Personal Notes Manager - Frontend

Ocean Professional themed, Vite-based web UI for creating, editing, and managing personal notes.

Features:
- Responsive layout with sidebar, note list, and editor pane
- Create, edit (title and content), delete notes
- LocalStorage persistence (no backend required)
- Search/filter by title and content (debounced)
- Keyboard-friendly: Shift+Enter to create, Esc to cancel selection, visible focus styles
- Pinned notes support
- Modern UI with subtle shadows, rounded corners, and smooth transitions

Technology:
- Vite (port 3000)
- React 18, TypeScript
- No external backend or env vars

Getting Started:
1. Change directory
   - cd notes_frontend
2. Install dependencies
   - npm install
3. Run the dev server (port 3000)
   - npm run dev
4. Open the app
   - Visit the running URL provided by the preview (e.g., https://…:3000)

Project Structure (key files):
- notes_frontend/index.html: HTML entry
- notes_frontend/src/main.tsx: React entry
- notes_frontend/src/App.tsx: Main layout and state wiring
- notes_frontend/src/components/*: UI components
- notes_frontend/src/hooks/useLocalNotes.ts: LocalStorage CRUD for notes
- notes_frontend/src/utils/format.ts: Utility helpers
- notes_frontend/src/styles/theme.css: Ocean Professional theme styles

Note Type:
- id: string
- title: string
- content: string
- createdAt: number
- updatedAt: number
- pinned?: boolean

Keyboard Shortcuts:
- Shift+Enter: New note
- Esc: Deselect selection (close editor)
- Ctrl/Cmd+Enter: Save/blur editor fields

Theme:
- primary: #2563EB
- secondary/success: #F59E0B
- error: #EF4444
- background: #f9fafb
- surface: #ffffff
- text: #111827
