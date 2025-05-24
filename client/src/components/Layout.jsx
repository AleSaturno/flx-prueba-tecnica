import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import AppBreadcrumb from './Breadcrumb';
import '../styles/theme.scss';

const { Content } = Layout;

const AppLayout = ({ children }) => (
  <Layout>
    <Header />
    <Content className="app-content">
      <AppBreadcrumb />
      {children}
    </Content>
  </Layout>
);

export default AppLayout;
