import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const core = readFileSync(new URL('../lang/v470-i18n-core.js', import.meta.url), 'utf8');
const bootstrap = readFileSync(new URL('../lang/v460-multilingual-bootstrap-strict.js', import.meta.url), 'utf8');

const sampleDashboard = 'Next Star: 500 Officer Star value · Reach 5★: 98,000 Officer Star value · Compétences MAX: 690 insignes d’officier · Entraînement MAX: 1,544 insignes d’officier · Level 70 XP: 199,646,700 XP';
const sampleRecommendation = 'Develop 69 Officer levels, 5 Star levels, 180 Training stages.';
const sampleForecast = '(1,037 per badge). The 110 ORV remainder is credited against this additional requirement; whole badge equivalents are counted above.';

test('QA21 dynamic source patterns match the reported rendered strings', () => {
  assert.deepEqual(/^Next Star: ([\d,]+) Officer Star value · Reach 5★: ([\d,]+) Officer Star value · [^·]+: ([\d,]+) [^·]+ · [^·]+: ([\d,]+) [^·]+ · Level 70 XP: ([\d,]+) XP$/.exec(sampleDashboard)?.slice(1), ['500','98,000','690','1,544','199,646,700']);
  assert.deepEqual(/^Develop ([\d,]+) Officer levels?, ([\d,]+) Star levels?, ([\d,]+) Training stages?\.$/.exec(sampleRecommendation)?.slice(1), ['69','5','180']);
  assert.deepEqual(/^\(([\d,]+) per badge\)\. The ([\d,]+) ORV remainder is credited against this additional requirement; whole badge equivalents are counted above\.$/.exec(sampleForecast)?.slice(1), ['1,037','110']);
});

test('French, German and Italian runtime rules cover all QA21 bleed strings', () => {
  for (const source of [
    'Need ([\\d,. ]+) more XP',
    'Next Star: ([\\d,]+) Officer Star value',
    'Develop ([\\d,]+) Officer levels?',
    'ORV remainder is credited against this additional requirement',
    'Legendary Officer Badge Chests converted to ORV'
  ]) assert.ok(core.split(source).length - 1 >= 3, source + ' must have language coverage');
  for (const translated of [
    'Prochaine étoile','Nächster Stern','Prossima Stella',
    'Développer $1 niveaux d’officier','Offiziersstufen','livelli Ufficiale',
    'Coffres de badges d’officier légendaire','Legendäre Offiziersabzeichen-Truhen','Casse Badge Ufficiale Leggendario'
  ]) assert.ok(core.includes(translated), 'missing translation: ' + translated);
});

test('multilingual bootstrap loads the refreshed runtime cache key', () => {
  assert.match(bootstrap, /CORE_CACHE='v470-i18n-core-23-fix4'/);
});
