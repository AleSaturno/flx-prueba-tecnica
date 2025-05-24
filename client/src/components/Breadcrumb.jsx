import React from 'react';
import { Breadcrumb } from 'antd';
import '../styles/theme.scss';

const AppBreadcrumb = () => (
  <Breadcrumb className="app-breadcrumb">
    <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
    <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
  </Breadcrumb>
);

export default AppBreadcrumb;
