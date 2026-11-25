import { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { StoreFooter, StoryBand, DealsSection, ShopSection } from './components/CatalogSections'
import { StoreHeader } from './components/StoreHeader'
import { CartDrawer, ProductDialog } from './components/ShoppingDialogs'
import type { CartLine, Product } from './types/store'
import { categoryPath, categorySlug } from './utils/store'
import './App.css'

const productHighlights: Record<string, string[]> = {
  'Fashion & Clothing': ['Comfortable for everyday wear', 'Easy-to-style design', 'Care instructions included'],
  'Mobile Accessories': ['Designed for everyday use', 'Compact and travel friendly', 'Simple plug-and-play setup'],
  'Gaming & Computer Accessories': ['Built for your desk setup', 'Comfortable for longer sessions', 'Easy-to-connect design'],
  'Home & Kitchen': ['Made for everyday routines', 'Practical, space-conscious design', 'Easy to clean and care for'],
  'Stationery & Study Supplies': ['Useful for school, work, and home', 'Easy to carry and organize', 'A practical everyday essential'],
  'Beauty & Personal Care': ['Easy addition to your daily routine', 'Compact and convenient to use', 'See packaging for ingredients and directions'],
  'Fitness & Sports': ['Suitable for home or gym routines', 'Easy to store between sessions', 'Designed for everyday training'],
  'Lifestyle & Accessories': ['A versatile everyday accessory', 'Easy to pair with your personal style', 'Suitable for gifting'],
  'Toys & Games': ['Made for playtime and family fun', 'Easy to store after use', 'Check age guidance on packaging'],
  'Baby Products': ['Designed for daily family routines', 'Soft, practical everyday use', 'Check care and age guidance before use'],
  'Car & Bike Accessories': ['Useful for everyday journeys', 'Designed for convenient use', 'Check fit and compatibility before purchase'],
  'Grocery & Daily Essentials': ['A useful everyday household pick', 'Convenient for regular use', 'Check package details and expiry information'],
  'Books & Educational Products': ['A thoughtful pick for learning', 'Suitable for home or school', 'Easy to carry and store'],
  'Travel Accessories': ['Made to help organize your journey', 'Compact and easy to pack', 'Useful for everyday travel'],
  'Handmade Products': ['A distinctive handcrafted character', 'Each piece may have slight variations', 'A thoughtful gift or keepsake'],
}

const baseProducts: Product[] = [
  {
    id: 1,
    name: 'Everyday Street Tee',
    category: 'Fashion & Clothing',
    price: 799,
    image: 'photo-1523381210434-271e8be1f52b',
    tone: 'peach',
    label: 'Bestseller',
  },
  {
    id: 2,
    name: 'Urban Denim Set',
    category: 'Fashion & Clothing',
    price: 2499,
    image: 'photo-1541099649105-f69ad21f3246',
    tone: 'blue',
    label: 'New',
  },
  {
    id: 3,
    name: 'Streetwear Hoodie',
    category: 'Fashion & Clothing',
    price: 1999,
    image: 'photo-1529139574466-a303027c1d8b',
    tone: 'sand',
  },
  {
    id: 4,
    name: 'Grip Cover Pro',
    category: 'Mobile Accessories',
    price: 699,
    originalPrice: 999,
    image: 'photo-1511707171634-5f897ff02aa9',
    tone: 'mint',
  },
  {
    id: 5,
    name: 'TurboCharge Cable',
    category: 'Mobile Accessories',
    price: 499,
    image: 'photo-1583863788434-e58a36330cf0',
    tone: 'rose',
  },
  {
    id: 6,
    name: 'SoundPulse Earbuds',
    category: 'Mobile Accessories',
    price: 1899,
    originalPrice: 2499,
    image: 'photo-1546435770-a3e426bf472b',
    tone: 'lilac',
    label: 'Top rated',
  },
  {
    id: 7,
    name: 'Apex RGB Keyboard',
    category: 'Gaming & Computer Accessories',
    price: 5499,
    originalPrice: 6999,
    image: 'photo-1511467687858-23d96c32e4ae',
    tone: 'blue',
    label: 'Pro pick',
  },
  {
    id: 8,
    name: 'Pulse Mouse + Pad',
    category: 'Gaming & Computer Accessories',
    price: 2999,
    originalPrice: 3999,
    image: 'photo-1498050108023-c5249f4df085',
    tone: 'green',
  },
  {
    id: 9,
    name: 'AirWave Headset',
    category: 'Gaming & Computer Accessories',
    price: 3499,
    image: 'photo-1546435770-a3e426bf472b',
    tone: 'yellow',
  },
  {
    id: 10,
    name: 'FlipBottle Pro',
    category: 'Home & Kitchen',
    price: 999,
    originalPrice: 1499,
    image: 'photo-1523362628745-0c100150b504',
    tone: 'mint',
  },
  {
    id: 11,
    name: 'NeatNest Organizers',
    category: 'Home & Kitchen',
    price: 1799,
    image: 'photo-1505693416388-ac5ce068fe85',
    tone: 'rose',
  },
  {
    id: 12,
    name: 'Soft Cotton Comfort Set',
    category: 'Home & Kitchen',
    price: 2499,
    image: 'photo-1505693416388-ac5ce068fe85',
    tone: 'sand',
    label: 'Cozy pick',
  },
  {
    id: 13,
    name: 'StudyPro Notebook Pack',
    category: 'Stationery & Study Supplies',
    price: 699,
    originalPrice: 999,
    image: 'photo-1455390582262-044cdead277a',
    tone: 'yellow',
  },
  {
    id: 14,
    name: 'Smart Backpack',
    category: 'Stationery & Study Supplies',
    price: 1799,
    image: 'photo-1553062407-98eeb64c6a62',
    tone: 'blue',
  },
  {
    id: 15,
    name: 'DeskMate Organizer',
    category: 'Stationery & Study Supplies',
    price: 1299,
    image: 'photo-1497366754035-f200968a6e72',
    tone: 'peach',
  },
  {
    id: 16,
    name: 'GlowSkin Essentials',
    category: 'Beauty & Personal Care',
    price: 1499,
    originalPrice: 1999,
    image: 'photo-1522335789203-aabd1fc54bc9',
    tone: 'rose',
  },
  {
    id: 17,
    name: 'SunShield SPF',
    category: 'Beauty & Personal Care',
    price: 899,
    image: 'photo-1556228578-8c89e6adf883',
    tone: 'mint',
  },
  {
    id: 18,
    name: 'CurlCare Kit',
    category: 'Beauty & Personal Care',
    price: 1299,
    image: 'photo-1524504388940-b1c1722653e1',
    tone: 'lilac',
  },
  {
    id: 19,
    name: 'FlexFit Yoga Mat',
    category: 'Fitness & Sports',
    price: 1499,
    originalPrice: 2199,
    image: 'photo-1517836357463-d25dfeac3438',
    tone: 'green',
  },
  {
    id: 20,
    name: 'PowerSkip Rope',
    category: 'Fitness & Sports',
    price: 599,
    image: 'photo-1517838277536-f5f99be501cd',
    tone: 'yellow',
  },
  {
    id: 21,
    name: 'CoreBand Set',
    category: 'Fitness & Sports',
    price: 999,
    image: 'photo-1571019614242-c5c5dee9f50b',
    tone: 'peach',
  },
  {
    id: 22,
    name: 'Indigo Watch',
    category: 'Lifestyle & Accessories',
    price: 3999,
    originalPrice: 5499,
    image: 'photo-1523170335258-f5ed11844a49',
    tone: 'blue',
  },
  {
    id: 23,
    name: 'Eclipse Shades',
    category: 'Lifestyle & Accessories',
    price: 1799,
    image: 'photo-1572635196237-14b3f281503f',
    tone: 'sand',
  },
  {
    id: 24,
    name: 'Pocket Charm Keychain',
    category: 'Lifestyle & Accessories',
    price: 599,
    image: 'photo-1584917865442-de89df76afd3',
    tone: 'rose',
  },
  {
    id: 25,
    name: 'Little Spark Toys',
    category: 'Toys & Games',
    price: 899,
    image: 'photo-1596462502278-27bfdc403348',
    tone: 'yellow',
  },
  {
    id: 26,
    name: 'CozyNest Baby Set',
    category: 'Baby Products',
    price: 2299,
    image: 'photo-1512436991641-6745cdb1723f',
    tone: 'lilac',
  },
  {
    id: 27,
    name: 'RideReady Accessories',
    category: 'Car & Bike Accessories',
    price: 2599,
    image: 'photo-1549399542-7e3f8b79c341',
    tone: 'blue',
  },
  {
    id: 28,
    name: 'Daily Basket Essentials',
    category: 'Grocery & Daily Essentials',
    price: 899,
    originalPrice: 1199,
    image: 'photo-1542838132-92c53300491e',
    tone: 'peach',
  },
  {
    id: 29,
    name: 'LearnNest Books',
    category: 'Books & Educational Products',
    price: 1099,
    image: 'photo-1512820790803-83ca734da794',
    tone: 'yellow',
  },
  {
    id: 30,
    name: 'VoyagePack Kit',
    category: 'Travel Accessories',
    price: 1899,
    image: 'photo-1527631746610-bca00a040d60',
    tone: 'blue',
  },
  {
    id: 31,
    name: 'Handloom Gift Set',
    category: 'Handmade Products',
    price: 2499,
    image: 'photo-1513364776144-60967b0f800f',
    tone: 'rose',
  },
]

type ProductSeed = [string, string, number, string, string, number?, string?]

const productAdditions: ProductSeed[] = [
  ['Cotton Overshirt', 'Fashion & Clothing', 1499, 'photo-1515886657613-9f3515b0c78f', 'blue', 1999, 'New'],
  ['Ribbed Knit Sweater', 'Fashion & Clothing', 1899, 'photo-1434389677669-e08b4cac3105', 'sand'],
  ['Weekend Layer Jacket', 'Fashion & Clothing', 2799, 'photo-1483985988355-763728e1935b', 'rose', 3499],
  ['Nova Smartphone', 'Mobile Accessories', 12999, 'photo-1592750475338-74b7b21085ab', 'blue', 15999, 'Hot deal'],
  ['Slim Case Max', 'Mobile Accessories', 899, 'photo-1592899677977-9c10ca588bbd', 'mint'],
  ['Studio Sound Headphones', 'Mobile Accessories', 2199, 'photo-1505740420928-5e560c06d30e', 'lilac', 2999],
  ['Mechanical Keyboard TKL', 'Gaming & Computer Accessories', 3999, 'photo-1587831990711-23ca6441447b', 'blue', 4999],
  ['Wireless Gamepad', 'Gaming & Computer Accessories', 2499, 'photo-1612287230202-1ff1d85d1bdf', 'green'],
  ['Creator Display Pro', 'Gaming & Computer Accessories', 12999, 'photo-1593642632823-8f785ba67e45', 'sand', 15999],
  ['Accent Lounge Chair', 'Home & Kitchen', 8999, 'photo-1555041469-a586c61ea9bc', 'green'],
  ['Warm Glow Table Lamp', 'Home & Kitchen', 2299, 'photo-1586023492125-27b2c045efd7', 'yellow', 2999],
  ['Modern Living Room Edit', 'Home & Kitchen', 6999, 'photo-1618221195710-dd6b41faaea6', 'sand', 8999],
  ['Linen Journal Set', 'Stationery & Study Supplies', 499, 'photo-1517842645767-c639042777db', 'rose'],
  ['Daily Notes Hardcover', 'Stationery & Study Supplies', 649, 'photo-1516979187457-637abb4f9353', 'yellow', 899],
  ['Oak Desk Organizer', 'Stationery & Study Supplies', 1099, 'photo-1452860606245-08befc0ff44b', 'peach'],
  ['Hydration Sheet Mask Kit', 'Beauty & Personal Care', 799, 'photo-1571781926291-c477ebfd024b', 'rose', 999],
  ['Daily Moisture Cream', 'Beauty & Personal Care', 1199, 'photo-1601049541289-9b1b7bbbfe19', 'mint'],
  ['Sun Care Essentials', 'Beauty & Personal Care', 999, 'photo-1608248543803-ba4f8c70ae0b', 'yellow', 1299],
  ['Flex Resistance Bands', 'Fitness & Sports', 699, 'photo-1579758629938-03607ccdbaba', 'lilac'],
  ['Core Training Kit', 'Fitness & Sports', 1599, 'photo-1518611012118-696072aa579a', 'green', 1999],
  ['Active Recovery Roller', 'Fitness & Sports', 999, 'photo-1579758629938-03607ccdbaba', 'blue'],
  ['Leather Crossbody Bag', 'Lifestyle & Accessories', 2499, 'photo-1584917865442-de89df76afd3', 'sand', 3299],
  ['Classic Steel Watch', 'Lifestyle & Accessories', 4999, 'photo-1523275335684-37898b6baf30', 'blue', 6499],
  ['Polarized Everyday Shades', 'Lifestyle & Accessories', 1599, 'photo-1572635196237-14b3f281503f', 'rose'],
  ['Rainbow Building Blocks', 'Toys & Games', 799, 'photo-1558060370-d644479cb6f7', 'yellow'],
  ['Soft Plush Friend', 'Toys & Games', 999, 'photo-1599623560574-39d485900c95', 'peach'],
  ['First Toy Car Set', 'Toys & Games', 699, 'photo-1596462502278-27bfdc403348', 'blue'],
  ['Family Puzzle Box', 'Toys & Games', 599, 'photo-1516627145497-ae6968895b74', 'lilac'],
  ['Wooden Shape Sorter', 'Toys & Games', 899, 'photo-1573865526739-10659fec78a5', 'green'],
  ['Soft Cotton Romper', 'Baby Products', 899, 'photo-1503919005314-30d93d07d823', 'mint'],
  ['Cloud Nine Swaddle Set', 'Baby Products', 1299, 'photo-1522771930-78848d9293e8', 'lilac'],
  ['Little Daywear Set', 'Baby Products', 1499, 'photo-1512436991641-6745cdb1723f', 'peach'],
  ['Nursery Comfort Blanket', 'Baby Products', 1199, 'photo-1522771930-78848d9293e8', 'yellow'],
  ['Newborn Gift Bundle', 'Baby Products', 1899, 'photo-1503919005314-30d93d07d823', 'rose'],
  ['Road Trip Organizer', 'Car & Bike Accessories', 1299, 'photo-1492144534655-ae79c964c9d7', 'blue'],
  ['Dashboard Care Kit', 'Car & Bike Accessories', 899, 'photo-1503376780353-7e6692767b70', 'sand'],
  ['City Ride Helmet', 'Car & Bike Accessories', 2299, 'photo-1558981403-c5f9899a28bc', 'yellow'],
  ['Commuter Bike Light', 'Car & Bike Accessories', 799, 'photo-1558981806-ec527fa84c39', 'rose'],
  ['DriveSafe Essentials', 'Car & Bike Accessories', 1599, 'photo-1492144534655-ae79c964c9d7', 'green'],
  ['Fresh Market Greens', 'Grocery & Daily Essentials', 299, 'photo-1542838132-92c53300491e', 'green'],
  ['Pantry Starter Box', 'Grocery & Daily Essentials', 699, 'photo-1540420773420-3366772f4999', 'yellow'],
  ['Wholesome Snack Mix', 'Grocery & Daily Essentials', 399, 'photo-1547592180-85f173990554', 'peach'],
  ['Organic Kitchen Picks', 'Grocery & Daily Essentials', 599, 'photo-1512621776951-a57141f2eefd', 'mint'],
  ['Everyday Spice Box', 'Grocery & Daily Essentials', 449, 'photo-1490645935967-10de6ba17061', 'rose'],
  ['The Weekend Reader', 'Books & Educational Products', 499, 'photo-1512820790803-83ca734da794', 'yellow'],
  ['Stories to Keep', 'Books & Educational Products', 699, 'photo-1544947950-fa07a98d237f', 'blue'],
  ['Illustrated Atlas', 'Books & Educational Products', 899, 'photo-1519682337058-a94d519337bc', 'peach'],
  ['Study Notes Collection', 'Books & Educational Products', 549, 'photo-1516979187457-637abb4f9353', 'lilac'],
  ['Little Library Set', 'Books & Educational Products', 1099, 'photo-1494438639946-1ebd1d20bf85', 'sand'],
  ['Cabin Ready Backpack', 'Travel Accessories', 2799, 'photo-1553062407-98eeb64c6a62', 'blue'],
  ['Weekend Packing Cubes', 'Travel Accessories', 999, 'photo-1565026057447-bc90a3dceb87', 'rose'],
  ['Trail Daypack', 'Travel Accessories', 2299, 'photo-1551632811-561732d1e306', 'green'],
  ['Lightweight Travel Tote', 'Travel Accessories', 1499, 'photo-1584917865442-de89df76afd3', 'peach'],
  ['Compact Travel Kit', 'Travel Accessories', 799, 'photo-1527631746610-bca00a040d60', 'yellow'],
  ['Paint & Make Craft Kit', 'Handmade Products', 1299, 'photo-1513364776144-60967b0f800f', 'rose'],
  ['Artisan Workshop Set', 'Handmade Products', 1799, 'photo-1452860606245-08befc0ff44b', 'blue'],
  ['Handwoven Home Accent', 'Handmade Products', 2499, 'photo-1586023492125-27b2c045efd7', 'sand'],
  ['Colorful Keepsake Prints', 'Handmade Products', 999, 'photo-1531058020387-3be344556be6', 'yellow'],
  ['Handcrafted Desk Edit', 'Handmade Products', 1999, 'photo-1618221195710-dd6b41faaea6', 'mint'],
]

const products: Product[] = [
  ...baseProducts,
  ...productAdditions.map(([name, category, price, image, tone, originalPrice, label], index) => ({
    id: baseProducts.length + index + 1,
    name,
    category,
    price,
    image,
    tone,
    ...(originalPrice ? { originalPrice } : {}),
    ...(label ? { label } : {}),
  })),
]

const categories = [
  'All categories',
  'Fashion & Clothing',
  'Mobile Accessories',
  'Gaming & Computer Accessories',
  'Home & Kitchen',
  'Stationery & Study Supplies',
  'Beauty & Personal Care',
  'Fitness & Sports',
  'Lifestyle & Accessories',
  'Toys & Games',
  'Baby Products',
  'Car & Bike Accessories',
  'Grocery & Daily Essentials',
  'Books & Educational Products',
  'Travel Accessories',
  'Handmade Products',
]
const freeShippingThreshold = 4999
const indianStatesAndTerritories = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]
function readCart(): CartLine[] {
  try {
    const savedCart =
      localStorage.getItem('apnicart-cart') ?? localStorage.getItem('morrow-cart')
    if (!savedCart) return []

    const savedLines = JSON.parse(savedCart) as CartLine[]
    return savedLines.filter((line) =>
      products.some((product) => product.id === line.productId)
    )
  } catch {
    return []
  }
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const categorySegment = location.pathname.match(/^\/category\/([^/]+)$/)?.[1]
  const activeCategory = categories.find((category) => categorySlug(category) === categorySegment) ?? 'All categories'
  const showFavorites = location.pathname === '/favorites'
  const cartOpen = location.pathname === '/cart'
  const productId = Number(location.pathname.match(/^\/product\/(\d+)$/)?.[1])
  const selectedProduct = products.find((product) => product.id === productId) ?? null
  const returnPath = (location.state as { from?: string } | null)?.from ?? '/'
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<CartLine[]>(readCart)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [notice, setNotice] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [deliveryLocation, setDeliveryLocation] = useState('Location not set')

  useEffect(() => {
    localStorage.setItem('apnicart-cart', JSON.stringify(cart))
    localStorage.removeItem('morrow-cart')
  }, [cart])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timeout)
  }, [notice])

  useEffect(() => {
    if (!cartOpen && !selectedProduct) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') navigate(returnPath)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [cartOpen, navigate, returnPath, selectedProduct])

  const visibleProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All categories' || product.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery)
      const matchesFavorite = !showFavorites || favorites.includes(product.id)
      return matchesCategory && matchesQuery && matchesFavorite
    })

    return filtered
  }, [activeCategory, favorites, searchQuery, showFavorites])

  const visibleCategoryGroups = categories.slice(1)
    .map((category) => ({
      category,
      products: visibleProducts.filter((product) => product.category === category),
    }))
    .filter((group) => group.products.length > 0)
  const dealProducts = products.filter((product) => product.originalPrice)
  const dealCollections = [
    { title: 'Top deals for your everyday', products: dealProducts },
    { title: 'New deals every hour', products: products.slice(0, 24) },
  ]

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0)
  const cartSubtotal = cart.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId)
    return total + (product?.price ?? 0) * line.quantity
  }, 0)
  const cartProducts = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    return product ? [{ ...product, quantity: line.quantity }] : []
  })

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((line) => line.productId === product.id)
      return existing
        ? current.map((line) =>
            line.productId === product.id
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          )
        : [...current, { productId: product.id, quantity: 1 }]
    })
    setNotice(`${product.name} added to your bag`)
  }

  function changeQuantity(productId: number, change: number) {
    setCart((current) =>
      current
        .map((line) =>
          line.productId === productId
            ? { ...line, quantity: line.quantity + change }
            : line,
        )
        .filter((line) => line.quantity > 0),
    )
  }

  function toggleFavorite(productId: number) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const storefrontFrame = (
    <div className="storefront">
      <StoreHeader
        categories={categories}
        activeCategory={activeCategory}
        showFavorites={showFavorites}
        favoritesCount={favorites.length}
        cartCount={cartCount}
        searchQuery={searchQuery}
        deliveryLocation={deliveryLocation}
        mobileMenuOpen={mobileMenuOpen}
        setSearchQuery={setSearchQuery}
        setMobileMenuOpen={setMobileMenuOpen}
        onSetDeliveryLocation={setDeliveryLocation}
      />
      <main id="top"><Outlet /></main>
      <StoreFooter freeShippingThreshold={freeShippingThreshold} />
      {notice && <div className="toast" role="status"><Check size={17} />{notice}</div>}
    </div>
  )

  return (
    <Routes>
      <Route element={storefrontFrame}>
          <Route index element={(
            <>
              {dealCollections.map((collection, collectionIndex) => (
                <DealsSection
                  key={collection.title}
                  collection={collection}
                  collectionIndex={collectionIndex}
                  onAddProduct={addToCart}
                  onSelectProduct={(product) => navigate(`/product/${product.id}`, { state: { from: location.pathname } })}
                />
              ))}
              <ShopSection
                categories={categories}
                activeCategory="All categories"
                showFavorites={false}
                favorites={favorites}
                visibleProducts={visibleProducts}
                visibleCategoryGroups={visibleCategoryGroups}
                onCategoryChange={(category) => navigate(categoryPath(category))}
                onShowAll={() => { setSearchQuery(''); navigate('/') }}
                onToggleFavorite={toggleFavorite}
                onAddProduct={addToCart}
                onSelectProduct={(product) => navigate(`/product/${product.id}`, { state: { from: location.pathname } })}
              />
              <StoryBand />
            </>
          )} />
          <Route path="category/:categorySlug" element={(
            categories.includes(activeCategory) && activeCategory !== 'All categories' ? (
              <ShopSection
                categories={categories}
                activeCategory={activeCategory}
                showFavorites={false}
                favorites={favorites}
                visibleProducts={visibleProducts}
                visibleCategoryGroups={visibleCategoryGroups}
                onCategoryChange={(category) => navigate(categoryPath(category))}
                onShowAll={() => { setSearchQuery(''); navigate('/') }}
                onToggleFavorite={toggleFavorite}
                onAddProduct={addToCart}
                onSelectProduct={(product) => navigate(`/product/${product.id}`, { state: { from: location.pathname } })}
              />
            ) : <NotFoundPage onHome={() => navigate('/')} />
          )} />
          <Route path="favorites" element={(
            <ShopSection
              categories={categories}
              activeCategory="All categories"
              showFavorites
              favorites={favorites}
              visibleProducts={visibleProducts}
              visibleCategoryGroups={visibleCategoryGroups}
              onCategoryChange={(category) => navigate(categoryPath(category))}
              onShowAll={() => { setSearchQuery(''); navigate('/') }}
              onToggleFavorite={toggleFavorite}
              onAddProduct={addToCart}
              onSelectProduct={(product) => navigate(`/product/${product.id}`, { state: { from: location.pathname } })}
            />
          )} />
          <Route path="story" element={<StoryBand />} />
          <Route path="product/:productId" element={selectedProduct ? (
            <ProductDialog
              product={selectedProduct}
              productHighlights={productHighlights}
              freeShippingThreshold={freeShippingThreshold}
              onClose={() => navigate(returnPath)}
              onAddProduct={addToCart}
            />
          ) : <NotFoundPage onHome={() => navigate('/')} />} />
          <Route path="cart" element={(
            <CartDrawer
              open
              cartCount={cartCount}
              cartSubtotal={cartSubtotal}
              cartProducts={cartProducts}
              freeShippingThreshold={freeShippingThreshold}
              indianStatesAndTerritories={indianStatesAndTerritories}
              checkoutOpen={checkoutOpen}
              orderComplete={orderComplete}
              setCheckoutOpen={setCheckoutOpen}
              setOrderComplete={setOrderComplete}
              onClose={() => navigate(returnPath)}
              onChangeQuantity={changeQuantity}
              onRemoveProduct={(productId) => setCart((current) => current.filter((line) => line.productId !== productId))}
              onCompleteCheckout={() => setCart([])}
            />
          )} />
          <Route path="*" element={<NotFoundPage onHome={() => navigate('/')} />} />
      </Route>
    </Routes>
  )
}

function NotFoundPage({ onHome }: { onHome: () => void }) {
  return (
    <section className="empty-results">
      <h2>Page not found</h2>
      <p>That page isn't part of this collection.</p>
      <button className="text-link" type="button" onClick={onHome}>Back to ApniCart</button>
    </section>
  )
}

export default App
