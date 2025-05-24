import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers]             = useState([]);
  const [loading, setLoading]         = useState(false);
  const [total, setTotal]             = useState(0);
  const [filters, setFilters]         = useState({
    search: '',
    status: 'all',
    limit: 10,
    offset: 0
  });
  const [selectedUser, setSelectedUser] = useState(null);

  // GET list
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { items, total: t } = await api.getUsers(filters);
      setUsers(items);
      setTotal(t);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // CREATE
  const createUser = useCallback(async (data) => {
    setLoading(true);
    try {
      await api.createUser(data);
      await fetchUsers();
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  // UPDATE
  const updateUser = useCallback(async (data) => {
    setLoading(true);
    try {
      await api.updateUser(data);
      await fetchUsers();
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  // DELETE
  const deleteUser = useCallback(async (id) => {
    setLoading(true);
    try {
      await api.deleteUser(id);
      await fetchUsers();
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  // Pagination
  const changePage = useCallback((page, pageSize) => {
    setFilters(prev => ({
      ...prev,
      limit: pageSize,
      offset: (page - 1) * pageSize
    }));
  }, []);

  // Search / filter
  const updateFilters = useCallback(opts => {
    setFilters(prev => ({ ...prev, ...opts, offset: 0 }));
  }, []);

  // Clear selection (for “Crear”)
  const clearSelectedUser = useCallback(() => {
    setSelectedUser(null);
  }, []);

  return (
    <UserContext.Provider value={{
      users,
      loading,
      total,
      filters,
      selectedUser,
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
      changePage,
      updateFilters,
      setSelectedUser,
      clearSelectedUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
