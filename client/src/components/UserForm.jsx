import React, { useContext, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { UserContext } from '../context/UserContext';
import * as api from '../services/api';


const { Option } = Select;

const UserForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { selectedUser, createUser, updateUser } = useContext(UserContext);

  // Precarga o limpia el form según si estamos editando o no
  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue(selectedUser);
    } else {
      form.resetFields();
    }
  }, [selectedUser, form]);

  const onFinish = async (values) => {
    if (selectedUser) {
      await updateUser({ ...selectedUser, ...values });
    } else {
      await createUser(values);
    }
    onSuccess();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      {/* Fila: Usuario | Email */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Usuario"
            name="username"
            rules={[
              { required: true, message: 'Ingresa el usuario' },
              { min: 3, max: 20, message: 'Entre 3 y 20 caracteres' },
              { pattern: /^[a-z0-9_.]+$/, message: 'Minúsculas, números, _ y .' }
            ]}
          >
            <Input placeholder="john.doe" maxLength={20} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Ingresa el email' },
              { type: 'email', message: 'Formato de email inválido' },
              { max: 50, message: 'Máximo 50 caracteres' },
              { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email debe tener “@” y dominio' },

              //Validador asíncrono para unicidad:
              ({getFieldValue}) => ({
                validator: async(_,value) =>{
                  if(!value) return Promise.resolve();
                  //Llama a tu servicio para ver si ya hay un usuario con ese email
                  const {items} = await api.getUsers({search:value});
                  const exists = items.some(u =>
                    u.email.toLowerCase() === value.toLowerCase() && u.id !==getFieldValue("id") 
                  );
                  if(exists){
                    return Promise.reject(new Error("Este email ya está registrado"));
                  }
                  return Promise.resolve();
                }
              })

            ]}
          >
            <Input placeholder="john.doe@example.com" maxLength={50} />
          </Form.Item>
        </Col>
      </Row>

      {/* Fila: Nombre | Apellido */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: 'Ingresa el nombre' },
              { min: 2, max: 30, message: 'Entre 2 y 30 caracteres' },
              { pattern: /^[A-Za-zÀ-ÿ\s]+$/, message: 'Sólo letras y espacios' }
            ]}
          >
            <Input placeholder="John" maxLength={30} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Apellido"
            name="lastname"
            rules={[
              { required: true, message: 'Ingresa el apellido' },
              { min: 2, max: 30, message: 'Entre 2 y 30 caracteres' },
              { pattern: /^[A-Za-zÀ-ÿ\s]+$/, message: 'Sólo letras y espacios' }
            ]}
          >
            <Input placeholder="Doe" maxLength={30} />
          </Form.Item>
        </Col>
      </Row>

      {/* Fila: Estado | Edad */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true, message: 'Selecciona el estado' }]}
          >
            <Select placeholder="Seleccione un estado">
              <Option value="active">Activo</Option>
              <Option value="inactive">Inactivo</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Edad"
            name="age"
            rules={[
              { required: true, message: 'Ingresa la edad' },
              {
                type: 'number',
                min: 1,
                max: 120,
                message: 'Entre 1 y 120',
                transform: val => (val ? Number(val) : val)
              }
            ]}
          >
            <Input type="number" placeholder="43" min={1} max={120} />
          </Form.Item>
        </Col>
      </Row>

      {/* Botón alineado a la derecha */}
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            {selectedUser ? 'Actualizar' : 'Agregar usuario'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
