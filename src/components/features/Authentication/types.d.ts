type OnUserProfileDataSubmited = ({
  name: string,
  username: string,
  bio: string,
}) => Promise<{
  error?: string;
  field?: 'name' | 'username';
}>;
