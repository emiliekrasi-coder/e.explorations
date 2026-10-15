import './TabBar.css'

function IconSearch({ filled }) {
  return filled
    ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M10.5 3a7.5 7.5 0 1 0 4.55 13.46l3.74 3.75a1 1 0 1 0 1.42-1.42l-3.75-3.74A7.5 7.5 0 0 0 10.5 3Z" fill="currentColor"/></svg>
    : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2"/><path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
}

function IconHeart({ filled }) {
  return filled
    ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.99 5.99 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>
    : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.99 5.99 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.8" fill="none"/></svg>
}

function IconPlus() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
}

function IconMessage({ filled }) {
  return filled
    ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/></svg>
    : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.8" fill="none"/></svg>
}

const TABS = [
  { id: 'recherche', label: 'Recherche', Icon: IconSearch },
  { id: 'favoris',   label: 'Favoris',   Icon: IconHeart },
  { id: 'publier',   label: 'Publier',   Icon: IconPlus },
  { id: 'messages',  label: 'Messages',  Icon: IconMessage },
]

function AvatarInitial({ letter = 'A' }) {
  return (
    <div className="tab-avatar" aria-hidden="true">
      <span className="tab-avatar__letter">{letter}</span>
    </div>
  )
}

export default function TabBar({ active = 'compte', onChange }) {
  return (
    <nav className="tab-bar" aria-label="Navigation principale">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            className={`tab-bar__item${isActive ? ' tab-bar__item--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange?.(id)}
          >
            <Icon filled={isActive} />
            <span>{label}</span>
          </button>
        )
      })}
      <button
        className={`tab-bar__item${active === 'compte' ? ' tab-bar__item--active' : ''}`}
        aria-current={active === 'compte' ? 'page' : undefined}
        onClick={() => onChange?.('compte')}
      >
        <AvatarInitial letter="A" />
        <span>Mon compte</span>
      </button>
    </nav>
  )
}
