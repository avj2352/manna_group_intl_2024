import { FC, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// ..custom
import { useAppSelector } from "@/common/state/store";
import { IAssetRecord } from "@/common/interfaces";

const AssetAdminTable: FC = () => {
  // ..states
  const assetState = useAppSelector((state) => state.asset);  

  if (assetState.asset_list.length === 0) return <Fragment />;
  else return (
    <Table>      
      <TableHeader>
        <TableRow className="text-xl font-bold text-brand-base">
          <TableHead className="font-bold text-brand-base">#</TableHead>
          <TableHead className="font-bold text-brand-base">Key</TableHead>
          <TableHead className="font-bold text-brand-base">Type</TableHead>
          <TableHead className="font-bold text-brand-base">Position</TableHead>
          <TableHead className="w-[100px] font-bold text-brand-base">Description</TableHead>
          <TableHead className="font-bold text-brand-base">Image URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assetState.asset_list.map((item: IAssetRecord, idx: number) => (
          <TableRow key={item.asset_id} className="text-lg">
            <TableCell className="font-medium">{idx+1}</TableCell>
            <TableCell>{item.asset_key}</TableCell>
            <TableCell>{item.asset_type}</TableCell>
            <TableCell>{item.position}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.url}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AssetAdminTable;
