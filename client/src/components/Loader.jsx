import React from 'react';
import { Spin } from 'antd';

const Loader = () => (
  <div style={{ textAlign: 'center', padding: 24 }}>
    <Spin size="large" />
  </div>
);

export default Loader;
