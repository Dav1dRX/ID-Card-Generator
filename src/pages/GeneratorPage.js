import React from 'react';
import Layout from '../components/layout/Layout';
import IDCardGenerator from '../components/idCard/IDCardGenerator';

const GeneratorPage = () => (
  <Layout>
    <h1 className="text-3xl font-bold text-center my-4">ID Card Generator</h1>
    <IDCardGenerator />
  </Layout>
);

export default GeneratorPage;