'use client';
import { useState } from 'react';
import { EvidenceSource, Indicator, EditorialPhoto } from './evidence';

const glossary = [
  ['IA generativa','Inteligência artificial que produz conteúdos, como textos, imagens ou áudio, a partir de padrões aprendidos durante o treinamento. Suas respostas podem conter erros.'],
  ['Credenciais e chaves de sessão','Credenciais, como senhas, ajudam a comprovar identidade. Uma chave de sessão mantém um acesso autenticado; se roubada, pode permitir acesso indevido.'],
  ['FMTI e DBIR','FMTI é um índice de transparência de desenvolvedores de IA. DBIR é um relatório de violações de dados. Têm métodos e populações diferentes e não medem o mesmo risco.'],

  ['Perfilamento','Combinar informações para inferir interesses, hábitos ou características de alguém. Pode orientar anúncios e decisões; uma inferência pode estar errada.'],
  ['Metadados','Informações sobre uma interação, como horário, localização e aparelho utilizado, além do próprio conteúdo.'],
  ['Data brokers','Empresas intermediárias que reúnem e comercializam dados ou perfis. A origem e a finalidade do tratamento precisam ser examinadas.'],
  ['Engenharia social','Manipulação de confiança, medo ou urgência para induzir uma ação, como pagar uma cobrança falsa.'],
  ['Phishing','Tentativa de enganar alguém com mensagens ou páginas que imitam serviços confiáveis para obter dados, acesso ou dinheiro.'],
  ['Deepfake','Áudio, imagem ou vídeo produzido ou alterado por IA para simular uma pessoa ou acontecimento. Não há comprovação de uso nos dois casos desta revista.'],
  ['Autenticação multifator','Confirmação da identidade com fatores diferentes, como senha e aplicativo autenticador ou chave de segurança. Dois passos baseados apenas em senhas não são necessariamente dois fatores.'],
  ['Base legal','Hipótese prevista em lei que autoriza um tratamento de dados, conforme suas condições. Consentimento é uma delas, não a única.'],
  ['Controlador','Pessoa ou organização que decide a finalidade e as condições do tratamento de dados pessoais.'],
  ['MED','Mecanismo Especial de Devolução: procedimento do Pix para analisar situações de fraude e buscar devolver recursos. Não vale para qualquer disputa nem garante restituição.'],
  ['Capitalismo de vigilância','Conceito de Shoshana Zuboff para analisar a transformação de experiências em dados usados para prever comportamentos e gerar receitas.'],
  ['Superávit comportamental','Na análise de Zuboff, informações extraídas além das necessárias ao serviço e apropriadas para prever comportamentos.'],
  ['Responsabilização','Na leitura de Garland, estratégias de prevenção envolvem Estado, empresas e cidadãos. A participação individual não elimina deveres institucionais.'],
];
export function ExpandedGlossary() {
  return <div className="expanded-glossary"><div className="feature-heading"><span className="mono">PARA SE APROPRIAR DOS CONCEITOS</span><h3>Palavras que ajudam a entender</h3><p>Definições curtas para voltar ao texto com clareza. Os conceitos sociológicos são instrumentos de análise, não provas sobre os casos.</p></div><div className="glossary-grid">{glossary.map(([term,definition])=><details key={term}><summary>{term}</summary><p>{definition}</p></details>)}</div><div className="evidence-links"><EvidenceSource id="lgpd"/><EvidenceSource id="cert"/><a href="#fonte-3">Zuboff [3]</a><a href="#fonte-6">Garland [6]</a></div></div>;
}
export function ReaderQuestions() {
  return <div className="reader-questions"><span className="mono">TRÊS DÚVIDAS IMPORTANTES</span><h3>O que os dados permitem concluir?</h3><div className="questions-grid"><article><span>01</span><h4>Dado público pode ser usado para qualquer finalidade?</h4><p>Não. A disponibilidade pública não elimina a proteção de dados pessoais. Finalidade, necessidade, boa-fé e direitos do titular continuam relevantes.</p><EvidenceSource id="lgpd"/></article><article><span>02</span><h4>Enviar informações à IA significa treinar o modelo?</h4><p>Não necessariamente. Responder, armazenar, compartilhar e treinar são operações diferentes. É preciso verificar o serviço, o tipo de conta e suas configurações.</p><EvidenceSource id="cetic-pr19"/></article><article><span>03</span><h4>Quem pode agir depois de um golpe?</h4><p>Banco, plataforma, polícia e órgãos de defesa têm funções distintas. O caminho depende do pagamento, da exposição dos dados e do atendimento necessário.</p><EvidenceSource id="cert"/></article></div></div>;
}
const sections = [
  {id:'prevenir',title:'Prevenir',intro:'Reduza a exposição e prepare caminhos de recuperação.',items:[
    {title:'Proteja o acesso',text:'Use uma senha diferente por serviço e um gerenciador de senhas. Ative autenticação multifator: uma confirmação adicional, como aplicativo autenticador ou chave de segurança. Guarde códigos de recuperação em local seguro.'},
    {title:'Revise o que compartilha',text:'Confira permissões de câmera, microfone e localização. Remova acessos desnecessários. Antes de enviar documentos ou exames à IA, verifique finalidade, retenção e controles do serviço.'},
    {title:'Confirme por outro canal',text:'Desconfie da urgência. Ligue para um número que você já conhece. Confira beneficiário e dados da cobrança no aplicativo oficial; nome e valor corretos não comprovam autenticidade.'},
  ]},
  {id:'agir',title:'Após uma fraude',intro:'Aja rapidamente, guarde provas e registre protocolos.',items:[
    {title:'Avise banco e plataforma',text:'Entre em contato pelos canais oficiais. Informe a fraude, peça bloqueios cabíveis e guarde o protocolo. Se foi Pix, solicite a análise pelo MED imediatamente; o limite é de 80 dias. Se foi boleto, peça análise e tentativa de recuperação ao banco: o MED não se aplica ao boleto.'},
    {title:'Preserve as evidências',text:'Guarde comprovantes, mensagens, números, endereços de páginas e horários. Não publique dados pessoais nas redes. Se houve acesso à conta, use um dispositivo confiável para trocar a senha e encerrar sessões desconhecidas.'},
    {title:'Registre a ocorrência',text:'Procure a Polícia Civil do seu estado, presencialmente ou pelo canal eletrônico disponível para o caso. O boletim documenta a notícia do crime; não garante devolução do dinheiro.'},
  ]},
  {id:'direitos',title:'Exercer direitos',intro:'Escolha o canal de acordo com o problema que precisa resolver.',items:[
    {title:'Peça explicações ao controlador',text:'Procure o canal de privacidade da organização. Peça confirmação do tratamento, acesso, correção e informação sobre compartilhamentos; solicite exclusão quando cabível. Registre pedido e resposta. A lei admite retenção em algumas hipóteses.'},
    {title:'Acione o canal adequado',text:'Se o exercício de um direito não foi atendido pelo controlador, avalie uma petição de titular à ANPD. Para comunicar possível infração à LGPD, existe a denúncia. A ANPD fiscaliza proteção de dados; não substitui a investigação policial nem concede indenização individual.'},
    {title:'Busque solução e assistência',text:'Procon e Consumidor.gov.br ajudam a encaminhar conflitos de consumo, conforme competência e participação da empresa. Para orientação jurídica e eventual ação, procure a Defensoria Pública do seu estado, conforme os critérios de atendimento, ou um advogado.'},
  ]},
];
export function ProtectionGuide() {
  const [active,setActive] = useState('prevenir');
  return <div className="protection-guide"><div className="feature-heading"><span className="mono">SERVIÇO / DA LEITURA À AÇÃO</span><h3>Por onde começar a se proteger</h3><p>Escolha sua situação. Os cuidados pessoais ajudam, enquanto empresas e Estado continuam responsáveis por suas obrigações.</p></div><div className="authentication-visual"><EditorialPhoto id="autenticacao" compact/><div><h4>Uma confirmação além da senha</h4><p>Autenticação multifator combina fatores de categorias diferentes para confirmar o acesso. Um aplicativo autenticador ou uma chave de segurança pode complementar a senha, conforme o suporte do serviço.</p><a href="https://cartilha.cert.br/fasciculos/" target="_blank" rel="noreferrer">Entenda a autenticação no CERT.br ↗</a></div></div><div className="guide-tabs" role="group" aria-label="Escolha uma situação">{sections.map(section=><button key={section.id} type="button" aria-pressed={active===section.id} aria-controls={`guide-${section.id}`} onClick={()=>setActive(section.id)}>{section.title}</button>)}</div>{sections.map(section=><section key={section.id} id={`guide-${section.id}`} className={`guide-panel${active===section.id?' is-active':''}`} aria-labelledby={`guide-heading-${section.id}`}><h4 id={`guide-heading-${section.id}`}>{section.title}</h4><p className="guide-intro">{section.intro}</p><ol>{section.items.map(item=><li key={item.title}><h5>{item.title}</h5><p>{item.text}</p></li>)}</ol></section>)}<div className="guide-links"><a href="https://cartilha.cert.br/fasciculos/" target="_blank" rel="noreferrer">Guias do CERT.br ↗</a><a href="https://www.gov.br/pt-br/servicos/abrir-requerimento-relacionado-a-lgpd" target="_blank" rel="noreferrer">Requerimento à ANPD ↗</a><a href="https://www.consumidor.gov.br/" target="_blank" rel="noreferrer">Consumidor.gov.br ↗</a><a href="https://www.procon.sp.gov.br/espaco-consumidor/" target="_blank" rel="noreferrer">Procon de São Paulo ↗</a><a href="https://delegaciadigital.policia-civil.sp.gov.br/pagina-inicial" target="_blank" rel="noreferrer">Polícia Civil de São Paulo ↗</a><a href="https://www.defensoria.sp.def.br/" target="_blank" rel="noreferrer">Defensoria de São Paulo ↗</a></div><p className="guide-location">Os três últimos canais são exemplos de São Paulo. Em outros estados, procure os órgãos locais.</p><div className="evidence-links"><EvidenceSource id="cert"/><EvidenceSource id="anpd-direitos"/><EvidenceSource id="lgpd"/><EvidenceSource id="med"/></div><Indicator id="med-prazo"/></div>;
}
