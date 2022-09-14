/*
 Navicat Premium Data Transfer

 Source Server         : MYSQL
 Source Server Type    : MySQL
 Source Server Version : 50505
 Source Host           : localhost
 Source Database       : db_cardio

 Target Server Type    : MySQL
 Target Server Version : 50505
 File Encoding         : utf-8

 Date: 06/26/2018 21:14:25 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `barrios`
-- ----------------------------
DROP TABLE IF EXISTS `barrios`;
CREATE TABLE `barrios` (
  `id_barrio` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_barrio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `barrios`
-- ----------------------------
BEGIN;
INSERT INTO `barrios` VALUES ('1', 'CENTRO'), ('2', 'SAN JUAN (HOSPITAL)');
COMMIT;

-- ----------------------------
--  Table structure for `ciudades`
-- ----------------------------
DROP TABLE IF EXISTS `ciudades`;
CREATE TABLE `ciudades` (
  `id_ciudad` varchar(6) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_ciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `ciudades`
-- ----------------------------
BEGIN;
INSERT INTO `ciudades` VALUES ('01', 'SAN GI'), ('02', 'socorro'), ('03', 'OIBA'), ('04', 'CURITI'), ('05', 'VILLANUEVA');
COMMIT;

-- ----------------------------
--  Table structure for `clientes`
-- ----------------------------
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `ciudad` varchar(255) NOT NULL,
  `departamento` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `clientes`
-- ----------------------------
BEGIN;
INSERT INTO `clientes` VALUES ('1', 'Juan', 'Montoya', '3358974', 'juankj@gmail.com', 'Calle 23 # 78-74', 'Cali', 'Valle');
COMMIT;

-- ----------------------------
--  Table structure for `cum_programas`
-- ----------------------------
DROP TABLE IF EXISTS `cum_programas`;
CREATE TABLE `cum_programas` (
  `id_programa` int(10) NOT NULL AUTO_INCREMENT,
  `id_cedula` varchar(18) DEFAULT NULL,
  `fec_ingreso` date DEFAULT NULL,
  `fec_egreso` date DEFAULT NULL,
  `causa_egreso` varchar(200) DEFAULT NULL,
  `fec_hospitalizacion` date DEFAULT NULL,
  PRIMARY KEY (`id_programa`),
  KEY `id_cedula` (`id_cedula`),
  CONSTRAINT `fk_cum_progra_pac` FOREIGN KEY (`id_cedula`) REFERENCES `pacientes` (`id_cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `cum_programas`
-- ----------------------------
BEGIN;
INSERT INTO `cum_programas` VALUES ('5', '1100952166', null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for `deabetes`
-- ----------------------------
DROP TABLE IF EXISTS `deabetes`;
CREATE TABLE `deabetes` (
  `id_deabetes` int(11) NOT NULL AUTO_INCREMENT,
  `id_cedula` varchar(18) DEFAULT NULL,
  `fec_realizacion_exa` date DEFAULT NULL,
  `cons_medico_general` int(1) DEFAULT NULL,
  `cons_enfermeria` int(1) DEFAULT NULL,
  `cons_nutricion` int(1) DEFAULT NULL,
  `colesterol_total` decimal(10,2) DEFAULT NULL,
  `colesterol_hdl` decimal(10,2) DEFAULT NULL,
  `trigliceridos` decimal(10,2) DEFAULT NULL,
  `creatinina` decimal(10,2) DEFAULT NULL,
  `hemoglobina` decimal(10,2) DEFAULT NULL,
  `uroanalisis` decimal(10,2) DEFAULT NULL,
  `ekg` varchar(10) DEFAULT NULL,
  `id_medicamento1` varchar(20) DEFAULT NULL,
  `id_medicamento2` varchar(20) DEFAULT NULL,
  `edu_grupal` varchar(10) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `acciones_realizar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_deabetes`),
  KEY `id_cedula` (`id_cedula`),
  CONSTRAINT `fk_deabetes_pac` FOREIGN KEY (`id_cedula`) REFERENCES `pacientes` (`id_cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `deabetes`
-- ----------------------------
BEGIN;
INSERT INTO `deabetes` VALUES ('1', '1100952166', '2016-10-24', '1', '1', '1', '1.00', '1.00', '2.00', '1.00', '1.00', '2.00', '2', '000001', '000001', '1', '1', '1');
COMMIT;

-- ----------------------------
--  Table structure for `hipercolesterolemia`
-- ----------------------------
DROP TABLE IF EXISTS `hipercolesterolemia`;
CREATE TABLE `hipercolesterolemia` (
  `id_hipercolesterolemia` int(11) NOT NULL AUTO_INCREMENT,
  `id_cedula` varchar(18) DEFAULT NULL,
  `fec_realizacion_exa` date DEFAULT NULL,
  `cons_medico_general` int(1) DEFAULT NULL,
  `cons_enfermeria` int(1) DEFAULT NULL,
  `cons_nutricion` int(1) DEFAULT NULL,
  `glicemia_basal` decimal(10,2) DEFAULT NULL,
  `hemoglobin` decimal(10,2) DEFAULT NULL,
  `hematocritos` decimal(10,2) DEFAULT NULL,
  `colesterol_total` decimal(10,2) DEFAULT NULL,
  `colesterol_hdl` decimal(10,2) DEFAULT NULL,
  `trigliceridos` decimal(10,2) DEFAULT NULL,
  `creatinina` decimal(10,2) DEFAULT NULL,
  `uroanalisis` varchar(10) DEFAULT NULL,
  `ekg` varchar(10) DEFAULT NULL,
  `id_medicamento1` varchar(20) DEFAULT NULL,
  `id_medicamento2` varchar(20) DEFAULT NULL,
  `edu_grupal` varchar(10) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `acciones_realizar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_hipercolesterolemia`),
  KEY `id_cedula` (`id_cedula`),
  CONSTRAINT `fk_hipercolesterolemia_pac` FOREIGN KEY (`id_cedula`) REFERENCES `pacientes` (`id_cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `hipercolesterolemia`
-- ----------------------------
BEGIN;
INSERT INTO `hipercolesterolemia` VALUES ('3', '1100952166', '2016-10-24', '1', '1', '1', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1', '40', '000001', '000001', '1', '1', '1');
COMMIT;

-- ----------------------------
--  Table structure for `hipertension_arterial`
-- ----------------------------
DROP TABLE IF EXISTS `hipertension_arterial`;
CREATE TABLE `hipertension_arterial` (
  `id_hiper_arterial` int(11) NOT NULL AUTO_INCREMENT,
  `id_cedula` varchar(18) DEFAULT NULL,
  `fec_realizacion_exa` date DEFAULT NULL,
  `cf_tensionales` varchar(10) DEFAULT NULL,
  `tm_signos_vitales` varchar(10) DEFAULT NULL,
  `cons_medico_general` int(1) DEFAULT NULL,
  `cons_enfermeria` int(1) DEFAULT NULL,
  `cons_nutricion` int(1) DEFAULT NULL,
  `glicemia_basal` decimal(10,2) DEFAULT NULL,
  `hemoglobin` decimal(10,2) DEFAULT NULL,
  `hematocritos` decimal(10,2) DEFAULT NULL,
  `colesterol_total` decimal(10,2) DEFAULT NULL,
  `colesterol_hdl` decimal(10,2) DEFAULT NULL,
  `trigliceridos` decimal(10,2) DEFAULT NULL,
  `potasio` decimal(10,2) DEFAULT NULL,
  `creatinina` decimal(10,2) DEFAULT NULL,
  `uroanalisis` varchar(10) DEFAULT NULL,
  `ekg` varchar(10) DEFAULT NULL,
  `id_medicamento` varchar(20) DEFAULT NULL,
  `edu_grupal` varchar(10) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `acciones_realizar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_hiper_arterial`),
  KEY `id_cedula` (`id_cedula`),
  CONSTRAINT `fk_hipertencion_arterial_pac` FOREIGN KEY (`id_cedula`) REFERENCES `pacientes` (`id_cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `hipertension_arterial`
-- ----------------------------
BEGIN;
INSERT INTO `hipertension_arterial` VALUES ('1', '1100952166', '2016-10-24', '1', '1', '1', '1', '1', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1', '11', '000001', '1', '1', '1'), ('2', '1100970785', '2017-12-13', '1', '1', '1', '1', '1', '1.00', '1.00', null, '1.00', '1.00', '1.00', '1.00', '1.00', '1', '1', '000001', '1', '1', '2');
COMMIT;

-- ----------------------------
--  Table structure for `medicamentos`
-- ----------------------------
DROP TABLE IF EXISTS `medicamentos`;
CREATE TABLE `medicamentos` (
  `id_medicamento` varchar(20) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_medicamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `medicamentos`
-- ----------------------------
BEGIN;
INSERT INTO `medicamentos` VALUES ('000001', 'ASPIRINAS'), ('000222', 'MAREOL'), ('0008', 'DOLEX');
COMMIT;

-- ----------------------------
--  Table structure for `obesidad`
-- ----------------------------
DROP TABLE IF EXISTS `obesidad`;
CREATE TABLE `obesidad` (
  `id_obesidad` int(11) NOT NULL AUTO_INCREMENT,
  `id_cedula` varchar(18) DEFAULT NULL,
  `fec_realizacion_exa` date DEFAULT NULL,
  `tm_signos_vitales` varchar(10) DEFAULT NULL,
  `peso` decimal(10,2) DEFAULT NULL,
  `talla` decimal(10,2) DEFAULT NULL,
  `imc` decimal(10,2) DEFAULT NULL,
  `gd_obesidad` int(2) DEFAULT NULL,
  `cons_medico_general` int(1) DEFAULT NULL,
  `cons_nutricion` int(1) DEFAULT NULL,
  `glicemia_basal` decimal(10,2) DEFAULT NULL,
  `colesterol_total` decimal(10,2) DEFAULT NULL,
  `colesterol_hdl` decimal(10,2) DEFAULT NULL,
  `trigliceridos` decimal(10,2) DEFAULT NULL,
  `id_medicamento1` varchar(20) DEFAULT NULL,
  `id_medicamento2` varchar(20) DEFAULT NULL,
  `edu_grupal` varchar(10) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `acciones_realizar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_obesidad`),
  KEY `id_cedula` (`id_cedula`),
  CONSTRAINT `fk_obesidad_pac` FOREIGN KEY (`id_cedula`) REFERENCES `pacientes` (`id_cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `obesidad`
-- ----------------------------
BEGIN;
INSERT INTO `obesidad` VALUES ('1', '1100952166', '0000-00-00', null, '1.00', '1.00', '1.00', '1', '1', '1', '1.00', '1.00', '1.00', '1.00', '', '', '1', '1', '1');
COMMIT;

-- ----------------------------
--  Table structure for `pacientes`
-- ----------------------------
DROP TABLE IF EXISTS `pacientes`;
CREATE TABLE `pacientes` (
  `id_cedula` varchar(15) NOT NULL,
  `nombres` varchar(40) DEFAULT NULL,
  `apellidos` varchar(60) DEFAULT NULL,
  `fec_nac` date DEFAULT NULL,
  `edad` int(3) DEFAULT NULL,
  `genero` char(1) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `id_barrio` int(10) DEFAULT NULL,
  `id_ciudad` varchar(6) DEFAULT NULL,
  `tp_paciente` char(1) DEFAULT NULL,
  `seguridad_social` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `pacientes`
-- ----------------------------
BEGIN;
INSERT INTO `pacientes` VALUES ('11', '11', '11', '2017-12-15', '1', '2', '3204207701', 'cra 14 # 21-22', '0', 'SAN GI', '1', '1'), ('1100', 'JOSE', 'LARA', '2017-12-14', '1', '2', '3204207701', 'cra 14 # 21-22', '0', 'SAN GI', '1', '1'), ('1100952166', 'ISRAEL', 'ARBONA GUERRERO', '1988-01-19', '28', 'M', '3204207701', 'CRA 14 # 21-25', '1', '01', 'C', 'C'), ('1100970785', 'NESTOR IVAN', 'APARICIO OSORIO', '1997-03-26', '19', 'M', '3015717789', 'CRA 8 # 25-33', '1', '01', 'S', 'C');
COMMIT;

-- ----------------------------
--  Table structure for `soporte_usuarios`
-- ----------------------------
DROP TABLE IF EXISTS `soporte_usuarios`;
CREATE TABLE `soporte_usuarios` (
  `idusuario` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mensajeria` varchar(100) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `preferenciacomunicacion` char(1) NOT NULL,
  `rangonomolestar` varchar(50) DEFAULT NULL,
  `tipousuario` char(1) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `soporte_usuarios`
-- ----------------------------
BEGIN;
INSERT INTO `soporte_usuarios` VALUES ('1', 'ISRAEL', 'ARBONA', 'i.arbona@misena.edu.co', null, null, '', null, ''), ('1100', 'PEDRO', 'DIAZ SIERRA', 'thecreyzy_.0328@hotmail.com', null, null, '', null, ''), ('110010', 'OSCAR', 'SIERRA', 'OSCAR@GMAIL.COM', null, null, '', null, ''), ('1100952166', 'ISRAEL', 'ARBONA GUERRERO', 'I.ARBONA@MISENA.EDU.CO', null, null, '', null, ''), ('1111', 'POCHO ISRAEL', 'ARBONA GUERRERO', 'I.ARBONA@MISENA.EDU.CO', null, null, '', null, ''), ('111111', 'JOSE', 'ARMANDO', 'I.ARBONA@MISENA.EDU.CO', null, null, '', null, ''), ('333', 'JOSE', 'ARIAS', 'thecreyzy_.0328@hotmail.com', null, null, '', null, ''), ('9999', 'POCHO', 'ARBONA', 'I.ARBONA@MISENA.EDU.CO', null, null, '', null, ''), ('J', 'J', 'J', 'jjgamboa86@misena.edu.co', null, null, '', null, '');
COMMIT;

-- ----------------------------
--  Table structure for `usuarios`
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `usuario` varchar(18) NOT NULL,
  `clave` varchar(18) DEFAULT NULL,
  `rol` int(1) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `usuarios`
-- ----------------------------
BEGIN;
INSERT INTO `usuarios` VALUES ('admin', 'admin', '1', '1'), ('adsi', 'adsi', '2', '1'), ('FABIO', '1234455', '2', '1');
COMMIT;

-- ----------------------------
--  Table structure for `wine`
-- ----------------------------
DROP TABLE IF EXISTS `wine`;
CREATE TABLE `wine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `grapes` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `description` blob,
  `picture` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `wine`
-- ----------------------------
BEGIN;
INSERT INTO `wine` VALUES ('1', 'CHATEAU DE SAINT COSME', '2009', 'Grenache / Syrah', 'France', 'Southern Rhone / Gigondas', 0x5468652061726f6d6173206f6620667275697420616e642073706963652067697665206f6e6520612068696e74206f6620746865206c69676874206472696e6b6162696c697479206f662074686973206c6f76656c792077696e652c207768696368206d616b657320616e20657863656c6c656e7420636f6d706c656d656e7420746f2066697368206469736865732e, 'saint_cosme.jpg'), ('2', 'LAN RIOJA CRIANZA', '2006', 'Tempranillo', 'Spain', 'Rioja', 0x4120726573757267656e6365206f6620696e74657265737420696e20626f7574697175652076696e65796172647320686173206f70656e65642074686520646f6f7220666f72207468697320657863656c6c656e7420666f72617920696e746f2074686520646573736572742077696e65206d61726b65742e204c6967687420616e6420626f756e63792c207769746820612068696e74206f6620626c61636b2074727566666c652c20746869732077696e652077696c6c206e6f74206661696c20746f207469636b6c652074686520746173746520627564732e, 'lan_rioja.jpg'), ('3', 'MARGERUM SYBARITE', '2010', 'Sauvignon Blanc', 'USA', 'California Central Cosat', 0x546865206361636865206f6620612066696e652043616265726e657420696e206f6e65732077696e652063656c6c61722063616e206e6f77206265207265706c6163656420776974682061206368696c646973686c7920706c617966756c2077696e6520627562626c696e67206f76657220776974682074656d7074696e6720746173746573206f660a626c61636b2063686572727920616e64206c69636f726963652e20546869732069732061207461737465207375726520746f207472616e73706f727420796f75206261636b20696e2074696d652e, 'margerum.jpg'), ('4', 'OWEN ROE \"EX UMBRIS\"', '2009', 'Syrah', 'USA', 'Washington', 0x41206f6e652d74776f2070756e6368206f6620626c61636b2070657070657220616e64206a616c6170656e6f2077696c6c2073656e6420796f75722073656e736573207265656c696e672c20617320746865206f72616e676520657373656e636520736e61707320796f75206261636b20746f207265616c6974792e20446f6e2774206d6973730a746869732061776172642d77696e6e696e672074617374652073656e736174696f6e2e, 'ex_umbris.jpg'), ('5', 'REX HILL', '2009', 'Pinot Noir', 'USA', 'Oregon', 0x4f6e652063616e6e6f7420646f756274207468617420746869732077696c6c206265207468652077696e65207365727665642061742074686520486f6c6c79776f6f642061776172642073686f77732c20626563617573652069742068617320756e64656e6961626c65207374617220706f7765722e2042652074686520666972737420746f2063617463680a74686520646562757420746861742065766572796f6e652077696c6c2062652074616c6b696e672061626f757420746f6d6f72726f772e, 'rex_hill.jpg'), ('6', 'VITICCIO CLASSICO RISERVA', '2007', 'Sangiovese Merlot', 'Italy', 'Tuscany', 0x54686f75676820736f667420616e6420726f756e64656420696e20746578747572652c2074686520626f6479206f6620746869732077696e652069732066756c6c20616e64207269636820616e64206f682d736f2d61707065616c696e672e20546869732064656c6976657279206973206576656e206d6f726520696d7072657373697665207768656e206f6e652074616b6573206e6f7465206f66207468652074656e6465722074616e6e696e732074686174206c656176652074686520746173746520627564732077686f6c6c79207361746973666965642e, 'viticcio.jpg'), ('7', 'CHATEAU LE DOYENNE', '2005', 'Merlot', 'France', 'Bordeaux', 0x54686f7567682064656e736520616e642063686577792c20746869732077696e6520646f6573206e6f74206f766572706f7765722077697468206974732066696e656c792062616c616e63656420646570746820616e64207374727563747572652e2049742069732061207472756c79206c75787572696f757320657870657269656e636520666f72207468650a73656e7365732e, 'le_doyenne.jpg'), ('8', 'DOMAINE DU BOUSCAT', '2009', 'Merlot', 'France', 'Bordeaux', 0x546865206c6967687420676f6c64656e20636f6c6f72206f6620746869732077696e652062656c696573207468652062726967687420666c61766f7220697420686f6c64732e204120747275652073756d6d65722077696e652c206974206265677320666f722061207069636e6963206c756e636820696e20612073756e2d736f616b65642076696e65796172642e, 'bouscat.jpg'), ('9', 'BLOCK NINE', '2009', 'Pinot Noir', 'USA', 'California', 0x576974682068696e7473206f662067696e67657220616e642073706963652c20746869732077696e65206d616b657320616e20657863656c6c656e7420636f6d706c656d656e7420746f206c69676874206170706574697a657220616e642064657373657274206661726520666f72206120686f6c6964617920676174686572696e672e, 'block_nine.jpg'), ('10', 'DOMAINE SERENE', '2007', 'Pinot Noir', 'USA', 'Oregon', 0x54686f75676820737562746c6520696e2069747320636f6d706c657869746965732c20746869732077696e65206973207375726520746f20706c65617365206120776964652072616e6765206f6620656e7468757369617374732e204e6f746573206f6620706f6d656772616e6174652077696c6c2064656c6967687420617320746865206e757474792066696e69736820636f6d706c65746573207468652070696374757265206f6620612066696e652073697070696e6720657870657269656e63652e, 'domaine_serene.jpg'), ('11', 'BODEGA LURTON', '2011', 'Pinot Gris', 'Argentina', 'Mendoza', 0x536f6c6964206e6f746573206f6620626c61636b2063757272616e7420626c656e64656420776974682061206c6967687420636974727573206d616b6520746869732077696e6520616e206561737920706f757220666f72207661726965642070616c617465732e, 'bodega_lurton.jpg'), ('12', 'LES MORIZOTTES', '2009', 'Chardonnay', 'France', 'Burgundy', 0x427265616b696e6720746865206d6f6c64206f662074686520636c6173736963732c2074686973206f66666572696e672077696c6c20737572707269736520616e6420756e646f75627465646c792067657420746f6e677565732077616767696e672077697468207468652068696e7473206f6620636f6666656520616e6420746f626163636f20696e0a7065726665637420616c69676e6d656e742077697468206d6f726520747261646974696f6e616c206e6f7465732e20427265616b696e6720746865206d6f6c64206f662074686520636c6173736963732c2074686973206f66666572696e672077696c6c20737572707269736520616e640a756e646f75627465646c792067657420746f6e677565732077616767696e672077697468207468652068696e7473206f6620636f6666656520616e6420746f626163636f20696e0a7065726665637420616c69676e6d656e742077697468206d6f726520747261646974696f6e616c206e6f7465732e205375726520746f20706c6561736520746865206c6174652d6e696768742063726f776420776974682074686520736c69676874206a6f6c74206f6620616472656e616c696e65206974206272696e67732e, 'morizottes.jpg');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
