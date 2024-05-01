import bcrypt from 'bcrypt';

export default async function CompareHashPassword(plainText, hashText) {
  const isPasswordMatch = await bcrypt.compare(plainText, hashText);

  return isPasswordMatch;
}
