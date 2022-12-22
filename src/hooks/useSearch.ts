import { PageInfo, PaginationProps } from "tdesign-vue-next";
import { onMounted, reactive } from "vue";

export const useSearch = <DataType, SearchKeyType>(api: any, searchKey: SearchKeyType) => {
  const data = reactive<DataType[]>([]);
  const pagination = reactive<PaginationProps>({
    current: 1,
    total: 0,
    pageSize: 10,
  });

  const fetchData = async () => {
    const response = await api(
      {
        page: pagination.current,
        size: pagination.pageSize,
        total: pagination.total,
        ...searchKey
      },
      {
        _autoLoading: true
      }
    );
    Object.assign(data, response.data.data);
    Object.assign(pagination, response.data.paging);
  };
  const onPageChange = (pageInfo: PageInfo) => {
    pagination.current = pageInfo.current;
    pagination.pageSize = pageInfo.pageSize;
    fetchData();
  };
  onMounted(fetchData);
  return { data, pagination, fetchData, onPageChange }
}