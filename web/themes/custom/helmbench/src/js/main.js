/**
 * @file
 * Main JavaScript entry point for the HELMbench theme.
 *
 * This file is compiled to dist/js/main.js and included via helmbench.libraries.yml.
 *
 * Drupal's JavaScript API:
 * - Drupal.behaviors: Attach JS to elements (re-runs on AJAX updates)
 * - once(): Ensure code runs only once per element
 * - Drupal.t(): Translation function
 *
 * Documentation: https://www.drupal.org/docs/drupal-apis/javascript-api
 */

/**
 * TODO: Add your global JavaScript behaviors here.
 *
 * Example behavior structure:
 *
 * (function (Drupal, once) {
 *   'use strict';
 *
 *   Drupal.behaviors.helmbenchExample = {
 *     attach: function (context, settings) {
 *       // once() ensures this only runs once per element, even after AJAX
 *       once('helmbench-example', '.my-element', context).forEach(function (element) {
 *         // Your initialization code here
 *         element.addEventListener('click', function (e) {
 *           // Handle click
 *         });
 *       });
 *     },
 *     detach: function (context, settings, trigger) {
 *       // Optional: Cleanup when elements are removed (e.g., AJAX replace)
 *       // Only needed if you set up listeners that need explicit removal
 *     }
 *   };
 *
 * })(Drupal, once);
 */

/**
 * Example: Mobile Navigation Toggle
 *
 * Uncomment and customize when you build the mobile navigation.
 *
 * (function (Drupal, once) {
 *   'use strict';
 *
 *   Drupal.behaviors.helmbenchMobileNav = {
 *     attach: function (context, settings) {
 *       once('mobile-nav-toggle', '.mobile-nav-toggle', context).forEach(function (toggle) {
 *         const drawer = document.querySelector('.mobile-nav-drawer');
 *         const overlay = document.querySelector('.mobile-nav-overlay');
 *
 *         toggle.addEventListener('click', function () {
 *           drawer.classList.toggle('is-open');
 *           document.body.classList.toggle('nav-open');
 *         });
 *
 *         // Close on overlay click
 *         if (overlay) {
 *           overlay.addEventListener('click', function () {
 *             drawer.classList.remove('is-open');
 *             document.body.classList.remove('nav-open');
 *           });
 *         }
 *
 *         // Close on Escape key
 *         document.addEventListener('keydown', function (e) {
 *           if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
 *             drawer.classList.remove('is-open');
 *             document.body.classList.remove('nav-open');
 *           }
 *         });
 *       });
 *     }
 *   };
 *
 * })(Drupal, once);
 */

/**
 * Example: Accordion Component
 *
 * (function (Drupal, once) {
 *   'use strict';
 *
 *   Drupal.behaviors.helmbenchAccordion = {
 *     attach: function (context, settings) {
 *       once('accordion', '.accordion', context).forEach(function (accordion) {
 *         const triggers = accordion.querySelectorAll('.accordion__trigger');
 *
 *         triggers.forEach(function (trigger) {
 *           trigger.addEventListener('click', function () {
 *             const item = trigger.closest('.accordion__item');
 *             const content = item.querySelector('.accordion__content');
 *             const isOpen = item.classList.contains('is-open');
 *
 *             // Close all items (optional: remove for multi-open accordion)
 *             accordion.querySelectorAll('.accordion__item').forEach(function (i) {
 *               i.classList.remove('is-open');
 *             });
 *
 *             // Toggle clicked item
 *             if (!isOpen) {
 *               item.classList.add('is-open');
 *             }
 *
 *             // Update ARIA attributes
 *             trigger.setAttribute('aria-expanded', !isOpen);
 *           });
 *         });
 *       });
 *     }
 *   };
 *
 * })(Drupal, once);
 */
