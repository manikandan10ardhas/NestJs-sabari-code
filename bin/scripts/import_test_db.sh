#!/bin/bash
# show commands being executed, per debug
# set -x

WORKDIR="$(cd "$(dirname "$0")" && pwd)"

# echo "Files are currently being processed. Run Forrest Run!!!"

while getopts u:p:d: flag; do
    case "${flag}" in
    u) DB_USER=${OPTARG} ;;
    p) DB_PASSWORD=${OPTARG} ;;
    d) DB_NAME=${OPTARG} ;;
    esac
done

cd $WORKDIR
cd ../database/

mysql -u $DB_USER -p$DB_PASSWORD -e "DROP DATABASE IF EXISTS $DB_NAME"
mysql -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE $DB_NAME"
# echo "==>"
# echo "==> ** IMPORTING Setup DATA"
# echo "==>"
# echo "--> Importing tables"
mysql -h localhost -u $DB_USER -p$DB_PASSWORD $DB_NAME < 01_create_schema.sql

mysql -h localhost -u $DB_USER -p$DB_PASSWORD $DB_NAME < 02_install_data.sql

exit