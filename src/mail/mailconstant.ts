// const MAIL_HOST = process.env.MAIL_HOST;
// const MAIL_USER = process.env.MAIL_USER;
// const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
// const MAIL_FROM = process.env.MAIL_FROM;
// const MAIL_PORT = process.env.MAIL_PORT;
// const COPYRIGHT_YEAR = process.env.COPYRIGHT_YEAR;


const MAIL_HOST="smtp.titan.email"
const MAIL_PORT=465
const MAIL_USER="contact@rilati.com"
const MAIL_PASSWORD="qXEm2zc>54A~6b#4cKx!"
const COPYRIGHT_YEAR=2023
const MAIL_FROM="contact@rilati.com"


export const MAIL_ENV = {
  MAIL_HOST: MAIL_HOST,
  MAIL_USER: MAIL_USER,
  MAIL_PASSWORD: MAIL_PASSWORD,
  MAIL_FROM: MAIL_FROM,
  COPYRIGHT_YEAR: COPYRIGHT_YEAR,
  MAIL_TRANSPORT: `smtp://${MAIL_USER}:${MAIL_PASSWORD}@${MAIL_HOST}`
};
