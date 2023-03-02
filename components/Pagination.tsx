import { PaginationProps, PostProps } from "@/utils/interface";
import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";

const Pagination = ({ setPage, page }: PaginationProps) => {
  const { paginateData } = useAppSelector((state): PostProps => state.post);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > paginateData.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = paginateData.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index: number) => {
    setPage(index);
  };

  return (
    <Flex justifyContent="center" alignItems="center" mt="5">
      <div className="btn-container">
        <button className="prev-btn" onClick={prevPage}>
          prev
        </button>
        {paginateData.map((item, index) => {
          return (
            <button
              key={index}
              className={`page-btn ${index === page ? "active-btn" : null}`}
              onClick={() => handlePage(index)}
            >
              {index + 1}
            </button>
          );
        })}
        <button className="next-btn" onClick={nextPage}>
          next
        </button>
      </div>
    </Flex>
  );
};

export default Pagination;
