// src/app/projects/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Настройки GitHub
  const GITHUB_USERNAME = 'Kyr0na'; // Замените на ваш GitHub username
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Опционально, для больших лимитов

  // Функция для определения категории проекта по технологиям и названию
  const getProjectCategory = (repo) => {
    const name = repo.name.toLowerCase();
    const topics = repo.topics || [];
    const language = repo.language || '';
    
    // Анализируем язык и темы
    if (language === 'PHP' || topics.includes('cms') || name.includes('joomla') || name.includes('wordpress')) {
      return 'cms';
    } else if (language === 'Python' && (name.includes('api') || name.includes('backend'))) {
      return 'backend';
    } else if ((name.includes('fullstack') || (repo.has_pages && name.includes('app'))) || 
               (language === 'JavaScript' && name.includes('fullstack'))) {
      return 'fullstack';
    } else if (language === 'JavaScript' || language === 'TypeScript' || 
               topics.includes('react') || topics.includes('nextjs') || topics.includes('frontend')) {
      return 'frontend';
    } else if (language === 'Python' || topics.includes('python')) {
      return 'backend';
    }
    
    return 'frontend'; // default
  };

  // Функция для получения описания из README
  const getDescriptionFromReadme = (readme) => {
    if (!readme) return 'Проект на GitHub без описания';
    // Парсим README и берем первый параграф
    const text = atob(readme);
    const firstParagraph = text.split('\n\n')[0].replace(/^#.*\n/, '').trim();
    return firstParagraph.length > 150 ? firstParagraph.substring(0, 150) + '...' : firstParagraph;
  };

  // Загрузка репозиториев с GitHub
  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Получаем список репозиториев
        let url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`;
        
        const headers = {};
        if (GITHUB_TOKEN) {
          headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const reposData = await response.json();
        
        // Фильтруем форки и пустые репозитории
        const filteredRepos = reposData.filter(repo => 
          !repo.fork && repo.description !== null
        );
        
        // Получаем README для каждого репозитория (опционально, для более детального описания)
        const reposWithDetails = filteredRepos.map((repo) => {
  return {
    id: repo.id,
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
    shortDescription: repo.description || 'Описание отсутствует',
    fullDescription: repo.description || 'Подробное описание проекта можно найти на GitHub',
    category: getProjectCategory(repo),
    technologies: [repo.language || 'JavaScript', ...(repo.topics || [])].filter(t => t && t !== 'javascript'),
    image: null,
    demoLink: repo.homepage,
    githubLink: repo.html_url,
    year: new Date(repo.created_at).getFullYear().toString(),
    featured: repo.stargazers_count > 0,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    updated_at: repo.updated_at
  };
});
        
        setRepos(reposWithDetails);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError(err.message);
        // Демо данные на случай ошибки
        setRepos([
          {
            id: 1,
            title: 'Пример проекта 1',
            shortDescription: 'Демо проект, замените на реальные данные из GitHub',
            fullDescription: 'Настройте GITHUB_USERNAME в файле ProjectsPage для получения реальных проектов',
            category: 'frontend',
            technologies: ['React', 'Next.js'],
            demoLink: null,
            githubLink: 'https://github.com',
            year: '2024',
            featured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepos();
  }, []);

  // Категории для фильтрации
  const categories = [
    { id: 'all', name: 'Все проекты', icon: '📚' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'fullstack', name: 'Fullstack', icon: '🚀' },
    { id: 'cms', name: 'CMS', icon: '📝' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? repos
    : repos.filter(p => p.category === selectedCategory);

  // Компонент карточки проекта
  const ProjectCard = ({ project, isFeatured }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
      <>
        <div className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
          isFeatured ? 'ring-2 ring-blue-400 ring-offset-2' : ''
        }`}>
          {/* Цветная полоска сверху по языку */}
          <div className={`h-2 ${getLanguageColor(project.language)}`}></div>
          
          {/* Заголовок и язык */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Язык и звезды */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getLanguageColorDot(project.language)}`}></div>
                <span className="text-xs text-gray-600">{project.language || 'JavaScript'}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {project.stars > 0 && (
                  <span className="flex items-center gap-1">
                    ⭐ {project.stars}
                  </span>
                )}
                {project.forks > 0 && (
                  <span className="flex items-center gap-1">
                    🍴 {project.forks}
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {project.title}
            </h3>

            {/* Дата обновления */}
            <div className="text-xs text-gray-400 mb-3">
              Обновлено: {new Date(project.updated_at).toLocaleDateString('ru-RU')}
            </div>

            {/* Short description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
              {project.shortDescription}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-3 border-t border-gray-100 mt-auto">
              <button
                onClick={() => setShowDetails(true)}
                className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
              >
                Подробнее
              </button>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-600 hover:text-gray-900 transition-all duration-200 text-sm font-medium flex items-center gap-1"
                >
                  GitHub
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
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">⭐ {project.stars || 0} звезд</span>
                    <span className="flex items-center gap-1">🍴 {project.forks || 0} форков</span>
                    <span className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getLanguageColorDot(project.language)}`}></div>
                      {project.language}
                    </span>
                  </div>
                </div>
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
                
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Открыть на GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Демо
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Вспомогательные функции для цветов языков
  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'PHP': 'bg-purple-500',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-400',
    };
    return colors[language] || 'bg-gray-400';
  };

  const getLanguageColorDot = (language) => {
    const colors = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'PHP': 'bg-purple-500',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-400',
    };
    return colors[language] || 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Загрузка проектов с GitHub...</p>
          <p className="text-sm text-gray-400 mt-2">Это может занять несколько секунд</p>
        </div>
      </div>
    );
  }

  if (error && repos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600 mb-4">Не удалось загрузить проекты с GitHub</p>
          <p className="text-sm text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Мои проекты
          </h1>
        </div>

        {/* Сетка проектов */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isFeatured={project.featured} />
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
            Все проекты на GitHub
          </h3>
          <p className="text-gray-600 mb-4">
            Посмотреть весь код и другие проекты можно на моём GitHub профиле
          </p>
          <a
            href={`https://github.com/Kyr0na`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            GitHub Профиль
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}