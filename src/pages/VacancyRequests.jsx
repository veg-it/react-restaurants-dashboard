import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { HtmlEditor, Image, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

import { getVacancyRequests, addVacancyRequest, updateVacancyRequest, deleteVacancyRequest } from '../api/index';

const VacancyRequests = () => {
    const [vacancies, setVacancies] = useState([]);
    const [newVacancyRequest, setnewVacancyRequest] = useState({ firstname: "", lastname: "", phone: "", date: Date.now() / 1000, text: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };

    const fetchVacancies = async () => {
        try {
            const res = await getVacancyRequests();
            setVacancies(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the vacancies.");
        }
    }

    const handleActionComplete = async (args) => {
        if (args.requestType === 'save') {
            try {
                await updateVacancyRequest(args.data.id, args.data);
                setErrorMessage("");
                fetchVacancies();
            } catch {
                setErrorMessage("An error occurred while updating the vacancy.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deleteVacancyRequest(args.data[0].id);
                setErrorMessage("");
                fetchVacancies();
            } catch {
                setErrorMessage("An error occurred while deleting the vacancy.");
            }
        }
    }

    const handleInputChange = (e) => {
        setnewVacancyRequest({
            ...newVacancyRequest,
            text: e.value
        });
    }

    const handleInputChangeForm = (e) => {
        setnewVacancyRequest({
            ...newVacancyRequest,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newVacancyRequest)
        try {
            await addVacancyRequest(newVacancyRequest);
            setnewVacancyRequest({ firstname: "", lastname: "", phone: "", date: Date.now() / 1000, text: "" });
            setErrorMessage("");
            fetchVacancies();
        } catch {
            setErrorMessage("An error occurred while adding the vacancy.");
        }
    }

    useEffect(() => {
        fetchVacancies();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління персоналом" title="Заявки" />
            <p className='text-xl mb-3'>Додати нову заявку</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap'>
                <input name="firstname" value={newVacancyRequest.firstname} onChange={handleInputChangeForm} placeholder="Ім'я" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="lastname" value={newVacancyRequest.lastname} onChange={handleInputChangeForm} placeholder="Прізвище" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="phone" value={newVacancyRequest.phone} onChange={handleInputChangeForm} placeholder="Номер телефону" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <RichTextEditorComponent
                    value={newVacancyRequest.text}
                    change={(e) => handleInputChange(e)}
                    placeholder="Текст вакансії"
                    className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                    name="text"
                >
                    <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                </RichTextEditorComponent>
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={vacancies}
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
                    <ColumnDirective field="id" headerText="ID" textAlign='Right' width={120} isPrimaryKey={true} />
                    <ColumnDirective field="firstname" headerText="Ім'я" width={120} />
                    <ColumnDirective field="lastname" headerText="Прізвище" width={120} />
                    <ColumnDirective field="phone" headerText="Мобільний телефон" width={120} />
                    <ColumnDirective field="date" headerText="Дата запиту" width={120} />
                    <ColumnDirective field="text" headerText="Текст запиту" width={120} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};

export default VacancyRequests;
