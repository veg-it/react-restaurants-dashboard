/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getPromotions, getProducts, getRestaurants, addPromotion, updatePromotion, deletePromotion } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [newPromotion, setNewPromotion] = useState({ name: "", discount: "", product_id: 1, restaurant_id: 1 });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };

    const fetchPromotions = async () => {
        try {
            const res = await getPromotions();
            setPromotions(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the promotions.");
        }
    }

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the products.");
        }
    }

    const fetchRestaurants = async () => {
        try {
            const res = await getRestaurants();
            setRestaurants(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the restaurants.");
        }
    }

    const handleActionComplete = async (args) => {
        if (args.requestType === 'save') {
            try {
                await updatePromotion(args.data.id, args.data);
                setErrorMessage("");
                fetchPromotions();
            } catch {
                setErrorMessage("An error occurred while updating the promotion.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deletePromotion(args.data[0].id);
                setErrorMessage("");
                fetchPromotions();
            } catch {
                setErrorMessage("An error occurred while deleting the promotion.");
            }
        }
    }

    const handleInputChange = (e) => {
        setNewPromotion({
            ...newPromotion,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPromotion(newPromotion);
            setNewPromotion({ name: "", discount: "", product_id: 1, restaurant_id: 1 });
            setErrorMessage("");
            fetchPromotions();
        } catch {
            setErrorMessage("An error occurred while adding the promotion.");
        }
    }

    useEffect(() => {
        fetchPromotions();
        fetchProducts();
        fetchRestaurants();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління акціями" title="Акції" />
            <p className='text-xl mb-3'>Додати нову акцію</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap md:flex-nowrap'>
                <input name="name" value={newPromotion.name} onChange={handleInputChange} placeholder="Назва акції" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="discount" value={newPromotion.discount} onChange={handleInputChange} placeholder="Знижка" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}/>
                <select name="product_id" value={newPromotion.product_id} onChange={handleInputChange} className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                <select name="restaurant_id" value={newPromotion.restaurant_id} onChange={handleInputChange} className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}>
                    {restaurants.map(restaurant => (
                        <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                    ))}
                </select>
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={promotions}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={['Edit', 'Delete']}
                editSettings={editing}
                actionComplete={handleActionComplete}
                actionBegin={handleActionBegin}
            >
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText='ID' textAlign='Right' width={120} isPrimaryKey={true} />
                    <ColumnDirective field='name' headerText='Назва акції'  width={120} />
                    <ColumnDirective field='discount' headerText='Знижка' textAlign='Center' width={150} />
                    <ColumnDirective field='product_id' headerText='ID продукту' textAlign='Center' width={150} />
                    <ColumnDirective field='restaurant_id' headerText='ID ресторану' textAlign='Center' width={150} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};

export default Promotions;
