export const k1Columns = [
  {
    title: 'K1 K-Electric',
    children: [
      {
        title: 'Meter Reading Date',
        dataIndex: 'month',
        width: '16%',
        editable: true,
        inputType: 'month',
      },
      {
        title: 'Previous',
        dataIndex: 'k1previous',
        width: '16%',
        editable: true,
      },
      {
        title: 'Current',
        dataIndex: 'k1current',
        width: '16%',
        editable: true,
      },
      {
        title: 'Units',
        dataIndex: 'k1Units',
        width: '16%',
        editable: true,
        readOnly: true,
      },
      {
        title: 'Import units rate',
        dataIndex: 'k1rate',
        width: '16%',
        editable: true,
        readOnly: true,
      },
      {
        title: 'Amount (K1)',
        dataIndex: 'k1amount',
        width: '16%',
        editable: true,
        readOnly: true,
      },
    ],
  },
];
export const k2Columns = [
  {
    title: 'K2 Solar',
    children: [
      {
        title: 'Previous',
        dataIndex: 'k2previous',
        width: '16%',
        editable: true,
      },
      {
        title: 'Current',
        dataIndex: 'k2current',
        width: '16%',
        editable: true,
      },
      {
        title: 'Total Units',
        dataIndex: 'k2TotalUnits',
        width: '16%',
        editable: true,
        readOnly: true,
      },
      {
        title: 'Units Adjusted',
        dataIndex: 'k2UnitsAdjusted',
        width: '16%',
        editable: true,
        readOnly: true,
      },
      {
        title: 'Units Adjustment Rate',
        dataIndex: 'k2rate',
        width: '16%',
        editable: true,
        readOnly: true,
      },
      {
        title: 'Amount (K2)',
        dataIndex: 'k2amount',
        width: '16%',
        editable: true,
        readOnly: true,
      },
    ],
  },
];
export const k3Columns = [
  {
    title: 'K-3',
    children: [
      {
        title: 'Nepra',
        dataIndex: 'nepra',
        width: '48%',
      },
      {
        title: 'Units adjusted',
        dataIndex: 'k3Units',
        width: '16%',
        editable: true,
        readOnly: true,
      },
      {
        title: 'Units Adjustment Rate',
        dataIndex: 'k3rate',
        width: '16%',
        editable: true,
        readOnly: true,
      },
      {
        title: 'Amount (K3)',
        dataIndex: 'k3amount',
        width: '16%',
        editable: true,
        readOnly: true,
      },
    ],
  },
];
export const balances = [
  {
    title: 'Total Amount',
    dataIndex: 'totalCurrentAmount',
    width: '48%',
    editable: true,
    readOnly: true,
  },
  {
    title: 'Prev balance units',
    dataIndex: 'prevUnits',
    width: '16%',
    editable: true,
    readOnly: true,
  },
  {
    title: 'Prev Bal Amount',
    dataIndex: 'prevBalance',
    width: '16%',
    editable: true,
  },
  {
    title: 'Total Amount Payable',
    dataIndex: 'totalAmount',
    width: '16%',
    editable: true,
    readOnly: true,
  },
];
