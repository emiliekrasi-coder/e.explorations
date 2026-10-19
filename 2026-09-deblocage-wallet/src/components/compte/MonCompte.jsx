import './MonCompte.css'
import TabBar from '../shared/TabBar'
import Navbar from '../shared/Navbar'

const IMG_CHEVRON         = './assets/compte/chevron.svg'
const IMG_WALLET_ORNAMENT = './assets/compte/wallet-ornament.svg'
const IMG_ANNONCES        = './assets/compte/annonces.svg'
const IMG_TRANSACTIONS    = './assets/compte/transactions.svg'
const IMG_IMMO            = './assets/compte/immo.svg'
const IMG_EMPLOI          = './assets/compte/emploi.svg'
const IMG_VACANCES        = './assets/compte/vacances.svg'
const IMG_INFOS_PERSO     = './assets/compte/infos-perso.svg'
const IMG_PARAMETRES      = './assets/compte/parametres.svg'
const IMG_NOUVEAUTES      = './assets/compte/nouveautes.svg'

const PROJETS = [
  { id: 'immo',     icon: IMG_IMMO,    label: 'Immobilier', sub: 'Créer et gérer mon dossier locataire' },
  { id: 'emploi',   icon: IMG_EMPLOI,  label: 'Emploi',     sub: 'Gérer mes candidatures et mes alertes' },
  { id: 'vacances', icon: IMG_VACANCES,label: 'Vacances',   sub: 'Louer un logement de vacances' },
]

const SETTINGS = [
  { id: 'infos',      icon: IMG_INFOS_PERSO, label: 'Mes informations personnelles' },
  { id: 'parametres', icon: IMG_PARAMETRES,  label: 'Mes paramètres' },
  { id: 'nouveautes', icon: IMG_NOUVEAUTES,  label: 'Nouveautés' },
]

function StarRating({ value = 3.5, max = 5 }) {
  return (
    <span className="star-rating" aria-label={`${value} sur ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= Math.floor(value)
        const half   = !filled && i < value
        return (
          <span key={i} className={`star${filled ? ' star--full' : half ? ' star--half' : ' star--empty'}`}>
            ★
          </span>
        )
      })}
    </span>
  )
}

export default function MonCompte({ onTabChange, onBack, onWallet, balance = 0 }) {
  return (
    <div className="compte-page">

      <Navbar title="Mon compte" showBack onBack={onBack} />

      {/* Contenu scrollable */}
      <div className="compte-content">

        {/* Card profil utilisateur */}
        <button className="compte-profile-card">
          <div className="compte-profile-avatar">
            <span className="compte-profile-avatar__letter">G</span>
            <span className="compte-profile-avatar__status" aria-label="En ligne" />
          </div>
          <div className="compte-profile-info">
            <p className="compte-profile-name">Username</p>
            <div className="compte-profile-rating">
              <StarRating value={3.5} />
              <span className="compte-profile-rating__count">(9)</span>
            </div>
          </div>
          <img src={IMG_CHEVRON} width="16" height="16" alt="" aria-hidden="true" className="compte-chevron" />
        </button>

        {/* Wallet card */}
        <button className="compte-wallet-card" onClick={onWallet}>
          <div className="compte-wallet-card__ornament" aria-hidden="true">
            <img src={IMG_WALLET_ORNAMENT} alt="" />
          </div>
          <div className="compte-wallet-card__text">
            <p className="compte-wallet-card__title">Porte-monnaie</p>
            <div className="compte-wallet-card__amounts">
              <p className="compte-wallet-card__amount">{(balance / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
              <p className="compte-wallet-card__sub">Solde disponible</p>
            </div>
          </div>
          <img src={IMG_CHEVRON} width="16" height="16" alt="" aria-hidden="true" className="compte-chevron" />
        </button>

        {/* Mes activités */}
        <section className="compte-section">
          <p className="compte-section__label">Mes activités</p>
          <div className="compte-activities">
            <button className="compte-activity-card">
              <img src={IMG_ANNONCES} width="24" height="24" alt="" aria-hidden="true" />
              <div className="compte-activity-card__row">
                <span className="compte-activity-card__name">Annonces</span>
              </div>
            </button>
            <button className="compte-activity-card">
              <img src={IMG_TRANSACTIONS} width="24" height="24" alt="" aria-hidden="true" />
              <div className="compte-activity-card__row">
                <span className="compte-activity-card__name">Transactions</span>
              </div>
            </button>
          </div>
        </section>

        {/* Mes projets */}
        <section className="compte-section">
          <p className="compte-section__label">Mes projets</p>
          <div className="compte-list">
            {PROJETS.map(({ id, icon, label, sub, badge }) => (
              <button key={id} className="compte-list-row">
                <img src={icon} width="24" height="24" alt="" aria-hidden="true" className="compte-list-row__icon" />
                <div className="compte-list-row__text">
                  <div className="compte-list-row__title">
                    <span>{label}</span>
                    {badge && <span className="compte-badge">{badge}</span>}
                  </div>
                  {sub && <p className="compte-list-row__sub">{sub}</p>}
                </div>
                <img src={IMG_CHEVRON} width="16" height="16" alt="" aria-hidden="true" className="compte-chevron" />
              </button>
            ))}
          </div>
        </section>

        {/* Mon compte */}
        <section className="compte-section">
          <p className="compte-section__label">Mon compte</p>
          <div className="compte-list">
            {SETTINGS.map(({ id, icon, label }) => (
              <button key={id} className="compte-list-row">
                <img src={icon} width="24" height="24" alt="" aria-hidden="true" className="compte-list-row__icon" />
                <div className="compte-list-row__text compte-list-row__text--center">
                  <p className="compte-list-row__title">{label}</p>
                </div>
                <img src={IMG_CHEVRON} width="16" height="16" alt="" aria-hidden="true" className="compte-chevron" />
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="compte-actions">
          <button className="compte-btn compte-btn--tinted">Obtenir de l'aide ?</button>
          <button className="compte-btn compte-btn--outlined">Me déconnecter</button>
        </div>

        <p className="compte-version">Version 101.47.0 - l</p>

      </div>

      <TabBar active="compte" onChange={onTabChange} />
    </div>
  )
}
