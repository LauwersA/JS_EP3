-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema YTvideos
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `YTvideos` ;

-- -----------------------------------------------------
-- Schema YTvideos
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `YTvideos` DEFAULT CHARACTER SET utf8 ;
USE `YTvideos` ;

-- -----------------------------------------------------
-- Table `YTvideos`.`Videos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `YTvideos`.`Videos` ;

CREATE TABLE IF NOT EXISTS `YTvideos`.`Videos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Link` VARCHAR(200) NOT NULL,
  `Begintime` INT NOT NULL,
  `Endtime` INT NOT NULL,
  `Favorite` TINYINT NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `Link_UNIQUE` ON `YTvideos`.`Videos` (`Link` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO videos (Link, Begintime, Endtime, Favorite) VALUES("sDj72zqZakE", 3, 8, 0);
INSERT INTO videos (Link, Begintime, Endtime, Favorite) VALUES("bIbfDxpzs7Y", 89, 369, 1);
INSERT INTO videos (Link, Begintime, Endtime, Favorite) VALUES("xL_bSzlIe_w", 0, 600, 0);