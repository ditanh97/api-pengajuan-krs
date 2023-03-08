-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: academic_portal
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `tr_selection_detail`
--

DROP TABLE IF EXISTS `tr_selection_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tr_selection_detail` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `course_selection_id` int NOT NULL,
  `course_id` varchar(7) NOT NULL,
  `score` decimal(3,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`detail_id`),
  KEY `course_selection_id_idx` (`course_selection_id`),
  KEY `course_reference_idx` (`course_id`),
  CONSTRAINT `course_reference` FOREIGN KEY (`course_id`) REFERENCES `tt_courses` (`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `course_selection_reference` FOREIGN KEY (`course_selection_id`) REFERENCES `tt_course_selection` (`course_selection_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tr_selection_detail`
--

LOCK TABLES `tr_selection_detail` WRITE;
/*!40000 ALTER TABLE `tr_selection_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tr_selection_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_course_selection`
--

DROP TABLE IF EXISTS `tt_course_selection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tt_course_selection` (
  `course_selection_id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(10) NOT NULL,
  `semester` tinyint NOT NULL,
  `curr_gpa` decimal(3,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_selection_id`),
  KEY `student_reference_idx` (`student_id`),
  CONSTRAINT `student_reference` FOREIGN KEY (`student_id`) REFERENCES `tt_students` (`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_course_selection`
--

LOCK TABLES `tt_course_selection` WRITE;
/*!40000 ALTER TABLE `tt_course_selection` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_course_selection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_courses`
--

DROP TABLE IF EXISTS `tt_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tt_courses` (
  `course_id` varchar(7) NOT NULL,
  `name` varchar(256) NOT NULL,
  `lecturer_id` varchar(10) NOT NULL,
  `classroom_id` varchar(4) NOT NULL,
  `time_id` varchar(100) NOT NULL,
  `credit` tinyint NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `max_student` int NOT NULL DEFAULT '4',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_courses`
--

LOCK TABLES `tt_courses` WRITE;
/*!40000 ALTER TABLE `tt_courses` DISABLE KEYS */;
INSERT INTO `tt_courses` VALUES ('TKS7001','Desain Produk Industri','1234567890','ABC1','Monday 8 AM',2,1,4,'2023-03-08 23:45:45','2023-03-08 23:45:45'),('TKS7002','Sistem Utilitas','1234567891','ABC2','Tuesday 8 AM',3,1,4,'2023-03-08 23:45:45','2023-03-08 23:45:45'),('TKS7003','Perancangan Proses Teknik Kimia','1234567892','ABC3','Wednesday 8 AM',3,1,4,'2023-03-08 23:45:45','2023-03-08 23:45:45'),('TKS7004','Fenomena Perpindahan','1234567893','ABC1','Monday 1 PM',3,1,4,'2023-03-08 23:45:45','2023-03-08 23:45:45'),('TKS7005','Perancangan Pabrik','1234567894','ABC2','Monday 1 PM',2,1,4,'2023-03-08 23:45:45','2023-03-08 23:45:45'),('TKS7006','Tugas Perancangan Pabrik','1234567892','ABC3','Monday 1 PM',2,1,4,'2023-03-08 23:45:45','2023-03-08 23:45:45');
/*!40000 ALTER TABLE `tt_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_students`
--

DROP TABLE IF EXISTS `tt_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tt_students` (
  `student_id` varchar(10) NOT NULL,
  `name` varchar(256) NOT NULL,
  `phone` char(20) NOT NULL,
  `dob` date NOT NULL,
  `entry_date` date NOT NULL,
  `major_id` varchar(50) NOT NULL,
  `faculty_id` varchar(10) NOT NULL,
  `supervisor_id` varchar(10) NOT NULL,
  `degree` char(4) NOT NULL,
  `gpa` decimal(3,2) NOT NULL,
  `semester` tinyint NOT NULL,
  `grad_status` enum('graduate','active','drop_out') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_students`
--

LOCK TABLES `tt_students` WRITE;
/*!40000 ALTER TABLE `tt_students` DISABLE KEYS */;
INSERT INTO `tt_students` VALUES ('1411070001','Sandie Hafidzha','08219040090','1997-06-30','2014-08-08','TEKNIK KIMIA','TEKNIK','1234567890','S1',3.56,7,'active','2023-03-08 23:15:24','2023-03-08 23:26:49'),('1411070002','Huwaida Nurfatih','08234512290','1997-11-11','2014-08-08','TEKNIK KIMIA','TEKNIK','1234567890','S1',3.70,7,'active','2023-03-08 23:16:41','2023-03-08 23:26:49'),('1411070003','Wiera Herdy','082145432259','1997-09-07','2014-08-08','TEKNIK KIMIA','TEKNIK','1234567890','S1',4.00,7,'active','2023-03-08 23:18:18','2023-03-08 23:26:49'),('1411070004','Alfatih','08531333556','1997-12-12','2014-08-08','TEKNIK KIMIA','TEKNIK','1234567890','S1',4.00,7,'active','2023-03-08 23:19:24','2023-03-08 23:26:49');
/*!40000 ALTER TABLE `tt_students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-09  0:35:44
