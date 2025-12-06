'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Simple3DModel from '../../components/model';

export default function Home() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="w-screen">
      <div className="text-white text-center text-9xl mt-48">
      <b>Привет. Я Антон.</b>
        <br/>
      Frontend <b>Разработчик.</b>
      </div>
      <div className="text-white text-center text-5xl mt-24">
        Code. Interface. Magic.
      </div>
      <div ref={ref} className={`text-white text-center text-9xl mt-80 transition-all duration-1500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p><b>
          Делаю сложное — простым и красивым
        </b></p>
        
      </div>
      <div className="w-full flex flex-wrap justify-center gap-8 mt-24">
          <div  
            className={`basis-[32rem] h-[20rem] m-5 relative group`}
          >
            {/* Контейнер для картинки */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/img2.jpeg"
                alt="Описание изображения"
                fill
                className="object-cover rounded-2xl group-hover:scale-105 transition-all duration-500 shadow-xl/60"
              />
              
              {/* Оверлей для затемнения */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-500 rounded-2xl"></div>
              
              {/* Текст поверх картинки */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 p-4">
                <p className="text-white text-5xl font-semibold text-center">
                  Никогда не переставать учиться
                </p>
              </div>
            </div>
          </div>
          
        <div 
          className={`basis-[64rem] h-[20rem] m-5 relative group`}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/img1.jpg"
              alt="Описание изображения"
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-all duration-500 shadow-xl/60"
            />
            
            {/* Оверлей для затемнения */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-500 rounded-2xl"></div>
            
            {/* Текст поверх картинки */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 p-4">
              <p className="text-white text-5xl font-semibold text-center">
                Строю цифровой опыт
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
      <Simple3DModel /> 
      </div>
    </div>
  );
}
