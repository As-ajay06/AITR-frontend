import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'facultyId', label: 'Faculty Id' },
  { key: 'facultyName', label: 'Faculty Name' },
  { key: 'department', label: 'Department' },
  { key: 'title', label: 'Title' },
  { key: 'applicant', label: 'Applicant' },
  { key: 'applicationNumber', label: 'Application Number' },
  { key: 'applicationDate', label: 'Application Date' },
  { key: 'status', label: 'Status' },
  { key: 'coInventors', label: 'Co-Inventors' },
  { key: 'country', label: 'Country' },
  { key: 'category', label: 'Category' },
  { key: 'patentTitle', label: 'Patent Title' },
  { key: 'inventors', label: 'Inventors' },
  { key: 'publicationDate', label: 'Publication Date' },
  { key: 'abstract', label: 'Abstract' },
];

// Column Definitions
const columns = [
  { name: 'Faculty Id', selector: row => row.facultyId || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Faculty Name', selector: row => row.facultyName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Department', selector: row => row.department || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Title', selector: row => row.title || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Applicant', selector: row => row.applicant || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Application Number', selector: row => row.applicationNumber || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Application Date', selector: row => row.applicationDate || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Status', selector: row => row.status || "N/A", sortable: true, width: '200px', wrap: true },
  {
    name: 'Inventors',
    cell: row => {
      if (!row.coInventors || row.coInventors.length === 0) {
        return "N/A";
      }

      return (
        <div>
          {row.coInventors.map((member, index) => (
            <div key={index} style={{ marginBottom: '6px' }}>
              <strong>{member.memberName}</strong>
              <div>{member.role}</div>
            </div>
          ))}
        </div>
      );
    },
  },
  { name: 'Country', selector: row => row.country || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Category', selector: row => row.category || "N/A", sortable: true, width: '200px', wrap: true },
  {
    name: 'Certificate PDF',
    cell: row => (
      row.fileId || row.Certificate_Link || row.certificateLink ? (
        <a
          href={row.Certificate_Link || row.certificateLink || `http://localhost:3000/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      ) : 'N/A'
    ),
    sortable: true, width: '200px', wrap: true
  },
  { name: 'Patent Title', selector: row => row.patentTitle || "N/A", sortable: true, width: '200px', wrap: true },
  {
    name: 'Co-Inventors',
    selector: row => row.inventors || "N/A",
    sortable: true, width: '300px', wrap: true,
    cell: row => {
      if (!row.inventors) return 'N/A';
      if (Array.isArray(row.inventors)) return row.inventors.join(', ');
      if (typeof row.inventors === 'object') return Object.values(row.inventors).filter(v => v).join(', ');
      return String(row.inventors);
    },
  },
  {
    name: 'Co-Inventors',
    cell: row => {
      if (!row.inventors || row.inventors.length === 0) {
        return "N/A";
      }

      return (
        <div>
          {row.inventors.map((member, index) => (
            <div key={index} style={{ marginBottom: '6px' }}>
              <strong>{member.memberName}</strong>
              <div>{member.role}</div>
            </div>
          ))}
        </div>
      );
    },
  },
  { name: 'Publication Date', selector: row => new Date(row.publicationDate).toLocaleDateString() || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Abstract', selector: row => row.abstract || "N/A", sortable: true, width: '200px', wrap: true },


];


const PatentTable = ({ data }) => {
  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);

  // Use the reusable export hook
  const {
    selectedRows,
    showColumnSelector,
    selectedColumns,
    setShowColumnSelector,
    handleRowSelected,
    toggleColumnSelection,
    selectAllColumns,
    deselectAllColumns,
    downloadCSV,
  } = useTableExport(exportableColumns, data);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DataFilterComponent placeholder={"Filter by Department Name"} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, setResetPaginationToggle, setFilterText]);

  const actionsMemo = React.useMemo(
    () => (
      <TableExportControls
        onExport={() => downloadCSV(data, 'patents_export.csv')}
        onToggleColumnSelector={() => setShowColumnSelector(!showColumnSelector)}
        selectedColumnsCount={selectedColumns.length}
        selectedRowsCount={selectedRows.length}
      />
    ),
    [downloadCSV, data, showColumnSelector, setShowColumnSelector, selectedColumns.length, selectedRows.length]
  );

  return (
    <div className="p-4">
      <ColumnSelectorModal
        isOpen={showColumnSelector}
        onClose={() => setShowColumnSelector(false)}
        exportableColumns={exportableColumns}
        selectedColumns={selectedColumns}
        onToggleColumn={toggleColumnSelection}
        onSelectAll={selectAllColumns}
        onDeselectAll={deselectAllColumns}
      />

      <DataTable
        title="Faculty Patents"
        columns={columns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        actions={actionsMemo}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        customStyles={{
          table: {
            style: {
              tableLayout: "fixed",
            },
          },
          headCells: {
            style: {
              whiteSpace: "nowrap",
              fontSize: "18px",     // ⬆ Bigger header font
              fontWeight: "700",
            },
          },
          cells: {
            style: {
              whiteSpace: "nowrap",
              fontSize: "16px",     // ⬆ Bigger row font
              paddingTop: "12px",
              paddingBottom: "12px",
            },
          },
        }}
      />
    </div>
  );
};

export default PatentTable;
