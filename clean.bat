@echo off
CMD /C rimraf .bin
CMD /C rimraf .deploy
CMD /C rimraf node_modules

cd ./Server
CMD /C rimraf node_modules
CMD /C rimraf typings

cd ../Client
CMD /C rimraf node_modules
CMD /C rimraf typings

cd ..