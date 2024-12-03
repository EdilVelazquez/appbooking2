import React, { useState } from 'react';
import { Edit, ToggleLeft, ToggleRight, Save, X } from 'lucide-react';
import { Room } from '../../types/room';
import { useRoomStore } from '../../store/useRoomStore';

export const RoomManagement: React.FC = () => {
  const { rooms, toggleRoomAvailability, updateRoom } = useRoomStore();
  const [editingRoom, setEditingRoom] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Room>>({});

  const handleEdit = (room: Room) => {
    setEditingRoom(room.id);
    setEditForm(room);
  };

  const handleSave = (id: number) => {
    if (editForm) {
      updateRoom(id, editForm);
      setEditingRoom(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingRoom(null);
    setEditForm({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Gestión de Habitaciones</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Habitación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingRoom === room.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      />
                      <textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                        rows={2}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-gray-900">{room.name}</div>
                      <div className="text-sm text-gray-500">{room.description?.substring(0, 50)}...</div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingRoom === room.id ? (
                    <input
                      type="number"
                      value={editForm.capacity || ''}
                      onChange={(e) => setEditForm({ ...editForm, capacity: parseInt(e.target.value) })}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">{room.capacity} personas</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingRoom === room.id ? (
                    <input
                      type="number"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) })}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">${room.price}/noche</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleRoomAvailability(room.id)}
                    className="flex items-center"
                  >
                    {room.isAvailable ? (
                      <>
                        <ToggleRight className="w-6 h-6 text-green-500 mr-2" />
                        <span className="text-green-500">Disponible</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-6 h-6 text-red-500 mr-2" />
                        <span className="text-red-500">No Disponible</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingRoom === room.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(room.id)}
                        className="text-green-600 hover:text-green-900 flex items-center"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-900 flex items-center"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(room)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};