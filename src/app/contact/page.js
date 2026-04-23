// src/app/contact/page.js
'use client';

import { useState } from 'react';

export default function ContactPage() {
  // Объявляем все состояния
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);  // ЭТО БЫЛО ПРОПУЩЕНО
  const [submitStatus, setSubmitStatus] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // Теперь это работает
    setSubmitStatus({ show: false, type: '', message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          show: true,
          type: 'success',
          message: 'Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.error || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или напишите мне напрямую на email.'
      });
    } finally {
      setIsSubmitting(false);  // Теперь это работает
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Свяжитесь со мной
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Я открыт для новых возможностей и интересных проектов
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Контактная информация */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Контактная информация
              </h2>
              
              <div className="space-y-4">
                {/* Телефон */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Телефон</p>
                    <a href="tel:+79002364983" className="text-lg text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                      +7 (900) 236-49-83
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <a href="mailto:korzhenkovanton322@yandex.ru" className="text-lg text-gray-800 font-semibold hover:text-blue-600 transition-colors break-all">
                      korzhenkovanton322@yandex.ru
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.22-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">GitHub</p>
                    <a href="https://github.com/Kyr0na" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                      github.com/Kyr0na"
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Города для работы</p>
                    <p className="text-lg text-gray-800 font-semibold">
                      Краснодар, Сочи
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Режим работы */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Условия сотрудничества
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span>Занятость</span>
                  <span className="font-semibold">Полная / Частичная</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span>Формат работы</span>
                  <span className="font-semibold">Удаленно / Офис</span>
                </div>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Напишите мне
            </h2>
            
            {submitStatus.show && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-medium ${
                  submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {submitStatus.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Антон"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="example@mail.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Расскажите о вашем предложении..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  'Отправить сообщение'
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Я отвечу на ваше сообщение в течение 24 часов
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}