import { FC, useState, SyntheticEvent } from 'react';
import { useUser } from '../hooks';
import { Logo } from '../icons';
import { InputField, PrimaryButton } from './ui';

type Props = {
  suggestedName?: string;
};

export const FillUserData: FC<Props> = ({ suggestedName = '' }) => {
  const { setUserProfile, user } = useUser();
  const [name, setName] = useState(suggestedName);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [forceError, setForceError] = useState(false);

  if (!user) return null;

  const nameValidation: InputValidation = (newName: string) => {
    if (newName.length === 0)
      return { errorMessage: 'Name must be filled', error: false };

    return { errorMessage: '', error: false };
  };

  const usernameValidation: InputValidation = (newUsername: string) => {
    const cleanValue = newUsername.replace(/[^a-zA-Z\d_-]/g, '');
    if (cleanValue.length === 0) {
      setUsername('');
      return { errorMessage: 'Username must be filled', error: false };
    } else {
      setUsername('@' + cleanValue);
    }

    return { errorMessage: '', error: false };
  };

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    setForceError(true);

    const { error: nameHasError } = nameValidation(name);
    const { error: usernameHasError } = nameValidation(username);

    console.log('VA EL USER', nameHasError, usernameHasError);
    if (nameHasError || usernameHasError) return;

    console.log('VA EL USER');

    setUserProfile({ ...user, username, name, bio });
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
          onChange={setName}
          placeholder="Your name"
          type={'text'}
          value={name}
          autocomplete={false}
          validation={nameValidation}
          forceError={forceError}
        />
      </div>
      <div className="mb-4 w-full">
        <InputField
          label="username"
          onChange={setUsername}
          placeholder="Username"
          type={'text'}
          value={username}
          autocomplete={false}
          maxLength={20}
          validation={usernameValidation}
          forceError={forceError}
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
        />
      </div>
      <div className="w-2/3 text-white h-12">
        <PrimaryButton text="Submit" title="Submit" type="submit" />
      </div>
    </form>
  );
};
