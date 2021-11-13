npm pack
ls | grep -v *.tgz | xargs rm -rf
rm .gitignore .npmignore .prettierrc
