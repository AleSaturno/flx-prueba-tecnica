import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { UserContext } from '../context/UserContext';

const { Option } = Select;

const UserForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { selectedUser, createUser, updateUser } = useContext(UserContext);

  useEffect(() => {
    if (selectedUser) form.setFieldsValue(selectedUser);
    else form.resetFields();
  }, [selectedUser, form]);

  const onFinish = async values => {
    if (selectedUser) {
      await updateUser({ ...selectedUser, ...values });
    } else {
      await createUser(values);
    }
    onSuccess();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Usuario"
        name="username"
        rules={[{ required: true, message: 'Ingresa el usuario' }]}
      >
        <Input placeholder="john.doe" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Ingresa el email' },
          { type: 'email', message: 'Email inválido' }
        ]}
      >
        <Input placeholder="john.doe@example.com" />
      </Form.Item>

      <div style={{ display: 'flex', gap: 16 }}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Ingresa el nombre' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="John" />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="lastname"
          rules={[{ required: true, message: 'Ingresa el apellido' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Doe" />
        </Form.Item>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: 'Selecciona el estado' }]}
          style={{ flex: 1 }}
        >
          <Select placeholder="Seleccione un estado">
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Edad"
          name="age"
          rules={[
            { required: true, message: 'Ingresa la edad' },
            {
              type: 'number',
              min: 0,
              message: 'Edad inválida',
              transform: val => (val ? Number(val) : val)
            }
          ]}
          style={{ flex: 1 }}
        >
          <Input type="number" placeholder="43" min={0} />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {selectedUser ? 'Actualizar' : 'Agregar usuario'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
