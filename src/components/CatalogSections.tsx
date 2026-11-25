import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Phone,
  Plus,
  Search,
  Star,
  Truck,
} from 'lucide-react'
import type { CategoryGroup, DealCollection, Product } from '../types/store'
import { formatPrice, imageUrl, scrollCarousel } from '../utils/store'

type DealsSectionProps = {
  collection: DealCollection
  collectionIndex: number
  onAddProduct: (product: Product) => void
  onSelectProduct: (product: Product) => void
}

export function DealsSection({ collection, collectionIndex, onAddProduct, onSelectProduct }: DealsSectionProps) {
  return (
    <section className={`deals-section deals-section-${collectionIndex}`} aria-labelledby={`deals-title-${collectionIndex}`}>
      <div className="deals-heading">
        <div>
          <p className="eyebrow">{collectionIndex === 0 ? 'Good finds, better prices' : 'Fresh picks, just dropped'}</p>
          <h2 id={`deals-title-${collectionIndex}`}>{collection.title}</h2>
        </div>
        <div className="carousel-controls" aria-label={`${collection.title} carousel controls`}>
          <button type="button" aria-label="Scroll deals left" onClick={(event) => scrollCarousel(event.currentTarget, -1)}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" aria-label="Scroll deals right" onClick={(event) => scrollCarousel(event.currentTarget, 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="carousel-shell deals-carousel">
        <div className="product-track deal-track">
          {collection.products.map((product) => {
            const discount = Math.round((1 - product.price / (product.originalPrice ?? product.price)) * 100)
            return (
              <article className="deal-card" key={product.id}>
                <div className={`deal-image ${product.tone}`}>
                  <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />
                  <span className="deal-badge">{product.originalPrice ? `${discount}% off` : product.label ?? 'Popular'}</span>
                  <button className="deal-view-button" type="button" onClick={() => onSelectProduct(product)}>
                    View details
                  </button>
                </div>
                <div className="deal-card-details">
                  <p>{product.category}</p>
                  <button className="deal-product-name" type="button" onClick={() => onSelectProduct(product)}>{product.name}</button>
                  <div className="deal-price">
                    <strong>{formatPrice(product.price)}</strong>
                    <del>{formatPrice(product.originalPrice ?? product.price)}</del>
                  </div>
                  <button type="button" onClick={() => onAddProduct(product)}>
                    Add to bag <Plus size={14} />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

type ShopSectionProps = {
  categories: string[]
  activeCategory: string
  showFavorites: boolean
  favorites: number[]
  visibleProducts: Product[]
  visibleCategoryGroups: CategoryGroup[]
  onCategoryChange: (category: string) => void
  onShowAll: () => void
  onToggleFavorite: (productId: number) => void
  onAddProduct: (product: Product) => void
  onSelectProduct: (product: Product) => void
}

const sampleRating = 4.5
const sampleReviewCount = 128

function ProductCard({
  product,
  index,
  favorites,
  onToggleFavorite,
  onAddProduct,
  onSelectProduct,
}: {
  product: Product
  index: number
  favorites: number[]
  onToggleFavorite: (productId: number) => void
  onAddProduct: (product: Product) => void
  onSelectProduct: (product: Product) => void
}) {
  const isFavorite = favorites.includes(product.id)

  return (
    <article className="product-card" style={{ '--card-index': index } as CSSProperties}>
      <div className={`product-image ${product.tone}`}>
        <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />
        {product.label && <span className="product-label">{product.label}</span>}
        <button className="product-view-button" type="button" onClick={() => onSelectProduct(product)}>
          View details
        </button>
        <button
          className={isFavorite ? 'favorite-button favorited' : 'favorite-button'}
          type="button"
          aria-label={`${isFavorite ? 'Remove' : 'Save'} ${product.name}`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-add" type="button" onClick={() => onAddProduct(product)}>
          <Plus size={16} /> Add to bag <span>{formatPrice(product.price)}</span>
        </button>
      </div>
      <div className="product-details">
        <div>
          <button className="product-name-button" type="button" onClick={() => onSelectProduct(product)}>{product.name}</button>
          <p>{product.category}</p>
          <span className="product-rating"><Star size={12} fill="currentColor" /> {sampleRating.toFixed(1)} <span>({sampleReviewCount} sample reviews)</span></span>
        </div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
    </article>
  )
}

export function ShopSection({
  categories,
  activeCategory,
  showFavorites,
  favorites,
  visibleProducts,
  visibleCategoryGroups,
  onCategoryChange,
  onShowAll,
  onToggleFavorite,
  onAddProduct,
  onSelectProduct,
}: ShopSectionProps) {
  return (
    <section className="shop-section" id="shop" aria-labelledby="shop-title">
      <div className="results-line" aria-live="polite">
        <span>{showFavorites ? 'Your saved pieces' : activeCategory === 'All categories' ? 'Explore all collections' : activeCategory}</span>
        <span>{visibleProducts.length} pieces</span>
      </div>

      {activeCategory !== 'All categories' || showFavorites ? (
        visibleProducts.length > 0 ? (
          <div className="product-grid product-listing-grid">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                onAddProduct={onAddProduct}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <span className="empty-mark"><Search size={21} /></span>
            <h3>Nothing here just yet.</h3>
            <p>Try another search or browse all of our categories.</p>
            <button type="button" className="text-link" onClick={onShowAll}>See all categories <ArrowRight size={15} /></button>
          </div>
        )
      ) : visibleCategoryGroups.length > 0 ? (
        <div className="category-sections">
          {visibleCategoryGroups.map(({ category, products }) => (
            <section className="category-section" key={category} aria-labelledby={`category-${categories.indexOf(category)}`}>
              <div className="category-section-heading">
                <div>
                  <p className="eyebrow">{products.length} {products.length === 1 ? 'pick' : 'picks'} to explore</p>
                  <h3 id={`category-${categories.indexOf(category)}`}>{category}</h3>
                </div>
                <div className="category-section-actions">
                  <button className="text-link" type="button" onClick={() => onCategoryChange(category)}>
                    View all <ArrowRight size={15} />
                  </button>
                  <div className="carousel-controls" aria-label={`${category} carousel controls`}>
                    <button type="button" aria-label={`Scroll ${category} left`} onClick={(event) => scrollCarousel(event.currentTarget, -1)}>
                      <ChevronLeft size={18} />
                    </button>
                    <button type="button" aria-label={`Scroll ${category} right`} onClick={(event) => scrollCarousel(event.currentTarget, 1)}>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="carousel-shell">
                <div className="product-track">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      favorites={favorites}
                      onToggleFavorite={onToggleFavorite}
                      onAddProduct={onAddProduct}
                      onSelectProduct={onSelectProduct}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <span className="empty-mark"><Search size={21} /></span>
          <h3>Nothing here just yet.</h3>
          <p>Try another search or browse all of our categories.</p>
          <button type="button" className="text-link" onClick={onShowAll}>See all categories <ArrowRight size={15} /></button>
        </div>
      )}
    </section>
  )
}

const promoSlides = [
  {
    eyebrow: 'THE EVERYDAY EDIT',
    title: 'Good style. Better finds.',
    description: 'Fresh looks for wherever the day takes you.',
    image: 'photo-1529139574466-a303027c1d8b',
    category: 'Fashion & Clothing',
  },
  {
    eyebrow: 'UPGRADE YOUR EVERYDAY',
    title: 'Small details, big difference.',
    description: 'Find the essentials that make life feel easier.',
    image: 'photo-1546435770-a3e426bf472b',
    category: 'Mobile Accessories',
  },
  {
    eyebrow: 'A LITTLE MORE COMFORT',
    title: 'Make room for feeling at home.',
    description: 'Thoughtful picks for the spaces you love.',
    image: 'photo-1618221195710-dd6b41faaea6',
    category: 'Home & Kitchen',
  },
]

type MarketplaceHomeProps = {
  categories: string[]
  products: Product[]
  favorites: number[]
  onCategoryChange: (category: string) => void
  onToggleFavorite: (productId: number) => void
  onAddProduct: (product: Product) => void
  onSelectProduct: (product: Product) => void
}

export function MarketplaceHome({
  categories,
  products,
  favorites,
  onCategoryChange,
  onToggleFavorite,
  onAddProduct,
  onSelectProduct,
}: MarketplaceHomeProps) {
  const promoTrack = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = promoTrack.current
    if (!track) return
    const interval = window.setInterval(() => {
      const slide = track.querySelector<HTMLElement>('.promo-slide')
      if (!slide) return
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
      const step = slide.offsetWidth + gap
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
      track.scrollBy({ left: atEnd ? -track.scrollLeft : step, behavior: 'smooth' })
    }, 5500)
    return () => window.clearInterval(interval)
  }, [])

  const categoryTiles = categories
    .filter((category) => category !== 'All categories')
    .map((category) => ({ category, product: products.find((product) => product.category === category) }))
    .filter((item): item is { category: string; product: Product } => Boolean(item.product))
  const featuredProducts = products.filter((product) => product.category === 'Fashion & Clothing').slice(0, 3)

  return (
    <section className="marketplace-home" aria-label="Featured shopping collections">
      <section className="marketplace-promo" aria-label="Featured offers">
        <div className="promo-track" ref={promoTrack}>
          {promoSlides.map((slide) => (
            <article
              className="promo-slide"
              key={slide.title}
              style={{ backgroundImage: `linear-gradient(90deg, rgba(17, 30, 24, .78), rgba(17, 30, 24, .08)), url(${imageUrl(slide.image, 1100)})` }}
            >
              <div className="promo-copy">
                <p>{slide.eyebrow}</p>
                <h1>{slide.title}</h1>
                <span>{slide.description}</span>
                <button type="button" onClick={() => onCategoryChange(slide.category)}>
                  Explore collection <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="promo-controls" aria-label="Featured offer controls">
          <button type="button" aria-label="Previous offer" onClick={() => {
            const track = promoTrack.current
            const slide = track?.querySelector<HTMLElement>('.promo-slide')
            if (track && slide) {
              const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
              track.scrollBy({ left: -(slide.offsetWidth + gap), behavior: 'smooth' })
            }
          }}><ChevronLeft size={18} /></button>
          <button type="button" aria-label="Next offer" onClick={() => {
            const track = promoTrack.current
            const slide = track?.querySelector<HTMLElement>('.promo-slide')
            if (track && slide) {
              const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
              const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
              track.scrollBy({ left: atEnd ? -track.scrollLeft : slide.offsetWidth + gap, behavior: 'smooth' })
            }
          }}><ChevronRight size={18} /></button>
        </div>
      </section>

      <section className="quick-category-section" aria-labelledby="quick-category-title">
        <div className="marketplace-section-heading">
          <h2 id="quick-category-title">Find your kind of everyday</h2>
          <div className="carousel-controls" aria-label="Category controls">
            <button type="button" aria-label="Scroll categories left" onClick={(event) => scrollCarousel(event.currentTarget, -1)}><ChevronLeft size={18} /></button>
            <button type="button" aria-label="Scroll categories right" onClick={(event) => scrollCarousel(event.currentTarget, 1)}><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="carousel-shell">
          <div className="product-track quick-category-track">
            {categoryTiles.map(({ category, product }) => (
              <button className="quick-category-card" type="button" key={category} onClick={() => onCategoryChange(category)}>
                <img src={imageUrl(product.image, 360)} alt="" loading="lazy" />
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="loved-ones-section" aria-labelledby="loved-ones-title">
        <div className="marketplace-section-heading">
          <div>
            <p className="eyebrow">THOUGHTFUL PICKS, EVERY DAY</p>
            <h2 id="loved-ones-title">Shop for loved ones!</h2>
          </div>
          <button className="text-link" type="button" onClick={() => onCategoryChange('Fashion & Clothing')}>
            Shop fashion <ArrowRight size={15} />
          </button>
        </div>
        <div className="loved-ones-grid">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              onAddProduct={onAddProduct}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </section>
  )
}

export function StoryBand() {
  return (
    <section className="story-band" id="story">
      <div className="story-photo">
        <img src={imageUrl('photo-1600210492486-724fe5c67fb0', 1100)} alt="A calm, sunlit living room arranged for everyday comfort" loading="lazy" />
      </div>
      <div className="story-copy">
        <p className="eyebrow">Tradition, made to live with</p>
        <h2>Rooted in craft.<br />Ready for <em>today.</em></h2>
        <p>Our edit takes cues from the colours, textures, and everyday rituals found in homes across India.</p>
        <Link className="text-link" to="/#shop">Explore the edit <ArrowRight size={15} /></Link>
        <span className="story-number">INDIA / 2026</span>
      </div>
    </section>
  )
}

export function StoreFooter({ freeShippingThreshold }: { freeShippingThreshold: number }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark footer-wordmark" to="/"><img src="/apnicart-mark.svg" alt="" />Apni<span>Cart</span></Link>
          <p>Rooted in India. Made for everyday living.</p>
          <span className="footer-hindi" lang="hi">अपना घर, अपनी पसंद</span>
        </div>
        <div className="footer-column footer-links">
          <h2>Explore</h2>
          <Link to="/">Shop all</Link>
          <Link to="/category/fashion-and-clothing">Fashion &amp; Clothing</Link>
          <Link to="/category/mobile-accessories">Mobile Accessories</Link>
          <Link to="/story">Our story</Link>
        </div>
        <div className="footer-column">
          <h2>Delivery</h2>
          <p className="footer-info"><MapPin size={16} /><span><strong>Location</strong>Online store, serving customers across India</span></p>
          <p className="footer-info"><Truck size={16} /><span><strong>Shipping</strong>Free on orders over {formatPrice(freeShippingThreshold)}</span></p>
          <p className="footer-small">Prices include applicable taxes.</p>
        </div>
        <div className="footer-column">
          <h2>Get in touch</h2>
          <p className="footer-info"><Phone size={16} /><span><strong>Phone</strong>Add your customer care number</span></p>
          <p className="footer-small footer-placeholder">Business city/address: add your location</p>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© 2026 ApniCart. All rights reserved.</small>
        <span>Thoughtfully chosen, made to be lived with.</span>
        <Link to="/">Back to top ↑</Link>
      </div>
    </footer>
  )
}