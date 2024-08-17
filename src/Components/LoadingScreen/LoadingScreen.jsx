import Lottie from 'react-lottie';
import * as roseAnimation from '../../assets/animation/rose-animation.json';
import * as teddyBearAnimation from '../../assets/animation/teddy-bear-animation.json';
import * as dollAnimation from '../../assets/animation/japan-animation.json';

const animations = [roseAnimation, teddyBearAnimation, dollAnimation];

const LoadingScreen = () => {
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: randomAnimation.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
            <Lottie options={defaultOptions} height={200} width={200} />
            <p className="text-xl font-semibold text-red-600 mt-4">Loading...</p>
        </div>
    );
};

export default LoadingScreen;
