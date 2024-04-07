-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema plant_database
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `plant_database` ;

-- -----------------------------------------------------
-- Schema plant_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `plant_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `plant_database` ;

-- -----------------------------------------------------
-- Table `plant_database`.`plant_prop_watcher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plant_database`.`plant_prop_watcher` ;

CREATE TABLE IF NOT EXISTS `plant_database`.`plant_prop_watcher` (
  `plant_id` INT NULL DEFAULT NULL,
  `property_id` VARCHAR(45) NULL DEFAULT NULL,
  `plop_watch` VARCHAR(45) NULL DEFAULT NULL,
  `index` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`index`))
ENGINE = InnoDB
AUTO_INCREMENT = 2455
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `plant_database`.`plant_watcher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plant_database`.`plant_watcher` ;

CREATE TABLE IF NOT EXISTS `plant_database`.`plant_watcher` (
  `plant_id` INT NOT NULL AUTO_INCREMENT,
  `plant_watched` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`plant_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 389
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `plant_database`.`plants`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plant_database`.`plants` ;

CREATE TABLE IF NOT EXISTS `plant_database`.`plants` (
  `plant_id` INT NOT NULL AUTO_INCREMENT,
  `plant_name` VARCHAR(45) NULL DEFAULT NULL,
  `plant_family` VARCHAR(45) NULL DEFAULT NULL,
  `plant_hoofdgroep` VARCHAR(45) NULL DEFAULT NULL,
  `plant_color` VARCHAR(45) NULL DEFAULT NULL,
  `invasive` TINYINT NULL DEFAULT NULL,
  `plant_map` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`plant_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 389
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `plant_database`.`properties`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plant_database`.`properties` ;

CREATE TABLE IF NOT EXISTS `plant_database`.`properties` (
  `property_id` INT NOT NULL,
  `property_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`property_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `plant_database`.`property_watcher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plant_database`.`property_watcher` ;

CREATE TABLE IF NOT EXISTS `plant_database`.`property_watcher` (
  `property_id` VARCHAR(45) NOT NULL,
  `property_watched` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`property_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
