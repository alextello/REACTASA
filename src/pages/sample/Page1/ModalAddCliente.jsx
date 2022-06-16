import PropTypes from 'prop-types';
import {Form, Input, Modal} from 'antd';

const ModalAddCliente = ({isVisible, handleCancel, addCliente}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    addCliente(form.getFieldsValue());
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
          name='nombre'
          rules={[
            {required: true, message: 'Por favor ingrese su nombre completo!'},
          ]}>
          <Input placeholder='Nombre Completo' />
        </Form.Item>

        <Form.Item
          name='edad'
          rules={[{required: true, message: 'Por favor ingrese su edad!'}]}>
          <Input placeholder='Edad' />
        </Form.Item>

        <Form.Item
          name='estadoCivil'
          rules={[
            {required: true, message: 'Por favor ingrese su estado civil!'},
          ]}>
          <Input placeholder='Estado Civil' />
        </Form.Item>

        <Form.Item
          name='profesion'
          rules={[
            {required: true, message: 'Por favor ingrese su profesión!'},
          ]}>
          <Input placeholder='Profesión' />
        </Form.Item>

        <Form.Item
          name='cui'
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su Código Único de Identificación!',
            },
          ]}>
          <Input placeholder='Código ünico de Identificación' />
        </Form.Item>

        <Form.Item
          name='residencia'
          rules={[
            {required: true, message: 'Por favor ingrese su residencia!'},
          ]}>
          <Input.TextArea placeholder='Residencia' />
        </Form.Item>

        <Form.Item
          name='telefono'
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su número de teléfono!',
            },
          ]}>
          <Input.TextArea placeholder='Teléfono' />
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
