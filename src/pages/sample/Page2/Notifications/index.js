import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import NotificationCell from './NotificationCell';
import {List} from 'antd';
import './index.style.less';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppMenu from '../../../../@crema/core/AppMenu';
import AppScrollbar from '../../../../@crema/core/AppScrollbar';

const NotificationsEcom = () => {
  const notifications = [
    {
      id: 10001,
      image: '/assets/images/avatar/A1.jpg',
      name: 'Angelina Joew',
      type: 'NUEVO INGRESO',
      message: 'Ingreso una nueva prenda',
    },
    {
      id: 10002,
      image: '/assets/images/avatar/A2.jpg',
      name: 'John Mathew',
      type: 'TRASLADO A VENTA',
      message: 'Traslado producto a venta',
    },
    {
      id: 10003,
      image: '/assets/images/avatar/A3.jpg',
      name: 'George Bailey',
      type: 'NUEVO INGRESO',
      message: 'Ingreso una nueva prenda',
    },
    {
      id: 10004,
      image: '/assets/images/avatar/A4.jpg',
      name: 'Maria Lee',
      type: 'DEVOLUCION',
      message: 'Devolvio un paquete a cliente',
    },
    {
      id: 10005,
      image: '/assets/images/avatar/A2.jpg',
      name: 'John Mathew',
      type: 'NUEVO INGRESO',
      message: 'Ingreso una nueva prenda',
    },
    {
      id: 10006,
      image: '/assets/images/avatar/A3.jpg',
      name: 'George Bailey',
      type: 'DEVOLUCION',
      message: 'Devolvio un paquete a cliente',
    },
    {
      id: 10007,
      image: '/assets/images/avatar/A4.jpg',
      name: 'Maria Lee',
      type: 'TRASLADO A VENTA',
      message: 'Traslado producto a venta',
    },
    {
      id: 10008,
      image: '/assets/images/avatar/A2.jpg',
      name: 'John Mathew',
      type: 'NUEVO INGRESO',
      message: 'Ingreso una nueva prenda',
    },
    {
      id: 10009,
      image: '/assets/images/avatar/A3.jpg',
      name: 'George Bailey',
      type: 'DEVOLUCION',
      message: 'Devolvio un paquete a cliente',
    },
  ];
  const {messages} = useIntl();
  return (
    <AppCard
      className='no-card-space-ltr-rtl'
      title={messages['eCommerce.notifications.demo']}
      extra={<AppMenu />}>
      <AppScrollbar className='notification-scrollBar'>
        <List
          itemLayout='horizontal'
          dataSource={notifications}
          renderItem={(item) => <NotificationCell key={item.id} item={item} />}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default NotificationsEcom;

NotificationsEcom.propTypes = {
  notifications: PropTypes.array,
};
