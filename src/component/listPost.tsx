import { useEffect, useState } from "react";
import SortFunction from "./sort_filter";
import { useSearchParams } from "react-router-dom";
import Card from "./card";
import Pagination from "./pagination";
interface ImageProps {
  file_name?: string;
  id: number;
  mime: string;
  url: string;
}
interface ListProps {
  slug?: string;
  title?: string;
  content?: string;
  created_at?: string;
  published_at?: string;
  small_image?: ImageProps[] | undefined;
  medium_image: ImageProps[];
}
export default function ListPost() {
  const [searchParams, setSearchParams] = useSearchParams();
  //   get value dari query
  const queryPageSize = searchParams.get("pageSize");
  const queryPage = searchParams.get("page");
  const querySort = searchParams.get("sort");
  //   get value dari local
  const getPageSizeLocal = localStorage.getItem("page-size");
  const getPageLocal = localStorage.getItem("page");
  const getSortLocal = localStorage.getItem("sort");
  //   Check Validate page dari query dan local agar persistent dari reload dan ganti page
  const defaultPageSize = queryPageSize ?? getPageSizeLocal ?? "10";
  const defaultPage = queryPage ?? getPageLocal??'1';
  const defaultSort = (querySort ?? getSortLocal ?? "-published_at") as
    | "published_at"
    | "-published_at";
  // state List
  const [list, setList] = useState<ListProps[]>();
  //   state query
  const [showPageSize, setShowPageSize] = useState<number>(
    parseInt(defaultPageSize)
  );
  const [showPage, setShowPage] = useState<number>(parseInt(defaultPage!));
  const [paginationMeta, setPaginationMeta] = useState<any>();
  const [sort, setSort] = useState<"published_at" | "-published_at">(
    defaultSort
  );
  // state guard untuk query agar tidak ke reset saat pindah halaman
  const [hasMounted, setHasMounted] = useState(false);
  //   useEffect reset page ketika ganti sort/size
//   Reset ini bertujuan agar tidak ada bug pada saat berganti pagesize 10 ke 50
// dikarenakan pagination akhir nya akan menjadi berbeda
useEffect(()=>{setHasMounted(true)},[])
  useEffect(() => {
    if(hasMounted){
    setShowPage(1);
    }
  }, [showPageSize, sort]);
  //   useeffect localstorage
  useEffect(() => {
    setSearchParams({
      page: showPage.toString(),
      sort,
      pageSize: showPageSize.toString(),
    });
    localStorage.setItem("page-size", showPageSize.toString());
    localStorage.setItem("page", showPage.toString());
    localStorage.setItem("sort", sort);
  }, [sort, showPageSize, showPage]);
  //   untuk fetching
  useEffect(() => {
    setSearchParams({
      page: showPage.toString(),
      sort,
      pageSize: showPageSize.toString(),
    });
    const fetchData = async () => {
      const data = await fetch(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${showPage}&page[size]=${showPageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const response = await data.json();
      setPaginationMeta(response.meta);
      console.log("without interface", response);
      console.log(response.data as ListProps[]);
      setList(response.data as ListProps[]);
      //   console.log(list?.map((item) => item.small_image?.map((img) => img.url)));
    };
    fetchData();
  }, [sort, showPageSize, searchParams, showPage]);
  //   untuk check/cleanup firsttime visit menambahkan localstorage
  useEffect(() => {
    const init = () => {
      // Always sync query to localStorage and state on mount
      if (queryPageSize) {
        localStorage.setItem("page-size", queryPageSize);
        setShowPageSize(parseInt(queryPageSize));
      }
      if (queryPage) {
        localStorage.setItem("page", queryPage);
        setShowPage(parseInt(queryPage));
      }
      if (querySort) {
        localStorage.setItem("sort", querySort);
        setSort(querySort as "published_at" | "-published_at");
      }
    };
    init();
  }, []);
  useEffect(() => console.log(paginationMeta), [paginationMeta]);
  return (
    <div className="max-w-[1200px] w-[80%] mx-auto h-full min-h-screen pb-6 mt-16">
      <SortFunction
        setShowPageSize={setShowPageSize}
        setSort={setSort}
        sort={sort}
        showPageSize={showPageSize}
      />
      <div className="w-full h-full  flex gap-6 flex-wrap justify-between mt-8">
        {list?.map((item, index) => {
          // Image doesnt have accesss
          //   const srcImage = item.small_image?.[0]?.url;
          //   const proxiedUrl = srcImage?.replace(
          //     "https://assets.suitdev.com",
          //     "/image-proxy"
          //   );
          return (
            <Card
              key={`${item.title}-${index}`}
              //   pengganti
              src={
                index % 2 == 0
                  ? "https://res.cloudinary.com/duyurqj38/image/upload/v1752256088/marco_xo_ai6lb5.jpg"
                  : "https://res.cloudinary.com/duyurqj38/image/upload/v1752255861/yogas-design-rPzEQ7tTRr8-unsplash_rqjz82.jpg"
              }
              published_at={item.published_at}
              title={item.title}
            />
          );
        })}
      </div>
      <Pagination setShowPage={setShowPage} paginationMeta={paginationMeta} />
    </div>
  );
}
