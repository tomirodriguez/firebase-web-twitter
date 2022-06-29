import { FC, useState, SyntheticEvent } from 'react';
import { useUser } from '../../../hooks';
import { Logo } from '../../../icons';
import { InputField, PrimaryButton } from '../../ui';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { nameValidation, usernameValidation } from './utils/index';

type Props = {
  suggestedName?: string;
};

type InputState = {
  value: string;
  error: string;
};

export const FillUserData: FC<Props> = ({ suggestedName = '' }) => {
  const [loading, setLoading] = useState(false);
  const { setUserProfile, user } = useUser();
  const { getUserProfile: getUser } = useUserProfile();
  const [name, setName] = useState<InputState>({
    value: suggestedName,
    error: nameValidation(suggestedName),
  });
  const [username, setUsername] = useState<InputState>({
    value: '',
    error: usernameValidation(''),
  });
  const [bio, setBio] = useState('');
  const [forceError, setForceError] = useState(false);

  if (!user) return null;

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setLoading(true);
    setForceError(true);

    if (name.error !== '' || username.error !== '') return;

    const existingUser = await getUser(username.value);

    if (existingUser)
      setUsername({ ...username, error: 'Username already taken' });
    else {
      setUserProfile({
        ...user,
        username: username.value,
        name: name.value,
        bio,
      }).finally(() => setLoading(false));
    }
  };

  const handleNameChange = (value: string) => {
    const error = nameValidation(value);
    setName({ value, error });
  };

  const handleUsernameChange = (value: string) => {
    const cleanUsername = value.replace('@', '');
    const error = usernameValidation(cleanUsername);
    setUsername({ value: cleanUsername, error });
  };

  return (
    <form
      className="bg-black px-12 pb-12 pt-2 rounded-3xl flex-col flex items-center"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-8 mt-6">
        <Logo size={35} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-12">
        We want to know you better
      </h2>
      <div className="mb-4 w-full">
        <InputField
          label="name"
          onChange={handleNameChange}
          placeholder="Your name"
          type={'text'}
          value={name.value}
          autocomplete={false}
          forceError={forceError}
          error={name.error}
        />
      </div>
      <div className="mb-4 w-full">
        <InputField
          label="username"
          onChange={handleUsernameChange}
          placeholder="Username"
          type={'text'}
          value={username.value.length > 0 ? `@${username.value}` : ''}
          autocomplete={false}
          maxLength={20}
          forceError={forceError}
          error={username.error}
        />
      </div>

      <div className="mb-6 w-full">
        <InputField
          label="bio"
          onChange={setBio}
          placeholder="Your bio"
          type={'text'}
          value={bio}
          autocomplete={false}
          maxLength={160}
          forceError={forceError}
          error=""
        />
      </div>
      <div className="w-2/3 text-white h-12">
        <PrimaryButton
          text="Submit"
          title="Submit"
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};
