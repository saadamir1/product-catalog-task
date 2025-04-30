// Mock product data
const products = [
    {
        id: '1',
        name: 'Smartphone X',
        description: 'The latest smartphone with cutting-edge features and a high-resolution display. Features include a 6.5-inch OLED display, 128GB of storage, and a triple-camera system for stunning photos in any lighting condition.'
    },
    {
        id: '2',
        name: 'Laptop Pro',
        description: 'Powerful laptop with a fast processor and long battery life, perfect for professionals. Equipped with a 15-inch Retina display, 16GB RAM, and a 512GB SSD for lightning-fast performance. The backlit keyboard is comfortable for typing all day.'
    },
    {
        id: '3',
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones with crystal clear sound quality. Enjoy up to 30 hours of battery life and a comfortable over-ear design. Perfect for music lovers and professionals working in noisy environments.'
    },
    {
        id: '4',
        name: 'Smartwatch',
        description: 'Track your fitness goals and stay connected with this feature-packed smartwatch. Monitor your heart rate, count steps, and receive notifications from your phone. Waterproof up to 50 meters and available in multiple stylish colors.'
    }
];

export default function handler(req, res) {
    const { id } = req.query;
    const product = products.find(p => p.id === id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}