import React, {useState} from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {Modal, Button, Col, Input, InputNumber, Select, Form, Row} from 'antd';
import {
  DeleteOutlined,
  PlusCircleOutlined, UserAddOutlined,
} from '@ant-design/icons';
import {AppRowContainer} from '../../../@crema';
import Deals from './Deals';
import Barcode from 'react-barcode';
import ShortUniqueId from 'short-unique-id';
const { Option } = Select;

const Page1 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUserVisible, setIsModalUserVisible] = useState(false);
  const [items, setItems] = useState([{}]);
  const [barcode, setBarcode] = useState('');

  const showModal = () => {
    generateBarCode();
    setIsModalVisible(true);
  };

  const showModalUser = () => {
    setIsModalUserVisible(true);
  };

  const generateBarCode = () => {
    const uid = new ShortUniqueId({ length: 7, dictionary: 'number' });
    let code = uid();
    code = `${new Date().getFullYear().toString().substring(2, 4)}P${new Date().getMonth()}${code}`;
    setBarcode(code);
  }
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleUserOk = () => {
    setIsModalUserVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUserCancel = () => {
    setIsModalUserVisible(false);
  };

  const addItem = () => {
    setItems([...items, {}]);
  }

  const removeItem = (i) => {
    const nItems = [...items];
    nItems.splice(i, 1);
    setItems(nItems);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <>
      <AppRowContainer>
        <Col span={24}>
          <AppCard title="Prendario">
            <Button type="primary" onClick={showModal}>
              Registrar paquete
            </Button>
            <Modal title={`Nuevo paquete - ${barcode}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <AppRowContainer justify={'center'}>
                <Col>
                  <Barcode value={barcode}></Barcode>
                </Col>
              </AppRowContainer>
              <AppRowContainer justify="end">
                <Col>
                  <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} size="large"  style={{float: 'right'}} onClick={addItem} />
                </Col>
              </AppRowContainer>
              <AppRowContainer>
                <Col span={24}>
                  <Form
                    form={form}
                    layout='inline'
                    initialValues={{
                      requiredMarkValue: requiredMark,
                    }}
                    onValuesChange={onRequiredTypeChange}
                    requiredMark={requiredMark}
                  >
                    <Row gutter={24}>
                      <Col span={20} >
                        <Form.Item
                          label='Persona'
                          required
                          tooltip='Este es un campo requerido'>
                          <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                           >
                            <Option value="123507940909 - Alejandro Gonzales">123507940909 Alejandro Gonzales</Option>
                            <Option value="556403940909 - Lucia Vasquez"> 556403940909 Lucia Vasquez</Option>
                            <Option value="844565079409 - Tomas Lopez">844565079409 Tomas Lopez</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4} >
                        <Button
                            type="primary"
                            icon={<UserAddOutlined />}
                            onClick={showModalUser}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </AppRowContainer>
              {items.map((it, i) => (
                <AppRowContainer key={i} gutter={[16, 16]}>
                  <Col>
                    <InputNumber min={1} defaultValue={1} />
                  </Col>
                  <Col>
                    <Input placeholder="Descripcion" />
                  </Col>
                  <Col>
                    <Button type="primary" danger icon={<DeleteOutlined />} size="large"  style={{float: 'right'}} onClick={() => removeItem(i)} />
                  </Col>
                </AppRowContainer>
              ))}
            </Modal>
          </AppCard>
        </Col>
      </AppRowContainer>
      <AppRowContainer>
        <Col span={24}>
          <Deals></Deals>
        </Col>
      </AppRowContainer>
      <Modal title={`Registrar usuario`} visible={isModalUserVisible} onOk={handleUserOk} onCancel={handleUserCancel}>
        <Form>
          <Form.Item label={'Nombres'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Apellidos'}>
            <Input />
          </Form.Item>
          <Form.Item label={'CUI'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Direccion'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Telefono'}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Page1;
