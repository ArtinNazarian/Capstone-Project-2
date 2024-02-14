-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

 

INSERT INTO products (name, price, currency, image)
VALUES ('Verve Streetlevel - Medium Roast', 1895, 'USD', '/products/vervestreetlevel.png'),

        ('Verve Sermon - Medium Roast', 1925, 'USD', '/products/vervesermon.png'),

        ('Temple Riqueza - Dark Roast', 2300, 'USD','/products/templeriqueza.png' ),

        ('Intelligentsia El Gallo Medium Roast', 1700, 'USD', '/products/elgallo.png'),

        ('Onyx Monarch - Medium Roast', 2200, 'USD', '/products/onyxmonarch.png'),
        
        ('Temple Dharma Espresso Blend', 2100, 'USD', '/products/temple_dharma.png'),

        ('Kuma Bright Blend - Medium Light Roast', 21.50, 'USD', '/products/kuma.png'),

        ('Verve Seabright - Medium Dark Roast', 1925, 'USD', '/products/seabrightVerve.png'),

        ('Stumptown Holler Mtn - Dark Roast', 1650, 'USD','/products/hollermtnStumpton.png'),

        ('Alma Coffee Enchanted - Dark Roast', 2000,'USD','/products/alma_enchanted.png'),

        ('Groundwork Organic Black Gold - Dark Roast', 1600, 'USD', '/products/organicblackgoldGroundwork.png'),

        ('Hario - Ceramic Coffee Pour Over', 2800, 'USD', '/products/coffeedripper.png'),
        ('Hario - Paper coffee filter', 2800, 'USD', '/products/paperfilter.png'),
        ('Le Creuset - Cermic French Press', 6500, 'USD','/products/frenchpresscermaic.png'),
        ('Bodum 12 Cup French Press',  5000, 'USD', '/products/frenchpressbodum.png'),
        ('Bodum Chambord French Press', 39.50, 'USD', '/products/bodum-chambord.jpg'),
        ('Baratza Encore Grinder',  13500, 'USD','/products/coffeegrinder.png'),
        ('Breville Smart Grinder', 199.95, 'USD', '/products/brevillegrinder.jpg');





