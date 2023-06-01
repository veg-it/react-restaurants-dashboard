/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { getProducts, getRestaurants, addOrder, getMenuByRestaurantId } from '../api/index';

// Body for add order
// {
//   "status": "processing",
//   "date": 1685523831,
//   "sum": 123.45,
//   "comment": "Please deliver to the back door.",
//   "shipping_type": "home delivery",
//   "restaurant_id": 1,
//   "product_quantities": [[2, 3], [1,3]]
// }

// Response getMenuByRestaurantId
// {
//     "menu": {
//         "id": 2,
//         "restaurant_id": 2,
//         "products": [
//             {
//                 "id": 1,
//                 "name": "Кофе",
//                 "price": 10.0,
//                 "image": "",
//                 "category_id": 1,
//                 "discount": 10.0
//             },
//             {
//                 "id": 3,
//                 "name": "Кола",
//                 "price": 20.0,
//                 "image": "",
//                 "category_id": 1,
//                 "discount": null
//             }
//         ]
//     }
// }

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);
    const [selectedShopId, setSelectedShopId] = useState(2);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { currentColor } = useStateContext();
    const [shippingType, setShippingType] = useState("Заберу сам");
    const date = Date.now() / 1000
    const status = "processing"
    const [comment, setComment] = useState()
    const [sum, setSum] = useState()
    const [error, setErrorMessage] = useState()


    const fetchProducts = async () => {
        try {
            const res = await getMenuByRestaurantId(selectedShopId);
            setProducts(res.data.menu.products);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the products.");
        }
    }

    const fetchShops = async () => {
        try {
            const res = await getRestaurants();
            setShops(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the shops.");
        }
    }

    const handleShopChange = async (event) => {
        console.log(event.target.value)
        setSelectedShopId(event.target.value);
        fetchProducts()
    }

    const handleProductQuantityChange = (productId, quantity) => {
        setSelectedProducts(prevSelectedProducts => {
            const productExists = prevSelectedProducts.find(p => p[0] === productId);
            if (productExists) {
                return prevSelectedProducts.map(p =>
                    p[0] === productId ? [productId, parseInt(quantity)] : p
                );
            } else {
                return [...prevSelectedProducts, [productId, parseInt(quantity)]];
            }
        });
    }

    const handleOrderSubmit = async () => {
        const order = {
            status: "processing",
            date: parseInt(Date.now()/100),
            sum: selectedProducts.reduce((sum, p) => {
                const product = products.find(product => product.id === p[0]);
                const discount = product.discount ? (product.price * product.discount / 100) : 0;
                const discountedPrice = product.price - discount;
                return sum + (p[1] * discountedPrice);
            }, 0),            
            comment: comment,
            shipping_type: shippingType,
            restaurant_id: selectedShopId,
            product_quantities: selectedProducts
        };
        console.log(order)
        await addOrder(order);
    }

    useEffect(() => {
        fetchProducts();
        fetchShops();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Тестування магазину" title="Магазин" />

            <p className='text-slate-400 text-lg mb-3 mt-5'>Оберіть ресторан:</p>
            <select onChange={handleShopChange} value={selectedShopId}>
                {shops?.map(shop => <option key={shop.id} value={shop.id}>{shop.name}</option>)}
            </select>

            <p className='text-slate-400 text-lg mb-3 mt-5'>Товари:</p>
            {products?.map(product => (
                <div key={product.id} className='md:flex gap-3 mb-2 items-center'>
                    <div className='flex items-center justify-center bg-slate-100 rounded-sm h-24 w-24'><p className=''>{product.name[0]}</p></div>
                    <div>
                        <p>{product.name}</p>
                        <p>Ціна товару: {product.price}</p>
                        <p>Знижка: {product.discount} %</p>
                    </div>
                    <input type="number" min="0" onChange={(event) => handleProductQuantityChange(product.id, event.target.value)} className={'shadow appearance-none border rounded  max-w-6xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-11'} />
                </div>
            ))}

            <div className='flex flex-col mt-5'>
                <p className='text-slate-400 text-lg mb-3 mt-5'>Тип доставки:</p>
                <select onChange={(e) => setShippingType(e.target.value)} value={shippingType}>
                    <option value="В ресторані">В ресторані</option>
                    <option value="Заберу сам">Заберу сам</option>
                    <option value="Доставка на дім">Доставка на дім</option>
                </select>

                <p className='text-slate-400 text-lg mb-3 mt-5'>Комментар:</p>
                <input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    className={'shadow appearance-none border rounded  max-w-6xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-11'}
                />

                <button
                    onClick={handleOrderSubmit}
                    style={{ backgroundColor: currentColor }}
                    className='mt-3 mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'
                >
                    Отправить заказ
                </button>
            </div>

        </div>
    )
}

export default Shop
