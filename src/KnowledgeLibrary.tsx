import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CircleAlert, Search, X } from 'lucide-react'
import knowledge from './knowledge.json'

const collections = [
 { id: 'facts', label: 'Dog facts', entries: knowledge.facts, description: 'The original 120 fact entries, with misleading claims corrected and reference links added.' },
 { id: 'good-foods', label: 'Good foods', entries: knowledge.goodFoods, description: 'The original good-food list, with preparation notes. Items that need caution or should be avoided are clearly marked.' },
 { id: 'bad-foods', label: 'Bad foods', entries: knowledge.badFoods, description: 'The original bad-food list, now distinguishing toxic foods, choking hazards, and foods whose safety depends on preparation.' },
] as const
const PAGE_SIZE = 12
const normalize = (value: string) => value.toLowerCase().replace(/[\s-]+/g, '')
const statusClass = (status: string) => status === 'Toxic' || status === 'Avoid' || status === 'Choking / obstruction' ? 'danger' : status === 'Occasional treat' ? 'positive' : 'caution'
const collectionFromHash = () => {
 const index = collections.findIndex(item => `#${item.id}` === window.location.hash)
 return index < 0 ? 0 : index
}

export default function KnowledgeLibrary() {
 const [active, setActive] = useState(collectionFromHash)
 const [query, setQuery] = useState('')
 const [status, setStatus] = useState('All guidance')
 const [page, setPage] = useState(0)
 const heading = useRef<HTMLHeadingElement>(null)
 useEffect(() => {
  const onHashChange = () => {
   const index = collections.findIndex(item => `#${item.id}` === window.location.hash)
   if (index >= 0) { setActive(index); setPage(0); setStatus('All guidance') }
  }
  window.addEventListener('hashchange', onHashChange)
  return () => window.removeEventListener('hashchange', onHashChange)
 }, [])
 const collection = collections[active]
 const entries = collection.entries.filter(entry => {
  const text = 'text' in entry ? `${entry.text} ${entry.topic}` : `${entry.name} ${entry.note} ${entry.status}`
  return normalize(text).includes(normalize(query)) && (status === 'All guidance' || ('status' in entry && entry.status === status))
 })
 const pages = Math.ceil(entries.length / PAGE_SIZE)
 const visible = entries.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
 const choose = (index: number) => { setActive(index); setPage(0); setStatus('All guidance') }
 const changePage = (next: number) => {
  setPage(next)
  heading.current?.focus({ preventScroll: true })
  heading.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
 }
 return <section className="shell section knowledge-library" id="knowledge" aria-labelledby="knowledge-title">
  {collections.map(item => <span className="knowledge-anchor" id={item.id} key={item.id} />)}
  <div className="section-heading"><div><div className="eyebrow">THE ORIGINAL GUIDE, REDISCOVERED</div><h2 id="knowledge-title">More to know. <em>More ways to care.</em></h2><p>Explore the facts and food lists that started Dog Guide.</p></div><BookOpen size={25} /></div>
  <div className="library-tabs" role="tablist" aria-label="Facts and food guides">
   {collections.map((item, index) => <a href={`#${item.id}`} role="tab" id={`tab-${item.id}`} key={item.id} aria-selected={active === index} aria-controls="knowledge-panel" tabIndex={active === index ? 0 : -1} className={active === index ? 'selected' : ''} onClick={() => choose(index)} onKeyDown={event => {
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
     event.preventDefault()
     const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (active + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3
     choose(next)
     document.getElementById(`tab-${collections[next].id}`)?.focus()
     window.history.replaceState(null, '', `#${collections[next].id}`)
    }
   }}>{item.label}<span>{item.entries.length}</span></a>)}
  </div>
  <div id="knowledge-panel" role="tabpanel" aria-labelledby={`tab-${collection.id}`}>
   <div className="library-intro"><h3 ref={heading} tabIndex={-1}>{collection.label}</h3><p>{collection.description}</p></div>
   {active > 0 && <aside className={`food-advice ${active === 2 ? 'food-alert' : ''}`}><CircleAlert size={20} /><div><strong>{active === 1 ? 'Preparation and portions matter.' : 'Suspect a poisoning? Contact a veterinarian promptly.'}</strong><p>{active === 1 ? 'These are occasional extras, not a complete diet. Keep treats within 10% of daily calories, serve plain, remove bones and pits, and check for xylitol. Follow your vet’s advice for allergies or prescribed diets.' : 'Do not wait for symptoms or induce vomiting unless a veterinarian instructs you. Keep the packaging and note the food, estimated amount, and time eaten. A “caution” label does not mean a food is poisonous in every form.'}</p><a href={active === 1 ? 'https://healthtopics.vetmed.ucdavis.edu/health-topics/canine/treat-guidelines-dogs' : 'https://www.fda.gov/animal-veterinary/animal-health-literacy/potentially-dangerous-items-your-pet'} target="_blank" rel="noreferrer">{active === 1 ? 'UC Davis treat guidelines' : 'FDA pet hazard guidance'} <ArrowUpRight size={13} /></a></div></aside>}
   <div className="explorer library-search"><div className="search-wrap"><Search size={20} /><input aria-label="Search facts and foods" placeholder="Search facts, foods, or preparation notes…" value={query} onChange={event => { setQuery(event.target.value); setPage(0) }} />{query && <button aria-label="Clear facts and foods search" onClick={() => { setQuery(''); setPage(0) }}><X size={16} /></button>}</div>{active > 0 && <div className="filters"><select aria-label="Filter food guidance" value={status} onChange={event => { setStatus(event.target.value); setPage(0) }}><option>All guidance</option>{[...new Set(collection.entries.flatMap(entry => 'status' in entry ? [entry.status] : []))].map(value => <option key={value}>{value}</option>)}</select></div>}</div>
   <p className="library-results" role="status">{entries.length ? `Showing ${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, entries.length)} of ${entries.length} entries` : 'No matching entries'}{query && ` for “${query}”`}</p>
   <div className="knowledge-grid">{visible.map(entry => <article className="knowledge-card" key={entry.id}><div className="knowledge-card-top"><span className="entry-number">#{entry.id.split('-')[1].padStart(3, '0')}</span>{'text' in entry ? <span className="guidance-badge neutral">{entry.topic}</span> : <span className={`guidance-badge ${statusClass(entry.status)}`}>{entry.status}</span>}</div>{'text' in entry ? <p className="fact-copy">{entry.text}</p> : <><h4>{entry.name}</h4><p>{entry.note}</p></>}<a href={entry.source} target="_blank" rel="noreferrer">Read more <ArrowUpRight size={13} /></a></article>)}</div>
   {!entries.length && <div className="empty"><Search size={28} /><h3>No matching entries.</h3><p>Try another word, another collection, or clear the search.</p><button className="button primary" onClick={() => { setQuery(''); setStatus('All guidance'); setPage(0) }}>Reset search</button></div>}
   {pages > 1 && <nav className="library-pagination" aria-label={`${collection.label} pages`}><button disabled={page === 0} onClick={() => changePage(page - 1)}><ArrowLeft size={16} /> Previous</button><span>Page {page + 1} of {pages}</span><button disabled={page + 1 >= pages} onClick={() => changePage(page + 1)}>Next <ArrowRight size={16} /></button></nav>}
   <p className="library-note">Restored from Charles Pura’s original Dog Guide. Original order and entries are retained, including repeated topics; counts reflect the actual lists. Health and food notes are general education, not individual veterinary advice.</p>
  </div>
 </section>
}
