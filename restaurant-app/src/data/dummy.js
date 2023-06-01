import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import {
  FiShoppingBag,
  FiEdit,
} from 'react-icons/fi'
import {
  BsShop,
} from 'react-icons/bs'

import { IoMdContacts } from 'react-icons/io'
import {
  RiContactsLine,
  RiStore2Line,
  RiChat1Line,
  RiBallPenLine,
} from 'react-icons/ri'

export const links = [
  {
    title: 'Головна',
    links: [
      {
        name: '',
        title: 'Інформація',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Управління рестораном',
    links: [
      {
        name: 'restaurants',
        title: 'Ресторани',
        icon: <RiStore2Line />,
      },
      {
        name: 'categories',
        title: 'Категорії',
        icon: <RiContactsLine />,
      },
      {
        name: 'items',
        title: 'Продукти',
        icon: <RiContactsLine />,
      },
      {
        name: 'orders',
        title: 'Замовлення',
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: 'reviews',
        title: 'Відгуки',
        icon: <RiBallPenLine />,
      },
      {
        name: 'promotions',
        title: 'Акції',
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: 'Управління персоналом',
    links: [
      {
        name: 'personal',
        title: 'Персонал',
        icon: <IoMdContacts />,
      },
      {
        name: 'vacancies',
        title: 'Вакансії',
        icon: <FiEdit />,
      },
      {
        name: 'replies',
        title: 'Заявки',
        icon: <RiChat1Line />,
      },
    ],
  },
  {
    title: 'Тестування магазину',
    links: [
      {
        name: 'shoptest',
        title: 'Магазин',
        icon: <BsShop />,
      },
    ],
  },
]

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
]


