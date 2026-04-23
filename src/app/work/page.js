// src/app/projects/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Название вашего проекта 1',
      shortDescription: 'Краткое описание в одну-две строки, что это за проект',
      fullDescription: 'Подробное описание проекта. Расскажите, какую задачу решали, какие технологии использовали, с какими сложностями столкнулись и чему научились. Это покажут при нажатии на кнопку "Подробнее".',
      category: 'fullstack', // frontend, backend, fullstack, design, cms
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
      image: '/projects/project1.jpg', // Положите картинку в папку public/projects/
      demoLink: null, // Если есть
      githubLink: null, // Если есть
      year: '2024',
      featured: false, // Отмеченные проекты будут подсвечены
    },
    {
      id: 2,
      title: 'Сайт на CMS Joomla',
      shortDescription: 'Корпоративный сайт для школы с личным кабинетом',
      fullDescription: 'Разработал полнофункциональный сайт для МОБУ СОШ №9. Реализовал: новостную ленту, расписание уроков, галерею, обратную связь. Интегрировал систему управления контентом, чтобы учителя могли сами обновлять информацию.',
      category: 'cms',
      technologies: ['Joomla', 'PHP', 'JavaScript', 'MySQL', 'HTML5/CSS3'],
      image: null,
      demoLink: null,
      githubLink: null,
      year: '2024',
      featured: false,
    },
    {
      id: 3,
      title: 'Todo App на React',
      shortDescription: 'Приложение для управления задачами',
      fullDescription: 'Создал современное приложение для заметок и задач. Реализовал: добавление/удаление задач, фильтрацию по статусу, поиск, сохранение в localStorage. Использовал Hooks, Context API для управления состоянием.',
      category: 'frontend',
      technologies: ['React', 'JavaScript', 'CSS Modules', 'LocalStorage'],
      image: null,
      demoLink: null,
      githubLink: null,
      year: '2024',
      featured: false,
    },
    {
      id: 4,
      title: 'Адаптивный лендинг',
      shortDescription: 'Современный одностраничный сайт',
      fullDescription: 'Разработал адаптивный лендинг для компании. Полностью адаптивен под все устройства, оптимизирован для SEO, имеет анимации и плавный скролл. Скорость загрузки 95+ по Google Lighthouse.',
      category: 'frontend',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      image: null,
      demoLink: null,
      githubLink: null,
      year: '2023',
      featured: false,
    },
    {
      id: 5,
      title: 'API для интернет-магазина',
      shortDescription: 'REST API на Node.js',
      fullDescription: 'Разработал бэкенд для интернет-магазина. Включает: авторизацию JWT, CRUD операции, корзину, обработку платежей. Документировал API с помощью Swagger.',
      category: 'backend',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
      image: null,
      demoLink: null,
      githubLink: null,
      year: '2024',
      featured: false,
    },
    {
      id: 6,
      title: 'Чат-приложение',
      shortDescription: 'Real-time чат с комнатами',
      fullDescription: 'Создал полноценное чат-приложение с комнатами и личными сообщениями. Использовал WebSockets для real-time обновлений. Реализовал: отправку изображений, уведомления, статус "печатает".',
      category: 'fullstack',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      image: null,
      demoLink: null,
      githubLink: null,
      year: '2024',
      featured: false,
    },
  ];

  // Категории для фильтрации
  const categories = [
    { id: 'all', name: 'Все проекты' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Fullstack' },
    { id: 'cms', name: 'CMS' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);

  // Компонент карточки проекта
  const ProjectCard = ({ project, isFeatured }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
      <>
        <div className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
          isFeatured ? 'ring-2 ring-blue-400 ring-offset-2' : ''
        }`}>
          {/* Изображение или заглушка */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-500">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4V4zm2 4v10h12V8H6zm2 2h8v6H8v-6z"/>
                </svg>
              </div>
            )}
            
            {/* Featured badge */}
            {isFeatured && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                ⭐ Избранное
              </div>
            )}
            
            {/* Category badge */}
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {project.category === 'frontend' && '🎨 Frontend'}
              {project.category === 'backend' && '⚙️ Backend'}
              {project.category === 'fullstack' && '🚀 Fullstack'}
              {project.category === 'cms' && '📝 CMS'}
            </div>
          </div>

          <div className="p-6">
            {/* Year */}
            <div className="text-xs text-blue-600 mb-2">{project.year}</div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>

            {/* Short description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setShowDetails(true)}
                className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
              >
                Подробнее
              </button>
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
                >
                  Демо
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Модальное окно с подробностями */}
        {showDetails && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetails(false)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                  {project.fullDescription}
                </p>
                
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Мои проекты
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Здесь собраны мои лучшие работы. Каждый проект — это решение реальной задачи и новые технологии.
          </p>
        </div>

        {/* Избранные проекты */}
        {selectedCategory === 'all' && featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>⭐</span> Избранные проекты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isFeatured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Сетка проектов */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isFeatured={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">В этой категории пока нет проектов</p>
          </div>
        )}

        {/* Призыв к действию */}
        <div className="text-center mt-16 p-8 bg-white/50 backdrop-blur-sm rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Хотите увидеть больше?
          </h3>
          <p className="text-gray-600 mb-4">
            Я постоянно создаю новые проекты и улучшаю существующие
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Связаться со мной
          </a>
        </div>
      </div>
    </div>
  );
}