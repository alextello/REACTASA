import {Button, Col, Modal, Select} from 'antd';
import PropTypes from 'prop-types';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {UserAddOutlined} from '@ant-design/icons';
import ModalAddCliente from './ModalAddCliente';
import {useEffect, useState} from 'react';

const ModalContrato = ({isVisible, handleCancel}) => {
  const {Option} = Select;
  const [isModalAddClienteVisisble, setIsModalAddClienteVisisble] =
    useState(false);

  const [clientes, setClientes] = useState([
    {
      value: '1221654890808 Jimena Sanchez',
      text: '1221654890808 Jimena Sanchez',
    },
    {
      value: '5413237940909 Rogelio Son',
      text: '5413237940909 Rogelio Son',
    },
    {
      value: '2660507940909 Juan Mendez',
      text: '2660507940909 Juan Mendez',
    },
  ]);

  useEffect(() => {}, []);

  const addClienteForm = ({cui, nombre}) => {
    setClientes((clientes) => [
      ...clientes,
      {value: `${cui} ${nombre}`, text: `${cui} ${nombre}`},
    ]);
    setIsModalAddClienteVisisble(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleCancelModalCliente = () => {
    setIsModalAddClienteVisisble(false);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const handleOk = () => {
    return false;
  };

  const addCliente = () => {
    setIsModalAddClienteVisisble(true);
  };
  return (
    <>
      <Modal
        visible={isVisible}
        onCancel={handleCancel}
        forceRender
        onOk={() => handleOk}
        okText={'Guardar'}
        cancelText={'Cancelar'}>
        <AppRowContainer style={{marginTop: '35px'}}>
          <Col span={20}>
            <Select
              style={{width: '100%'}}
              showSearch
              placeholder='Seleccione Cliente'
              optionFilterProp='children'
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }>
              {clientes.map((cl) => (
                <Option key={cl.value} value={cl.value}>
                  {cl.text}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Button type='primary' onClick={addCliente}>
              <UserAddOutlined />
            </Button>
          </Col>
        </AppRowContainer>
      </Modal>
      <ModalAddCliente
        isVisible={isModalAddClienteVisisble}
        handleCancel={handleCancelModalCliente}
        addCliente={addClienteForm}></ModalAddCliente>
    </>
  );
};

export default ModalContrato;
ModalContrato.propTypes = {
  isVisible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
  form: PropTypes.object,
  images: PropTypes.object,
};
