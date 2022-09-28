/*
Navicat MySQL Data Transfer

Source Server         : ADSO_VIRTUAL
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : recursos_humanos

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2022-09-27 21:03:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `countries`
-- ----------------------------
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `country_id` varchar(100) NOT NULL,
  `country_name` varchar(100) NOT NULL,
  `region_id` int(11) NOT NULL,
  PRIMARY KEY (`country_id`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of countries
-- ----------------------------
INSERT INTO `countries` VALUES ('AR', 'Argentina', '2');
INSERT INTO `countries` VALUES ('AU', 'Australia', '3');
INSERT INTO `countries` VALUES ('BE', 'Belgium', '1');
INSERT INTO `countries` VALUES ('BR', 'Brazil', '2');
INSERT INTO `countries` VALUES ('CA', 'Canada', '2');
INSERT INTO `countries` VALUES ('CH', 'Switzerland', '1');
INSERT INTO `countries` VALUES ('CN', 'China', '3');
INSERT INTO `countries` VALUES ('DE', 'Germany', '1');
INSERT INTO `countries` VALUES ('DK', 'Denmark', '1');
INSERT INTO `countries` VALUES ('EG', 'Egypt', '4');
INSERT INTO `countries` VALUES ('FR', 'France', '1');
INSERT INTO `countries` VALUES ('HK', 'HongKong', '3');
INSERT INTO `countries` VALUES ('IL', 'Israel', '4');
INSERT INTO `countries` VALUES ('IN', 'India', '3');
INSERT INTO `countries` VALUES ('IT', 'Italy', '1');
INSERT INTO `countries` VALUES ('JP', 'Japan', '3');
INSERT INTO `countries` VALUES ('KW', 'Kuwait', '4');
INSERT INTO `countries` VALUES ('MX', 'Mexico', '2');
INSERT INTO `countries` VALUES ('NG', 'Nigeria', '4');
INSERT INTO `countries` VALUES ('NL', 'Netherlands', '1');
INSERT INTO `countries` VALUES ('SG', 'Singapore', '3');
INSERT INTO `countries` VALUES ('UK', 'United Kingdom', '1');
INSERT INTO `countries` VALUES ('US', 'United States of America', '2');
INSERT INTO `countries` VALUES ('ZM', 'Zambia', '4');
INSERT INTO `countries` VALUES ('ZW', 'Zimbabwe', '4');

-- ----------------------------
-- Table structure for `departments`
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`department_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES ('1', 'Administration', '1700');
INSERT INTO `departments` VALUES ('2', 'Marketing', '1800');
INSERT INTO `departments` VALUES ('3', 'Purchasing', '1700');
INSERT INTO `departments` VALUES ('4', 'Human Resources', '2400');
INSERT INTO `departments` VALUES ('5', 'Shipping', '1500');
INSERT INTO `departments` VALUES ('6', 'IT', '1400');
INSERT INTO `departments` VALUES ('7', 'Public Relations', '2700');
INSERT INTO `departments` VALUES ('8', 'Sales', '2500');
INSERT INTO `departments` VALUES ('9', 'Executive', '1700');
INSERT INTO `departments` VALUES ('10', 'Finance', '1700');
INSERT INTO `departments` VALUES ('11', 'Accounting', '1700');

-- ----------------------------
-- Table structure for `dependents`
-- ----------------------------
DROP TABLE IF EXISTS `dependents`;
CREATE TABLE `dependents` (
  `dependent_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `relationship` varchar(100) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`dependent_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `dependents_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of dependents
-- ----------------------------
INSERT INTO `dependents` VALUES ('1', 'Penelope', 'Gietz', 'Child', '206');
INSERT INTO `dependents` VALUES ('2', 'Nick', 'Higgins', 'Child', '205');
INSERT INTO `dependents` VALUES ('3', 'Ed', 'Whalen', 'Child', '200');
INSERT INTO `dependents` VALUES ('4', 'Jennifer', 'King', 'Child', '100');
INSERT INTO `dependents` VALUES ('5', 'Johnny', 'Kochhar', 'Child', '101');
INSERT INTO `dependents` VALUES ('6', 'Bette', 'De Haan', 'Child', '102');
INSERT INTO `dependents` VALUES ('7', 'Grace', 'Faviet', 'Child', '109');
INSERT INTO `dependents` VALUES ('8', 'Matthew', 'Chen', 'Child', '110');
INSERT INTO `dependents` VALUES ('9', 'Joe', 'Sciarra', 'Child', '111');
INSERT INTO `dependents` VALUES ('10', 'Christian', 'Urman', 'Child', '112');
INSERT INTO `dependents` VALUES ('11', 'Zero', 'Popp', 'Child', '113');
INSERT INTO `dependents` VALUES ('12', 'Karl', 'Greenberg', 'Child', '108');
INSERT INTO `dependents` VALUES ('13', 'Uma', 'Mavris', 'Child', '203');
INSERT INTO `dependents` VALUES ('14', 'Vivien', 'Hunold', 'Child', '103');
INSERT INTO `dependents` VALUES ('15', 'Cuba', 'Ernst', 'Child', '104');
INSERT INTO `dependents` VALUES ('16', 'Fred', 'Austin', 'Child', '105');
INSERT INTO `dependents` VALUES ('17', 'Helen', 'Pataballa', 'Child', '106');
INSERT INTO `dependents` VALUES ('18', 'Dan', 'Lorentz', 'Child', '107');
INSERT INTO `dependents` VALUES ('19', 'Bob', 'Hartstein', 'Child', '201');
INSERT INTO `dependents` VALUES ('20', 'Lucille', 'Fay', 'Child', '202');
INSERT INTO `dependents` VALUES ('21', 'Kirsten', 'Baer', 'Child', '204');
INSERT INTO `dependents` VALUES ('22', 'Elvis', 'Khoo', 'Child', '115');
INSERT INTO `dependents` VALUES ('23', 'Sandra', 'Baida', 'Child', '116');
INSERT INTO `dependents` VALUES ('24', 'Cameron', 'Tobias', 'Child', '117');
INSERT INTO `dependents` VALUES ('25', 'Kevin', 'Himuro', 'Child', '118');
INSERT INTO `dependents` VALUES ('26', 'Rip', 'Colmenares', 'Child', '119');
INSERT INTO `dependents` VALUES ('27', 'Julia', 'Raphaely', 'Child', '114');
INSERT INTO `dependents` VALUES ('28', 'Woody', 'Russell', 'Child', '145');
INSERT INTO `dependents` VALUES ('29', 'Alec', 'Partners', 'Child', '146');
INSERT INTO `dependents` VALUES ('30', 'Sandra', 'Taylor', 'Child', '176');

-- ----------------------------
-- Table structure for `employees`
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `hire_date` varchar(100) NOT NULL,
  `job_id` int(11) NOT NULL,
  `salary` decimal(18,2) NOT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  `commission_pct` double DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `job_id` (`job_id`),
  KEY `department_id` (`department_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES ('100', 'Steven', 'King', 'steven.king@sqltutorial.org', '515.123.4567', '1989-09-21', '4', '24000.00', null, '9', null);
INSERT INTO `employees` VALUES ('101', 'Neena', 'Kochhar', 'neena.kochhar@sqltutorial.org', '515.123.4568', '1989-09-21', '5', '17000.00', '100', '9', null);
INSERT INTO `employees` VALUES ('102', 'Lex', 'De Haan', 'lex.de haan@sqltutorial.org', '515.123.4569', '1993-01-13', '5', '17000.00', '100', '9', null);
INSERT INTO `employees` VALUES ('103', 'Alexander', 'Hunold', 'alexander.hunold@sqltutorial.org', '590.423.4567', '1990-01-03', '9', '9000.00', '102', '6', null);
INSERT INTO `employees` VALUES ('104', 'Bruce', 'Ernst', 'bruce.ernst@sqltutorial.org', '590.423.4568', '1991-05-21', '9', '6000.00', '103', '6', null);
INSERT INTO `employees` VALUES ('105', 'David', 'Austin', 'david.austin@sqltutorial.org', '590.423.4569', '1997-06-25', '9', '4800.00', '103', '6', null);
INSERT INTO `employees` VALUES ('106', 'Valli', 'Pataballa', 'valli.pataballa@sqltutorial.org', '590.423.4560', '1998-02-05', '9', '4800.00', '103', '6', null);
INSERT INTO `employees` VALUES ('107', 'Diana', 'Lorentz', 'diana.lorentz@sqltutorial.org', '590.423.5567', '1999-02-07', '9', '4200.00', '103', '6', null);
INSERT INTO `employees` VALUES ('108', 'Nancy', 'Greenberg', 'nancy.greenberg@sqltutorial.org', '515.124.4569', '1994-08-17', '7', '12000.00', '101', '10', null);
INSERT INTO `employees` VALUES ('109', 'Daniel', 'Faviet', 'daniel.faviet@sqltutorial.org', '515.124.4169', '1994-08-16', '6', '9000.00', '108', '10', null);
INSERT INTO `employees` VALUES ('110', 'John', 'Chen', 'john.chen@sqltutorial.org', '515.124.4269', '1997-09-28', '6', '8200.00', '108', '10', null);
INSERT INTO `employees` VALUES ('111', 'Ismael', 'Sciarra', 'ismael.sciarra@sqltutorial.org', '515.124.4369', '1997-09-30', '6', '7700.00', '108', '10', null);
INSERT INTO `employees` VALUES ('112', 'Jose Manuel', 'Urman', 'jose manuel.urman@sqltutorial.org', '515.124.4469', '1998-03-07', '6', '7800.00', '108', '10', null);
INSERT INTO `employees` VALUES ('113', 'Luis', 'Popp', 'luis.popp@sqltutorial.org', '515.124.4567', '1999-12-07', '6', '6900.00', '108', '10', null);
INSERT INTO `employees` VALUES ('114', 'Den', 'Raphaely', 'den.raphaely@sqltutorial.org', '515.127.4561', '1994-12-07', '14', '11000.00', '100', '3', null);
INSERT INTO `employees` VALUES ('115', 'Alexander', 'Khoo', 'alexander.khoo@sqltutorial.org', '515.127.4562', '1995-05-18', '13', '3100.00', '114', '3', null);
INSERT INTO `employees` VALUES ('116', 'Shelli', 'Baida', 'shelli.baida@sqltutorial.org', '515.127.4563', '1997-12-24', '13', '2900.00', '114', '3', null);
INSERT INTO `employees` VALUES ('117', 'Sigal', 'Tobias', 'sigal.tobias@sqltutorial.org', '515.127.4564', '1997-07-24', '13', '2800.00', '114', '3', null);
INSERT INTO `employees` VALUES ('118', 'Guy', 'Himuro', 'guy.himuro@sqltutorial.org', '515.127.4565', '1998-11-15', '13', '2600.00', '114', '3', null);
INSERT INTO `employees` VALUES ('119', 'Karen', 'Colmenares', 'karen.colmenares@sqltutorial.org', '515.127.4566', '1999-08-10', '13', '2500.00', '114', '3', null);
INSERT INTO `employees` VALUES ('120', 'Matthew', 'Weiss', 'matthew.weiss@sqltutorial.org', '650.123.1234', '1996-07-18', '19', '8000.00', '100', '5', null);
INSERT INTO `employees` VALUES ('121', 'Adam', 'Fripp', 'adam.fripp@sqltutorial.org', '650.123.2234', '1997-04-10', '19', '8200.00', '100', '5', null);
INSERT INTO `employees` VALUES ('122', 'Payam', 'Kaufling', 'payam.kaufling@sqltutorial.org', '650.123.3234', '1995-05-01', '19', '7900.00', '100', '5', null);
INSERT INTO `employees` VALUES ('123', 'Shanta', 'Vollman', 'shanta.vollman@sqltutorial.org', '650.123.4234', '1997-10-10', '19', '6500.00', '100', '5', null);
INSERT INTO `employees` VALUES ('126', 'Irene', 'Mikkilineni', 'irene.mikkilineni@sqltutorial.org', '650.124.1224', '1998-09-28', '18', '2700.00', '120', '5', null);
INSERT INTO `employees` VALUES ('145', 'John', 'Russell', 'john.russell@sqltutorial.org', null, '1996-10-01', '15', '14000.00', '100', '8', null);
INSERT INTO `employees` VALUES ('146', 'Karen', 'Partners', 'karen.partners@sqltutorial.org', null, '1997-01-05', '15', '13500.00', '100', '8', null);
INSERT INTO `employees` VALUES ('176', 'Jonathon', 'Taylor', 'jonathon.taylor@sqltutorial.org', null, '1998-03-24', '16', '8600.00', '100', '8', null);
INSERT INTO `employees` VALUES ('177', 'Jack', 'Livingston', 'jack.livingston@sqltutorial.org', null, '1998-04-23', '16', '8400.00', '100', '8', null);
INSERT INTO `employees` VALUES ('178', 'Kimberely', 'Grant', 'kimberely.grant@sqltutorial.org', null, '1999-05-24', '16', '7000.00', '100', '8', null);
INSERT INTO `employees` VALUES ('179', 'Charles', 'Johnson', 'charles.johnson@sqltutorial.org', null, '2000-01-04', '16', '6200.00', '100', '8', null);
INSERT INTO `employees` VALUES ('192', 'Sarah', 'BELL', 'sarah.bell@sqltutorial.org', '650.501.1876', '1996-02-04', '17', '4000.00', '123', '5', null);
INSERT INTO `employees` VALUES ('193', 'Britney', 'Everett', 'britney.everett@sqltutorial.org', '650.501.2876', '1997-03-03', '17', '3900.00', '123', '5', null);
INSERT INTO `employees` VALUES ('200', 'Jennifer', 'Whalen', 'jennifer.whalen@sqltutorial.org', '515.123.4444', '1987-09-17', '3', '4400.00', '101', '1', null);
INSERT INTO `employees` VALUES ('201', 'Michael', 'Hartstein', 'michael.hartstein@sqltutorial.org', '515.123.5555', '1996-02-17', '10', '13000.00', '100', '2', null);
INSERT INTO `employees` VALUES ('202', 'Pat', 'FAY', 'pat.fay@sqltutorial.org', '603.123.6666', '1997-08-17', '11', '6000.00', '201', '2', null);
INSERT INTO `employees` VALUES ('203', 'Susan', 'Mavris', 'susan.mavris@sqltutorial.org', '515.123.7777', '1994-06-07', '8', '6500.00', '101', '4', null);
INSERT INTO `employees` VALUES ('204', 'Hermann', 'BaeR', 'hermann.baer@sqltutorial.org', '515.123.8888', '1994-06-07', '12', '10000.00', '101', '7', null);
INSERT INTO `employees` VALUES ('205', 'Shelley', 'Higgins', 'shelley.higgins@sqltutorial.org', '515.123.8080', '1994-06-07', '2', '12000.00', '101', '11', null);
INSERT INTO `employees` VALUES ('206', 'William', 'Gietz', 'william.gietz@sqltutorial.org', '515.123.8181', '1994-06-07', '1', '8300.00', '205', '11', null);

-- ----------------------------
-- Table structure for `jobs`
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `min_salary` decimal(18,2) NOT NULL,
  `max_salary` decimal(18,2) NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of jobs
-- ----------------------------
INSERT INTO `jobs` VALUES ('1', 'Public Accountant', '4200.00', '9000.00');
INSERT INTO `jobs` VALUES ('2', 'Accounting Manager', '8200.00', '16000.00');
INSERT INTO `jobs` VALUES ('3', 'Administration Assistant', '3000.00', '6000.00');
INSERT INTO `jobs` VALUES ('4', 'President', '20000.00', '40000.00');
INSERT INTO `jobs` VALUES ('5', 'Administration Vice President', '15000.00', '30000.00');
INSERT INTO `jobs` VALUES ('6', 'Accountant', '4200.00', '9000.00');
INSERT INTO `jobs` VALUES ('7', 'Finance Manager', '8200.00', '16000.00');
INSERT INTO `jobs` VALUES ('8', 'Human Resources Representative', '4000.00', '9000.00');
INSERT INTO `jobs` VALUES ('9', 'Programmer', '4000.00', '10000.00');
INSERT INTO `jobs` VALUES ('10', 'Marketing Manager', '9000.00', '15000.00');
INSERT INTO `jobs` VALUES ('11', 'Marketing Representative', '4000.00', '9000.00');
INSERT INTO `jobs` VALUES ('12', 'Public Relations Representative', '4500.00', '10500.00');
INSERT INTO `jobs` VALUES ('13', 'Purchasing Clerk', '2500.00', '5500.00');
INSERT INTO `jobs` VALUES ('14', 'Purchasing Manager', '8000.00', '15000.00');
INSERT INTO `jobs` VALUES ('15', 'Sales Manager', '10000.00', '20000.00');
INSERT INTO `jobs` VALUES ('16', 'Sales Representative', '6000.00', '12000.00');
INSERT INTO `jobs` VALUES ('17', 'Shipping Clerk', '2500.00', '5500.00');
INSERT INTO `jobs` VALUES ('18', 'Stock Clerk', '2000.00', '5000.00');
INSERT INTO `jobs` VALUES ('19', 'Stock Manager', '5500.00', '8500.00');

-- ----------------------------
-- Table structure for `job_grades`
-- ----------------------------
DROP TABLE IF EXISTS `job_grades`;
CREATE TABLE `job_grades` (
  `grade` varchar(1) NOT NULL,
  `lowest_sal` decimal(8,2) NOT NULL,
  `highest_sal` decimal(8,2) NOT NULL,
  PRIMARY KEY (`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of job_grades
-- ----------------------------
INSERT INTO `job_grades` VALUES ('A', '1000.00', '2999.00');
INSERT INTO `job_grades` VALUES ('B', '3000.00', '5999.00');
INSERT INTO `job_grades` VALUES ('C', '6000.00', '9999.00');
INSERT INTO `job_grades` VALUES ('D', '10000.00', '14999.00');
INSERT INTO `job_grades` VALUES ('E', '15000.00', '24999.00');
INSERT INTO `job_grades` VALUES ('F', '25000.00', '40000.00');

-- ----------------------------
-- Table structure for `locations`
-- ----------------------------
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `postal_code` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state_province` varchar(100) DEFAULT NULL,
  `country_id` varchar(100) NOT NULL,
  PRIMARY KEY (`location_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of locations
-- ----------------------------
INSERT INTO `locations` VALUES ('1400', '2014 Jabberwocky Rd', '26192', 'Southlake', 'Texas', 'US');
INSERT INTO `locations` VALUES ('1500', '2011 Interiors Blvd', '99236', 'South San Francisco', 'California', 'US');
INSERT INTO `locations` VALUES ('1700', '2004 Charade Rd', '98199', 'Seattle', 'Washington', 'US');
INSERT INTO `locations` VALUES ('1800', '147 Spadina Ave', 'M5V 2L7', 'Toronto', 'Ontario', 'CA');
INSERT INTO `locations` VALUES ('2400', '8204 Arthur St', null, 'London', null, 'UK');
INSERT INTO `locations` VALUES ('2500', 'Magdalen Centre, The Oxford Science Park', 'OX9 9ZB', 'Oxford', 'Oxford', 'UK');
INSERT INTO `locations` VALUES ('2700', 'Schwanthalerstr. 7031', '80925', 'Munich', 'Bavaria', 'DE');

-- ----------------------------
-- Table structure for `regions`
-- ----------------------------
DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions` (
  `region_id` int(11) NOT NULL,
  `region_name` varchar(100) NOT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of regions
-- ----------------------------
INSERT INTO `regions` VALUES ('1', 'Europe');
INSERT INTO `regions` VALUES ('2', 'Americas');
INSERT INTO `regions` VALUES ('3', 'Asia');
INSERT INTO `regions` VALUES ('4', 'Middle East and Africa');

-- ----------------------------
-- Table structure for `sqlite_sequence`
-- ----------------------------
DROP TABLE IF EXISTS `sqlite_sequence`;
CREATE TABLE `sqlite_sequence` (
  `name` varchar(100) DEFAULT NULL,
  `seq` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sqlite_sequence
-- ----------------------------
INSERT INTO `sqlite_sequence` VALUES ('regions', '4');
INSERT INTO `sqlite_sequence` VALUES ('locations', '2700');
INSERT INTO `sqlite_sequence` VALUES ('jobs', '19');
INSERT INTO `sqlite_sequence` VALUES ('departments', '13');
INSERT INTO `sqlite_sequence` VALUES ('employees', '206');
INSERT INTO `sqlite_sequence` VALUES ('dependents', '30');
