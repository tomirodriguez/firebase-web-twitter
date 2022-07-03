WebTwitter
========================

<h1>Starting</h1>

First install the dependencias needed

<code>yarn install</code>

<h2>Create the .env files<h2>

There is a model of .env files in .env.example. You should end with three files, depending on where you run the app: .env.production, .env.local, .env.test.local

<h2>Running the project</h2>

If you follow the default setup and use Firebase emulators you should start them using:

<code>yarn emulators</code>

If you want to use your own project, you should setup your .env.local and env.test.local files with it's own data, using the .env.production as a template


Once the emulators are up or your firebase project configured, you can then run:

<code>yarn start</code>

<h2>Usefull Scripts</h2>

There are a set of scripts that you could use to automate some actions. 

In order to do that, you should first step inside /scripts folder and then run

<code>yarn install</code>

<h3>Setting .env variables</h3>

<code>yarn envs</code> will autogenerate all three .env files

<h3>Emulator Database<h3>

<code>yarn populate</code> will populate the emulators database. Beware that the emulator should be running first