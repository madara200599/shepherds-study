/* Shepherd's Study — AI Sermon & Small-Group Studio
   Live AI draft: public Pollinations text API (free, no key, no account).
   Offline fallback: curated KJV verse library + sermon-structure engine.
   All Scripture quotations are KJV (public domain). */
'use strict';

/* ---------- Curated KJV verse library (public domain) ---------- */
const VERSES = [
  { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', topics: ['love', 'grace', 'salvation', 'faith', 'gift'] },
  { ref: '1 John 4:19', text: 'We love him, because he first loved us.', topics: ['love'] },
  { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', topics: ['love', 'grace', 'salvation'] },
  { ref: 'Ephesians 2:8-9', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: not of works, lest any man should boast.', topics: ['grace', 'faith', 'salvation'] },
  { ref: 'Romans 3:23', text: 'For all have sinned, and come short of the glory of God;', topics: ['sin', 'grace', 'salvation'] },
  { ref: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.', topics: ['sin', 'grace', 'salvation', 'gift'] },
  { ref: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.', topics: ['shepherd', 'care', 'provision', 'trust'] },
  { ref: 'Psalm 23:4', text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', topics: ['shepherd', 'fear', 'comfort', 'care'] },
  { ref: 'John 10:11', text: 'I am the good shepherd: the good shepherd giveth his life for the sheep.', topics: ['shepherd', 'love', 'sacrifice'] },
  { ref: '1 Peter 5:7', text: 'Casting all your care upon him; for he careth for you.', topics: ['care', 'anxiety', 'prayer', 'trust'] },
  { ref: 'Philippians 4:6-7', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', topics: ['prayer', 'peace', 'anxiety'] },
  { ref: 'John 14:27', text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.', topics: ['peace', 'fear', 'comfort'] },
  { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', topics: ['fear', 'strength', 'comfort', 'trust'] },
  { ref: 'Joshua 1:9', text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', topics: ['strength', 'courage', 'fear', 'guidance'] },
  { ref: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', topics: ['strength', 'hope', 'waiting', 'trust'] },
  { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', topics: ['strength', 'faith'] },
  { ref: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', topics: ['faith', 'hope'] },
  { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', topics: ['trust', 'hope', 'providence'] },
  { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', topics: ['hope', 'guidance', 'future'] },
  { ref: 'Proverbs 3:5-6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', topics: ['trust', 'guidance', 'wisdom'] },
  { ref: 'James 1:5', text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.', topics: ['wisdom', 'prayer'] },
  { ref: 'Psalm 119:105', text: 'Thy word is a lamp unto my feet, and a light unto my path.', topics: ['guidance', 'word', 'light'] },
  { ref: '2 Timothy 3:16', text: 'All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:', topics: ['word', 'guidance'] },
  { ref: 'Matthew 6:33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', topics: ['priority', 'provision', 'trust'] },
  { ref: 'Matthew 11:28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', topics: ['rest', 'comfort', 'care'] },
  { ref: 'Psalm 46:1', text: 'God is our refuge and strength, a very present help in trouble.', topics: ['strength', 'comfort', 'refuge'] },
  { ref: 'Psalm 46:10', text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.', topics: ['rest', 'peace', 'trust'] },
  { ref: 'Lamentations 3:22-23', text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', topics: ['mercy', 'faithfulness', 'hope'] },
  { ref: 'Micah 6:8', text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?', topics: ['justice', 'mercy', 'humility'] },
  { ref: 'Galatians 5:22-23', text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.', topics: ['fruit', 'love', 'peace', 'character'] },
  { ref: '1 Corinthians 13:4', text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,', topics: ['love', 'character'] },
  { ref: 'Luke 15:20', text: 'And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.', topics: ['forgiveness', 'grace', 'return'] },
  { ref: '2 Corinthians 5:17', text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.', topics: ['new life', 'grace', 'transformation'] },
  { ref: 'Romans 12:2', text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', topics: ['transformation', 'mind', 'guidance'] },
  { ref: 'Galatians 2:20', text: 'I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.', topics: ['faith', 'identity', 'sacrifice'] },
  { ref: 'John 8:12', text: 'I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.', topics: ['light', 'guidance', 'following'] },
  { ref: 'Matthew 5:16', text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.', topics: ['light', 'witness', 'outreach'] },
  { ref: 'Matthew 28:19', text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:', topics: ['outreach', 'mission', 'witness'] },
  { ref: 'Hebrews 10:24-25', text: 'And let us consider one another to provoke unto love and to good works: not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.', topics: ['community', 'encouragement', 'church'] },
  { ref: 'Matthew 18:20', text: 'For where two or three are gathered together in my name, there am I in the midst of them.', topics: ['community', 'prayer', 'church'] },
  { ref: 'Psalm 34:8', text: 'O taste and see that the LORD is good: blessed is the man that trusteth in him.', topics: ['trust', 'goodness'] },
  { ref: 'Psalm 27:1', text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?', topics: ['fear', 'light', 'strength', 'trust'] },
  { ref: 'Romans 15:13', text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.', topics: ['hope', 'peace', 'joy'] },
  { ref: 'Proverbs 18:10', text: 'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.', topics: ['refuge', 'trust', 'strength'] },
  { ref: 'Colossians 3:23', text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men;', topics: ['work', 'service', 'character'] },
  { ref: 'Ecclesiastes 3:1', text: 'To every thing there is a season, and a time to every purpose under the heaven:', topics: ['seasons', 'trust', 'waiting'] },
  { ref: 'Psalm 19:1', text: 'The heavens declare the glory of God; and the firmament sheweth his handywork.', topics: ['creation', 'worship', 'glory'] },
];

const TOPIC_WORDS = {
  love: ['love', 'loved', 'loving', 'beloved'], grace: ['grace', 'mercy', 'merciful'],
  faith: ['faith', 'believe', 'trust'], hope: ['hope', 'future', 'promise'],
  peace: ['peace', 'rest', 'calm'], strength: ['strength', 'strong', 'courage'],
  prayer: ['pray', 'prayer'], guidance: ['guide', 'direction', 'path', 'way', 'wisdom'],
  forgiveness: ['forgiv', 'prodigal', 'return', 'repent'], shepherd: ['shepherd', 'psalm 23', 'sheep'],
  fear: ['fear', 'afraid', 'anxious', 'worry'], comfort: ['comfort', 'trouble', 'valley'],
  salvation: ['saved', 'salvation', 'eternal', 'heaven'], community: ['together', 'church', 'group', 'one another'],
  light: ['light', 'darkness'], outreach: ['reach', 'mission', 'go', 'witness'],
  rest: ['rest', 'weary', 'burden'], provision: ['provid', 'need', 'want'],
  trust: ['trust', 'lean'], care: ['care', 'cares'], word: ['word', 'scripture', 'bible'],
  sin: ['sin'], gift: ['gift', 'gave', 'given'], sacrifice: ['cross', 'died', 'sacrifice'],
  joy: ['joy'], worship: ['worship', 'praise', 'glory'], new: ['new'],
};

/* ---------- Offline fallback engine ---------- */
function detectTopics(text) {
  const low = text.toLowerCase();
  const found = [];
  for (const [topic, words] of Object.entries(TOPIC_WORDS)) {
    if (words.some(w => low.includes(w))) found.push(topic);
  }
  return found.length ? found : ['faith', 'trust', 'hope'];
}

function pickVerses(topics, n) {
  const scored = VERSES.map(v => ({
    v, score: v.topics.filter(t => topics.includes(t)).length,
  })).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  const out = scored.slice(0, n).map(x => x.v);
  let i = 0;
  while (out.length < n) { // fill with general verses, no duplicates
    const cand = VERSES[i++ % VERSES.length];
    if (!out.includes(cand)) out.push(cand);
  }
  return out;
}

function fallbackStudy(input) {
  const topics = detectTopics(input.passage + ' ' + input.theme);
  const verses = pickVerses(topics, Math.max(input.points + 1, 4));
  const memory = verses[0];
  const pointFrames = [
    { title: 'What this passage shows us about God', body: 'Begin with God\u2019s character, not our performance. Read the passage slowly, then name what it reveals about who He is and what He has done.' },
    { title: 'What this passage shows us about ourselves', body: 'Let the text hold a mirror up honestly. Where does it comfort us, where does it challenge us, and what does it assume we need?' },
    { title: 'How we live this out this week', body: 'Faith becomes concrete in one next step. Name a specific, small, doable response — a conversation, a habit, a prayer — and do it before Sunday.' },
    { title: 'What this passage promises us', body: 'End on the promise, not the pressure. God\u2019s Word does not only instruct; it assures. Let the congregation leave holding something true.' },
  ];
  const frames = input.points === 2
    ? [pointFrames[0], pointFrames[2]]
    : input.points === 4 ? pointFrames : pointFrames.slice(0, 3);
  const outline = frames.map((f, i) => ({
    title: f.title,
    verse: verses[i + 1] ? verses[i + 1].ref : memory.ref,
    verseText: verses[i + 1] ? verses[i + 1].text : memory.text,
    explanation: f.body + ' Anchor this point in ' + (verses[i + 1] ? verses[i + 1].ref : memory.ref) + ' and in the main passage, ' + input.passage + '.',
    illustration: 'Tell one true, concrete story from ordinary life — a workplace, a family table, a hospital waiting room — where this truth met a real person.',
  }));
  const questions = [
    'In your own words, what is the main thing ' + input.passage + ' says about God?',
    'Which part of this passage is hardest for you to believe or live out right now — and why?',
    'Where have you seen this truth in your own life this month?',
    'What is one specific step you could take this week in response to this passage?',
    'Who in your life needs to hear this truth, and how could you share it with them?',
    'What will you pray about differently after studying this passage?',
  ].slice(0, input.qcount);
  return {
    title: 'A Study in ' + input.passage + (input.theme ? ' — ' + input.theme : ''),
    bigIdea: 'From ' + input.passage + ': God meets His people in their real need, and His Word shows us both who He is and how to walk with Him this week.',
    memoryVerse: memory,
    outline,
    application: 'Choose one concrete step before the week ends: memorise the memory verse, pray it aloud each morning, and tell one person what God showed you from ' + input.passage + '.',
    questions,
    prayer: [
      'Thank God for what ' + input.passage + ' reveals about Him.',
      'Ask Him to make the big idea real in one specific situation this week.',
      'Pray for one person in the group who is carrying a heavy burden.',
    ],
    closing: 'The same God who speaks in ' + input.passage + ' walks with us into Monday. Go in His grace, and live what you heard.',
    engine: 'Offline study engine (curated KJV library, on your device)',
  };
}

/* ---------- Live AI draft (Pollinations, free, no key) ---------- */
async function liveStudy(input) {
  const prompt = 'You are a careful, theologically conservative sermon-preparation assistant for a local church pastor. '
    + 'Create a sermon + small-group study plan from the Bible passage "' + input.passage + '"'
    + (input.theme ? ' with the theme "' + input.theme + '"' : '')
    + ' for a ' + input.audience + ', a ' + input.length + ' sermon with exactly ' + input.points + ' outline points, and exactly ' + input.qcount + ' discussion questions. '
    + 'Quote Scripture only from the King James Version and give the reference for every quotation. Do not invent verse text; if unsure of exact wording, paraphrase and say so. '
    + 'Reply with ONLY a JSON object, no markdown fences, no commentary, with exactly these keys: '
    + 'title (string), bigIdea (string), memoryVerse (object with ref and text), '
    + 'outline (array of ' + input.points + ' objects: title, verse, verseText, explanation, illustration), '
    + 'application (string), questions (array of ' + input.qcount + ' strings), '
    + 'prayer (array of 3 strings), closing (string).';
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 90000);
  try {
    const res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(prompt) + '?model=openai', { signal: ctrl.signal });
    if (!res.ok) throw new Error('AI service HTTP ' + res.status);
    const raw = await res.text();
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('No JSON in AI reply');
    const data = JSON.parse(raw.slice(start, end + 1));
    if (!data.title || !Array.isArray(data.outline) || !data.outline.length) throw new Error('Incomplete AI reply');
    // Normalise counts to what was asked for.
    data.outline = data.outline.slice(0, input.points);
    if (Array.isArray(data.questions)) data.questions = data.questions.slice(0, input.qcount);
    if (Array.isArray(data.prayer)) data.prayer = data.prayer.slice(0, 3);
    // Faithfulness guard: if the model quoted a verse we hold verbatim in the
    // KJV library, use the library text (models sometimes abbreviate with "...").
    const byRef = {};
    for (const v of VERSES) byRef[v.ref.toLowerCase()] = v.text;
    for (const p of data.outline) {
      const known = p.verse && byRef[String(p.verse).toLowerCase()];
      if (known) p.verseText = known; // library holds the verbatim KJV text
    }
    if (data.memoryVerse && data.memoryVerse.ref) {
      const known = byRef[String(data.memoryVerse.ref).toLowerCase()];
      if (known) data.memoryVerse.text = known;
    }
    data.engine = 'Live AI draft (Pollinations text API, model openai)';
    return data;
  } finally {
    clearTimeout(timer);
  }
}

/* ---------- Rendering ---------- */
const $ = id => document.getElementById(id);

function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function renderStudy(study, input) {
  $('rTitle').textContent = study.title;
  $('rBigIdea').textContent = study.bigIdea;
  $('rMeta').textContent = input.passage + ' · ' + input.audience + ' · ' + input.length;
  $('rEngine').textContent = study.engine;
  const mv = study.memoryVerse || {};
  $('rMemory').innerHTML = '&ldquo;' + esc(mv.text || '') + '&rdquo; &mdash; ' + esc(mv.ref || '');
  $('rOutline').innerHTML = study.outline.map(p =>
    '<li><h4>' + esc(p.title) + '</h4>'
    + '<p class="verse">&ldquo;' + esc(p.verseText || '') + '&rdquo; &mdash; ' + esc(p.verse || '') + '</p>'
    + '<p>' + esc(p.explanation || '') + '</p>'
    + '<p><strong>Illustration:</strong> ' + esc(p.illustration || '') + '</p></li>').join('');
  $('rApplication').textContent = study.application;
  $('rQuestions').innerHTML = study.questions.map(q => '<li>' + esc(q) + '</li>').join('');
  $('rPrayer').innerHTML = study.prayer.map(q => '<li>' + esc(q) + '</li>').join('');
  $('rClosing').textContent = study.closing;
  $('results').hidden = false;
  $('results').scrollIntoView({ behavior: 'smooth' });
  window.__lastStudy = { study, input };
}

function toMarkdown() {
  const { study, input } = window.__lastStudy || {};
  if (!study) return '';
  const lines = [];
  lines.push('# ' + study.title, '');
  lines.push('> AI DRAFT — review before use. Passage: ' + input.passage + ' · ' + input.audience + ' · ' + input.length, '');
  lines.push('**Big idea:** ' + study.bigIdea, '');
  lines.push('**Memory verse:** "' + (study.memoryVerse.text || '') + '" — ' + (study.memoryVerse.ref || ''), '');
  lines.push('## Sermon outline', '');
  study.outline.forEach((p, i) => {
    lines.push('### ' + (i + 1) + '. ' + p.title, '');
    lines.push('> "' + (p.verseText || '') + '" — ' + (p.verse || ''), '');
    lines.push(p.explanation || '', '');
    lines.push('**Illustration:** ' + (p.illustration || ''), '');
  });
  lines.push('## Application', '', study.application || '', '');
  lines.push('## Small-group discussion', '');
  study.questions.forEach((q, i) => lines.push((i + 1) + '. ' + q));
  lines.push('', '## Prayer points', '');
  study.prayer.forEach(q => lines.push('- ' + q));
  lines.push('', '## Closing', '', study.closing || '', '');
  lines.push('---', '*Generated by Shepherd\u2019s Study (AI for Church Hackathon 2026). Scripture: KJV, public domain. Engine: ' + study.engine + '.*');
  return lines.join('\n');
}

/* ---------- Wiring ---------- */
$('genForm').addEventListener('submit', async e => {
  e.preventDefault();
  const input = {
    passage: $('passage').value.trim(),
    theme: $('theme').value.trim(),
    audience: $('audience').value,
    points: parseInt($('points').value, 10),
    length: $('length').value,
    qcount: parseInt($('qcount').value, 10),
  };
  const btn = $('goBtn'), status = $('status');
  btn.disabled = true; btn.textContent = 'Generating…';
  status.hidden = false; status.textContent = 'Asking the live AI service for a draft…';
  let study;
  try {
    study = await liveStudy(input);
    status.textContent = 'Live AI draft ready. Review it below — check every verse in your own Bible before preaching.';
  } catch (err) {
    console.warn('Live AI unavailable, using offline engine:', err);
    study = fallbackStudy(input);
    status.textContent = 'Live AI service was unreachable, so this study was built on your device by the offline study engine (curated KJV library). It is complete and ready to review.';
  }
  renderStudy(study, input);
  btn.disabled = false; btn.textContent = 'Generate study ↓';
});

$('sample1').addEventListener('click', () => {
  $('passage').value = 'Psalm 23'; $('theme').value = 'The Lord is my shepherd';
  $('genForm').dispatchEvent(new Event('submit', { cancelable: true }));
});
$('sample2').addEventListener('click', () => {
  $('passage').value = 'Luke 15:11-32'; $('theme').value = 'The Father who runs to welcome us home';
  $('genForm').dispatchEvent(new Event('submit', { cancelable: true }));
});
$('copyBtn').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(toMarkdown()); $('copyBtn').textContent = 'Copied ✓'; setTimeout(() => $('copyBtn').textContent = 'Copy as Markdown', 2000); }
  catch { alert('Copy failed — use Download instead.'); }
});
$('dlBtn').addEventListener('click', () => {
  const blob = new Blob([toMarkdown()], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'shepherds-study.md'; a.click();
  URL.revokeObjectURL(a.href);
});
$('printBtn').addEventListener('click', () => window.print());
