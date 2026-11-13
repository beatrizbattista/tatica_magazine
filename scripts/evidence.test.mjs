import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { evidence, evidenceCsv } from './export-evidence.mjs';
const root=new URL('../',import.meta.url);
test('Dados publicados têm proveniência, unidades, população e escalas válidas',()=>{
 assert.equal(evidence.charts.length,6);
 const sourceIds=new Set(evidence.sources.map(s=>s.id));
 assert.equal(sourceIds.size,evidence.sources.length);
 for(const source of evidence.sources) assert.equal(new URL(source.url).protocol,'https:');
 for(const chart of evidence.charts) {
  assert.ok(chart.period && chart.population && chart.caveat);
  assert.equal(new Set(chart.rows.map(row=>row.id)).size,chart.rows.length);
  for(const source of chart.sources) assert.ok(sourceIds.has(source));
  for(const row of chart.rows) assert.ok(Number.isFinite(row.value)&&row.value>=0&&row.value<=chart.max);
 }
 for(const indicator of evidence.indicators) assert.ok(sourceIds.has(indicator.source));
});
test('Comparação de fraudes e média FMTI reproduzem os dados originais',()=>{
 const fraud=evidence.charts.find(c=>c.id==='fraudes');
 assert.deepEqual(fraud.rows.map(r=>r.value),[286226-648,346753-29126]);
 assert.equal(((fraud.rows[1].value/fraud.rows[0].value-1)*100).toFixed(1),'11.2');
 const fmti=evidence.charts.find(c=>c.id==='transparencia');
 assert.equal((fmti.rows.reduce((sum,row)=>sum+row.value,0)/fmti.rows.length).toFixed(2),'40.69');
 assert.equal(evidence.indicators.find(i=>i.id==='fmti-media').value,fmti.rows.reduce((sum,row)=>sum+row.value,0)/fmti.rows.length);
});
test('CSV entregue é exatamente a exportação dos gráficos',async()=>{
 assert.equal(await readFile(new URL('public/downloads/dados_dos_graficos.csv',root),'utf8'),evidenceCsv());
});
test('Fotografias locais têm autoria, licença, origem e dimensões',async()=>{
 const photos=JSON.parse(await readFile(new URL('lib/photo-assets.json',root),'utf8'));
 assert.ok(photos.length>=6);
 assert.equal(new Set(photos.map(photo=>photo.src)).size,photos.length);
 for(const photo of photos){
  assert.ok(photo.author&&photo.license&&photo.licenseUrl&&photo.sourceUrl&&photo.alt&&photo.caption);
  assert.ok(photo.width>0&&photo.height>0);
  await access(new URL('public'+photo.src,root));
 }
});
test('Blocos editoriais e referências têm identificadores únicos e resolvíveis',async()=>{
 const blocks=JSON.parse(await readFile(new URL('lib/reportage.json',root),'utf8'));
 const ids=new Set(blocks.map(b=>b.id));
 assert.equal(ids.size,blocks.length);
 const component=await readFile(new URL('components/reportage.tsx',root),'utf8');
 for(const match of component.matchAll(/ids=\{(\[[^\]]*\])\}/g)) for(const id of JSON.parse(match[1])) assert.ok(ids.has(id),id);
 assert.equal(/reportage\.slice|reportage\[\d/.test(component),false);
});
