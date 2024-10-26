import { FC, useCallback, useEffect } from "react";
import AssetTableSection from "./assets/sections/Assets.table.section";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchFilesAPI, MANNA_IMAGES_BUCKET } from "@/common/state/features/assets/file.slice";

const AdminDashboardPage: FC = () => {

  const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const fileState = useAppSelector((state) => state.files);
  
    const fetchFilesListAPIHandler = useCallback(()=>{
      if (!Boolean(authState.token) || authState.token === "") return;
      dispatch(fetchFilesAPI({token:authState.token, bucket:MANNA_IMAGES_BUCKET}));
    },[authState.token]);    
  
    useEffect(()=>{
      if (fileState.files_list.length === 0) fetchFilesListAPIHandler();
    },[fileState.files_list]);

  return (
    <section className="relative py-8 mt-12 lg:mt-2 lg:py-24" id="admin-dashboard">
      <div className="container relative z-10">
        <AssetTableSection/>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
