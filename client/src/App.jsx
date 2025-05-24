import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AppLayout from './components/Layout';
import UserFilters from './components/UserFilters';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Loader from './components/Loader';

import { UserContext } from './context/UserContext';

const App = () => {
  const {
    loading,
    fetchUsers,
    selectedUser,
    setSelectedUser,
    clearSelectedUser
  } = useContext(UserContext);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openCreateModal = () => {
    clearSelectedUser();
    setModalVisible(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    clearSelectedUser();
    setModalVisible(false);
  };

  return (
    <AppLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <UserFilters />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
        >
          Agregar usuario
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <UserList onEdit={openEditModal} />
      )}

      <Modal
        title={selectedUser ? 'Editar usuario' : 'Agregar usuario'}
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        width={600}
        bodyStyle={{padding:"24px"}}
      >
        <UserForm onSuccess={closeModal} />
      </Modal>
    </AppLayout>
  );
};

export default App;
