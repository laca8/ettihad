import { TypeAnimation } from "react-type-animation";
import { Trophy, Target, Timer, Volleyball } from 'lucide-react';
import { motion } from "framer-motion";



const Home = () => {
    return (
        <div
            className={`justify-center  object-none  bg-no-repeat bg-cover bg-center rounded-lg h-[100vh] border-2`}

            style={{ backgroundImage: `url(https://image.slidesdocs.com/responsive-images/background/sports-sporting-goods-illustration-powerpoint-background_d0b8b878ea__960_540.jpg)` }}>

            <div className="h-[100px]">
                {/* Basketball court */}

                {/* Basketball */}
                <motion.div
                    className="ml-5 w-16 h-16 rounded-full bg-orange-500 border-4 border-black animate-pulse"
                    style={{
                        backgroundImage: "radial-gradient(circle, #f97316 10%, #000000 10%, #000000 20%, #f97316 20%, #f97316 30%, #000000 30%, #000000 40%, #f97316 40%)",
                    }}
                    animate={{
                        y: [100, 10, 100],
                    }}
                    transition={{
                        y: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                />


            </div>


            <div
                style={{
                    width: "2rem",
                    height: "1rem",
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >

            </div>
            <div className="flex justify-center items-center h-[40vh] border-l-2 border-r-2  border-teal-800 max-lg:m-5 ">
                <h1 className="text-yellow-600 text-3xl w-96 bg-[rgb(0,0,0,0.5)] rounded-xl p-4 mr-10 text-center font-bold tracking-wide  leading-tight  shadow-2xl">
                    <TypeAnimation
                        sequence={["الرياضة أخلاق", 2000, "الرياضة هي تربية للنفوس قبل أن تكون إحرازاً للكؤوس", 2000, "الرياضة هي الإدارة العاقلة للجسم السليم", 2000]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-lg">
                <div className="flex space-x-8">
                    <div className="animate-bounce">
                        <Trophy className="w-12 h-12 text-yellow-600 shadow-lg" />
                    </div>

                    <div className="animate-pulse">
                        <Target className="w-12 h-12 text-red-500 " />
                    </div>

                    <div className="animate-pulse">
                        <Timer className="w-12 h-12 text-blue-500" />
                    </div>

                    <div className="animate-bounce">
                        <Volleyball className="w-12 h-12 text-green-500 shadow-lg" />
                    </div>
                </div>

                <h2 className="mt-6 text-2xl font-bold text-zinc-900 animate-pulse bg-yellow-600 rounded-xl p-4 shadow-lg">
                    Sports & Fitness
                </h2>
            </div>
        </div >
    )
}

export default Home