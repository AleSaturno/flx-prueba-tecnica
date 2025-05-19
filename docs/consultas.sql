-- En este archivo deben estar tus ejercicios de consultas sql

-- 1. Empleados ordenados alfabéticamente (Z...A)
SELECT nombres
FROM empleados
ORDER BY nombres DESC;

-- 2. Empleados de Soporte
SELECT e.nombres, p.puesto, l.localidad
FROM empleados e
JOIN puestos p ON e.puesto_id = p.id
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE p.puesto = 'Soporte';

-- 3. Nombres que terminan con 'o'
SELECT nombres
FROM empleados
WHERE nombres LIKE '%o';

-- 4. Empleados en Carlos Paz
SELECT e.nombres, e.sueldo, l.localidad
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE l.localidad = 'Carlos Paz';

-- 5. Sueldos entre 10000 y 13000
SELECT nombres, sueldo
FROM empleados
WHERE sueldo BETWEEN 10000 AND 13000;

-- 6. Departamentos con más de 5 empleados
SELECT d.denominacion, COUNT(*) AS cantidad_empleados
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
GROUP BY d.denominacion
HAVING COUNT(*) > 5;

-- 7. Empleados en Córdoba con puesto de Analista o Programador
SELECT e.nombres
FROM empleados e
JOIN puestos p ON e.puesto_id = p.id
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE l.localidad = 'Córdoba'
  AND (p.puesto = 'Analista' OR p.puesto = 'Programador');

-- 8. Sueldo medio de todos los empleados
SELECT AVG(sueldo) AS sueldo_medio
FROM empleados;

-- 9. Máximo sueldo en el departamento 10
SELECT MAX(sueldo) AS sueldo_maximo
FROM empleados
WHERE departamento_id = 10;

-- 10. Sueldo mínimo en el departamento Soporte
SELECT MIN(e.sueldo) AS sueldo_minimo
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
WHERE d.denominacion = 'Soporte';

-- 11. Suma de sueldos por puesto
SELECT p.puesto, SUM(e.sueldo) AS suma_sueldos
FROM empleados e
JOIN puestos p ON e.puesto_id = p.id
GROUP BY p.puesto;
