/**
 * @file
 * Theme Toggle Component JavaScript
 *
 * This file handles the click interaction for the dark mode toggle button.
 * It works together with:
 * - The inline script in html.html.twig (sets initial theme on page load)
 * - The CSS classes in main.css (the .dark class swaps CSS variables)
 * - The Twig template theme-toggle.twig (the button markup)
 *
 * HOW IT WORKS:
 * 1. When page loads, the inline script in <head> checks localStorage and
 *    system preference, then adds .dark class to <html> if needed.
 * 2. This script attaches a click handler to the toggle button.
 * 3. When clicked, it toggles the .dark class and saves the preference.
 * 4. It also listens for system preference changes (e.g., OS switches to dark mode).
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Theme toggle behavior.
   *
   * Drupal.behaviors is how Drupal attaches JavaScript to the page.
   * The "attach" function runs when the page loads, and also when
   * new content is added via AJAX (like infinite scroll or forms).
   */
  Drupal.behaviors.themeToggle = {
    attach: function (context) {
      // Find all theme toggle buttons in the page.
      // The 'once' function ensures we only attach the handler once per element,
      // even if Drupal calls attach() multiple times (which it does with AJAX).
      once('theme-toggle', '.theme-toggle', context).forEach(function (button) {

        // Add click event listener to the button
        button.addEventListener('click', function () {
          // Get the <html> element - this is where we add/remove the .dark class
          var htmlElement = document.documentElement;

          // Check if dark mode is currently active
          var isDark = htmlElement.classList.contains('dark');

          if (isDark) {
            // Currently in dark mode → switch to light mode
            htmlElement.classList.remove('dark');
            // Save the user's choice to localStorage so it persists across page loads
            localStorage.setItem('theme', 'light');
          } else {
            // Currently in light mode → switch to dark mode
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          }
        });

      });

      // Listen for system preference changes.
      // This runs once (not per-element), so we use a flag to prevent duplicates.
      if (!Drupal.behaviors.themeToggle._systemListenerAttached) {
        Drupal.behaviors.themeToggle._systemListenerAttached = true;

        // window.matchMedia() lets us check CSS media queries from JavaScript.
        // Here we're checking the prefers-color-scheme media query.
        var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // When the system preference changes (e.g., user enables OS dark mode)...
        darkModeMediaQuery.addEventListener('change', function (event) {
          // Only auto-switch if the user hasn't manually set a preference.
          // If they clicked the toggle, we respect their explicit choice.
          if (!localStorage.getItem('theme')) {
            // event.matches is true if the media query matches (system prefers dark)
            if (event.matches) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        });
      }

    }
  };

})(Drupal, once);
