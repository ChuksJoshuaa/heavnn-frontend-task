export interface InfoProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface SinglePageProps {
  singlePost: InfoProps;
  setSinglePost: React.SetStateAction<InfoProps>;
}

export interface PostDataProps {
  postData: InfoProps[] | [];
  setPostData: React.SetStateAction<InfoProps[] | any>;
}
export interface SearchDataProps {
  searchData: InfoProps[] | [];
  setSearchData: React.SetStateAction<InfoProps[] | any>;
}

export interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: React.SetStateAction<number>;
}

export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface DataProps {
  data: InfoProps[];
  userData: UserProps[];
}

export interface PostProps {
  isLoading: boolean;
  saveData: InfoProps[];
  paginateData: InfoProps[];
  userData: UserProps[];
}
