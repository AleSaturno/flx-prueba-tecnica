import React, { useContext } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UserContext } from '../context/UserContext';

const { Option } = Select;

const UserFilters = () => {
  const { updateFilters } = useContext(UserContext);

  return (
    <div className="filters" style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
      {/* Campo de búsqueda */}
      <Input
        placeholder="Buscar usuarios"
        allowClear
        onChange={e => updateFilters({ search: e.target.value })}
        onPressEnter={e => updateFilters({ search: e.target.value })}
        prefix={<SearchOutlined />}
        style={{ width: 240, borderRadius: 4 }}
      />

      {/* Filtro por estado */}
      <Select
        placeholder="Filtrar por estado"
        allowClear
        onChange={value => updateFilters({ status: value })}
        style={{ width: 180, borderRadius: 4 }}
      >
        <Option value="active">Activos</Option>
        <Option value="inactive">Inactivos</Option>
      </Select>
    </div>
  );
};

export default UserFilters;
