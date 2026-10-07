const navShell = document.querySelector('.nav-shell');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  navShell.classList.toggle('scrolled', window.scrollY > 20);
});

document.addEventListener('pointermove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const nodeEls = [...document.querySelectorAll('[data-node]')];
const detailEls = [...document.querySelectorAll('.detail-panel')];

function activateNode(key) {
  nodeEls.forEach(el => el.classList.toggle('selected', el.dataset.node === key));
  detailEls.forEach(el => el.classList.toggle('active', el.dataset.detail === key));
}

nodeEls.forEach(el => {
  if (el.tagName === 'BUTTON' || el.classList.contains('flow-node') || el.classList.contains('artifact-box') || el.classList.contains('continue-node')) {
    el.addEventListener('click', () => activateNode(el.dataset.node));
  }
});

const roadContent = {
  1: {
    meta: 'W1–2 / foundation',
    title: 'baseline first. no learning yet.',
    body: 'freeze the experimental specification, verify local inference for the main model and advisor pool, define the evaluation harness, and establish performance / latency / memory baselines before training a controller.'
  },
  3: {
    meta: 'W3–4 / data + detector',
    title: 'create the counterfactual evidence.',
    body: 'collect partial reasoning states, sweep expert interventions, derive repair-gain labels, and train a lightweight capability-gap detector without changing the frozen main model or frozen advisors.'
  },
  5: {
    meta: 'W5–6 / router + system',
    title: 'close the loop: diagnose → route → verify → continue.',
    body: 'connect the detector to a cost-aware utility router, define the structured artifact schema, add verifier hooks, and make the first end-to-end sparse-consultation system runnable.'
  },
  7: {
    meta: 'W7–8 / experiments',
    title: 'prove the mechanism, not just the demo.',
    body: 'run matched-budget comparisons across math, code, biomedical, and legal tasks, then use ablations, cross-domain stress tests, and budget sweeps to isolate where each component contributes.'
  },
  9: {
    meta: 'W9–10 / paper',
    title: 'write from results, not aspirations.',
    body: 'turn the frozen experiment matrix into a complete manuscript, verify every reported claim, clean the code and configs, package reproducibility artifacts, and perform a final related-work / novelty audit.'
  }
};

const roadDetail = document.querySelector('#roadDetail');

document.querySelectorAll('.road-step').forEach(step => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.road-step').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
    const item = roadContent[step.dataset.week];
    roadDetail.innerHTML = `<div class="road-meta">${item.meta}</div><h3>${item.title}</h3><p>${item.body}</p>`;
  });
});

// keyboard convenience for the roadmap.
document.querySelectorAll('.road-step, .advisor').forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});
