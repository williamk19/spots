export type DataType = {
  tracks: {
    items: {
      id: number;
      album: {
        images: {
          url: string;
        }[];
        name: string;
      };
      duration_ms: number;
      name: string;
      artists: {
        name: string;
      }[];
    }[];
  };
};

export type SelectedType = {
  id: number;
  name: string;
  album: {
    images: {
      url: string;
    }[];
    name: string;
  };
  duration_ms: number;
  artists: {
    name: string;
  }[];
};

export type CurrentUser = {
  display_name: string;
  images:{
    url: string;
  }[];
}
