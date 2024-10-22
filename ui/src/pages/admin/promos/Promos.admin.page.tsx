import { FC } from "react";
// ..custom
import { TestAutoComplete } from "@/components/autocomplete/TestAutoComplete";
import { FilesAutoComplete, ISearchRecord } from "@/components/autocomplete/FilesAutoComplete";

const PromoAdminPage: FC = () => {

  const items: ISearchRecord[] = [
    {label: '/assets/file', value: '/assets/file'},
    {label: '/assets/file2', value: '/assets/file2'},
    {label: '/assets/file3', value: '/assets/file3'}
  ];

  return (
    <section className="relative py-8 lg:py-24" id="promos-admin-page">
      <div className="container relative z-10">
        <div className="flex text-base flex-start">
          <FilesAutoComplete 
            searchItems={items} 
            title="Search Files" 
            onValueChange={(value: string) => console.log('Selected value: ', value)}/>
        </div>
      </div>
    </section>
  );
};

export default PromoAdminPage;
