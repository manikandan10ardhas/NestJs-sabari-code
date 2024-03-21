SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
--
-- Dumping data for table `auth_permissions`
--

INSERT INTO `auth_permissions` (`id`, `moduleName`, `name`, `label`, `description`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'ManageUsers', 'user.list', 'CAN_GET_USERS', 'To list users', '0000-00-00 00:00:00', '2023-04-29 12:14:48', '2023-04-29 12:14:48'),
(2, 'ManageUsers', 'user.view', 'CAN_GET_USER', 'To view user', NULL, '2023-06-28 23:08:26', '2023-06-28 23:08:26');
-- --------------------------------------------------------

--
-- Dumping data for table `auth_roles`
--

INSERT INTO `auth_roles` (`id`, `name`, `description`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMIN', 'Admin', NULL, '2023-04-28 23:08:26', '2023-04-28 23:08:26'),
(2, 'USER', 'User', NULL, '2023-04-28 23:08:26', '2023-04-28 23:08:26');

--
-- Dumping data for table `auth_role_permission`
--

INSERT INTO `auth_role_permission` (`id`, `roleId`, `permissionId`, `createdAt`, `updatedAt`) VALUES 
(1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 2, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

COMMIT;