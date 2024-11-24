import { FC, Fragment, useEffect, useState } from "react";
import { SelectAutoComplete } from "./FilesAutoComplete";
import { IAssetRecord } from "@/common/interfaces";
import CancelableBadge from "@/components/badges/CancellableBadge";

type IAssetsMultiSelectProps = {
    searchList: IAssetRecord[];
    defaultList?: IAssetRecord[];
    onValueChange: (value: IAssetRecord[]) => void;
};

const AssetsMultiSelect: FC<IAssetsMultiSelectProps> = ({ defaultList, searchList, onValueChange }) => {

    const defaultValueList: IAssetRecord[] = defaultList ?? [];
    const [selectedList, setSelectedList] = useState<IAssetRecord[]>([]);
    
    const handleSelectChange = (value: string) => {        
        const selectedRecord = defaultValueList?.filter((item: IAssetRecord) => item.asset_id === value) ?? [];        
        setSelectedList(prev => [...prev, ...selectedRecord]);
    };

    const handleCancel = (data: IAssetRecord) => {
        setSelectedList(selectedList.filter((item) => item.asset_id !== data.asset_id));
    };

    // ..propagate
    useEffect(()=> {
      onValueChange(selectedList);
    },[selectedList]);

  return (
    <Fragment>
      {selectedList.length > 0 ? (
        <div>
          {selectedList.map((item, idx) => (<CancelableBadge 
            key={idx+1} 
            text={item.description}
            meta={item}
            onCancel={(item: unknown) => handleCancel(item as IAssetRecord)}/>))}
        </div>
      ) : (<p className="text-center">
          There are no assets selected !!
        </p>)}
        <SelectAutoComplete
        title="Select Asset"
        onValueChange={handleSelectChange}
        searchItems={
          searchList?.map((item) => ({
            label: item.description,
            value: item.asset_id,
          })) ?? []
        }
      />
    </Fragment>
  );
};

export default AssetsMultiSelect;
