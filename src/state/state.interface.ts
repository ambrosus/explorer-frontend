export interface PagesState {
  loading: boolean;
  error: object | string | null;
  data: object | null;
}

export interface ActionCreator {
  address?: string | undefined;
  params?: object | null;
}

export type ActionsFetch = ({ address, params }: ActionCreator) => void;
