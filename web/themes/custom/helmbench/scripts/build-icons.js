#!/usr/bin/env node

/**
 * Build Icons Script
 *
 * Generates an SVG sprite file from Lucide icons listed in src/icons/icons.json.
 * The sprite is output to dist/icons/sprite.svg and can be included in templates.
 *
 * Usage: node scripts/build-icons.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const iconsConfigPath = path.join(__dirname, '../src/icons/icons.json');
const outputPath = path.join(__dirname, '../dist/icons/sprite.svg');
const distDir = path.dirname(outputPath);

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read icon list from config
let iconList = [];
try {
  const configContent = fs.readFileSync(iconsConfigPath, 'utf8');
  const config = JSON.parse(configContent);
  iconList = config.icons || [];
} catch (error) {
  console.error(`Error reading ${iconsConfigPath}:`, error.message);
  process.exit(1);
}

if (iconList.length === 0) {
  console.warn('No icons found in icons.json. Add icon names to src/icons/icons.json');
  // Create empty sprite file
  fs.writeFileSync(outputPath, '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><defs></defs></svg>');
  console.log(`Created empty sprite at ${outputPath}`);
  process.exit(0);
}

// Generate sprite
console.log(`Generating sprite for ${iconList.length} icons...`);

const spriteSymbols = [];

iconList.forEach((iconName) => {
  try {
    // Try to import the icon from lucide package
    // Lucide icons are in lucide/dist/esm/icons/{name}.js
    let iconData;
    try {
      // Use dynamic import for ESM modules
      const iconPath = require.resolve(`lucide/dist/esm/icons/${iconName}.js`);
      // For CommonJS, we need to use a workaround
      // Read the file and extract the icon data
      const iconFile = fs.readFileSync(iconPath, 'utf8');
      
      // Extract the icon function/object - this is a simplified approach
      // The icon file exports a function that returns icon data
      // We'll use eval in a safe way, or better: parse the module
      
      // Alternative: Use require with .default for CommonJS compatibility
      delete require.cache[iconPath];
      const iconModule = require(iconPath);
      iconData = iconModule.default || iconModule;
    } catch (importError) {
      // Fallback: try direct require
      try {
        iconData = require(`lucide/dist/esm/icons/${iconName}`);
        if (iconData && typeof iconData === 'function') {
          iconData = iconData({});
        }
      } catch (fallbackError) {
        console.warn(`Warning: Icon "${iconName}" not found in Lucide. Skipping.`);
        return;
      }
    }

    if (!iconData || !Array.isArray(iconData)) {
      console.warn(`Warning: Icon "${iconName}" has invalid data structure. Skipping.`);
      return;
    }

    // Lucide icons use hyperscript format: ["svg", {attrs}, [children]]
    if (iconData[0] !== 'svg') {
      console.warn(`Warning: Icon "${iconName}" is not an SVG. Skipping.`);
      return;
    }

    const svgAttrs = iconData[1] || {};
    const children = iconData[2] || [];
    
    // Build SVG path/children as string
    const svgContent = children.map((child) => {
      if (!Array.isArray(child) || child.length < 2) return '';
      
      const tag = child[0];
      const childAttrs = child[1] || {};
      
      // Build attributes string
      const attrString = Object.entries(childAttrs)
        .map(([key, value]) => {
          // Escape quotes in attribute values
          const escapedValue = String(value).replace(/"/g, '&quot;');
          return `${key}="${escapedValue}"`;
        })
        .join(' ');
      
      return `<${tag} ${attrString} />`;
    }).join('');

    // Create symbol element with default Lucide styling
    const viewBox = svgAttrs.viewBox || '0 0 24 24';
    const symbol = `<symbol id="icon-${iconName}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgContent}</symbol>`;
    
    spriteSymbols.push(symbol);
    console.log(`  ✓ Added ${iconName}`);
  } catch (error) {
    console.warn(`Warning: Could not process icon "${iconName}":`, error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
  }
});

// Build sprite SVG
const sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <defs>
${spriteSymbols.map(s => `    ${s}`).join('\n')}
  </defs>
</svg>`;

// Write sprite file
fs.writeFileSync(outputPath, sprite, 'utf8');

console.log(`\n✓ Sprite generated successfully!`);
console.log(`  Output: ${outputPath}`);
console.log(`  Icons: ${spriteSymbols.length}/${iconList.length}`);
