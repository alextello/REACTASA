import PropTypes from 'prop-types';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import {MaskedInput} from 'antd-mask-input';

const ModalAddCliente = ({isVisible, handleCancel, addCliente}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    addCliente(form.getFieldsValue());
    //alert(JSON.stringify(form.getFieldsValue(), null, 2));
    form.resetFields();
  };

  return (
    <Modal
      width={1000}
      visible={isVisible}
      title='Crear cliente'
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelText={'Cancelar'}
      okText={'Guardar'}>
      <Form className='edit-customer-form' name='basic' form={form}>
        <Form.Item
          label='Nombre completo'
          name='nombreCompleto'
          rules={[
            {required: true, message: 'Por favor ingrese su nombre completo!'},
          ]}>
          <Input placeholder='Nombre Completo' />
        </Form.Item>

        <Form.Item
          label='Edad'
          name='edad'
          rules={[{required: true, message: 'Por favor ingrese su edad!'}]}>
          <InputNumber placeholder='Edad' />
        </Form.Item>

        <Form.Item
          label='Estado civil'
          name='estadoCivil'
          rules={[
            {required: true, message: 'Por favor ingrese su estado civil!'},
          ]}>
          <Select placeholder='Estado civil'>
            <Select.Option value='soltero'>Soltero</Select.Option>
            <Select.Option value='casado'>Casado</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Profesion'
          name='profesion'
          rules={[
            {required: true, message: 'Por favor ingrese su profesión!'},
          ]}>
          <Input placeholder='Profesión' />
        </Form.Item>

        <Form.Item
          label='CUI'
          name='cui'
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su Código Único de Identificación!',
            },
          ]}>
          <MaskedInput
            mask={'0000 00000 0000'}
            name='cui'
            placeholder='3333-3333'
          />
        </Form.Item>

        <Form.Item
          label='Residencia'
          name='residencia'
          rules={[
            {required: true, message: 'Por favor ingrese su residencia!'},
          ]}>
          <Input.TextArea placeholder='Residencia' />
        </Form.Item>

        <Form.Item
          label='Telefono'
          name='telefono'
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su número de teléfono!',
            },
          ]}>
          <MaskedInput
            mask={'0000 0000'}
            name='Telefono'
            placeholder='3333-3333'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCliente;
ModalAddCliente.propTypes = {
  isVisible: PropTypes.bool,
  handleCancel: PropTypes.func,
  addCliente: PropTypes.func,
};
