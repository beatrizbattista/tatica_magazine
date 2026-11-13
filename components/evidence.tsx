'use client';

import { useState } from 'react';
import evidence from '@/lib/evidence.json';
import photos from '@/lib/photo-assets.json';

type Chart = (typeof evidence.charts)[number];
export const evidenceSources = evidence.sources;
const sources = new Map(evidenceSources.map(source => [source.id, source]));
export function EvidenceSource({id}:{id:string}) {
  const source = sources.get(id);
  if (!source) throw new Error(`Fonte ausente: ${id}`);
  return <a className="evidence-source" href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a>;
}
export function formatValue(value:number, unit:string) {
  const digits = unit === 'US$ bi' ? 3 : unit === 'pontos' ? 2 : unit === '%' ? 1 : 0;
  const number = value.toLocaleString('pt-BR', { maximumFractionDigits: digits });
  return unit === '%' ? `${number}%` : unit === 'US$ bi' ? `US$ ${number} bi` : unit === 'pontos' ? number : `${number} ${unit}`.trim();
}
export function EvidenceChart({id}:{id:string}) {
  const [table, setTable] = useState(false);
  const chart = evidence.charts.find(item => item.id === id) as Chart | undefined;
  if (!chart) throw new Error(`Gráfico ausente: ${id}`);
  return <figure className={`evidence-chart evidence-${id}`} aria-labelledby={`chart-${id}`}>
    <header className="evidence-heading"><div><span className="mono">{chart.eyebrow}</span><h3 id={`chart-${id}`}>{chart.title}</h3><p>{chart.population}{chart.unit==='pontos'&&<span className="evidence-unit">Escala de 0 a 100 pontos</span>}</p></div><button type="button" className="evidence-toggle" aria-pressed={table} aria-controls={`plot-${id}`} onClick={()=>setTable(!table)}>{table?'Ver gráfico':'Ver tabela'} <span aria-hidden="true">↔</span></button></header>
    <div id={`plot-${id}`}>
      <div className={`evidence-plot${table?' is-hidden':''}`} role="img" aria-label={`${chart.title}. ${chart.rows.map(row=>`${row.label}: ${formatValue(row.value,chart.unit)}`).join('; ')}.`}>
        <div className="evidence-scale" aria-hidden="true"><span>0</span><span>{formatValue(chart.max,chart.unit)}</span></div>
        {chart.rows.map(row=><div className="evidence-row" key={row.id} aria-hidden="true"><div className="evidence-row-label"><span>{row.label}</span><strong>{formatValue(row.value,chart.unit)}</strong></div><div className="evidence-track"><span className={'series' in row&&row.series==='2024'?'previous':''} style={{width:`${row.value/chart.max*100}%`}}/></div></div>)}
      </div>
      <table className={`evidence-table${table?'':' is-hidden'}`}><caption>{chart.title} · {chart.period}</caption><thead><tr><th scope="col">Categoria</th><th scope="col">Valor ({chart.unit})</th></tr></thead><tbody>{chart.rows.map(row=><tr key={row.id}><th scope="row">{row.label}</th><td>{formatValue(row.value,chart.unit)}</td></tr>)}</tbody></table>
    </div>
    <p className="evidence-reading">{chart.reading}</p>
    <figcaption><span className="evidence-period">{chart.period}</span><p>{chart.caveat}</p><div className="evidence-links">{chart.sources.map(id=><EvidenceSource key={id} id={id}/>)}</div></figcaption>
  </figure>;
}
export function Indicator({id}:{id:string}) {
  const item = evidence.indicators.find(item=>item.id===id);
  if (!item) throw new Error(`Indicador ausente: ${id}`);
  return <StatBlock id={id} value={formatValue(item.value,item.unit)} unit={item.unit==='pontos'?'pontos':''} label={item.label} period={item.period+(item.unit==='pontos'?' · Escala de 0 a 100 pontos':'')} source={item.source}/>;
}
function StatBlock({id,value,unit='',label,period,source}:{id:string;value:string;unit?:string;label:string;period:string;source:string}) {
  return <aside className="evidence-stat" id={`indicador-${id}`}><strong className="stat-value">{value}{unit&&<span className="stat-unit">{unit}</span>}</strong><div className="stat-copy"><p>{label}</p><small>{period}</small><EvidenceSource id={source}/></div></aside>;
}
export function ChartHighlight({chartId,rowId,label}:{chartId:string;rowId:string;label:string}) {
  const chart = evidence.charts.find(item=>item.id===chartId);
  const row = chart?.rows.find(item=>item.id===rowId);
  if (!chart || !row) throw new Error('Destaque sem dado');
  return <StatBlock id={`${chartId}-${rowId}`} value={formatValue(row.value,chart.unit)} label={label} period={chart.period} source={chart.id==='receitas'?(row.id.startsWith('google')?'alphabet-2025':'meta-2025'):chart.sources[0]}/>;
}
export function FraudGrowth() {
  const chart = evidence.charts.find(item=>item.id==='fraudes')!;
  const first = chart.rows.find(item=>item.id==='2024')!.value;
  const last = chart.rows.find(item=>item.id==='2025')!.value;
  return <StatBlock id="crescimento-fraudes" value={`+${((last/first-1)*100).toLocaleString('pt-BR',{maximumFractionDigits:1})}%`} label="nos registros de estelionato eletrônico, no recorte comparável de 23 UFs." period={`${chart.period} · variação calculada das contagens`} source="fbsp-2026"/>;
}
export function EditorialPhoto({id,compact=false}:{id:string;compact?:boolean}) {
  const photo = photos.find(item=>item.id===id);
  if (!photo) throw new Error(`Fotografia ausente: ${id}`);
  return <figure className={`editorial-photo${compact?' compact-photo':''}`}><div className="editorial-photo-frame"><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async"/><span className="photo-context">FOTOGRAFIA DE CONTEXTO</span></div><figcaption><p>{photo.caption}</p><span><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.author}</a> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a><small className="photo-adaptation">Reprodução redimensionada; enquadramento adaptado ao layout.</small></span></figcaption></figure>;
}
export function EvidenceCredits() {
  return <div className="evidence-credits"><h3>Dados e fotografias desta edição</h3><p>Checagem editorial: 21/10/2026. As imagens de contexto não retratam os golpes narrados. Os gráficos foram redesenhados pela Tática a partir das fontes indicadas.</p><details><summary>Consultar fontes dos dados e do guia</summary><ul>{evidenceSources.map(source=><li key={source.id} id={`evidencia-${source.id}`}><EvidenceSource id={source.id}/><p>{source.note}</p></li>)}</ul></details><details><summary>Consultar autoria e licença das fotografias</summary><ul>{photos.map(photo=><li key={photo.id}><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.author} · {photo.id}</a> — <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a><p>{photo.caption} Ajustes editoriais: redimensionamento, compressão e recorte de enquadramento. As fotografias mantêm suas licenças de origem.</p></li>)}</ul><p>Diogo e integrantes: acervo fornecido pelo grupo, com autorização informada nos materiais da edição; não se aplica licença aberta a esses retratos. O retrato anterior de Shoshana Zuboff e as imagens provenientes do G1 não são reproduzidos nesta revisão, pois não foi documentada permissão específica de reutilização.</p></details></div>;
}
