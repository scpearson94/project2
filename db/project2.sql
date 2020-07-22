#product_type
INSERT INTO account_type (type) VALUES ('checking');
INSERT INTO account_type (type) VALUES ('savings');

INSERT INTO public.user (first_name, last_name, username, hashed_passwd) VALUES ('Sophia', 'Pearson', 'pearsonPrj2', 'test');

INSERT INTO account (name, account_type_id, user_id) VALUES ('Checking 1', 2, 1);
INSERT INTO account (name, account_type_id, user_id) VALUES ('Savings 1', 1, 1);

INSERT INTO category (name, user_id) VALUES ('Travel', 1);
INSERT INTO category (name, user_id) VALUES ('Groceries', 1);

INSERT INTO expense (user_id, account_id, category_id, amount, transaction_date, description) VALUES (1, 1, 1, 20.25, '2020-07-18', 'Fast food');
INSERT INTO expense (user_id, account_id, category_id, amount, transaction_date, description) VALUES (1, 1, 2, 51.23, '2020-07-22', 'Walmart run');