import { FC, Fragment, useCallback, useEffect } from "react";
import Loader from "@/components/loaders/Loader";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchFilesAPI, MANNA_IMAGES_BUCKET } from "@/common/state/features/assets/file.slice";
import { ManageFilesAdminDataTable } from "@/components/tables/files/ManageFilesAdmin.table";
import { columns } from "@/components/tables/files/manage-files-table-column";

const FileTableSection: FC = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const fileState = useAppSelector((state) => state.files);
  
    const fetchFilesListAPIHandler = useCallback(()=>{
      if (!Boolean(authState.token) || authState.token === "") return;
      dispatch(fetchFilesAPI({token:authState.token, bucket:MANNA_IMAGES_BUCKET}));
    },[authState.token]);
  
    useEffect(()=>{
      fetchFilesListAPIHandler();
    },[]);
  
    useEffect(()=>{
      if (fileState.files_list.length === 0) return;      
    },[fileState.files_list]);
  
    const isLoading = fileState.files_list_status === "initial" ||
                      fileState.files_list_status === "pending";
  
    return (<Fragment>
        <div className="flex flex-col text-base flex-start">
          <Loader display={isLoading} text="loading files"/>
          {!isLoading && <h3 className="mb-4 text-2xl">Your Uploaded Files</h3>}
          {!isLoading && <p className="mb-4">Contains list of all uploaded images to Manna Group International app</p>}
          {!isLoading && <ManageFilesAdminDataTable data={fileState.files_list} columns={columns}/>}
        </div>
    </Fragment>);
}; 
export default FileTableSection;