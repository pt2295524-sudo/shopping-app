import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';

const categories = ['All', 'Fashion', 'Mobile', 'Gaming', 'Home', 'Stationery', 'Beauty', 'Fitness', 'Toys', 'Baby', 'Car & Bike', 'Grocery', 'Books', 'Travel', 'Handmade'];

const products = [
  { id: 1, name: 'Everyday Street Tee', category: 'Fashion', price: 799, original: 1099, rating: '4.8', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Classic Denim Jacket', category: 'Fashion', price: 1899, original: 2999, rating: '4.7', image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Minimal Everyday Sneakers', category: 'Fashion', price: 1299, original: 2499, rating: '4.6', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Premium Cotton Shirt', category: 'Fashion', price: 999, original: 1699, rating: '4.5', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Grip Cover Pro', category: 'Mobile', price: 699, original: 999, rating: '4.6', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Wireless Earbuds Lite', category: 'Mobile', price: 1499, original: 2999, rating: '4.7', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Fast Charge Power Bank', category: 'Mobile', price: 1199, original: 1999, rating: '4.8', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Smart Watch Series 5', category: 'Mobile', price: 2499, original: 4999, rating: '4.6', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'Apex RGB Keyboard', category: 'Gaming', price: 5499, original: 6999, rating: '4.9', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Precision Gaming Mouse', category: 'Gaming', price: 1299, original: 2499, rating: '4.8', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85' },
  { id: 11, name: 'Virtual Reality Headset', category: 'Gaming', price: 3999, original: 5999, rating: '4.5', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=900&q=85' },
  { id: 12, name: 'Pro Gaming Controller', category: 'Gaming', price: 2799, original: 3999, rating: '4.7', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=900&q=85' },
  { id: 13, name: 'FlipBottle Pro', category: 'Home', price: 999, original: 1299, rating: '4.7', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=85' },
  { id: 14, name: 'Ceramic Dinner Set', category: 'Home', price: 2199, original: 3499, rating: '4.6', image: 'https://images.unsplash.com/photo-1584990347449-a1d3c6c8d8ce?auto=format&fit=crop&w=900&q=85' },
  { id: 15, name: 'Warm LED Table Lamp', category: 'Home', price: 1499, original: 2299, rating: '4.8', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85' },
  { id: 16, name: 'Modern Storage Basket', category: 'Home', price: 899, original: 1499, rating: '4.4', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85' },
  { id: 17, name: 'Smart Urban Backpack', category: 'Stationery', price: 1799, original: 2299, rating: '4.8', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' },
  { id: 18, name: 'Premium Study Planner', category: 'Stationery', price: 499, original: 799, rating: '4.7', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=85' },
  { id: 19, name: 'Art Marker Collection', category: 'Stationery', price: 899, original: 1299, rating: '4.6', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85' },
  { id: 20, name: 'GlowSkin Essentials', category: 'Beauty', price: 1499, original: 1899, rating: '4.5', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85' },
  { id: 21, name: 'Daily Skincare Kit', category: 'Beauty', price: 999, original: 1699, rating: '4.7', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85' },
  { id: 22, name: 'Salon Hair Dryer', category: 'Beauty', price: 1799, original: 2499, rating: '4.6', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=85' },
  { id: 23, name: 'FlexFit Yoga Mat', category: 'Fitness', price: 1499, original: 1999, rating: '4.9', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85' },
  { id: 24, name: 'Adjustable Dumbbells', category: 'Fitness', price: 3499, original: 4999, rating: '4.8', image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=900&q=85' },
  { id: 25, name: 'Little Spark Toy Set', category: 'Toys', price: 899, original: 1199, rating: '4.7', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85' },
  { id: 26, name: 'Wooden Building Blocks', category: 'Toys', price: 1299, original: 1799, rating: '4.8', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=85' },
  { id: 27, name: 'Soft Baby Bear', category: 'Baby', price: 699, original: 999, rating: '4.9', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=85' },
  { id: 28, name: 'Baby Activity Gym', category: 'Baby', price: 1599, original: 2499, rating: '4.6', image: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=900&q=85' },
  { id: 29, name: 'Car Phone Mount', category: 'Car & Bike', price: 599, original: 999, rating: '4.5', image: 'https://images.unsplash.com/photo-1551817958-d9d86fb29431?auto=format&fit=crop&w=900&q=85' },
  { id: 30, name: 'Helmet Pro Edition', category: 'Car & Bike', price: 2499, original: 3499, rating: '4.8', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85' },
  { id: 31, name: 'Premium Rice 5 kg', category: 'Grocery', price: 499, original: 649, rating: '4.7', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85' },
  { id: 32, name: 'Healthy Snack Box', category: 'Grocery', price: 799, original: 999, rating: '4.6', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=85' },
  { id: 33, name: 'Modern Bestseller Novel', category: 'Books', price: 399, original: 599, rating: '4.8', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85' },
  { id: 34, name: 'Travel Journal', category: 'Books', price: 349, original: 499, rating: '4.7', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=85' },
  { id: 35, name: 'Cabin Travel Backpack', category: 'Travel', price: 2299, original: 3499, rating: '4.8', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=900&q=85' },
  { id: 36, name: 'Hard Shell Trolley', category: 'Travel', price: 3999, original: 5999, rating: '4.7', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=85' },
  { id: 37, name: 'Handmade Ceramic Mug', category: 'Handmade', price: 499, original: 799, rating: '4.9', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85' },
  { id: 38, name: 'Woven Macramé Wall Art', category: 'Handmade', price: 1199, original: 1799, rating: '4.7', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85' },
];

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export default function ShoppingApp() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { width } = useWindowDimensions();

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = cartItems.reduce((total, product) => total + cart[product.id], 0);
  const cartTotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const addToCart = (productId: number) => {
    setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId: number) => {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) - 1;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = nextQuantity;
      return next;
    });
  };

  const columns = width >= 1100 ? 4 : width >= 700 ? 3 : 2;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>A</Text></View>
            <Text style={styles.brand}>ApniCart</Text>
          </View>
          <View style={styles.searchWrap}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              style={styles.search}
              placeholder="Search for products"
              placeholderTextColor="#94a3b8"
              value={query}
              onChangeText={setQuery}
              accessibilityLabel="Search products"
            />
          </View>
          <TouchableOpacity style={styles.cartButton} onPress={() => setCartOpen(true)} activeOpacity={0.8}>
            <Text style={styles.cartIcon}>Bag</Text>
            {cartCount > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount}</Text></View>}
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={styles.categoryContent}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.category, category === item && styles.categoryActive]}
              onPress={() => setCategory(item)}
              activeOpacity={0.75}
            >
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          key={columns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={columns > 1 ? styles.row : undefined}
          data={visibleProducts}
          keyExtractor={(item) => String(item.id)}
          numColumns={columns}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <View style={styles.hero}>
                <View style={styles.heroCopy}>
                  <View style={styles.offerPill}><Text style={styles.offerPillText}>WEEKEND EDIT</Text></View>
                  <Text style={styles.heroTitle}>Good finds,{`
`}great prices.</Text>
                  <Text style={styles.heroSubtitle}>Discover everyday essentials chosen for quality and value.</Text>
                  <TouchableOpacity style={styles.heroButton} onPress={() => setCategory('All')}>
                    <Text style={styles.heroButtonText}>Shop the collection</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85' }}
                  style={styles.heroImage}
                />
              </View>
              <View style={styles.headingRow}>
                <View>
                  <Text style={styles.heading}>{category === 'All' ? 'Popular right now' : category}</Text>
                  <Text style={styles.resultCount}>{visibleProducts.length} curated items</Text>
                </View>
                <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
              </View>
            </View>
          }
          ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No products found</Text><Text style={styles.emptyText}>Try another search or category.</Text></View>}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.card, { flex: 1 }]} onPress={() => setSelectedProduct(item)} activeOpacity={0.88}>
              <View style={styles.imageWrap}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.discountBadge}><Text style={styles.discountText}>{Math.round((1 - item.price / item.original) * 100)}% OFF</Text></View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.categoryLabel}>{item.category}</Text>
                <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
                <View style={styles.ratingRow}><Text style={styles.star}>★</Text><Text style={styles.rating}>{item.rating}</Text></View>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{formatPrice(item.price)}</Text>
                  <Text style={styles.original}>{formatPrice(item.original)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => addToCart(item.id)}
                  activeOpacity={0.82}
                >
                  <Text style={styles.buttonText}>{cart[item.id] ? `In bag · ${cart[item.id]}` : 'Add to bag'}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />

        <Modal visible={selectedProduct !== null} transparent animationType="fade" onRequestClose={() => setSelectedProduct(null)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.detailModal}>
              {selectedProduct && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Product details</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProduct(null)}><Text style={styles.closeText}>×</Text></TouchableOpacity>
                  </View>
                  <ScrollView contentContainerStyle={styles.detailContent}>
                    <Image source={{ uri: selectedProduct.image }} style={styles.detailImage} />
                    <Text style={styles.categoryLabel}>{selectedProduct.category}</Text>
                    <Text style={styles.detailName}>{selectedProduct.name}</Text>
                    <View style={styles.ratingRow}><Text style={styles.star}>★</Text><Text style={styles.rating}>{selectedProduct.rating} customer rating</Text></View>
                    <View style={styles.priceRow}>
                      <Text style={styles.detailPrice}>{formatPrice(selectedProduct.price)}</Text>
                      <Text style={styles.original}>{formatPrice(selectedProduct.original)}</Text>
                      <Text style={styles.detailDiscount}>{Math.round((1 - selectedProduct.price / selectedProduct.original) * 100)}% off</Text>
                    </View>
                    <Text style={styles.detailDescription}>Quality {selectedProduct.category.toLowerCase()} product with reliable build, great value, and fast delivery. Securely packed and ready for everyday use.</Text>
                    <TouchableOpacity style={styles.detailButton} onPress={() => { addToCart(selectedProduct.id); setSelectedProduct(null); setCartOpen(true); }}>
                      <Text style={styles.detailButtonText}>Buy now · {formatPrice(selectedProduct.price)}</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </Modal>

        <Modal visible={cartOpen} transparent animationType="slide" onRequestClose={() => setCartOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.cartModal}>
              <View style={styles.modalHeader}>
                <View><Text style={styles.modalTitle}>Your bag</Text><Text style={styles.modalSubtitle}>{cartCount} {cartCount === 1 ? 'item' : 'items'} selected</Text></View>
                <TouchableOpacity style={styles.closeButton} onPress={() => setCartOpen(false)}><Text style={styles.closeText}>×</Text></TouchableOpacity>
              </View>
              {cartItems.length === 0 ? (
                <View style={styles.emptyCart}><Text style={styles.emptyCartTitle}>Your bag is empty</Text><Text style={styles.emptyText}>Add products to start shopping.</Text></View>
              ) : (
                <>
                  <FlatList
                    data={cartItems}
                    keyExtractor={(product) => String(product.id)}
                    contentContainerStyle={{ paddingBottom: 8 }}
                    renderItem={({ item }) => (
                      <View style={styles.cartRow}>
                        <Image source={{ uri: item.image }} style={styles.cartImage} />
                        <View style={{ flex: 1 }}>
                          <Text numberOfLines={1} style={styles.cartName}>{item.name}</Text>
                          <Text style={styles.cartPrice}>{formatPrice(item.price)}</Text>
                          <View style={styles.quantityRow}>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => removeFromCart(item.id)}><Text style={styles.quantityText}>−</Text></TouchableOpacity>
                            <Text style={styles.quantityValue}>{cart[item.id]}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(item.id)}><Text style={styles.quantityText}>+</Text></TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                  <View style={styles.cartFooter}>
                    <View><Text style={styles.totalLabel}>Total amount</Text><Text style={styles.totalPrice}>{formatPrice(cartTotal)}</Text></View>
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => setCartOpen(false)}><Text style={styles.checkoutText}>Place order</Text></TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f8fa' },
  page: { flex: 1, width: '100%', maxWidth: 1280, alignSelf: 'center' },
  header: { height: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#edf0f3' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8, minWidth: 150 },
  brandMark: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#ec6a3a', alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: '#fff', fontSize: 17, fontWeight: '900' },
  brand: { color: '#172033', fontSize: 21, fontWeight: '900', letterSpacing: -0.5 },
  searchWrap: { flex: 1, height: 44, maxWidth: 560, marginHorizontal: 'auto' as never, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f3f6', borderRadius: 12, borderWidth: 1, borderColor: '#e9edf2' },
  searchIcon: { width: 40, textAlign: 'center', color: '#7b8495', fontSize: 18 },
  search: { flex: 1, height: '100%', color: '#172033', paddingRight: 14, fontSize: 14 },
  cartButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#172033', alignItems: 'center', justifyContent: 'center' },
  cartIcon: { color: '#fff', fontSize: 12, fontWeight: '800' },
  cartBadge: { position: 'absolute', right: -5, top: -5, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#ec6a3a', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  categories: { flexGrow: 0, flexShrink: 0, height: 58, backgroundColor: '#fff', zIndex: 10, elevation: 2, borderBottomWidth: 1, borderBottomColor: '#edf0f3' },
  categoryContent: { alignItems: 'center', gap: 8, paddingHorizontal: 20, height: 58 },
  category: { borderWidth: 1, borderColor: '#e1e5ea', borderRadius: 18, backgroundColor: '#fff', paddingHorizontal: 14, height: 36, justifyContent: 'center' },
  categoryActive: { backgroundColor: '#172033', borderColor: '#172033' },
  categoryText: { color: '#596275', fontWeight: '700', fontSize: 13 },
  categoryTextActive: { color: '#fff' },
  grid: { paddingHorizontal: 20, paddingBottom: 40 },
  row: { gap: 14, marginBottom: 14 },
  listHeader: { width: '100%' },
  hero: { height: 280, borderRadius: 20, backgroundColor: '#dde9d7', marginTop: 18, marginBottom: 26, overflow: 'hidden', flexDirection: 'row' },
  heroCopy: { flex: 1.1, justifyContent: 'center', paddingHorizontal: 32, zIndex: 2 },
  offerPill: { alignSelf: 'flex-start', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 12 },
  offerPillText: { color: '#65745f', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  heroTitle: { maxWidth: 390, color: '#172033', fontSize: 38, lineHeight: 43, fontWeight: '900', letterSpacing: -1.2 },
  heroSubtitle: { maxWidth: 390, color: '#586654', marginTop: 8, marginBottom: 16, fontSize: 15, lineHeight: 21 },
  heroButton: { alignSelf: 'flex-start', backgroundColor: '#172033', borderRadius: 10, paddingHorizontal: 16, height: 42, justifyContent: 'center' },
  heroButtonText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  heroImage: { flex: 1, height: '100%', opacity: 0.94 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
  heading: { fontSize: 22, fontWeight: '900', color: '#172033', letterSpacing: -0.4 },
  resultCount: { color: '#8a93a3', fontSize: 12, marginTop: 3 },
  viewAll: { color: '#ec6a3a', fontWeight: '800', fontSize: 13 },
  card: { minWidth: 150, maxWidth: 310, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#edf0f3' },
  imageWrap: { height: 210, backgroundColor: '#eef1f5' },
  image: { width: '100%', height: '100%' },
  discountBadge: { position: 'absolute', left: 10, top: 10, borderRadius: 7, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 5 },
  discountText: { color: '#c94f28', fontSize: 10, fontWeight: '900' },
  cardBody: { padding: 12 },
  categoryLabel: { color: '#9aa1ae', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  productName: { minHeight: 38, marginTop: 4, fontSize: 15, lineHeight: 19, fontWeight: '800', color: '#172033' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  star: { color: '#f4a340', fontSize: 13, marginRight: 4 },
  rating: { color: '#687286', fontSize: 12, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginVertical: 10 },
  price: { color: '#172033', fontSize: 17, fontWeight: '900' },
  original: { color: '#9aa1ae', fontSize: 12, textDecorationLine: 'line-through' },
  button: { backgroundColor: '#172033', borderRadius: 9, height: 40, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  empty: { width: '100%', alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { color: '#172033', fontSize: 18, fontWeight: '800' },
  emptyText: { color: '#7b8495', marginTop: 6 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  detailModal: { width: '90%', maxWidth: 500, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' },
  modalHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#edf0f3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#172033' },
  closeButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f1f3f6', alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#172033', fontSize: 18, fontWeight: '700' },
  detailContent: { padding: 20, alignItems: 'center' },
  detailImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  detailName: { fontSize: 18, fontWeight: '800', color: '#172033', marginBottom: 8 },
  detailPrice: { color: '#172033', fontSize: 22, fontWeight: '900' },
  detailDiscount: { color: '#c94f28', fontSize: 12, fontWeight: '800' },
  detailDescription: { color: '#7b8495', fontSize: 14, lineHeight: 20, textAlign: 'center', marginBottom: 20 },
  detailButton: { backgroundColor: '#172033', borderRadius: 10, height: 48, alignItems: 'center', justifyContent: 'center', width: '100%' },
  detailButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  modalSubtitle: { color: '#8a93a3', fontSize: 12, marginTop: 3 },
  cartModal: { width: '90%', maxWidth: 400, maxHeight: '86%', backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' },
  emptyCart: { alignItems: 'center', paddingVertical: 50 },
  emptyCartTitle: { color: '#172033', fontSize: 17, fontWeight: '800', marginBottom: 4 },
  cartImage: { width: 74, height: 74, borderRadius: 10, marginRight: 12, backgroundColor: '#eef1f5' },
  cartRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#edf0f3' },
  cartName: { color: '#172033', fontSize: 15, fontWeight: '700' },
  cartPrice: { color: '#ec6a3a', fontSize: 16, fontWeight: '800' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  quantityButton: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f1f3f6', alignItems: 'center', justifyContent: 'center' },
  quantityText: { color: '#172033', fontSize: 16, fontWeight: '700' },
  quantityValue: { color: '#172033', fontSize: 16, fontWeight: '700' },
  cartFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#edf0f3' },
  totalLabel: { color: '#9aa1ae', fontSize: 14, fontWeight: '700' },
  totalPrice: { color: '#172033', fontSize: 18, fontWeight: '800' },
  checkoutButton: { backgroundColor: '#ec6a3a', borderRadius: 10, height: 48, alignItems: 'center', justifyContent: 'center', width: '100%' },
  checkoutText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});