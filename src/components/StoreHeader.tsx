import {
  Armchair,
  Baby,
  BookOpen,
  CarFront,
  ChevronRight,
  CookingPot,
  Dumbbell,
  Grid2X2,
  Headphones,
  Heart,
  Monitor,

  Plane,
  Search,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  type LucideIcon,
  MapPin,
  Menu,
  X,
} from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { categoryPath } from '../utils/store'

const categoryIcons: Record<string, LucideIcon> = {
  'All categories': Grid2X2,
  'Fashion & Clothing': Shirt,
  'Mobile Accessories': Smartphone,
  'Gaming & Computer Accessories': Monitor,
  'Home & Kitchen': CookingPot,
  'Stationery & Study Supplies': BookOpen,
  'Beauty & Personal Care': Sparkles,
  'Fitness & Sports': Dumbbell,
  'Lifestyle & Accessories': Headphones,
  'Toys & Games': Baby,
  'Baby Products': Baby,
  
  'Car & Bike Accessories': CarFront,
  'Grocery & Daily Essentials': ShoppingBasket,
  'Books & Educational Products': BookOpen,
  'Travel Accessories': Plane,
  'Handmade Products': Armchair,
}

type StoreHeaderProps = {
  categories: string[]
  activeCategory: string
  showFavorites: boolean
  favoritesCount: number
  cartCount: number
  searchQuery: string
  deliveryLocation: string
  mobileMenuOpen: boolean
  setSearchQuery: Dispatch<SetStateAction<string>>
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
  onSetDeliveryLocation: (location: string) => void
}

function categoryLabel(category: string) {
  if (category === 'All categories') return 'For You'
  return category
    .replace(' & Clothing', '').replace(' Accessories', '').replace(' & Personal Care', '')
    .replace(' & Daily Essentials', '').replace(' & Educational Products', '')
    .replace(' & Computer Accessories', '').replace(' & Bike Accessories', '')
    .replace(' & Games', '').replace(' & Sports', '').replace(' & Kitchen', '')
    .replace(' & Study Supplies', '').replace(' Products', '')
}

export function StoreHeader({
  categories,
  activeCategory,
  showFavorites,
  favoritesCount,
  cartCount,
  searchQuery,
  deliveryLocation,
  mobileMenuOpen,
  setSearchQuery,
  setMobileMenuOpen,
  onSetDeliveryLocation,
}: StoreHeaderProps) {
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="header-top">
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label="Toggle categories"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <Link className="wordmark" to="/" aria-label="ApniCart home">
          <img src="/apnicart-mark.svg" alt="" />Apni<span>Cart</span>
        </Link>
        <Link className="travel-link" to={categoryPath('Travel Accessories')}>
          <Plane size={19} /> Travel
        </Link>
        <div className="delivery-location">
          <MapPin size={16} fill="currentColor" />
          <span>{deliveryLocation}</span>
          <button type="button" onClick={() => {
            const location = window.prompt('Enter your delivery city or PIN code', deliveryLocation === 'Location not set' ? '' : deliveryLocation)
            if (location?.trim()) onSetDeliveryLocation(location.trim())
          }}>Select delivery location <ChevronRight size={15} /></button>
        </div>
      </div>
      <div className="search-row">
        <label className="header-search">
          <Search size={20} aria-hidden="true" />
          <input
            aria-label="Search products"
            placeholder="Search for Products, Brands and More"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>
        <div className="header-actions">
          <Link
            className={showFavorites ? 'header-action is-selected' : 'header-action'}
            to="/favorites"
            aria-label="Show saved items"
            aria-pressed={showFavorites}
          >
            <Heart size={19} fill={showFavorites ? 'currentColor' : 'none'} /> Saved
            {favoritesCount > 0 && <span className="action-count">{favoritesCount}</span>}
          </Link>
          <Link className="header-action bag-button" to="/cart" state={{ from: location.pathname }} aria-label={`Open bag, ${cartCount} items`}>
            <ShoppingBag size={20} /> Bag <span className="action-count">{cartCount}</span>
          </Link>
        </div>
      </div>
      <nav className={mobileMenuOpen ? 'category-nav is-open' : 'category-nav'} aria-label="Shop categories">
        {categories.map((category) => {
          const CategoryIcon = categoryIcons[category]
          return (
            <Link
              className={activeCategory === category ? 'category-tab active' : 'category-tab'}
              to={categoryPath(category)}
              key={category}
              aria-current={activeCategory === category ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              <CategoryIcon size={23} strokeWidth={1.7} />
              <span>{categoryLabel(category)}</span>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}