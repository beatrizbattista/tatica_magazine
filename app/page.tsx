'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const chapters = [
  { n: '01', id: 'rastros', tag: 'PRIVACIDADE & DADOS', title: 'O que fica depois do clique?', desc: 'Segurança dos dados e os rastros que deixamos pelo caminho.', page: '06' },
  { n: '02', id: 'mercado', tag: 'GOLPES & VAZAMENTOS', title: 'Você não está à venda. Seus dados, sim.', desc: 'O mercado invisível por trás das nossas informações.', page: '12' },
  { n: '03', id: 'inteligencia', tag: 'INTELIGÊNCIA ARTIFICIAL', title: 'Quem vê o que a IA vê?', desc: 'Transparência e os limites do uso dos nossos dados.', page: '18' },
  { n: '04', id: 'algoritmos', tag: 'RASTREAMENTO & ALGORITMOS', title: 'O feed também olha de volta.', desc: 'Hábitos, perfis e a construção de uma identidade digital.', page: '26' },
  { n: '05', id: 'consentimento', tag: 'CONSENTIMENTO & TRANSPARÊNCIA', title: 'Li e aceito. Mas entendi?', desc: 'Permissões, escolhas e o que cabe nas letras pequenas.', page: '34' },
  { n: '06', id: 'protecao', tag: 'SEGURANÇA & CIDADANIA', title: 'O próximo clique é seu.', desc: 'Um espaço para discutir proteção e responsabilidade coletiva.', page: '42' },
];
function Eye({ offset, small=false }: { offset: {x:number;y:number}; small?: boolean }) {
  return <svg className={small?'eye small-eye':'eye'} viewBox="0 0 700 440" aria-hidden="true"><defs><radialGradient id={small?'irisSmall':'iris'}><stop stopColor="#121713"/><stop offset=".3" stopColor="#697855"/><stop offset=".67" stopColor="#bcd48b"/><stop offset="1" stopColor="#222d1a"/></radialGradient><clipPath id={small?'clipSmall':'clip'}><path d="M35 220 Q350 -50 665 220 Q350 490 35 220Z"/></clipPath></defs><g clipPath={`url(#${small?'clipSmall':'clip'})`}><path d="M35 220 Q350 -50 665 220 Q350 490 35 220Z" fill="#dedfd3"/><g transform={`translate(${offset.x} ${offset.y})`}><circle cx="350" cy="220" r="139" fill={`url(#${small?'irisSmall':'iris'})`}/>{Array.from({length:110},(_,i)=>{const a=i*Math.PI/55;return <line key={i} x1={350+65*Math.cos(a)} y1={220+65*Math.sin(a)} x2={350+(128+(i%7))*Math.cos(a+.025)} y2={220+(128+(i%7))*Math.sin(a+.025)} stroke={i%3?'#18271c':'#e4efbe'} strokeWidth={i%4?1:2} opacity=".65"/>})}<circle cx="350" cy="220" r="61" fill="#080c09"/><circle cx="319" cy="181" r="18" fill="#fff" opacity=".8"/><circle cx="375" cy="253" r="7" fill="#fff" opacity=".35"/></g></g><path d="M35 220 Q350 -50 665 220 Q350 490 35 220Z" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M45 195 Q350 -91 655 195" fill="none" stroke="currentColor" strokeWidth="1" opacity=".45"/></svg>
}

function EditorialImage({ number, title, portrait=false }: {number:string;title:string;portrait?:boolean}) {
 return <figure className={`editorial-image ${portrait?'portrait':''}`}><div className="image-placeholder"><span className="mono image-id">ARQUIVO VISUAL / {number}</span><div className="image-cross">+</div><div className="image-placeholder-copy"><span className="mono">IMAGEM DA REPORTAGEM</span><h3>{title}</h3><p>Espaço reservado para fotografia ou ilustração</p></div><span className="image-dimensions mono">{portrait?'FORMATO VERTICAL / 4:5':'FORMATO HORIZONTAL / 16:9'}</span></div><figcaption><span>FIG. {number} — LEGENDA DA IMAGEM</span><span>Crédito da imagem / a inserir</span></figcaption></figure>
}
function LineChart() {
 const svgRef = useRef<SVGSVGElement>(null);
 const [size, setSize] = useState({ width: 400, height: 200 });

 useEffect(() => {
  const plot = svgRef.current?.parentElement;
  if (!plot) return;

  const resize = () => {
   const width = Math.max(1, plot.clientWidth);
   const height = Math.max(1, plot.clientHeight);
   setSize(current => current.width === width && current.height === height ? current : { width, height });
  };

  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(plot);
  return () => observer.disconnect();
 }, []);

 const points = [24, 58, 42, 76].map((value, index) => ({
  x: size.width * (0.125 + index * 0.25),
  y: size.height * (1 - value / 100),
  value,
 }));

 return <svg ref={svgRef} viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none" role="img" aria-label="Gráfico de linha ilustrativo: 24, 58, 42 e 76"><path d={`M ${points.map(({ x, y }) => `${x} ${y}`).join(' L ')}`} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke"/>{points.map(({ x, y, value }, index)=><g key={index}><circle cx={x} cy={y} r="4" fill="currentColor"/><text x={x} y={y-14} textAnchor="middle" fontSize="11" fill="currentColor">{value}</text></g>)}</svg>;
}

function DataGraphic({variant='bars'}:{variant?:'bars'|'line'}) {
 const [view,setView]=useState(variant);
 return <figure className="data-graphic"><div className="graphic-header"><div><span className="mono">CADERNO DE DADOS / VISUALIZAÇÃO</span><h3>O que os números revelam.</h3></div><div className="chart-switch" role="group" aria-label="Tipo de gráfico"><button aria-pressed={view==='bars'} onClick={()=>setView('bars')}>Barras</button><button aria-pressed={view==='line'} onClick={()=>setView('line')}>Linha</button></div></div><p className="chart-disclaimer mono">PRÉVIA DE DIAGRAMAÇÃO · VALORES FICTÍCIOS, SEM BASE ESTATÍSTICA</p><div className="chart-layout"><div className="chart-y mono"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-plot">{view==='bars'?<div className="chart-bars">{[24,58,42,76].map((v,i)=><div className="bar-column" key={i}><span className="bar-value mono" style={{bottom:`${v}%`}}>{v}</span><div className="bar" style={{height:`${v}%`}}/></div>)}</div>:<LineChart/>}<div className="chart-x mono">{['Grupo A','Grupo B','Grupo C','Grupo D'].map(x=><span key={x}>{x}</span>)}</div></div></div><figcaption><span>GRÁFICO DEMONSTRATIVO / SUBSTITUIR PELA BASE DA REPORTAGEM</span><span>Fonte e período / a inserir</span></figcaption></figure>
}

const authors = [
 { name: 'Beatriz Battista', initials: 'BB' },
 { name: 'Enzo Christowan', initials: 'EC' },
 { name: 'Giovanna Almeida', initials: 'GA' },
 { name: 'Gustavo Costa', initials: 'GC' },
 { name: 'Kevin Martins', initials: 'KM' },
 { name: 'Lucas Guerriero', initials: 'LG' },
];

function AuthorsSection() {
 const railRef = useRef<HTMLDivElement>(null);
 const moveRail = (direction: number) => railRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });

 return <section id="equipe" className="authors-section section" aria-labelledby="authors-title">
  <div className="section-label"><span>08 / EQUIPE EDITORIAL</span><span>QUEM FAZ A TÁTICA</span></div>
  <div className="authors-heading">
   <div><span className="mono">REVISTA TÁTICA / EDIÇÃO 001</span><h2 id="authors-title">Feita por vários<br/><em>olhares.</em></h2></div>
   <div className="authors-intro"><p>Conheça as pessoas por trás desta edição.</p><div className="authors-controls"><button type="button" aria-label="Ver integrantes anteriores" onClick={()=>moveRail(-1)}>←</button><button type="button" aria-label="Ver próximos integrantes" onClick={()=>moveRail(1)}>→</button></div></div>
  </div>
  <div className="authors-rail" ref={railRef} tabIndex={0} role="region" aria-label="Integrantes da equipe editorial">
   {authors.map((author, index)=><article className="author-card" key={author.name}><div className="author-card-top"><span className="mono">TÁTICA / {String(index+1).padStart(2,'0')}</span><span aria-hidden="true">✳</span></div><div className="author-mark" aria-hidden="true">{author.initials}</div><div className="author-card-copy"><h3>{author.name}</h3><p className="mono">AUTORIA · EDIÇÃO 001</p></div></article>)}
  </div>
  <p className="authors-hint mono">DESLIZE PARA O LADO PARA CONHECER TODO O GRUPO <span aria-hidden="true">↔</span></p>
 </section>;
}

const traceInsights = [
 { title: 'Histórico de navegação', detail: 'Sites visitados podem revelar interesses, rotina e até assuntos de saúde. Apagar o histórico reduz o que fica salvo no aparelho, mas não apaga registros que um serviço já coletou.' },
 { title: 'Localização', detail: 'Um único ponto mostra onde você está. Uma sequência de pontos pode revelar casa, escola, trabalho e horários recorrentes.' },
 { title: 'Preferências', detail: 'Curtidas, buscas e tempo de tela ajudam a criar um perfil. Revise as opções de personalização e limite o que não for necessário.' },
];

function TraceExplorer() {
 return <section className="trace-explorer" aria-labelledby="trace-explorer-title">
  <div className="trace-explorer-heading"><div><span className="mono">INTERAÇÃO / 01</span><h3 id="trace-explorer-title">Toque para revelar.</h3></div><p>Pequenos rastros podem contar histórias grandes.</p></div>
  <div className="trace-cards">{traceInsights.map((item, index)=><details className="trace-card" key={item.title}><summary><span className="trace-card-number mono">0{index+1}</span><span>{item.title}</span><b aria-hidden="true">+</b></summary><p>{item.detail}</p></details>)}</div>
 </section>;
}

const permissionItems = [
 { id: 'location', label: 'Localização', note: 'Pode indicar lugares e horários frequentes.' },
 { id: 'camera', label: 'Câmera', note: 'Pode capturar imagens quando o acesso estiver ativo.' },
 { id: 'microphone', label: 'Microfone', note: 'Pode captar áudio enquanto o app usa essa permissão.' },
] as const;

function PermissionLab() {
 const [enabled, setEnabled] = useState<Record<(typeof permissionItems)[number]['id'], boolean>>({ location: false, camera: false, microphone: false });
 const enabledCount = Object.values(enabled).filter(Boolean).length;

 return <section className="permission-lab" aria-labelledby="permission-lab-title">
  <div className="permission-lab-heading"><span className="mono">LABORATÓRIO / PERMISSÕES</span><h3 id="permission-lab-title">Você decide o acesso.</h3><p>Experimente os controles e veja como uma escolha muda a exposição. Esta simulação não altera as permissões do seu aparelho.</p></div>
  <div className="permission-list">{permissionItems.map(item=><div className={`permission-row${enabled[item.id]?' is-enabled':''}`} key={item.id}><div><strong>{item.label}</strong><p>{item.note}</p></div><button type="button" role="switch" aria-checked={enabled[item.id]} aria-label={`${item.label}: ${enabled[item.id]?'permitido':'bloqueado'}`} onClick={()=>setEnabled(current=>({...current,[item.id]:!current[item.id]}))}><span/></button></div>)}</div>
  <div className="permission-result" role="status" aria-live="polite"><span className="mono">ACESSOS ATIVOS</span><strong>{enabledCount} / {permissionItems.length}</strong><p>{enabledCount===0?'Nenhum acesso está ativo. Ative só o que fizer sentido para a tarefa.':enabledCount===permissionItems.length?'Todas as permissões estão ativas. Revise se cada uma é necessária.':`${enabledCount} permissão${enabledCount>1?'ões':''} ativa${enabledCount>1?'s':''}. Você pode limitar o acesso ao necessário.`}</p></div>
  <button className="permission-reset mono" type="button" onClick={()=>setEnabled({location:false,camera:false,microphone:false})} disabled={enabledCount===0}>REDEFINIR SIMULAÇÃO ↺</button>
 </section>;
}

const quizQuestions = [
 { question: 'Um app de lanterna pede sua localização. Qual é o melhor próximo passo?', options: ['Permitir sempre, sem revisar', 'Negar ou limitar se não houver um motivo claro', 'Ativar todas as permissões'], correct: 1, explanation: 'A localização não é necessária para a função de lanterna. Permita apenas acessos que façam sentido para o serviço.' },
 { question: 'Você recebe um link inesperado pedindo seus dados. O que fazer primeiro?', options: ['Abrir para ver do que se trata', 'Verificar o remetente e confirmar por outro canal', 'Encaminhar para outras pessoas'], correct: 1, explanation: 'Uma checagem independente ajuda a identificar links falsos antes de você informar qualquer dado.' },
 { question: 'Qual hábito ajuda a reduzir sua exposição?', options: ['Revisar permissões e limitar o acesso ao necessário', 'Usar a mesma senha em todos os serviços', 'Deixar a conta pública por padrão'], correct: 0, explanation: 'Revisar acessos de tempos em tempos reduz permissões que já não são necessárias.' },
];

function PrivacyQuiz() {
 const [open, setOpen] = useState(false);
 const [closing, setClosing] = useState(false);
 const [step, setStep] = useState(0);
 const [selected, setSelected] = useState<number|null>(null);
 const [score, setScore] = useState(0);
 const [done, setDone] = useState(false);
 const openerRef = useRef<HTMLButtonElement>(null);
 const dialogRef = useRef<HTMLDivElement>(null);
 const titleRef = useRef<HTMLHeadingElement>(null);
 const closeTimer = useRef<number|null>(null);

 const closeDialog = useCallback(() => {
  if (closing) return;
  setClosing(true);
  openerRef.current?.focus();
  closeTimer.current = window.setTimeout(() => {
   setOpen(false);
   setClosing(false);
  }, 280);
 }, [closing]);

 useEffect(() => () => { if (closeTimer.current!==null) window.clearTimeout(closeTimer.current); }, []);
 useEffect(() => {
  if (!open || closing) return;
  titleRef.current?.focus();
  const onKeyDown = (event: KeyboardEvent) => {
   if (event.key==='Escape') { event.preventDefault(); closeDialog(); }
   if (event.key==='Tab') {
    const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)');
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length-1];
    if (event.shiftKey && (document.activeElement===first || document.activeElement===titleRef.current)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement===last) { event.preventDefault(); first.focus(); }
   }
  };
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
 }, [open, closing, closeDialog]);

 const startQuiz = () => {
  if (closeTimer.current!==null) window.clearTimeout(closeTimer.current);
  setStep(0); setSelected(null); setScore(0); setDone(false); setClosing(false); setOpen(true);
 };
 const continueQuiz = () => {
  if (selected===null) return;
  const nextScore = score + (selected===quizQuestions[step].correct?1:0);
  setScore(nextScore);
  if (step<quizQuestions.length-1) { setStep(step+1); setSelected(null); }
  else setDone(true);
 };

 return <div className="quiz-feature">
  <div><span className="mono">DESAFIO / 01 · SEM NOTA, SEM DADOS SALVOS</span><h3>Seu radar digital está ligado?</h3><p>Responda três situações rápidas sobre privacidade e segurança.</p></div>
  <button ref={openerRef} className="quiz-launch mono" type="button" aria-haspopup="dialog" aria-expanded={open} onClick={startQuiz}>COMEÇAR DESAFIO ↗</button>
  {open&&<><button type="button" className={`quiz-backdrop${closing?' is-closing':''}`} aria-label="Fechar desafio" onClick={closeDialog} tabIndex={closing?-1:0}/><div ref={dialogRef} className={`quiz-dialog${closing?' is-closing':''}`} role="dialog" aria-modal="true" aria-labelledby="quiz-title" aria-hidden={closing}>
   <button className="quiz-close mono" type="button" onClick={closeDialog} tabIndex={closing?-1:0}>FECHAR ×</button>
   <span className="mono">DESAFIO DE PRIVACIDADE · {done?'RESULTADO':`${String(step+1).padStart(2,'0')} / 03`}</span>
   <h2 id="quiz-title" ref={titleRef} tabIndex={-1}>{done?'Seu radar digital.':quizQuestions[step].question}</h2>
   {done?<><p className="quiz-result-score">{score} de {quizQuestions.length} respostas seguras.</p><p>Privacidade também se constrói com escolhas pequenas e revisões frequentes.</p><button className="quiz-next mono" type="button" onClick={startQuiz}>TENTAR DE NOVO ↻</button></>:<><div className="quiz-options">{quizQuestions[step].options.map((option,index)=><button type="button" key={option} aria-pressed={selected===index} onClick={()=>setSelected(index)}>{option}<span aria-hidden="true">{selected===index?'●':'○'}</span></button>)}</div>{selected!==null&&<><p className="quiz-feedback" role="status">{selected===quizQuestions[step].correct?'Boa escolha.':'Vale rever essa opção.'} {quizQuestions[step].explanation}</p><button className="quiz-next mono" type="button" onClick={continueQuiz}>{step===quizQuestions.length-1?'VER RESULTADO ↗':'PRÓXIMA SITUAÇÃO ↗'}</button></>}</>}
  </div></>}
 </div>;
}

export default function Home() {
 const headerRef = useRef<HTMLElement>(null);
 const mastheadRef = useRef<HTMLDivElement>(null);
 const [wordmarkVisible, setWordmarkVisible] = useState(false);
 useEffect(() => {
  const header = headerRef.current;
  const masthead = mastheadRef.current;
  if (!header || !masthead) return;

  let observer: IntersectionObserver | undefined;
  const observeMasthead = () => {
   observer?.disconnect();
   const headerHeight = Math.ceil(header.getBoundingClientRect().height);
   setWordmarkVisible(masthead.getBoundingClientRect().bottom <= headerHeight);
   observer = new IntersectionObserver(([entry]) => {
    setWordmarkVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= headerHeight);
   }, { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 });
   observer.observe(masthead);
  };

  const resizeObserver = new ResizeObserver(observeMasthead);
  resizeObserver.observe(header);
  observeMasthead();
  return () => {
   observer?.disconnect();
   resizeObserver.disconnect();
  };
 }, []);
 const [index,setIndex]=useState(false); const [indexMounted,setIndexMounted]=useState(false); const [signal,setSignal]=useState(true); const [offset,setOffset]=useState({x:0,y:0}); const [progress,setProgress]=useState(0); const [reading,setReading]=useState(false);
 useEffect(()=>{if(index){setIndexMounted(true);return}if(!indexMounted)return;const timeout=window.setTimeout(()=>setIndexMounted(false),320);return()=>window.clearTimeout(timeout)},[index,indexMounted]);
 useEffect(()=>{const move=(e:PointerEvent)=>setOffset({x:(e.clientX/window.innerWidth-.5)*40,y:(e.clientY/window.innerHeight-.5)*28});const scroll=()=>setProgress(window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight)*100);const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setIndex(false)};window.addEventListener('pointermove',move);window.addEventListener('scroll',scroll);window.addEventListener('keydown',key);return()=>{window.removeEventListener('pointermove',move);window.removeEventListener('scroll',scroll);window.removeEventListener('keydown',key)}},[]);
 return <main className={reading?'reading':''}>
 <div className="progress" style={{width:`${progress}%`}}/>
 <header ref={headerRef} className="topbar"><a href="#inicio" className={`wordmark${wordmarkVisible ? ' is-visible' : ''}`} aria-label="Tática — voltar ao início" aria-hidden={!wordmarkVisible} tabIndex={wordmarkVisible ? 0 : -1}><span className="wordmark-text" aria-hidden="true">{Array.from('TÁTICA').map((letter, i) => <span className="wordmark-letter" key={i} style={{ transitionDelay: `${i * 45}ms` }}>{letter}</span>)}</span><span className="wordmark-registration" aria-hidden="true">®</span></a><span className="top-note">UMA REVISTA PARA OLHAR ALÉM.</span><button onClick={()=>setIndex(!index)} aria-expanded={index} aria-controls="indice">{index?'FECHAR ×':'EXPLORAR EDIÇÃO ↗'}</button></header>
  {indexMounted&&<><button type="button" className={`index-backdrop${index?'':' is-closing'}`} aria-label="Fechar o sumário" onClick={()=>setIndex(false)} tabIndex={index?0:-1}/><nav id="indice" className={`index-panel${index?'':' is-closing'}`} aria-label="Sumário" aria-hidden={!index}><span className="mono">QUEM ESTÁ OLHANDO? / EDIÇÃO 001</span><h2>Em pauta.</h2>{chapters.map(c=><a key={c.id} href={`#${c.id}`} onClick={()=>setIndex(false)} tabIndex={index?0:-1}><span>{c.n}</span>{c.title}<b>↗</b></a>)}<a className="index-team-link" href="#equipe" onClick={()=>setIndex(false)} tabIndex={index?0:-1}><span>08</span>EQUIPE EDITORIAL<b>↗</b></a><p>Protótipo editorial · textos demonstrativos</p></nav></>}
 <section id="inicio" className="cover-wrap"><div className="edition-line"><span>EDIÇÃO 001 — QUEM ESTÁ OLHANDO?</span><span>SEGURANÇA PÚBLICA NA ERA DIGITAL</span><span>BRASIL / MULTI</span></div><div ref={mastheadRef} className="masthead">TÁTICA<span className="mast-star">✳</span></div>
 <div className="cover"><div className="cover-copy"><div className="eyebrow"><span className="dot"/> QUEM ESTÁ OLHANDO?</div><h1>SORRIA.<br/>VOCÊ ESTÁ<br/><span>SENDO</span><br/>OBSERVADO.</h1><p>Entre cliques, códigos e olhares.<br/>A segurança de quem vive conectado.</p><a className="read-link" href="#sumario">ENTRAR NA EDIÇÃO <span>↘</span></a><div className="cover-bottom mono">[ PRIVACIDADE NÃO É UM DETALHE. ]</div></div>
 <div className={`eye-art ${!signal?'offline':''}`}><div className="art-top mono"><span>CAM_01 / ONLINE</span><span>REC <i/></span></div><div className="code-wall" aria-hidden="true">{Array.from({length:26},(_,i)=><div key={i}>{`${(i+1).toString().padStart(3,'0')}  ${['const identity = await collect(data);','if (consent === undefined) { observe(); }','01001001 00100000 01010011 01000101','user.history.map(trace => store(trace));','// quem está do outro lado da tela?','access.log({ location, clicks, identity });'][i%6]}`}</div>)}</div><div className="eye-box"><Eye offset={signal?offset:{x:0,y:0}}/><div className="target-line horizontal"/><div className="target-line vertical"/><span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/></div><span className="eye-label mono">FIG. 01 — O OLHAR QUE NUNCA DESLIGA</span><div className="art-bottom mono"><span>{signal?'SUJEITO: VOCÊ_':'SINAL INTERROMPIDO_'}</span><button onClick={()=>setSignal(!signal)}>{signal?'INTERROMPER SINAL ⏻':'RESTABELECER SINAL ⏻'}</button></div></div></div>
 <div className="ticker" aria-hidden="true"><span>SEUS DADOS.</span> SEUS RASTROS. <span>QUEM CONTROLA?</span> SEUS DADOS. <span>SEUS RASTROS.</span> QUEM CONTROLA? ↗</div></section>
 <section id="sumario" className="contents section"><div className="section-label"><span>01 / NESTA EDIÇÃO</span><span>SEIS PERSPECTIVAS. UM ALERTA.</span></div><div className="contents-heading"><h2>O invisível<br/>também deixa <em>rastros.</em></h2><p>Uma edição sobre o que você compartilha.<br/>E sobre o que compartilham de você.</p></div><div className="chapter-list">{chapters.map(c=><a key={c.id} className="chapter" href={`#${c.id}`}><span className="chapter-number">{c.n}</span><div><span className="mono">{c.tag}</span><h3>{c.title}</h3><p>{c.desc}</p></div><span className="chapter-page mono">P. {c.page}<b>↗</b></span></a>)}</div></section>
 <section id="rastros" className="article section"><div className="section-label"><span>02 / PRIVACIDADE & DADOS</span><span>LEITURA 01 — P. 06</span></div><div className="article-grid"><aside><span className="mono acid-text">DOSSIÊ / 001</span><h2>O que fica<br/>depois<br/>do <em>clique?</em></h2><div className="byline">POR EQUIPE TÁTICA<br/><span>TEXTO PROVISÓRIO · LOREM IPSUM</span></div><button className="reading-button" onClick={()=>setReading(!reading)} aria-pressed={reading}>{reading?'− REDUZIR TEXTO':'+ AMPLIAR TEXTO'}</button></aside><div className="article-body"><p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cada clique, uma pista. Cada tela, uma nova camada.</p><div className="columns"><p className="dropcap">{lorem} {lorem}</p><p>{lorem} {lorem}</p></div><blockquote>“Quando tudo é dado,<br/>quem tem o <em>controle?</em>”</blockquote><p>{lorem}</p></div></div><TraceExplorer/><div className="visual-spread"><EditorialImage number="01" title="Anatomia de um rastro."/><div className="continuation"><span className="mono">CONTINUA / PRIVACIDADE</span><h3>Além da superfície.</h3><p>{lorem}</p><p>{lorem}</p></div></div></section>
 <section id="mercado" className="market section"><div className="section-label"><span>03 / GOLPES & VAZAMENTOS</span><span>LEITURA 02 — P. 12</span></div><div className="market-grid"><div className="receipt"><div className="mono">MERCADO INVISÍVEL / ILUSTRAÇÃO</div><h3>IDENTIDADE<br/>EM EXPOSIÇÃO.</h3><div className="receipt-row"><span>HISTÓRICO</span><span>••••••••</span></div><div className="receipt-row"><span>LOCALIZAÇÃO</span><span>••••••••</span></div><div className="receipt-row"><span>CONTATOS</span><span>••••••••</span></div><div className="receipt-row"><span>PREFERÊNCIAS</span><span>••••••••</span></div><div className="barcode"/><span className="mono">VOCÊ É MAIS DO QUE UM REGISTRO.</span><span className="receipt-stamp">EXPOSTO</span></div><div><span className="mono">SEUS DADOS TÊM VALOR.</span><h2>Você não está<br/>à venda.<br/><em>Seus dados, sim.</em></h2><p>{lorem}</p><p>{lorem}</p></div></div><DataGraphic/><div className="text-continuation"><h3>Por trás de cada registro.</h3><div className="columns"><p>{lorem} {lorem}</p><p>{lorem} {lorem}</p></div></div></section>
 <section id="inteligencia" className="ai section"><div className="section-label"><span>04 / INTELIGÊNCIA ARTIFICIAL</span><span>LEITURA 03 — P. 18</span></div><div className="ai-grid"><div><span className="mono">INPUT: VOCÊ / OUTPUT: ?</span><h2>Quem vê<br/>o que a<br/><em>IA vê?</em></h2><p>{lorem}</p><p>{lorem}</p></div><div className="ai-visual"><div className="ai-frame"><Eye small offset={offset}/><span className="mono">&lt; transparency / &gt;</span></div><p className="mono">CAIXA-PRETA / ABRA ESPAÇO PARA PERGUNTAS.</p></div></div><div className="visual-spread ai-spread"><EditorialImage number="02" title="Dentro da caixa-preta."/><div className="continuation"><span className="mono">CONTINUA / INTELIGÊNCIA ARTIFICIAL</span><h3>Uma pergunta de cada vez.</h3><p>{lorem}</p><p>{lorem}</p></div></div><DataGraphic variant="line"/></section>

 <section id="algoritmos" className="extended-feature section"><div className="section-label"><span>05 / RASTREAMENTO & ALGORITMOS</span><span>LEITURA 04 — P. 26</span></div><div className="feature-heading"><span className="mono">PERFIS, PADRÕES E POSSIBILIDADES</span><h2>O feed também<br/><em>olha de volta.</em></h2><p>{lorem}</p></div><EditorialImage number="03" title="Retrato de uma identidade digital."/><div className="feature-body"><div className="margin-note mono">EM FOCO / 04<br/><br/>Espaço para notas,<br/>conceitos e referências<br/>da reportagem.</div><div><h3>O que existe entre um clique e outro.</h3><div className="columns"><p className="dropcap">{lorem} {lorem}</p><p>{lorem} {lorem}</p></div><blockquote>“Quem escolhe o que<br/>você vai ver a seguir?”</blockquote><p>{lorem}</p></div></div><DataGraphic variant="line"/></section>
 <section id="consentimento" className="consent-feature section"><div className="section-label"><span>06 / CONSENTIMENTO & TRANSPARÊNCIA</span><span>LEITURA 05 — P. 34</span></div><div className="consent-grid"><div><span className="mono">NAS ENTRELINHAS / 005</span><h2>Li e aceito.<br/><em>Mas entendi?</em></h2><p>{lorem}</p><p>{lorem}</p><div className="editorial-callout"><span className="mono">PAUSA PARA PENSAR</span><h3>O que você gostaria de saber antes de aceitar?</h3><p>{lorem}</p></div></div><EditorialImage number="04" title="As letras pequenas." portrait/></div><PermissionLab/><div className="text-continuation"><h3>Escolhas que precisam ser claras.</h3><div className="columns"><p>{lorem} {lorem}</p><p>{lorem} {lorem}</p></div></div></section>
 <section id="protecao" className="protection-feature section"><div className="section-label"><span>07 / SEGURANÇA & CIDADANIA</span><span>LEITURA 06 — P. 42</span></div><div className="feature-heading"><span className="mono">PARA CONTINUAR A CONVERSA</span><h2>O próximo clique<br/><em>é seu.</em></h2><p>{lorem}</p></div><div className="closing-grid"><EditorialImage number="05" title="Um olhar para o futuro."/><div className="continuation"><span className="mono">PROTEÇÃO É UM TEMA COLETIVO</span><h3>Da informação à ação.</h3><p>{lorem}</p><p>{lorem}</p></div></div><PrivacyQuiz/><div className="references"><span className="mono">FONTES & REFERÊNCIAS</span><p>Espaço reservado para fontes consultadas, links da pesquisa, créditos de imagens e metodologia dos gráficos.</p><a href="#sumario" className="mono">REVISITAR O SUMÁRIO ↗</a></div></section>
 <AuthorsSection/>
 <footer><div className="footer-top"><a href="#inicio" className="footer-brand">TÁTICA↗</a><p>Olhar com atenção.<br/>Questionar com intenção.</p><a href="#inicio" className="mono">VOLTAR AO TOPO ↑</a></div><div className="footer-bottom mono"><span>MULTI / REVISTA TÁTICA — 2026</span><span>EDIÇÃO 001 · QUEM ESTÁ OLHANDO?</span><span>OLHOS ANIMADOS. NENHUM RASTREAMENTO.</span></div></footer>
 </main>
}
