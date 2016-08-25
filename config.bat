@echo off
CMD /C npm i

cd ./Server
CMD /C npm i

cd ../Client
CMD /C npm i

cd ..