import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, provider } from '../firebase';
import './../App.css';
import { useAuthState} from "react-firebase-hooks/auth";
import { Link , useNavigate  } from "react-router-dom";

function Home() {
    const [user] = useAuthState(auth);
    

  return (
    <div className=''>
        {user ? (
            <>
                <UserInfo />
                <SignOutButton />
            </>
        ) : (
            <SignInButton />
        )}
    </div>
  );
}

export default Home;

//サインイン
function SignInButton() {
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        

        signInWithPopup(auth, provider).then((result) => {
            // Xử lý đăng nhập thành công ở đây
            console.log('Đăng nhập thành công:', result);
            navigate(`/calendar`);
        })
        .catch((error) => {
            // Xử lý lỗi đăng nhập ở đây
            console.error('Lỗi đăng nhập:', error);
        });;
    };

    return (
        <button onClick={signInWithGoogle}>
            <p>サインイン</p>
        </button>
    );
}

//サインアウト
function SignOutButton() {
    return (
        <button onClick={() => auth.signOut()}>
            <p>サインアウト</p>
        </button>
    );
}

function UserInfo() {
    return <div className=''>
        <img src={auth.currentUser.photoURL} alt=''/>
        <p>{auth.currentUser.displayName}</p>
    </div>;
}
