import React, {useCallback, useEffect, useState} from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {
  Modal,
  Button,
  Col,
  Input,
  InputNumber,
  Form,
  Select,
  Popconfirm,
} from 'antd';
import {AppRowContainer} from '../../../@crema';
import Deals from './Deals';
import Barcode from 'react-barcode';
import ShortUniqueId from 'short-unique-id';
import TextArea from 'antd/es/input/TextArea';
import {ArrowsAltOutlined, CloseOutlined} from '@ant-design/icons';
import useAsyncState from '../../../@crema/utility/useAsyncState';

const Page1 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUserVisible, setIsModalUserVisible] = useState(false);
  const [barcode, setBarcode] = useAsyncState('');
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  let id;

  useEffect(() => {
    console.log('entrando useefect')
    setCurrentItem({...form.getFieldsValue()});
  }, [items]);

  const [form] = Form.useForm();

  const showModal = async (e) => {
    if (e && e.id) {
      id = e.id;
      await setCurrentItem(e);
      form.setFieldsValue({...e});
    }
    generateBarCode();
    setIsModalVisible(true);
  };


  const generateBarCode = async () => {
    console.log('currentItem.id')
    if (!(currentItem.id !== '' && currentItem.id !== null && currentItem.id !== undefined)){
      console.log('entra if')
      const uid = new ShortUniqueId({length: 7, dictionary: 'number'});
      let code = uid();
      code = `${new Date()
        .getFullYear()
        .toString()
        .substring(2, 4)}P${new Date().getMonth()}${code}`;
      const ncode = await setBarcode(code);
      console.log(ncode);
    } else {
      console.log('entra else')
      const ncode = await setBarcode(currentItem.id);
      console.log(ncode);
    }
  };

  const eliminarItem = (e) => {
    const newItems = items.filter((it) => it.id !== e.id);
    setItems(newItems);
  };

  const save = async () => {
    form.submit();
    await onFormSubmit();
  };

  const saveAndClose = async () => {
    form.submit();
    await onFormSubmit();
    setIsModalVisible(false);
  };


  const onFormSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      const uid = new ShortUniqueId({length: 7, dictionary: 'number'});
      let code = uid();
      if (id) {
        let tmpItems = [...items];
        let tmpItemIndex = items.findIndex((it) => it.id === id);
        if (tmpItems > 0) {
          tmpItems[tmpItemIndex] = {...form.getFieldsValue(), id}
        }
        setItems([...tmpItems]);
      } else {
        setItems(items => [...items, {...form.getFieldsValue(), id: code}]);
      }
      id = null;
    //  form.resetFields();
    } catch (errors) {
      // alert('NO VALIDO');
      // console.log('errors')
      // console.log(errors)
      // Errors in the fields
    }
  }, [form]);

  const editItem = async (e) => {
    setCurrentItem({...e});
    form.setFieldsValue({...e});
    await showModal(e);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUserCancel = () => {
    setIsModalUserVisible(false);
  };

  return (
    <>
      <AppRowContainer>
        <Col span={24}>
          <AppCard title='Prendario'>
            <Button type='primary' onClick={showModal}>
              Avaluo de prendas
            </Button>
            <Modal
              title={`Nuevo paquete - ${barcode}`}
              visible={isModalVisible}
              width={1000}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={saveAndClose}>
                  Guardar y cerrar
                </Button>,
                <Button
                  key="link"
                  type="primary"
                  onClick={save}
                >
                  Guardar y agregar otro
                </Button>,
              ]}

            >
              <Form
                form={form}
                layout='horizontal'
                >
                <AppRowContainer justify={'center'}>
                  <Col>
                    <Barcode value={barcode}></Barcode>
                  </Col>
                </AppRowContainer>
                <AppRowContainer>
                  <Col span={24}></Col>
                </AppRowContainer>
                <AppRowContainer gutter={[16, 2]}>
                  <Col span={24}>
                    <Form.Item
                      required
                      label='Cantidad'
                      name='cantidad'
                      rules={[
                        {
                          required: true,
                          message: 'Campo obligatorio',
                        },
                      ]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                  </Col>
                </AppRowContainer>
                <AppRowContainer>
                  <Col span={8}>
                    <Form.Item
                      name='montoRequerido'
                      rules={[
                        {
                          required: true,
                          message: 'Campo obligatorio',
                        },
                      ]}
                      label='Monto requerido'
                      tooltip='Valor que el cliente pide'
                    >
                      <InputNumber
                        formatter={value => `Q${value}`}
                        parser={value => value.replace('Q', '')}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Campo obligatorio',
                        },
                      ]}
                      name='montoEstimado'
                      label='Monto estimado'
                      tooltip='Valor en el que se estima el articulo'>
                      <InputNumber
                        formatter={value => `Q${value}`}
                        parser={value => value.replace('Q', '')}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Campo obligatorio',
                        },
                      ]}
                      label='Monto ofrecido'
                      name='montoOfrecido'
                      tooltip='Valor ofrecido al cliente por el articulo'>
                      <InputNumber
                        formatter={value => `Q${value}`}
                        parser={value => value.replace('Q', '')}
                      />
                    </Form.Item>
                  </Col>
                </AppRowContainer>
                <AppRowContainer>
                  <Col span={24}>
                    <Form.Item
                      label='Plazo'
                      name='plazo'
                      required
                      rules={[
                        {
                          required: true,
                          message: 'Campo obligatorio',
                        },
                      ]}
                    >
                      <Select allowClear={true}>
                        <Select.Option value='1 mes'>1 mes</Select.Option>
                        <Select.Option value='2 mes'>2 mes</Select.Option>
                        <Select.Option value='3 mes'>3 mes</Select.Option>
                        <Select.Option value='6 mes'>6 mes</Select.Option>
                        <Select.Option value='1 anio'>1 año</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </AppRowContainer>
                <AppRowContainer>
                  <Col span={24}>
                    <Form.Item
                      label='Nombre del articulo'
                      name='nombre'
                      required
                      rules={[
                        {
                          required: true,
                          message: 'Campo obligatorio',
                        },
                      ]}
                    >
                      <Input></Input>
                    </Form.Item>
                  </Col>
                </AppRowContainer>
                <AppRowContainer>
                  <Col span={24}>
                    <Form.Item
                      label='Descripcion'
                      required
                      name='descripcion'
                      tooltip='Descripcion del articulo'
                      rules={[
                        {
                          required: true,
                          message: 'Campo obligatorio',
                        },
                      ]}
                    >
                      <TextArea
                        size='large'
                        style={{width: '100%'}}
                        allowClear={true}></TextArea>
                    </Form.Item>
                  </Col>
                </AppRowContainer>
                <AppRowContainer>
                  <Col span={24}>
                    <Form.Item
                      label='Observaciones'
                      tooltip='Detalles a resaltar del articulo'>
                      <TextArea
                        size='large'
                        allowClear={true}
                        style={{width: '100%'}}></TextArea>
                    </Form.Item>
                  </Col>
                </AppRowContainer>
              </Form>
            </Modal>
          </AppCard>
        </Col>
      </AppRowContainer>
      {items.length > 0  &&
        <AppRowContainer>
          <Col span={24}>
            <AppCard title={'Articulos de paquete'}>
              <AppRowContainer>
                {items.map((e, i) => {
                  return (
                    <Col key={i}>
                      <AppCard
                        title={e.nombre}
                        bordered={true}
                        extra={
                          <>
                            <Popconfirm
                              placement='topLeft'
                              title='¿Seguro?'
                              onConfirm={() => eliminarItem(e)}
                              okText='Sí'
                              cancelText='No'>
                              <Button className='close-btn'>
                                <CloseOutlined />
                              </Button>
                            </Popconfirm>
                            <Button className='close-btn' onClick={() => editItem(e)}>
                              <ArrowsAltOutlined />
                            </Button>
                          </>
                        }
                      />
                    </Col>
                  );
                })}
              </AppRowContainer>
            </AppCard>
          </Col>
        </AppRowContainer>
      }
      <AppRowContainer>
        <Col span={24}>
          <Deals></Deals>
        </Col>
      </AppRowContainer>
      <Modal
        title={`Registrar usuario`}
        visible={isModalUserVisible}
        onOk={save}
        onCancel={handleUserCancel}>
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
