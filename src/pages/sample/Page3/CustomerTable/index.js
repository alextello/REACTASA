import React from 'react';
import PropTypes from 'prop-types';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import {StarFilled} from '@ant-design/icons';
import OrderActions from './OrderActions';

const CustomerTable = ({customers, loading}) => {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastItem',
      key: 'lastItem',
    },
    {
      title: 'Ultimo paquete',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <span className='badge'>
          {rating} <StarFilled style={{fontSize: 12, marginLeft: 2}} />
        </span>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Direccion',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      className: 'customer-table-actions',
      fixed: 'right',
      render: () => <OrderActions />,
    },
  ];
  return (
    <AppTableContainer
      className='customer-table'
      hoverColor
      data={customers}
      columns={columns}
      loading={loading}
      scroll={{x: 'auto'}}
    />
  );
};

export default CustomerTable;

CustomerTable.defaultProps = {
  customers: [],
};

CustomerTable.propTypes = {
  customers: PropTypes.array,
  loading: PropTypes.bool,
};
