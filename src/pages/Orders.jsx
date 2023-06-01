import React, { useEffect, useState } from 'react';
import { addRestaurant, updateOrder, deleteOrder, getOrders } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";

// {
//   "status": "processing",
//   "date": 1685523831,
//   "sum": 123.45,
//   "comment": "Please deliver to the back door.",
//   "shipping_type": "home delivery",
//   "restaurant_id": 1,
//   "product_quantities": [[2, 3], [1,3]]
// }
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setnewOrder] = useState({ status: "processing", date: "", sum: "", comment: "", shipping_type: "",  restaurant_id: "", product_quantities: [] });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const navigate = useNavigate();

    const handleContextMenuClick = (args) => {
        if (args.item.id === 'viewmenu') {
            navigate(`/menu/${args.rowInfo.rowData.id}`);
        }
    }


    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };

    const fetchOrders = async () => {
        try {
            const res = await getOrders();
            setOrders(res.data.orders);
            console.log(res)
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the orders.");
        }
    }

    const handleActionComplete = async (args) => {
        if (args.requestType === 'save') {
            try {
                await updateOrder(args.data.id, args.data);
                setErrorMessage("");
                fetchOrders();
            } catch {
                setErrorMessage("An error occurred while updating the restaurant.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deleteOrder(args.data[0].id);
                setErrorMessage("");
                fetchOrders();
            } catch {
                setErrorMessage("An error occurred while deleting the restaurant.");
            }
        }
    }

    const handleInputChange = (e) => {
        setnewOrder({
            ...newOrder,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addRestaurant(newOrder);
            setnewOrder({ name: "", address: "" });
            setErrorMessage("");
            fetchOrders();
        } catch {
            setErrorMessage("An error occurred while adding the restaurant.");
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління рестораном" title="Замовлення" />
            <p className='text-xl mb-3'>Додати новий</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap md:flex-nowrap'>
                <input name="name" value={newOrder.name} onChange={handleInputChange} placeholder="Назва ресторану" className={'shadow appearance-none border rounded  max-w-6xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="address" value={newOrder.address} onChange={handleInputChange} placeholder="Адреса ресторану" className={'shadow appearance-none border rounded max-w-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={orders}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={['Edit', 'Delete', {
                    text: 'View Details',
                    id: 'viewmenu'
                },]}
                editSettings={editing}
                actionComplete={handleActionComplete}
                actionBegin={handleActionBegin}
                contextMenuClick={handleContextMenuClick}
            >
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText='ID' textAlign='Right' width={120} isPrimaryKey={true} />
                    <ColumnDirective field='status' headerText='Статус замовлення' width={120} />
                    <ColumnDirective field='date' headerText='Дата замовлення' width={150} />
                    <ColumnDirective field='sum' headerText='Сума замовлення' width={150} />
                    <ColumnDirective field='comment' headerText='Комментар' width={150} />
                    <ColumnDirective field='shipping_type' headerText='Тип доставки' width={150} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};
export default Orders;
