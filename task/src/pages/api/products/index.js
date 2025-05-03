// Mock product data
const products = [
    {
        id: '1',
        name: 'Smartphone X',
        description: 'The latest smartphone with cutting-edge features and a high-resolution display.'
    },
    {
        id: '2',
        name: 'Laptop Pro',
        description: 'Powerful laptop with a fast processor and long battery life, perfect for professionals.'
    },
    {
        id: '3',
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones with crystal clear sound quality.'
    },
    {
        id: '4',
        name: 'Smartwatch',
        description: 'Track your fitness goals and stay connected with this feature-packed smartwatch.'
    }
];

export default function handler(req, res) {
    res.status(200).json(products);
}