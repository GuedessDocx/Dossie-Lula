import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const cases = JSON.parse(await readFile(new URL('../src/data/cases.json', import.meta.url), 'utf8'));
const categories = JSON.parse(await readFile(new URL('../src/data/categories.json', import.meta.url), 'utf8'));
const requiredFields = ['title', 'summary', 'category', 'date', 'description', 'evidenceClassification', 'legalStatus', 'sources', 'lastVerified', 'editorialNotes'];

test('há pelo menos uma ficha para cada categoria editorial', () => {
  assert.equal(cases.length, 8);
  assert.equal(categories.length, 8);
  for (const category of categories) {
    assert.ok(cases.some((record) => record.category === category.id), `categoria sem ficha: ${category.label}`);
  }
});

test('todas as fichas têm os campos editoriais e fontes seguras', () => {
  const ids = new Set();
  for (const record of cases) {
    assert.ok(!ids.has(record.id), `id repetido: ${record.id}`);
    ids.add(record.id);
    for (const field of requiredFields) assert.ok(record[field], `${record.id}: campo ausente ${field}`);
    assert.ok(Array.isArray(record.sources) && record.sources.length > 0, `${record.id}: fontes ausentes`);
    assert.ok(categories.some((category) => category.id === record.category), `${record.id}: categoria inexistente`);
    for (const source of record.sources) {
      assert.ok(source.title && source.publisher && source.date && source.kind, `${record.id}: referência incompleta`);
      assert.equal(new URL(source.url).protocol, 'https:', `${record.id}: fonte sem HTTPS`);
    }
  }
});

test('datas de verificação usam formato ISO válido', () => {
  for (const record of cases) {
    assert.match(record.lastVerified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(!Number.isNaN(Date.parse(record.lastVerified)), `${record.id}: data inválida`);
  }
});
