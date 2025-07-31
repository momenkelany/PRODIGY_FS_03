from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
from datetime import datetime

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URL)
db = client.supermarket_db

# Collections
products_collection = db.products
carts_collection = db.carts
wishlists_collection = db.wishlists

# Pydantic models
class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    image_url: str
    stock: int
    unit: str
    discount: Optional[float] = 0

class CartItem(BaseModel):
    product_id: str
    quantity: int

class Cart(BaseModel):
    id: str
    items: List[CartItem]
    created_at: datetime
    updated_at: datetime

class WishlistItem(BaseModel):
    product_id: str

# Sample supermarket products data
sample_products = [
    {
        "id": str(uuid.uuid4()),
        "name": "Fresh Red Apples",
        "description": "Crisp and sweet red apples, perfect for snacking or baking",
        "price": 3.99,
        "category": "Fresh Produce",
        "image_url": "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxncm9jZXJ5fGVufDB8fHx8MTc1Mzk0MzY3M3ww&ixlib=rb-4.1.0&q=85",
        "stock": 50,
        "unit": "lb"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Organic Bananas",
        "description": "Fresh organic bananas, rich in potassium and natural sweetness",
        "price": 2.49,
        "category": "Fresh Produce",
        "image_url": "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxncm9jZXJ5fGVufDB8fHx8MTc1Mzk0MzY3M3ww&ixlib=rb-4.1.0&q=85",
        "stock": 40,
        "unit": "bunch"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Cherry Tomatoes",
        "description": "Fresh cherry tomatoes, perfect for salads and cooking",
        "price": 4.99,
        "category": "Fresh Produce",
        "image_url": "https://images.unsplash.com/photo-1498579397066-22750a3cb424?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxncm9jZXJ5fGVufDB8fHx8MTc1Mzk0MzY3M3ww&ixlib=rb-4.1.0&q=85",
        "stock": 30,
        "unit": "pack"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Fresh Lettuce",
        "description": "Crispy romaine lettuce, perfect for salads and sandwiches",
        "price": 2.99,
        "category": "Fresh Produce",
        "image_url": "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
        "stock": 25,
        "unit": "head"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Whole Milk",
        "description": "Fresh whole milk, rich in calcium and protein",
        "price": 3.79,
        "category": "Dairy & Eggs",
        "image_url": "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg",
        "stock": 20,
        "unit": "gallon"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Sharp Cheddar Cheese",
        "description": "Aged sharp cheddar cheese, perfect for sandwiches and cooking",
        "price": 5.99,
        "category": "Dairy & Eggs",
        "image_url": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldHxlbnwwfHx8fDE3NTM5NDM2ODB8MA&ixlib=rb-4.1.0&q=85",
        "stock": 15,
        "unit": "block"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Greek Yogurt",
        "description": "Creamy Greek yogurt, high in protein and probiotics",
        "price": 4.49,
        "category": "Dairy & Eggs",
        "image_url": "https://images.unsplash.com/photo-1601598851547-4302969d0614?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxzdXBlcm1hcmtldHxlbnwwfHx8fDE3NTM5NDM2ODB8MA&ixlib=rb-4.1.0&q=85",
        "stock": 12,
        "unit": "container"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Free Range Eggs",
        "description": "Farm fresh free-range eggs, perfect for breakfast and baking",
        "price": 4.99,
        "category": "Dairy & Eggs",
        "image_url": "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzdXBlcm1hcmtldHxlbnwwfHx8fDE3NTM5NDM2ODB8MA&ixlib=rb-4.1.0&q=85",
        "stock": 24,
        "unit": "dozen"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Basmati Rice",
        "description": "Premium long-grain basmati rice, perfect for all cuisines",
        "price": 6.99,
        "category": "Pantry",
        "image_url": "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
        "stock": 18,
        "unit": "5lb bag"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Organic Pasta",
        "description": "Organic whole wheat pasta, healthy and delicious",
        "price": 3.49,
        "category": "Pantry",
        "image_url": "https://images.unsplash.com/photo-1628102491629-778571d893a3",
        "stock": 22,
        "unit": "box"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Black Beans",
        "description": "Canned organic black beans, protein-rich and versatile",
        "price": 1.99,
        "category": "Pantry",
        "image_url": "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxncm9jZXJ5fGVufDB8fHx8MTc1Mzk0MzY3M3ww&ixlib=rb-4.1.0&q=85",
        "stock": 35,
        "unit": "can"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Extra Virgin Olive Oil",
        "description": "Premium extra virgin olive oil, perfect for cooking and dressing",
        "price": 8.99,
        "category": "Pantry",
        "image_url": "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxncm9jZXJ5fGVufDB8fHx8MTc1Mzk0MzY3M3ww&ixlib=rb-4.1.0&q=85",
        "stock": 8,
        "unit": "bottle"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Spring Water",
        "description": "Pure natural spring water, refreshing and clean",
        "price": 4.99,
        "category": "Beverages",
        "image_url": "https://images.unsplash.com/photo-1498579397066-22750a3cb424?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxncm9jZXJ5fGVufDB8fHx8MTc1Mzk0MzY3M3ww&ixlib=rb-4.1.0&q=85",
        "stock": 40,
        "unit": "12-pack"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Orange Juice",
        "description": "Fresh-squeezed orange juice, no added sugar",
        "price": 5.49,
        "category": "Beverages",
        "image_url": "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
        "stock": 16,
        "unit": "bottle"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Premium Coffee Beans",
        "description": "Single-origin coffee beans, medium roast with rich flavor",
        "price": 12.99,
        "category": "Beverages",
        "image_url": "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg",
        "stock": 10,
        "unit": "bag"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Organic Chips",
        "description": "Organic potato chips, lightly salted and crispy",
        "price": 3.99,
        "category": "Snacks",
        "image_url": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldHxlbnwwfHx8fDE3NTM5NDM2ODB8MA&ixlib=rb-4.1.0&q=85",
        "stock": 28,
        "unit": "bag"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Chocolate Cookies",
        "description": "Homemade-style chocolate chip cookies, soft and chewy",
        "price": 4.99,
        "category": "Snacks",
        "image_url": "https://images.unsplash.com/photo-1601598851547-4302969d0614?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxzdXBlcm1hcmtldHxlbnwwfHx8fDE3NTM5NDM2ODB8MA&ixlib=rb-4.1.0&q=85",
        "stock": 20,
        "unit": "package"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Laundry Detergent",
        "description": "Eco-friendly laundry detergent, gentle on clothes and environment",
        "price": 9.99,
        "category": "Household",
        "image_url": "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzdXBlcm1hcmtldHxlbnwwfHx8fDE3NTM5NDM2ODB8MA&ixlib=rb-4.1.0&q=85",
        "stock": 12,
        "unit": "bottle"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Paper Towels",
        "description": "Premium paper towels, absorbent and strong",
        "price": 7.99,
        "category": "Household",
        "image_url": "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
        "stock": 15,
        "unit": "6-pack"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Shampoo",
        "description": "Natural shampoo for all hair types, sulfate-free",
        "price": 8.49,
        "category": "Personal Care",
        "image_url": "https://images.unsplash.com/photo-1628102491629-778571d893a3",
        "stock": 18,
        "unit": "bottle"
    }
]

@app.on_event("startup")
async def startup_event():
    # Initialize database with sample products if empty
    if await get_products_count() == 0:
        await init_sample_products()

async def get_products_count():
    return products_collection.count_documents({})

async def init_sample_products():
    products_collection.insert_many(sample_products)

# API Routes
@app.get("/api/products")
async def get_products(category: Optional[str] = None, search: Optional[str] = None):
    """Get all products with optional filtering"""
    query = {}
    
    if category:
        query["category"] = category
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    products = list(products_collection.find(query, {"_id": 0}))
    return products

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    """Get a specific product by ID"""
    product = products_collection.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/api/categories")
async def get_categories():
    """Get all unique product categories"""
    categories = products_collection.distinct("category")
    return categories

@app.post("/api/cart")
async def create_cart():
    """Create a new cart"""
    cart_id = str(uuid.uuid4())
    cart = {
        "id": cart_id,
        "items": [],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    carts_collection.insert_one(cart)
    return {"cart_id": cart_id}

@app.get("/api/cart/{cart_id}")
async def get_cart(cart_id: str):
    """Get cart contents"""
    cart = carts_collection.find_one({"id": cart_id}, {"_id": 0})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Enrich cart items with product details
    enriched_items = []
    for item in cart["items"]:
        product = products_collection.find_one({"id": item["product_id"]}, {"_id": 0})
        if product:
            enriched_items.append({
                **item,
                "product": product,
                "subtotal": item["quantity"] * product["price"]
            })
    
    cart["items"] = enriched_items
    cart["total"] = sum(item["subtotal"] for item in enriched_items)
    return cart

@app.post("/api/cart/{cart_id}/items")
async def add_to_cart(cart_id: str, item: CartItem):
    """Add item to cart"""
    cart = carts_collection.find_one({"id": cart_id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Check if product exists
    product = products_collection.find_one({"id": item.product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if item already in cart
    existing_item = None
    for cart_item in cart["items"]:
        if cart_item["product_id"] == item.product_id:
            existing_item = cart_item
            break
    
    if existing_item:
        # Update quantity
        new_quantity = existing_item["quantity"] + item.quantity
        carts_collection.update_one(
            {"id": cart_id, "items.product_id": item.product_id},
            {"$set": {"items.$.quantity": new_quantity, "updated_at": datetime.now()}}
        )
    else:
        # Add new item
        carts_collection.update_one(
            {"id": cart_id},
            {
                "$push": {"items": item.dict()},
                "$set": {"updated_at": datetime.now()}
            }
        )
    
    return {"message": "Item added to cart successfully"}

@app.put("/api/cart/{cart_id}/items/{product_id}")
async def update_cart_item(cart_id: str, product_id: str, quantity: int):
    """Update item quantity in cart"""
    if quantity <= 0:
        # Remove item if quantity is 0 or negative
        carts_collection.update_one(
            {"id": cart_id},
            {
                "$pull": {"items": {"product_id": product_id}},
                "$set": {"updated_at": datetime.now()}
            }
        )
    else:
        # Update quantity
        carts_collection.update_one(
            {"id": cart_id, "items.product_id": product_id},
            {"$set": {"items.$.quantity": quantity, "updated_at": datetime.now()}}
        )
    
    return {"message": "Cart updated successfully"}

@app.delete("/api/cart/{cart_id}/items/{product_id}")
async def remove_from_cart(cart_id: str, product_id: str):
    """Remove item from cart"""
    carts_collection.update_one(
        {"id": cart_id},
        {
            "$pull": {"items": {"product_id": product_id}},
            "$set": {"updated_at": datetime.now()}
        }
    )
    return {"message": "Item removed from cart successfully"}

@app.post("/api/wishlist")
async def create_wishlist():
    """Create a new wishlist"""
    wishlist_id = str(uuid.uuid4())
    wishlist = {
        "id": wishlist_id,
        "items": [],
        "created_at": datetime.now()
    }
    wishlists_collection.insert_one(wishlist)
    return {"wishlist_id": wishlist_id}

@app.get("/api/wishlist/{wishlist_id}")
async def get_wishlist(wishlist_id: str):
    """Get wishlist contents"""
    wishlist = wishlists_collection.find_one({"id": wishlist_id}, {"_id": 0})
    if not wishlist:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    
    # Enrich wishlist items with product details
    enriched_items = []
    for item in wishlist["items"]:
        product = products_collection.find_one({"id": item["product_id"]}, {"_id": 0})
        if product:
            enriched_items.append({
                **item,
                "product": product
            })
    
    wishlist["items"] = enriched_items
    return wishlist

@app.post("/api/wishlist/{wishlist_id}/items")
async def add_to_wishlist(wishlist_id: str, item: WishlistItem):
    """Toggle item in wishlist"""
    wishlist = wishlists_collection.find_one({"id": wishlist_id})
    if not wishlist:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    
    # Check if product exists
    product = products_collection.find_one({"id": item.product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if item already in wishlist
    existing_item = None
    for wishlist_item in wishlist["items"]:
        if wishlist_item["product_id"] == item.product_id:
            existing_item = wishlist_item
            break
    
    if existing_item:
        # Remove from wishlist
        wishlists_collection.update_one(
            {"id": wishlist_id},
            {"$pull": {"items": {"product_id": item.product_id}}}
        )
        return {"message": "Item removed from wishlist", "in_wishlist": False}
    else:
        # Add to wishlist
        wishlists_collection.update_one(
            {"id": wishlist_id},
            {"$push": {"items": item.dict()}}
        )
        return {"message": "Item added to wishlist", "in_wishlist": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)