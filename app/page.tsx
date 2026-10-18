'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

import { chapters, ReportageContent } from '@/components/reportage';
import editorial from '@/lib/editorial.json';
import { folio, pageLabel, printSections, type PrintSection } from '@/lib/print-pages';

function Eye({ offset, small=false }: { offset: {x:number;y:number}; small?: boolean }) {
  return <svg className={small?'eye small-eye':'eye'} viewBox="0 0 700 440" aria-hidden="true"><defs><radialGradient id={small?'irisSmall':'iris'}><stop stopColor="#121713"/><stop offset=".3" stopColor="#697855"/><stop offset=".67" stopColor="#bcd48b"/><stop offset="1" stopColor="#222d1a"/></radialGradient><clipPath id={small?'clipSmall':'clip'}><path d="M35 220 Q350 -50 665 220 Q350 490 35 220Z"/></clipPath></defs><g clipPath={`url(#${small?'clipSmall':'clip'})`}><path d="M35 220 Q350 -50 665 220 Q350 490 35 220Z" fill="#dedfd3"/><g transform={`translate(${offset.x} ${offset.y})`}><circle cx="350" cy="220" r="139" fill={`url(#${small?'irisSmall':'iris'})`}/>{Array.from({length:110},(_,i)=>{const a=i*Math.PI/55;return <line key={i} x1={(350+65*Math.cos(a)).toFixed(3)} y1={(220+65*Math.sin(a)).toFixed(3)} x2={(350+(128+(i%7))*Math.cos(a+.025)).toFixed(3)} y2={(220+(128+(i%7))*Math.sin(a+.025)).toFixed(3)} stroke={i%3?'#18271c':'#e4efbe'} strokeWidth={i%4?1:2} opacity=".65"/>})}<circle cx="350" cy="220" r="61" fill="#080c09"/><circle cx="319" cy="181" r="18" fill="#fff" opacity=".8"/><circle cx="375" cy="253" r="7" fill="#fff" opacity=".35"/></g></g><path d="M35 220 Q350 -50 665 220 Q350 490 35 220Z" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M45 195 Q350 -91 655 195" fill="none" stroke="currentColor" strokeWidth="1" opacity=".45"/></svg>
}

function CoverEye() {
 const [signal,setSignal]=useState(true);
 const [offset,setOffset]=useState({x:0,y:0});
 return <div className={`eye-art ${!signal?'offline':''}`} onPointerMove={event=>{if(!signal||event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const bounds=event.currentTarget.getBoundingClientRect();setOffset({x:((event.clientX-bounds.left)/bounds.width-.5)*40,y:((event.clientY-bounds.top)/bounds.height-.5)*28});}} onPointerLeave={()=>setOffset({x:0,y:0})}><div className="art-top mono"><span>{signal?'CAM_01 / ONLINE':'CAM_01 / OFFLINE'}</span><span>REC <i/></span></div><div className="code-wall" aria-hidden="true">{Array.from({length:26},(_,i)=><div key={i}>{`${(i+1).toString().padStart(3,'0')}  ${['const identity = await collect(data);','if (consent === undefined) { observe(); }','01001001 00100000 01010011 01000101','user.history.map(trace => store(trace));','// quem está do outro lado da tela?','access.log({ location, clicks, identity });'][i%6]}`}</div>)}</div><div className="eye-box"><Eye offset={signal?offset:{x:0,y:0}}/><div className="target-line horizontal"/><div className="target-line vertical"/><span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/></div><div className="cover-security"><svg viewBox="0 0 40 46" aria-hidden="true"><path d="M20 3 36 9v12c0 10-7 17-16 22C11 38 4 31 4 21V9Z"/><path d="m12 23 5 5 11-12"/></svg><span><strong>SEGURANÇA PÚBLICA</strong><small>Prevenção · investigação · direitos</small></span></div><div className="art-bottom mono"><span>{signal?'SUJEITO: VOCÊ_':'SINAL INTERROMPIDO_'}</span><button type="button" aria-pressed={!signal} onClick={()=>setSignal(!signal)}>{signal?'INTERROMPER SINAL ⏻':'RESTABELECER SINAL ⏻'}</button></div></div>;
}



const authors = [
 { name: 'Beatriz Battista', initials: 'BB', photo: '/images/integrantes/beatriz-battista.jpg', position: '50% 50%' },
 { name: 'Enzo Christowam', initials: 'EC', photo: '/images/integrantes/enzo-christowam.jpeg', position: '50% 58%' },
 { name: 'Giovanna Almeida', initials: 'GA', photo: '/images/integrantes/giovanna-almeida.jpg', position: '50% 50%' },
 { name: 'Gustavo Costa', initials: 'GC', photo: '/images/integrantes/gustavo-costa.jpg', position: '50% 50%' },
 { name: 'Kevin Martins', initials: 'KM', photo: '/images/integrantes/kevin-martins.png', position: '50% 40%' },
 { name: 'Lucas Guerriero', initials: 'LG', photo: '/images/integrantes/lucas-guerriero.jpeg', position: '50% 68%' },
];

function AuthorsSection() {
 const railRef = useRef<HTMLDivElement>(null);
 const moveRail = (direction: number) => railRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });

 return <section id="equipe" className="authors-section section" aria-labelledby="authors-title">
  <div className="section-label"><span>ABERTURA / EQUIPE EDITORIAL</span><span>QUEM FAZ A TÁTICA · {folio('equipe')}</span></div>
  <div className="authors-heading">
   <div><h2 id="authors-title">Equipe <em>editorial</em></h2></div>
   <div className="authors-intro"><p>Conheça as pessoas por trás desta edição.</p><div className="authors-controls"><button type="button" aria-label="Ver integrantes anteriores" onClick={()=>moveRail(-1)}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button><button type="button" aria-label="Ver próximos integrantes" onClick={()=>moveRail(1)}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div></div>
  </div>
  <div className="authors-rail" ref={railRef} tabIndex={0} role="region" aria-label="Integrantes da equipe editorial">
   {authors.map((author, index)=><article className={`author-card${author.photo?' has-photo':''}`} key={author.name}>
    {author.photo?<img className="author-photo" src={author.photo} alt="" loading="lazy" decoding="async" style={{objectPosition:author.position}}/>:<div className="author-mark" aria-hidden="true">{author.initials}</div>}
    <div className="author-card-top"><span className="mono">TÁTICA / {String(index+1).padStart(2,'0')}</span><span aria-hidden="true">✳</span></div>
    <div className="author-card-copy"><h3>{author.name}</h3><p className="mono">AUTORIA · EDIÇÃO 001</p></div>
   </article>)}
  </div>
  <p className="authors-hint mono">DESLIZE PARA O LADO PARA CONHECER TODO O GRUPO <span aria-hidden="true">↔</span></p>
 </section>;
}

const quizQuestions = [
 { question: 'Uma cobrança traz seu nome e o valor correto. Isso comprova sua origem?', options: ['Sim, esses dados garantem a autenticidade', 'Não. É preciso conferir a cobrança e o beneficiário no canal oficial', 'Sim, se a aparência for igual à do banco'], correct: 1, explanation: 'O caso relatado por Diogo mostra como dados verdadeiros podem tornar uma cobrança falsa convincente. A aparência do documento não confirma o destinatário.' },
 { question: '52% dos usuários de IA disseram ter enviado dados de saúde. O que isso permite concluir?', options: ['Que todos esses dados treinaram modelos', 'Que houve envio de informações; o uso posterior depende do serviço', 'Que as ferramentas são ilegais'], correct: 1, explanation: 'O levantamento mede o envio de informações. Processamento, armazenamento, compartilhamento e treinamento são operações diferentes.' },
 { question: 'Quem deve participar da prevenção e da resposta às fraudes?', options: ['Usuários, empresas e Estado, com obrigações proporcionais à capacidade de agir', 'Somente quem recebe a mensagem', 'Somente a polícia, depois do prejuízo'], correct: 0, explanation: 'Conferir uma mensagem ajuda, mas não substitui controles sobre contas, preservação de provas, atendimento e fiscalização do uso de dados.' },
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
  <div><span className="mono">PAUSA NA LEITURA / TRÊS SITUAÇÕES</span><h3>Questões sobre a reportagem</h3><p>Conecte os casos e os dados da reportagem a decisões do dia a dia.</p></div>
  <button ref={openerRef} className="quiz-launch mono" type="button" aria-haspopup="dialog" aria-expanded={open} onClick={startQuiz}>COMEÇAR DESAFIO ↗</button>
  {open&&<><button type="button" className={`quiz-backdrop${closing?' is-closing':''}`} aria-label="Fechar desafio" onClick={closeDialog} tabIndex={closing?-1:0}/><div ref={dialogRef} className={`quiz-dialog${closing?' is-closing':''}`} role="dialog" aria-modal="true" aria-labelledby="quiz-title" aria-hidden={closing}>
   <button className="quiz-close mono" type="button" onClick={closeDialog} tabIndex={closing?-1:0}>FECHAR ×</button>
   <span className="mono">DESAFIO DE PRIVACIDADE · {done?'RESULTADO':`${String(step+1).padStart(2,'0')} / 03`}</span>
   <h2 id="quiz-title" ref={titleRef} tabIndex={-1}>{done?'Seu radar digital.':quizQuestions[step].question}</h2>
   {done?<><p className="quiz-result-score">{score} de {quizQuestions.length} respostas seguras.</p><p>Informação ajuda a agir. Proteção também exige resposta das instituições.</p><button className="quiz-next mono" type="button" onClick={startQuiz}>TENTAR DE NOVO ↻</button></>:<><div className="quiz-options">{quizQuestions[step].options.map((option,index)=><button type="button" key={option} aria-pressed={selected===index} onClick={()=>setSelected(index)}>{option}<span aria-hidden="true">{selected===index?'●':'○'}</span></button>)}</div>{selected!==null&&<><p className="quiz-feedback" role="status">{selected===quizQuestions[step].correct?'Boa escolha.':'Vale rever essa opção.'} {quizQuestions[step].explanation}</p><button className="quiz-next mono" type="button" onClick={continueQuiz}>{step===quizQuestions.length-1?'VER RESULTADO ↗':'PRÓXIMA SITUAÇÃO ↗'}</button></>}</>}
  </div></>}
 </div>;
}

function EditorialSection() {
 return <section id="editorial" className="editorial-opening section" aria-labelledby="editorial-title">
  <div className="section-label"><span className="editorial-badge">EDITORIAL · OPINIÃO</span><span>A POSIÇÃO DA EQUIPE · EDIÇÃO 001 · {folio('editorial')}</span></div>
  <div className="editorial-opening-grid"><div className="editorial-heading"><span className="mono">A POSIÇÃO DA EQUIPE</span><h2 id="editorial-title">Quem está<br/><em>olhando?</em></h2><div className="editorial-byline"><span className="mono">POR EQUIPE TÁTICA</span><span className="mono">BRASIL / 2026</span></div></div>
   <div className="editorial-copy editorial-full"><div className="editorial-context">Neste editorial, o grupo defende propostas para a segurança digital. A reportagem a seguir apresenta os casos, os dados e a análise.</div>{editorial.paragraphs.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>
  </div>
 </section>;
}

// Shows the printed-edition page that matches the passage on screen.
function PageIndicator() {
 const [page, setPage] = useState(1);
 useEffect(() => {
  let pending = 0;
  const update = () => {
   pending = 0;
   const reading = window.scrollY + window.innerHeight * .35;
   let next = 1;
   for (const [id, [first, last]] of printSections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (reading < top) break;
    const progress = Math.min(.999, (reading - top) / Math.max(1, el.offsetHeight));
    next = first + Math.floor(progress * (last - first + 1));
   }
   setPage(next);
  };
  const schedule = () => { if (!pending) pending = requestAnimationFrame(update); };
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(pending); };
 }, []);
 return <div className="page-indicator mono" aria-hidden="true">{pageLabel(page)}</div>;
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
 const [index,setIndex]=useState(false); const [indexMounted,setIndexMounted]=useState(false); const [progress,setProgress]=useState(0); const [reading,setReading]=useState(false);
 useEffect(()=>{if(index){setIndexMounted(true);return}if(!indexMounted)return;const timeout=window.setTimeout(()=>setIndexMounted(false),320);return()=>window.clearTimeout(timeout)},[index,indexMounted]);
 useEffect(()=>{const scroll=()=>setProgress(window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight)*100);const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setIndex(false)};window.addEventListener('scroll',scroll);window.addEventListener('keydown',key);return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('keydown',key)}},[]);
 const toggleReading = useCallback(()=>setReading(value=>!value),[]);
 const quiz = useMemo(()=><PrivacyQuiz/>,[]);
 return <main className={reading?'reading':''}>
 <div className="progress" style={{width:`${progress}%`}}/>
 <header ref={headerRef} className="topbar"><a href="#inicio" className={`wordmark${wordmarkVisible ? ' is-visible' : ''}`} aria-label="Tática — voltar ao início" aria-hidden={!wordmarkVisible} tabIndex={wordmarkVisible ? 0 : -1}><span className="wordmark-text" aria-hidden="true">{Array.from('TÁTICA').map((letter, i) => <span className="wordmark-letter" key={i} style={{ transitionDelay: `${i * 45}ms` }}>{letter}</span>)}</span><span className="wordmark-registration" aria-hidden="true">®</span></a><span className="top-note">SEGURANÇA PÚBLICA TAMBÉM É DIGITAL.</span><button type="button" className="index-toggle" onClick={()=>setIndex(!index)} aria-expanded={index} aria-controls="indice"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{index?<path d="m6 6 12 12M6 18 18 6"/>:<><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></>}</svg><span>{index?'FECHAR SUMÁRIO':'ABRIR SUMÁRIO'}</span></button></header>
  {indexMounted&&<><button type="button" className={`index-backdrop${index?'':' is-closing'}`} aria-label="Fechar o sumário" onClick={()=>setIndex(false)} tabIndex={index?0:-1}/><nav id="indice" className={`index-panel${index?'':' is-closing'}`} aria-label="Sumário" aria-hidden={!index}><span className="mono">QUEM ESTÁ OLHANDO? / EDIÇÃO 001</span><h2>Em pauta.</h2><a className="index-team-link" href="#equipe" onClick={()=>setIndex(false)} tabIndex={index?0:-1}><span>EQ.</span>EQUIPE EDITORIAL<small className="index-folio">{folio('equipe')}</small><b>↗</b></a><a className="index-editorial-link" href="#editorial" onClick={()=>setIndex(false)} tabIndex={index?0:-1}><span>AB.</span>EDITORIAL<small className="index-folio">{folio('editorial')}</small><b>↗</b></a>{chapters.map(c=><a key={c.id} href={`#${c.id}`} onClick={()=>setIndex(false)} tabIndex={index?0:-1}><span>{c.n}</span>{c.title}<small className="index-folio">{folio(c.id as PrintSection)}</small><b>↗</b></a>)}<p>Reportagem especial · dados, relatos e responsabilidades</p></nav></>}
 <section id="inicio" className="cover-wrap"><div className="edition-line"><span>EDIÇÃO 001 — QUEM ESTÁ OLHANDO?</span></div><div ref={mastheadRef} className="masthead">TÁTICA<span className="mast-star">✳</span></div>
 <div className="cover"><div className="cover-copy"><div className="eyebrow"><span className="dot"/> SEGURANÇA PÚBLICA NA ERA DIGITAL</div><h1>QUEM<br/>ESTÁ<br/><span>OLHANDO?</span></h1><p>Seus dados, a confiança e a segurança<br/>de quem vive conectado.</p><div className="read-link cover-spacer" aria-hidden="true">&nbsp;</div><div className="cover-bottom mono cover-spacer" aria-hidden="true">&nbsp;</div></div><CoverEye/></div>
 <div className="ticker" aria-hidden="true"><span>SEUS DADOS.</span> SEUS RASTROS. <span>QUEM CONTROLA?</span> SEUS DADOS. <span>SEUS RASTROS.</span> QUEM CONTROLA?</div></section>
 <AuthorsSection/>
 <EditorialSection/><section id="sumario" className="contents section"><div className="section-label"><span>01 / NESTA EDIÇÃO · {folio('sumario')}</span><span>UMA INVESTIGAÇÃO EM SEIS ETAPAS.</span></div><div className="contents-heading"><h2>Uma leitura em <em>seis etapas</em></h2><p>Comece pelos casos. A cada etapa, acompanhe mais uma parte do problema — e da proteção.</p></div><div className="chapter-list">{chapters.map(c=><a key={c.id} className="chapter" href={`#${c.id}`}><span className="chapter-number">{c.n}</span><div><span className="mono">{c.tag}</span> <span className="chapter-folio mono">{folio(c.id as PrintSection)}</span><h3>{c.title}</h3><p>{c.desc}</p></div><span className="chapter-page mono">CAP. {c.n}<b>↗</b></span></a>)}</div></section>
 <ReportageContent reading={reading} onReadingChange={toggleReading} quiz={quiz}/>
 <PageIndicator/>
 <footer><div className="footer-top"><a href="#inicio" className="footer-brand">TÁTICA</a><p>Olhar com atenção.<br/>Questionar com intenção.</p><a href="#inicio" className="mono">VOLTAR AO TOPO ↑</a></div><div className="footer-bottom mono"><span>MULTI / REVISTA TÁTICA — 2026</span><span>EDIÇÃO 001 · QUEM ESTÁ OLHANDO?</span><span>REPORTAGEM · DADOS · RESPONSABILIDADES</span></div></footer>
 </main>
}
