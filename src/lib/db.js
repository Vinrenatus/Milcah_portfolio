// Portfolio data layer backed by public/db.json.
// Served as a static file, so content can be edited without a rebuild.
// Swap the fetch below for a real API base URL when there is a backend.

const DB_URL = '/db.json';

let dbPromise = null;

// Fetch once per page load and share the result across all getters.
const loadDb = () => {
  if (!dbPromise) {
    dbPromise = fetch(DB_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${DB_URL} (HTTP ${res.status})`);
        }
        return res.json();
      })
      .catch((error) => {
        // Let the next call retry instead of caching a rejected promise.
        dbPromise = null;
        throw error;
      });
  }
  return dbPromise;
};

const byDateDesc = (key) => (a, b) =>
  String(b[key] ?? '').localeCompare(String(a[key] ?? ''));

export const getProfile = async () => {
  const db = await loadDb();
  return db.profile ?? null;
};

export const getSkills = async () => {
  const db = await loadDb();
  return [...(db.skills ?? [])].sort((a, b) => b.level - a.level);
};

export const getExperience = async () => {
  const db = await loadDb();
  return [...(db.experience ?? [])].sort(byDateDesc('start_date'));
};

export const getProjects = async () => {
  const db = await loadDb();
  return [...(db.projects ?? [])].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );
};

export const getEducation = async () => {
  const db = await loadDb();
  return [...(db.education ?? [])].sort(byDateDesc('end_date'));
};

export const getCertifications = async () => {
  const db = await loadDb();
  return [...(db.certifications ?? [])].sort(byDateDesc('date'));
};

// db.json is read-only over HTTP, so submissions are logged rather than stored.
export const submitContactForm = async (formData) => {
  console.log('Contact form submission (local mode):', formData);
  return { success: true, message: 'Message received! (Demo mode)' };
};

export const getAllPortfolioData = async () => {
  const [profile, skills, experience, projects, education, certifications] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getExperience(),
      getProjects(),
      getEducation(),
      getCertifications()
    ]);

  return { profile, skills, experience, projects, education, certifications };
};
