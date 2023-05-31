import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { personalData, personalGrid } from '../data/dummy';
import { Header, Button } from '../components';
import { FiPlus } from 'react-icons/fi';
import { useStateContext } from '../contexts/ContextProvider';

const Personal = () => {
  const toolbarOptions = ['Search'];
  const { currentColor, currentMode } = useStateContext();

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Управління рестораном" title="Персонал" />
      <GridComponent
        dataSource={personalData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {personalGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
      <div className='mt-4'>
        <Button
          bgColor={currentColor}
          color="white"
          text="Додати"
          onClick={handleAddClick}
          borderRadius="10px"
        />
      </div>
    </div>
  );
};

function handleAddClick() {
  // тут код для додавання нового запису
  console.log('Add button clicked');
}

export default Personal;
