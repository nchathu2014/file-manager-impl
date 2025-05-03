# File Manager 🗂️
- Use 22.x.x version (22.15.0 or upper) of Node.js
- Please checkout to the 'development' branch
- npm run start -- --username=<YOUR_USER_NAME>
- If you are using yarn, yarn start --username=<YOUR_USER_NAME>
- If you install everyting correctly, you will see
  <img width="349" alt="image" src="https://github.com/user-attachments/assets/bedb8724-0960-4879-a3c9-f1588c43d14f" />


- If you want to see command help run fm --help on the console (additional development)
  
  <img width="1041" alt="image" src="https://github.com/user-attachments/assets/0ff31d3e-8839-4a6f-9888-a8b5c4e3bfa1" />

- help run fm --version or fm -v (additional development)
- clear, command to clear the console (additional development)

# Tested following scenarios

* General
    * +6 Application accepts username and prints proper message ✅ 
    * +10 Application exits if user pressed ctrl+c or sent .exit command and proper message is printed ✅ 

* Operations fail
    * +20 Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail ✅
    * +10 Operation fail doesn't crash application ✅

* Navigation & working directory operations implemented properly
    * +10 Go upper from current directory ✅
    * +10 Go to dedicated folder from current directory ✅
    * +20 List all files and folders in current directory ✅

* Basic operations with files implemented properly
    * +10 Read file and print it's content in console ✅
    * +5 Create empty file ✅
    * +5 Create new directory ✅
    * +10 Rename file ✅
    * +10 Copy file ✅
    * +10 Move file ✅
    * +10 Delete file ✅

* Operating system info (prints following information in console) implemented properly
    * +6 Get EOL (default system End-Of-Line) ✅
    * +10 Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) ✅
    * +6 Get home directory ✅
    * +6 Get current system user name (Do not confuse with the username that is set when the application starts) ✅
    * +6 Get CPU architecture for which Node.js binary has compiled ✅

* Hash calculation implemented properly
    * +20 Calculate hash for file ✅

* compress and decompress operations
    * +20 Compress file (using Brotli algorithm) ✅
    * +20 Decompress file (using Brotli algorithm) ✅
 
* Advanced Scope
    * +30 All operations marked as to be implemented using certain streams should be performed using Streams API ✅
    * +20 No synchronous Node.js API with asynchronous analogues is used (e.g. not used readFileSync instead of readFile) ✅
    * +20 Codebase is written in ESM modules instead of CommonJS ✅
    * +20 Codebase is separated (at least 7 modules) ✅  (more than 7 modules)

      <img width="403" alt="image" src="https://github.com/user-attachments/assets/031df18b-3f45-4062-aefc-3469a9996c16" />


