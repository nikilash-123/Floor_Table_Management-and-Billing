import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Users,
  AlertTriangle,
  X,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function TableManagementSection({
  tables,
  onCreateTable,
  onUpdateCapacity,
  onDeleteTable,
  onToggleStatus,
  isLoading
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTableId, setNewTableId] = useState('');
  const [newCapacity, setNewCapacity] = useState('');
  const [addError, setAddError] = useState('');

  const [editingTable, setEditingTable] = useState(null);
  const [editCapacity, setEditCapacity] = useState('');
  const [editError, setEditError] = useState('');

  const [deletingTable, setDeletingTable] = useState(null);

  // Filtered tables
  const filteredTables = tables.filter((t) => {
    const matchesSearch =
      t.id.toString().includes(searchTerm.trim()) ||
      t.capacity.toString().includes(searchTerm.trim());
    if (statusFilter === 'FREE') {
      return matchesSearch && !t.occupied;
    }
    if (statusFilter === 'OCCUPY') {
      return matchesSearch && t.occupied;
    }
    return matchesSearch;
  });

  // Handle Add Table submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError('');
    const id = parseInt(newTableId, 10);
    const capacity = parseInt(newCapacity, 10);

    if (isNaN(id) || id <= 0) {
      setAddError('Table ID must be a positive integer greater than zero.');
      return;
    }
    if (isNaN(capacity) || capacity <= 0) {
      setAddError('Capacity must be a positive integer greater than zero.');
      return;
    }

    try {
      await onCreateTable(id, capacity);
      setIsAddModalOpen(false);
      setNewTableId('');
      setNewCapacity('');
    } catch (err) {
      setAddError(err.message || 'Failed to add table.');
    }
  };

  // Handle Edit Capacity submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError('');
    const capacity = parseInt(editCapacity, 10);

    if (isNaN(capacity) || capacity <= 0) {
      setEditError('Capacity must be a positive integer greater than zero.');
      return;
    }

    try {
      await onUpdateCapacity(editingTable.id, capacity);
      setEditingTable(null);
      setEditCapacity('');
    } catch (err) {
      setEditError(err.message || 'Failed to update capacity.');
    }
  };

  // Handle Delete Table
  const handleDeleteConfirm = async () => {
    if (!deletingTable) return;
    try {
      await onDeleteTable(deletingTable.id);
      setDeletingTable(null);
    } catch {
      // error handled by parent toast
    }
  };

  return (
    <div>
      <div className="page-intro">
        <h2>Table Management</h2>
        <p>Monitor real-time floor availability, configure seating capacities, and register dining tables.</p>
      </div>

      {/* Control Bar: Search, Filter, Add Button */}
      <div
        className="panel"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: '260px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search table # or capacity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Filter size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: 'auto', padding: '9px 12px' }}
            >
              <option value="ALL">All Tables ({tables.length})</option>
              <option value="FREE">Available (Free)</option>
              <option value="OCCUPY">Occupied (Occupy)</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} />
          <span>Add New Table</span>
        </button>
      </div>

      {/* Tables Grid Layout */}
      {filteredTables.length === 0 ? (
        <div className="panel">
          <div className="empty-state">
            <div className="empty-icon">
              <Users size={24} />
            </div>
            <div className="empty-title">No tables found</div>
            <div className="empty-desc">
              {tables.length === 0
                ? 'No tables configured yet. Click "Add New Table" to create your first dining table.'
                : 'No tables match your search or filter criteria.'}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredTables.map((table) => {
            const isFree = !table.occupied;
            return (
              <div
                key={table.id}
                className="panel"
                style={{
                  marginBottom: 0,
                  border: isFree
                    ? '1px solid rgba(16, 185, 129, 0.25)'
                    : '1px solid rgba(244, 63, 94, 0.25)',
                  background: isFree
                    ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, rgba(19, 26, 43, 0.8) 100%)'
                    : 'linear-gradient(180deg, rgba(244, 63, 94, 0.04) 0%, rgba(19, 26, 43, 0.8) 100%)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="panel-header" style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)'
                      }}
                    >
                      Table {table.id}
                    </span>
                  </div>
                  <span className={`badge ${isFree ? 'badge-free' : 'badge-occupy'}`}>
                    {isFree ? 'Available' : 'Occupied'}
                  </span>
                </div>

                <div className="panel-body" style={{ padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={18} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Capacity:</span>
                    </div>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--accent-amber)' }}>
                      {table.capacity} Seats
                    </strong>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                      padding: '10px 12px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
                    <button
                      className="btn btn-sm"
                      style={{
                        padding: '4px 8px',
                        background: 'transparent',
                        color: isFree ? '#34d399' : '#fb7185',
                        border: '1px solid var(--border-subtle)',
                        gap: 4
                      }}
                      onClick={() => onToggleStatus(table.id, isFree ? 'occupy' : 'free')}
                      title={isFree ? 'Click to mark Occupied' : 'Click to mark Available'}
                    >
                      {isFree ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                      <span>{isFree ? 'Mark Occupied' : 'Mark Available'}</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, gap: 4 }}
                      onClick={() => {
                        setEditingTable(table);
                        setEditCapacity(table.capacity.toString());
                        setEditError('');
                      }}
                    >
                      <Edit2 size={13} />
                      <span>Edit Capacity</span>
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      style={{ padding: '6px 10px' }}
                      onClick={() => setDeletingTable(table)}
                      title="Delete Table"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          ADD TABLE MODAL
          ========================================================================= */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Dining Table</h3>
              <button className="icon-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                {addError && (
                  <div
                    style={{
                      background: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                      color: '#fda4af',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      marginBottom: '16px'
                    }}
                  >
                    {addError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="new-table-id">Table ID (Positive Integer)</label>
                  <input
                    id="new-table-id"
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="e.g. 4"
                    value={newTableId}
                    onChange={(e) => setNewTableId(e.target.value)}
                    required
                    autoFocus
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Must be unique and greater than zero.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-table-cap">Seating Capacity</label>
                  <input
                    id="new-table-cap"
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="e.g. 4"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    required
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Number of guest seats (greater than zero).
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Table'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          EDIT TABLE CAPACITY MODAL
          ========================================================================= */}
      {editingTable && (
        <div className="modal-backdrop" onClick={() => setEditingTable(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Update Table {editingTable.id} Capacity</h3>
              <button className="icon-btn" onClick={() => setEditingTable(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                {editError && (
                  <div
                    style={{
                      background: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                      color: '#fda4af',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      marginBottom: '16px'
                    }}
                  >
                    {editError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">New Seating Capacity</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={editCapacity}
                    onChange={(e) => setEditCapacity(e.target.value)}
                    required
                    autoFocus
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Must be greater than zero.
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingTable(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Save Capacity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          DELETE CONFIRMATION MODAL
          ========================================================================= */}
      {deletingTable && (
        <div className="modal-backdrop" onClick={() => setDeletingTable(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fb7185' }}>
                <AlertTriangle size={20} />
                <span>Confirm Table Deletion</span>
              </div>
              <button className="icon-btn" onClick={() => setDeletingTable(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                Are you sure you want to delete <strong>Table {deletingTable.id}</strong> (Capacity: {deletingTable.capacity})?
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 8 }}>
                This table will be permanently removed from the active floor layout in the backend repository.
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeletingTable(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete Table'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
