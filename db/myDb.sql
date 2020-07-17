#Creates a new table and define a primary key
CREATE TABLE IF NOT EXISTS public.customer (
    id  SERIAL NOT NULL PRIMARY KEY,
    firstname    VARCHAR(15) NOT NULL,
    lastname    VARCHAR(15) NOT NULL,
    email   VARCHAR(40) NOT NULL,
    address    VARCHAR(255) NOT NULL,
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.shipping_type (
    id  SERIAL NOT NULL PRIMARY KEY,
    name    VARCHAR(15) NOT NULL,
    price    NUMERIC(8, 2) NOT NULL,
    days INT DEFAULT NULL,
    UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.product_type (
    id  SERIAL NOT NULL PRIMARY KEY,
    category VARCHAR(15) NOT NULL,
    UNIQUE (category)
);

CREATE TABLE IF NOT EXISTS public.product (
    id  SERIAL NOT NULL PRIMARY KEY,
    product_type_id INT NOT NULL REFERENCES public.product_type(id),
    name    VARCHAR(15) NOT NULL,
    price    NUMERIC(8, 2) NOT NULL,
    image_url    VARCHAR(40) NOT NULL,
    UNIQUE (name, image_url)
);

CREATE TABLE IF NOT EXISTS public.cart (
    id  SERIAL NOT NULL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES public.product(id),
    amount    SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.order (
    id  SERIAL NOT NULL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES public.customer(id),
    cart_id INT NOT NULL REFERENCES public.cart(id),
    shipping_type_id INT NOT NULL REFERENCES public.shipping_type(id),
    amountpaid    NUMERIC(12, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE cart ADD order_id integer NOT NULL REFERENCES public.order(id);
ALTER TABLE public.order DROP COLUMN cart_id;