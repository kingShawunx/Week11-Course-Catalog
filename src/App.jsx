import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { courses } from './data/courses.js'
import './App.css'

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar page-shell" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="TechyJaunt Course Catalog home">
          <span className="brand-mark" aria-hidden="true">T</span>
          <span>techyjaunt<span className="brand-period">.</span></span>
        </Link>
        <div className="nav-links">
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            to="/category/Beginner"
          >
            Beginner
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            to="/category/Intermediate"
          >
            Intermediate
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

function CourseCard({ course }) {
  return (
    <Link className="course-card" to={`/courses/${course.slug}`}>
      <div className={`card-art card-art-${course.id}`} aria-hidden="true">
        <span className="card-index">LESSON {String(course.id).padStart(2, '0')}</span>
        <span className="card-glyph">{course.title.slice(0, 1)}</span>
        <span className="card-art-caption">LEARN<br />BY MAKING</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className={`category-badge ${course.category.toLowerCase()}`}>
            {course.category}
          </span>
          <span className="duration">{course.duration}</span>
        </div>
        <h2>{course.title}</h2>
        <span className="card-action">
          Explore course <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  )
}

function CourseGrid({ items }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-mark" aria-hidden="true">✳</span>
        <h2>No courses here yet</h2>
        <p>Try another learning level or return to the full catalog.</p>
        <Link className="text-link" to="/">Browse all courses <span aria-hidden="true">→</span></Link>
      </div>
    )
  }

  return (
    <div className="course-grid">
      {items.map((course) => <CourseCard course={course} key={course.id} />)}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero page-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> A LITTLE FURTHER, EVERY DAY</p>
            <h1>Make room for<br />what&apos;s <span>next.</span></h1>
            <p className="hero-description">
              Practical courses for curious minds. Find your path, learn by doing,
              and build things you&apos;re proud of.
            </p>
            <a className="hero-cta" href="#courses">
              Explore the catalog <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-outer" />
            <div className="hero-orbit orbit-inner" />
            <div className="hero-shape shape-main">
              <span className="shape-line" />
              <span className="shape-dot dot-lime" />
              <span className="shape-dot dot-coral" />
              <span className="shape-label">IDEAS<br />IN MOTION</span>
            </div>
            <span className="hero-stamp stamp-learn">LEARN<br />BY DOING</span>
            <span className="hero-stamp stamp-practice">GOOD THINGS<br />TAKE PRACTICE</span>
          </div>
        </section>

        <section className="catalog-section page-shell" id="courses">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COURSE CATALOG</p>
              <h2>Find your next thing<span className="heading-period">.</span></h2>
            </div>
            <p className="section-note">
              {courses.length} thoughtfully made courses.<br />
              A good place to start is anywhere.
            </p>
          </div>
          <CourseGrid items={courses} />
        </section>
      </main>
    </>
  )
}

function CategoryPage() {
  const { category = '' } = useParams()
  const categoryCourses = courses.filter(
    (course) => course.category.toLowerCase() === category.toLowerCase(),
  )
  const headingCategory =
    categoryCourses[0]?.category ??
    `${category.charAt(0).toUpperCase()}${category.slice(1).toLowerCase()}`

  return (
    <main className="page-shell inner-page">
      <div className="page-intro">
        <p className="eyebrow">BROWSE BY LEARNING LEVEL</p>
        <h1>{headingCategory} Courses<span className="heading-period">.</span></h1>
        <p>Choose a course and build your skills one practical step at a time.</p>
      </div>
      <CourseGrid items={categoryCourses} />
    </main>
  )
}

function CourseDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = courses.find((item) => item.slug === slug)

  if (!course) {
    return (
      <main className="page-shell inner-page">
        <section className="message-panel">
          <p className="eyebrow">404 — COURSE NOT FOUND</p>
          <h1>That course isn&apos;t here<span className="heading-period">.</span></h1>
          <p>It may have moved, or the link may be incorrect.</p>
          <Link className="button-link" to="/">Back to all courses</Link>
        </section>
      </main>
    )
  }

  function handleBack() {
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <main className="page-shell inner-page detail-page">
      <button className="back-button" onClick={handleBack} type="button">
        <span aria-hidden="true">←</span> Back
      </button>
      <article className="detail-layout">
        <div className="detail-copy">
          <div className="card-meta detail-meta">
            <span className={`category-badge ${course.category.toLowerCase()}`}>
              {course.category}
            </span>
            <span className="duration">{course.duration}</span>
          </div>
          <p className="eyebrow">COURSE {String(course.id).padStart(2, '0')}</p>
          <h1>{course.title}<span className="heading-period">.</span></h1>
          <p className="detail-description">{course.description}</p>
          <section className="topics-section" aria-labelledby="topics-heading">
            <p className="eyebrow">YOUR LEARNING PATH</p>
            <h2 id="topics-heading">What you&apos;ll learn</h2>
            <ul className="topics-list">
              {course.topics.map((topic) => (
                <li key={topic}>
                  <span className="topic-check" aria-hidden="true">✓</span>
                  {topic}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className={`detail-art detail-art-${course.id}`} aria-label={`${course.title} course card`}>
          <span className="detail-art-number">{String(course.id).padStart(2, '0')}</span>
          <span className="detail-art-kicker">TECHYJAUNT COURSE</span>
          <span className="detail-art-title">{course.title}</span>
          <span className="detail-art-caption">{course.category} · {course.duration}</span>
          <span className="detail-art-star" aria-hidden="true">✳</span>
        </aside>
      </article>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="page-shell inner-page">
      <section className="message-panel">
        <p className="eyebrow">404 — PAGE NOT FOUND</p>
        <h1>A little off course<span className="heading-period">.</span></h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link className="button-link" to="/">Back to the catalog</Link>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-content">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark" aria-hidden="true">T</span>
          <span>techyjaunt<span className="brand-period">.</span></span>
        </Link>
        <p>Good things take practice.</p>
        <span className="footer-note">© 2026 TechyJaunt</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<CourseDetailPage />} path="/courses/:slug" />
        <Route element={<CategoryPage />} path="/category/:category" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
      <Footer />
    </>
  )
}
