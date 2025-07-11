-- user_survey
CREATE TABLE user_survey (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);

-- taste_answer
CREATE TABLE taste_answer (
  id SERIAL PRIMARY KEY,
  user_survey_id INTEGER REFERENCES user_survey(id),
  question_no INTEGER,
  answer TEXT
);

-- insight_answer
CREATE TABLE insight_answer (
  id SERIAL PRIMARY KEY,
  user_survey_id INTEGER REFERENCES user_survey(id),
  question_no INTEGER,
  answer TEXT
);

-- admin
CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  password_hash TEXT
);

-- login_history
CREATE TABLE login_history (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES admin(id),
  login_at TIMESTAMP DEFAULT NOW(),
  ip_address TEXT
); 