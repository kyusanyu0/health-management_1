import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, provider } from '../firebase';
import './../App.css';
import { useAuthState} from "react-firebase-hooks/auth";
import { Link , useNavigate  } from "react-router-dom";
import './Calendar.css';

function Home() {
    const [user] = useAuthState(auth);
    

  return (
    <div className=''>
        {user ? (
            <>
                <SignOutButton/>
            </>
        ) : (
            <SignInButton />
        )}
    </div>
  );
}

export default Home;

//ログイン
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
        <>
        <h1>個人健康管理システム</h1>
        <p1>本システムは現状や時間の経過を確認し、現状の把握、今後の目標や計画を立てやすいシステムである。<br/>
        カレンダーのメモ機能を使用することでスケジュールの管理や、健康記録機能で体重、睡眠、血圧を記録し、グラフで確認することができる。<br/>
        カロリー計算機能ではその日食べたもののカロリーの計算が可能である。<br/>
        googleアカウントを利用してログインする</p1><br/>

        <button
         className ="signIn"
         onClick={signInWithGoogle}>
        <p>ログイン</p>
        </button>

        </>
    );
}

//ログアウト
function SignOutButton() {
    const navigate = useNavigate();
    const calendarBack = () => {
        navigate(`/calendar`);
      };
    return (
        <>
        <h1>ログアウトしますか</h1>
        <button 
        className="signout"
        onClick={() => auth.signOut()}>
            <p1>はい</p1>
        </button>
        <button
        className='back'
        onClick={calendarBack}>
            <p1>いいえ</p1>
        </button>
        </>
    );
}
