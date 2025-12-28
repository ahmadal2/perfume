import { SignInCard } from "./sign-in-card-2";

const DemoOne = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <SignInCard onLoginSuccess={(user) => console.log('Login success:', user)} />
        </div>
    );
};

export { DemoOne };
