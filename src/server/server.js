const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Mock product data
const products = [
    {
        id: '1',
        name: 'Smartphone X',
        description: 'The latest smartphone with cutting-edge features and a high-resolution display. Features include a 6.5-inch OLED display, 128GB of storage, and a triple-camera system for stunning photos in any lighting condition.',
        price: 999.99
    },
    {
        id: '2',
        name: 'Laptop Pro',
        description: 'Powerful laptop with a fast processor and long battery life, perfect for professionals. Equipped with a 15-inch Retina display, 16GB RAM, and a 512GB SSD for lightning-fast performance. The backlit keyboard is comfortable for typing all day.',
        price: 1499.99
    },
    {
        id: '3',
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones with crystal clear sound quality. Enjoy up to 30 hours of battery life and a comfortable over-ear design. Perfect for music lovers and professionals working in noisy environments.',
        price: 249.99
    },
    {
        id: '4',
        name: 'Smartwatch',
        description: 'Track your fitness goals and stay connected with this feature-packed smartwatch. Monitor your heart rate, count steps, and receive notifications from your phone. Waterproof up to 50 meters and available in multiple stylish colors.',
        price: 199.99
    }
];

// Routes
app.get('/api/products', (req, res) => {
    console.log('GET /api/products - Request received');

    // Return a simplified version for the product list
    const simplifiedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description.substring(0, 100) // Truncated description for list view
    }));

    console.log('Sending products:', simplifiedProducts.length);
    res.json(simplifiedProducts);
});

app.get('/api/products/:id', (req, res) => {
    console.log(`GET /api/products/${req.params.id} - Request received`);

    const product = products.find(p => p.id === req.params.id);

    if (product) {
        console.log('Product found, sending:', product.name);
        res.json(product);
    } else {
        console.log('Product not found');
        res.status(404).json({ message: 'Product not found' });
    }
});

// Root route for testing
app.get('/', (req, res) => {
    res.send('Product API server is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});