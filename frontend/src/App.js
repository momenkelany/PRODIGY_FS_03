import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Filter, Star, Plus, Minus, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [wishlist, setWishlist] = useState({ items: [] });
  const [cartId, setCartId] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCategoryChange = (value) => {
    if (value === 'all') {
      setSelectedCategory('');
    } else {
      setSelectedCategory(value);
    }
  };

  // Initialize cart and wishlist on component mount
  useEffect(() => {
    initializeApp();
  }, []);

  // Fetch products when category or search changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const initializeApp = async () => {
    try {
      // Create cart
      const cartResponse = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const cartData = await cartResponse.json();
      setCartId(cartData.cart_id);

      // Create wishlist
      const wishlistResponse = await fetch(`${API_BASE_URL}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const wishlistData = await wishlistResponse.json();
      setWishlistId(wishlistData.wishlist_id);

      // Fetch categories
      const categoriesResponse = await fetch(`${API_BASE_URL}/api/categories`);
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      setLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`${API_BASE_URL}/api/products?${params}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async () => {
    if (!cartId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${cartId}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchWishlist = async () => {
    if (!wishlistId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/${wishlistId}`);
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!cartId) return;
    try {
      await fetch(`${API_BASE_URL}/api/cart/${cartId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
      });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!cartId) return;
    try {
      await fetch(`${API_BASE_URL}/api/cart/${cartId}/items/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!cartId) return;
    try {
      await fetch(`${API_BASE_URL}/api/cart/${cartId}/items/${productId}`, {
        method: 'DELETE'
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!wishlistId) return;
    try {
      await fetch(`${API_BASE_URL}/api/wishlist/${wishlistId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
      });
      fetchWishlist();
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.items.some(item => item.product_id === productId);
  };

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Load cart and wishlist when IDs are available
  useEffect(() => {
    if (cartId) fetchCart();
  }, [cartId]);

  useEffect(() => {
    if (wishlistId) fetchWishlist();
  }, [wishlistId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-green-600">Loading FreshMart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">FreshMart</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Fresh • Local • Quality
              </Badge>
            </div>
            
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-green-300 focus:ring-green-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => console.log('Wishlist clicked')}
                className="text-gray-600 hover:text-green-600"
              >
                <Heart className="h-5 w-5" />
                <span className="ml-1 hidden sm:inline">{wishlist.items.length}</span>
              </Button>

              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-green-600 relative"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {getCartItemCount() > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                      >
                        {getCartItemCount()}
                      </Badge>
                    )}
                    <span className="ml-1 hidden sm:inline">Cart</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>
                      {getCartItemCount()} items in your cart
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.items.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.items.map((item) => (
                          <div key={item.product_id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.product.name}</h4>
                              <p className="text-green-600 font-semibold">${item.product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartItem(item.product_id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartItem(item.product_id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.product_id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-green-600">${cart.total?.toFixed(2) || '0.00'}</span>
                          </div>
                          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                            Proceed to Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Fresh Groceries Delivered</h2>
            <p className="text-xl text-green-100 mb-8">
              Quality products from your local supermarket, right to your door
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ✓ Same-day delivery
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ✓ Fresh guarantee
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ✓ Local produce
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <Select value={selectedCategory || undefined} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory('')}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            {selectedCategory || 'All Products'} 
            <span className="text-gray-500 font-normal ml-2">({products.length} items)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-green-300">
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-2 right-2 h-8 w-8 p-0 ${
                    isInWishlist(product.id)
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
                {product.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </CardTitle>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                  {product.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="pb-2">
                <CardDescription className="text-gray-600 line-clamp-2 mb-3">
                  {product.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 ml-1">per {product.unit}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
                {product.stock < 10 && (
                  <p className="text-sm text-orange-600 mt-2">Only {product.stock} left!</p>
                )}
              </CardContent>
              
              <CardFooter>
                <Button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">FreshMart</h4>
              <p className="text-gray-400">
                Your local supermarket, delivering fresh quality groceries right to your door.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Fresh Produce</li>
                <li>Dairy & Eggs</li>
                <li>Pantry Essentials</li>
                <li>Household Items</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Delivery Info</li>
                <li>Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Newsletter</li>
                <li>Social Media</li>
                <li>Mobile App</li>
                <li>Store Locator</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FreshMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;