import React, { useContext, useState } from 'react';
import { Table, Button, Tag, Space, Modal, Typography } from 'antd';
import { UserContext } from '../context/UserContext';

const { Text, Paragraph } = Typography;

const UserList = ({ onEdit }) => {
  const {
    users,
    loading,
    total,
    filters,
    deleteUser,
    changePage
  } = useContext(UserContext);

  // Estado para controlar el modal de borrado
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Abrir modal y guardar usuario
  const showDeleteModal = user => {
    setUserToDelete(user);
    setDeleteModalVisible(true);
  };

  // Confirmar borrado
  const handleDeleteOk = async () => {
    await deleteUser(userToDelete.id);
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

  // Cancelar borrado
  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

  const columns = [
    { title: 'Usuario',  dataIndex: 'username',  key: 'username' },
    { title: 'Nombre',   dataIndex: 'name',      key: 'name' },
    { title: 'Apellido', dataIndex: 'lastname',  key: 'lastname' },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: s => (
        <Tag color={s === 'active' ? 'green' : 'red'}>
          {s === 'active' ? 'Activo' : 'Inactivo'}
        </Tag>
      )
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, rec) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(rec)}>Editar</Button>
          <Button type="link" danger onClick={() => showDeleteModal(rec)}>
            Eliminar
          </Button>
        </Space>
      )
    }
  ];

  return (
    <>
      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={{
          total,
          current: Math.floor(filters.offset / filters.limit) + 1,
          pageSize: filters.limit,
          showSizeChanger: true,
          pageSizeOptions: ['5','10','20'],
          onChange: changePage
        }}
        locale={{ emptyText: 'No hay usuarios' }}
      />

            <Modal
  title="Eliminar usuario"
  className='delete-user-modal'
  visible={isDeleteModalVisible}
  onOk={handleDeleteOk}
  onCancel={handleDeleteCancel}
  centered
  width={480}
  bodyStyle={{ padding: '16px 24px' }}
  footer={[
    <Button key="cancel" style={{
      top:"10px"
    }} onClick={handleDeleteCancel}>
      Cancelar
    </Button>,
    <Button
      key="delete"
      type="primary"
      style={{
        backgroundColor: '#ff4d4f',
        borderColor:     '#ff4d4f',
        color:           '#fff',
        top:              "10px"
      }}
      onClick={handleDeleteOk}
    >
      Eliminar
    </Button>
  ]}
>
  <Paragraph>
    ¿Está seguro que quiere eliminar el usuario{' '}
    <Text type="danger">@{userToDelete?.username}</Text>?
  </Paragraph>
</Modal>

    </>
  );
};

export default UserList;
