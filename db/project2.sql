#product_type
INSERT INTO product_type (category) VALUES ('livestock');

#product
INSERT INTO product (product_type_id, name, price, image_url) VALUES ('1', 'Ameraucana', '3.35', 'ameraucana.jpg');

#shipping_type
INSERT INTO shipping_type (name, price, days) VALUES ('Fedex', '13.95', '7');

