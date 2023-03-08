# Table of Contents
- [Case Study](#about)
- [Boilerplate Explanation](#boilerplate)
- [Support](#support)
- [Contributing](#contributing)


# Case Study : KRS Application

## Explanation
KRS (Kartu Rencana Studi) merupakan daftar mata kuliah yang akan diikuti atau diambil oleh mahasiswa dalam satu semester ke depan. Tujuan dari studi kasus ini adalah membuat API untuk mendaftar krs bagi mahasiswa dg aturan sbg berikut:
- 1 Mahasiswa bisa mengambil maksimal 3 Mata Kuliah.
- 1 Mata Kuliah bisa memiliki maksimal 4 Mahasiswa.
Selain itu pada API ini disediakan CRUD untuk menginput data mahasiswa dan Kuliah




## ERD
![ERD for the Propose Case Study](krs_application.drawio.png)
Data mahasiswa disimpan pada tabel `tt_students`, data mata kuliah disimpan pada tabel `tt_courses`.
Untuk data krs setiap mahasiswa per semester disimpan pada tabel `tt_course_selection` dengan mata kuliah yang dipilih disimpan pada tabel `tr_selection_detail`


### Primary Key Concern
- `student_id` contain 10 char, with pattern as follows: 
  YYFCMCXXXX
  YY : Year of entry
  FC : Major Code
  MC : Faculty Code
  XXXX : Sequence of entry
  ex : 1411070021
- `course_id` contain 7 char, with pattern as follows:
  FFSXAAAA
  FF : Major Nickname (unique)
  SX : Semester code
  AAAA : Sequence of entry
  ex : TKS4095

### Simplification 
For simplicity of the case, some fields that should be join from antoher table are not directly defined. It is assumed that the user of API understand how to fill the correct data. 
- `tr_students` Table
   - `major_id`: It should be filled as id from `major` table (table that contain of Major detail). We assume user fill with string like: `TEKNIK KIMIA`, `TEKNIK INFORMATIKA`
   - `faculty_id`: It should be filled as id from `faculty` table (table that contain of Faculty detail). We assume user fill with string like: `Teknik` , `FMIPA` 
   - `degree` : It should be filled as id from `degree` table (table that contain of Degree detail). We assume user filled with string like: `D3` , `S1`, `S2`, `S3` 
   - `supervisor_id`: It should be filled as id from `lecturer` table (table that contain of Lecturer detail). We assume user fill with string with 10 characters like:  `1234567890` 
- `tr_courses` Table
   - `lecture_id` : It should be filled as id from `lecturer` table (table that contain of Lecturer detail). We assume user fill with string with 10 characters like:  `1234567890` 
   - `classroom_id` : It should be filled as id from `classroom` table (table that contain of classroom detail). We assume user fill with string with 10 characters like:  `1234567890` 
   - `time_id` : It should be filled as id from `time` table (table that contain of schedule detail). We assume user fill with string like:  `Sunday 8 AM` 



# Node Rest Service Boilerplate with Sequelize - Babel Watch - Mysql

Stack:
- Sequelize cli
- Babel Watch
- Mysql
- Rest: Express, cors, body-parser
- 



## Installation
```
git clone git@gitlab.com:ditanh16/node-service-boilerplate-2020.git
cd node-service-boilerplate-2020
yarn
```

## Usage

1. Using Sequelize
  - for creating model and migration, use this command example:
    ```
    sequelize model:create --name posts --attributes title:string,content:text,tags:string,published:boolean
    ```
    or use this command example:
    ```sequelize migration:create --name create-tutorials```
    run ```sequelize db:migrate``` or ```yarn run db:migrate```
   
  - for creating seeder, use this command example:
    ```
    sequelize seed:generate —-name dummy-posts
    ```
    run  ```sequelize db:seed:all``` or ```yarn run db:seed```


## Initialisation Step
1. Init project
   ```yarn init```
2. Adding env
   ```yarn add dotenv```
3. Adding babel
   Babel transpiles recent JS features (ECMAScript) into vanilla JavaScript.
   Activate different upcoming Javascript features by adding them as preset
   to Babel,
   reference: 
   1) [Basic Babel Setup 1](https://www.robinwieruch.de/minimal-node-js-babel-setup)
   2) [Basic Babel Setup 2](https://medium.com/@agavitalis/setting-up-a-nodejs-express-application-with-babel-642fe0dd45a5)
   3) [Basic Babel Setup 3](https://dev.to/ganeshmani/configuring-babel-for-node-js-express-server-35hp)
   4) [.babelrc Vs babel.config.js](https://stackoverflow.com/questions/60288375/when-to-use-babel-config-js-and-babelrc)
      Project-wide configuration
      -> babel.config.json files, with the different extensions
         babel.config is useful if you have multiple packages (ie multiple package.json) directories in your project that utilize a single babel config


      File-relative configuration
      -> .babelrc.json files, with the different extensions
          package.json files with a "babel" key
          babelrc isuseful if you want to run certain transformations / plugins on a subset of files /directories.
   - ```yarn add -D @babel/core @babel/node babel-plugin-module-resolver @babel/preset-env  babel-plugin-module-resolver```
   - ```touch babel.config.js```, add module-resolver dan env 
   - add "scripts" to packaage.json
    ```
     "scripts" : {
        "build" : "babel index.js --out-file index-compiled.js",
        "dev": "nodemon --exec babel-node src/index.js",
        "start": "babel-node src/index.js",
     }
    ```

4. Adding Sequelize
   reference:
   1. [Automate Model creation, migration, and seeder](https://santrikoding.com/cara-mudah-membuat-rest-api-menggunakan-express-js-3-menyiapkan-database)

   - ```yarn add mysql2 sequelize sequelize-cli```
   - ```touch .sequelizerc``` in root directory for sequelize configuration
   - run command in root dir `  ```sequelize init```
   - add ```sequelize/config.js``` 
   - add this key in "scripts" of package.json
     ```"db:migrate": "sequelize db:migrate",
      "db:seed": "sequelize db:seed:all",
      "db:seed:undo": "sequelize db:seed:undo:all",
      "db:migration:undo": "sequelize db:migrate:undo",```

5. Adding Rest Feature
   reference:
   1. [REST API - express, mysql, sequelize](https://bezkoder.com/node-js-express-sequelize-mysql/)
   2. [CORS](https://stackabuse.com/handling-cors-with-node-js/)
   - yarn add express cors body-parser


# Support

Please [open an issue](https://gitlab.com/ditanh16/node-service-boilerplate-2020/issues/new) for support.

# Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://gitlab.com/ditanh16/node-service-boilerplate-2020/compare/).
