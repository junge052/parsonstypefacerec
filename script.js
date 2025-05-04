//======================INDEX INTRODUCTION FONT CHANGE======================
document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.intro, .typography, .intro-2');
  const fonts = [
    "'anthony', serif",
    "'new-spirit', serif",
    "'crédible', serif",
    "'picnic', sans-serif",
    "Helvetica",
    "steps-mono-thin",
    "redaction",
    "ft88"
  ];
  texts.forEach(text => {
    text.addEventListener('click', () => {
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      text.style.fontFamily = randomFont;
      console.log("Font changed to:", randomFont);
    });
  });
});
//======================INDEX LETTER ANIMATION======================
const letters = document.querySelectorAll('.letter');

letters.forEach(letter => {
  letter.addEventListener('click', function (event) {
    event.preventDefault(); // prevent default navigation

    const url = this.getAttribute('href');

    // Add scale animation
    this.classList.add('clicked');

    // Fade out other letters
    letters.forEach(other => {
      if (other !== this) {
        other.style.opacity = '0';
      }
    });

    // Delay navigation for animation
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  });
});
//====================font page title animation======================
window.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('animatedTitle');
  const font = title?.dataset.font;

  if (title && font) {
    title.style.fontFamily = `'${font}', sans-serif`;

    setTimeout(() => {
      title.classList.add('active');
    }, 1000);
  } else {
    console.warn("Missing #animatedTitle or data-font");
  }
});

//====================INDEX PAGE FONT FILTER BUTTONS======================
const floatingFonts = [
  {
    name: 'Picnic',
    category: ['fun'],
    family: "'picnic', sans-serif",
    url: 'c.html',
    style: {
      color: '#000',
      fontSize: '80px',
    }
  },
  {
    name: 'Louise',
    category: ['script'],
    family: "'Louise', script",
    url: 'm.html',
    style: {
      color: 'black',
      fontSize: '4rem',
      fontWeight: '600'
    }
  },
  {
    name: 'Anthony',
    category: ['geometric', 'sans-serif'],
    family: "'anthony', sans-serif",
    url: 'e.html',
    style: {
      color: '#000',
      fontSize: '2.8rem',
    }
  },
  {
    name: 'Credible',
    category: ['fun', 'sans-serif'],
    family: "'Crédible', sans-serif",
    url: 'l.html',
    style: {
      color: '#000',
      fontSize: '4rem',
      fontWeight: '300',
      transform: 'rotate(-3deg)'
    }
  },
  {
    name: 'Redaction 50',
    category: ['serif', 'futuristic'],
    family: "'redaction', cursive",
    url: 'o.html',
    style: {
      color: '#000',
      fontSize: '2.6rem',
      padding: '0.2rem 0.5rem',
      borderRadius: '8px'
    }
  },
  {
    name: 'FT88 (School)',
    category: ['fun', 'script','futuristic'],
    family: "'FT88', cursive",
    url: 'ft88.html',
    style: {
      color: '#000',
      fontSize: '1.7rem',
    }
  },
  {
    name: 'PP Neue Montreal',
    category: ['neutral', 'sans-serif'],
    family: "'ppneue', sans-serif",
    url: 'ppneue.html',
    style: {
      color: '#000',
      fontSize: '2.6rem',
    }
  },
  {
    name: 'Steps Mono Thin',
    category: ['neutral', 'monospace', 'geometric', 'sans-serif'],
    family: "'steps-mono-thin', 'cursive', 'sans-serif'",
    url: 'e-2.html',
    style: {
      color: '#000',
      fontSize: '2.6rem',
    }
  },
  {
    name: 'Times Dot Roman',
    category: ['neutral', 'serif'],
    family: "'timesdot', serif",
    url: 'timesdot.html',
    style: {
      color: '#000',
      fontSize: '2rem',
    }
  }
];
const typefaceContainer = document.getElementById('typeface-container');

if (typefaceContainer) {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const spacing = 150;
  const floaters = [];

  const centerX = screenW / 2;
  const centerY = screenH / 2;

  // CREATE FLOATING FONTS
  floatingFonts.forEach((font, index) => {
    const el = document.createElement('a');
    el.href = font.url;
    el.target = '_blank'; // optional
    el.className = 'typeface';
    el.textContent = font.name;

    el.dataset.category = font.category.join(',');
    el.style.fontFamily = font.family;

    // START position (huddle)
    // Huddle slightly offset from center
    const huddleRadius = 150; // adjust for how spread out the huddle is

    const offsetX = (Math.random() - 0.5) * huddleRadius;
    const offsetY = (Math.random() - 0.5) * huddleRadius;

    el.style.left = `${centerX + offsetX}px`;
    el.style.top = `${centerY + offsetY}px`;

    // FINAL target position
    const cols = Math.floor(screenW / spacing);
    const x = (index % cols) * spacing + Math.random() * 40;
    const y = Math.floor(index / cols) * spacing + Math.random() * 40;

    // Velocity
    const dx = (Math.random() - 0.5) * 1.5;
    const dy = (Math.random() - 0.5) * 1.5;

    // Apply style
    Object.entries(font.style).forEach(([key, value]) => {
      el.style[key] = value;
    });

    // Append to DOM
    typefaceContainer.appendChild(el);

    // Save floater info
    floaters.push({ el, x, y, dx, dy });
  });

  // SPREAD OUT ON CLICK
  function spreadOut() {
    floaters.forEach(f => {
      f.el.style.transition = 'left 1s ease-out, top 1s ease-out';
      f.el.style.left = `${f.x}px`;
      f.el.style.top = `${f.y}px`;
    });
  
    setTimeout(() => {
      floaters.forEach(f => {
        f.el.style.transition = ''; // clear transition for smooth animation after spread
      });
  
      animate(); // start your animation loop
      const siteContent = document.querySelector('.site-content');
if (siteContent) {
  siteContent.classList.remove('hidden');
  siteContent.classList.add('visible');
}

    }, 1000);
  }
  
  // 🟢 Add click listener outside of the function
  document.addEventListener('click', () => {
    if (!window.hasSpread) {
      spreadOut();
      window.hasSpread = true;
    }
  });
  
  

  // 🌀 MOTION LOOP
  function animate() {
    floaters.forEach(f => {
      f.x += f.dx;
      f.y += f.dy;

      if (f.x <= 0 || f.x >= screenW - 100) f.dx *= -1;
      if (f.y <= 0 || f.y >= screenH - 40) f.dy *= -1;

      f.el.style.left = `${f.x}px`;
      f.el.style.top = `${f.y}px`;
    });

    requestAnimationFrame(animate);
  }
}
// Filter logic
const buttons = document.querySelectorAll('.filter-buttons button');
const typefaces = document.querySelectorAll('.typeface');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    typefaces.forEach(type => {
      const categories = type.dataset.category.split(',');

      if (category === 'all' || categories.includes(category)) {
        type.style.opacity = '1';
      } else {
        type.style.opacity = '0';
      }
    });
  });
});

//======================GLYPH GRID GENERATION======================
const glyphGrid = document.querySelector('.glyph-grid');
if (glyphGrid) {
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?&@#%$abcdefghjiklmnopqrstuvwxyz".split("");
  const fontName = document.body.dataset.font || 'sans-serif';

  for (let i = 0; i < 200; i++) {
    const span = document.createElement('span');
    span.textContent = glyphs[i % glyphs.length];
    span.style.fontFamily = `"${fontName}", sans-serif`;
    glyphGrid.appendChild(span);
    console.log("Glyph added:", span.textContent);
  }
  //======================HOVER INTERACTION (run AFTER glyphs exist)======================
  function getRandomColor() {
    const colors = ['#8DF4FF', '#FFDD00', '#EC08CD', '#91FFB5', '#FF4D46', '#7577ED'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  glyphGrid.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'SPAN') {
      e.target.style.backgroundColor = getRandomColor();
      e.target.style.color = '#fff';
    }
  });

  glyphGrid.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'SPAN') {
      e.target.style.backgroundColor = 'transparent';
      e.target.style.color = 'black';
    }
    console.log("Number of glyphs:", glyphGrid.querySelectorAll('span').length);

  });
}
//======================FONT INFO PANEL======================
const getInfoBtn = document.getElementById('get-info-btn');
const infoPanel = document.getElementById('info-panel');

if (getInfoBtn && infoPanel) {
  console.log("Button and panel found");

  getInfoBtn.addEventListener('click', () => {
    console.log("Button clicked");
    infoPanel.classList.toggle('hidden');
  });
} else {
  console.warn("Could not find button or info panel");
}




