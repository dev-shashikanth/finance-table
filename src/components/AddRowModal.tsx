
import React, { useState } from 'react';
import Modal from 'react-modal';

interface AddRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: { '31-12-2021': number, '31-12-2022': number, '31-12-2024': number, name: string }) => void;
}

const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [row, setRow] = useState({ '31-12-2021': 0, '31-12-2022': 0, '31-12-2024': 0, name: '' });

  const handleSubmit = () => {
    onSubmit(row);
    onRequestClose();
    setRow({ '31-12-2021': 0, '31-12-2022': 0, '31-12-2024': 0, name: '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Add New Row</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Name</label>
          <input
            type="text"
            value={row.name}
            onChange={(e) => setRow({ ...row, name: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">31-12-2021</label>
          <input
            type="number"
            value={row['31-12-2021']}
            onChange={(e) => setRow({ ...row, '31-12-2021': Number(e.target.value) })}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">31-12-2022</label>
          <input
            type="number"
            value={row['31-12-2022']}
            onChange={(e) => setRow({ ...row, '31-12-2022': Number(e.target.value) })}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">31-12-2024</label>
          <input
            type="number"
            value={row['31-12-2024']}
            onChange={(e) => setRow({ ...row, '31-12-2024': Number(e.target.value) })}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRowModal;
