import { Toaster } from 'react-hot-toast';
import studyImage from '../assets/images/study.svg';
import LoginForm from '../components/form/login';
import SignHeaderLayout from '../components/layout/signHeader';

function SignIn() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full h-full xl:h-screen flex flex-col xl:flex-row justify-center items-center xl:gap-28">
                <div className="h-full w-full flex flex-1 justify-center xl:justify-end items-center py-5 xl:p-0">
                    <SignHeaderLayout imageSrc={studyImage} />
                </div>

                <div className="h-full w-full flex flex-1 justify-center xl:justify-start items-center py-5 xl:p-0">
                    <div className="max-w-3/4 xl:min-w-[480px] bg-white rounded-lg shadow-lg">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
