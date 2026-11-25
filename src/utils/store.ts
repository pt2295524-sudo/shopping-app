export const imageUrl = (id: string, width = 720) => {
  if (id.startsWith('pexels:')) {
    const photoId = id.slice('pexels:'.length)
    return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
  }
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
}

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

export const categorySlug = (category: string) =>
  category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const categoryPath = (category: string) =>
  category === 'All categories' ? '/' : `/category/${categorySlug(category)}`

export function scrollCarousel(button: HTMLButtonElement, direction: number) {
  const section = button.closest('.deals-section, .category-section, .quick-category-section')
  const track = section?.querySelector<HTMLElement>('.product-track')
  if (!track) return
  const card = track.querySelector<HTMLElement>('.deal-card, .product-card, .quick-category-card')
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
  track.scrollBy({ left: direction * ((card?.offsetWidth ?? track.clientWidth * 0.8) + gap), behavior: 'smooth' })
}