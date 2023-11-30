import EnhancedTable from '@components/Table';
import { useState } from 'react';

const UserTable = () => {
  const [openDetail, setOpenDetail] = useState({
    id: '',
    open: false,
  });
  const [data, setData] = useState();

  const loadData = async () => {};

  return (
    <>
      {openDetail.open && <div></div>}
      <EnhancedTable
        columns={}
        data={}
        loadTable={}
        onRowEvent={setOpenDetail}
      />
    </>
  );
};
export default UserTable;
