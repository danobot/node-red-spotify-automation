sudo npm i -g .
pushd "/usr/lib/node_modules/@danobot/node-red-contrib-spotify-automation"
npm-pack-all
mv *.tgz ~/Desktop
popd

sudo npm remove -g .
