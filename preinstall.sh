#!/bin/bash

while read var;
do declare ${var%=*}="${var#*=}";
done < .env

echo "AIRDAO_COMPONENTS_BRANCH=${AIRDAO_COMPONENTS_BRANCH}"
package="https://github.com/ambrosus/airdao-components-and-tools${AIRDAO_COMPONENTS_BRANCH}"
yarn add $package
