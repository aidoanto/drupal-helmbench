/**
 * @file
 * Main JavaScript entry point for the HELMbench theme.
 *
 * This file is included via helmbench.libraries.yml.
 *
 * Drupal's JavaScript API:
 * - Drupal.behaviors: Attach JS to elements (re-runs on AJAX updates)
 * - once(): Ensure code runs only once per element
 * - Drupal.t(): Translation function
 *
 * Documentation: https://www.drupal.org/docs/drupal-apis/javascript-api
 */

/**
 * Build TOC List and Scroll Spy
 *
 * Builds the mobile TOC dropdown list from H1 + H2 headings on the page.
 * Uses Intersection Observer to track which heading is active.
 * Updates both the mobile sticky TOC and desktop TOC sidebar.
 */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.helmbenchScrollSpy = {
    attach: function (context, settings) {
      // Only run once on the main document
      once('scroll-spy', 'body', context).forEach(function () {
        // Get the H1 (page title) and all H2 headings in main content
        const h1 = document.querySelector('#main-content h1');
        const h2s = document.querySelectorAll('#main-content h2[id]');
        
        // Build array of all headings (H1 first, then H2s)
        const headings = [];
        if (h1) {
          // Ensure H1 has an ID for linking
          if (!h1.id) {
            h1.id = 'page-title';
          }
          headings.push(h1);
        }
        h2s.forEach(function (h2) {
          headings.push(h2);
        });

        if (headings.length === 0) {
          return;
        }

        // Build the mobile TOC list
        const mobileTocList = document.querySelector('.sticky-toc__list');
        if (mobileTocList) {
          buildTocList(mobileTocList, headings);
        }

        // Build the desktop TOC list (replace toc_filter output entirely)
        const desktopTocContainer = document.querySelector('.region-toc');
        if (desktopTocContainer) {
          // Clear all existing content from toc_filter module
          desktopTocContainer.innerHTML = '';
          // Create a new list element
          const desktopTocList = document.createElement('ul');
          desktopTocContainer.appendChild(desktopTocList);
          // Build the list with all headings
          buildTocList(desktopTocList, headings);
        }

        // Get all TOC links (both desktop sidebar and mobile dropdown)
        const tocLinks = document.querySelectorAll('.region-toc a, .sticky-toc__list a');
        
        // Get the mobile sticky TOC current section display
        const stickyTocCurrent = document.querySelector('.sticky-toc__current');
        
        // Track the currently active heading
        let activeHeading = null;

        /**
         * Build TOC list HTML from headings array
         */
        function buildTocList(container, headings) {
          container.innerHTML = '';
          
          headings.forEach(function (heading) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = '#' + heading.id;
            a.textContent = heading.textContent.trim();
            a.className = 'toc-link block py-2 transition-all duration-200';
            
            // Add heading level class (H1 gets primary color)
            if (heading.tagName === 'H1') {
              a.classList.add('toc-link--h1', 'text-primary');
            } else {
              a.classList.add('toc-link--h2');
            }
            
            li.appendChild(a);
            container.appendChild(li);
          });
        }

        /**
         * Update active states on TOC links and mobile header
         */
        function setActiveSection(heading) {
          if (!heading || heading === activeHeading) {
            return;
          }
          
          activeHeading = heading;
          const headingId = heading.id;
          const headingText = heading.textContent.trim();

          // Update all TOC link active states (mobile + desktop)
          const allTocLinks = document.querySelectorAll('.region-toc a, .sticky-toc__list a');
          allTocLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            const isActive = href === '#' + headingId;
            const isH1 = link.classList.contains('toc-link--h1');
            
            // Toggle active class
            link.classList.toggle('is-active', isActive);
            
            // Apply active/inactive styling (H1 always visible, just changes size)
            if (isActive) {
              link.classList.remove('text-sm', 'opacity-50', 'text-xl');
              link.classList.add('text-lg');
            } else if (isH1) {
              // H1 is always visible but smaller when inactive
              link.classList.remove('text-lg', 'text-xl');
              link.classList.add('text-base');
              // Don't add opacity-50 to H1
            } else {
              // Regular H2s get smaller and faded
              link.classList.remove('text-lg');
              link.classList.add('text-sm', 'opacity-50');
            }
          });

          // Update mobile sticky header text
          if (stickyTocCurrent) {
            // Clear existing content and set new text
            stickyTocCurrent.textContent = headingText;
            
            // Apply primary color for H1
            if (heading.tagName === 'H1') {
              stickyTocCurrent.classList.add('text-primary');
            } else {
              stickyTocCurrent.classList.remove('text-primary');
            }
          }
        }

        /**
         * Find the current active heading based on scroll position.
         * The active heading is the one that has scrolled past (or is at) the top of the viewport.
         */
        function findActiveHeading() {
          // Threshold: how many pixels from the top of the viewport to consider a heading "active"
          const threshold = 100;
          
          let activeIndex = 0; // Default to first heading
          
          // Find the last heading that's above or at the threshold
          for (let i = 0; i < headings.length; i++) {
            const rect = headings[i].getBoundingClientRect();
            // If the heading's top is above or at the threshold, it's a candidate
            if (rect.top <= threshold) {
              activeIndex = i;
            } else {
              // Once we find a heading below the threshold, stop
              break;
            }
          }
          
          setActiveSection(headings[activeIndex]);
        }

        // Use scroll event with throttling for better performance
        let ticking = false;
        function onScroll() {
          if (!ticking) {
            window.requestAnimationFrame(function() {
              findActiveHeading();
              ticking = false;
            });
            ticking = true;
          }
        }

        window.addEventListener('scroll', onScroll, { passive: true });

        // Set initial active section
        findActiveHeading();
      });
    }
  };

})(Drupal, once);


/**
 * Mobile Sticky TOC Dropdown
 *
 * Handles the toggle behavior for the mobile TOC dropdown.
 * The chevron rotates when dropdown is open.
 */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.helmbenchStickyToc = {
    attach: function (context, settings) {
      once('sticky-toc', '.sticky-toc__trigger', context).forEach(function (trigger) {
        const dropdown = document.getElementById('sticky-toc-dropdown');
        
        if (!dropdown) {
          return;
        }

        /**
         * Toggle dropdown open/closed
         */
        function toggleDropdown() {
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          const newState = !isExpanded;
          
          trigger.setAttribute('aria-expanded', newState);
          dropdown.setAttribute('aria-hidden', !newState);
          dropdown.classList.toggle('hidden', !newState);
        }

        /**
         * Close dropdown
         */
        function closeDropdown() {
          trigger.setAttribute('aria-expanded', 'false');
          dropdown.setAttribute('aria-hidden', 'true');
          dropdown.classList.add('hidden');
        }

        // Toggle on trigger click
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          toggleDropdown();
        });

        // Close when clicking a TOC link
        dropdown.addEventListener('click', function (e) {
          if (e.target.tagName === 'A') {
            closeDropdown();
          }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
            closeDropdown();
            trigger.focus();
          }
        });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
          if (trigger.getAttribute('aria-expanded') === 'true') {
            const stickyToc = trigger.closest('.sticky-toc');
            if (!stickyToc.contains(e.target)) {
              closeDropdown();
            }
          }
        });
      });
    }
  };

})(Drupal, once);


/**
 * Mobile Navigation Drawer
 *
 * Handles the hamburger menu toggle and drawer slide-in animation.
 */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.helmbenchMobileNav = {
    attach: function (context, settings) {
      once('mobile-nav-toggle', '.mobile-nav-toggle', context).forEach(function (toggle) {
        const drawer = document.getElementById('mobile-nav-drawer');
        const overlay = document.querySelector('.mobile-nav-overlay');
        const closeBtn = document.querySelector('.mobile-nav-close');

        if (!drawer) {
          return;
        }

        /**
         * Open the navigation drawer
         */
        function openDrawer() {
          drawer.classList.add('is-open');
          drawer.setAttribute('aria-hidden', 'false');
          toggle.setAttribute('aria-expanded', 'true');
          
          if (overlay) {
            overlay.classList.add('is-open');
          }
          
          // Prevent body scroll when drawer is open
          document.body.style.overflow = 'hidden';
          
          // Focus the close button for accessibility
          if (closeBtn) {
            closeBtn.focus();
          }
        }

        /**
         * Close the navigation drawer
         */
        function closeDrawer() {
          drawer.classList.remove('is-open');
          drawer.setAttribute('aria-hidden', 'true');
          toggle.setAttribute('aria-expanded', 'false');
          
          if (overlay) {
            overlay.classList.remove('is-open');
          }
          
          // Restore body scroll
          document.body.style.overflow = '';
          
          // Return focus to toggle button
          toggle.focus();
        }

        // Open drawer on toggle click
        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          openDrawer();
        });

        // Close drawer on close button click
        if (closeBtn) {
          closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closeDrawer();
          });
        }

        // Close drawer on overlay click
        if (overlay) {
          overlay.addEventListener('click', function () {
            closeDrawer();
          });
        }

        // Close drawer on Escape key
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
          }
        });

        // Close drawer when clicking a navigation link
        drawer.addEventListener('click', function (e) {
          if (e.target.tagName === 'A') {
            closeDrawer();
          }
        });
      });
    }
  };

})(Drupal, once);
