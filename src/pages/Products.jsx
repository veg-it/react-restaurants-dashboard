import React, { useEffect, useState } from 'react';
import { getCategories, getProducts, addProduct, updateProduct, deleteProduct } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ image: "", name: "", price: "", category_id: 1 });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the products.");
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the categories.");
        }
    }

    const handleActionComplete = async (args) => {
        if (args.requestType === 'save') {
            try {
                await updateProduct(args.data.id, args.data);
                setErrorMessage("");
                fetchProducts();
            } catch {
                setErrorMessage("An error occurred while updating the product.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deleteProduct(args.data[0].id);
                setErrorMessage("");
                fetchProducts();
            } catch {
                setErrorMessage("An error occurred while deleting the product.");
            }
        }
    }

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newProduct);
        try {
            await addProduct(newProduct);
            
            setNewProduct({ image: "", name: "", price: "", category_id: 1 });
            setErrorMessage("");
            fetchProducts();
        } catch {
            setErrorMessage("An error occurred while adding the product.");
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління продуктами" title="Продукти" />
            <p className='text-xl mb-3'>Додати новий продукт</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap md:flex-nowrap'>
                <input type="hidden" name="image" value="" />
                <input name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Назва продукту" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Ціна продукту" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <select name="category_id" value={newProduct.category_id} onChange={handleInputChange} className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}>
                    {categories.map(category => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={products}
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
                    <ColumnDirective field='name' headerText='Назва продукту' width={120} />
                    <ColumnDirective field='price' headerText='Ціна продукту' width={150} />
                    <ColumnDirective field='category_id' headerText='Категорія продукту' width={150} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};

export default Products;
