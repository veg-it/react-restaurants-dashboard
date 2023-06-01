/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleContextMenuClick = (args) => {
        if (args.item.id === 'viewdetails') {
            navigate(`/order/${args.rowInfo.rowData.id}`);
        }
    }


    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };

    const fetchOrders = async () => {
        try {
            const res = await getOrders();
            setOrders(res.data.orders);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the orders.");
        }
    }

    const handleActionComplete = async (args) => {
        if (args.requestType === 'save') {
            try {
                console.log(args.data)
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

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління рестораном" title="Замовлення" />
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={orders}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={[ 'Delete', {
                    text: 'View Details',
                    id: 'viewdetails'
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
                    <ColumnDirective field='product_quantities' headerText='Замовлення' width={150} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};
export default Orders;
