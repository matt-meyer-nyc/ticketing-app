// comes from built in node library or crypto
import { scrypt, randomBytes } from 'crypto';
// promisify will allow us to turn scrypt from needing callback, to being able to use async/await
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    // generate random string (salt)
    const salt = randomBytes(8).toString('hex');

    // actual hashing process
    // when use get scrypt get back buffer which is array with raw data inside
    const buf = (await scryptAsync(password, salt, 64)) as Buffer; // wrapping await with '()' and using as Buffer tells TS to read this as a buffer (otherwise doesn't know b/c doesn't understand promisify)

    // return concatonated hash + salt with '.' in between
    return `${buf.toString('hex')}.${salt}`;
  }
  // storedPassowrd is hashed pw with '.' and concatoned salt
  static async compare(storedPassword: string, suppliedPassword: string) {
    // storedPassowrd is hashed pw with '.' and concatoned salt
    // so to get just hashed pw, need to split
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer; // wrapping await with '()' and using as Buffer tells TS to read this as a buffer (otherwise doesn't know b/c doesn't understand promisify)

    return buf.toString('hex') === hashedPassword;
  }
}
