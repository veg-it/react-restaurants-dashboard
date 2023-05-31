import React, { useEffect, useState } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Reviews = () => {
    const [categories, setCategories] = useState([]);
    const [newReview, setnewReview] = useState({ text: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };

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
                await updateCategory(args.data.id, args.data);
                setErrorMessage("");
                fetchCategories();
            } catch {
                setErrorMessage("An error occurred while updating the category.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deleteCategory(args.data[0].id);
                setErrorMessage("");
                fetchCategories();
            } catch {
                setErrorMessage("An error occurred while deleting the category.");
            }
        }
    }

    const handleInputChange = (e) => {
        setnewReview({
            ...newReview,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCategory(newReview);
            setnewReview({ name: "" });
            setErrorMessage("");
            fetchCategories();
        } catch {
            setErrorMessage("An error occurred while adding the category.");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління категоріями" title="Категорії" />
            <p className='text-xl mb-3'>Додати нову</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap md:flex-nowrap'>
                <input name="name" value={newReview.name} onChange={handleInputChange} placeholder="Назва категорії" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={categories}
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
                    <ColumnDirective field='name' headerText='Назва категорії' width={120} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};

export default Reviews;
