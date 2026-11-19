import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const core = readFileSync(new URL('../lang/v470-i18n-core.js', import.meta.url), 'utf8');
const boot = readFileSync(new URL('../lang/v460-multilingual-bootstrap-strict.js', import.meta.url), 'utf8');

const dashboard = 'Next Star: 500 Officer Star value · Reach 5★: 98,000 Officer Star value · Compétences MAX: 690 insignes d’officier · Entraînement MAX: 1,544 insignes d’officier · Level 70 XP: 199,646,700 XP';
const chest = 'Legendary insigne d’officier Chests converted to ORV';

test('QA21 mixed dashboard line is covered in all supported languages', () => {
  const pattern = /^Next Star: ([\d,]+) Officer Star value · Reach 5★: ([\d,]+) Officer Star value · .+?: ([\d,]+) .+? · .+?: ([\d,]+) .+? · Level 70 XP: ([\d,]+) XP$/;
  assert.deepEqual(pattern.exec(dashboard)?.slice(1), ['500','98,000','690','1,544','199,646,700']);
  for (const lang of ['fr','de','it']) {
    const block = core.slice(core.indexOf(lang+':[', core.indexOf('const QA21_RESIDUAL=')));
    assert.match(block, /Next Star:/);
  }
});

test('partially translated Badge Chest label is replaced with a full translation', () => {
  assert.match(/^Legendary .+? Chests converted to ORV$/.exec(chest)?.[0] || '', /^Legendary .+? Chests converted to ORV$/);
  assert.match(core, /Coffres de badges d’officier légendaire convertis en ORV/);
  assert.match(core, /Legendäre Offiziersabzeichen-Truhen in ORV umgewandelt/);
  assert.match(core, /Casse Badge Ufficiale Leggendario convertite in ORV/);
});

test('runtime cache key is advanced for the residual translation fix', () => {
  assert.match(boot, /CORE_CACHE='v470-i18n-core-23-fix4'/);
});
