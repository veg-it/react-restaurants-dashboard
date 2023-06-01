/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { BsEye } from 'react-icons/bs';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [newRestaurant, setNewRestaurant] = useState({ name: "", address: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const navigate = useNavigate();

    const handleContextMenuClick = (args) => {
        if (args.item.id === 'viewmenu') {
            navigate(`/menu/${args.rowInfo.rowData.id}`);
        }
    }


    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };

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
                await updateRestaurant(args.data.id, args.data);
                setErrorMessage("");
                fetchRestaurants();
            } catch {
                setErrorMessage("An error occurred while updating the restaurant.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deleteRestaurant(args.data[0].id);
                setErrorMessage("");
                fetchRestaurants();
            } catch {
                setErrorMessage("An error occurred while deleting the restaurant.");
            }
        }
    }

    const handleInputChange = (e) => {
        setNewRestaurant({
            ...newRestaurant,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addRestaurant(newRestaurant);
            setNewRestaurant({ name: "", address: "" });
            setErrorMessage("");
            fetchRestaurants();
        } catch {
            setErrorMessage("An error occurred while adding the restaurant.");
        }
    }

    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління рестораном" title="Ресторани" />
            <p className='text-xl mb-3'>Додати новий</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap md:flex-nowrap'>
                <input name="name" value={newRestaurant.name} onChange={handleInputChange} placeholder="Назва ресторану" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="address" value={newRestaurant.address} onChange={handleInputChange} placeholder="Адреса ресторану" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={restaurants}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={['Edit', 'Delete', {
                    text: 'View Menu',
                    id: 'viewmenu'
                },]}
                editSettings={editing}
                actionComplete={handleActionComplete}
                actionBegin={handleActionBegin}
                contextMenuClick={handleContextMenuClick}
            >
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText='ID' textAlign='Right' width={120} isPrimaryKey={true} />
                    <ColumnDirective field='name' headerText='Назва ресторану' width={120} />
                    <ColumnDirective field='address' headerText='Адреса ресторану' width={150} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};
export default Restaurants;
