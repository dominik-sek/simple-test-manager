interface dataFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  cancelButtonLabel: string;
}
export default function DataForm() {
  return (
    <form id="data-form" className="data-form"> 

    </form>
  )
}
