import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';

import AppSelect from '../../../../@crema/core/AppSelect';
import OrderTable from './OrderTable';
import './index.style.less';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const RecentOrders = ({recentOrders}) => {
  recentOrders =  [
    {
      id: '#SK231',
      customer: 'Juan Mendez',
      product: 'Bicicleta',
      date: '08-21-2020',
      paymentType: 'COD',
      price: '$125',
      status: 'Moroso',
    },
    {
      id: '#SK232',
      customer: 'Victor Juarez',
      date: '08-12-2020',
      product: 'Tennis Adidas',
      paymentType: 'Prepaid',
      price: '$100',
      status: 'Pagado',
    },
    {
      id: '#SK233',
      customer: 'Moises Estrada',
      date: '07-30-2020',
      product: 'Chaqueta de cuero',
      price: '$1,020',
      paymentType: 'Prepaid',
      status: 'Desembolso pendiente',
    },
    {
      id: '#SK234',
      customer: 'Marisol Garcia',
      date: '08-12-2020',
      product: 'Vajilla',
      paymentType: 'Prepaid',
      price: '$100',
      status: 'Pagado',
    },
  ];
  const {messages} = useIntl();
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };
  return (
    <AppCard
      className='no-card-space-ltr-rtl'
      title={messages['eCommerce.recentOrders.demo']}
      extra={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek.demo'],
            messages['dashboard.lastWeeks.demo'],
            messages['dashboard.lastMonth.demo'],
          ]}
          defaultValue={messages['dashboard.thisWeek.demo']}
          onChange={handleSelectionType}
        />
      }>
      <OrderTable orderData={recentOrders} />
    </AppCard>
  );
};

export default RecentOrders;

RecentOrders.propTypes = {
  recentOrders: PropTypes.array,
};
