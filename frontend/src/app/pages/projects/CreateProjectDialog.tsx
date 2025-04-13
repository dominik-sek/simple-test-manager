import { api } from '@/api/helper';
import Page from '@/components/page/Page';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function CreateProjectDialog() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: ''
  });
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const projectName = formData.get('projectName');
    const description = formData.get('description');

    setFormData({
      projectName: projectName as string,
      description: description as string
    });


    api('/test-project', {
      method: 'POST',
      body: JSON.stringify({
        name: projectName,
        description: description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res); // good for debugging
      })
      .catch((err) => {
        console.error('Failed to create project:', err);
      });
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
