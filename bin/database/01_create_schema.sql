SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
CREATE TABLE `auth_permissions` (
  `id` bigint(20) NOT NULL,
  `moduleName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_roles`
--

CREATE TABLE `auth_roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_role_permission`
--

CREATE TABLE `auth_role_permission` (
  `id` bigint(20) NOT NULL,
  `roleId` bigint(20) DEFAULT NULL,
  `permissionId` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_role`
--

CREATE TABLE `auth_user_role` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `roleId` bigint(20) DEFAULT NULL,
  `deletedAt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneCode` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNo` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profileImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryCode` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipCode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profileCompletion` tinyint(4) DEFAULT '0',
  `status` tinyint(4) DEFAULT '0',
  `emailVerified` tinyint(4) DEFAULT '0',
  `authToken` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resendToken` datetime DEFAULT NULL,
  `lastLoginDate` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_permissions`
--
ALTER TABLE `auth_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `module_name_uidx` (`moduleName`,`name`);

--
-- Indexes for table `auth_roles`
--
ALTER TABLE `auth_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_uidx` (`name`);

--
-- Indexes for table `auth_role_permission`
--
ALTER TABLE `auth_role_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`roleId`),
  ADD KEY `permission_id` (`permissionId`);

--
-- Indexes for table `auth_user_role`
--
ALTER TABLE `auth_user_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_role_uidx` (`roleId`,`userId`),
  ADD KEY `user_id` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid_uidx` (`uid`),
  ADD UNIQUE KEY `user_email_uidx` (`email`),
  ADD KEY `users_status_idx` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_permissions`
--
ALTER TABLE `auth_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_roles`
--
ALTER TABLE `auth_roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_role_permission`
--
ALTER TABLE `auth_role_permission`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_role`
--
ALTER TABLE `auth_user_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_user_role`
--
ALTER TABLE `auth_user_role`
  ADD CONSTRAINT `auth_user_role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

CREATE TABLE IF NOT EXISTS `master_geo_states` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `countryId` bigint NOT NULL,
  `name` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_country_id_idx` (`countryId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1054 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Constraints for table `master_geo_states`
--
ALTER TABLE `master_geo_states`
	DROP INDEX `fk_country_id_idx`,
	ADD INDEX `fk_country_id_idx` (`countryId`) USING BTREE;


CREATE TABLE IF NOT EXISTS `master_geo_countries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shortname` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phonecode` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `domicile` tinyint(1) DEFAULT '1',
  `sortOrder` tinyint(1) DEFAULT '3',
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `name_idx` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `master_settings` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `category` bigint(20) NOT NULL DEFAULT '0',
 `itemKey` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 `itemValue` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
 `itemLabel` mediumtext COLLATE utf8mb4_unicode_ci,
 `active` tinyint(1) NOT NULL DEFAULT '1',
 `isEditable` tinyint(1) DEFAULT '0',
 `sortOrder` tinyint(1) DEFAULT '0',
 `createdAt` datetime NOT NULL,
 `updatedAt` datetime DEFAULT NULL,
 PRIMARY KEY (`id`) USING BTREE,
 UNIQUE KEY `master_settings_uidx` (`category`,`itemKey`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `master_settings_category` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 `active` tinyint(1) NOT NULL DEFAULT '1',
 `createdAt` datetime DEFAULT NULL,
 `updatedAt` datetime DEFAULT NULL,
 PRIMARY KEY (`id`) USING BTREE,
 UNIQUE KEY `master_settings_category_uidx` (`category`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
