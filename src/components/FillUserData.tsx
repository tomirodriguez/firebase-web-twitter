import { FC, useState, SyntheticEvent } from 'react';
import { Logo } from '../icons';
import { InputField, PrimaryButton } from './ui';

type Props = {
  suggestedName?: string;
};

export const FillUserData: FC<Props> = ({ suggestedName = '' }) => {
  const [name, setName] = useState(suggestedName);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [forceError, setForceError] = useState(false);

  const nameValidation = (newName: string) => {
    if (newName.length === 0) return { error: 'Name must be filled' };

    return { error: '' };
  };

  const usernameValidation = (newUsername: string) => {
    const cleanValue = newUsername.replace(/[^a-zA-Z\d_-]/g, '');
    if (cleanValue.length === 0) {
      setUsername('');
      return { error: 'Username must be filled' };
    } else {
      setUsername('@' + cleanValue);
    }

    return { error: '' };
  };

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    setForceError(true);
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
