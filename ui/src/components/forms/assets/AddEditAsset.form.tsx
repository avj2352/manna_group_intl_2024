import { FC } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { useAppSelector } from "@/common/state/store";
import { FilesAutoComplete } from "@/components/autocomplete/FilesAutoComplete";

const formSchema = z.object({
  asset_type: z.enum(["gallery", "product", "other"]),
  asset_key: z.string(),
  position: z.number().min(0).max(500).optional(),
  description: z.string(),
});

type IAddEditAssetFormProps = {
  data: IAssetRequestForm | undefined;
  onFormSubmit: (data: IAssetRequestForm) => void;
};

const AddEditAssetForm: FC<IAddEditAssetFormProps> = ({
  data,
  onFormSubmit,
}) => {
  const fileState = useAppSelector((state) => state.files);

  const form = useForm< z.infer < typeof formSchema >>({
    defaultValues: {
      asset_key: data?.asset_key ?? undefined,
      asset_type: data?.asset_type ?? "product",
      position: data?.position ?? 0,
      description: data?.description ?? undefined,
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log("Form to be submitted: ", values);      
      formSchema.safeParse(values);      
      onFormSubmit(values as IAssetRequestForm);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl py-10 space-y-8"
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
                    defaultValue={field.value}
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
                    <Input placeholder="0" disabled type="number" {...field} />
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
              <FormControl>
                <FilesAutoComplete
                  title="Select File"                  
                  onValueChange={field.onChange}
                  searchItems={fileState?.files_list?.map((item: IFileResponseRecord) => ({label: item.name, value: item.name})) ?? []}
                  {...field}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddEditAssetForm;
