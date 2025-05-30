const menuItems = [
    {
      id: "item_001",
      name: "Margherita Pizza",
      description: "Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves",
      price: 12.99,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tasteofhome.com%2Frecipes%2Fmargherita-pizza%2F&psig=AOvVaw0YdANbwNs4Fa2_CTyd8RgH&ust=1748698931177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDp16upy40DFQAAAAAdAAAAABAE",
      category: "Pizza",
      isAvailable: true,
      preparationTime: "15-20 mins",
      rating: 4.5,
      ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Fresh Basil", "Olive Oil"]
    },
    {
      id: "item_002",
      name: "Chicken Burger",
      description: "Juicy grilled chicken breast with lettuce, tomato, and special sauce",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      category: "Burgers",
      isAvailable: true,
      preparationTime: "10-15 mins",
      rating: 4.3,
      ingredients: ["Chicken Breast", "Lettuce", "Tomato", "Special Sauce", "Bun"]
    },
    {
      id: "item_003",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing",
      price: 8.50,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
      category: "Salads",
      isAvailable: true,
      preparationTime: "5-10 mins",
      rating: 4.2,
      ingredients: ["Romaine Lettuce", "Parmesan Cheese", "Croutons", "Caesar Dressing"]
    },
    {
      id: "item_004",
      name: "Beef Tacos",
      description: "Three soft tacos filled with seasoned beef, cheese, and fresh vegetables",
      price: 11.99,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tasteofhome.com%2Frecipes%2Fmargherita-pizza%2F&psig=AOvVaw0YdANbwNs4Fa2_CTyd8RgH&ust=1748698931177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDp16upy40DFQAAAAAdAAAAABAE",
      category: "Mexican",
      isAvailable: true,
      preparationTime: "12-18 mins",
      rating: 4.6,
      ingredients: ["Ground Beef", "Tortillas", "Cheese", "Lettuce", "Tomatoes", "Sour Cream"]
    },
    {
      id: "item_005",
      name: "Chocolate Brownie",
      description: "Rich and fudgy chocolate brownie served with vanilla ice cream",
      price: 6.99,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tasteofhome.com%2Frecipes%2Fmargherita-pizza%2F&psig=AOvVaw0YdANbwNs4Fa2_CTyd8RgH&ust=1748698931177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDp16upy40DFQAAAAAdAAAAABAE",
      category: "Desserts",
      isAvailable: true,
      preparationTime: "5 mins",
      rating: 4.8,
      ingredients: ["Chocolate", "Butter", "Sugar", "Eggs", "Flour", "Vanilla Ice Cream"]
    },
    {
      id: "item_006",
      name: "Pepperoni Pizza",
      description: "Classic pepperoni pizza with mozzarella cheese and tomato sauce",
      price: 14.99,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tasteofhome.com%2Frecipes%2Fmargherita-pizza%2F&psig=AOvVaw0YdANbwNs4Fa2_CTyd8RgH&ust=1748698931177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDp16upy40DFQAAAAAdAAAAABAE",
      category: "Pizza",
      isAvailable: true,
      preparationTime: "15-20 mins",
      rating: 4.4,
      ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Pepperoni", "Oregano"]
    },
    {
      id: "item_007",
      name: "Fish and Chips",
      description: "Beer-battered fish fillet served with crispy golden fries",
      price: 13.50,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tasteofhome.com%2Frecipes%2Fmargherita-pizza%2F&psig=AOvVaw0YdANbwNs4Fa2_CTyd8RgH&ust=1748698931177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDp16upy40DFQAAAAAdAAAAABAE",
      category: "Seafood",
      isAvailable: true,
      preparationTime: "18-25 mins",
      rating: 4.1,
      ingredients: ["Fish Fillet", "Batter", "Potatoes", "Tartar Sauce", "Lemon"]
    },
    {
      id: "item_008",
      name: "Vanilla Milkshake",
      description: "Creamy vanilla milkshake topped with whipped cream and cherry",
      price: 4.99,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tasteofhome.com%2Frecipes%2Fmargherita-pizza%2F&psig=AOvVaw0YdANbwNs4Fa2_CTyd8RgH&ust=1748698931177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDp16upy40DFQAAAAAdAAAAABAE",
      category: "Beverages",
      isAvailable: true,
      preparationTime: "3-5 mins",
      rating: 4.0,
      ingredients: ["Vanilla Ice Cream", "Milk", "Whipped Cream", "Cherry"]
    }
  ];
  