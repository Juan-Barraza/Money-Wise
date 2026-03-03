-- Seed default categories
INSERT INTO categories (name, icon, color) VALUES
    ('Alimentación', 'fast-food-outline',      '#FF6B6B'),
    ('Transporte',   'car-outline',            '#4ECDC4'),
    ('Vivienda',     'home-outline',           '#45B7D1'),
    ('Salud',        'medkit-outline',         '#96CEB4'),
    ('Ocio',         'game-controller-outline','#FFEAA7'),
    ('Salario',      'cash-outline',           '#6C5CE7'),
    ('Otros',        'ellipsis-horizontal-outline', '#B2BEC3')
ON CONFLICT (name) DO NOTHING;