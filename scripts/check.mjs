import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { Window } from 'happy-dom'
import { createServer } from 'vite'

const window = new Window({ url: 'http://localhost/' })
for (const key of ['window', 'document', 'HTMLElement', 'HTMLInputElement', 'HTMLDialogElement', 'Event', 'MouseEvent', 'localStorage']) globalThis[key] = key === 'window' ? window : window[key]
globalThis.IS_REACT_ACT_ENVIRONMENT = true
window.HTMLElement.prototype.scrollIntoView = function () {}
// Happy DOM does not implement the browser's native modal top layer.
window.HTMLDialogElement.prototype.showModal = function () { this.open = true }
window.HTMLDialogElement.prototype.close = function () { this.open = false }
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
try {
 const React = await import('react')
 const { createRoot } = await import('react-dom/client')
 const { default: App } = await server.ssrLoadModule('/src/App.tsx')
 const { breeds } = await server.ssrLoadModule('/src/data.ts')
 const { default: knowledge } = await server.ssrLoadModule('/src/knowledge.json')
 assert.equal(breeds.length, 20)
 assert.equal(new Set(breeds.map(b => b.slug)).size, 20)
 assert.deepEqual([knowledge.facts.length, knowledge.goodFoods.length, knowledge.badFoods.length], [120, 58, 62])
 for (const entry of [...knowledge.facts, ...knowledge.goodFoods, ...knowledge.badFoods]) {
  assert.ok(entry.id && entry.source, `Entry has an id and source: ${entry.id}`)
  if ('status' in entry) assert.ok(entry.note, `${entry.id} has food guidance`)
 }
 for (const b of breeds) {
  const bytes = readFileSync(`public/dogs/${b.slug}.jpg`)
  assert.ok(bytes.length > 1000, `${b.name}: photo is present`)
  assert.equal(bytes[0], 0xff, `${b.name}: valid JPEG signature`)
  assert.equal(bytes[1], 0xd8)
 }
 document.body.innerHTML = '<div id="root"></div>'
 const root = createRoot(document.getElementById('root'))
 const click = async selector => {
  const element = document.querySelector(selector)
  assert.ok(element, `Control exists: ${selector}`)
  await React.act(async () => element.click())
 }
 await React.act(async () => root.render(React.createElement(App)))
 assert.equal(document.querySelectorAll('.breed-card').length, 20)
 assert.equal(document.querySelectorAll('.knowledge-card').length, 12, 'Facts library paginates at 12 entries')
 assert.match(document.querySelector('.library-results').textContent, /of 120 entries/)
 await click('[role="tab"][href="#good-foods"]')
 assert.equal(document.querySelector('.library-intro h3').textContent, 'Good foods')
 await click('[role="tab"][href="#bad-foods"]')
 const foodSearch = document.querySelector('input[aria-label="Search facts and foods"]')
 await React.act(async () => {
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(foodSearch, 'xylitol')
  foodSearch.dispatchEvent(new window.Event('input', { bubbles: true }))
 })
 assert.ok(document.querySelectorAll('.knowledge-card').length > 0, 'Food search returns matching guidance')
 assert.ok([...document.querySelectorAll('.knowledge-card')].every(card => /xylitol/i.test(card.textContent)), 'Food search filters all visible entries')
 await click('[aria-label="Clear facts and foods search"]')
 const guidance = document.querySelector('select[aria-label="Filter food guidance"]')
 await React.act(async () => { guidance.value = 'Toxic'; guidance.dispatchEvent(new window.Event('change', { bubbles: true })) })
 assert.ok(document.querySelectorAll('.knowledge-card').length > 0, 'Food safety filter returns entries')
 assert.ok([...document.querySelectorAll('.knowledge-card .guidance-badge')].every(badge => badge.textContent === 'Toxic'), 'Food safety filter keeps only selected guidance')
 await React.act(async () => guidance.value = 'All guidance')
 await React.act(async () => guidance.dispatchEvent(new window.Event('change', { bubbles: true })))
 assert.match(document.querySelector('.library-results').textContent, /of 62 entries/)
 await click('.library-pagination button:last-child')
 assert.match(document.querySelector('.library-pagination span').textContent, /Page 2/)
 await click('[role="tab"][href="#facts"]')
 assert.match(document.querySelector('.library-results').textContent, /of 120 entries/)
 const search = document.querySelector('input[aria-label="Search breeds"]')
 await React.act(async () => {
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(search, 'shihtzu')
  search.dispatchEvent(new window.Event('input', { bubbles: true }))
 })
 assert.equal(document.querySelectorAll('.breed-card').length, 1, 'Search accepts shihtzu without spaces')
 assert.match(document.querySelector('.breed-card').textContent, /Shih Tzu/)
 await click('[aria-label="Clear search"]')
 await click('[aria-label="Save Shih Tzu"]')
 assert.deepEqual(JSON.parse(localStorage.getItem('dog-guide-saved')), ['shih-tzu'])
 await click('.tabs button:nth-child(2)')
 assert.equal(document.querySelectorAll('.breed-card').length, 1, 'Saved filter works')
 await click('[aria-label="Unsave Shih Tzu"]')
 assert.ok(document.querySelector('.empty'), 'Empty collection has a useful state')
 await click('.empty .button')
 const sizes = document.querySelector('select[aria-label="Filter by size"]')
 await React.act(async () => { sizes.value = 'Varies'; sizes.dispatchEvent(new window.Event('change', { bubbles: true })) })
 assert.equal(document.querySelectorAll('.breed-card').length, 1, 'Variable-size filter finds Aspin')
 await React.act(async () => { sizes.value = 'All sizes'; sizes.dispatchEvent(new window.Event('change', { bubbles: true })) })
 await click('[aria-label="Explore Aspin"]')
 assert.equal(document.querySelector('dialog').open, true)
 assert.match(document.querySelector('dialog').textContent, /Varies by individual/)
 assert.ok(document.querySelector('dialog a[href="https://paws.org.ph/paws-aspin-club/"]'))
 assert.match(document.querySelector('.photo-credit').textContent, /Ewen Roberts/)
 await click('[aria-label="Close profile"]')
 assert.equal(document.querySelector('dialog').open, false)
 const original = document.querySelector('.trivia-content h2').textContent
 await click('.trivia-next')
 assert.notEqual(document.querySelector('.trivia-content h2').textContent, original, 'Trivia rotates')
 await click('.article-card')
 assert.ok(document.querySelector('.article-detail'), 'Care articles open')
 await click('[aria-label="Close profile"]')
 await React.act(async () => root.unmount())
 localStorage.setItem('dog-guide-saved', '{}')
 const recovered = createRoot(document.getElementById('root'))
 await React.act(async () => recovered.render(React.createElement(App)))
 assert.equal(document.querySelectorAll('.breed-card').length, 20, 'Invalid stored data recovers')
 await React.act(async () => recovered.unmount())
 assert.ok(existsSync('.github/workflows/deploy.yml'))
 console.log('PASS: 20 photos, 240 sourced guide entries, collection tabs/search/filters/pagination, breed search, bookmarks, profiles, dialogs, trivia, care articles, and storage recovery.')
} finally {
 await server.close()
 await window.happyDOM.close()
}
