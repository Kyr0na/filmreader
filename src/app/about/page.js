'use client'

export default function AboutPage() {
  return (
    <div className="resume-container">
      <div className="resume-card">
        {/* Header Section */}
        <header className="header">
          <div className="header-content">
            <h1 className="name">Корженков Антон Валерьевич</h1>
            <p className="title">Fullstack-разработчик</p>
          </div>
        </header>

        {/* Contact & Personal Info Grid */}
        <div className="info-grid">
          <div className="info-section">
            <h2 className="section-title">Контакты</h2>
            <div className="contact-item">+7 (900) 236-49-83</div>
            <div className="contact-item">korzhenkovanton322@yandex.ru</div>
          </div>

          <div className="info-section">
            <h2 className="section-title">Личные данные</h2>
            <div className="info-row">Возраст: 22 года</div>
            <div className="info-row">Гражданство: Россия</div>
            <div className="info-row">Стаж в должности: 2 года</div>
          </div>

          <div className="info-section">
            <h2 className="section-title">Условия работы</h2>
            <div className="tags">
              <span className="tag">Полный день</span>
              <span className="tag">Удаленная работа</span>
              <span className="tag">Полная занятость</span>
              <span className="tag">Частичная занятость</span>
            </div>
            <div className="locations">
              Сочи
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="info-section">
          <h2 className="section-title">Опыт работы</h2>
          
          <div className="experience-item">
            <div className="exp-header">
              <h3>Преподаватель курсов</h3>
              <span className="date">2026-02 — настоящее время (2 месяца)</span>
            </div>
            <p className="company">АНО ДО "МОСКОВСКАЯ ШКОЛА ПРОГРАММИСТОВ" — Москва</p>
          </div>

          <div className="experience-item">
            <div className="exp-header">
              <h3>Web-разработчик</h3>
              <span className="date">2023-08 — 2025-10 (2 года 1 месяц)</span>
            </div>
            <p className="company">МОБУ СОШ №9 им. И. Ф. Константинова — г. Лабинск</p>
            <ul className="responsibilities">
              <li>Создание и поддержка нескольких веб-ресурсов</li>
              <li>Разработка на чистом JavaScript и CMS Joomla</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="info-section">
          <h2 className="section-title">Образование</h2>
          
          <div className="education-item">
            <h3>Ставропольский государственный аграрный университет</h3>
            <p>Информационные системы в бизнесе | Неполное высшее (до 2027)</p>
          </div>

          <div className="education-item">
            <h3>ГАПОУ КК ЛАТ</h3>
            <p>Прикладная информатика | Web-программист | Среднее профессиональное (2023)</p>
          </div>
        </div>

        {/* Skills */}
        <div className="info-section">
          <h2 className="section-title">Профессиональные навыки</h2>
          <div className="skills-grid">
            <span className="skill">JavaScript</span>
            <span className="skill">TypeScript</span>
            <span className="skill">React</span>
            <span className="skill">Next.js</span>
            <span className="skill">Tailwind</span>
            <span className="skill">Electron</span>
            <span className="skill">HTML5</span>
            <span className="skill">CSS3</span>
            <span className="skill">CMS Joomla</span>
            <span className="skill">CMS WordPress</span>
            <span className="skill">Adobe Photoshop</span>
          </div>
        </div>

        {/* Languages */}
        <div className="info-section">
          <h2 className="section-title">Языки</h2>
          <div className="languages">
            <div className="language">
              <span className="lang-name">Русский</span>
              <span className="lang-level">Родной</span>
            </div>
            <div className="language">
              <span className="lang-name">English</span>
              <span className="lang-level">Продвинутый (Advanced)</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>Резюме 2026 год</p>
        </div>
      </div>

      <style jsx>{`
        .resume-container {
          min-height: 100vh;
          
          padding: 40px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .resume-card {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .resume-card:hover {
          transform: translateY(-5px);
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
        }

        .name {
          font-size: 2.5rem;
          margin: 0 0 10px 0;
          font-weight: 700;
        }

        .title {
          font-size: 1.2rem;
          opacity: 0.95;
          margin: 0;
        }

        .salary {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 8px 20px;
          border-radius: 50px;
          margin-top: 15px;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          padding: 30px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .info-section {
          padding: 0 30px 30px 30px;
          border-bottom: 1px solid #e9ecef;
        }

        .info-section:last-child {
          border-bottom: none;
        }

        .section-title {
          color: #667eea;
          font-size: 1.5rem;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #667eea;
          display: inline-block;
        }

        .contact-item, .info-row {
          padding: 8px 0;
          color: #495057;
          font-size: 1rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }

        .tag {
          background: #e9ecef;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #495057;
        }

        .locations {
          color: #6c757d;
          font-size: 0.95rem;
          margin-top: 10px;
        }

        .experience-item, .education-item {
          margin-bottom: 25px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .experience-item:hover, .education-item:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .exp-header h3 {
          margin: 0;
          color: #212529;
          font-size: 1.2rem;
        }

        .date {
          color: #6c757d;
          font-size: 0.85rem;
        }

        .company {
          color: #667eea;
          font-weight: 600;
          margin: 5px 0 10px 0;
        }

        .responsibilities {
          margin: 10px 0 0 20px;
          padding-left: 0;
        }

        .responsibilities li {
          color: #495057;
          margin-bottom: 5px;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skill {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: transform 0.2s ease;
          cursor: default;
        }

        .skill:hover {
          transform: scale(1.05);
        }

        .languages {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .language {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .lang-name {
          font-weight: 600;
          color: #212529;
        }

        .lang-level {
          color: #667eea;
          font-weight: 500;
        }

        .footer {
          background: #f8f9fa;
          text-align: center;
          padding: 20px;
          color: #6c757d;
          font-size: 0.9rem;
          border-top: 1px solid #e9ecef;
        }

        @media (max-width: 768px) {
          .name {
            font-size: 1.8rem;
          }
          
          .exp-header {
            flex-direction: column;
          }
          
          .date {
            margin-top: 5px;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .info-section {
            padding: 0 20px 20px 20px;
          }
        }

        @media print {
          .resume-container {
            background: white;
            padding: 0;
          }
          
          .skill:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}