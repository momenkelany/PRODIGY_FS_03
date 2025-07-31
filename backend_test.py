import requests
import sys
import json
from datetime import datetime

class SupermarketAPITester:
    def __init__(self, base_url="https://92c4c125-ecc0-414d-b613-4596c757875c.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.cart_id = None
        self.product_ids = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_get_products(self):
        """Test getting products"""
        success, response = self.run_test(
            "Get Products",
            "GET",
            "api/products",
            200
        )
        if success and response:
            self.product_ids = [product['id'] for product in response[:3]]  # Get first 3 product IDs
            print(f"   Found {len(response)} products, using first 3 for testing")
        return success

    def test_get_categories(self):
        """Test getting categories"""
        success, _ = self.run_test(
            "Get Categories",
            "GET",
            "api/categories",
            200
        )
        return success

    def test_create_cart(self):
        """Test creating a cart"""
        success, response = self.run_test(
            "Create Cart",
            "POST",
            "api/cart",
            200
        )
        if success and 'cart_id' in response:
            self.cart_id = response['cart_id']
            print(f"   Cart ID: {self.cart_id}")
        return success

    def test_get_empty_cart(self):
        """Test getting empty cart"""
        if not self.cart_id:
            print("❌ No cart ID available")
            return False
            
        success, response = self.run_test(
            "Get Empty Cart",
            "GET",
            f"api/cart/{self.cart_id}",
            200
        )
        if success:
            expected_keys = ['id', 'items', 'total']
            if all(key in response for key in expected_keys):
                print(f"   Cart has correct structure: {expected_keys}")
                if response['items'] == [] and response['total'] == 0:
                    print("   Cart is correctly empty")
                    return True
                else:
                    print("   Warning: Cart should be empty but has items")
        return success

    def test_add_to_cart(self, product_id, quantity=1):
        """Test adding item to cart"""
        if not self.cart_id or not product_id:
            print("❌ No cart ID or product ID available")
            return False
            
        success, _ = self.run_test(
            f"Add Product to Cart (qty: {quantity})",
            "POST",
            f"api/cart/{self.cart_id}/items",
            200,
            data={"product_id": product_id, "quantity": quantity}
        )
        return success

    def test_get_cart_with_items(self):
        """Test getting cart with items"""
        if not self.cart_id:
            print("❌ No cart ID available")
            return False
            
        success, response = self.run_test(
            "Get Cart with Items",
            "GET",
            f"api/cart/{self.cart_id}",
            200
        )
        if success and response:
            items_count = len(response.get('items', []))
            total = response.get('total', 0)
            print(f"   Cart has {items_count} items, total: ${total}")
            
            # Verify item structure
            if items_count > 0:
                item = response['items'][0]
                expected_item_keys = ['product_id', 'quantity', 'product', 'subtotal']
                if all(key in item for key in expected_item_keys):
                    print("   Cart items have correct structure")
                    return True
                else:
                    print(f"   Warning: Cart item missing keys. Has: {list(item.keys())}")
        return success

    def test_update_cart_item(self, product_id, new_quantity):
        """Test updating cart item quantity"""
        if not self.cart_id or not product_id:
            print("❌ No cart ID or product ID available")
            return False
            
        success, _ = self.run_test(
            f"Update Cart Item Quantity to {new_quantity}",
            "PUT",
            f"api/cart/{self.cart_id}/items/{product_id}",
            200,
            data={"quantity": new_quantity}
        )
        return success

    def test_remove_from_cart(self, product_id):
        """Test removing item from cart"""
        if not self.cart_id or not product_id:
            print("❌ No cart ID or product ID available")
            return False
            
        success, _ = self.run_test(
            "Remove Item from Cart",
            "DELETE",
            f"api/cart/{self.cart_id}/items/{product_id}",
            200
        )
        return success

    def test_cart_not_found(self):
        """Test getting non-existent cart"""
        fake_cart_id = "non-existent-cart-id"
        success, _ = self.run_test(
            "Get Non-existent Cart (should fail)",
            "GET",
            f"api/cart/{fake_cart_id}",
            404
        )
        return success

    def test_wishlist_functionality(self):
        """Test wishlist creation and operations"""
        print("\n💝 Testing Wishlist Functionality...")
        
        # Create wishlist
        success, response = self.run_test(
            "Create Wishlist",
            "POST",
            "api/wishlist",
            200
        )
        if not success or 'wishlist_id' not in response:
            return False
            
        wishlist_id = response['wishlist_id']
        print(f"   Wishlist ID: {wishlist_id}")
        
        # Get empty wishlist
        success, response = self.run_test(
            "Get Empty Wishlist",
            "GET",
            f"api/wishlist/{wishlist_id}",
            200
        )
        if not success:
            return False
            
        # Add item to wishlist
        if self.product_ids:
            success, response = self.run_test(
                "Add to Wishlist",
                "POST",
                f"api/wishlist/{wishlist_id}/items",
                200,
                data={"product_id": self.product_ids[0]}
            )
            if not success:
                return False
                
            # Get wishlist with items
            success, response = self.run_test(
                "Get Wishlist with Items",
                "GET",
                f"api/wishlist/{wishlist_id}",
                200
            )
            if success and response:
                items_count = len(response.get('items', []))
                print(f"   Wishlist has {items_count} items")
                
            # Toggle item (remove from wishlist)
            success, response = self.run_test(
                "Toggle Wishlist Item (Remove)",
                "POST",
                f"api/wishlist/{wishlist_id}/items",
                200,
                data={"product_id": self.product_ids[0]}
            )
            
        return True

    def test_search_and_filter(self):
        """Test search and category filtering"""
        print("\n🔍 Testing Search and Filter...")
        
        # Test search
        success, response = self.run_test(
            "Search Products (apple)",
            "GET",
            "api/products",
            200,
            params={"search": "apple"}
        )
        if success and response:
            print(f"   Found {len(response)} products matching 'apple'")
            
        # Test category filter
        success, response = self.run_test(
            "Filter by Category (Fresh Produce)",
            "GET",
            "api/products",
            200,
            params={"category": "Fresh Produce"}
        )
        if success and response:
            print(f"   Found {len(response)} products in 'Fresh Produce' category")
            
        return True

def main():
    print("🛒 Starting Supermarket Cart API Tests")
    print("=" * 50)
    
    tester = SupermarketAPITester()
    
    # Test basic endpoints first
    print("\n📦 Testing Basic Endpoints...")
    tester.test_get_products()
    tester.test_get_categories()
    
    # Test cart creation
    print("\n🛒 Testing Cart Creation...")
    if not tester.test_create_cart():
        print("❌ Cart creation failed, stopping tests")
        return 1
    
    # Test empty cart
    print("\n📋 Testing Empty Cart...")
    tester.test_get_empty_cart()
    
    # Test adding items to cart
    print("\n➕ Testing Add to Cart...")
    if tester.product_ids:
        # Add first product
        tester.test_add_to_cart(tester.product_ids[0], 2)
        # Add second product
        if len(tester.product_ids) > 1:
            tester.test_add_to_cart(tester.product_ids[1], 1)
        
        # Test cart with items
        tester.test_get_cart_with_items()
        
        # Test updating quantity
        print("\n🔄 Testing Update Cart Item...")
        tester.test_update_cart_item(tester.product_ids[0], 3)
        tester.test_get_cart_with_items()
        
        # Test removing item
        print("\n🗑️ Testing Remove from Cart...")
        tester.test_remove_from_cart(tester.product_ids[0])
        tester.test_get_cart_with_items()
    
    # Test error cases
    print("\n❌ Testing Error Cases...")
    tester.test_cart_not_found()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Cart API is working correctly.")
        return 0
    else:
        failed_tests = tester.tests_run - tester.tests_passed
        print(f"⚠️  {failed_tests} test(s) failed. Cart API has issues.")
        return 1

if __name__ == "__main__":
    sys.exit(main())