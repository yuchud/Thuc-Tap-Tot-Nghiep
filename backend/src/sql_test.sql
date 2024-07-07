-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: flashcard
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_roles`
--

DROP TABLE IF EXISTS `account_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 KEY_BLOCK_SIZE=16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_roles`
--

LOCK TABLES `account_roles` WRITE;
/*!40000 ALTER TABLE `account_roles` DISABLE KEYS */;
INSERT INTO `account_roles` VALUES (1,'admin'),(2,'customer');
/*!40000 ALTER TABLE `account_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(1024) NOT NULL,
  `is_pro` tinyint DEFAULT '0',
  `pro_expiry_date` datetime DEFAULT NULL,
  `account_role_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `FK_accounts_account_roles_idx` (`account_role_id`),
  CONSTRAINT `FK_accounts_account_roles` FOREIGN KEY (`account_role_id`) REFERENCES `account_roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'admin',NULL,'$2b$15$MESzdbTU0jIKCbajvJDMPOx5LWXNApEC0nTGNdbV60IlHyj3T8cP6',0,NULL,1,'2024-07-04 04:20:21'),(2,'yuchud','hihi','wewa33',0,NULL,2,'2024-07-04 05:54:02'),(4,'hihi','haha','hoho',0,NULL,2,'2024-07-04 06:13:21'),(7,'hihi3','haha3','hoaaho',0,NULL,2,'2024-07-04 16:50:02'),(8,'hihi5','hahaa','hoaaho',0,NULL,2,'2024-07-04 16:51:09'),(9,'fasd','f13123@gmail.com','hoaaho',0,NULL,2,'2024-07-04 16:51:45'),(10,'321','fdfd@gmail.com','hoaaho',0,NULL,2,'2024-07-04 16:52:15'),(11,'fadfaf','12312312@gmail.com','hoaaho',0,NULL,2,'2024-07-04 16:52:31'),(12,'fadfadsf','321321321312@gmail.com','fadafad',0,NULL,2,'2024-07-04 16:54:44'),(13,'fa123231','agfsdafs@gmail.com','fadafad',0,NULL,2,'2024-07-04 16:57:11'),(14,'12312312312321312','3123fadfadfadfs@gmail.com','fadafad',0,NULL,2,'2024-07-04 16:58:52'),(15,'yuch2ud','DucHuy2002@gmail.com','fadafad',0,NULL,2,'2024-07-06 11:56:29'),(16,'yuch2ufd','DucHuy20202@gmail.com','fadafad',0,NULL,2,'2024-07-06 12:24:58'),(17,'yuch22ufd','DucH32uy20202@gmail.com','f3adafad',0,NULL,2,'2024-07-06 12:25:38'),(18,'yuffch22ufd','DucH3ff2uy20202@gmail.com','f3adafad',0,NULL,2,'2024-07-06 12:26:26'),(19,'1','1@gmail.com','123456',0,NULL,2,'2024-07-06 12:27:10'),(20,'2','2@gmail.com','123456',0,NULL,2,'2024-07-06 12:29:45'),(21,'3','3@gmail.com','123456',0,NULL,2,'2024-07-06 12:31:02'),(22,'4','4@gmail.com','123456',0,NULL,2,'2024-07-06 12:32:28'),(23,'5','5@gmail.com','123456',0,NULL,2,'2024-07-06 12:32:52'),(24,'6','6@gmail.com','123456',0,NULL,2,'2024-07-06 12:33:42'),(25,'7','7@gmail.com','123456',0,NULL,2,'2024-07-06 12:34:31'),(26,'8','8@gmail.com','123456',0,NULL,2,'2024-07-06 12:35:20'),(27,'9','9@gmail.com','123456',0,NULL,2,'2024-07-06 12:35:49'),(28,'10','10@gmail.com','123456',0,NULL,2,'2024-07-06 12:36:32'),(29,'11','11@gmail.com','123456',0,NULL,2,'2024-07-06 12:36:44'),(30,'12','12@gmail.com','123456',0,NULL,2,'2024-07-06 12:37:57'),(31,'13','13@gmail.com','123456',0,NULL,2,'2024-07-06 12:40:12'),(32,'14','14@gmail.com','123456',0,NULL,2,'2024-07-06 12:41:34'),(33,'15','15@gmail.com','123456',0,NULL,2,'2024-07-06 12:42:29'),(34,'16','16@gmail.com','123456',0,NULL,2,'2024-07-06 12:43:37'),(35,'17','17@gmail.com','123456',0,NULL,2,'2024-07-06 12:43:52'),(36,'19','19@gmail.com','123456',0,NULL,2,'2024-07-06 12:47:58'),(37,'20','20@gmail.com','123456',0,NULL,2,'2024-07-06 12:48:45'),(38,'21','21@gmail.com','123456',0,NULL,2,'2024-07-06 12:53:21'),(39,'22','24@gmail.com','123456',0,NULL,2,'2024-07-06 21:46:29'),(40,'23','23@gmail.com','123456',0,NULL,2,'2024-07-06 21:53:51'),(41,'25','25@gmail.com','123456',0,NULL,2,'2024-07-06 21:59:12'),(42,'30','30@gmail.com','123456',0,NULL,2,'2024-07-06 22:33:13'),(43,'31','31@gmail.com','123456',0,NULL,2,'2024-07-06 22:35:23'),(44,'32','32@gmail.com','123456',0,NULL,2,'2024-07-06 22:35:36');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` int NOT NULL,
  `front_text` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `back_text` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image` varchar(4000) DEFAULT NULL,
  `deck_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `account_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  KEY `FK_customers_account_idx` (`account_id`),
  CONSTRAINT `FK_customers_accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,NULL,NULL,NULL,1),(27,NULL,NULL,NULL,4),(45,NULL,NULL,NULL,7),(90,'John',NULL,NULL,10),(91,'John',NULL,NULL,9),(107,NULL,NULL,NULL,2),(109,NULL,NULL,NULL,13),(110,NULL,NULL,NULL,36),(112,NULL,NULL,NULL,37),(113,NULL,NULL,NULL,38),(114,NULL,NULL,NULL,39),(115,NULL,NULL,NULL,41),(116,NULL,NULL,NULL,42),(117,NULL,NULL,NULL,44);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers_cards`
--

DROP TABLE IF EXISTS `customers_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers_cards` (
  `account_id` int NOT NULL,
  `card_id` int NOT NULL,
  `is_known` tinyint NOT NULL DEFAULT '0',
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  UNIQUE KEY `card_id_UNIQUE` (`card_id`),
  KEY `FK_user_card_cards_idx` (`card_id`),
  KEY `FK_user_card_accounts_idx` (`account_id`),
  CONSTRAINT `FK_user_card_accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FK_user_card_cards` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers_cards`
--

LOCK TABLES `customers_cards` WRITE;
/*!40000 ALTER TABLE `customers_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deck_categories`
--

DROP TABLE IF EXISTS `deck_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deck_categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deck_categories`
--

LOCK TABLES `deck_categories` WRITE;
/*!40000 ALTER TABLE `deck_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `deck_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decks`
--

DROP TABLE IF EXISTS `decks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `decks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `card_count` int unsigned NOT NULL DEFAULT '0',
  `description` varchar(4000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `is_public` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `deck_name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decks`
--

LOCK TABLES `decks` WRITE;
/*!40000 ALTER TABLE `decks` DISABLE KEYS */;
INSERT INTO `decks` VALUES (16,'cơ bản 3',0,'nothing',1,'2024-07-06 09:59:42'),(17,'cơ bản 4',0,'nothing',1,'2024-07-06 10:00:26'),(19,'cơ bản 5',0,'nothing',1,'2024-07-06 10:01:11'),(21,'cơ bản 7',0,'nothing',1,'2024-07-06 10:01:39'),(32,'cơ bản 8',0,NULL,1,'2024-07-06 10:23:03'),(36,'cơ bản 10',0,NULL,1,'2024-07-06 10:24:06'),(38,'cơ bản 11',0,NULL,1,'2024-07-06 10:27:49'),(39,'name',0,NULL,1,'2024-07-06 12:47:49'),(42,'name2',0,NULL,1,'2024-07-06 21:57:17'),(43,'name35',0,NULL,1,'2024-07-06 22:31:54');
/*!40000 ALTER TABLE `decks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decks_categories_detail`
--

DROP TABLE IF EXISTS `decks_categories_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `decks_categories_detail` (
  `deck_id` int NOT NULL,
  `deck_categories_id` int NOT NULL,
  KEY `FK_deck_categories_detail_decks_idx` (`deck_id`),
  KEY `FK_deck_categories_detail_deck_categories_idx` (`deck_categories_id`),
  CONSTRAINT `FK_deck_categories_detail_deck_categories` FOREIGN KEY (`deck_categories_id`) REFERENCES `deck_categories` (`id`),
  CONSTRAINT `FK_deck_categories_detail_decks` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decks_categories_detail`
--

LOCK TABLES `decks_categories_detail` WRITE;
/*!40000 ALTER TABLE `decks_categories_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `decks_categories_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificiations`
--

DROP TABLE IF EXISTS `notificiations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificiations` (
  `id` int NOT NULL,
  `recipient_id` int NOT NULL,
  `id_read` tinyint NOT NULL,
  `is_deleted` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_notifications_customers_idx` (`recipient_id`),
  CONSTRAINT `FK_notifications_customers` FOREIGN KEY (`recipient_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificiations`
--

LOCK TABLES `notificiations` WRITE;
/*!40000 ALTER TABLE `notificiations` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificiations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_plans`
--

DROP TABLE IF EXISTS `pro_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pro_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `description` varchar(4000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `is_public` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_plans`
--

LOCK TABLES `pro_plans` WRITE;
/*!40000 ALTER TABLE `pro_plans` DISABLE KEYS */;
INSERT INTO `pro_plans` VALUES (1,'Cơ bản 1',300000.00,'waka waka',0,'2024-07-06 17:35:41'),(5,'pro 2',599000.00,'tehehe',0,'2024-07-06 23:29:56');
/*!40000 ALTER TABLE `pro_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_history`
--

DROP TABLE IF EXISTS `purchase_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_history` (
  `account_id` int NOT NULL,
  `pro_plan_id` int NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `FK_purchase_history_accounts_idx` (`account_id`),
  KEY `FK_purchase_history_pro_plans_idx` (`pro_plan_id`),
  CONSTRAINT `FK_purchase_history_accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FK_purchase_history_pro_plans` FOREIGN KEY (`pro_plan_id`) REFERENCES `pro_plans` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_history`
--

LOCK TABLES `purchase_history` WRITE;
/*!40000 ALTER TABLE `purchase_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_sessions`
--

DROP TABLE IF EXISTS `study_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_sessions` (
  `is_done` tinyint DEFAULT '0',
  `account_id` int NOT NULL,
  `deck_id` int NOT NULL,
  `last_reviewed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `account_id_idx` (`account_id`),
  KEY `deck_id_idx` (`deck_id`),
  CONSTRAINT `FK_accounts_study_sessions` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FK_decks_study_sessions` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_sessions`
--

LOCK TABLES `study_sessions` WRITE;
/*!40000 ALTER TABLE `study_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `study_sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-07  8:07:13
