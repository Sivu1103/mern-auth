import { useSelector } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const handleSignOut = async () => {
  try {
    await fetch('/api/auth/signout');
    dispatch(signOut())
  } catch (error) {
    console.log(error);
  }
};

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser} = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
      <img
          src={currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        />
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          
        />
        




        </form>
        <div className="flex justify-center items-center mt-5">
        <button
          onClick={handleSignOut}
          className="bg-red-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-800 w-full "
          >
          Sign out
        </button>
      </div>
    </div>
  )
}
