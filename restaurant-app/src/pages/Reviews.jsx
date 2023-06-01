/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getReviews, addReview, updateReview, deleteReview } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setnewReview] = useState({ text: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };
    const toolbarOptions = ['Search']

    const fetchReviews = async () => {
        try {
            const res = await getReviews();
            setReviews(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the reviews.");
        }
    }

    const handleActionComplete = async (args) => {
        if (args.requestType === 'save') {
            try {
                await updateReview(args.data.id, args.data);
                setErrorMessage("");
                fetchReviews();
            } catch {
                setErrorMessage("An error occurred while updating the review.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deleteReview(args.data[0].id);
                setErrorMessage("");
                fetchReviews();
            } catch {
                setErrorMessage("An error occurred while deleting the review.");
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
            await addReview(newReview);
            setnewReview({ text: "" });
            setErrorMessage("");
            fetchReviews();
        } catch {
            setErrorMessage("An error occurred while adding the review.");
        }
    }

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління рестораном" title="Відгуки" />
            <p className='text-xl mb-3'>Додати новий</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap md:flex-nowrap'>
                <input name="text" value={newReview.text} onChange={handleInputChange} placeholder="Текст відгуку" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={reviews}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={['Edit', 'Delete']}
                editSettings={editing}
                actionComplete={handleActionComplete}
                actionBegin={handleActionBegin}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText='ID' textAlign='Right' width={120} isPrimaryKey={true} />
                    <ColumnDirective field='text' headerText='Текст відгуку' width={120} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search]} />
            </GridComponent>
        </div>
    );
};

export default Reviews;
