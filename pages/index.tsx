import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';



export default function Home({ data }: { data: any }) {
    const [city, setCity] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cityQuery = city.trim() !== '' ? city : 'Samarkand';


        router.push({
            pathname: '/',
            query: { city: cityQuery },
        });
    };


    return (
        <>
            <div className="main absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-full max-w-full">
                <div className="app_box relative h-full flex flex-col items-center gap-16 w-[450px] max-h-full" style={{ background: "linear-gradient(-60deg, rgb(73, 169, 239), rgb(71, 190, 224))" }}>
                    <img src="../bg-line1.png" className='absolute top-[200px] left-0' alt="" />
                    <img src="../bg-line2.png" className='absolute top-[80px] right-0' alt="" />
                    <div className="top p-[30px] w-full">
                        <div className='flex items-center justify-between w-full max-w-full h-[57px] bg-white rounded-2xl p-4'>
                            <form onSubmit={handleSubmit} className='flex items-center gap-[20px]'>
                                <button type='submit'><img className='cursor-pointer' src="../arrow.png" alt="" /></button>
                                <input onChange={(e) => setCity(e.target.value)} value={city} className='bg-[none] border-none' type="text" placeholder='Search here' name='query' required />
                            </form>
                            <img className='cursor-pointer' src="../micro.png" alt="" />
                        </div>
                    </div>

                    <div>
                        <img className='z-50 opacity-[11]' src="../sun.png" alt="" />
                    </div>

                    <div className='w-full max-w-full px-[30px] min-h-ull '>
                        <div onClick={() => router.push('/details')} className='border-[2px] p-[20px] cursor-pointer w-full max-w-full flex flex-col bg-[#80bcf8] items-center gap-[15px] border-gray-300 rounded-2xl'>
                            <div className='pt-[10px] flex justify-center items-center text-[18px] text-white'>
                                Today, {new Date().getUTCDate()} {new Date().toLocaleString('en-US', { month: 'long' })}
                            </div>
                            <div>
                                <h1 className='font-[500] text-[80px] text-white'>{data.current.temperature}°</h1>
                            </div>

                            <div>
                                <span className='text-[15px] font-[400] text-white'>{data.location.name}</span>
                            </div>

                            <div className='flex flex-col gap-[15px] items-start'>
                                <div className='flex justify-between gap-[20px] items-center'>
                                    <div className='flex items-center gap-[15px]'>
                                        <img src="../windy.png" alt="" />
                                        <span className='text-white text-[15px]'>Wind</span>
                                    </div>
                                    <span className='text-white'>|</span>
                                    <div>
                                        <span className='text-white text-[15px]'>{data.current.wind_speed}km/h</span>
                                    </div>
                                </div>
                                <div className='flex justify-between gap-[20px] items-center'>
                                    <div className='flex items-center gap-[15px]'>
                                        <img src="../hum.png" alt="" />
                                        <span className='text-white text-[15px]'>Hum</span>
                                    </div>
                                    <span className='text-white'>|</span>
                                    <div>
                                        <span className='text-white text-[15px]'>{data.current.humidity}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
export const getServerSideProps = async (context: any) => {
    const API_ACCESS_KEY = process.env.API_ACCESS_KEY;
    let { city } = context.query;

    if (!city) {
        city = "Samarkand";
    }

    if (!API_ACCESS_KEY) {
        console.error("API key is missing");
        return { props: { data: [] } };
    }

    try {
        const res = await axios.get(`http://api.weatherstack.com/forecast`, {
            params: {
                access_key: API_ACCESS_KEY,
                query: city,
                hourly: 1
            }
        });

        if (res.status !== 200) {
            return { props: { data: [] } };
        }

        const data = res.data;
        return { props: { data } };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { data: [] } };
    }
};
