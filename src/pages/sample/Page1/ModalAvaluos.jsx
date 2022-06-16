import {Button, Col, Form, Input, InputNumber, Modal} from 'antd';
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
  // const [montoEstimado, setMontoEstimado] = useState('');

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.setFieldsValue({...formData});
    } else {
      form.resetFields();
    }
  }, [formData]);

  // useEffect(() => {}, [montoEstimado]);

  const generateBarcode = () => {
    const ui = new ShortUniqueId({length: 10});
    return ui();
  };

  useEffect(() => {
    if (barcode === null || barcode === undefined) {
      setBarcodeState(generateBarcode());
    } else {
      setBarcodeState(barcode);
    }
  }, [barcode]);

  const onChangeMontoEstimado = (valorEstimado) => {
    form.setFieldsValue({
      montoConcedido: valorEstimado / 2,
      montoVenta: valorEstimado * 0.8,
    });
  };

  const handleSubmit = async (cerrar = false) => {
    try {
      await onFormSubmit();
      if (cerrar) {
        setBarcodeState(generateBarcode());
        saveAndClose({...form.getFieldsValue(), id: barcodeState});
        form.resetFields();
      } else {
        setBarcodeState(generateBarcode());
        save({...form.getFieldsValue(), id: barcodeState});
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
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
      forceRender
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
        {barcodeState && (
          <AppRowContainer justify={'center'}>
            <Col>
              <Barcode value={barcodeState}></Barcode>
            </Col>
          </AppRowContainer>
        )}
        <AppRowContainer>
          <Col span={24}></Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col span={8}>
            <Form.Item
              name='montoEstimado'
              rules={[
                {
                  required: true,
                  message: 'Campo obligatorio',
                },
              ]}
              label='Monto estimado'
              tooltip='Monto estimado por el valuador'>
              <InputNumber
                onChange={(e) => onChangeMontoEstimado(e)}
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
              name='montoConcedido'
              label='Monto concedido'
              tooltip='Valor que se concede por el articulo'>
              <InputNumber
                readOnly
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
              label='Monto de venta'
              name='montoVenta'
              tooltip='Valor estimado para ventas'>
              <InputNumber
                readOnly
                formatter={(value) => `Q${value}`}
                parser={(value) => value.replace('Q', '')}
              />
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
              name='observaciones'
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
