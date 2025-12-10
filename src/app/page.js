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
    <div className="w-full min-h-screen">
  {/* Герой-секция */}
  <section className="w-full px-4 sm:px-6 lg:px-8 pt-32 md:pt-48 pb-16 md:pb-24">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-white text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
        Привет. Я Антон.
        <br className="hidden sm:block" />
        <span className="block mt-2 sm:mt-4 md:mt-6">
          Frontend <span className="text-emerald-300">Разработчик.</span>
        </span>
      </h1>
      
      <p className="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-8 sm:mt-12 md:mt-16 lg:mt-20 font-light">
        Code. Interface. <span className="text-cyan-300">Magic.</span>
      </p>
    </div>
  </section>

  {/* Анимированный блок */}
  <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
    <div className="max-w-7xl mx-auto">
      <div 
        ref={ref} 
        className={`text-white text-center transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold px-4">
          Делаю сложное — 
          <span className="block mt-2 sm:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            простым и красивым
          </span>
        </p>
      </div>
    </div>
  </section>

  {/* Галерея проектов */}
  <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Первый блок (на мобильных полная ширина, на ПК - 1 колонка из 3) */}
        <div className="lg:col-span-1">
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src="/img2.jpeg"
              alt="Процесс обучения и развития"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
              priority={false}
            />
            
            {/* Градиентный оверлей */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
            
            {/* Контент */}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
              <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight transform translate-y-0 group-hover:-translate-y-2 transition-all duration-500">
                Никогда не переставать учиться
              </p>
              <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700 mt-3"></div>
            </div>
          </div>
        </div>

        {/* Второй блок (на мобильных полная ширина, на ПК - 2 колонки из 3) */}
        <div className="lg:col-span-2">
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src="/img1.jpg"
              alt="Создание цифрового опыта"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 66vw"
              className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
              priority={false}
            />
            
            {/* Градиентный оверлей */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
            
            {/* Контент */}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
              <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight transform translate-y-0 group-hover:-translate-y-2 transition-all duration-500">
                Строю цифровой опыт
              </p>
              <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700 mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* 3D модель */}
  <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
    <div className="max-w-7xl mx-auto">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 p-4 sm:p-6 md:p-8">
        <Simple3DModel />
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm sm:text-base">
          🔥 Интерактивная 3D модель
        </div>
      </div>
    </div>
  </section>

  {/* Декоративный разделитель */}
  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>
</div>
  );
}
