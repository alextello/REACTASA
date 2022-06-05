import React from 'react';
import {Button, Menu, Dropdown} from 'antd';
import {MoreOutlined} from '@ant-design/icons';

const OrderActions = () => {
  const menu = (
    <Menu>
      <Menu.Item style={{fontSize: 14}}>Ver paquetes</Menu.Item>
      <Menu.Item style={{fontSize: 14}}>Editar</Menu.Item>
      {/*<Menu.Item style={{fontSize: 14}}>Delete</Menu.Item>*/}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type='circle'>
          <MoreOutlined />
        </Button>
      </Dropdown>
    </>
  );
};
export default OrderActions;
