const pool = require('./db');

const initDb = async () => {
  try {
    await pool.query(`
        CREATE TABLE public.obrazky (
            id integer NOT NULL,
            polozka_id integer NOT NULL,
            cesta text NOT NULL
        );


        CREATE SEQUENCE public.obrazky_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.obrazky_id_seq OWNED BY public.obrazky.id;

        CREATE TABLE public.polozka (
            id integer NOT NULL,
            nazov text NOT NULL,
            popis text,
            cena numeric(10,2) NOT NULL,
            pocet_ks integer NOT NULL
        );

        CREATE SEQUENCE public.polozka_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.polozka_id_seq OWNED BY public.polozka.id;

        ALTER TABLE ONLY public.obrazky ALTER COLUMN id SET DEFAULT nextval('public.obrazky_id_seq'::regclass);

        ALTER TABLE ONLY public.polozka ALTER COLUMN id SET DEFAULT nextval('public.polozka_id_seq'::regclass);

        ALTER TABLE ONLY public.obrazky
            ADD CONSTRAINT obrazky_pkey PRIMARY KEY (id);

        ALTER TABLE ONLY public.polozka
            ADD CONSTRAINT polozka_pkey PRIMARY KEY (id);

        ALTER TABLE ONLY public.obrazky
            ADD CONSTRAINT polozka_id_fk FOREIGN KEY (polozka_id) REFERENCES public.polozka(id);
    `);


    console.log('Tabuľky inicializované.');
  } catch (err) {
    console.error('Chyba pri inicializácii tabuliek', err);
  } finally {
    pool.end();
  }
};

initDb();