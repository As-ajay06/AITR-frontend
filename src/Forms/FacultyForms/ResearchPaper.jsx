import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import FileBox from "../../components/FileBox";
import UploadForm from "../../components/UploadForm";
import DataTable from "react-data-table-component";


const ResearchPaper = ({ handleSubmit, onSubmit, register, reset }) => {


  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Faculty Reseach Paper Form
        </h2>
        <UploadForm url={"addResearchPaperData"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputBox label="ID" name={"facultyId"} register={register} required />
          <InputBox label="faculty_Name" name={"facultyName"} register={register} required />
          <InputBox label="title_Of_Paper" name={"titleOfPaper"} register={register} required />
          <InputBox label="publication_Date" name={"publicationDate"} register={register} required />
          <InputBox label="journal_Name" name={"journalOrConferenceName"} register={register} required />
          <InputBox label="co_Authors" name={"coAuthors"} register={register} required />
          <SelectBox
            label="indexing"
            name={"indexing"}
            register={register}
            required
            options={["SCOPUS", "SCI", "ETC"]} />
          <FileBox label="paper_Pdf" name={"file"} register={register} required />
          <InputBox label="issn_Number" name={"issnNumber"} register={register} required />
          <InputBox label="doi" name={"doiLink"} register={register} required />
          <InputBox label="authors" name={"authors"} register={register} required />
          <InputBox label="Issun or Isbn" name={"issnOrIsbn"} register={register} required />

          <InputBox label="department" name={"department"} register={register} required />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
      <div>

      </div>
    </div>

  );
};

export default ResearchPaper;

export const publicationColumns = [
  {
    name: 'ID',
    selector: row => row.facultyId,
    sortable: true,
    center: true
  },
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true
  },
  {
    name: 'Title of Paper',
    selector: row => row.titleOfPaper,
    sortable: true,
    wrap: true
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    format: row => new Date(row.publicationDate).toLocaleDateString()
  },
  {
    name: 'Journal/Conference Name',
    selector: row => row.journalOrConferenceName,
    wrap: true
  },
  {
    name: 'Co-Author',
    selector: row => row.coAuthors,
    wrap: true
  },
  {
    name: 'Indexing',
    selector: row => row.indexing,
    wrap: true
  },
  {
    name: 'Paper PDF',
    selector: row => row.paperPdf,
    cell: row => (
      <a
        href={row.paperPdf}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View PDF
      </a>
    )
  },
  {
    name: 'ISSN Number',
    selector: row => row.issnNumber
  },
  {
    name: 'DOI Link',
    selector: row => row.doiLink,
    cell: row => (
      <a
        href={row.doiLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        DOI
      </a>
    )
  },
  {
    name: 'Authors',
    selector: row => row.authors,
    cell: row =>
      Array.isArray(row.authors) ? row.authors.join(', ') : row.authors
  },
  {
    name: 'ISSN/ISBN',
    selector: row => row.issnOrIsbn
  },
  {
    name: 'Department',
    selector: row => row.department
  }
];


