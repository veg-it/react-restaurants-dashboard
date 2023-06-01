/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

import { getOrders, getRestaurants, getProducts, getUsers } from '../api/index'

import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs'
import { MdOutlineSupervisorAccount } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RiStore2Line } from 'react-icons/ri'

const Ecommerce = () => {
  const { currentColor } = useStateContext();
  const [userCount, setUserCount] = useState()
  const [restaurantsCount, setRestaurantsCount] = useState()
  const [productsCount, setProductsCount] = useState()
  const [ordersCount, setOrdersCount] = useState()
  const [orderSumm, setOrdersSumm] = useState(0)
  const [error, setErrorMessage] = useState("")

  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: userCount,
      title: 'Юзерів',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: productsCount,
      title: 'Продуктів',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <AiOutlineShoppingCart />,
      amount: ordersCount,
      title: 'Замовлень',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',

      pcColor: 'green-600',
    },
    {
      icon: <RiStore2Line />,
      amount: restaurantsCount,
      title: 'Ресторанів',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ]

 

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUserCount(res.data.length);
      setErrorMessage("");
    } catch {
      setErrorMessage("An error occurred while fetching the users.");
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProductsCount(res.data.length);
      setErrorMessage("");
    } catch {
      setErrorMessage("An error occurred while fetching the products.");
    }
  }

  const fetchRestaurants = async () => {
    try {
      const res = await getRestaurants();
      setRestaurantsCount(res.data.length);
      setErrorMessage("");
    } catch {
      setErrorMessage("An error occurred while fetching the restaurants.");
    }
  }
  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrdersCount(res.data.orders.length);
      let summ = 0
      res.data.orders.map(order => summ = summ + order.sum )
      setOrdersSumm(summ)
      setErrorMessage("");
    } catch {
      setErrorMessage("An error occurred while fetching the orders.");
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchRestaurants();
    fetchProducts()
    fetchUsers()
  }, []);

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-72 px-8 py-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Заробіток</p>
              <p className="text-2xl">грн. {orderSumm}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Завантажити"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-2 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>

              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Ecommerce;
