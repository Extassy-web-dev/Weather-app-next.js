import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


const details = ({ data }: { data: any }) => {
    const [dataWeather, setDataWeather] = useState([])
    const router = useRouter()

    useEffect(() => {
        setDataWeather(data.forecast)
    }, [])

    const statickData = [
        {
            id: 1,
            img: '../sunnes.png',
            time: "15.00",
            gradus: "29°C"
        },
        {
            id: 2,
            img: '../sunnes.png',
            time: "16.00",
            gradus: "26°C"
        },
        {
            id: 3,
            img: '../oblachno.png',
            time: "17.00",
            gradus: "24°C"
        },
        {
            id: 4,
            img: '../lunars.png',
            time: "18.00",
            gradus: "23°C"
        },
        {
            id: 5,
            img: '../lunars.png',
            time: "19.00",
            gradus: "22°C"
        },
    ]

    const statickWeatherData = [
        {
            id: 1,
            date: "Sep, 13",
            img: "../thunder.png",
            gradus: "21°"
        },
        {
            id: 2,
            date: "Sep, 14",
            img: "../rain.png",
            gradus: "22°"
        },
        {
            id: 3,
            date: "Sep, 15",
            img: "../sunny.png",
            gradus: "34°"
        },
        {
            id: 4,
            date: "Sep, 16",
            img: "../cloudy.png",
            gradus: "27°"
        },
        {
            id: 5,
            date: "Sep, 17",
            img: "../rain.png",
            gradus: "32°"
        },
    ]

    return (
        <div className="main flex justify-center items-center w-full h-full max-w-full">
            <div className="app_box relative flex flex-col items-start gap-16 w-[450px]" style={{ background: "linear-gradient(-60deg, rgb(73, 169, 239), rgb(71, 190, 224))" }}>
                <img src="../bg-line1.png" className='absolute top-[200px] left-0' alt="" />
                <img src="../bg-line2.png" className='absolute top-[80px] right-0' alt="" />


                <div className='px-[30px] pt-[40px]'>
                    <img onClick={() => router.push('/')} src="../back.svg" alt="back" className='cursor-pointer' />
                </div>

                <div className='flex w-full max-w-full justify-between items-center px-[30px] text-white'>
                    <h1 className='font-[900] text-[24px]' style={{ textShadow: "-2px 3px 1px rgba(0, 0, 0, 0.10)" }}>Today</h1>
                    <p className='text-[18px] font-[400]' style={{ textShadow: "-2px 3px 1px rgba(0, 0, 0, 0.10)" }}>{new Date().toLocaleString('en-US', { month: 'short' })}, {new Date().getUTCDate()} </p>
                </div>


                <div className='grid grid-cols-5 gap-[15px] px-[20px] text-white'>
                    {
                        statickData.map(item => {
                            return (
                                <div key={item.id} className='flex flex-col items-center gap-[15px] p-[10px] transition-all hover:bg-[#6cbcec] hover:rounded-[20px] hover:backdrop-blur-[1px] hover:border-[2px_solid_gray]'>
                                    <span className='text-[18px] font-[400]' style={{ textShadow: "-2px 3px 1px rgba(0, 0, 0, 0.10)" }}>{item.gradus}</span>
                                    <img src={item.img} alt="" />
                                    <span className='text-[18px] font-[400]' style={{ textShadow: "-2px 3px 1px rgba(0, 0, 0, 0.10)" }}>{item.time}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='w-full max-w-full px-[30px] text-white'>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-[24px] font-[900]' style={{ textShadow: "-2px 3px 1px rgba(0, 0, 0, 0.10)" }}>Next Forecast</h1>
                        <img src="../calendar.png" alt="" />
                    </div>


                    <div className='box-weather flex w-full flex-col overflow-y-scroll h-[500px] pr-[50px]'>
                        {
                            statickWeatherData.map(item => {
                                return (
                                    <div key={item.id} className='flex items-center justify-between'>
                                        <span className='text-[18px] font-[700]' style={{ textShadow: "-2px 3px 1px rgba(0, 0, 0, 0.10)" }}>{item?.date}</span>
                                        <img src={item.img} alt="" />
                                        <span className='text-[18px] font-[400]' style={{ textShadow: "-2px 3px 1px rgba(0, 0, 0, 0.10)" }}>{item?.gradus}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default details;

export const getServerSideProps = async () => {
    const API_ACCESS_KEY = process.env.API_ACCESS_KEY;

    if (!API_ACCESS_KEY) {
        console.error("API key is missing");
        return { props: { data: [] } };
    }

    const res = await axios.get(`http://api.weatherstack.com/forecast`, {
        params: {
            access_key: API_ACCESS_KEY,
            query: "Samarkand",
            hourly: 1
        }
    });

    if (res.status !== 200) {
        return { props: { data: [] } };
    }

    const data = await res.data

    return { props: { data } };
};

