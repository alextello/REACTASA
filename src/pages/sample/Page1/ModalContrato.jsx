import {Button, Col, Modal, Select} from 'antd';
import PropTypes from 'prop-types';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import {UserAddOutlined} from '@ant-design/icons';
import ModalAddCliente from './ModalAddCliente';
import {useEffect, useState} from 'react';
//import axios from '@crema/services/ApiConfig';
import axios from 'axios';
import FileDownload from 'js-file-download';

const ModalContrato = ({isVisible, handleCancel, formData}) => {
  const {Option} = Select;
  let form = {};
  const [isModalAddClienteVisisble, setIsModalAddClienteVisisble] =
    useState(false);
  const [deudor, setDeudor] = useState('');
  const [clientes, setClientes] = useState([
    {
      nombreCompleto: 'Jimena Sanchez',
      fechaNacimiento: '1985-02-15',
      estadoCivil: 'soltera',
      profesion: 'Ama de casa',
      cui: '1221654890808',
      residencia: '3ra av. 6-80',
      telefono: '58641257',
      text: '1221654890808 Jimena Sanchez',
    },
    {
      nombreCompleto: 'Rogelio Son',
      fechaNacimiento: '1960-02-15',
      estadoCivil: 'soltero',
      profesion: 'Carpintero',
      cui: '5413237940909',
      residencia: '5ta calle 8-20',
      telefono: '52187954',
      text: '5413237940909 Rogelio Son',
    },
    {
      nombreCompleto: 'Jimena Sanchez',
      fechaNacimiento: '1990-02-15',
      estadoCivil: 'soltera',
      profesion: 'Agricultora',
      cui: '2569854511212',
      residencia: '5ta calle 8-20',
      telefono: '35489752',
      text: '2569854511212 Jimena Sanchez',
    },
  ]);

  const addClienteForm = ({cui, nombreCompleto}) => {
    setClientes((clientes) => [
      ...clientes,
      {value: `${cui} ${nombreCompleto}`, text: `${cui} ${nombreCompleto}`},
    ]);
    setIsModalAddClienteVisisble(false);
  };

  useEffect(() => {
    const cliente = clientes.filter((cl) => cl.cui === deudor);
    form = {
      clientes: [{...cliente}],
      garantias: [
        ...formData.map((dt) => ({
          producto: dt.nombre,
          precio: dt.montoConcedido,
        })),
      ],
      cantidad: formData.reduce((acc, it) => acc + it.montoConcedido, 0),
    };
  }, [deudor]);

  const onChange = (value) => {
    setDeudor(value);
    console.log(`selected ${value}`);
  };

  const handleCancelModalCliente = () => {
    setIsModalAddClienteVisisble(false);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const handleOk = () => {
    console.log(form);
    // alert(JSON.parse(form, null, 2));
    axios({
      url: 'http://localhost:3000/contrato/crear',
      method: 'POST',
      responseType: 'blob', // Important
      data: {...form},
    }).then((response) => {
      FileDownload(response.data, 'CONTRATO.docx');
    });
    // return false;
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
        onOk={handleOk}
        okText={'Guardar'}
        cancelText={'Cancelar'}>
        <AppRowContainer style={{marginTop: '35px'}}>
          <Col span={20}>
            <Select
              style={{width: '100%'}}
              showSearch
              placeholder='Seleccione Cliente'
              optionFilterProp='children'
              value={deudor}
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }>
              {clientes.map((cl) => (
                <Option key={cl.cui} value={cl.cui}>
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
  formData: PropTypes.array,
  images: PropTypes.object,
};
