import './Home.css'
import TabBar from '../shared/TabBar'
import { products } from '../../data/products'

const IMG_LOGO    = './assets/home/logo.svg'
const IMG_SEARCH  = './assets/home/search.svg'
const IMG_CAMERA  = './assets/home/camera.svg'
const IMG_MICRO   = './assets/home/micro.svg'
const IMG_HEART   = './assets/home/heart.svg'
const IMG_CHEVRON = './assets/home/chevron.svg'
const IMG_PUB     = './assets/home/pub.png'

const CATEGORIES = [
  { id: 'immo',      label: 'Immobilier',        icon: './assets/home/cat-immo.svg' },
  { id: 'vehicules', label: 'Véhicules',          icon: './assets/home/cat-vehicules.svg' },
  { id: 'vacances',  label: 'Locations vacances', icon: './assets/home/cat-vacances.svg' },
  { id: 'emploi',    label: 'Emploi',             icon: './assets/home/cat-emploi.svg' },
  { id: 'autres',    label: 'Autres',             icon: './assets/home/cat-autres.svg' },
]

const CONTINUE_CARDS = products.slice(0, 5)
const RECO_CARDS     = products.slice(5)

function formatPrice(price) {
  if (price === null) return 'Gratuit'
  return price.toLocaleString('fr-FR') + ' €'
}

function formatBuyerPrice(price) {
  const fee = price < 50 ? 0.99 : price < 200 ? Math.round(price * 0.01 * 100) / 100 : Math.round(price * 0.005 * 100) / 100
  const total = price + fee
  return total.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
}

function ProductCard({ p }) {
  return (
    <button className="product-card">
      <div className="product-card__img-wrap">
        <img src={p.image} alt={p.title} className="product-card__img" loading="lazy" />
        <button className="product-card__fav" aria-label="Ajouter aux favoris" tabIndex={-1}>
          <img src={IMG_HEART} width="16" height="16" alt="" aria-hidden="true" />
        </button>
      </div>
      <div className="product-card__body">
        <p className="product-card__title">{p.title}</p>
        <span className="product-card__price">{formatPrice(p.price)}</span>
        {p.isPro && (
          <div className="product-card__fees-row">
            <span className="product-card__fees">{formatBuyerPrice(p.price)}</span>
            <span className="product-card__sep">·</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{flexShrink:0}}>
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="var(--color-support)" fillOpacity="0.8"/>
            </svg>
            <span className="product-card__inclus">Inclus</span>
          </div>
        )}
        {(p.isPro) && (
          <div className="product-card__tags">
            <span className="product-card__tag-pro">Pro</span>
            <span className="product-card__tag-delivery">Livraison dès 3,20 €</span>
          </div>
        )}
        <p className="product-card__meta-cat">{p.categoryLabel}</p>
        <p className="product-card__meta">{p.city}</p>
        <p className="product-card__meta">{p.publishedAt}</p>
      </div>
    </button>
  )
}

export default function Home({ onTabChange }) {
  return (
    <div className="home">

      {/* Header sticky : logo + search + catégories */}
      <div className="home-header-sticky">
        <div className="home-logo-bar">
          <img src={IMG_LOGO} alt="leboncoin" className="home-logo" />
          <div className="icon-btn" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor" fillOpacity="0.72"/>
            </svg>
          </div>
        </div>

        <div className="home-search">
          <button className="home-search__bar" aria-label="Rechercher sur leboncoin">
            <img src={IMG_SEARCH} width="16" height="16" alt="" aria-hidden="true" className="home-search__icon" />
            <span className="home-search__placeholder">Rechercher sur leboncoin</span>
            <div className="home-search__ai" aria-hidden="true">
              <img src={IMG_CAMERA} width="24" height="24" alt="" />
              <img src={IMG_MICRO}  width="24" height="24" alt="" />
            </div>
          </button>
        </div>

        <div className="home-categories" role="list" aria-label="Catégories">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="home-cat" role="listitem">
              <span className="home-cat__icon-wrap" aria-hidden="true">
                <img src={cat.icon} width="20" height="20" alt="" />
              </span>
              <span className="home-cat__label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Banner pub */}
      <div className="home-pub">
        <img src={IMG_PUB} alt="" className="home-pub__img" loading="lazy" />
      </div>

      {/* Section : Continuer mes achats (scroll horizontal) */}
      <section className="home-section">
        <div className="home-section__header">
          <h2 className="home-section__title">Continuer mes achats</h2>
          <div className="home-section__chevron" aria-hidden="true">
            <img src={IMG_CHEVRON} width="16" height="16" alt="" />
          </div>
        </div>
        <div className="home-scroll-row" role="list">
          {CONTINUE_CARDS.map(p => (
            <div key={p.id} className="product-card-scroll-wrap" role="listitem">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Section : On vous recommande (grille 2 colonnes) */}
      <section className="home-section">
        <div className="home-section__header">
          <h2 className="home-section__title">On vous recommande</h2>
        </div>
        <div className="reco-grid" role="list">
          {RECO_CARDS.map(p => (
            <div key={p.id} role="listitem">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </section>

      <TabBar active="recherche" onChange={onTabChange} />
    </div>
  )
}
