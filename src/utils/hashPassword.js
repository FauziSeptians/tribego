import bcrypt from 'bcrypt';



export default function hashPassword(plainPassword) {
  const hash = bcrypt.hashSync(plainPassword, 10);

  return hash;
}
