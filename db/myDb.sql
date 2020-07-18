#Creates a new table and define a primary key
CREATE TABLE IF NOT EXISTS public.user (
    id  SERIAL NOT NULL PRIMARY KEY,
    first_name    VARCHAR(24) NOT NULL,
    last_name    VARCHAR(24) NOT NULL,
    username   VARCHAR(20) NOT NULL,
    hashed_passwd VARCHAR(64) NOT NULL,
    UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS public.category (
    id  SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    user_id INT NOT NULL REFERENCES public.user(id)
);

CREATE TABLE IF NOT EXISTS public.account_type (
    id  SERIAL NOT NULL PRIMARY KEY,
    type VARCHAR(35) NOT NULL,
    UNIQUE (type)
);

CREATE TABLE IF NOT EXISTS public.account (
    id  SERIAL NOT NULL PRIMARY KEY,
    name    VARCHAR(35) NOT NULL,
    account_type_id INT NOT NULL REFERENCES public.account_type(id),
    user_id INT NOT NULL REFERENCES public.user(id),
    active BOOLEAN NOT NULL DEFAULT true,
    UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.expense (
    id  SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES public.user(id),
    account_id INT NOT NULL REFERENCES public.account(id),
    category_id INT NOT NULL REFERENCES public.category(id),
    amount    NUMERIC(12, 2) NOT NULL,
    transaction_date DATE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.transfer (
    id  SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES public.user(id),
    from_account_id INT NOT NULL REFERENCES public.account(id),
    to_account_id INT NOT NULL REFERENCES public.account(id),
    amount    NUMERIC(12, 2) NOT NULL,
    transfer_date DATE NOT NULL,
    description TEXT
);