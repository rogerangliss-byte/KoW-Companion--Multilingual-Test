import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const core = readFileSync(new URL('../lang/v470-i18n-core.js', import.meta.url), 'utf8');
const bootstrap = readFileSync(new URL('../lang/v460-multilingual-bootstrap-strict.js', import.meta.url), 'utf8');

const sampleDashboard = 'Next Star: 500 Officer Star value · Reach 5★: 98,000 Officer Star value · Compétences MAX: 690 insignes d’officier · Entraînement MAX: 1,544 insignes d’officier · Level 70 XP: 199,646,700 XP';
const sampleRecommendation = 'Develop 69 Officer levels, 5 Star levels, 180 Training stages.';
const sampleForecast = '(1,037 per badge). The 110 ORV remainder is credited against this additional requirement; whole badge equivalents are counted above.';

test('QA21 dynamic dashboard, recommendation and forecast patterns are covered', () => {
  const patterns = [
    /^Need ([\d,. ]+) more XP$/,
    /^Next Star: ([\d,]+) Officer Star value · Reach 5★: ([\d,]+) Officer Star value · [^·]+: ([\d,]+) [^·]+ · [^·]+: ([\d,]+) [^·]+ · Level 70 XP: ([\d,]+) XP$/,
    /^Develop ([\d,]+) Officer levels?, ([\d,]+) Star levels?, ([\d,]+) Training stages?\.$/,
    /^\(([\d,]+) per badge\)\. The ([\d,]+) ORV remainder is credited against this additional requirement; whole badge equivalents are counted above\.$/
  ];
  assert.deepEqual(patterns[1].exec(sampleDashboard)?.slice(1), ['500','98,000','690','1,544','199,646,700']);
  assert.deepEqual(patterns[2].exec(sampleRecommendation)?.slice(1), ['69','5','180']);
  assert.deepEqual(patterns[3].exec(sampleForecast)?.slice(1), ['1,037','110']);
  for (const lang of ['fr','de','it']) {
    const start = core.indexOf(lang + ':[', core.indexOf('const R={'));
    assert.notEqual(start, -1, lang + ' translation rules exist');
    const block = core.slice(start, core.indexOf('\n', start));
    assert.match(block, /more XP/);
    assert.match(block, /Next Star/);
    assert.match(block, /Develop/);
    assert.match(block, /ORV remainder/);
    assert.match(block, /Legendary Officer Badge Chests converted to ORV/);
  }
});

test('multilingual bootstrap loads the refreshed runtime cache key', () => {
  assert.match(bootstrap, /CORE_CACHE='v470-i18n-core-23-fix3'/);
});
