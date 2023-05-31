import React, { useEffect, useState } from 'react';
import { getProducts, getMenuByRestaurantId, updateMenu, addMenu } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, ExcelExport, PdfExport, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useParams } from 'react-router-dom';

const Order = () => {
    const { bID } = useParams()
    const [restaurantId, setRestaurantId] = useState(bID);
    const [menu, setMenu] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();
    const [newProduct, setNewProduct] = useState({ product_id: 1 });

    const fetchMenu = async () => {
        try {
            const res = await getMenuByRestaurantId(restaurantId);
            setMenu(res.order.products);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the menu.");
            try {
                await addMenu({ restaurant_id: restaurantId, product_ids: [] });
                fetchMenu();
            } catch {
                setErrorMessage("An error occurred while creating the menu.");
            }
        }
    }

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setAllProducts(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the products.");
        }
    }

    const handleDelete = async (productId) => {
        const updatedProductIds = menu.products.filter(product => product.id !== productId).map(product => product.id);
        try {
            await updateMenu(restaurantId, { restaurant_id: restaurantId, product_ids: updatedProductIds });
            fetchMenu()
        } catch {
            setErrorMessage("An error occurred while deleting the product from the menu.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!menu.products.find(product => product.id === newProduct.product_id)) {
            const updatedProductIds = [...menu.products.map(product => product.id), newProduct.product_id];
            await updateMenu(restaurantId, { restaurant_id: restaurantId, product_ids: updatedProductIds });
            fetchMenu().then(() => {
                setMenu(menu => ({
                    ...menu,
                    products: menu.products.map(product => ({
                        ...product,
                        discountedPrice: (product.price - (product.price * (product.discount / 100))).toFixed(2),
                    })),
                }));
            });
        }
    }

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        fetchMenu().then(() => {
            setMenu(menu => ({
                ...menu,
                products: menu.products.map(product => ({
                    ...product,
                    discountedPrice: (product.price - (product.price * (product.discount / 100))).toFixed(2),
                })),
            }));
        });
        fetchProducts();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління меню ресторана" title="Меню" />
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap md:flex-nowrap'>
                <select name="product_id" value={newProduct.product_id} onChange={handleInputChange} className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}>
                    {allProducts.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {menu && (
                <GridComponent
                    id="gridcomp"
                    dataSource={menu.products}
                    allowPaging
                    allowExcelExport
                    allowPdfExport
                    contextMenuItems={['Delete']}
                    rowSelected={(args) => handleDelete(args.data.id)}
                    actionBegin={handleDelete}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='id' headerText='ID' textAlign='Right' width={120} isPrimaryKey={true} />
                        <ColumnDirective field='name' headerText='Назва продукту' width={120} />
                        <ColumnDirective field='price' headerText='Ціна продукту' width={150} />
                        <ColumnDirective field='category_id' headerText='Категорія продукту' width={150} />
                        <ColumnDirective field='discount' headerText='Розмір знижки' width={150} />
                        <ColumnDirective field='discountedPrice' headerText='Ціна після знижки' width={150} />
                    </ColumnsDirective>
                    <Inject services={[Page, ExcelExport, PdfExport]} />
                </GridComponent>
            )}
        </div>
    );
};

export default Order;
