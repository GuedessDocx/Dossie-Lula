import { useEffect, useMemo, useRef, useState } from 'react';
import categoriesData from './data/categories.json';
import casesData from './data/cases.json';
import type { CaseRecord, Category } from './types';

const categories = categoriesData as Category[];
const cases = casesData as CaseRecord[];

function ExternalArrow() {
  return <span className="external-arrow" aria-hidden="true">↗</span>;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="search-icon" fill="none">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [query, setQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedCase && !dialog.open) dialog.showModal();
    if (!selectedCase && dialog.open) dialog.close();

    document.body.classList.toggle('dialog-open', Boolean(selectedCase));
    return () => document.body.classList.remove('dialog-open');
  }, [selectedCase]);

  const visibleCases = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    return cases.filter((record) => {
      const categoryMatches = activeCategory === 'todas' || record.category === activeCategory;
      if (!categoryMatches) return false;
      if (!normalizedQuery) return true;
      const categoryName = categories.find((category) => category.id === record.category)?.label ?? '';
      const searchableText = [
        record.title,
        record.summary,
        record.description,
        record.evidenceClassification,
        record.legalStatus,
        record.editorialNotes,
        categoryName,
        ...record.sources.map((source) => `${source.title} ${source.publisher}`),
      ].join(' ').toLocaleLowerCase('pt-BR');
      return searchableText.includes(normalizedQuery);
    });
  }, [activeCategory, query]);

  const activeRecordCategory = selectedCase
    ? categories.find((category) => category.id === selectedCase.category)
    : undefined;

  function closeDialog() {
    setSelectedCase(null);
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Dossiê Lula, início">
          <span className="brand-mark" aria-hidden="true">D<span>.</span></span>
          <span className="brand-name">DOSSIÊ<br />LULA</span>
        </a>
        <nav className="topnav" aria-label="Navegação principal">
          <a href="#dossie">O arquivo</a>
          <a href="#metodo">Como ler</a>
          <a href="#fontes">Fontes</a>
        </nav>
        <a className="topbar-index" href="#dossie"><span className="live-dot" /> ARQUIVO ABERTO <span className="topbar-index-line" /></a>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> ARQUIVO POLÍTICO INDEPENDENTE <span>·</span> 2026</p>
              <h1 id="hero-title">Dossiê<br /><span>Lula<span className="period">.</span></span></h1>
              <p className="hero-subtitle">O discurso, o poder e os fatos por trás dos governos do PT.</p>
              <p className="hero-intro">Uma leitura crítica com contexto antes do veredito e fonte antes da certeza.</p>
              <a className="button button-primary" href="#dossie">ENTRAR NO ARQUIVO <span aria-hidden="true">↓</span></a>
            </div>

            <div className="hero-art" aria-label="Composição gráfica original de fichas de arquivo">
              <div className="art-index">ARQ. 001 <span>—</span> BR</div>
              <div className="art-paper paper-back"><span>RECORTES</span><i /></div>
              <div className="art-paper paper-mid"><span>REGISTRO<br />PÚBLICO</span><b>2003 — 2026</b></div>
              <div className="art-paper paper-front">
                <span className="paper-overline">O QUE FICA<br />NO PAPEL</span>
                <div className="paper-rule" />
                <strong>D.<br /><em>L.</em></strong>
                <span className="paper-number">01—08</span>
                <div className="paper-stamp">FATOS<br />&amp; FONTES</div>
              </div>
              <div className="art-annotation annotation-one">DOCUMENTO<br />&nbsp;&nbsp;↓</div>
              <div className="art-annotation annotation-two">CONTEXTO<br />&nbsp;&nbsp;↗</div>
              <div className="art-caption">CADERNO 01 / LEITURA PÚBLICA</div>
            </div>
          </div>
          <div className="hero-footer">
            <span>O arquivo está em construção contínua.</span>
            <span>AFIRMAÇÃO SEM FONTE NÃO ENTRA.</span>
          </div>
        </section>

        <section className="manifesto" id="metodo" aria-label="Princípios editoriais">
          <div className="manifesto-title"><span>01 / POSIÇÃO</span><h2>Provocação<br />com lastro.</h2></div>
          <p>Este dossiê cruza controvérsias, decisões judiciais, alianças e indicadores. Ironia é bem-vinda; atalho factual, não. Investigação não é condenação. Anulação não é absolvição de mérito. Um número sem período e método é só decoração.</p>
          <div className="manifesto-stamp"><span>LEIA</span><strong>AS<br />FONTES</strong><i>↘</i></div>
        </section>

        <section className="archive-section" id="dossie" aria-labelledby="archive-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> ÍNDICE DE CONTROVÉRSIAS</p>
              <h2 id="archive-title">A versão<br /><span>dos registros.</span></h2>
            </div>
            <div className="section-aside"><span className="section-count">08 <i>FICHAS</i></span><p>Abra uma ficha para ver o resumo factual, o status jurídico e as fontes.</p></div>
          </div>

          <div className="archive-layout">
            <aside className="filters" aria-label="Filtros do arquivo">
              <div className="filter-heading"><span>00 / FILTRAR</span><span aria-hidden="true">⌄</span></div>
              <button className={`filter-button ${activeCategory === 'todas' ? 'selected' : ''}`} onClick={() => setActiveCategory('todas')} aria-pressed={activeCategory === 'todas'}>
                <span>Visão geral</span><span className="filter-count">08</span>
              </button>
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  className={`filter-button ${activeCategory === category.id ? 'selected' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                >
                  <span><i>{String(index + 1).padStart(2, '0')}</i> {category.label}</span>
                  <span className="filter-count">{cases.filter((record) => record.category === category.id).length.toString().padStart(2, '0')}</span>
                </button>
              ))}
              <a className="filter-method" href="#fontes">SOBRE AS FONTES <ExternalArrow /></a>
            </aside>

            <div className="archive-content">
              <div className="archive-tools">
                <label className="search-box">
                  <SearchIcon />
                  <span className="sr-only">Pesquisar no arquivo</span>
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nome, caso ou assunto" type="search" />
                  <span className="search-hint">⌕</span>
                </label>
                <span className="result-count" aria-live="polite">{visibleCases.length.toString().padStart(2, '0')} <i>RESULTADOS</i></span>
              </div>

              {visibleCases.length > 0 ? (
                <div className="case-grid">
                  {visibleCases.map((record, index) => {
                    const category = categories.find((item) => item.id === record.category);
                    return (
                      <article className="case-card" key={record.id} style={{ animationDelay: `${Math.min(index, 5) * 50}ms` }}>
                        <button className="case-open" onClick={() => setSelectedCase(record)} aria-label={`Abrir ficha ${record.number}: ${record.title}`}>
                          <div className="case-card-top"><span className="case-number">{record.number}<i>/08</i></span><span className="case-date">{record.date}</span></div>
                          <div className="case-card-body">
                            <span className="category-tag">{category?.label}</span>
                            <h3>{record.title}</h3>
                            <p>{record.summary}</p>
                          </div>
                          <div className="case-card-bottom"><span>{record.evidenceClassification}</span><span className="card-evidence">{record.sources.length.toString().padStart(2, '0')} FONTES</span><span className="card-arrow" aria-hidden="true">↗</span></div>
                        </button>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state"><span>SEM RESULTADOS</span><h3>Essa busca não encontrou fichas.</h3><p>Tente outro termo ou limpe os filtros.</p><button onClick={() => { setQuery(''); setActiveCategory('todas'); }}>LIMPAR FILTROS ↺</button></div>
              )}
              <div className="list-footer"><span>FIM DO RECORTE ATUAL</span><span>AS FICHAS PODEM SER ATUALIZADAS COM NOVOS REGISTROS</span></div>
            </div>
          </div>
        </section>

        <section className="source-band" id="fontes" aria-labelledby="source-title">
          <div className="source-band-mark">↘</div>
          <div className="source-band-copy"><p className="eyebrow"><span className="eyebrow-line" /> CADEIA DE VERIFICAÇÃO</p><h2 id="source-title">A fonte também<br /><span>faz parte da história.</span></h2><p>Decisões, estatísticas oficiais e reportagens de referência aparecem linkadas dentro de cada ficha. Consulte o documento original, confira a data e faça sua própria leitura.</p></div>
          <div className="source-logos" aria-label="Instituições consultadas"><span>STF</span><span>MPF</span><span>IBGE</span><span>BCB</span><span>TCU</span></div>
        </section>

        <section className="corrections" aria-labelledby="corrections-title">
          <div className="corrections-index">09 <span>—</span> CORREÇÕES</div>
          <div><h2 id="corrections-title">Achou um erro?<br /><span>O registro pode mudar.</span></h2><p>Correções e atualizações precisam de evidência verificável. Envie a ficha, a passagem e a fonte que fundamenta o ajuste.</p></div>
          <a className="button button-outline" href="mailto:?subject=Corre%C3%A7%C3%A3o%20ou%20atualiza%C3%A7%C3%A3o%20%E2%80%94%20Dossi%C3%AA%20Lula&body=Ficha%3A%0A%0APassagem%20a%20corrigir%3A%0A%0AFonte%20e%20link%3A%0A">SUGERIR CORREÇÃO <ExternalArrow /></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand brand-footer" href="#inicio"><span className="brand-mark" aria-hidden="true">D<span>.</span></span><span className="brand-name">DOSSIÊ<br />LULA</span></a>
        <span className="footer-note">ARQUIVO POLÍTICO INDEPENDENTE<br />CONTEÚDO EDITORIAL · FONTES EM CADA FICHA</span>
        <a className="back-top" href="#inicio">VOLTAR AO TOPO ↑</a>
        <span className="footer-year">© 2026</span>
      </footer>

      <dialog className="case-dialog" ref={dialogRef} onClose={closeDialog} onClick={(event) => { if (event.target === dialogRef.current) closeDialog(); }} aria-labelledby="dialog-title">
        {selectedCase && (
          <div className="dialog-inner">
            <div className="dialog-top"><span>FICHA {selectedCase.number} / 08 <i>·</i> {activeRecordCategory?.label}</span><button className="dialog-close" onClick={closeDialog} aria-label="Fechar ficha">FECHAR <b>×</b></button></div>
            <div className="dialog-heading"><p className="eyebrow">{selectedCase.date} <span>·</span> ARQUIVO DOCUMENTADO</p><h2 id="dialog-title">{selectedCase.title}</h2><p className="dialog-summary">{selectedCase.summary}</p></div>
            <div className="dialog-columns">
              <div className="dialog-main"><h3>O que os registros mostram</h3><p>{selectedCase.description}</p><div className="editorial-note"><span>NOTA EDITORIAL</span><p>{selectedCase.editorialNotes}</p></div></div>
              <aside className="status-panel"><span className="status-label">CLASSIFICAÇÃO DA EVIDÊNCIA</span><p>{selectedCase.evidenceClassification}</p><span className="status-label">SITUAÇÃO JURÍDICA / ADMINISTRATIVA</span><p>{selectedCase.legalStatus}</p><span className="status-label">ÚLTIMA VERIFICAÇÃO</span><p>{selectedCase.lastVerified}</p></aside>
            </div>
            <div className="dialog-sources"><div className="source-list-heading"><h3>Fontes desta ficha</h3><span>{selectedCase.sources.length.toString().padStart(2, '0')} REGISTROS</span></div><ol>
              {selectedCase.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer"><span className="source-type">{source.kind}</span><strong>{source.title}</strong><span className="source-meta">{source.publisher} <i>·</i> {source.date}</span><ExternalArrow /></a></li>
              ))}
            </ol></div>
            <div className="dialog-footnote"><span>LEIA A DOCUMENTAÇÃO ORIGINAL.</span><span>LINKS EXTERNOS ABREM EM NOVA ABA.</span></div>
          </div>
        )}
      </dialog>
    </>
  );
}

export default App;
