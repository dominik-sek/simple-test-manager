export type DialogFormField<T = never> = {
  name: keyof T,
  label: string,
  placeholder: string,
  type?: 'text' | 'textarea',
}
