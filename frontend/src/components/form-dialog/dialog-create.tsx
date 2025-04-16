import { Key, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z, ZodObject, ZodRawShape } from 'zod';
import { FieldValues, useForm,  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DialogFormField } from '@/types/CreateDialogFormField';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface CreateDialogProps<Tschema extends ZodObject<ZodRawShape>, TFieldValues extends FieldValues = z.infer<Tschema>> {
  buttonText: string;
  dialogTitle: string;
  dialogDescription: string;
  submitButtonText: string;
  formSchema: Tschema;
  //form: UseFormReturn<TFieldValues, any, TFieldValues>
  //defaultValues:  DefaultValues<z.infer<Tschema>>
  submitHandler: (values: TFieldValues) => Promise<void>;
  formFields: DialogFormField[];
  onCreated: ()=>void;
}

export default function CreateProjectDialog<T extends ZodObject<ZodRawShape>>({
  buttonText,
  dialogDescription,
  dialogTitle,
  //form,
  formSchema,
  formFields,
  submitButtonText,
  submitHandler,
  onCreated,
  //defaultValues
                                               }: CreateDialogProps<T>) {

  const [openModal, setOpenModal] = useState(false);

  async function onSubmit(values: FieldValues) {
    console.log(values)

    try{
      await submitHandler(values);
      setOpenModal(false)
      form.clearErrors()
      form.reset()
      onCreated()
    } catch(error:any){
      console.log('error', error)
      const message = error.message || "Something went wrong, try again later";
      form.setError('root.formError',{message: message})

      Object.keys(form.control._fields).map((item)=>{
        //@ts-expect-error
        form.setError(item, {})
      })

    }
  }

  // const schemaKeys = [...formSchema.keyof().options]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })


  return (
    <Dialog open={openModal} onOpenChange={(isOpen)=>{
      setOpenModal(isOpen)
      if(!isOpen){
        form.reset()
        form.clearErrors()
      }
    }} >

      <DialogTrigger asChild onClick={() => setOpenModal(true)}>
        <Button variant="outline" >{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>


          <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
            {formFields.map((formField)=>{
              return(
                <FormField
                  key={formField.name as Key}
                  control={form.control}
                  // @ts-expect-error
                  name={formField.name}
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>
                        {formField.label}
                      </FormLabel>
                      <FormControl>
                        {
                          formField.type && formField.type ==="textarea" ? (
                            <Textarea className={'min-h-[150px]'} placeholder={formField.placeholder} {...field} />
                          ) : (
                            <Input placeholder={formField.placeholder} {...field} />
                          )
                        }

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              )
            })}

            <FormMessage>
              {form.formState.errors.root?.formError.message}
            </FormMessage>


            <DialogFooter>
              <Button disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? 'Creating...' : submitButtonText}</Button>
            </DialogFooter>

          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
