#!/bin/bash

# For testing production mode e2e tests we need some tweaks:
# 1) The angular app needs to run in dev mode for protractor to work
# 2) We update the basehref of the angular app to the context path of the backend
# 3) We update the protractor configuration to the new path
#
# Then we start up a docker stack with a postgres server since production mode is configured for a
# postgres database instead of in-memory database.

# only run on the release branch and master branch if it's not a tag build
if [[ $TRAVIS_BRANCH == release-* || ($TRAVIS_BRANCH == master && -z $TRAVIS_TAG) ]]
then
  echo "Running production e2e tests"
  docker-compose -f src/main/docker/app.yml up -d --build # spin up production mode application
  # wait for app to be up
  ./util/wait-for-app.sh http://localhost:8080/managementportal/
  docker-compose -f src/main/docker/app.yml logs # show output of app startup
  yarn webdriver-manager update
  yarn e2e:prod # run e2e tests against production mode
  docker-compose -f src/main/docker/app.yml down -v # clean up containers and volumes
  git checkout src/test/javascript/protractor.conf.js
  git checkout webpack/webpack.prod.js
  git checkout src/main/resources/config/application-prod.yml
else
  echo "Skipping production e2e tests"
fi
