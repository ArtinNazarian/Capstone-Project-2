\echo 'Delete and recreate mode db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE mode;
CREATE DATABASE mode;
\connect mode

\i mode-schema.sql
\i mode-seed.sql

\echo 'Delete and recreate mode_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE mode_test;
CREATE DATABASE mode_test;
\connect mode_test

\i mode-schema.sql