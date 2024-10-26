import { FC, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// ..custom
import { IAssetRequestForm, IFileResponseRecord } from "@/common/interfaces";
import { FilesAutoComplete } from "@/components/autocomplete/FilesAutoComplete";
import { useAppSelector } from "@/common/state/store";

type IAddEditAssetFormProps = {
  data: IAssetRequestForm | undefined;
  onSubmit: (data: IAssetRequestForm) => void;
};

const AddEditAssetForm: FC<IAddEditAssetFormProps> = ({ data, onSubmit }) => {
  const fileState = useAppSelector(state => state.files);  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IAssetRequestForm>({
    defaultValues: {
      asset_key: data?.asset_key ?? "",
      asset_type: data?.asset_type ?? "other",
      description: data?.description ?? "",
    },
  });

  return (
    <Fragment>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Asset Type</SelectLabel>
                <SelectItem value="gallery">Gallery Asset</SelectItem>
                <SelectItem value="product">Product Asset</SelectItem>
                <SelectItem value="other">For Others..</SelectItem>                
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
        <FilesAutoComplete
            searchItems={fileState.files_list?.map((item: IFileResponseRecord) => ({value: item.name, label: item.name})) ?? []}
            title="Select file from S3" 
            onValueChange={(value: string) => console.log(`Selected: ${value}`)}/>
        <Textarea placeholder="Enter Asset Description" />
      </form>
    </Fragment>
  );
};

export default AddEditAssetForm;
