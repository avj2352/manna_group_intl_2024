import { FC } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/common/state/store";
import AssetsMultiSelect from "@/components/autocomplete/AssetsMultiSelect";

const assetZodSchema = z.object({
  asset_id: z.string(),
  position: z.number(),
  asset_key: z.string(),
  asset_type: z.string(),
  description: z.string(),
  url: z.string()
});

const formSchema = z.object({
  product_name: z.string().min(2),
  product_description: z.string().min(4).max(250),
  product_content: z.string(),
  product_quantity: z.coerce.number().min(0).max(500),
  product_price: z.coerce.number().min(1),
  product_currency: z.string(),
  asset_key: z.array(assetZodSchema).min(1),
});

type IAddEditProductFormProps = {
    onSubmitForm: (data: unknown) => void
};

const AddEditProductForm: FC<IAddEditProductFormProps> = ({onSubmitForm}) => {
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const assetState = useAppSelector((state) => state.asset);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      onSubmitForm(values);
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
              name="product_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ManaLiv"                      
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    provide a short description of the product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="product_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="FDA registered product"                      
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    provide a short description of the product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="product_content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This is a FDA registered product. Useful for treatment of wide variety of ailments"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide content about the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="product_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="10" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Number of products in stock</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="product_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="133.5" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Enter product price</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="product_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="myr">MYR</SelectItem>
                      <SelectItem value="inr">INR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select Currency type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
          <FormField
          control={form.control}
          name="asset_key"
          render={({ field }) => (
            <FormItem>          
              <FormLabel>Selected Images for Product Cover: </FormLabel>    
              <FormControl>
                <AssetsMultiSelect
                  defaultList={assetState?.asset_list ?? []}                                    
                  onValueChange={field.onChange}
                  searchList={assetState?.asset_list ?? []}                  
                />
              </FormControl>
              <FormDescription>Select an asset</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>

        </div>
        <Button
          color="primary" 
          type="submit">Submit</Button>
        <Button
          color="ghost"
          onClick={() => navigate('/admin/products')}
          type="reset" variant="outline" className="mx-2">Cancel</Button>
      </form>
    </Form>
  );
};

export default AddEditProductForm;
