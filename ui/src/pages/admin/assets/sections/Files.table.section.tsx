import { FC, Fragment, useCallback, useEffect } from "react";
import Loader from "@/components/loaders/Loader";
import { useFileStore, MANNA_IMAGES_BUCKET } from "@/common/state/features/assets/file.slice";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { ManageFilesAdminDataTable } from "@/components/tables/files/ManageFilesAdmin.table";
import { columns } from "@/components/tables/files/manage-files-table-column";

const FileTableSection: FC = () => {
    const { token } = useAuthStore();
    const { files_list, files_list_status, fetchFilesAPI } = useFileStore();

    const fetchFilesListAPIHandler = useCallback(()=>{
      if (!Boolean(token) || token === "") return;
      fetchFilesAPI({token, bucket:MANNA_IMAGES_BUCKET});
    },[token]);

    useEffect(()=>{
      if (files_list.length === 0) fetchFilesListAPIHandler();
    },[files_list]);

    const isLoading = files_list_status === "initial" ||
                      files_list_status === "pending";

    return (<Fragment>
        <div className="flex flex-col text-base flex-start">
          <Loader display={isLoading} text="loading files"/>
          {!isLoading && <h3 className="mb-4 text-2xl">Your Uploaded Files</h3>}
          {!isLoading && <p className="mb-4">Contains list of all uploaded images to Manna Group International app</p>}
          {!isLoading && <ManageFilesAdminDataTable data={files_list} columns={columns}/>}
        </div>
    </Fragment>);
}; 
export default FileTableSection;