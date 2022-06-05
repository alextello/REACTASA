import React from 'react';
import NotificationsEcom from './Notifications';
import RecentOrders from './RecentOrders';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {Col} from 'antd';

const Page2 = () => {
  return (
    <>
      <AppRowContainer>
        <Col xs={24} lg={18} key={'e'}>
          <NotificationsEcom></NotificationsEcom>
        </Col>
        <Col xs={24} lg={18} key={'o'}>
          <RecentOrders></RecentOrders>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default Page2;
