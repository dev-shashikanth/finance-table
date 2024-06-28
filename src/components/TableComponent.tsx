import React, { useState, useMemo } from 'react';
import { useTable, useBlockLayout, Column, CellProps } from 'react-table';
import AddRowModal from './AddRowModal';

interface Data {
  name: string;
  '31-12-2021': number;
  '31-12-2022': number;
  '31-12-2024': number;
  Variance: number;
  'Variance %': number;
}

const initialData: Data[] = [
  {
    name: 'Row 1',
    '31-12-2022': 100,
    '31-12-2021': 100,
    '31-12-2024': 120,
    Variance: 20,
    'Variance %': 0.2,
  },
  {
    name: 'Row 2',
    '31-12-2021': 190,
    '31-12-2022': 190,
    '31-12-2024': 100,
    Variance: 20,
    'Variance %': 0.2,
  },
  {
    name: 'Row 3',
    '31-12-2021': 900,
    '31-12-2022': 900,
    '31-12-2024': 180,
    Variance: 20,
    'Variance %': 0.2,
  },
];

const TableComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<Data>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        disableSortBy: true,
      },
      {
        Header: '31-12-2021',
        accessor: '31-12-2021',
        disableSortBy: true,
        Cell: ({ value, row: { index } }: CellProps<Data>) => {
          if (index === data.length) {
            return <span>{value}</span>;
          }
          return <span>{value}</span>;
        },
      },
      {
        Header: '31-12-2022',
        accessor: '31-12-2022',
        disableSortBy: true,
        Cell: ({ value, row: { index } }: CellProps<Data>) => {
          if (index === data.length) {
            return <span>{value}</span>;
          }
          return <span>{value}</span>;
        },
      },
      {
        Header: '31-12-2024',
        accessor: '31-12-2024',
        Cell: ({ value, row: { index }, column: { id } }: CellProps<Data>) => {
          if (index === data.length) {
            return <span>{value}</span>;
          }
          return (
            <input
              type="number"
              value={value}
              onChange={(e) => handleCellEdit(index, id, e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          );
        },
      },
      {
        Header: 'Variance',
        accessor: 'Variance',
        disableSortBy: true,
        Cell: ({ value, row: { index } }: CellProps<Data>) => {
          if (index === data.length) {
            return <span>{value}</span>;
          }
          return <span>{value}</span>;
        },
      },
      {
        Header: 'Variance %',
        accessor: 'Variance %',
        disableSortBy: true,
        Cell: ({ value, row: { index } }: CellProps<Data>) => {
          if (index === data.length) {
            return <span>{value}</span>;
          }
          return <span>{value}</span>;
        },
      },
    ],
    [data]
  );

  const handleCellEdit = (rowIndex: number, columnId: string, value: string) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      const updatedRow = { ...updatedData[rowIndex], [columnId]: Number(value) };
      updatedRow.Variance = updatedRow['31-12-2024'] - updatedRow['31-12-2022'];
      updatedRow['Variance %'] = updatedRow['31-12-2022'] !== 0 ? parseFloat((updatedRow.Variance / updatedRow['31-12-2022']).toFixed(2)) : 0;
      updatedData[rowIndex] = updatedRow;
      return updatedData;
    });
  };

  const handleAddRow = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (newRow: { '31-12-2021': number, '31-12-2022': number, '31-12-2024': number, name: string }) => {
    const newDataRow = {
      ...newRow,
      Variance: newRow['31-12-2024'] - newRow['31-12-2022'],
      'Variance %': newRow['31-12-2022'] !== 0 ? parseFloat(((newRow['31-12-2024'] - newRow['31-12-2022']) / newRow['31-12-2022']).toFixed(2)) : 0,
    };
    setData((prevData) => [...prevData, newDataRow]);
  };

  const calculateTotal = (key: keyof Data) => {
    if (key === 'name') return 0; // We will handle the 'name' field separately
    return data.reduce((total, row) => total + (typeof row[key] === 'number' ? row[key] : 0), 0);
  };

  const totalRow: Data = useMemo(() => {
    const totalVariance = calculateTotal('Variance');
    const total31_12_2021 = calculateTotal('31-12-2021');
    const total31_12_2022 = calculateTotal('31-12-2022');
    const total31_12_2024 = calculateTotal('31-12-2024');

    return {
      name: 'Total', // Explicitly set the name field as string
      '31-12-2021': total31_12_2021,
      '31-12-2022': total31_12_2022,
      '31-12-2024': total31_12_2024,
      Variance: totalVariance,
      'Variance %': total31_12_2022 !== 0 ? parseFloat((totalVariance / total31_12_2022).toFixed(2)) : 0,
    };
  }, [data]);

  const displayData = [...data, totalRow];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: displayData }, useBlockLayout);

  return (
    <div>
      <h1 className='text-bold text-3xl py-2'>Finance Table Assignment</h1>
      <button onClick={handleAddRow} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Add Row
      </button>
      <table {...getTableProps()} className="min-w-full border-collapse border border-gray-400">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={i === rows.length - 1 ? 'border-2 border-orange-400' : 'bg-white even:bg-gray-50'}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border border-gray-300 "
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <AddRowModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default TableComponent;
