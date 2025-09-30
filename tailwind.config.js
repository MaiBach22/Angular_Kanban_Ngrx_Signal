/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",], theme: {
    extend: {
      colors: {
          'board-bg': 'var(--color-board-bg)',
          'border': 'var(--color-border)',
          'button-bg': 'var(--color-button-bg)',
          'button-bg-hover': 'var(--color-button-bg-hover)',
          'backlog': 'var(--color-backlog)',
          'todo': 'var(--color-todo)',
          'in-progress': 'var(--color-in-progress)',
          'done': 'var(--color-done)',
          'ticket-bg': 'var(--color-ticket-bg)',
          'ticket-outline': 'var(--color-ticket-outline)',
      }
    },
  }, plugins: [],
}

