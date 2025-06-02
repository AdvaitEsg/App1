// src/pages/ESGUnifiedForm.js
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, DatePicker, Divider, Typography, message as antdMessage } from 'antd';
import { Table } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const ESGUnifiedForm = () => {
  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);
  const [units, setUnits] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [unitTotals, setUnitTotals] = useState({});

  // Fetch all data on mount
    const fetchAllData = async () => {
    try {
      const [companiesRes, unitsRes, metricsRes] = await Promise.all([
        axios.get('/api/companies/'),
        axios.get('/api/units/'),
        axios.get('/api/metrics/')
      ]);
      setCompanies(Array.isArray(companiesRes.data) ? companiesRes.data : companiesRes.data.results || []);
      setUnits(Array.isArray(unitsRes.data) ? unitsRes.data : unitsRes.data.results || []);
      setMetrics(Array.isArray(metricsRes.data) ? metricsRes.data : metricsRes.data.results || []);
    } catch (err) {
      antdMessage.error('Failed to fetch data from backend.');
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Join data for table
  useEffect(() => {
  const rows = metrics.map(metric => {
    const unit = units.find(u => u.id === metric.business_unit);
    const company = unit ? companies.find(c => c.id === unit.company) : null;
    return {
      key: metric.id,
      company: company ? company.name : 'N/A',
      unit: unit ? unit.name : 'N/A',
      metric: metric.name,
      value: metric.value,
      year: metric.year,
      unitValue: metric.unit,
    };
  });
  setTableData(rows);

  // Calculate totals by unit
  const totals = {};
  rows.forEach(row => {
    if (!totals[row.unitValue]) {
      totals[row.unitValue] = 0;
    }
    totals[row.unitValue] += Number(row.value) || 0;
  });
  setUnitTotals(totals);
}, [companies, units, metrics]);
    
  const handleFinish = async (values) => {
    try {
      // 1. Create Company
      const companyRes = await axios.post('/api/companies/', {
        ...values.company,
        reporting_period: values.company.reporting_period.format('YYYY-MM-DD'),
      });
      const companyId = companyRes.data.id;

      // 2. Create Business Unit with company ID
      const unitRes = await axios.post('/api/units/', {
        ...values.unit,
        company: companyId,
      });
      const unitId = unitRes.data.id;

      // 3. Create Metric with unit ID
      await axios.post('/api/metrics/', {
        ...values.metric,
        business_unit: unitId,
      });

    antdMessage.success('All data submitted successfully!');
    form.resetFields();
    await fetchAllData();
    } catch (err) {
      antdMessage.error(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        'Submission failed. Please check your data and try again.'
      );
    }
  };
   const columns = [
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Business Unit', dataIndex: 'unit', key: 'unit' },
    { title: 'Metric', dataIndex: 'metric', key: 'metric' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Unit', dataIndex: 'unitValue', key: 'unitValue' },
  ];

  return (
    <div style={{ maxWidth: 700, margin: '100px auto', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
      <Title level={2} style={{ textAlign: 'center',marginTop: '40px' }}>Company Data</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          company: { sector: 'ENERGY' }
        }}
        style={{ background: 'rgba(10,15,20,0.5)', border: '2px solid #222', padding: 24, borderRadius: 8 }}
      >
        <Divider orientation="left">  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Company</span></Divider>
        <Form.Item label="Name" name={['company', 'name']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Location" name={['company', 'location']} rules={[{ required: true }]}> 
          <Input />
        </Form.Item>
        <Form.Item label="Sector" name={['company', 'sector']} rules={[{ required: true }]}> 
          <Select>
            <Option value="ENERGY">Energy</Option>
            <Option value="TECH">Technology</Option>
            <Option value="FIN">Financial</Option>
            <Option value="MANU">Manufacturing</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Reporting Period" name={['company', 'reporting_period']} rules={[{ required: true }]}> 
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Operational Location" name={['company', 'operational_location']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Primary Activity" name={['company', 'primary_activity']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Divider orientation="left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Business Designation</span></Divider>
        <Form.Item label="Unit Designation" name={['unit', 'name']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Divider orientation="left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Metrics Of Work</span></Divider>
        <Form.Item label="Metric Name" name={['metric', 'name']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Value (per year)" name={['metric', 'value']} rules={[{ required: true }]}> 
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Year" name={['metric', 'year']} rules={[{ required: true }]}> 
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Unit" name={['metric', 'unit']} rules={[{ required: true }]}> 
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', }}>
            Submit All Data
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 40, }}>
        <Table
          className="my-custom-table"
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
          title={() => 'OUR PARTNERS'}
        />
      </div>
       <div style={{ marginTop: 40, marginBottom: 24, background: '#222', color: '#fff', padding: 16, borderRadius: 8 }}>
        <strong>Total Value by Unit:</strong>
        <ul style={{ marginTop: 8 }}>
          {Object.entries(unitTotals).map(([unit, total]) => (
            <li key={unit}>
              {unit}: {total}
            </li>
         ))}
        </ul>
      </div>
    </div>
  );
};

export default ESGUnifiedForm;