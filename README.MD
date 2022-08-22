# Mailgun demo
Send a email with file attachments demo using mail gun

# .env
Put the follwoiung into .env file
- MAILGUN_PRIVATE_API_KEY=xxxx-xxxx-xxxx
- MAILGUN_PUBLIC_API_KEY=pubkey-xxxx
- MAILGUN_DOMAIN=xxxx.mailgun.org


# NPM
- npm i express dotenv mailgun-js

Run this command TWO times to get later version
- npm i mailgun.js
- npm i mailgun.js

# Run
- npm run dev

# Usage
- Ensure you have a mailgun account setup
- Edit the file: mailgun.rest and change the "to"" email address
- Send the request
- Check your email


# git notes
…or create a new repository on the command line
echo "# mailgun-demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/adriangbarnett/mailgun-demo.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/adriangbarnett/mailgun-demo.git
git branch -M main
git push -u origin main