import React from "react";
import { useForm } from "react-hook-form";
import FileBox from "../../components/FileBox";
import UploadForm from "../../components/UploadForm";

const InstituteDocumentForm = () => {
  const { register, handleSubmit, reset } = useForm();
  // todo : do the mulptiform upload file


  // DOWNLOAD FUNCTION

  // function downloadCSV(array) {
  //   const link = document.createElement('a');
  //   let csv = convertArrayOfObjectsToCSV(array);

  //   if (csv == null) return;
  //   const filename = 'export.csv';
  //   if (!csv.match(/^data:text\/csv/i)) {
  //     csv = `data:text/csv;charset=utf-8,${csv}`;
  //   }
  //   link.setAttribute('href', encodeURI(csv));
  //   link.setAttribute('download', filename);
  //   link.click();
  // }
  // const Export = ({ onExport }) => <button className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' onClick={e => onExport(e.target.value)}>Export data</button>;
  // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);


  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Intitute document upload form
        </h2>
        <UploadForm url={"addInstituteDocumentData"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <FileBox
            label="AICTE Affiliation PDF"
            name="aicteAffiliationPdf"
            register={register}
            accept=".pdf"
            required
          />

          <FileBox
            label="RGPV PDF"
            name="rgpvPdf"
            register={register}
            accept=".pdf"
            required
          />

          <FileBox
            label="Society PDF"
            name="societyPdf"
            register={register}
            accept=".pdf"
            required
          />

          <FileBox
            label="By Laws PDF"
            name="byLawsPdf"
            register={register}
            accept=".pdf"
            required
          />

          <button
            type="submit"
            className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstituteDocumentForm;
