import User from '../models/User';

export async function login(email:string, password: string) {
  const findUser = await User.findOne({
    where: {
      email,
    },
  });
  if (findUser === null) return { holder: { message: 'Incorrect email or password' }, status: 401 };
  console.log(findUser);
  console.log(`Email: ${email} , senha: ${password}`);

  return { holder: { ...findUser }, status: 200 };
}

export async function update() {
  return 'update';
}
