import useSWR from 'swr';
import { useRouter } from 'next/router';
import { ArrowLeft, Loader, Info } from 'lucide-react';

const fetcher = url => fetch(url).then(res => res.json());

export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    const { data: product, error } = useSWR(
        () => id ? `/api/products/${id}` : null,
        fetcher
    );

    if (error) return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 text-center">
            <Info size={40} className="mx-auto text-red-500 mb-2" />
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Failed to load product</h2>
            <button
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
                onClick={() => router.push('/')}
            >
                Return to Homepage
            </button>
        </div>
    );

    if (!product) return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 text-center">
            <Loader size={40} className="mx-auto animate-spin text-blue-500 mb-2" />
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Loading product details...</h2>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
            <button
                onClick={() => router.push('/')}
                className="flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
            >
                <ArrowLeft size={18} className="mr-1" />
                <span>Back to Products</span>
            </button>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">{product.name}</h1>
                <div className="h-1 w-20 bg-blue-500 mb-6"></div>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{product.description}</p>

                {product.price && (
                    <div className="mt-6 inline-block bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-md">
                        <span className="font-semibold text-blue-800 dark:text-blue-200">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}