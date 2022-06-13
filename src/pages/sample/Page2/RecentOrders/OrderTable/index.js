import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';
import {Button, Modal} from 'antd';
import {MoreOutlined} from '@ant-design/icons';
import '../index.style.less';
import QueueAnim from 'rc-queue-anim';

const OrderTable = ({orderData}) => {
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Moroso': {
        return '#F84E4E';
      }
      case 'Pagado': {
        return '#43C888';
      }
      default: {
        return '#E2A72E';
      }
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (row, rowIndex) => {
    console.log(row);
    console.log(rowIndex);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span className='anChar'>{id}</span>,
    },
    {
      title: 'Producto',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Fecha de pago',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Monto',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className='badgeRoot'
          style={{
            color: getPaymentStatusColor(status),
            backgroundColor: getPaymentStatusColor(status) + '44',
          }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Button key={id} shape='circle' icon={<MoreOutlined />} />
      ),
    },
  ];
  return (
    <>
      <AppTableContainer
        className='orderTable'
        data={orderData}
        columns={columns}
        showModal={showModal}
      />
      <Modal
        title='Detalles de paquete'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <QueueAnim delay={300} type={['right', 'left']} leaveReverse>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
            architecto consequuntur culpa cupiditate deleniti ducimus ea et iure
            nihil odio officia, optio perspiciatis quas quod vero. Accusamus
            doloremque esse ex.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
            architecto consequuntur culpa cupiditate deleniti ducimus ea et iure
            nihil odio officia, optio perspiciatis quas quod vero. Accusamus
            doloremque esse ex.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
            architecto consequuntur culpa cupiditate deleniti ducimus ea et iure
            nihil odio officia, optio perspiciatis quas quod vero. Accusamus
            doloremque esse ex.
          </p>
        </QueueAnim>
      </Modal>
    </>
  );
};

export default OrderTable;

OrderTable.defaultProps = {
  orderData: [],
};

OrderTable.propTypes = {
  orderData: PropTypes.array,
};
