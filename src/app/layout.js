'use client';

import localFont from 'next/font/local'
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const myFont = localFont({ src:'../../public/Acorn-Bold.woff2' });

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${myFont.className}`}>
            <body className='bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 min-h-screen min-w-full flex flex-col items-center'>
        {/* Header - исправлен для адаптивности */}
        <header className='w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex backdrop-blur-lg bg-white/20 border mx-auto mt-4 sm:mt-8
          border-white/30 rounded-full justify-center sm:justify-around items-center gap-2 sm:gap-4 fixed top-0 left-1/2 -translate-x-1/2 
          text-white text-lg sm:text-xl lg:text-2xl tracking-wide z-50'>
          <Link href='/' className='mx-2 sm:mx-3 px-2 py-1 hover:bg-white/10 rounded-lg transition-all'>Home</Link>
          <Link href='/' className='mx-2 sm:mx-3 px-2 py-1 hover:bg-white/10 rounded-lg transition-all'>About</Link>
          <Link href='/' className='mx-2 sm:mx-3 px-2 py-1 hover:bg-white/10 rounded-lg transition-all'>Work</Link>
          <Link href='/' className='mx-2 sm:mx-3 px-2 py-1 hover:bg-white/10 rounded-lg transition-all'>Contact</Link>
        </header>

        {/* Main content - добавлен отступ сверху для фиксированного хедера */}
        <main className='flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-20'>
          {children}
        </main>

        {/* Footer - полностью переработан для адаптивности */}
        <footer className='w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 mb-8 sm:mb-24'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Блок с копирайтом */}
            <div className='text-white'>
              <p className='text-emerald-500 text-lg sm:text-xl font-medium'>© 2025 Korz dev</p>
              <p className='text-white/80 text-sm mt-2'>Разработка современных веб-приложений</p>
            </div>

            {/* Блок социальных сетей */}
            <div className='text-white'>
              <p className='text-emerald-500 text-lg sm:text-xl font-medium mb-3 sm:mb-4'><b>Соц. сети</b></p>
              <ul className='list-none space-y-2'>
                <li>
                  <a href='https://github.com/Kyr0na' 
                    className='flex items-center gap-2 hover:text-emerald-400 transition-colors duration-200'>
                    <span className='w-2 h-2 bg-emerald-500 rounded-full'></span>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href='https://vk.com/kyr0na' 
                    className='flex items-center gap-2 hover:text-emerald-400 transition-colors duration-200'>
                    <span className='w-2 h-2 bg-emerald-500 rounded-full'></span>
                    VK
                  </a>
                </li>
              </ul>
            </div>

            {/* Блок контактов */}
            <div className='text-white'>
              <p className='text-emerald-500 text-lg sm:text-xl font-medium mb-3 sm:mb-4'><b>Контакты</b></p>
              <ul className='list-none space-y-2'>
                <li>
                  <a href='mailto:korzhenkovanton322@yandex.ru'
                    className='flex items-center gap-2 hover:text-emerald-400 transition-colors duration-200'>
                    <span className='w-2 h-2 bg-emerald-500 rounded-full'></span>
                    Email
                  </a>
                </li>
                <li className='text-white/80 text-sm mt-4'>
                  Готов к сотрудничеству и новым проектам
                </li>
              </ul>
            </div>
          </div>
          
          {/* Декоративный разделитель */}
          <div className='w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8'></div>
          
          {/* Мобильная версия футера (альтернативная) */}
          <div className='block md:hidden text-center text-white/70 text-sm mt-4'>
            <p>© 2025 Korz dev. Все права защищены.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
