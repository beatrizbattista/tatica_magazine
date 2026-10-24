import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
export const evidence = JSON.parse(await readFile(new URL('lib/evidence.json',root),'utf8'));
export function evidenceCsv(data=evidence) {
 const columns=['indicador_id','grafico','categoria','valor','unidade','periodo','populacao','fontes','ressalvas'];
 const rows=data.charts.flatMap(chart=>chart.rows.map(row=>[
  `${chart.id}:${row.id}`,chart.id,row.label,row.value,chart.unit,chart.period,chart.population,
  chart.sources.map(id=>data.sources.find(s=>s.id===id).url).join(' | '),chart.caveat,
 ]));
 const escape=value=>'"'+String(value).replaceAll('"','""')+'"';
 return '\uFEFF'+[columns,...rows].map(row=>row.map(escape).join(',')).join('\r\n')+'\r\n';
}
if (process.argv[1] && new URL(`file:///${process.argv[1].replaceAll('\\','/')}`).href === import.meta.url) {
 await writeFile(new URL('public/downloads/dados_dos_graficos.csv',root),evidenceCsv(),'utf8');
 console.log('CSV atualizado a partir da fonte única de dados.');
}
