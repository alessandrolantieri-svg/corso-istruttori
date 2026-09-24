-- Account demo (stessi di prisma/seed.ts, che resta per chi punta a un altro Postgres via
-- DATABASE_URL). Idempotente: se esistono già, non tocca niente.
-- Password per entrambi: Chiave123! — hash scrypt (salt:derived) prodotto da
-- src/lib/auth/password.ts, la stessa funzione che verifica il login.

INSERT INTO "Organization" ("id", "name", "slug")
VALUES
  ('org_demo_delfino', 'Scuola Nuoto Delfino', 'delfino-demo'),
  ('org_demo_airone',  'Scuola Nuoto Airone',  'airone-demo')
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "Learner" ("id", "organizationId", "email", "passwordHash", "name")
VALUES
  (
    'learner_demo_delfino',
    'org_demo_delfino',
    'demo@delfino.it',
    '7b2fa0c0fb44dd5ecb874066efa3ae1c:8addf67822e4da2c52817360c81ce4dc5954d94a03e18467d4c3b443e1bba0ae24060baeb56807dde37418cde168ab7dfed4900dd2e76117e9e3eb4573e2a7b3',
    'Istruttore Demo (Delfino)'
  ),
  (
    'learner_demo_airone',
    'org_demo_airone',
    'demo@airone.it',
    '7b2fa0c0fb44dd5ecb874066efa3ae1c:8addf67822e4da2c52817360c81ce4dc5954d94a03e18467d4c3b443e1bba0ae24060baeb56807dde37418cde168ab7dfed4900dd2e76117e9e3eb4573e2a7b3',
    'Istruttore Demo (Airone)'
  )
ON CONFLICT ("email") DO NOTHING;
