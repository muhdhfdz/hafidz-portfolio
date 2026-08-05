function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(opts)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value);
  }
  children.forEach((c) => c && node.appendChild(c));
  return node;
}

function getYoutubeEmbed(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url; // assume already an embeddable URL
}

async function init() {
  let data;
  try {
    const res = await fetch('content/site.json', { cache: 'no-store' });
    data = await res.json();
  } catch (e) {
    console.error('Could not load site content', e);
    return;
  }

  document.title = `${data.name} — ${data.role}`;

  // Hero
  document.getElementById('heroRole').textContent = data.role;
  document.getElementById('heroName').textContent = data.name;
  document.getElementById('heroRoleSecondary').textContent = data.roleSecondary;
  document.getElementById('heroTagline').textContent = data.heroTagline;
  const heroPhoto = document.getElementById('heroPhoto');
  heroPhoto.src = data.profileImage;
  heroPhoto.alt = `Portrait of ${data.name}`;

  // Metrics / proof strip
  const metricsStrip = document.getElementById('metricsStrip');
  data.metrics.forEach((m) => {
    metricsStrip.appendChild(el('div', { class: 'metric' }, [
      el('div', { class: 'metric-value', text: m.value }),
      el('div', { class: 'metric-label', text: m.label }),
    ]));
  });

  // About
  const aboutText = document.getElementById('aboutText');
  data.aboutParagraphs.forEach((p) => aboutText.appendChild(el('p', { text: p })));

  const expertiseList = document.getElementById('expertiseList');
  data.expertise.forEach((item) => {
    expertiseList.appendChild(el('div', { class: 'expertise-item' }, [
      el('h3', { text: item.title }),
      el('p', { text: item.description }),
    ]));
  });

  // Events
  document.getElementById('eventIntro').textContent = data.eventIntro;
  const processList = document.getElementById('processList');
  data.eventProcess.forEach((step, i) => {
    processList.appendChild(el('li', {}, [
      el('span', { class: 'step-num', text: String(i + 1).padStart(2, '0') }),
      document.createTextNode(step),
    ]));
  });

  const eventsGrid = document.getElementById('eventsGrid');
  data.events.forEach((ev) => {
    eventsGrid.appendChild(el('div', { class: 'photo-card' }, [
      el('figure', {}, [
        el('img', { src: ev.image, alt: ev.caption, loading: 'lazy' }),
        el('figcaption', { text: ev.caption }),
      ]),
    ]));
  });

  // Video
  document.getElementById('videoIntro').textContent = data.videoIntro;
  const videoFrame = document.getElementById('videoFrame');
  const embedUrl = getYoutubeEmbed(data.videoEmbedUrl);
  if (embedUrl) {
    videoFrame.appendChild(el('iframe', {
      src: embedUrl,
      title: `${data.name} video`,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowfullscreen: 'true',
    }));
  } else {
    videoFrame.appendChild(el('p', { class: 'video-placeholder', text: 'Video coming soon' }));
  }

  // Gallery
  document.getElementById('galleryIntro').textContent = data.galleryIntro;
  const galleryGrid = document.getElementById('galleryGrid');
  data.gallery.forEach((item) => {
    const tagClass = item.tag && item.tag.toLowerCase() === 'conversion' ? 'tag-conversion' : 'tag-education';
    galleryGrid.appendChild(el('div', { class: 'gallery-item' }, [
      el('img', { src: item.image, alt: item.caption, loading: 'lazy' }),
      el('div', { class: 'gallery-meta' }, [
        el('span', { class: 'gallery-caption', text: item.caption }),
        el('span', { class: `tag ${tagClass}`, text: item.tag }),
      ]),
    ]));
  });

  // Performance
  document.getElementById('performanceIntro').textContent = data.performanceIntro;
  const performanceList = document.getElementById('performanceList');
  data.performance.forEach((camp) => {
    performanceList.appendChild(el('div', { class: 'performance-item' }, [
      el('img', { src: camp.image, alt: camp.name, loading: 'lazy' }),
      el('div', {}, [
        el('h3', { class: 'performance-name', text: camp.name }),
        el('p', { class: 'performance-platforms', text: camp.platforms.join(' · ') }),
      ]),
      el('div', { class: 'performance-stats' }, [
        el('div', {}, [
          el('div', { class: 'stat-value', text: camp.reach }),
          el('div', { class: 'stat-label', text: 'Reach' }),
        ]),
        el('div', {}, [
          el('div', { class: 'stat-value', text: camp.impressions }),
          el('div', { class: 'stat-label', text: 'Impressions' }),
        ]),
        el('div', {}, [
          el('div', { class: 'stat-value', text: camp.engagementRate }),
          el('div', { class: 'stat-label', text: 'Engagement rate' }),
        ]),
      ]),
    ]));
  });

  // Contact
  document.getElementById('footerNote').textContent = data.footerNote;
  const contactList = document.getElementById('contactList');
  contactList.appendChild(el('li', {}, [el('a', { href: `mailto:${data.contact.email}`, text: data.contact.email })]));
  contactList.appendChild(el('li', {}, [el('a', { href: `tel:${data.contact.phone.replace(/\s/g, '')}`, text: data.contact.phone })]));
  if (data.contact.linkedinUrl) {
    contactList.appendChild(el('li', {}, [el('a', { href: data.contact.linkedinUrl, target: '_blank', rel: 'noopener', text: 'LinkedIn' })]));
  }

  // Footer
  document.getElementById('footerName').textContent = `${data.name}`;
  document.querySelector('.footer-year').textContent = `© ${new Date().getFullYear()}`;
}

document.addEventListener('DOMContentLoaded', init);

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
