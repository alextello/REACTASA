import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import {Avatar, Modal} from 'antd';
import '../index.style.less';
import QueueAnim from 'rc-queue-anim';
const columns = [
  {
    title: 'No.',
    dataIndex: `id`,
    key: 'id',
    render: (id) => <span>{id}.</span>,
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <div className='deals-user-info'>
        <Avatar src={name.logo} />
        <div className='deals-user-info-content'>
          <h3>{name.name}</h3>
        </div>
      </div>
    ),
  },
  {
    title: 'Progreso',
    dataIndex: 'progress',
    key: 'progress',
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Monto',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Creado el',
    dataIndex: 'created',
    key: 'created',
  },
];
const DealsTable = ({dealsTableData}) => {
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

  return (
    <>
      <AppTableContainer
        hoverColor
        className='deals-table'
        data={dealsTableData}
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

export default DealsTable;

DealsTable.defaultProps = {
  dealsTableData: [],
};

DealsTable.propTypes = {
  dealsTableData: PropTypes.array,
};
