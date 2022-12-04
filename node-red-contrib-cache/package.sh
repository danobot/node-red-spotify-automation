# https://discourse.nodered.org/t/steps-to-create-a-custom-node-package-for-offline-installation/55624


sudo npm i -g .
pushd "/usr/lib/node_modules/@danobot/node-red-contrib-spotify-automation"
npm-pack-all
mv *.tgz ~/Desktop
popd

sudo npm remove -g .
