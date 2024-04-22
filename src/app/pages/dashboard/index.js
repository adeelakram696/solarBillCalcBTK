/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Table, Flex, Form, Descriptions,
} from 'antd';
import {
  balances, k1Columns, k2Columns, k3Columns,
} from './columns';
import { EditableCell } from './EditableComponents';
import {
  balancesData, k1data, k2data, k3data,
} from './data';

function App() {
  const [form] = Form.useForm();
  const [description, setDescription] = useState([]);
  const handleChanges = (_, allValues) => {
    localStorage.setItem('inputValues', JSON.stringify(allValues));
    const k1rate = process.env.REACT_APP_IMPORT_UNIT_PRICE;
    const k2rate = process.env.REACT_APP_EXPORT_UNIT_PRICE;
    const k3rate = process.env.REACT_APP_NEPRA_PRICE;
    const {
      month, k1previous, k2previous, prevBalance, k1current, k2current,
    } = allValues;
    const isUnderQuarter = month % 3;
    const balanceVal = isUnderQuarter ? prevBalance : 0;
    const unitsImport = k1current - k1previous;
    const unitsExport = k2current - k2previous;
    const k2Units = unitsImport < unitsExport ? unitsImport : unitsExport;
    const k3Calc = unitsImport / unitsExport > 0.4
      ? unitsExport - unitsImport < 0
        ? 0
        : unitsExport - unitsImport
      : unitsExport - (unitsExport * 0.4);
    const k3Units = Math.round(k3Calc);
    const unitsWasted = unitsExport - k2Units - k3Units;
    const k1Amount = Math.round(unitsImport * k1rate);
    const k2Amount = Math.round(k2Units * k2rate);
    const k3Amount = Math.round(k3Units * k3rate);
    const totalCurrentAmount = Number(k1Amount) - (Number(k2Amount) + Number(k3Amount));
    form.setFieldsValue({
      k1Units: unitsImport,
      k1amount: k1Amount,
      k2TotalUnits: unitsExport,
      k2UnitsAdjusted: k2Units,
      k2amount: k2Amount,
      k3Units,
      k3amount: k3Amount,
      totalCurrentAmount,
      totalAmount: totalCurrentAmount - Number(balanceVal),
    });
    const descriptionItems = [
      {
        key: '1',
        label: 'Amount Payable',
        children: totalCurrentAmount - Number(balanceVal),
        span: 2,
      },
      {
        key: '2',
        label: 'Is Balance Reset(every quarter)',
        children: isUnderQuarter ? 'No' : 'Yes',
        span: 2,
      },
      {
        key: '3',
        label: 'Units Wasted',
        children: unitsWasted,
        span: 2,
      },
    ];
    setDescription(descriptionItems);
  };
  const getUpdatedColumns = (column) => column.map((parentCol) => {
    const children = parentCol?.children?.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          inputType: col.inputType,
          readOnly: col.readOnly,
          editing: true,
        }),
      };
    });
    if (!parentCol.editable) {
      return {
        ...parentCol,
        children,
      };
    }
    return {
      ...parentCol,
      children,
      onCell: (record) => ({
        record,
        dataIndex: parentCol.dataIndex,
        title: parentCol.title,
        inputType: parentCol.inputType,
        readOnly: parentCol.readOnly,
        editing: true,
      }),
    };
  });
  const components = {
    body: {
      cell: EditableCell,
    },
  };
  useEffect(() => {
    const inputValues = localStorage.getItem('inputValues');
    const values = JSON.parse(inputValues);
    const withRates = {
      ...values,
      k1rate: process.env.REACT_APP_IMPORT_UNIT_PRICE,
      k2rate: process.env.REACT_APP_EXPORT_UNIT_PRICE,
      k3rate: process.env.REACT_APP_NEPRA_PRICE,
    };
    form.setFieldsValue(withRates);
    handleChanges('', withRates);
  }, []);
  return (
    <Flex vertical>
      <Form
        form={form}
        component={false}
        onValuesChange={handleChanges}
        initialValues={{
          ...k1data[0],
          ...k2data[0],
          ...k3data[0],
          ...balancesData[0],
        }}
      >
        <Table
          components={components}
          columns={getUpdatedColumns(k1Columns)}
          dataSource={k1data}
          bordered
          pagination={false}
          size="small"
          rowClassName={() => 'editable-row'}
        />
        <Table
          components={components}
          columns={getUpdatedColumns(k2Columns)}
          dataSource={k2data}
          bordered
          pagination={false}
          size="small"
          rowClassName={() => 'editable-row'}
        />
        <Table
          components={components}
          columns={getUpdatedColumns(k3Columns)}
          dataSource={k3data}
          bordered
          pagination={false}
          size="small"
          rowClassName={() => 'editable-row'}
        />
        <Table
          components={components}
          columns={getUpdatedColumns(balances)}
          dataSource={balancesData}
          bordered
          pagination={false}
          size="small"
          rowClassName={() => 'editable-row'}
        />
      </Form>
      <Descriptions title="Info" bordered items={description} />
    </Flex>
  );
}
export default App;
