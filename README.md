WebTwitter
========================

<h1>Starting</h1>

First install the dependencias needed

<code>yarn install</code>

<h2>Setting .env variables</h2>

You could run the following command

<code>yarn envs</code>

Or do it manually using the .env.example file as a guide

<h2>Running the project</h2>

If you follow the default setup and use Firebase emulators you should start them using:

<code>yarn emulators</code>

If you want to use your own project, you should setup your .env.local and env.test.local files with it's own data, using the .env.production as a template


Once the emulators are up or your firebase project configured, you can then run:

<code>yarn start</code>

Optionally, you could populate the database with mock data using the command

<code>yarn populate</code>