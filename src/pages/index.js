import { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import { ShoppingBag, Loader } from 'lucide-react';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Using the API URL from environment variable or falling back to relative path
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/products`
            : '/api/products';

        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <ShoppingBag className="text-blue-500 dark:text-blue-400 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Product Catalog
                    </h1>
                </div>
                <DarkModeToggle />
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Loader className="animate-spin text-blue-500" size={32} />
                </div>
            ) : error ? (
                <div className="text-center py-10">
                    <p className="text-red-500 dark:text-red-400 text-lg">
                        Error: {error}. Please try again later.
                    </p>
                </div>
            ) : (
                <div className="mt-6">
                    {products.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No products available.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {products.map(product => (
                                <Link key={product.id} href={`/product/${product.id}`} legacyBehavior>
                                    <a className="block">
                                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600">
                                            <h2 className="font-medium text-lg text-gray-800 dark:text-white">{product.name}</h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                                                {product.description.substring(0, 80)}...
                                            </p>
                                            <div className="mt-3 text-blue-500 text-sm">View details →</div>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}