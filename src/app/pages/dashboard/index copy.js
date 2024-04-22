/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import {
  Flex,
  Typography,
  Form,
  Input,
  Checkbox,
  Select,
} from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;

function Dashboard() {
  const [form] = Form.useForm();
  const [billOutput, setBillOutput] = useState({
    k1: 0,
    k2: 0,
    k3: 0,
    balance: 0,
  });
  const [showBalance, setShowBalance] = useState(0);
  const handleChanges = (_, allValues) => {
    localStorage.setItem('inputValues', JSON.stringify(allValues));
    const importRate = process.env.REACT_APP_IMPORT_UNIT_PRICE;
    const exportRate = process.env.REACT_APP_EXPORT_UNIT_PRICE;
    const nepraRate = process.env.REACT_APP_NEPRA_PRICE;
    const {
      month, lastImport, lastExport, isBalance, lastBalance, importValue, exportValue,
    } = allValues;
    const isUnderQuarter = month % 3;
    const balanceVal = isUnderQuarter && isBalance ? lastBalance : 0;
    const unitsImport = importValue - lastImport;
    const unitsExport = exportValue - lastExport;
    const k2Units = unitsImport < unitsExport ? unitsImport : unitsExport;
    const k3Calc = unitsImport / unitsExport > 0.4
      ? unitsExport - unitsImport < 0
        ? 0
        : unitsExport - unitsImport
      : unitsExport - (unitsExport * 0.4);

    const k3Units = Math.round(k3Calc);
    const k1Amount = Math.round(unitsImport * importRate);
    const k2Amount = Math.round(k2Units * exportRate);
    const k3Amount = Math.round(k3Units * nepraRate);
    setBillOutput({
      k1: unitsImport,
      k2: k2Units,
      k3: k3Units,
      k1Amount,
      k2Amount,
      k3Amount,
      balance: Number(k1Amount) - (Number(balanceVal) + Number(k2Amount) + Number(k3Amount)),
      isUnderQuarter,
    });
  };
  useEffect(() => {
    const values = localStorage.getItem('inputValues');
    form.setFieldsValue(JSON.parse(values));
  }, []);
  return (
    <Flex>
      <Form
        form={form}
        layout="vertical"
        requiredMark
        onValuesChange={handleChanges}
      >
        <Flex vertical>
          <Flex><Title level={2}>From Last month Bill</Title></Flex>
          <Form.Item
            label="Last Month"
            name="month"
            required
            rules={[{ required: true, message: 'Please Select Month' }]}
          >
            <Select
              placeholder="Select Month"
              options={[
                { value: '1', label: 'Jan' },
                { value: '2', label: 'Feb' },
                { value: '3', label: 'Mar' },
                { value: '4', label: 'Apr' },
                { value: '5', label: 'May' },
                { value: '6', label: 'Jun' },
                { value: '7', label: 'Jul' },
                { value: '8', label: 'Aug' },
                { value: '9', label: 'Sep' },
                { value: '10', label: 'Oct' },
                { value: '11', label: 'Nov' },
                { value: '12', label: 'Dec' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Current Reading from K-1"
            name="lastImport"
            required
            rules={[{ required: true, message: 'Please input Reading' }]}
            validateDebounce={1000}
          >
            <Input placeholder="1234" />
          </Form.Item>
          <Form.Item
            label="Current Reading from K-2"
            name="lastExport"
            required
            rules={[{ required: true, message: 'Please input Reading' }]}
          >
            <Input placeholder="1234" />
          </Form.Item>
          <Form.Item
            name="isBalance"
            valuePropName="checked"
            onChange={(v) => { setShowBalance(v.target.checked); }}
          >
            <Checkbox>Have Balance in Bill</Checkbox>
          </Form.Item>
          {showBalance ? (
            <Form.Item
              name="lastBalance"
              label="Balance Amount"
            >
              <Input placeholder="1234" />
            </Form.Item>
          ) : null}
          <Flex><Title level={2}>From Current Meter Reading</Title></Flex>
          <Form.Item
            label="Current Reading menu 4 import"
            name="importValue"
            required
            rules={[{ required: true, message: 'Please input Reading' }]}
          >
            <Input placeholder="1234" />
          </Form.Item>
          <Form.Item
            label="Current Reading menu 5 export"
            name="exportValue"
            required
            rules={[{ required: true, message: 'Please input Reading' }]}
          >
            <Input placeholder="1234" />
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
}

export default Dashboard;
