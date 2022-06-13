import {Button, Col, Form, Input, InputNumber, Modal, Select} from 'antd';
import {AppRowContainer} from '../../../@crema';
import TextArea from 'antd/es/input/TextArea';
import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ShortUniqueId from 'short-unique-id';
import Barcode from 'react-barcode';

const ModalAvaluos = ({
  isModalVisible,
  save,
  saveAndClose,
  handleCancel,
  barcode,
  formData,
}) => {
  const [form] = Form.useForm();
  const [barcodeState, setBarcodeState] = useState();

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.setFieldsValue({...formData});
    } else {
      form.resetFields();
    }
  }, [formData]);

  useEffect(() => {
    console.log('/*/*/  barcode');
    console.log(barcode);
    if (barcode === null || barcode === undefined) {
      const ui = new ShortUniqueId({length: 10});
      setBarcodeState(ui());
    } else {
      setBarcodeState(barcode);
    }
  }, [barcode]);

  const handleSubmit = async (cerrar = false) => {
    try {
      await onFormSubmit();
      if (cerrar) {
        saveAndClose({...form.getFieldsValue(), id: barcodeState});
        form.resetFields();
      } else {
        save({...form.getFieldsValue(), id: barcodeState});
        form.resetFields();
      }
    } catch (e) {
      alert('formulario no valido');
    }
  };

  const onFormSubmit = useCallback(async () => {
    try {
      await form.validateFields();
    } catch (errors) {
      throw new Error('Formulario invalido');
    }
  }, [form]);

  return (
    <Modal
      title={`Nuevo paquete - ${barcodeState}`}
      visible={isModalVisible}
      width={1000}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={() => {
            handleSubmit(true);
          }}>
          Guardar y cerrar
        </Button>,
        <Button
          key='link'
          type='primary'
          onClick={() => {
            handleSubmit(false);
          }}>
          Guardar y agregar otro
        </Button>,
      ]}>
      <Form form={form} layout='horizontal'>
        <AppRowContainer justify={'center'}>
          <Col>
            <Barcode value={barcodeState}></Barcode>
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
              ]}>
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
              tooltip='Valor que el cliente pide'>
              <InputNumber
                formatter={(value) => `Q${value}`}
                parser={(value) => value.replace('Q', '')}
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
                formatter={(value) => `Q${value}`}
                parser={(value) => value.replace('Q', '')}
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
                formatter={(value) => `Q${value}`}
                parser={(value) => value.replace('Q', '')}
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
              ]}>
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
              ]}>
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
              ]}>
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
  );
};

export default ModalAvaluos;
ModalAvaluos.propTypes = {
  isModalVisible: PropTypes.bool,
  save: PropTypes.func,
  saveAndClose: PropTypes.func,
  handleCancel: PropTypes.func,
  barcode: PropTypes.string,
  formData: PropTypes.object,
};
