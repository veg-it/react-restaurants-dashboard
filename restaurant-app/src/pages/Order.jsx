/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getProducts, getOrdersByOrderId, updateMenu, addMenu } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, ExcelExport, PdfExport, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useParams } from 'react-router-dom';

const Order = () => {
    const { bID } = useParams()
    const [restaurantId, setRestaurantId] = useState(bID);
    const [menu, setMenu] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    let quantity = []

    const fetchMenu = async () => {
        try {
            const res = await getOrdersByOrderId(restaurantId);
            setMenu(res.data);
            
            res.data.order_items.map(item => {
                quantity.push(item.quantity)
            })
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the menu.");
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


    useEffect(() => {
        fetchMenu().then(() => {
            setMenu(menu => ({
                ...menu,
                products: menu.products.map((product, index) => {
                    return ({
                        ...product,
                        discountedPrice: (product.price - (product.price * (product.discount / 100))).toFixed(2),
                        quantity: quantity[index]

                    })
                }),
            }));
        });
        fetchProducts();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління меню ресторана" title="Деталі замовлення" />
            {errorMessage && <p>{errorMessage}</p>}
            {menu && (
                <GridComponent
                    id="gridcomp"
                    dataSource={menu.products}
                    allowPaging
                    allowExcelExport
                    allowPdfExport
                >
                    <ColumnsDirective>
                        <ColumnDirective field='id' headerText='ID' textAlign='Right' width={120} isPrimaryKey={true} />
                        <ColumnDirective field='name' headerText='Назва продукту' width={120} />
                        <ColumnDirective field='price' headerText='Ціна продукту' width={150} />
                        <ColumnDirective field='category_id' headerText='Категорія продукту' width={150} />
                        <ColumnDirective field='discount' headerText='Розмір знижки' width={150} />
                        <ColumnDirective field='discountedPrice' headerText='Ціна після знижки' width={150} />
                        <ColumnDirective field='quantity' headerText='Кількість' width={150} />
                    </ColumnsDirective>
                    <Inject services={[Page, ExcelExport, PdfExport]} />
                </GridComponent>
            )}
        </div>
    );
};

export default Order;
