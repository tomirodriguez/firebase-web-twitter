import { FC, SyntheticEvent, useState } from 'react';
import { Logo } from '../../../../../icons';
import { InputField, PrimaryButton } from '../../../../ui';
import { nameValidation, usernameValidation } from './utils/index';

type Props = {
  suggestedName?: string;
  onProfileSubmitted: OnUserProfileDataSubmited;
};

type InputState = {
  value: string;
  error: string;
};

export const FillUserData: FC<Props> = ({
  suggestedName = '',
  onProfileSubmitted,
}) => {
  const [loading, setLoading] = useState(false);

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

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setLoading(true);
    setForceError(true);

    if (name.error !== '' || username.error !== '') return;

    onProfileSubmitted({ name: name.value, username: username.value, bio })
      .then((response) => {
        const { error, field } = response;
        if (error) {
          if (field === 'name') setName({ ...name, error });
          else if (field === 'username') setUsername({ ...name, error });
        }
      })
      .finally(() => setLoading(false));
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
