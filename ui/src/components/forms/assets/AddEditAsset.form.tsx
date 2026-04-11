import { FC, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "react-daisyui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IAssetRequestForm, IFileResponseRecord } from "@/common/interfaces";
import { useFileStore } from "@/common/state/features/assets/file.slice";
import { SelectAutoComplete } from "@/components/autocomplete/FilesAutoComplete";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  asset_type: z.enum(["gallery", "product", "other"]),
  asset_key: z.string().min(1),
  position: z.coerce.number().min(0).max(500).optional(),
  description: z.string().min(1),
});

type IAddEditAssetFormProps = {
  formType: 'add' | 'edit';
  data: IAssetRequestForm | undefined;
  onFormSubmit: (data: IAssetRequestForm) => void;
};

const AddEditAssetForm: FC<IAddEditAssetFormProps> = ({
  formType,
  data,
  onFormSubmit,
}) => {
  const navigate = useNavigate();
  const { files_list } = useFileStore();

  const form = useForm< z.infer < typeof formSchema >>({
    defaultValues: {
      asset_key: data?.asset_key ?? undefined,
      asset_type: data?.asset_type ?? "product",
      position: data?.position ? Number(data?.position) : 0,
      description: data?.description ?? undefined,
    },
    resolver: zodResolver(formSchema),
  });

  // ..evt handlers
  const handleReset = () => {    
    form.reset({
      asset_key: "",
      asset_type: data?.asset_type ?? "product",
      position: data?.position ? Number(data?.position) : 0,
      description: "",
    });
  };

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {            
      formSchema.safeParse(values);      
      onFormSubmit(values as IAssetRequestForm);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  // on unmount, reset form
  useEffect(()=>{return () => handleReset()},[]);

  useEffect(()=>{
    if (!Boolean(data)) return;
    form.setValue("asset_key", data.asset_key);
    form.setValue("asset_type", data.asset_type);
    form.setValue("position", Number(data.position));
    form.setValue("description", data.description);
  },[data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl py-10 space-y-8"
        onReset={handleReset}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="asset_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="product">Product Asset</SelectItem>
                      <SelectItem value="gallery">Gallery Asset</SelectItem>
                      <SelectItem value="other">Other Assets</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select Asset Type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Position</FormLabel>
                  <FormControl>
                    <Input disabled={formType === 'add'} {...field} type="number"/>
                  </FormControl>
                  <FormDescription>Update Asset Position</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="asset_key"
          render={({ field }) => (
            <FormItem>          
              <FormLabel>Asset Key: </FormLabel>    
              <FormControl>
                <SelectAutoComplete
                  title="Select File"                  
                  onValueChange={field.onChange}
                  searchItems={files_list?.map((item: IFileResponseRecord) => ({label: item.name, value: item.name})) ?? []}                  
                />
              </FormControl>
              <FormDescription>Select a file from S3 bucket</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Manna product thumbnail image"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide a description for asset</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          color="primary" 
          type="submit">Submit</Button>
        <Button
          color="ghost"
          onClick={() => navigate('/admin/assets')}
          type="reset" variant="outline" className="mx-2">Cancel</Button>
      </form>
    </Form>
  );
};

export default AddEditAssetForm;
