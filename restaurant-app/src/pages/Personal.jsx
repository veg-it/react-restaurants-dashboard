/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../api/index';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Personal = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setnewUser] = useState({ firstname: "", lastname: "", phone: "", address: "", email: "", login: "", password: "", role: "", });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentColor } = useStateContext();

    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };
    const toolbarOptions = ['Search']

    const fetchUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
            setErrorMessage("");
        } catch {
            setErrorMessage("An error occurred while fetching the users.");
        }
    }

    const handleActionComplete = async (args) => {
        if (args.requestType === 'save') {
            try {
                await updateUser(args.data.id, args.data);
                setErrorMessage("");
                fetchUsers();
            } catch {
                setErrorMessage("An error occurred while updating the user.");
            }
        }
    }

    const handleActionBegin = async (args) => {
        if (args.requestType === 'delete') {
            try {
                await deleteUser(args.data[0].id);
                setErrorMessage("");
                fetchUsers();
            } catch {
                setErrorMessage("An error occurred while deleting the user.");
            }
        }
    }

    const handleInputChange = (e) => {
        setnewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(newUser);
            setnewUser({ firstname: "", lastname: "", phone: "", address: "", email: "", login: "", password: "", role: "", });
            setErrorMessage("");
            fetchUsers();
        } catch {
            setErrorMessage("An error occurred while adding the user.");
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Управління персоналом" title="Користувачі" />
            <p className='text-xl mb-3'>Додати нового</p>
            <form onSubmit={handleSubmit} className='flex gap-3 mb-3 md:mb-6 flex-wrap'>
                <input name="firstname" value={newUser.firstname} onChange={handleInputChange} placeholder="Ім'я" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="lastname" value={newUser.lastname} onChange={handleInputChange} placeholder="Прізвище" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="phone" value={newUser.phone} onChange={handleInputChange} placeholder="Номер телефону" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="address" value={newUser.address} onChange={handleInputChange} placeholder="Адреса" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="email" value={newUser.email} onChange={handleInputChange} placeholder="Пошта" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="login" value={newUser.login} onChange={handleInputChange} placeholder="Логін" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <input name="password" value={newUser.password} onChange={handleInputChange} placeholder="Пароль" className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'} />
                <select name="role" value={newUser.role} onChange={handleInputChange} className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}>
                        <option value="Адміністратор">Адміністратор</option>
                        <option value="Оффіціант">Оффіціант</option>
                        <option value="Повар">Повар</option>
                        <option value="Шеф">Шеф</option>
                </select>
                <button type="submit" style={{ backgroundColor: currentColor }} className='mx-auto rounded-sm text-white py-3 px-2 md:px-10 md:py-3'>Додати</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <GridComponent
                id="gridcomp"
                dataSource={users}
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
                    <ColumnDirective field='firstname' headerText="Ім'я" width={120} />
                    <ColumnDirective field='lastname' headerText='Прізвище' width={120} />
                    <ColumnDirective field='phone' headerText='Номер телефону' width={120} />
                    <ColumnDirective field='address' headerText='Адреса' width={120} />
                    <ColumnDirective field='email' headerText='Пошта' width={120} />
                    <ColumnDirective field='login' headerText='Логін' width={120} />
                    <ColumnDirective field='password' headerText='Пароль' width={120} />
                    <ColumnDirective field='role' headerText='Роль' width={120} />
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search]} />
            </GridComponent>
        </div>
    );
};
export default Personal;
