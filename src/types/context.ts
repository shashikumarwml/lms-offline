export interface userDetailsType {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  is_active?: boolean;
  type?: string;
  tenant: {
    uid: string;
    name: string
  }
}

export interface UserContextTypes {
  accessToken?: string;
  userDetails?: userDetailsType;
  details?: any;
  setDetails?: any;
  isSidebarOpen: boolean;
}


export const userDetailsValue = {
  first_name: '',
  last_name: '',
  full_name: '',
  email: '',
  is_active: false,
  type: '',
  tenant: {
    uid: '',
    name: '',
  }
}

export const defaultValue = {
  accessToken: '',
  userDetails: userDetailsValue,
};
