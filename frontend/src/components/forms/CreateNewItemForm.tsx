
import { useEffect } from 'react';

interface FormFields{
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
}
interface formProps {
  label: string;
  fields: FormFields[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  className?: string;

}
export default function CreateNewItemForm(formProps: formProps) {

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create New {formProps.label}</h2>
      <div className='flex flex-col gap-4 relative border'>
        <label className="text-md font-semibold ">xxx</label>
      <div id="editorjs"></div>
      </div>
      

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Item Name"
          className="p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Item Description"
          className="p-2 border border-gray-300 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Create Item
        </button>
      </form>
    </div>
  );
}
